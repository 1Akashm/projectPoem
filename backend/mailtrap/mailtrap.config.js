const { MailtrapClient } = require("mailtrap");
require("dotenv").config();
const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const mailTrapClient = new MailtrapClient({
  endpoint: ENDPOINT,
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

module.exports = {mailTrapClient,sender}
