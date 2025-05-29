import { Bot } from 'grammy'

const bot = new Bot('7974451879:AAF2xuRDdaAt-hNf_9GwN3GNhPBcWDBlzJk')

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
        caption: '🪐 TonLandia App — Play and Earn TON 💎!</b> 💎\n\n‼️ Join now and start earning TON:',
        type: 'photo',
        photo_url: 'https://www.api-dev.dev/refferalimg.jpg',
        thumbnail_url: 'https://www.api-dev.dev/refferalimg.jpg',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '💎 Earn TON!',
                        url: `https://t.me/CivilizationTon_bot/app?startapp=${userId}`,
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
