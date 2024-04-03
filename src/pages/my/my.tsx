import { useRequest } from "@/.umi/plugin-request";
import { path } from "@/constant/path";
import { runableoption } from "@/service/note";
import { logout } from "@/service/user";
import { changeGroupName, changeIsLogin, changeMode, changeNickname, changeTitle, changeToken, changeUsername } from "@/store/slices/userSlice";
import { List } from "antd-mobile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from 'umi';
import Loading from "../loading";
import { AntOutline, StarFill } from "antd-mobile-icons";
export default function My() {
    const { run: runlogout, error, loading } = useRequest(logout, runableoption);
    const username = useSelector((state: any) => state.user.username)
    const nickname = useSelector((state: any) => state.user.nickname)
    const mode = useSelector((state: any) => state.user.mode)
    const dispatch = useDispatch()
    function handleNickname() {
        history.push(path.changenickn)
    }
    function handlePassword() {
        history.push(path.changepwd)
    }
    function handleLogout() {
        runlogout().then((res) => {
            dispatch(changeUsername(''))
            dispatch(changeToken(''))
            dispatch(changeNickname(''))
            dispatch(changeGroupName(''))
            dispatch(changeIsLogin(false))
            console.log(res)
            localStorage.setItem('user', JSON.stringify(null))

        })
    }

    if (loading) return <Loading />
    if (error) return <Loading />
    return (
        <>
         
            <List className=" m-3" mode="card">
            <List.Item>
                    我的信息：<br />
                    用户名：{nickname}<br />
                    账号：{username}<br />
                </List.Item>
                <List.Item extra={
            <>
          
                <>{mode === 'light' ? <AntOutline  fontSize={30} onClick={() => { dispatch(changeMode("dark")) }} /> : <StarFill  fontSize={30} onClick={() => { dispatch(changeMode("light")) }} />}</>
            </>

        }>
                    主题颜色
                </List.Item>
                <List.Item onClick={handleNickname}>
                    修改用户名
                </List.Item>
                <List.Item onClick={handlePassword}>
                    修改密码
                </List.Item>
                <List.Item onClick={() => handleLogout()}>
                    退出登录
                </List.Item>
            </List>
        </>
    );
}