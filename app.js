const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware} = require('http-proxy-middleware');
require('dotenv').config();

//creating express server
const app = express();

//configuration
const PORT = 3000;
const HOST = 'localhost';
const API_BASE_URL = process.env.API_KEY_URL;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

const API_SERVICE_URL = `${API_BASE_URL}?q=London&appid=${API_KEY_VALUE}`;

//Logging the requests
app.use(morgan("dev"));

//Proxy Logig: Proxy endpoints
app.use('/weather', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite:{
        [`^/weather`]: '',
    },
}));

//starting our Proxy Server
app.listen(PORT, HOST, ()=>{
    console.log('Starting Proxy at ${HOST}:${PORT}');
});