const TelegramBot = require('node-telegram-bot-api');

// Thay bằng token API của bot
const TOKEN = '7267186723:AAFQyV9hY2xYdX50Y8FDw_h8Qexg3vglTrU';

// Tạo bot
const bot = new TelegramBot(TOKEN, { polling: true });

// Danh sách các lệnh và link tương ứng
const commands = {
    seed: {
        description: 'Đây là mô tả kèo SSeed',
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

// Đăng ký handler cho các lệnh
Object.keys(commands).forEach((command) => {
    bot.onText(new RegExp(`^/${command}$`), (msg) => {
        const chatId = msg.chat.id;
        const { description, url } = commands[command];

        // Tạo nút bấm với link
        const options = {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Đi đến link',
                            url: url,
                        },
                    ],
                ],
            },
        };

        // Gửi tin nhắn với mô tả và nút bấm
        bot.sendMessage(chatId, description, options);
    });
});

// Thông báo khi bot hoạt động
console.log('Bot đang chạy...');
