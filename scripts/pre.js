// Load CSV data into an object
let csvData = pm.iterationData.toObject();

// Remove empty or null fields from CSV data
for (let key in csvData) {
    if (csvData[key] === "" || csvData[key] === null) {
        delete csvData[key];
    }
}

// Create request body
let requestBody = {
    MemshakUser: csvData.MemshakUser,
    // Internal structure, if needed
    obj2: [
        {
            MemshakUser: csvData.MemshakUser2,
            // Additional fields
        }
    ]
};

// Function to remove undefined fields from an object
function removeEmptyFields(obj) {
    return JSON.parse(JSON.stringify(obj, (key, value) => value !== undefined ? value : undefined));
}

// Clean the request body to remove undefined values
requestBody = removeEmptyFields(requestBody);

// Set cleaned CSV data and request body as environment variables in Postman
pm.environment.set("csvData", JSON.stringify(csvData));
pm.environment.set("requestBody", JSON.stringify(requestBody, null, 2));

// Log cleaned CSV data and request body for debugging
console.log(csvData);
console.log(requestBody);
