// const express = require("express"); //import
import express from "express"; //최신 JS 코드
//require가 하는 일 -> node module을 어딘가에서 가져오는 것
import morgan from "morgan"; //log check 
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";


const app = express(); //app 변수를 선언해서 express를 실행

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

// const handleListening = () => {}

//create server 
const PORT = 4000;

// function handleListening() {
//   console.log(`Listening on: http://localhost:${PORT}`);
// }
const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

//response( answer)
// function handleHome(req, res) {
//   console.log(req);
//   res.send("Hello from home"); //뭔가를 응답하려면 send
// }
const handleHome = (req, res) => res.send("Hello from home");

//request object, response object
//ex)아이디와 패스워드를 전송한다면(이 url에 post방식으로 아이디랑 패스워드를 보낸다면),
//서버에는 request object로 그 정보를 얻을 수 있음

// function handleProfile(req, res) {
//   res.send("You are on my profile");
// }
//주소창에 localhost:4000/profile을 입력하면 메세지가 출력됨 

const handleProfile = (req, res) => res.send("You are on my profile");
//위에 함수와 정확히 같은 기능을 수행함(최신 JS 코드) 화살표가 있어서 arrow function이라고 함 
//가독성이 좋은 것이 장점 

// const betweenHome = (req, res, next) => {
//   console.log("Between"); //middleware, 완료하기전에 실행할 함수, 여러개의 층 중에 하나의 층이라 생각, middleware는 원하는 대로 만들 수 있음 
//   next();
// };
//middleware를 통해 유저의 로그인 여부를 체크할 수 도 있음, 로그를 작성 등등, 접속 거부된 ip 체크 등등 

// app.get("/", betweenHome, handleHome); //유저의 home(/)요청과 handleHome 사이에 있음, handlehome이 마지막 층의 함수, 유저에게 무언가를 반환하는 함수
//위와 같은 경우는 local middleware

// app.use(betweenHome);

//middleware는 위에서 부터 차례로 작동함 
app.use(cookieParser());
//parsing: 데이터를 원하는 형태로 가공하는 과정 
//요청된 쿠키를 쉽게 추출할 수 있도록 해주는 미들웨어, cookie에 유저 정보를 저장할 수 있음 
app.use(bodyParser.json());
//api요청에서 받은 body값을 파싱하는 역할을 수행 
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"))
//모든 것을 기록 

//global middleware

// const middleware = (req, res, next) => {
//   res.send("not happening");
// };
//middleware 가 next()함수 대신 res.send를 실행하는 함수이면 연결을 끊을 수 있음 

//............. 이 사이에 원하는 만큼의 middleware를 넣으면 됨 

//create router
// app.get("/", middleware, handleHome);
app.get("/", handleHome);
//응답하나 해보는 것
//request는 있지만(get request) 그에 대한 응답이 있어야 함 (뭔가 응답을 하게 만들어야 함, 응답이 없으면 무한 로딩 상테)

app.get("/profile", handleProfile);

app.listen(PORT, handleListening); 
//app보고 listen 하라고 명령 (포트번호를)
//콜백함수로 handleProfile을 app.listen에 줌 


//scripts에 node index.js 를 start라 매핑하였으므로 
//npm start라는 명령어로 node index.js를 실행할 수 있음


// "dependencies": {
//   "express": "^4.17.1"  <- 4.17.1 버전 이상에서만 호환된다라는 의미 
// }


//기본 작동 방식
//서버 생성 -> route 생성(app.get(~)) -> 그것에 응답 




//http의 작동 방식(웹사이트가 작동하는 방식)
// 웹사이트에 가면, url를 적을텐데, 브라우저가 GET method를 실행, 기본적으로 그렇게 브라우저가 페이지를 읽어옴 
// 웹사이트에 로그인 하면 POST를 통해 하게 됨 웹사이트로 , 브라우저가 웹사이트에 정보를 전달, POST라고 불리는 method를 통해
// -> 그러니까 GET request로는 정보를 전달할 수가 없음, 정보 전달은 POST request (서버에)

//babel -> 최신 문법으로 작성한 JS 코드를 웹 브라우저와의 호환을 위해 이전 버전의 문법 JS코드로 바꿔주는 프로그램 
//"start": "babel-node index.js" -> 바벨이 코드를 바꿔주고 실행 

//nodemon을 설치하면 코드를 save할때마다 서버가 새로 시작됨 (매번 서버를 껐다 킬 필요가 없어짐)

//pug는 view 엔진 
//html을 세련되게 꾸며주는, 바꿔주는 기능

// get과 set의 차이점

// get은 서버에서 데이터를 가져와서 보여줄때 사용..!
// *데이터를 수정할 필요가 없는 자료(eg.게시판의 목록? 각각의 글 조회?)
// post는 서버상의 데이터를 저장 이나 수정 할때 사용
// *사용자의 비밀번호, 회원가입할때의 자료 등.. 인듯

// get은 서버에서 무언가를 말그대로 "가져" 올때 사용
// *보안에 신경을 쓰지 않아도 되는 자료
// post는 서버에 무언가를 저장이나 수정과 같은 무언가를 "수행" 할때 사용
// *개인정보 등 보안에 신경을 써야할곳에 사용