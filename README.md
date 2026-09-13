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
- A WhatsApp account (to scan QR once)

## Installation

### 1. Install Node.js

Ubuntu / Debian:

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

Termux (Android):

pkg install nodejs git -y

Windows / Mac: Download from https://nodejs.org

### 2. Clone Repository

git clone https://github.com/thetechnicalguyx/whatsapp-scraper-by-anony.git
cd whatsapp-scraper-by-anony

### 3. Install Dependencies

npm install

### 4. Run

node scraper.js "https://chat.whatsapp.com/XXXXXXXX"

Scan the QR with WhatsApp. Output files will be generated in the same folder.

## Output

- group_members_only.csv
- sorted_numbers.txt

## Notes

- Session saved in auth folder. Delete it to re-authenticate.
- Privacy-restricted members: LID fallback used.
- WhatsApp may block VPS IPs. Use a proxy if needed.

## Disclaimer

Educational purposes only. Use responsibly.

## License

MIT (c) Anony
