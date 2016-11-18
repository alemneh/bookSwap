'use strict';
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var CONFIG = require('../config/config.json')[env];

mongoose.connect(process.env[CONFIG.database] || CONFIG.database);
const models = {};

require('./user')(mongoose, models);
require('./book')(mongoose, models);
require('./trade')(mongoose, models);


module.exports = models;
