const {createTransporter} = require("../providers/gmail-provider");

const getHtml = (name, surname, email, number_phone, message) => {
    return `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${name} ${surname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Teléfono:</strong> ${number_phone}</p>
    <p><strong>Mensaje:</strong> ${message}</p>
  `;
}

const sendEmail = async (req, res) => {
    const {name, surname, email, number_phone, message} = req.body;

    try {
        const transporter = await createTransporter();
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: process.env.USER_EMAIL,
            subject: "Consulta Backend - Website",
            html: getHtml(name, surname, email, number_phone, message)
        });

        res.status(200).json({message: "Message sent successfully"});
    } catch (error) {
        console.error("error: ", error);
        res.status(500).json({message: "It was not possible to send the message"});
    }
};

module.exports = {sendEmail};