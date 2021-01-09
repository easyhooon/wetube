import routes from "../routes"
import Video from "../models/Video";
//이건 Database의 element가 아니라 이건 단지 model임 아예 다른것
//element를 받는 통로일 뿐이지 element 자체는 아님 
 
//async : javascript한테 이 function의 어떤 부분은 꼭 기다려야해 라고 이야기 하는 것 
//await : 다음 과정이 끝날 때까지 잠시 기다려 달라는 의미 (async가 있어야 쓸 수 있음)
//await은 해당 과정이 성공적으로 끝나야 하는 것 아님, 그냥 끝날 때 까지 기다리는 것
//error 가 생겨도 다음 render 부분을 실행항 (성공 실패여부가 아닌 끝낫다는게 중요 )
export const home = async (req, res) => {
    // const videos = await Video.find({});
    try {
        const videos = await Video.find({});
        res.render("home", {pageTitle: "Home", videos});
    } catch(error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos : [] });
    }
};
// 이 함수가 views 폴더에서 파일명이 home이고 확장자가 pug인 템플릿 파일을 찾은 후에 보여줄거
//videos: videos
export const search = (req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    // == const searchingBy = req.query.term;
    res.render("search", { pageTitle: "Search", searchingBy, videos});
    // searchingBy: searchingBy
};

export const getUpload = (req, res) => 
    res.render("upload", { pageTitle: "Upload" });

export const postUpload = async(req, res) => {
    const {
        body: { title, description},
        file : { path }
    } = req;
    // console.dir(body, file);
    //TO DO: Upload and save video
    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description
    });
    // console.log(newVideo)
    res.redirect(routes.videoDetail(newVideo.id));
};
    
export const videoDetail = (req, res) =>
    res.render("videoDetail", { pageTitle: "Video Detail"});

export const editVideo = (req, res) => 
    res.render("editVideo", { pageTitle: "Edit Video"});

export const deleteVideo = (req, res) => 
    res.render("deleteVideo", { pageTitle: "Delete Video"});

// res.send : 다양한 유형의 응답을 전송
// res.render : 설정된 템플릿 엔진을 사용해서 views를 렌더링

//Video가 아닌 다른 file 가 Upload되는 걸 원하지 않음
//-> file을 Upload해서 middleware에서 받음
//-> 그 middleware에서 file을 upload하고 url을 복사해서 db에 저장 

//file 자체를 저장하는 것이 아니라 file의 location을 저장하는 것

