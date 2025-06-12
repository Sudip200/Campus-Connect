import { IAuthenticateRequest } from "../../../interfaces/request";
import { RequestHandler } from "express";
import Notice from "../../../models/Notice";

const postNotice: RequestHandler = async (req: IAuthenticateRequest<{}, {
  title: string;
  desc: string;
  links: Array<string>;
  //attachment_type: 'none' | 'video' | 'image' | 'audio';
}>, res) => {
    try {
        const { title, desc } = req.body;

        if (!title || !desc) {
            return res.status(400).json({ message: "Title and description are required" });
        }
        let links: string[] = [];
        let attachment_type = "none";
        if (req.files && Array.isArray(req.files)) {
            links = req.files.map((file: Express.Multer.File) => `${file.destination.split('/')[file.destination.split('/').length-1]}/${file.filename}`);
            if (req.files.length > 0 && req.files[0].mimetype) {
                attachment_type = req.files[0].mimetype;
            }
        }
        const notice = new Notice({
            title,
            desc,
            links,
            attachment_type: attachment_type || "none",
        });
        await notice.save();
        return res.status(201).json({ message: "Notice created successfully", notice });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

export default postNotice;