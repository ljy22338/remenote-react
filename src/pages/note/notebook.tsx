
import { ActionSheet, Avatar, Dialog, FloatingBubble, List, Toast } from "antd-mobile";
import { history } from 'umi';
import { Action } from "antd-mobile/es/components/action-sheet/action-sheet";
import { useState } from "react";
import { path } from "@/constant/path";
import { AddOutline } from "antd-mobile-icons";
export default function Notebook() {
    const [visible, setVisible] = useState(false)
    const books = [
        {
            name: '默认知识库',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: '默认知识库的描述信息',
        },
        {
            name: '第一知识库',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: '第一知识库的描述信息',
        },
        {
            name: '第二知识库',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: '第二知识库的描述信息',
        },
    ];
    const actions: Action[] = [
        { text: '新建空笔记', key: 'copy', onClick: () => { history.push(path.createnote)} },
        { text: '新建笔记本', key: 'edit', onClick: () => {history.push(path.createnotebook) } },

    ]

    function handleClick() {
        history.push(path.notelist);
    }
    return (
        <>      <FloatingBubble
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
                {books.map(note => (
                    <List.Item
                        clickable={true}
                        onClick={handleClick}
                        key={note.name}
                        prefix={
                            <>
                                <Avatar
                                    src={note.avatar}
                                    style={{ borderRadius: 5 }}
                                    fit='cover'
                                />
                            </>
                        }
                        description={note.description}
                    >
                        {note.name}
                    </List.Item>
                ))}
            </List>
        </>
    );
}

