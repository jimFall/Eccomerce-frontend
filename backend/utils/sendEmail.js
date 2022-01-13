const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // console.log("optionsssssssssssss",options)
//   console.log(" process.env.SMPT_SERVICE", process.env.SMPT_SERVICE);
//   console.log("process.env.SMPT_MAIL", process.env.SMPT_MAIL);
//   console.log("process.env.SMPT_PASSWORD", process.env.SMPT_PASSWORD);

  //peramedicalcourser

  const traspoter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,

    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailoptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await traspoter.sendMail(mailoptions);
};

module.exports = sendEmail;
