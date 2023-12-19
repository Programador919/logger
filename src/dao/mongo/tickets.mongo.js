import ticketsModel from './models/tickets.model.js'

export default class Tickets {
    constructor() {

    }

    get = async () => {
        let tickets = await ticketsModel.find()
        return tickets
    }
    addTicket = async (ticket) => {
        try {
            let result = await ticketsModel.create(ticket);
            return result
            console.log("Ticket creado correctamente")
        } catch (error) {
            console.error("Error en la creación del ticket:", error);
            return "Error interno";
        }
    }
}