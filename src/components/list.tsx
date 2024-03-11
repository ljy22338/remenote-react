import { List, Avatar, Switch, Space, CheckList, Button, Popup, SearchBar } from "antd-mobile";
import { DeleteOutline } from "antd-mobile-icons";
import { useState } from "react";

export interface ShowlistProps {
    id: number,
    name: string,
    avatar: string,
    description: string,
    ispublic: boolean,
}

type IDictionary<TKey extends string | number, TValue> = {
    [key in TKey]: TValue;
};


export const Showlist = (props: { items: Array<ShowlistProps>, handleclick: () => void }) => (
    <List mode='card'>
        {props.items.map(item => (
            <List.Item
                clickable={true}
                onClick={props.handleclick}
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
            >
                {item.name}
            </List.Item>
        ))}
    </List>
)
export const ManagerList = (props: { items: Array<ShowlistProps> }) => {

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