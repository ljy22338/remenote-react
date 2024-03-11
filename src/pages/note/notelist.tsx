
import { path } from "@/constant/path";
import { Avatar, ActionSheet, List, Modal, Toast } from "antd-mobile";
import { Action } from "antd-mobile/es/components/action-sheet";
import { useState } from "react";
import { history } from 'umi';

export default function NoteList() {
    const [value, setValue] = useState('')
    const [visible, setVisible] = useState(false)

    const notes = [
        {
            name: '笔记本1',
            description: '这是笔记本1的描述',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        },
        {
            name: '笔记本2',
            description: '这是笔记本2的描述',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        },
        {
            name: '笔记本3',
            description: '这是笔记本3的描述',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        },
    ];
    const actions: Action[] = [
        { text: '新建空笔记', key: 'copy' },
        { text: '新建笔记本', key: 'edit' },

    ]
    function handleClick() {
        history.push(path.notedetail);

    }
    return (
        <>
            {/* <FloatButton handleOnclick={() => setVisible(true)} /> */}
            <ActionSheet
                visible={visible}
                actions={actions}
                onClose={() => setVisible(false)}
            />
            <List mode='card' header='笔记本列表'>
                {notes.map(notes => (
                    <List.Item
                        clickable={true}
                        key={notes.name}
                        onClick={handleClick}
                        prefix={
                            <>
                                <Avatar
                                    src={notes.avatar}
                                    style={{ borderRadius: 5 }}
                                    fit='cover'
                                />
                            </>
                        }
                        description={notes.description}
                    >
                        {notes.name}
                    </List.Item>
                ))}
            </List>
        </>
    );
}