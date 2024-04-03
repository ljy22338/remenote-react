import { Button, NavBar, Popover, TabBar, Toast } from "antd-mobile";
import { history, useLocation } from "umi";
import { useState, type FC, type ReactNode, createContext } from 'react';
import { getnotedetailpath, mainPath, path } from "@/constant/path";
import { ScanningOutline, HandPayCircleOutline, TransportQRcodeOutline, AntOutline, StarFill } from "antd-mobile-icons";
import { Action } from "antd-mobile/es/components/popover";
import { observer, useObserver } from "mobx-react";
import { autorun } from "mobx";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "@/store/slices/userSlice";


export const NavNoback = (props: { title: string }) => {
 
    return <>
        <NavBar  back='' backArrow={false}>
            {props.title}</NavBar>
    </>
}

export const NavBack = (props: { title: string, onBack?: () => void }) => (
    <NavBar back='返回' onBack={() => {
        if (props.onBack) {
            props.onBack()
            return
        }
        history.go(-1)
    }}>{props.title}</NavBar>
)
export const NavBackOrRight = (props: { title: string, right?: ReactNode, onBack?: () => void }) => (
    <NavBar back='返回' right={props.right} onBack={() => {
        if (props.onBack) {
            props.onBack()
            return
        }
        history.go(-1)
    }}>{props.title}</NavBar>
)


export const TopNavBar = (props: { pathname: string }) => {
    const title = useSelector((state: any) => state.user.title)
    const dispatch = useDispatch()
    var topNavBar = <> </>
    const [heacdertitle, setHeaderTitle] = useState('aaa')
    const value = { heacdertitle, setHeaderTitle }
    //note
    if (props.pathname === path.notebook) {
        topNavBar = <NavNoback title='笔记本' />
    } else if (props.pathname === path.notelist) {
        topNavBar = <NavBack title='笔记本>笔记列表' onBack={() => { history.push(path.notebook) }} />;
    } else if (props.pathname === path.createnote) {
        topNavBar = <NavBack title='笔记本>创建笔记' />;
    } else if (props.pathname === path.createnotebook) {
        topNavBar = <NavBack title='笔记本>创建笔记本' />;

    } else if (props.pathname.includes(path.notedetail)) {
        topNavBar = <NavBackOrRight title={title} />
    }
    //card
    else if (props.pathname === path.rememberCard) {
        topNavBar = <NavNoback title='记忆卡片' />;
    } else if (props.pathname === path.createcard) {
        topNavBar = <NavBack title='记忆卡片>创建卡片' />;
    } else if (props.pathname === path.genecard) {
        topNavBar = <NavBack title='记忆卡片>生成卡片' />;
    } else if (props.pathname === path.choosenote2card) {
        topNavBar = <NavBack title='记忆卡片>生成卡片>选择笔记' />;
    } else if (props.pathname === path.carddetail) {
        topNavBar = <NavBack title='卡片详情' />;
    }
    //studygroup
    else if (props.pathname === path.studyGroup) {
        topNavBar = <NavNoback title='学习小组' />;
    }
    else if (props.pathname === path.displaynote) {
        topNavBar = <NavBack title='学习小组>笔记' />;
    } else if (props.pathname === path.displaycard) {
        topNavBar = <NavBack title='学习小组>卡片' />;
    } else if (props.pathname === path.displaymindmap) {
        topNavBar = <NavBack title='学习小组>思维导图' />;
    } else if (props.pathname === path.pubmanager) {
        topNavBar = <NavBack title='学习小组>管理公开笔记' />;
    }
    else if (props.pathname === path.groupmanager) {
        topNavBar = <NavBack title='学习小组>管理学习小组' />;
    }
    else if (props.pathname === path.addnewgroup) {
        topNavBar = <NavBack title='学习小组>管理学习小组>创建小组' />;
    }
    //my
    else if (props.pathname === path.my) {
        topNavBar = <NavNoback title='我的' />;
    } else if (props.pathname === path.changenickn) {
        topNavBar = <NavBack title='我的>修改昵称' />;
    } else if (props.pathname === path.changepwd) {
        topNavBar = <NavBack title='我的>修改密码' />;
    }


    return topNavBar


}

