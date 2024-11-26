# Postman Automation Testing 
Automate API testing using Postman, 
with flexible configurations for dynamic content management, 
CSV datasets for iterative requests, and JavaScript for enhanced scripting capabilities.

## Project Description:
This project is designed to automate API testing, 
streamlining the process of comparing API responses with expected results. 
It includes features to exclude dynamic fields (e.g., IDs, timestamps) and focuses on ensuring stable and reliable testing outcomes.  
The main goal is to simplify and accelerate the API testing workflow while providing flexibility for diverse use cases.

## Key Feature:
- **Dynamic Content Management:**  
Automatically handle dynamic data (e.g., identifiers, timestamps) to ensure stability during comparisons.

- **Customizable Ignore Parameters:**  
Easily configure which fields or data types should be excluded from comparison.

- **Advanced Object Comparison:**  
Supports deep comparison of nested objects and arrays, identifying discrepancies in complex JSON structures.

## Logging Differences:
- Generates a detailed log of all mismatched fields between expected and actual responses.
- Highlights specific paths in nested objects for quicker debugging.

## Technical Requirements:
1. **Postman:**  
Used to execute API tests, manage test environments, and automate iterations.
2. **JavaScript:**  
Required for custom scripts that handle dynamic content and advanced response comparisons.
3. **CSV Files:**  
Used for providing iterative test requests and expected results in bulk.

## Getting Started:
Take your tests to the next level! Follow our [step-by-step guide](#step-by-step) to quickly set up and start automating your API testing workflow.