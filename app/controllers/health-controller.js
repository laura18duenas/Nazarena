const healthCheck = async (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "The service is up"
    });
};

module.exports = {healthCheck};