// netlify/functions/sendToTelegram.mjs
import fetch from "node-fetch";

export async function handler(event, context) {
  console.log("Function is invoked");
  const { name, email, phone, message } = JSON.parse(event.body);

  console.log("Received data:", { name, email, phone, message });

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  console.log(
    "Using Telegram Token and Chat ID:",
    telegramToken,
    telegramChatId
  );

  const text = `Новий користувач:\n
Ім'я: ${name}\n
Email: ${email}\n
Телефон: ${phone}\n
Повідомлення: ${message}\n`;

  const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: text,
      }),
    });

    const data = await response.json();

    console.log("Response from Telegram:", data);

    if (!data.ok) {
      throw new Error(data.description);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message sent to Telegram" }),
    };
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
