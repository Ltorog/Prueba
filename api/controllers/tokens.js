'use strict';
const Sequelize = require('sequelize');
const { client } = require('pg');
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/backend');
const jwt = require('../jwt');
const models = require('../models');
const Tokens = models.tokens;
const secret = 'xxxx';

function authenticate(req, res) {
    
}
    
module.exports = {
    authenticate
}