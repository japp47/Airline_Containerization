const express = require('express');
const rateLimit = require('express-rate-limit');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { createProxyMiddleware } = require('http-proxy-middleware');
const serverConfig = require('./config/server-config');

const app = express();
const limiter = rateLimit({
    windowMs: 2*60*1000,
    max: 3
})
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(limiter);

app.use('/flightService', 
    createProxyMiddleware(  
    {
        target: serverConfig.FLIGHT_SERVICE, 
        crossOrigin: true,
        pathRewrite: {'^/flightService' : '/'}
    }
));
app.use('/bookingService', 
    createProxyMiddleware(  
    {
        target: ServerConfig.BOOKING_SERVICE, 
        crossOrigin: true
    }
));
 
app.use('/api', apiRoutes);
// app.use('/flightsService/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});

// authorize in the flight service you are not a flight comppany you cannot edit/delete a flight