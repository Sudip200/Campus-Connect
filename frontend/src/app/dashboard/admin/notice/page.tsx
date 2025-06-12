"use client"
import Form from "@/components/form/Form";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import FileInput from "@/components/form/input/FileInput";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { postNotice } from "@/lib/actions/postNotice";
import { AppDispatch } from "@/lib/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
//  title: string;
//   desc: string;
//   links: Array<string>;
//   attachment_type: 'none' | 'video' | 'image' | 'audio';
export default function CreateNotice() {
    const [file, setFile] = useState<File | null>(null);
    const [desc, setDesc] = useState("");
    const [title, setTitle] = useState("")
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className="flex-col flex justify-center items-center">
            <form className="space-y-2 w-lg" onSubmit={(e) => {
                e.preventDefault()
                dispatch(postNotice({
                    title: title,
                    desc: desc,
                    file: file ? file : null
                }))

            }}>
                <Label htmlFor="notice_title">Title</Label>
                <Input placeholder={"Enter Title of Notice"} id="notice_title" name="title" onChange={(e) => {
                    setTitle(e.target.value)
                }}

                />
                <Label htmlFor="notice_title">Description</Label>
                <TextArea placeholder="Enter Notice Body" rows={5} name="desc" onChange={(value) => {
                    setDesc(value)
                }} />
                <FileInput name="file" onChange={(e) => {
                    setFile(() => {
                        return e.target.files ? e.target.files[0] : null
                    })
                }} />
                <Button className="w-full">Submit</Button>
            </form>
        </div>
    )
}