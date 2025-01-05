const nodemailer = require('nodemailer');
const { SENDGRID_API_KEY } = require('../../config/config');

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    api_key: SENDGRID_API_KEY,
  },
});

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'your_email@example.com',
    to,
    subject,
    text,
  };
  await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };