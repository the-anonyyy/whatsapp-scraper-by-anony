# Whatsapp Scraper By Anony

A fast, browserless WhatsApp group member scraper by Anony. Extracts phone numbers of non-admin members from any WhatsApp group invite link.

## Features

- Extract members from any WhatsApp group via invite link
- Strict admin filtering (skips admin and superadmin)
- LID fallback for privacy-restricted members
- Ascending sort of all numbers
- + country code prefix on every number
- CSV and TXT output files
- Session persistence (scan QR once)

## Benefits

- No browser or Chromium needed
- Works on low-end VPS, Termux, or any device with Node.js
- Lightweight dependencies (no Puppeteer, no Selenium)
- Runs headless. Perfect for automation and cron jobs
- Fast. Fetches full group metadata in seconds
- Open source and free
- Reusable session. No repeated QR scans

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

node scraper.js "https://chat.whatsapp.com/XXXXXXXX" (remove “ & paste whatsapp group link)

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
