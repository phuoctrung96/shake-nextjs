import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export type EmailFormType = {
  userEmail: string;
  companyName?: string;
  userName: string;
  userMessage: string;
  reportCompany?: string;
  referUrl?: string;
};

const sendEmail = async ({
  userEmail,
  companyName = '',
  userName,
  userMessage,
  reportCompany,
  referUrl,
}: EmailFormType) => {
  return await axios.post(
    process.env.POSTMARK_URL || '',
    {
      From: 'Shake.io <sender@datashake.com>',
      ReplyTo: userEmail,
      To: 'hello@shake.io',
      Subject: 'Contact form submission from Shake.io website',
      TextBody: `Message from shake.io contact us form\n\n
  Customer's name: ${userName}\n
  ${typeof companyName !== 'undefined' ? `\n Company name: ${companyName}\n` : ''}
  Customer's email: ${userEmail}\n
  Customer's message: ${userMessage}
  ${typeof referUrl !== 'undefined' ? `\n Referring URL: ${referUrl}` : ''}
  ${typeof reportCompany !== 'undefined' ? `\n Report company: ${reportCompany}` : ''}`,
      HtmlBody: `<html>
  <body>
    <p><strong>Message from shake.io contact us form</strong></p>
    <p><strong>Customer's name:</strong> ${userName}</p>
    ${
      typeof companyName !== 'undefined'
        ? `<p><strong>Company name:</strong> ${companyName}</p>`
        : ''
    }
    <p><strong>Customer's email:</strong> ${userEmail}</p>
    <p><strong>Customer's message:</strong> ${userMessage.replace(/\n/g, '<br>')}</p>
    ${typeof referUrl !== 'undefined' ? `<p><strong>Referring URL: </strong>${referUrl}</p>` : ''}
    ${
      typeof reportCompany !== 'undefined'
        ? `<p><strong>Report company: </strong>${reportCompany}</p>`
        : ''
    }
  </body</html>`,
    },
    {
      method: 'POST',
      headers: { 'X-Postmark-Server-Token': process.env.POSTMARK_API_KEY || '' },
      timeout: 20000,
    }
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { userName, userEmail, userMessage, companyName, reportCompany, referUrl },
    } = req;
    // @ts-ignore
    const response = await sendEmail({
      userEmail: Array.isArray(userEmail) ? userEmail[0] : userEmail ?? '',
      userName: Array.isArray(userName) ? userName[0] : userName ?? '',
      userMessage: Array.isArray(userMessage) ? userMessage[0] : userMessage ?? '',
      ...(typeof companyName !== 'undefined' && {
        companyName: Array.isArray(companyName) ? companyName[0] : companyName,
      }),
      ...(typeof reportCompany !== 'undefined' && {
        reportCompany: Array.isArray(reportCompany) ? reportCompany[0] : reportCompany,
      }),
      ...(typeof referUrl !== 'undefined' && {
        referUrl: Array.isArray(referUrl) ? referUrl[0] : referUrl,
      }),
    });

    res.status(200).json({ message: 'ok' });
  } catch (error: any) {
    res.status(500).json({ error });
  }
};

export default handler;
