# rightmove-spreadsheet
A Google Apps script to automatically populate a Google Sheet with property data from Rightmove, given a property address.

It should eventually look a bit like this:
![output spreadsheet](https://user-images.githubusercontent.com/44006267/132998672-1915e65c-e298-4fb3-b811-06000b9d9c7a.png "Disclaimer: these are not properties that I'm viewing...")
If setup correctly, you should be able to paste a Rightmove link into the column on the left, and the other fields will be automatically populated.

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
