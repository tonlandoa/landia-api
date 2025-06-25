import { Bot } from 'grammy'

const bot = new Bot('7810078793:AAFOL4u7NdZc0nfo7dgL-VjCDHLp8c368Es')

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    const { userId } = req.query

    if (!userId) {
        return res.status(400).json({ error: 'Query' })
    }

    const inlineQueryResult = {
        id: '1',
        parse_mode: 'HTML',
        caption: '🏙 Добро пожаловать в BizLand!\n\n🏪 Стройте бизнесы и получайте прибыль прямо в TON',
        type: 'photo',
        photo_url: 'https://www.api-nodeland.com/playearn.png',
        thumbnail_url: 'https://www.api-nodeland.com/playearn.png',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '🏙 Играть и зарабатывать',
                        url: `https://t.me/BizLand_bot/app?startapp=${userId}`,
                    },
                ],
            ],
        },
    }

    try {
        const preparedInlineMessage = await bot.api.savePreparedInlineMessage(
            userId,
            inlineQueryResult,
            {
                allow_user_chats: true,
                allow_bot_chats: false,
                allow_group_chats: true,
                allow_channel_chats: false,
            }
        )

        res.json({ data: preparedInlineMessage })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Internal error' })
    }
}
