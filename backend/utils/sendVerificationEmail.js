const {mailTrapClient,sender} = require("../mailtrap/mailtrap.config");
const verificationEmailTemplate = require("./verificationEmailTemplate");

const sendVerificationEmail =async (user,email,verificationToken)=>
{
    const recipient = [{email}];

    try{
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "verify your email",
            html: verificationEmailTemplate(user,verificationToken),
            category: "Email Verification" 
        })

    }catch(error)
    {
        console.log(`error in mail : ${error}`);
        throw new error("error in mail: ", error);
    }
}

module.exports = sendVerificationEmail;