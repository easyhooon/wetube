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
        const videos = await Video.find({}).sort({'_id': -1});
        //-1 위아래 순서를 바꾸겠다 -> 최신 등록 비디오부터 보여줌 
        res.render("home", {pageTitle: "Home", videos});
        //전체(res.locals)가 아닌 한 화면에만 변수를 추가하는 방법 
        //함수의 첫번째 인자는 템플릿, 두번째 인자는 이 템플릿에 추가할 정보가 담긴 객체
        //템플릿을 웹사이트에 보여주는 방법(컨트룰러에서 res.send로 join을 전송하는 것 대신에)
        //render함수의 인자로 템플릿(home.pug)의 파일 이름을 입력하면 됨
        //이 함수가 views 폴던에서 파일명이 home이고 확장자가 pug인 템플릿 파일은 찾은 후에 보여줄 거임
        //확장자 pug는 이전에 view engin에서 설정함 
    } catch(error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos : [] });
    }
};
//pageTitle 상단바에 아이콘과 함께 사이트 이름으로 보이는 것 

// 이 함수가 views 폴더에서 파일명이 home이고 확장자가 pug인 템플릿 파일을 찾은 후에 보여줄거
//videos: videos
export const search = async(req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    // == const searchingBy = req.query.term; (es6 이전의 방식) 위의 방법이 es6
    let videos = [];
    //내가 찾은 videos로 reassign할 것이기 때문에 const로 선언해주지 않음 
    try{
        videos = await Video.find({title: {$regex: searchingBy, $options: "i"}})
        //title: searchingby라고 설정하면 내가 검색한 것과 완전히 같은 것만 찾음 
        //내가 원하는 건, 내가 넣은 단어를 "포함"하는 것을 찾고 싶음
        //때문에 mongoose에 regex를 이용 
        //$options: "i" -> insensitive (대소문자를 구분하지 않음)
    }catch(error){
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos });
    // searchingBy: searchingBy  -> searchingBy
    // search 라는 템플릿에서는 pageTitle, searchingBy,videos 등의 객체(변수)를 사용할 수 있다
    //결국 코드의 의미 const searchingBy = req.query.term와 같음 
    //videos 도 마찬가지로 videos: videos
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
    //비디오를 업로드하면, 비디오에 해당하는 id을 가질 수 있고, video가 새로 생성되고
    //생성된 데이터의 id를 가져옴 
    //업로드 후에 사용자를 새로 생성된 비디오 id에 해당하는 videoDetail 페이지로 redirect할거임
    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description
    });
    res.redirect(routes.videoDetail(newVideo.id));
};
    
export const videoDetail = async(req, res) => {
    // console.log(req.params.id);
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        //video 변수를 템플릿에 전달 
        //video: video == video 
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch(error){
        res.redirect(routes.home);
    }
};

//Template Rendering
export const getEditVideo = async (req, res) => {
    const {
      params: { id }
    } = req;
    try {
      const video = await Video.findById(id);
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } catch (error) {
      res.redirect(routes.home);
    }
  };
    
//Update Video
export const postEditVideo = async (req, res) => {
    const {
      params: { id },
      body: { title, description }
    } = req;
    try {
      await Video.findOneAndUpdate({ _id: id }, { title, description });
      res.redirect(routes.videoDetail(id));
    } catch (error) {
      res.redirect(routes.home);
    }
  };


export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try{
        await Video.findOneAndRemove({ _id: id });
    } catch(error){
        console.log(error);
    }
    res.redirect(routes.home);
};
   

//res.send와 res.render의 차이점 
// res.send : 다양한 유형의 응답을 전송
// res.render : 설정된 템플릿 엔진을 사용해서 views를 렌더링

//Video가 아닌 다른 file 가 Upload되는 걸 원하지 않음
//-> file을 Upload해서 middleware에서 받음
//-> 그 middleware에서 file을 upload하고 url을 복사해서 db에 저장 

//file 자체를 저장하는 것이 아니라 file의 location을 저장하는 것

//참고 https://mongoosejs.com/docs/queries.html

//컨트룰러는 export가 맨 하단부에 없네? 함수마다 붙어잇음 

// On a controller how can I get the ID on a route like: "/user/:id"

// Using req.params.id

// On a controller how can I get the ID on a route like: "/user?id=123"

// Using req.query.id


