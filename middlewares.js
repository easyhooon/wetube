import multer from "multer";
//해당 function을 집어 넣으면 middleware가 file의 URL을 반환함 
import routes from "./routes";

export const multerVideo = multer({dest: "uploads/videos/"});

//locals에 로컬변수를 저장하면, 이 변수들을 템플릿에서 직접 수정하지 않아도, 템플릿에서 사용할 수 있다
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    res.locals.user={
        isAuthenticated: false,
        id: 1
    };
    next();
};


export const uploadVideo = multerVideo.single("videoFile");
//한번에 비디오 하나의 파일만 업로드 