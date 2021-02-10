import express from "express";
import routes from "../routes";
import {
    userDetail,
    editProfile,
    changePassword
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);
// user/id/edit
//더 위에있는 주소를 먼저 인식함 인지 
// /:id 처럼 변수를 받는 Router는 다른 Router들 아래에 위치시켜야 함.
// 그렇지 않은 경우, 다른 Router들에 도달하기 전에 :id 변수의 값으로 인식될 수 있음
// :id를 먼저 두면 뒤에 뭔 글자를 쓰던 다 id값으로 인식해서 id페이지로 보내버림

//userDetail() <- routes.js 를 보면 userDetail은 함수로 선언하였음 그래서 함수형임 

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
