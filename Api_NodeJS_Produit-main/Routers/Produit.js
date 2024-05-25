const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const { Produit } = require("../Models/Produit");
const _=require('lodash');

//creer un produit
router.post('/AddProduct',async (req,res)=>{
    let prod=new Produit(req.body);
    try{
        prod=await prod.save();
        res.status(201).send(prod);
    }catch (error){
        return res.status(400).send(error.message);
    }
});

/** obtenir tous les produits */
router.get("/GetProduct",async(req,res)=>{
    let produits=await Produit.find();
    res.status(200).send(produits);
})

/** obtenir un produit par id */
router.get("/id/:id",async(req,res)=>{
    let produit= await Produit.findById(req.params.id);
    if(!produit){
        return res.status(400).send("ther is no product with this id");
    }else{
        res.status(200).send(produit);
    }
});

/**mettre a jour le produit */
router.put('/id/:id',async(req,res)=>{
    let produit= await Produit.findById(req.params.id);
    if(!produit){
        return res.status(400).send(prduit);
    }else{
        produit=_.merge(produit,req.body)
        produit=await produit.save();
        res.status(200).send(produit);
    }
});

/** supprimer produit */
router.delete('/id/:id',async(req,res)=>{
    let produit = await Produit.findByIdAndDelete(req.params.id);
    if(!produit){
        return res.status(400).send("product not found");
    }else{
        res.status(200).send(produit);
    }
})

router.get("/search/:ProductName",async(req,res)=>{
    const x = new RegExp(`^${req.params.ProductName}`, 'i');
    let produit=await Produit.find({name:x});
    if(!produit)
        return res.status(400).send('ther is no product with this name');
    else{
        res.status(200).send(produit);
    }
})


module.exports = router;