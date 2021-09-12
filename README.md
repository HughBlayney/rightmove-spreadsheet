# rightmove-spreadsheet
A Google Apps script to automatically populate a Google Sheet with property data from Rightmove, given a property address.

## Script Setup

- Make a new spreadsheet.
- Go to `Tools -> Script editor`
- Add `Rightmove.gs` (or paste its contents into the created `Code.gs`) file
- Go to the `Triggers` menu (on the left)
- Add a new trigger: run `atEdit` on event type `On edit`. (The reason for not using `onEdit` is because apparently simple triggers [can't access services that require authorisation](https://stackoverflow.com/questions/58359417/you-do-not-have-permission-to-call-urlfetchapp-fetch); in this case fetching a URL)

## Spreadsheet Setup

Create a spreadsheet with column headers (order is important):
- Rightmove URL
- Name
- Price Per Month
- Num Beds
- Num Bathrooms
- Property Type
- Address
- Available Date
- Added Date
- Furnished Type
- Closest Station
- Viewed?
- Notes (optional)
