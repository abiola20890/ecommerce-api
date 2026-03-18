import 'dotenv/config';
import { sendEmail } from './src/services/emailService.js';

async function runTest() {
  try {
    const result = await sendEmail('sademola914@gmail.com', 'Test Email', {
      text: 'This is a test email from Resend API!',
      html: '<p>This is a <strong>test email</strong> from Resend API!</p>',
    });

    console.log('✅ Email sent successfully!');
    console.log('Resend API response:', result);
  } catch (err) {
    console.error('❌ Failed to send email:', err.message);
  }
}

runTest();