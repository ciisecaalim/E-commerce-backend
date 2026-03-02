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
        res.json({
            message: "success login",
            user: {
                id: loginUser._id,
                userName: loginUser.userName
            }
        });
    } else {
        res.status(400).json({
            error: "incorrect password or username"
        });
    }
}
module.exports = {createUser, userLogin}