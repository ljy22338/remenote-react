import { Button, Card, Input, Space, TextArea } from "antd-mobile";
import { history } from "umi";
import { useState } from "react";
import { path } from "@/constant/path";

export default function CreateNotebook() {
    const [bookname, setBookname] = useState('')
    const [introdution, setIntrodution] = useState('')
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
                <Button color='primary' block onClick={()=>{history.push(path.notelist)}}>新建</Button>
            </Card>

        </>
    );
}