
const { Bot } = require('grammy');


export default function handler(req, res) {
    const bot = new Bot('7974451879:AAF2xuRDdaAt-hNf_9GwN3GNhPBcWDBlzJk');

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'Query' });
    }

    const inlineQueryResult = {
        id: '1',
        parse_mode: 'HTML',
        caption: '🐏 <b>Legendary game in telegram - PLAY AND EARN TON</b> 🕹️', // Подпись к фото
        type: 'photo', // Тип результата - фото
        photo_url: 'https://bot.sven-ton.com/img/playnow.jpg', // URL фото
        thumbnail_url: 'https://bot.sven-ton.com/img/playnow.jpg', // Миниатюра фото
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '▶️ Play Now',
                        url: `https://t.me/SvenTon_bot?start=${userId}` // Ссылка на бота
                    }
                ]
            ]
        }
    };


    // Предположим, что мы хотим отправить сообщение подготовленному пользователю
    const preparedInlineMessage = bot.api.savePreparedInlineMessage(
        userId,
        inlineQueryResult,
        {
            allow_user_chats: true,
            allow_bot_chats: false,
            allow_group_chats: true,
            allow_channel_chats: false,
        }
    );


    // Отправляем ответ клиенту
    res.json({
        data: preparedInlineMessage,
    });
}