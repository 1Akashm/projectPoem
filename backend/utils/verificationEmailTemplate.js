const verificationEmailTemplate = (user, verificationToken) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
          margin: 0;
        }
        .container {
          max-width: 600px;
          background-color: #ffffff;
          margin: auto;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
        }
        .btn {
          display: inline-block;
          padding: 12px 24px;
          margin-top: 20px;
          color: #fff;
          background-color: #4CAF50;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #888;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Verify Your Email</h2>
        </div>
        <p>Hi ${user},</p>
        <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
        <div style="text-align: center;">
            your verification code is <P>${verificationToken}</P>
        </div>
        <div class="footer">
          <p>If you did not request this email, please ignore it.</p>
        </div>
      </div>
    </body>
  </html>
`;

const resetPasswordTemplate =(resetURL)=>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; margin-top: 30px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <tr>
      <td style="background-color: #4A90E2; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Reset Your Password</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px 20px;">
        <p style="font-size: 16px; color: #333;">Hi there,</p>
        <p style="font-size: 16px; color: #333;">You recently requested to reset your password. Use the code below to complete the process:</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f0f0f0; text-align: center; border-radius: 5px;">
          <a href="${resetURL}" style="cursor:pointer; background: #ffcc88; color: #bbb7b8; padding: 10px; border-radius: 10px; text-decoration: none">Reset Password</a>
        </div>
        
        <p style="font-size: 14px; color: #777;">This code will expire in 15 minutes. If you didn’t request a password reset, you can safely ignore this email.</p>
        
        <p style="margin-top: 30px; font-size: 16px; color: #333;">Thanks,<br>The ChaiAndCode Team</p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #999;">
        &copy; 2025 ChaiAndCode. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>

`;

module.exports = {verificationEmailTemplate,resetPasswordTemplate};