# Expression Library

A comprehensive, screen-reader-first library for finding, understanding, and copying emoji, emoticons, kaomoji, symbols, and flags.

## Current version

The main `index.html` experience includes:

- 3,943 fully qualified expressions from Unicode Emoji 17.0
- Official English CLDR 48 short names and search keywords
- An editable combo box with selectable expression suggestions
- Search by name, meaning, feeling, theme, type, and keyword
- Original Open Door image expressions with image-copy and download options
- Enter-to-copy from suggestions and expression tables
- Search Results, Frequently Used, and Favorites tables
- Compact tables containing 10 expressions per row by default
- An optional five-expression row preference
- Brief screen-reader announcements by default
- Optional meanings, types, and compatibility information
- Theme tables that can be shown, hidden, and reordered
- Saved preferences, usage counts, favorites, table order, and open themes
- Keyboard, high-contrast, reduced-motion, narrow-screen, and magnification support

Open `index.html` in a browser to use the library. No installation, account, or internet connection is required after the files have been downloaded.

## Interaction

Type in the Find an expression edit combo to receive suggestions. Use Up Arrow and Down Arrow to select a suggestion, then press Enter to copy it. Press Enter without selecting a suggestion to show all matches.

Expression tables contain one expression button in each cell. Press Enter or Space on a button to copy only the expression. Frequently Used updates after every successful copy.

## Data

`unicode-expressions.js` is generated from the Unicode Emoji 17.0 test data and English CLDR 48 annotations. Run the following after updating the source data:

`node scripts/build-emoji-data.mjs`

See `DataSources.md` for source and licensing information.

## Design principle

The software works for the user. People should be able to find an expression by describing what they want to communicate. They should not need to know its assigned category or navigate through an enormous visual grid.

## Test pages

`InteractionTests.html` and `TableDesignDemo.html` preserve the interaction experiments that informed the main library design.
