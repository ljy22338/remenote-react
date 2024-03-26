import { List, Avatar, Switch, Space, CheckList, Button, Popup, SearchBar } from "antd-mobile";

import { path } from "@/constant/path";
import { Tabs } from "antd-mobile";
import { history } from 'umi';
// import { books,cards,mindmaps } from "../../data/mock";
import { ShowlistProps } from "@/components/list";
import { DeleteOutline } from "antd-mobile-icons";

export default function PubManager() {
    return (
        <>
            {/* <Tabs>
                <Tabs.Tab title='笔记' key='fruits'>
                    <PubManagerList items={books} />
                </Tabs.Tab>
                <Tabs.Tab title='卡组' key='vegetables'>
                    <PubManagerList items={cards} />
                </Tabs.Tab>
                <Tabs.Tab title='导图' key='animals'>
                    <PubManagerList items={mindmaps} />
                </Tabs.Tab>
            </Tabs> */}
        </>
    );
}

export const PubManagerList = (props: { items: Array<ShowlistProps> }) => {

    return <>
        <List mode='card'>
            <List.Item
                key={114514}
                prefix={
                    <>名称</>
                }
                extra={
                    <Space>
                    <>是否允许编辑</>
                    <>操作</>
                    </Space>
                }
            >
            </List.Item>
            {props.items.map(item => (
                <List.Item
                    key={item.name}
                    prefix={
                        <>
                            <Avatar
                                src={item.avatar}
                                style={{ borderRadius: 5 }}
                                fit='cover'
                            />
                        </>
                    }
                    description={item.description}
                    extra={
                        <Space align='center'>
                            <Switch defaultChecked={item.ispublic} />
                            <Button> <DeleteOutline/></Button>
                        </Space>
                    }
                >
                    {item.name}
                </List.Item>
            ))}
        </List>

    </>
}