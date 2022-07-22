const express = require("express");
const Product = require("../models/Product.model.js");
const Auth = require("../middlewares/auth.js");

const router = new express.Router();

router.post("/products", Auth, async (req, res) => {
    try {
        const newProduct = new Product({
            ...req.body, owner: req.user_id
        })
        await newProduct.save();
        res.status(201).send(newProduct)
    } catch (error) {
        res.status(400).send ({msg: "error", error: error})
        
    }
})


router.get("/products/:id", async (req, res) => {
    try {
        const prod = await Product.findOne({_id: req.params.id})
        if(!prod){
            res.status(404).send({msg: "Product not found"})
        }
        res.status(200).send(prod)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/products/new", async (req, res) => {
    try {
        const prods = await Product.find({})
        res.status(200).send(prods)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

//FALTA CONTINUAR LOS PRODUCTOS
