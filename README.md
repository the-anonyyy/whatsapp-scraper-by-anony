# Whatsapp Scraper By Anony

A fast, browserless WhatsApp group member scraper by Anony. Extracts phone numbers of non-admin members from any WhatsApp group invite link.

## Features

- No browser or Chromium required
- Automatically skips group admins and superadmins
- Handles privacy-restricted members (LID fallback)
- Sorts numbers in ascending order
- Adds + country code prefix
- Outputs clean CSV and TXT files

## Requirements

- Node.js 18 or higher
- A WhatsApp account (to scan QR code once)

## Installation

git clone https://github.com/YOUR_USERNAME/whatsapp-scraper-by-anony.git
cd whatsapp-scraper-by-anony
npm install

## Usage

node scraper.js "https://chat.whatsapp.com/XXXXXXXX"

1. Terminal will display a QR code.
2. Open WhatsApp, go to Settings, Linked Devices, Link a Device.
3. Scan the QR code.
4. Script fetches the group, skips admins, and saves output.

## Output

- group_members_only.csv
- sorted_numbers.txt

Both sorted ascending with + prefix.

## Notes

- Session saved in auth folder. Delete it to re-authenticate.
- Privacy-restricted members: LID fallback used.
- WhatsApp may block VPS IPs. Use a proxy if needed.

## License

MIT (c) Anony
