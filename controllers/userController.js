//controller -> 어떤 일이 어떻게 발생하는지에 관한 로직
import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join"});
};

export const postJoin = (req,res) => {
    const {
        body: {name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400);
        //상태코드 404: not found 같은거
        // 400: bad request 잘못된 요청 
        res.render("join", { pageTitle: "Join"});
    } else {
        // To Do: Register User
        // To Do: Log user in
        res.redirect(routes.home);
    }
};

export const getLogin = (req, res) => 
    res.render("login", { pageTtile: "Log In"});

export const postLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    //To Do: Process Log Out
    res.redirect(routes.home);
};

export const userDetail = (req, res) => 
    res.render("userDetail", {pageTitle: "User Detail"});
export const editProfile = (req, res) => 
    res.render("editProfile", {pageTitle: "Edit Profile"});
export const changePassword = (req, res) => 
    res.render("changePassword", { pageTitle: "Change Password"});