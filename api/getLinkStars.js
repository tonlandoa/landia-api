import { Bot } from 'grammy'

const bot = new Bot('7810078793:AAFOL4u7NdZc0nfo7dgL-VjCDHLp8c368Es')

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    const { userId, sum } = req.query;

    if (!userId || !sum) {
        return res.status(400).json({ error: 'userId и sum обязательны' });
    }

    const amount = Number(sum);
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'sum должна быть положительным числом' });
    }

    try {
        // Создаём ссылку на счёт с динамической суммой
        const createInvoiceLink = await bot.api.createInvoiceLink(
            'Buy Business',
            'Buy Business',
            'buy_card',
            '',
            'XTR',
            JSON.stringify([
                {
                    label: 'Buy Business',
                    amount: amount
                }
            ])
        );

        res.json({
            data: createInvoiceLink,
        });
    } catch (error) {
        console.error('Ошибка при создании ссылки:', error);
        res.status(500).json({ error: 'Произошла ошибка при создании ссылки' });
    }
}
