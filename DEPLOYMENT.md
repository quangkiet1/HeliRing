# HeliRing Pro Deployment

## Vercel

1. Install dependencies:

```bash
npm install
```

2. Create environment variables in Vercel:

```bash
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-google-app-password
DISCOUNT_EMAIL_TO=your-gmail@gmail.com
DISCOUNT_CODE=HELIRING25
DISCOUNT_SENDER_NAME=HELICORP
PUBLIC_SITE_URL=https://your-domain.vercel.app
VITE_GEMINI_API_KEY=optional-gemini-key
```

3. Deploy:

```bash
npx vercel --prod
```

Use a Google App Password for `GMAIL_APP_PASSWORD`. Do not use your normal Gmail password.
