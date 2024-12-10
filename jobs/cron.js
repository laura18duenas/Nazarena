const cron = require("node-cron");
const healthCheckUrl = process.env.HEALTH_CHECK_URL;

const job = cron.schedule('*/10 * * * *', async function () {
    try {
        const fetch = (await import("node-fetch")).default;
        const response = await fetch(healthCheckUrl);

        if (!response.ok) {
            console.log("HTTP ERROR:", response.status);
        }

        const data = await response.json();
        console.log(data.message);

    } catch (error) {
        console.log("Error fetching data:", error.message);
    }
});

module.exports = {job};
