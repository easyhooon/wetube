const express = require("express"); //import
//require가 하는 일 -> node module을 어딘가에서 가져오는 것
const app = express(); //app 변수를 선언해서 express를 실행

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

// const handleListening = () => {}

const PORT = 4000;

function handleListening() {
  console.log(`Listening on: http://localhost:${PORT}`);
}

function handleHome(req, res) {
  //   console.log("Hi from home!");
  console.log(req);
  res.send("Hello from home");
}

//request object, response object
//누가 페이지를 요청했는지, 어떤 종류의 데이터가 페이지로 전송되었는지, 그럴 때 request object를 이용
//아이디와 패스워드를 전송한다면(이 url에 post방식으로 아이디랑 패스워드를 보낸다면),
//서버에서 request object로 그 정보를 얻을 수 있음

function handleProfile(req, res) {
  res.send("You are on my profile");
}
//localhost:4000/profile

app.get("/", handleHome);
//응답하나 해보는 것
//request는 있지만(get request) 그에 대한 응답이 있어야 함 (뭔가 응답을 하게 만들어야 함)

app.get("/profile", handleProfile);

app.listen(PORT, handleListening); //app보고 listen 하라고 명령 (포트번호)

//scripts에 node index.js 를 start라 매핑하였으므로 npm start라는 명령어로 node index.js를 실행할 수 있음
