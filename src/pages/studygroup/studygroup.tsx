import { ActionSheet, Avatar, Dropdown, FloatingBubble, Input, List, Radio, Space, Tabs } from "antd-mobile";
import { useState } from "react";
import { path } from "@/constant/path";
import { history } from 'umi';
import { Action } from "antd-mobile/es/components/action-sheet";
import { AddOutline } from "antd-mobile-icons";
import {Showlist} from "@/components/list";
// import { books, cards, mindmaps } from "../../data/mock";
export default function StudyGroup() {

    const actions: Action[] = [
        { text: '管理公开笔记', key: 'pubmanager', onClick: () => { history.push(path.pubmanager) } },
        { text: '管理学习小组', key: 'groupmanager', onClick: () => { history.push(path.groupmanager) } },
    ]

    const [visible, setVisible] = useState(false)

    function handleClick() {
        // history.push(path.mindmaplist);
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
            <div className="m-3 bg-white flex">
                <Dropdown className="  inline-block w-1/3">
                    <Dropdown.Item key='sorter' title='排序'>
                        <div style={{ padding: 12 }}>
                            <Radio.Group defaultValue='default'>
                                <Space direction='vertical' block>
                                    <Radio block value='default'>
                                        综合排序
                                    </Radio>
                                    <Radio block value='nearest'>
                                        距离最近
                                    </Radio>
                                    <Radio block value='top-rated'>
                                        评分最高
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    </Dropdown.Item>
                </Dropdown>
                <Input className=" inline-block border" readOnly></Input>
            </div>


            <ActionSheet
                visible={visible}
                actions={actions}
                onClose={() => setVisible(false)}
            />
            {/* <Tabs>
                <Tabs.Tab title='笔记' key='fruits'>
                    <Showlist items={books} handleclick={()=>{history.push(path.displaynote)}} />
                </Tabs.Tab>
                <Tabs.Tab title='卡组' key='vegetables'>
                    <Showlist items={cards} handleclick={ ()=>{history.push(path.displaycard)}} />
                </Tabs.Tab>
                <Tabs.Tab title='导图' key='animals'>
                    <Showlist items={mindmaps} handleclick={()=>{history.push(path.displaymindmap)}} />
                </Tabs.Tab>
            </Tabs> */}

        </>
    );
}
