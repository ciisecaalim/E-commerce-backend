const  customerModel = require("../model/cutomerModel")

const bycript = require("bcryptjs")


const createCustomer = async (req, res) => {
    try {
        const {name, email, phone, address, password} = req.body

        //checkEmail

        const checkEmail = await customerModel.findOne({email})

        if(checkEmail){
            res.status(500).send({error : "this email already register"})
        }

        //hash password

        const hahPassword = await bycript.hash(password, 10)

        const newData = new customerModel({
            name,
            email,
            phone,
            address,
            password : hahPassword

        })

        const saveData = await newData.save()
        if(saveData){
            res.send(saveData)
        }


        
    } catch (error) {
        res.status(400).json({error : "server error"})
        
    }
}


//login

const cutomerLgin = async (req, res) => {
    try {
        const {email, password} = req.body

         //checkEmail

        const checkEmail = await customerModel.findOne({email})

        if(!checkEmail){
            res.status(500).send({error : "invalid Email"})
        }


   //checkpass
       const checkpass = await bycript.compare(password, checkEmail.password);
        if (!checkpass) {
        return res.status(500).send({ error: "Invalid password" });
        }

// If the password is valid, send the checkEmail response
    res.send({
        message: "sucess login",
        customer: {
        name : checkEmail.name,
        email :checkEmail.email,
        phone : checkEmail.phone,
        address:checkEmail.address
        }

    });
        
    } catch (error) {
        res.status(400).json({error : "server error"})
        
    }

}


const readCustomer = async (req, res) => {
    const getCustomer = await customerModel.find().select("-password")
    if(getCustomer){
        res.send(getCustomer)
    }
}




module.exports = {createCustomer, cutomerLgin, readCustomer}