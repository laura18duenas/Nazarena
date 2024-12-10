const nodemailer = require("nodemailer");
const {google} = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const createOAuth2Client = () => {
    return new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );
};

const getAccessToken = async (oauth2Client) => {
    oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});
    const {token} = await oauth2Client.getAccessToken();
    return token;
};

const createTransporter = async () => {
    const oauth2Client = createOAuth2Client();
    const accessToken = await getAccessToken(oauth2Client);

    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.USER_EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });
};

module.exports = {createTransporter}