import { Button, NavBar, Popover, TabBar, Toast } from "antd-mobile";
import { history, useLocation } from "umi";
import type { FC, ReactNode } from 'react';
import { mainPath, path } from "@/constant/path";
import { ScanningOutline, HandPayCircleOutline, TransportQRcodeOutline, AntOutline } from "antd-mobile-icons";
import { Action } from "antd-mobile/es/components/popover";
import { TabBarItem } from "antd-mobile/es/components/tab-bar/tab-bar";
import tabs from "antd-mobile/es/components/tabs";


export const NavNoback = (props: { title: string }) => (
    <NavBar className=' bg-white' back='' backArrow={false}>{props.title}</NavBar>
)

export const NavBack = (props: { title: string, onBack?: () => void}) => (
    <NavBar className=' bg-white' back='返回' onBack={() => {
        if (props.onBack) {
            props.onBack()
            return
        }
        history.go(-1)
    }}>{props.title}</NavBar>
)
export const NavBackOrRight = (props: { title: string,right?:ReactNode, onBack?: () => void}) => (
    <NavBar className=' bg-white' back='返回' right={props.right} onBack={() => {
        if (props.onBack) {
            props.onBack()
            return
        }
        history.go(-1)
    }}>{props.title}</NavBar>
)
const notedetailActions: Action[] = [
    { key: 'scan', icon: <ScanningOutline />, text: '分享到小组', onClick : () => {Toast.show('分享到小组')} },
    { key: 'payment', icon: <HandPayCircleOutline />, text: '允许小组成员编辑' },
    { key: 'bus', icon: <TransportQRcodeOutline />, text: '生成思维导图' },
    { key: 'assistant', icon: <AntOutline />, text: '生成记忆卡片' },
]

export const TopNavBar = (props:{pathname:string}) => {
var topNavBar = <> </>
    if (props.pathname === path.notebook) {
        topNavBar = <NavNoback title='笔记本' />
    } else if (props.pathname === path.notelist) {
        topNavBar = <NavBack title='笔记本>笔记列表' onBack={() => { history.push(path.notebook) }} />;
    } else if (props.pathname === path.createnote) {
        topNavBar = <NavBack title='笔记本>创建笔记' />;
    } else if (props.pathname === path.createnotebook) {
        topNavBar = <NavBack title='笔记本>创建笔记本' />;

    } else if (props.pathname === path.notedetail) {
        topNavBar = <NavBackOrRight title='笔记详情' right={
        <Popover.Menu actions={notedetailActions} trigger='click' >
            <Button>点我</Button>
        </Popover.Menu>} />;
    } else if (props.pathname === path.rememberCard) {
        topNavBar = <NavNoback title='记忆卡片' />;
    } else if (props.pathname === path.createcard) {
        topNavBar = <NavBack title='记忆卡片>创建卡片' />;
    }else if (props.pathname === path.genecard) {
        topNavBar = <NavBack title='记忆卡片>生成卡片' />;
    }else if (props.pathname === path.choosenote2card) {
        topNavBar = <NavBack title='记忆卡片>生成卡片>选择笔记' />;
    }
     else if (props.pathname === path.carddetail) {
        topNavBar = <NavBack title='卡片详情' />;
    } else if (props.pathname === path.mindMap) {
        topNavBar = <NavNoback title='思维导图' />;
    }else if (props.pathname === path.genemindmap) {
        topNavBar = <NavBack title='思维导图>生成导图' />;
    }else if (props.pathname === path.choosenote2mindmap) {
        topNavBar = <NavBack title='思维导图>生成导图>选择笔记' />;
    } 
    else if (props.pathname === path.studyGroup) {
        topNavBar = <NavNoback title='学习小组' />;
    } 
    else if (props.pathname === path.displaynote) {
        topNavBar = <NavBack title='学习小组>笔记'  />;
    } else if (props.pathname === path.displaycard) {
        topNavBar = <NavBack title='学习小组>卡片' />;
    }
    else if (props.pathname === path.displaymindmap) {
        topNavBar = <NavBack title='学习小组>思维导图' />;
    }
    else if (props.pathname === path.pubmanager) {
        topNavBar = <NavBack title='学习小组>管理公开笔记' />;
    }
    else if (props.pathname === path.groupmanager) {
        topNavBar = <NavBack title='学习小组>管理学习小组' />;
    }
    
    else if (props.pathname === path.my) {
        topNavBar = <NavNoback title='我的' />;
    }
    return topNavBar
}

