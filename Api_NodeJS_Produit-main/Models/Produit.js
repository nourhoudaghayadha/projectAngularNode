
const joi = require("joi");
const mongoose = require("mongoose");



let Produit_schema = new mongoose.Schema({
    name:{
        type : String,
        minLength:3,
        required:true
    },
    price:{
        type :Number,
        min:0,
        required:true
    },
    quantity:{
        type: Number,
        min:0,
        required:true
    }
});
 


let validation_Produit=joi.object({
    name:joi.string().min(3).required(),
    price:joi.number().min(0).positive().required(),
    quantity:joi.number().min(0).positive().required()
});

Produit_schema.methods.validateData=function(data){
    return validation_Produit.validate(data).error;
}


let Produit = mongoose.model('Produit',Produit_schema);

module.exports.Produit=Produit;