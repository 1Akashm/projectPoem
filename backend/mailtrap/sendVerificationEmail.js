const { mailTrapClient, sender } = require("./mailtrap.config");
const {
  verificationEmailTemplate,
  resetPasswordTemplate,
  resetSuccessfulTemplate,
} = require("./verificationEmailTemplate");

const sendVerificationEmail = async (user, email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "verify your email",
      html: verificationEmailTemplate(user, verificationToken),
      category: "Email Verification",
    });
  } catch (error) {
    console.log(`error in mail : ${error}`);
    throw new error("error in mail: ", error);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response =await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "29c8d213-ff96-42aa-a6b3-0e96e0a2b4ea",
      template_variables: {
        company_name: "Poematic",
        name: name,
      },
    });
  } catch (error) {
    throw new error("Welcome email error, ", error.message);
  }
};

const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Password",
      html: resetPasswordTemplate(resetURL),
      category: "reset password",
    });
  } catch (error) {
    console.log("Error in forgot password,", error);
    throw new error("Error in forgot password, ", error.message);
  }
};

const sendResetSuccessful = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Password",
      html: resetSuccessfulTemplate(),
      category: "reset password",
    });
  } catch (error) {
    console.log("Error in reset password,", error);
    throw new error("Error in reset password, ", error.message);
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessful,
};
