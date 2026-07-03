import nodemailer from 'nodemailer';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

function discountEmail({ email, language, discountCode, siteUrl }) {
  const isVi = language === 'vi';
  const subject = isVi
    ? `Ma uu dai HeliRing Pro cua ban: ${discountCode}`
    : `Your HeliRing Pro discount code: ${discountCode}`;
  const preview = isVi
    ? 'Cam on ban da dang ky nhan uu dai HeliRing Pro.'
    : 'Thank you for unlocking your HeliRing Pro discount.';

  const html = `
    <div style="font-family:'Be Vietnam Pro', sans-serif; background:#020617; color:#e2e8f0; padding:32px;">
      <div style="max-width:560px; margin:0 auto; background:#0f172a; border:1px solid #1e293b; border-radius:24px; padding:28px;">
        <p style="margin:0 0 10px; color:#34d399; font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">HELICORP</p>
        <h1 style="margin:0 0 16px; color:#ffffff; font-size:28px; line-height:1.1;">${preview}</h1>
        <p style="margin:0 0 24px; color:#cbd5e1; line-height:1.6;">
          ${
            isVi
              ? `Email ${email} da duoc ghi nhan. Hay dung ma ben duoi khi HeliRing Pro mo dat hang som.`
              : `We registered ${email}. Use the code below when HeliRing Pro early ordering opens.`
          }
        </p>
        <div style="background:#022c22; border:1px solid #10b981; border-radius:18px; padding:22px; text-align:center;">
          <p style="margin:0 0 8px; color:#6ee7b7; font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">
            ${isVi ? 'Ma uu dai dat truoc' : 'Pre-order discount code'}
          </p>
          <p style="margin:0; color:#ffffff; font-size:34px; font-weight:900; letter-spacing:3px;">${discountCode}</p>
        </div>
        <p style="margin:24px 0 0; color:#94a3b8; line-height:1.6;">
          ${
            isVi
              ? 'Neu ban khong yeu cau email nay, co the bo qua thong bao nay.'
              : 'If you did not request this email, you can safely ignore it.'
          }
        </p>
        ${
          siteUrl
            ? `<p style="margin:18px 0 0;"><a href="${siteUrl}" style="color:#34d399; text-decoration:none;">${siteUrl}</a></p>`
            : ''
        }
      </div>
    </div>
  `;

  return { subject, html, text: `${preview}\n\nCode: ${discountCode}` };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  const senderName = process.env.DISCOUNT_SENDER_NAME || 'HELICORP';
  const discountCode = process.env.DISCOUNT_CODE || 'HELIRING25';
  const ownerEmail = process.env.DISCOUNT_EMAIL_TO;
  const siteUrl = process.env.PUBLIC_SITE_URL;

  if (!gmailUser || !gmailPassword) {
    return res.status(500).json({
      message: 'Email service is not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD.',
    });
  }

  const body = getBody(req);
  const email = String(body.email || '').trim().toLowerCase();
  const language = body.language === 'vi' ? 'vi' : 'en';

  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
  });

  const content = discountEmail({ email, language, discountCode, siteUrl });

  await transporter.sendMail({
    from: `"${senderName}" <${gmailUser}>`,
    to: email,
    bcc: ownerEmail && ownerEmail !== email ? ownerEmail : undefined,
    replyTo: gmailUser,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });

  return res.status(200).json({ ok: true });
}
