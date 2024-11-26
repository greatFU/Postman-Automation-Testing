# A simple and detailed guide to test script

## 1. General Description of the Script: 
    The script is designed to compare the actual API response with an expected result, taking into account dynamic or variable data that are not relevant to the test. It allows you to adjust the comparison behavior using custom settings, enabling you to ignore certain fields, specific paths, field types, or clean dynamic content from certain fields before the comparison.

## 1.2. Key Functions of the Script:
### Using the config object, you can define:

- The script loads the expected result from data provided in a CSV file and retrieves the actual response from the API for testing.
- ignoredFields: 
Fields to ignore their values during the comparison.
- ignoredPaths:
Specific paths to ignore.
- ignoredFieldTypes:
Field types to ignore.
- fieldsToClean:
Fields to clean dynamic content before the comparison.
- ### patterns:
    Regular expressions used to identify and remove dynamic content from specified fields before comparison. Each pattern targets specific dynamic elements (such as unique identifiers or timestamps) within field values, allowing the script to cleanse variable data while retaining the static parts necessary for accurate comparison.

## Summary:
    The script provides a flexible and powerful tool for performing automated API testing, allowing you to handle dynamic or variable content and focus on verifying only the critical and relevant data. By customizing the settings, you can fully control the comparison behavior and ensure that the tests are reliable and accurate.






