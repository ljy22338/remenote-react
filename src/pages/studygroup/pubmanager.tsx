import {  ManagerList, Showlist } from "@/components/list";
import { path } from "@/constant/path";
import { Tabs } from "antd-mobile";
import { history } from 'umi';
import { books,cards,mindmaps } from "../data/mock";

export default function PubManager() {
    return (
        <>
            <Tabs>
                <Tabs.Tab title='笔记' key='fruits'>
                    <ManagerList items={books} />
                </Tabs.Tab>
                <Tabs.Tab title='卡组' key='vegetables'>
                    <ManagerList items={cards} />
                </Tabs.Tab>
                <Tabs.Tab title='导图' key='animals'>
                    <ManagerList items={mindmaps} />
                </Tabs.Tab>
            </Tabs>
        </>
    );
}