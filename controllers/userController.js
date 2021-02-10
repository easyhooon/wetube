//controller -> 어떤 일이 어떻게 발생하는지에 관한 로직
//모든 router의 로직들은 모두 userConroller나 videoController에 정의되어있음 
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join"});
};

//로그인 이후에 우선 이 모든 정보들을 req.body에서 가져와야함 
export const postJoin = async(req,res) => {
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
        try{
            const user = await User.create({
            name,
            email
            }); 

            await User.register(user, password);

        } catch(error) {
            console.log(error);
        }
        res.redirect(routes.home);
    }
};

//로그인 화면
export const getLogin = (req, res) => 
    res.render("login", { pageTtile: "Log In"});

//로그인 이후 
export const postLogin = (req, res) => {
    //일단은 
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