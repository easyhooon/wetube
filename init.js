import dotenv from "dotenv";
import "./models/Video";
import "./models/Comment";
import "./models/User";
import "./db";
import app from "./app";


dotenv.config();
//DB Url을 감추기 위함 
//To be able to hide strings from the version control systems

const PORT = process.env.PORT || 4000; //만약 대상으 못찾으면 4000번으로 env의 변수를 불러오는 법 process.env. 이런식으로 key를 숨기는 것 

const handleListening = () => 
    console.log(`✔ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);

// why did we import the models in the init.js file?
// Because we need to make the mongoose connection 'aware' of the Models that we will save in the future.
// we want to load the models before we use them.