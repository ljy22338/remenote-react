
import { path } from "@/constant/path";
import { notelist, defaultoption, runableoption } from "@/service/note";
import { Avatar, ActionSheet, List, Modal, Toast } from "antd-mobile";
import { Action } from "antd-mobile/es/components/action-sheet";
import { useEffect, useState } from "react";
import { history, useRequest } from 'umi';
import Loading from "../loading";
import { NoteVo, NotebookVo } from "@/service/entity/response";

const actions: Action[] = [
    { text: '新建空笔记', key: 'copy' },
    { text: '新建笔记本', key: 'edit' },
]

export default function NoteList() {
    const [visible, setVisible] = useState(false)
    const { run, data, loading, error } = useRequest(notelist, runableoption)
    const { notebook } = history.location.state as { notebook: NotebookVo }
    useEffect(() => {
        run(notebook.notebookId)
    }, [])
    function description(content:string){
        if(content?.length<=40){return content}
        return content?.substring(0,40)
    }
    function handleClick(note:NoteVo) {
        history.push(path.notedetail,{note});
    }
    if (loading) return <Loading />
    if (error) return <Loading />
    return (
        <>
            <ActionSheet
                visible={visible}
                actions={actions}
                onClose={() => setVisible(false)}
            />
            <List mode='card' header='笔记本列表'>
                {(data as NoteVo[])?.map(book => (
                    <List.Item
                        clickable={true}
                        key={book.id}
                        onClick={() => { handleClick(book) }}
                        description={description(book.content)}
                    >
                        {book.title}
                    </List.Item>
                ))}
            </List>
        </>
    );
}