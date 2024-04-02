const {StatusCodes} = require('http-status-codes')
const {AirportServices} = require('../services');

const {ErrorResponse, SuccessResponse} = require('../utils/common');

async function createAirport(req, res){
    try {
        const airport = await AirportServices.createAirport({
            name: req.body.name,
           code: req.body.code,
           address: req.body.address,
           cityId: req.body.cityId,
        });
        SuccessResponse.data = airport;
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

async function getAirports(req, res){
    try {
        const airports = await AirportServices.getAirports();
        SuccessResponse.data = airports;
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

async function getAirport(req, res){
    try {
        const airports = await AirportServices.getAirport(req.params.id);
        SuccessResponse.data = airports;
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

async function destroyAirport(req, res){
    try {
        const airports = await AirportServices.destroyAirport(req.params.id);
        SuccessResponse.data = airports;
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

async function updateAirport(req, res){
    try {
        const airport = await AirportServices.updateAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        },req.params.id);
        SuccessResponse.data = airport;
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

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}  