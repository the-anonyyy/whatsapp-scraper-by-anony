# Whatsapp Scraper By Anony

A fast, browserless WhatsApp group member scraper by Anony. Extracts phone numbers of non-admin members from any WhatsApp group invite link.

## Features

- No browser or Chromium required
- Automatically skips group admins and superadmins
- Handles privacy-restricted members
- Sorts numbers in ascending order
- Adds + country code prefix

## Requirements

- Node.js 18 or higher
- A WhatsApp account

## Installation

git clone https://github.com/the-anonyyy/whatsapp-scraper-by-anony.git
cd whatsapp-scraper-by-anony
npm install

## Usage

node scraper.js "https://chat.whatsapp.com/XXXXXXXX"

## Output

group_members_only.csv
sorted_numbers.txt

## License

MIT (c) Anony
