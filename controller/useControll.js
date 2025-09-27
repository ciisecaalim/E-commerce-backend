const useModel = require("../model/userModel")

const createUser = async (req, res) => {
    const newData = useModel(req.body)
    const saveData = await newData.save()
    if(saveData){
        res.send(saveData)
    }

}
const userLogin = async (req, res) => {
    const loginUser = await useModel.findOne({
        userName: req.body.userName,
        password: req.body.password
    });

    if (loginUser) {
        res.send("success login");
    } else {
        res.send({
            error: "incorrectpassword or username"
        });
    }
}
module.exports = {createUser, userLogin}