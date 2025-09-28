const e = require("express")
const productModel = require("../model/productModel")


//create
const createProduct = async(req, res) => {
    try {
        const newData = productModel({
            name:req.body.name,
            quantity:req.body.quantity,
            price:req.body.price,
            category:req.body.category,
            prImg: req.file.filename
        })
        const saveData = await newData.save()
        if(saveData){
            res.send(saveData)
        }
        
    } catch (error) {
        res.status(5000).send(error)
        
    }
}

//read

const readProduct = async(req, res) => {
    const {category} = req.body || {}
    let filterData = {}

    if(category){
        filterData = {category}
    }
     try {
        const getData = await productModel.find(filterData)
        if(getData){
            res.send(getData)
        }
        
     } catch (error) {
        res.send("error")
        
     }
}


//update

const updateProduct = async(req, res) => {
    try {
        const putPro = await productModel.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    name:req.body.name,
                    quantity:req.body.quantity,
                    price:req.body.price,
                    category:req.body.category,
                    prImg: req.file ?  req.file.filename : undefined
                }
            }
        )
        
        if(putPro) {
            res.send(putPro)
        }
        
    } catch (error) {
        res.status(500).send({ message: "Error occurred" });
        
    }
}




//read single data


const readSingleData = async(req, res) => {
    try {
        
        const getdata = await productModel.findById(req.params.id)
        if(getdata){
            res.send(getdata)
        }



    } catch (error) {
        res.status(5000).send(error)
        
    }
}


//delete

const deletedata = async (req, res) => {
    try {
        const remoeveData = await productModel.deleteOne({_id: req.params.id})
        if(remoeveData){
            res.send("success delete")
        }
        
    } catch (error) {
        res.status(5000).send(error)
        
    }
}

const readAllDocu = async (req, res) => {
    try {
        const getData = await productModel.find();
        res.status(200).send(getData); // Send a success status
    } catch (error) {
        console.error("Error retrieving documents:", error); // Improved error logging
        res.status(500).send({ message: "Error retrieving documents" }); // Send error response
    }
};
 

module.exports = {createProduct , readProduct, updateProduct, readSingleData, deletedata , readAllDocu}