import { List, Avatar, Switch, Space, CheckList, Button, Popup, SearchBar } from "antd-mobile";

import { path } from "@/constant/path";
import { Tabs } from "antd-mobile";
import { history } from 'umi';

import { ShowlistProps } from "@/components/list";
import { DeleteOutline } from "antd-mobile-icons";
import { FloatButton } from "@/components/float";


export default function GroupManager() {

    return (
        <>
        <FloatButton onClick={()=>{history.push(path.joingroup)}}/>
            {/* <PubManagerList items={books} /> */}
            
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
                        <>是否公开</>
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
                            <Button> <DeleteOutline /></Button>
                        </Space>
                    }
                >
                    {item.name}
                </List.Item>
            ))}
        </List>

    </>
}