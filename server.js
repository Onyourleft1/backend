const express = require('express');
const dotenv = require('dotenv');
const mailgun = require('mailgun-js');

dotenv.config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/email/contact', (req, res) => {
  const { name, email, phone, mes } = req.body;
  const data = {
    from: 'New Contact Form <me@samples.mailgun.org>',
    to: 'fadiajami82@gmail.com',
    subject: 'New Contact Form',
    html: `<p>Name: ${name}<br/>Email: ${email}<br/>Phone: ${phone}<br/>Message: ${mes}</p>`,
  };
  mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
      res.status(500).send({ message: 'Error in Sending Email' });
    } else {
      console.log(body);
      res.send({ message: 'Email Sent Successfully' });
    }
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});

module.exports = app;
