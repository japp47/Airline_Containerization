const CrudRepository = require('./crud-repository');
const { Flight, Airplane,Airport, City } = require('../models');
const { Sequelize } = require('sequelize');
const { addRowLock } = require('./queries')

const db = require('../models')

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter, sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include:[
                {
                    model: Airplane,
                    required: true,
                    as: 'airplane_detail'
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departure_airport',
                    on: 
                    {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=", Sequelize.col("departure_airport.code"))                               
                    },
                    include: {
                        model:City,
                        required: true,
                        as: 'departureCity'
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrival_airport',
                    on: 
                    {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"),"=", Sequelize.col("arrival_airport.code"))                               
                    },
                    include: {
                        model:City,
                        required: true,
                        as: 'arrivalCity'
                    }
                }
            ]
        });
        return response;
    }

    async updateRemainingSeats(flightId, seats, decrease = true){
        const transaction = await db.sequelize.transaction();
        try {
            await db.sequelize.query(addRowLock(flightId));
            const flight = await Flight.findByPk(flightId);
            if(+decrease) {
                await flight.decrement('totalSeats', {by: seats}, {transaction: transaction});
            } else {
                await flight.increment('totalSeats', {by: seats}, {transaction: transaction});
            }
            await transaction.commit();
            return flight;
        } catch(error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = FlightRepository;