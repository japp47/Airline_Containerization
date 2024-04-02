const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');
const flightRepository = new FlightRepository();
const { dateTimeHelpers } = require('../utils/helpers');
const { Op } = require('sequelize')


async function createFlight(data) {
    try {

        if(!dateTimeHelpers.compareTime(data.arrivalTime, data.departureTime)){
            throw new AppError('Arrival time must be greater than departure time', StatusCodes.BAD_REQUEST);
        }
        
        else if(data.departureAirportId == data.arrivalAirportId){
            throw new AppError('Departure and arrival airport reference cannot be same', StatusCodes.BAD_REQUEST);
        }
        const flight = await flightRepository.create(data);
        return flight;
    }
    catch(error){

        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        else if(error.name == "SequelizeForeignKeyConstraintError" || error.name == "SequelizeDatabaseError" || error.statusCode == StatusCodes.BAD_REQUEST){
            throw new AppError(error.message, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endTripTime = " 23:59:00";
    if(query.trips) {
        let [departureAirportId, arrivalAirportId] = query.trips.split("-");
        if(departureAirportId === arrivalAirportId) {
            throw new Error('Departure and arrival airports cannot be the same');
        }
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }   
    if(query.price){
        [minPrice, maxPrice] = query.price.split("-") 
        customFilter.price = {
            [Op.between]: [minPrice, (maxPrice==undefined) ? 20000: maxPrice]
        }
    } 
    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    } 
    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endTripTime]
        }
    }
    if(query.sort){
        const params = query.sort.split(",");
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter= sortFilters
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {

        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('flight you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the flight', StatusCodes.INTERNAL_SERVER_ERROR);     
    }
} 
async function updateSeats(data){
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.decrement);
        return response;
    } catch (error) {
        throw new AppError('Cannot update data of all the flight', StatusCodes.INTERNAL_SERVER_ERROR);     

    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats  
}