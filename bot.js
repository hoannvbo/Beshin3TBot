const axios = require('axios'); // Thêm thư viện axios để gửi yêu cầu HTTP
const TelegramBot = require('node-telegram-bot-api');

// Thay bằng token API của bot
const TOKEN = '7267186723:AAFQyV9hY2xYdX50Y8FDw_h8Qexg3vglTrU';

// Thay URL webhook từ Make.com
const WEBHOOK_URL = 'https://hook.eu2.make.com/jjddc02cilfmmm841b7jqtmt1zd4xga8';

// Tạo bot
const bot = new TelegramBot(TOKEN, { polling: true });

// Danh sách các lệnh và link tương ứng
const commands = {
    seed: {
        description: 'Đây là mô tả kèo Seed',
        url: 'http://t.me/seed_coin_bot/app?startapp=7102969020',
    },
    matchquest: {
        description: 'Đây là mô tả cho MatchQuest.',
        url: 'https://t.me/MatchQuestBot/start?startapp=421c2b418e4d6c3cafc1fe2d4048a7dc',
    },
    blum: {
        description: 'Đây là mô tả cho Blum.',
        url: 'https://t.me/blum/app?startapp=ref_cpD89CwbSU',
    },
    timefarm: {
        description: 'Đây là mô tả cho Time FarmFarm.',
        url: 'https://t.me/TimeFarmCryptoBot?start=1hqr5B7o1wmJdZi9K',
    },
    yescoin: {
        description: 'Đây là mô tả cho YesCoin',
        url: 'https://t.me/theYescoin_bot/Yescoin?startapp=5lDRJD',
    },
    birds: {
        description: 'Đây là mô tả cho Birds.',
        url: 'https://t.me/birdx2_bot/birdx?startapp=7102969020',
    },
    clayton: {
        description: 'Đây là mô tả cho Clayton.',
        url: 'https://t.me/claytoncoinbot/game?startapp=7102969020',
    },
    hot: {
        description: 'Đây là mô tả cho Hot.',
        url: 'https://t.me/herewalletbot/app?startapp=23774733',
    },
};

// Đối tượng lưu trữ tên người dùng
const userNames = {}; // Lưu trữ tên người dùng theo chatId

// Hàm xử lý lệnh /start
function handleStart(chatId, userName) {
    const commandList = Object.keys(commands)
        .map((cmd) => `/${cmd} - ${commands[cmd].description}`)
        .join('\n');

    bot.sendMessage(
        chatId,
        `Chào mừng bạn đến với bot, ${userName}!\nBạn có thể sử dụng các lệnh sau:\n\n${commandList}\n\nHoặc dùng các nút bên dưới:`,
        // {
        //     reply_markup: {
        //         inline_keyboard: Object.keys(commands)
        //             .filter((cmd) => commands[cmd].url) // Chỉ hiển thị các lệnh có liên kết
        //             .map((cmd) => [
        //                 { text: commands[cmd].description, url: commands[cmd].url },
        //             ]),
        //     },
        // }
    );
}

// Hàm ghi log tin nhắn và gửi đến webhook
function logMessageAndSendToWebhook(msg) {
    const currentTime = new Date().toISOString();
    const username = msg.from.username || msg.from.first_name;
    const messageText = msg.text || 'Không có nội dung';

    // In ra log với thời gian, tên người dùng và nội dung tin nhắn
    console.log(`[${currentTime}] ${username}: ${messageText}`);

    // Dữ liệu gửi đến webhook
    const data = {
        chatId: msg.chat.id,
        username: username,
        messageText: messageText,
    };

    // Gửi dữ liệu đến webhook của Make.com
    axios.post(WEBHOOK_URL, data)
        .then(response => {
            console.log('Dữ liệu đã được gửi đến webhook:', response.data);
        })
        .catch(error => {
            console.error('Lỗi khi gửi dữ liệu đến webhook:', error);
        });
}

// Xử lý tin nhắn từ người dùng
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Ghi log tin nhắn và gửi đến webhook
    logMessageAndSendToWebhook(msg);

    // Lưu tên người dùng
    const userName = msg.from.username || msg.from.first_name;
    userNames[chatId] = userName;

    // Nếu tin nhắn không phải văn bản, coi như không hợp lệ
    if (typeof text !== 'string') {
        handleStart(chatId, userName);
        return;
    }

    // Kiểm tra nếu người dùng nhập không phải lệnh hợp lệ
    if (!text.startsWith('/') || !Object.keys(commands).includes(text.slice(1))) {
        handleStart(chatId, userName);
    } else {
        // Xử lý các lệnh hợp lệ khác nếu có
        const commandKey = text.slice(1);
        if (commands[commandKey]) {
            const { description, url } = commands[commandKey];
            if (url) {
                bot.sendMessage(chatId, description, {
                    reply_markup: {
                        inline_keyboard: [[{ text: 'Truy cập link', url }]],
                    },
                });
            } else if (commandKey === 'reset') {
                handleStart(chatId, userName);
            }
        }
    }
});

console.log('Bot Telegram đang chạy...');
