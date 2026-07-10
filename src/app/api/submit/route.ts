import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, phone, company, interest, comment } = await req.json();

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: 'Telegram not configured' },
      { status: 500 },
    );
  }

  const text = [
    `📌 Новая заявка *EMC Textile*`,
    ``,
    `*Имя:* ${name}`,
    `*Телефон:* ${phone}`,
    company ? `*Компания:* ${company}` : null,
    interest ? `*Интерес:* ${interest}` : null,
    comment ? `*Комментарий:* ${comment}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    },
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Telegram error' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
