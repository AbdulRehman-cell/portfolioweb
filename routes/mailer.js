const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abdulrehmanishaque32@gmail.com',
    pass: 'egxz ugeh xfuh rosw'  // Use App Password, not Gmail password
  }
});

const sendConfirmationEmail = async (recipientEmail, name = '', message = '') => {
  const mailOptions = {
    from: 'abdulrehmanishaque32@gmail.com',
    to: recipientEmail,
    subject: 'Thanks for Reaching Out – Abdul Rehman | Web Developer',
    html: `
<p>Hi <strong>${name}</strong>,</p>

<p>Thank you for reaching out. I’ve received your message:</p>

<blockquote>${message}</blockquote>

<p>I’ll get back to you soon.</p>

<br>

<p>
  Best regards,<br>
  Abdul Rehman Ishaque<br>
  Full Stack Web Developer
</p>

<p>
  <a href="https://wa.me/923009547799" target="_blank" 
     style="display:inline-flex; align-items:center; background-color:#25D366; 
            color:white; padding:10px 16px; border-radius:8px; 
            font-family:Arial, sans-serif; font-size:14px; text-decoration:none;"> 
    Contact through Whatsapp
  </a>
</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendConfirmationEmail;