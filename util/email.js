const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendEmail = async (email,html) => {
    const msg = {
        to: email,
        from: 'sanskar.rajput@mindbowser.com',
        subject: "Test mail ",
        text: "This is email from Sanskar",
        html
    };

    try {
        await sgMail.send(msg);
        console.log("Email sent successfully");
    } catch (error) {
        console.error(error);
    }
};

module.exports = sendEmail