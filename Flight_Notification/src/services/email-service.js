const {TicketRepository} = require('../repositories');
const { Mailer } = require('../config');

const ticketRepo = new TicketRepository();

async function sendEmail(mailFrom, mailTo,subject, text){
    try {
        const response = await Mailer.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });
        return response;       
    }catch(error){
        throw error;
    }
}
async function createTicket(data) {
    try {
        const response = await ticketRepo.create(data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function getPendingEmails(){
    try {
        const response = await ticketRepo.getpendingEmails();
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendEmail,
    createTicket,
    getPendingEmails
}