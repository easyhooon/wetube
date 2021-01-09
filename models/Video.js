import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Tilte is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const model = mongoose.model("Video", VideoSchema);
export default model;

//schema는 definition이라 생각 
//mongoDB에 우리의 파일들이 어떤 식으로  생겨야 할 지 알려주는 작업 필요 
//fiLE에 타당성이 어느정도 필요한 것 
//이 것이 file의 형태, model의 형태 인 것 

//type: mongoose.Schema.Types.ObjectId ->모든 Comment의 정보를 여기에 넣는 것이 아닌,
//comment의 id만 넣음 (video와 연결 된 Commnet들의 Id가 저장됨 )
//video의 ID를 원하기 때문에 ref를 사용 
//모든 commnet ID들을 array로 video에 집어 넣을 것인가 혹은 Commnet로 연결 된 Video ID를 줄 것인가