
import { ActionSheet, Avatar, Dialog, FloatingBubble, List, Toast } from "antd-mobile";
import { history, request, useRequest, } from 'umi';
import { Action } from "antd-mobile/es/components/action-sheet/action-sheet";
import { useEffect, useState } from "react";
import { path } from "@/constant/path";
import { AddOutline } from "antd-mobile-icons";
import { defaultoption, notebooklist, runableoption } from "@/service/note";
import { NoteVo, NotebookListVo, NotebookVo } from "@/service/entity/response";
import Loading from "../loading";


const actions: Action[] = [
    { text: '新建空笔记', key: 'copy', onClick: () => { history.push(path.createnote) } },
    { text: '新建笔记本', key: 'edit', onClick: () => { history.push(path.createnotebook) } },

]
export default function Notebooklist() {
    const [visible, setVisible] = useState(false)
    const { run, data, error, loading } = useRequest(notebooklist, defaultoption);
    function handleClick(notebook: NotebookVo) {
        history.push(path.notelist, { notebook: notebook });
    }
    useEffect(() => {
        run()
    }, [])
    useEffect(() => {
        if(!data){
            run()
        }
    }, [data])
    if (loading) return <Loading />
    if (error) return <Loading />
    return (
        <>
            <FloatingBubble
                style={{
                    '--initial-position-bottom': '72px',
                    '--initial-position-right': '24px',
                    '--edge-distance': '24px',
                    '--size': '60px',
                }}
                onClick={() => setVisible(true)}
            >
                <AddOutline fontSize={32} />
            </FloatingBubble>
            <ActionSheet
                visible={visible}
                actions={actions}
                onClose={() => setVisible(false)}
            />
            <List mode='card' header='笔记本列表'>
                {(data as NotebookListVo)?.notebookList.map((value: NotebookVo) => (
                    <List.Item
                        clickable={true}
                        onClick={() => { handleClick(value) }}
                        key={value.notebookId}
                        prefix={<><Avatar
                            src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                            style={{ borderRadius: 5 }}
                            fit='cover'
                        /></>}
                        description={value.description}
                    >
                        {value.notebookName}
                    </List.Item>
                ))}
            </List>
        </>
    );
}

