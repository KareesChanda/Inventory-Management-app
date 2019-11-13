"use strict";
const filesystem = require('fs');
const models = {};

const singleton = function Singleton(){
    const Sequelize = require('sequelize');
    let sequelize = require('./config_db');
    let modelsPath = "";

    this.setup = function(path) {
        modelsPath = path;
        init();
    };

    this.model = function (name){
        return models[name];
    };

    this.Seq = function (){
        return Sequelize;
    };

    function init(){
        filesystem.readdirSync(modelsPath).forEach(function(name){
            const object = require(modelsPath + "/" + name);
            const options = object.options || {};
            const modelName = name.replace(/\.js$/i, "");
            models[modelName] = sequelize.define(modelName, object.model, options);
        });

        let Customer = sequelize.model("Customer");
        let Product = sequelize.model("Product");

        Customer.hasMany(Product);
    }
};

singleton.instance = null;

singleton.getInstance = function(){
    if(this.instance === null){
        this.instance = new singleton();
    }
    return this.instance;
};

module.exports = singleton.getInstance();