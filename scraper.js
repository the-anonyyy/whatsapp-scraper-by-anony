const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const pino = require('pino');

const inviteLink = process.argv[2];
if (!inviteLink) {
    console.error('Usage: node scraper.js "https://chat.whatsapp.com/XXXXX"');
    process.exit(1);
}
const match = inviteLink.match(/chat\.whatsapp\.com\/([A-Za-z0-9]+)/);
if (!match) {
    console.error('Invalid invite link');
    process.exit(1);
}
const inviteCode = match[1];

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState('auth');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' }),
        browser: ['Ubuntu', 'Chrome', '120.0.0'],
        syncFullHistory: false
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            qrcode.generate(qr, { small: true });
            console.log('Scan QR with WhatsApp');
        }
        if (connection === 'open') {
            console.log('Connected. Scraping...');
            await scrapeGroup(sock);
        }
        if (connection === 'close') {
            const code = lastDisconnect?.error?.output?.statusCode;
            if (code !== DisconnectReason.loggedOut) start();
            else process.exit(1);
        }
    });
}

async function scrapeGroup(sock) {
    try {
        const inviteInfo = await sock.groupGetInviteInfo(inviteCode);
        const groupId = inviteInfo.id;
        console.log(`Group: ${inviteInfo.subject}`);

        const metadata = await sock.groupMetadata(groupId);

        const rows = [];
        let skippedAdmins = 0;
        let lidFallback = 0;

        for (const p of metadata.participants) {
            if (p.admin === 'admin' || p.admin === 'superadmin') {
                skippedAdmins++;
                continue;
            }

            let phone = null;

            // Primary: real phone number
            if (p.phoneNumber) {
                phone = p.phoneNumber.split('@')[0];
            } 
            // Fallback: LID (privacy strict users)
            else if (p.id) {
                phone = p.id.split('@')[0].split(':')[0];
                lidFallback++;
            }

            if (phone) {
                rows.push({ phone_number: phone });
            }
        }

        const csvWriter = createCsvWriter({
            path: 'group_members_only.csv',
            header: [{ id: 'phone_number', title: 'PHONE_NUMBER' }]
        });

        await csvWriter.writeRecords(rows);
        console.log(`\nDone.`);
        console.log(`Total participants: ${metadata.participants.length}`);
        console.log(`Admins skipped: ${skippedAdmins}`);
        console.log(`Real numbers: ${rows.length - lidFallback}`);
        console.log(`LID fallback (no phoneNumber): ${lidFallback}`);
        console.log(`Total exported: ${rows.length}`);
        process.exit(0);

    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

start();
