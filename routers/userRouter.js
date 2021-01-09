import express from "express";
import routes from "../routes";
import {
    users,
    userDetail,
    editProfile,
    changePassword
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);
// user/id/edit

export default userRouter;

// userRouter.get("/", (req, res) => res.send('user index')) //악명 함수 선언
// userRouter.get("/edit", (req, res) => res.send('user edit')) //악명 함수 선언
// userRouter.get("/password", (req, res) => res.send('user password')) //악명 함수 선언

//function alalal () {
//     return true
// }

// {} 가 있으면 return을 적어줘야됨 없으면 암시적 리턴

// alalal = () => true

// M data
// V how does the data look
// C function thate looks for the data 
