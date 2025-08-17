const axios = require('axios');
require('dotenv').config();

// Get bot token from environment
const BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN || BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
    console.error('❌ Bot token not configured! Please set REACT_APP_TELEGRAM_BOT_TOKEN in your .env file');
    process.exit(1);
}

console.log('🔍 Getting recent Telegram bot updates...\n');

// Function to get recent updates
async function getRecentUpdates() {
    try {
        const response = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`, {
            params: {
                limit: 10  // Get last 10 updates
            }
        });

        const updates = response.data.result;
        
        if (updates.length === 0) {
            console.log('📭 No recent updates found. Send a message to your bot and try again.');
            return;
        }

        console.log(`📊 Found ${updates.length} recent update(s):\n`);
        
        updates.forEach((update, index) => {
            console.log(`🔔 Update #${index + 1}:`);
            console.log('═'.repeat(40));
            
            if (update.message) {
                const message = update.message;
                const user = message.from;
                const chat = message.chat;
                
                console.log(`👤 User: ${user.first_name} ${user.last_name || ''} (@${user.username || 'no_username'})`);
                console.log(`🆔 User ID: ${user.id}`);
                console.log(`💬 Chat ID: ${chat.id}`);
                console.log(`📝 Message: "${message.text || 'N/A'}"`);
                console.log(`📅 Date: ${new Date(message.date * 1000).toLocaleString()}`);
                
                if (message.text === '/start') {
                    console.log('🚀 This was a /start command!');
                    console.log(`📋 Use this Chat ID: ${chat.id}`);
                }
            }
            
            console.log('═'.repeat(40));
            console.log('');
        });
        
        // Show current configuration
        console.log('⚙️  Current Configuration:');
        console.log(`Bot Token: ${BOT_TOKEN.substring(0, 10)}...`);
        console.log(`Chat ID: ${process.env.REACT_APP_TELEGRAM_CHAT_ID || 'Not set'}`);
        
    } catch (error) {
        console.error('❌ Error getting updates:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

// Get bot info first
async function getBotInfo() {
    try {
        const response = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
        const botInfo = response.data.result;
        
        console.log('🤖 Bot Information:');
        console.log(`   Name: ${botInfo.first_name}`);
        console.log(`   Username: @${botInfo.username}`);
        console.log(`   ID: ${botInfo.id}`);
        console.log('');
        
    } catch (error) {
        console.error('❌ Error getting bot info:', error.message);
        if (error.response?.status === 401) {
            console.error('🔑 Invalid bot token! Please check your REACT_APP_TELEGRAM_BOT_TOKEN');
            process.exit(1);
        }
    }
}

// Main function
async function main() {
    await getBotInfo();
    await getRecentUpdates();
}

main().catch(error => {
    console.error('❌ Failed to get updates:', error.message);
    process.exit(1);
});
