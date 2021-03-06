// const express = require("express"); //import
import express from "express"; //최신 JS 코드
//require가 하는 일 -> node module을 어딘가에서 가져오는 것
import morgan from "morgan"; //log check 
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
//import는 알파벳순으로 하는게 좋다 

const app = express(); 

app.use(helmet());
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    return next();
    });
//application이 더 안전하도록 만들어줌(security 관련)
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
//directory에서 file에 보내주는 middleware, 주어진 directory에서 file을 전달하는 새로운 middleware function
app.use(cookieParser());
//cookie를 전달받아서 사용할 수 있도록 만들어주는 미들웨어, 사용자 인증 같은 곳에서 쿠키를 검사할때 사용

app.use(bodyParser.json());
//사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어, request정보에서 form이나 json형태로 된 body를 검사함
//아바타의 사진이나 비디오를 업로드 할 때, 제목이나 댓글 같은 정보를 전달할때 form에 담아서 업로드 해야함
//bodyparser가 없다면 콘솔을 확인했을 때 body가 없다고 뜨고, 사용자가 전송한 정보를 알 수 없게됨
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"))
//applicatio에서 발생하는 모든 일들을 logging 하는 것 

app.use(localsMiddleware);
//middlewares.js에서 구현한 미들웨어
//local 변수를 global 변수로 사용하도록 만들어주는 기능

app.use(routes.home, globalRouter); // (/home, /search, /join, /login, /logout) URL
app.use(routes.users, userRouter); // /user/
app.use(routes.videos, videoRouter);

export default app;
//누군가가 내 파일을 불러올 때(import) app object를 주겠다.

//router란 route들의 복잡함을 쪼개주는데 사용할 수 있음 

//use의 의미
//누군가 해당 경로(ex /user)에 접속하면 뒤에 쓴 라우터 전체를 사용하겠다는 의미 


//미들웨어를 만드는 세가지 방법
//1)
// app.user((req, res, next) => {

// })

//2)
// app.use(function(req,res,next){

// })

//3)
// const localsMiddleware = (req, res, next) => {

// }

// app.use(localsMiddleware)


