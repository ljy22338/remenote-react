import { ActionSheet, Avatar, Card, Collapse, Dropdown, FloatingBubble, Input, List, Radio, Space, Tabs } from "antd-mobile";
import { useEffect, useState } from "react";
import { path } from "@/constant/path";
import { history } from 'umi';
import { Action } from "antd-mobile/es/components/action-sheet";
import { AddOutline } from "antd-mobile-icons";
import { Showlist } from "@/components/list";
import { useDispatch, useSelector } from "react-redux";
import { FloatButton } from "@/components/float";
import { findgroupnote } from "@/service/studygroup";
import { useRequest } from "@/.umi/plugin-request";
import { runableoption } from "@/service/note";
import { NoteVo } from "@/service/entity/response";
// import { books, cards, mindmaps } from "../../data/mock";

const actions: Action[] = [
    { text: '管理公开笔记', key: 'pubmanager', onClick: () => { history.push(path.pubmanager) } },
    { text: '管理学习小组', key: 'groupmanager', onClick: () => { history.push(path.groupmanager) } },
]
interface MemberItem {
    nickname: string;
    notelist: NoteVo[];
}

const liststyle = {
    "--border-top": " 0px",
    "--border-inner": "0px",
    "--border-bottom": "0px",
    "--padding-left": "0px",

}

export default function StudyGroup() {
    const { run, data, loading, error } = useRequest(findgroupnote, runableoption)
    const groupName = useSelector((state: any) => state.user.groupName)
    const [visible, setVisible] = useState(false)
    useEffect(() => {run()}, [])
    useEffect(() => {if (!data) { run()}}, [data])
    function handleClicNote(note:NoteVo) {
        history.push(path.notedetail, { note: note })
    }
    function toMembers() {
        const newData: MemberItem[] = [];
        (data as NoteVo[])?.forEach(item => {
            const existingUser = newData.find(entry => entry.nickname === item.nickname);
            if (existingUser) {
                existingUser.notelist.push(item);
            } else {
                newData.push({
                    nickname: item.nickname,
                    notelist: [item]
                });
            }
        });
        return newData
    }
    return (
        <>
            <FloatButton onClick={() => setVisible(true)} />
            <ActionSheet visible={visible} actions={actions} onClose={() => setVisible(false)} />
            <Card className=" m-3" bodyClassName='m-2 align-middle text-xl text-center'>
                当前小组：{groupName}
            </Card>
            小组成员：
            <Collapse accordion>
                {toMembers()?.map(item => (
                    <Collapse.Panel key={item.nickname} title={" "+item.nickname+" 的笔记"}>
                        <List style={liststyle}>
                            {item.notelist.map((note: NoteVo) => {
                                return <List.Item key={note.title} onClick={()=>{
                                    handleClicNote(note)}}>{note.title}</List.Item>
                            })}
                        </List>
                    </Collapse.Panel>
                ))}
            </Collapse>

        </>
    );
}
