import { Outlet } from 'umi';
import { createContext, useEffect, useRef, useState } from 'react';
import { TabBar } from 'antd-mobile';
import { history, useLocation } from 'umi';
import {
    AppOutline,
    AppstoreOutline,
    CheckShieldOutline,
    MessageFill,
    MessageOutline,
    UserOutline
} from 'antd-mobile-icons';
import { TabBarItem } from "antd-mobile/es/components/tab-bar/tab-bar";
import { path, mainPath } from '@/constant/path';
import { TopNavBar } from '@/components/nav';
export const HeaderHeightCotext = createContext(0);

const tabs = [
    {
        key: path.notebook,
        title: '笔记本',
        icon: <AppOutline />,
        // badge: Badge.dot,
    },
    {
        key: path.rememberCard,
        title: '记忆卡片',
        icon: (active: boolean) =>
            active ? <MessageFill /> : <MessageOutline />,
        // badge: '99+',
    },
    {
        key: path.mindMap,
        title: '思维导图',
        icon: <AppstoreOutline />,
        // badge: '5',
    },
    {
        key: path.studyGroup,
        title: '学习小组',
        icon: <CheckShieldOutline />,
        // badge: '5',
    },
    {
        key: path.my,
        title: '我的',
        icon: <UserOutline />,
    },]
export default function Layout() {
    const location = useLocation()
    const { pathname } = location
    const headerRef = useRef<HTMLElement>(null);
    const mainRef = useRef<HTMLElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const [activeKey, setActiveKey] = useState("home");
    const InfoActiveKey = (e: string) => {
        setActiveKey(e);
        history.push(e);
    }
    useEffect(() => {
        var headerHeight = headerRef.current?.offsetHeight;
        var footerHeight = footerRef.current?.offsetHeight;
        if (!headerHeight || !footerHeight) {
            if (!headerHeight) { headerHeight = 0 }
            if (!footerHeight) { footerHeight = 0 }
        }
        if (!mainRef.current) { return }
        const remainingHeight = window.innerHeight - headerHeight - footerHeight;
        mainRef.current.style.height = `${remainingHeight}px`;

    }, [pathname]);
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleResize = () => {
        var headerHeight = headerRef.current?.offsetHeight;
        var footerHeight = footerRef.current?.offsetHeight;
        if (!headerHeight || !footerHeight) {
            if (!headerHeight) { headerHeight = 0 }
            if (!footerHeight) { footerHeight = 0 }
        }
        const _mainRef = mainRef.current;
        const newHeight = window.innerHeight;
        if (!_mainRef) return;
        _mainRef.style.setProperty('height', `${newHeight - headerHeight - footerHeight}px`);
    };
    useEffect(() => {
        setActiveKey(pathname)
    }, [])

    var bottomTabBar = <></>
    if (mainPath.includes(pathname)) {
        bottomTabBar = <TabBar activeKey={pathname} onChange={InfoActiveKey} className='bg-white'>
            {tabs.map(item => (
                <TabBarItem
                    key={item.key} icon={item.icon} title={item.title}></TabBarItem>
            ))}
        </TabBar>

    } else {
        bottomTabBar = <></>
    }

    return (<>
        <header ref={headerRef}>
            <div className='h-6 bg-white'></div>
            <TopNavBar pathname={pathname} />
        </header>
        <main ref={mainRef} className=''>
            {
                headerRef.current !== null
                    ? <HeaderHeightCotext.Provider value={headerRef.current!.offsetHeight}><Outlet /></HeaderHeightCotext.Provider>
                    : <Outlet />
            }
        </main>
        <footer ref={footerRef}>
            {bottomTabBar}
        </footer>
    </>
    );
}
