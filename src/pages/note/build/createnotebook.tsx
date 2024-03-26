import { Button, Card, Input, Space, TextArea, Toast } from "antd-mobile";
import { history } from "umi";
import { useState } from "react";
import { path } from "@/constant/path";
import { useRequest } from "@/.umi/plugin-request";
import { createnotebook, runableoption } from "@/service/note";
import Loading from "@/pages/loading";

export default function CreateNotebook() {
    const [bookname, setBookname] = useState('')
    const [introdution, setIntrodution] = useState('')
     const {run,loading} = useRequest(createnotebook,runableoption)
     const handleBuild = ()=>{
        if (bookname === ''||introdution==='') {
            // 显示一个提示
            Toast.show('知识库名称和简介不能为空');
            return;
        }
        run({
            noteTitle: '',
            content: '',
            noteOwnerName: '',
            notebookId: 0,
            notebookDescription: introdution,
            delNoteId: 0,
            notebookName: bookname,
            isPublic: '',
            srcNotebook: '',
            srcTitle: '',
            move: false
        })
        history.push(path.notebook)
     }
     if (loading) return <Loading />
    return (
        <>
            <Card className=" m-3">
                知识库名称：
                <Input
                    className="border"
                    placeholder='知识库名称'
                    value={bookname}
                    onChange={val => {
                        setBookname(val)
                    }}
                />
                <div className=" h-4"></div>
                知识库简介：
                <TextArea
                    className="border"
                    placeholder="知识库简介"
                    value={introdution}
                    onChange={val => {
                        setIntrodution(val)
                    }}
                    showCount
                    maxLength={30}
                />
                <div className=" h-8"></div>
                <Button color='primary' block onClick={handleBuild}>新建</Button>
            </Card>

        </>
    );
}