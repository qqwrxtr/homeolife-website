const axios = require('axios');
require('dotenv').config();

// Get bot token from environment
const BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN || BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
    console.error('❌ Bot token not configured! Please set REACT_APP_TELEGRAM_BOT_TOKEN in your .env file');
    process.exit(1);
}

console.log('🤖 Telegram Bot Monitor Started');
console.log('📊 Monitoring for /start commands and new users...');
console.log('💡 Send /start to your bot to see user information\n');

let lastUpdateId = 0;

// Function to get updates from Telegram
async function getUpdates() {
    try {
        const response = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`, {
            params: {
                offset: lastUpdateId + 1,
                timeout: 30
            }
        });

        const updates = response.data.result;
        
        if (updates.length > 0) {
            updates.forEach(update => {
                processUpdate(update);
                lastUpdateId = update.update_id;
            });
        }
    } catch (error) {
        console.error('❌ Error getting updates:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

// Function to process each update
function processUpdate(update) {
    console.log('\n🔔 New Update Received:');
    console.log('═'.repeat(50));
    
    if (update.message) {
        const message = update.message;
        const user = message.from;
        const chat = message.chat;
        
        // Log user information
        console.log('👤 User Information:');
        console.log(`   ID: ${user.id}`);
        console.log(`   First Name: ${user.first_name || 'N/A'}`);
        console.log(`   Last Name: ${user.last_name || 'N/A'}`);
        console.log(`   Username: @${user.username || 'N/A'}`);
        console.log(`   Language: ${user.language_code || 'N/A'}`);
        console.log(`   Is Bot: ${user.is_bot}`);
        
        console.log('\n💬 Chat Information:');
        console.log(`   Chat ID: ${chat.id}`);
        console.log(`   Chat Type: ${chat.type}`);
        console.log(`   Chat Title: ${chat.title || 'N/A'}`);
        
        console.log('\n📝 Message Information:');
        console.log(`   Message ID: ${message.message_id}`);
        console.log(`   Date: ${new Date(message.date * 1000).toLocaleString()}`);
        console.log(`   Text: "${message.text || 'N/A'}"`);
        
        // Special handling for /start command
        if (message.text === '/start') {
            console.log('\n🚀 /START COMMAND DETECTED!');
            console.log('📋 Copy this Chat ID for your .env file:');
            console.log(`   REACT_APP_TELEGRAM_CHAT_ID=${chat.id}`);
            
            // Send welcome response
            sendWelcomeMessage(chat.id, user.first_name);
        }
        
        // Log raw update for debugging
        console.log('\n🔍 Raw Update Data:');
        console.log(JSON.stringify(update, null, 2));
        
    } else if (update.callback_query) {
        console.log('🔘 Callback Query:', update.callback_query);
    } else {
        console.log('📦 Other Update Type:', update);
    }
    
    console.log('═'.repeat(50));
}

// Function to send welcome message
async function sendWelcomeMessage(chatId, firstName) {
    try {
        const welcomeText = `👋 Привет, ${firstName}!\n\n🤖 Этот бот настроен для получения сообщений с сайта HomeoLife.\n\n✅ Ваш Chat ID: ${chatId}\n📝 Теперь вы будете получать уведомления о новых сообщениях с контактной формы.`;
        
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: chatId,
            text: welcomeText,
            parse_mode: 'HTML'
        });
        
        console.log('✅ Welcome message sent successfully!');
    } catch (error) {
        console.error('❌ Error sending welcome message:', error.message);
    }
}

// Function to get bot information
async function getBotInfo() {
    try {
        const response = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
        const botInfo = response.data.result;
        
        console.log('🤖 Bot Information:');
        console.log(`   Name: ${botInfo.first_name}`);
        console.log(`   Username: @${botInfo.username}`);
        console.log(`   ID: ${botInfo.id}`);
        console.log(`   Can Join Groups: ${botInfo.can_join_groups}`);
        console.log(`   Can Read All Group Messages: ${botInfo.can_read_all_group_messages}`);
        console.log(`   Supports Inline Queries: ${botInfo.supports_inline_queries}`);
        console.log('');
        
    } catch (error) {
        console.error('❌ Error getting bot info:', error.message);
        if (error.response?.status === 401) {
            console.error('🔑 Invalid bot token! Please check your REACT_APP_TELEGRAM_BOT_TOKEN');
            process.exit(1);
        }
    }
}

// Function to show instructions
function showInstructions() {
    console.log('\n📖 Instructions:');
    console.log('1. Open Telegram and find your bot');
    console.log('2. Send /start command to your bot');
    console.log('3. Copy the Chat ID from the logs');
    console.log('4. Update your .env file with the Chat ID');
    console.log('5. Press Ctrl+C to stop monitoring\n');
}

// Main function
async function main() {
    // Get bot information first
    await getBotInfo();
    
    // Show instructions
    showInstructions();
    
    // Start polling for updates
    console.log('🔄 Starting to poll for updates...\n');
    
    // Poll for updates every 1 second
    setInterval(async () => {
        await getUpdates();
    }, 1000);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Monitoring stopped. Goodbye!');
    process.exit(0);
});

// Start the monitor
main().catch(error => {
    console.error('❌ Failed to start monitor:', error.message);
    process.exit(1);
});
