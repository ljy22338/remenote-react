import { path } from "@/constant/path";
import { Avatar, List, ActionSheet, FloatingBubble } from "antd-mobile";
import { AddOutline, MessageFill } from "antd-mobile-icons";
import { Action } from "antd-mobile/es/components/action-sheet";
import { useState } from "react";
import { history } from 'umi';

export default function MindMap() {
    const actions: Action[] = [
        { text: '生成思维导图', key: 'copy', onClick: () => { history.push(path.genemindmap) } },
    ]
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
    function handleClick() {
    }
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
            <List mode='card' header='思维导图列表'>
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