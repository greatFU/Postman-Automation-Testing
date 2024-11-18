# 1. Postman-Automation-Testing
 API testing automation project with Postman and JavaScript

## 1.1. Project Description:
    This project is designed for API testing automation, providing tools for comparing responses with expected results, excluding dynamic fields, and ensuring test stability. The main goal of the project is to simplify and speed up the API testing process, making it more reliable and flexible.

## 1.2. Project Features:

    Dynamic Content Management: Ability to exclude dynamic data such as identifiers, timestamps, etc.

    Customizable Ignore Parameters: Configure which fields and data types to ignore during comparison.

    Object Comparison: Detailed comparison of API responses, including handling nested objects and arrays.

## 1.3. Logging Differences:

    Detailed report of found differences for easier debugging.

## 1.4. Technical Requirements:

    Postman: Used to run tests and manage environments.

    JavaScript: Required for running certain scripts.

    CSV: Iterations requests and expected result

# 2. A simple and detailed guide to pre-request script

## 2.1. General Description of the Script:
    This pre-request script is designed to process data from a CSV file by removing empty or unnecessary fields and creating a customized data structure (requestBody) that will be used for sending API requests.
## 2.2. Key Functions of the Script:
    Data Reading: The script reads data from a source and maps it to an object (csvData).
    Data Cleaning: The script removes fields that contain no values (either empty or null). This ensures that only the necessary fields are included, allowing you to omit certain fields for specific iterations by leaving them empty.
    Creating Request Body (requestBody): Constructs a custom JSON structure (requestBody) tailored to the needs of the project.
    Saving Data in Postman Environment: The script saves the processed data and the request body in the Postman environment, allowing reuse in subsequent requests.
    Logging Data: Displays the processed data and the final request structure in the console for verification and validation purposes.

## 2.3. Note for Users:
    The script is flexible and can be adapted for any project by modifying the field names in the JSON structure to match the API requirements. It is recommended to name the variables in the data file in a way that matches the variable names in the JSON structure to maintain order and ease of use. The request body in Postman is {{requestBody}} rather than the standard format.

    [Pre-request-presentation](presentation/AutoAPI-Pre-request.pdf)