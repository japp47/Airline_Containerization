const {StatusCodes} = require('http-status-codes')
const {AirplaneServices} = require('../services');

const {ErrorResponse, SuccessResponse} = require('../utils/common');

async function createAirplane(req, res){
    try {
        const airplane = await AirplaneServices.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
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

async function getAirplanes(req, res){
    try {
        const airplanes = await AirplaneServices.getAirplanes();
        SuccessResponse.data = airplanes;
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

async function getAirplane(req, res){
    try {
        const airplanes = await AirplaneServices.getAirplane(req.params.id);
        SuccessResponse.data = airplanes;
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

async function destroyAirplane(req, res){
    try {
        const airplanes = await AirplaneServices.destroyAirplane(req.params.id);
        SuccessResponse.data = airplanes;
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

async function updateAirplane(req, res){
    try {
        const airplane = await AirplaneServices.updateAirplane({
            capacity: req.body.capacity
        },req.params.id);
        SuccessResponse.data = airplane;
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
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}