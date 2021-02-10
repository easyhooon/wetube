import passport from "passport";
import User from "./models/User";

passport.use(User.createStategy());

passport.serializeUser(User.serializeUser()); //serialization: Is a function where we can decide what information the cookie will have
passport.deserializeUser(User.deserializeUser()); //deserialization: Is a function where we turn the cookie into an user object