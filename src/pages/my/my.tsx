import { useRequest } from "@/.umi/plugin-request";
import { path } from "@/constant/path";
import { runableoption } from "@/service/note";
import { logout } from "@/service/user";
import { changeIsLogin, changeNickname, changeTitle, changeToken, changeUsername } from "@/store/slices/userSlice";
import { List } from "antd-mobile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from 'umi';
import Loading from "../loading";
export default function My() {
    const { run: runlogout, error, loading } = useRequest(logout, runableoption);
    const username = useSelector((state: any) => state.user.username)
    const nickname = useSelector((state: any) => state.user.nickname)
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
            dispatch(changeIsLogin(false))
            console.log(res)
            localStorage.setItem('user', JSON.stringify(null))

        })
    }

    if (loading) return <Loading />
    if (error) return <Loading />
    return (
        <>
            <List className=" m-3">
                <List.Item>
                    我的信息：<br />
                    用户名：{nickname}<br />
                    账号：{username}<br />
                </List.Item>
            </List>
            <List className=" m-3">
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