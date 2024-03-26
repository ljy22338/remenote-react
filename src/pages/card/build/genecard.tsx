import { List, Avatar } from "antd-mobile";
import { history } from 'umi';
import { path } from "@/constant/path";
import { NotebookListVo, NotebookVo } from "@/service/entity/response";
import { useEffect, useState } from "react";
import { useRequest } from "@/.umi/plugin-request";
import { notebooklist, runableoption } from "@/service/note";
import Loading from "@/pages/loading";
export default function Genecard() {

    const { run, data, error, loading } = useRequest(notebooklist, runableoption);

    useEffect(() => {
        run()
    }, [])
    function handleClick(notebook: NotebookVo) {
        history.push(path.choosenote2card, { notebook: notebook });
    }
    if (loading) return <Loading />
    if (error) return <Loading />
    return (
        <>
            <List mode='card' header='笔记本列表'>
                {(data as NotebookListVo)?.notebookList.map((value: NotebookVo) => (
                    <List.Item
                        clickable={true}
                        onClick={() => { handleClick(value) }}
                        key={value.notebookName}
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