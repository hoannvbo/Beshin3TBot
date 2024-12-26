const TelegramBot = require('node-telegram-bot-api');

// Thay bằng token API của bot
const TOKEN = '7267186723:AAFQyV9hY2xYdX50Y8FDw_h8Qexg3vglTrU';

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
// Lệnh /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Gửi danh sách các lệnh
    const commandList = Object.keys(commands)
        .map((cmd) => `/${cmd} - ${commands[cmd].description}`)
        .join('\n');

    bot.sendMessage(
        chatId,
        `Chào mừng bạn đến với bot!\nBạn có thể sử dụng các lệnh sau:\n\n${commandList}\n\nHoặc dùng /reset để đặt lại cuộc trò chuyện.`
    );
});

// Đăng ký các lệnh tự động
Object.keys(commands).forEach((cmd) => {
    bot.onText(new RegExp(`^/${cmd}$`), (msg) => {
        const chatId = msg.chat.id;
        const { description, url } = commands[cmd];

        bot.sendMessage(chatId, description, {
            reply_markup: {
                inline_keyboard: [[{ text: 'Truy cập link', url }]],
            },
        });
    });
});

// Lệnh /reset
bot.onText(/\/reset/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Trạng thái cuộc trò chuyện đã được đặt lại. Bạn có thể bắt đầu lại bằng cách nhập /start.');
});

// Xử lý các tin nhắn không thuộc lệnh
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (!msg.text.startsWith('/')) {
        bot.sendMessage(chatId, 'Mình không hiểu bạn nói gì. Hãy thử nhập /start để xem các lệnh.');
    }
});

console.log('Bot Telegram đang chạy...');
