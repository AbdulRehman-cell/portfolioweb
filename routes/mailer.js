


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abdulrehmanishaque32@gmail.com',
    pass: 'egxz ugeh xfuh rosw'  // Use App Password, not Gmail password
  }
});
const sendConfirmationEmail = async (recipientEmail) => {
  const mailOptions = {
    from: 'abdulrehmansishaque32@gmail.com',
    to: recipientEmail ,
    subject: 'Thanks for Reaching Out – Abdul Rehman | Web Developer',
    text: ""
  };

  await transporter.sendMail(mailOptions);
};



module.exports = sendConfirmationEmail;
