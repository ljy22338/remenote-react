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