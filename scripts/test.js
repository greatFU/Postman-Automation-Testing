// Configuration object to customize the testing behavior
const config = {
    ignoredFields: [], // Fields to ignore during comparison
    ignoredPaths: [], // Specific paths to ignore
    ignoredFieldTypes: [], // Field types to ignore
    fieldsToClean: [], // Fields where dynamic content should be removed before comparison
};

let csvData = JSON.parse(pm.environment.get("csvData"));
let expectedResultStr = csvData.ExpRes;
console.log("Expected Result String from CSV: ", expectedResultStr);

if (expectedResultStr) {
    if (typeof expectedResultStr === 'string') {
        expectedResultStr = expectedResultStr.replace(/^"|"$/g, '');
    }

    try {
        let expectedResult = typeof expectedResultStr === 'string' ? JSON.parse(expectedResultStr) : expectedResultStr;
        let response = pm.response.json();

        // Function to determine if a field should be ignored
        function shouldIgnoreField(fieldName, fieldPath, fieldType1, fieldType2) {
            if (config.ignoredFields.includes(fieldName)) return true;
            if (config.ignoredPaths.includes(fieldPath)) return true;
            if (config.ignoredFieldTypes.includes(fieldType1) || config.ignoredFieldTypes.includes(fieldType2)) return true;
            return false;
        }

        // Function to remove dynamic content from a value
        function removeDynamicContent(value, fieldPath) {
            const fieldName = fieldPath.split('.').pop();
            if (typeof value === 'string' && config.fieldsToClean.includes(fieldName)) {
                // Patterns to match and remove dynamic content
                const patterns = [
                    // Match 'error_id: dynamic_value' and remove the dynamic value, keeping 'error_id:'
                ];
                patterns.forEach(pattern => {
                    value = value.replace(pattern, '$1'); // Keep 'error_id:', remove dynamic value
                });
                value = value.trim(); // Remove any trailing spaces
            }
            return value;
        }

        // Function to compare two objects, handling dynamic content appropriately
        function compareObjects(obj1, obj2, path = '') {
            let differences = [];
            const keys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);

            keys.forEach(key => {
                const currentPath = path ? `${path}.${key}` : key;
                const val1 = obj1 ? obj1[key] : undefined;
                const val2 = obj2 ? obj2[key] : undefined;
                const fieldType1 = Array.isArray(val1) ? 'array' : typeof val1;
                const fieldType2 = Array.isArray(val2) ? 'array' : typeof val2;
                const fieldName = key;

                // Always compare data types
                if (fieldType1 !== fieldType2) {
                    differences.push(`Type mismatch at '${currentPath}': expected type '${fieldType2}', got type '${fieldType1}'`);
                }

                if (shouldIgnoreField(fieldName, currentPath, fieldType1, fieldType2)) {
                    // Skip value comparison but continue to check for field presence and type
                    if ((val1 === undefined && val2 !== undefined) || (val1 !== undefined && val2 === undefined)) {
                        differences.push(`Field '${currentPath}' presence mismatch.`);
                    }
                    return;
                }

                if (val1 === null && val2 === null) {
                    // Both are null, consider equal
                    return;
                }

                if (fieldType1 === 'array') {
                    if (val1.length !== val2.length) {
                        differences.push(`Mismatch at '${currentPath}': expected array length ${val2.length}, got ${val1.length}`);
                    } else {
                        for (let i = 0; i < val1.length; i++) {
                            const elementPath = `${currentPath}[${i}]`;
                            differences = differences.concat(compareObjects(val1[i], val2[i], elementPath));
                        }
                    }
                } else if (fieldType1 === 'object') {
                    differences = differences.concat(compareObjects(val1, val2, currentPath));
                } else {
                    let compareVal1 = removeDynamicContent(val1, currentPath);
                    let compareVal2 = removeDynamicContent(val2, currentPath);

                    if (compareVal1 !== compareVal2) {
                        differences.push(`Mismatch at '${currentPath}': expected '${compareVal2}', got '${compareVal1}'`);
                    }
                }
            });

            return differences;
        }

        // Function to collect all paths of a specific field in an object
        function collectFieldPaths(obj, fieldName, currentPath = '', paths = []) {
            if (Array.isArray(obj)) {
                obj.forEach((item, index) => {
                    const elementPath = `${currentPath}[${index}]`;
                    collectFieldPaths(item, fieldName, elementPath, paths);
                });
            } else if (obj && typeof obj === 'object' && obj !== null) {
                if (obj.hasOwnProperty(fieldName)) {
                    paths.push(currentPath ? `${currentPath}.${fieldName}` : fieldName);
                }
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const newPath = currentPath ? `${currentPath}.${key}` : key;
                        collectFieldPaths(obj[key], fieldName, newPath, paths);
                    }
                }
            }
            return paths;
        }

        // Function to get the value at a specific path in an object
        function getValueAtPath(obj, path) {
            const pathArray = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
            let current = obj;
            for (const key of pathArray) {
                if (current && current.hasOwnProperty(key)) {
                    current = current[key];
                } else {
                    return undefined;
                }
            }
            return current;
        }

        // Main test to compare the response with the expected result
        pm.test("Response matches expected result (excluding ignored fields and dynamic content)", function () {
            const differences = compareObjects(response, expectedResult);
            if (differences.length > 0) {
                console.log("Differences found:\n" + differences.join('\n'));
            }
            pm.expect(differences.length, differences.join('\n')).to.equal(0);
        });

        // Test to check ignored fields are appropriately handled
        pm.test("Ignored fields are appropriately handled", function () {
            config.ignoredFields.forEach(field => {
                const expectedPaths = collectFieldPaths(expectedResult, field).sort();
                const responsePaths = collectFieldPaths(response, field).sort();

                // Check if the field presence matches
                pm.expect(responsePaths, `Field '${field}' paths in response`).to.eql(expectedPaths, `Mismatch in field paths for '${field}'.\nExpected paths: ${expectedPaths.join(', ') || 'none'}\nActual paths: ${responsePaths.join(', ') || 'none'}`);

                // If field is present, validate that values are not null or empty
                responsePaths.forEach(path => {
                    const value = getValueAtPath(response, path);
                    pm.expect(value, `Value at '${path}' for field '${field}'`).to.not.be.undefined;
                    pm.expect(value, `Value at '${path}' for field '${field}'`).to.not.be.null;
                    if (typeof value === 'string') {
                        pm.expect(value, `Value at '${path}' for field '${field}'`).to.be.a('string').and.to.not.be.empty;
                    }
                });
            });
        });

    } catch (e) {
        console.error("Error parsing JSON: ", e);
        console.error("Expected Result String: ", expectedResultStr);
        pm.test("Error parsing JSON", function () {
            pm.expect.fail(`Error parsing JSON: ${e.message}`);
        });
    }
} else {
    console.error("Expected Result String is undefined");
    pm.test("Expected Result String is undefined", function () {
        pm.expect.fail("Expected Result String is undefined");
    });
}
