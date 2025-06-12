import { IAuthenticateRequest } from "../../../interfaces/request";
import handleErrorMiddleware from "../../../middleware/handle-error";
import Notice from "../../../models/Notice";
import { RequestHandler } from "express";

let getNotices:RequestHandler = async (req:IAuthenticateRequest,res)=>{
    let user = req.user;
    if(!user){
        res.status(400).json({message:'You are not authorized'});
    }
    let notices = await Notice.find().lean();
    res.status(200).json({
      notices
    })
}
export default handleErrorMiddleware(getNotices);