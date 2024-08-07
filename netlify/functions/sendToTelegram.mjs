// netlify/functions/sendToTelegram.mjs
import fetch from 'node-fetch';

export async function handler(event, context) {
  const { name, email, phone, message } = JSON.parse(event.body);

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  const text = `New contact form submission:
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Message: ${message}`;

  const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: text,
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent to Telegram' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
