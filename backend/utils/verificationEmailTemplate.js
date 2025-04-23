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

module.exports = verificationEmailTemplate;