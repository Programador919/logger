import { Router } from "express";
//import { Users } from '../dao/factory.js'
import UserDTO from "../dao/DTOs/user.dto.js";
import { userService } from "../repositories/index.js";
import Users from "../dao/mongo/users.mongo.js"
// import CustomError from "../services/errors/CustomError.js";
// import { generateUserErrorInfo } from "../servicesErrors/info.js";
// import EErrors from "../servicesErrors/enums.js";


const router = Router()

const usersMongo = new Users()
const users = []

router.get('/', (req, res) => {
    res.send({status:"success", payload:users})
})

router.get("/", async (req, res) => {
    let result = await usersMongo.get()
    res.send({ status: "success", payload: result })
})

router.post("/", async (req, res) => {
    let { first_name, last_name, email, age, password, rol } = req.body

    let user = new UserDTO({ first_name, last_name, email, age, password, rol })
    console.log(user)
    let result = await userService.createUser(user)
    console.log(result)
})




export default router