const {FlightServices} = require('../services');

const {ErrorResponse, SuccessResponse} = require('../utils/common');
const { StatusCodes } = require('http-status-codes');

async function createFlight(req, res){
    try {
        const flight = await FlightServices.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res
               .status(error.statusCode)
               .json(ErrorResponse);      
    }
}
async function getAllFlights(req, res){
    try {
        const flights = await FlightServices.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res
               .status(error.statusCode)
               .json(ErrorResponse);
    }
}

async function getFlight(req, res){
    try {
        const flights = await FlightServices.getFlight(req.params.id);
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res
               .status(error.statusCode)
               .json(ErrorResponse); 
    }
}

async function updateSeats(req, res){
    try {
        const response = await FlightServices.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            decrease: req.body.decrease
            
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res
               .status(error.statusCode)
               .json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
   
}  