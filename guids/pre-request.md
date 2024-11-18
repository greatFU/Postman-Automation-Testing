# 1. A simple and detailed guide to pre-request script

## 1.1. General Description of the Script:
    This pre-request script is designed to process data from a CSV file by removing empty or unnecessary fields and creating a customized data structure (requestBody) that will be used for sending API requests.
## 1.2. Key Functions of the Script:
    Data Reading: The script reads data from a source and maps it to an object (csvData).
    Data Cleaning: The script removes fields that contain no values (either empty or null). This ensures that only the necessary fields are included, allowing you to omit certain fields for specific iterations by leaving them empty.
    Creating Request Body (requestBody): Constructs a custom JSON structure (requestBody) tailored to the needs of the project.
    Saving Data in Postman Environment: The script saves the processed data and the request body in the Postman environment, allowing reuse in subsequent requests.
    Logging Data: Displays the processed data and the final request structure in the console for verification and validation purposes.

## 1.3. Note for Users:
    The script is flexible and can be adapted for any project by modifying the field names in the JSON structure to match the API requirements. It is recommended to name the variables in the data file in a way that matches the variable names in the JSON structure to maintain order and ease of use. The request body in Postman is {{requestBody}} rather than the standard format.

[Pre-request-presentation](presentation/AutoAPI-Pre-request.pdf)