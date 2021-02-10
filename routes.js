//주소는 모두 여기에, 한 파일이 바뀌면 모두 적용되도록 할 수 있음 

//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users

const USERS = "/users";
const USER_DETAIL = "/:id";
// /users/1 =>id가 1인 유저, :id는 변수임
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// /user/1

//Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

//controller에서 어떤 data를 가지고 있다는 것을 표현하고 싶다면, 더블콜론(:)과 이름을 넣으면 됨

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: id => {
        if(id){
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: id => {
        if(id){
            return `/videos/${id}`;
        } else {
            return VIDEO_DETAIL;
        }
    },
    editVideo: id => {
        if(id){
            return `/videos/${id}/edit`;
        } else {
            return EDIT_VIDEO;
        }
    },
    deleteVideo: id => {
        if(id){
            return `/videos/${id}/delete`;
        } else {
            return DELETE_VIDEO;
        }
    }
};

export default routes;