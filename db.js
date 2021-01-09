//mongoDB는 noSQL의 DB 중 하나
//mongoose는 database와 연결하게 해주는 것 
//목적: database에 관련된 걸 하고, 
//어떤 유저에게나 영상을 업로드하고, 보고, 검색하고 수정하고 삭제할 수 있게 할 것임
//dotenv를 설치한 이유 가끔 내가 어떤 부분을 숨겨놓고 싶을 수 있기 때문 
//내 코드에 있는 URL로 부터 유저 데이터를 보는 걸 원하지 않을 경우 dotenv를 사용 
//open source 프로젝트를 할 때, 내 db를 숨겨놓고 싶을 때 
//mongoDB의 장점-> document를 줄여준다는 것 (ex json file)
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✔ Connected to DB");
const handleError = error => console.log(`❌ Error on DB Connection: ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);