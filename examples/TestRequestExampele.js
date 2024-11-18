// Configuration object to customize the testing behavior
const config = {
    ignoredFields: ["some variable from response to ignore"], // Fields to ignore during comparison
    ignoredPaths: ["array1[0].ConfirmationNumber"], // Specific paths to ignore
    ignoredFieldTypes: ["array or number, etc."], // Field types to ignore
    fieldsToClean: ["something to ignore inside a field like errorID inside StatusDesc if('StatusDesc':1234,errorId:551') put 'StatusDesc' and use the function 'removeDynamicContent' as designed"], // Fields where dynamic content should be removed before comparison
};

        // Function to remove dynamic content from a value
        function removeDynamicContent(value, fieldPath) {
            const fieldName = fieldPath.split('.').pop();
            if (typeof value === 'string' && config.fieldsToClean.includes(fieldName)) {
                // Patterns to match and remove dynamic content
                const patterns = [
                    // Match 'error_id: dynamic_value' and remove the dynamic value, keeping 'error_id:'
                    /(error_id:\s*)([^\s,]+)/g,
                    // Add more patterns as needed, e.g.,
                    // /(transaction_id:\s*)([^\s,]+)/g,
                ];
                patterns.forEach(pattern => {
                    value = value.replace(pattern, '$1'); // Keep 'error_id:', remove dynamic value
                });
                value = value.trim(); // Remove any trailing spaces
            }
            return value;
        }