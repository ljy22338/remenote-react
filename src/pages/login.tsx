import { Button,Image, Form, Input, List, Stepper, Switch, TextArea } from "antd-mobile";
import { useState } from "react";
import { useRequest } from "../.umi/plugin-request";
import { login, register } from "../service/user";
import { runableoption } from "../service/note";
import Loading from "./loading";
import { UserVo } from "@/service/entity/response";
import { useDispatch, useSelector } from "react-redux";
import { changeGroupName, changeIsLogin, changeNickname, changeTitle, changeToken, changeUsername } from "@/store/slices/userSlice";

export default function Login() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()
    const { run: runlogin, data: logindata, loading: loadinglogin } = useRequest(login, runableoption)
    const { run: runregister, data: registerdata, loading: loadingregister } = useRequest(register, runableoption)
    function handleLogin() {
        runlogin({
            username: username, password: password,
            token: "",
            newNickname: "",
            newPassword: "",
            groupName: ""
        }).then((res) => {
            if (res) {
                const user = res as UserVo
                localStorage.setItem('user', JSON.stringify(user))
                dispatch(changeUsername(user.username))
                dispatch(changeToken(user.token))
                dispatch(changeNickname(user.nickname))
                dispatch(changeGroupName(user.groupName))
                dispatch(changeIsLogin(true))
                console.log(user)
            }
        })

    }
    function handleRegister() {
        runregister({
            username: username, password: password,
            token: "",
            newNickname: "",
            newPassword: "",
            groupName: ""
        }).then((res) => {
            if (res) {
                const user = res as UserVo
                console.log(user)
            }
        })
    }
    if (loadinglogin) return <Loading />
    if (loadingregister) return <Loading />
    return <>
        <div className="m-10"/>
        <List mode='card' header='登录或注册'>
        <Image className=" m-10" src={require('@/assets/login.png')}/>
            <List.Item>
                <Input
                    placeholder='请输入账号'
                    value={username}
                    onChange={val => {
                        setUsername(val)
                    }}
                />
            </List.Item>
            <List.Item>
                <Input
                    placeholder='请输入密码'
                    value={password}
                    onChange={val => {
                        setPassword(val)
                    }}
                />
            </List.Item>
            <List.Item>
                <Button onClick={handleLogin}>登录</Button>
                <Button onClick={handleRegister}>注册</Button>
            </List.Item>
        </List>
    </>
}