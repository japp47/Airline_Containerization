const cron = require('node-cron');

const { EmailService } = require('../../services');

function scheduleCrons() {
    cron.schedule('*/5 * * * *', async () => {
        //await EmailService.cancelOldBookings();
        console.log("")
    });
}

module.exports = scheduleCrons;