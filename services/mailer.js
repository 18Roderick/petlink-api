const nodemailer = require('nodemailer');

const body = '';

const config = {
  user: 'Petlinkutp@gmail.com',
  pass: 'Tecnologica2018'
};
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Petlinkutp@gmail.com',
    pass: 'Tecnologica2018'
  }
});

const emailPasswordReset = async (email, code) => {
  try {
    const options = {
      from: config.user,
      to: email,
      subject: 'cambiar contraseña',
      text: body
    };

    const send = await transporter.sendMail(options);

    return send || false;
  } catch (error) {
    throw error;
  }
};

emailPasswordReset('rjrr507@gmail.com', 4040400)
  .then(result => {
    if (result) {
      console.log('email enviado');
    } else {
      console.log('no se pudo enviar email');
    }
  })
  .catch(err => console.log(err));
module.exports = {
  emailPasswordReset
};
