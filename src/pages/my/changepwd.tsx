import { useRequest } from "@/.umi/plugin-request";
import { runableoption } from "@/service/note";
import { changePass } from "@/service/user";
import { Button, Card, Input, Space, Toast } from "antd-mobile";
import { useState } from "react";
import Loading from "../loading";
import { history } from 'umi'
import { path } from "@/constant/path";

export default function ChangePw() {
  const [newPass, setNewPass] = useState('')
  const [oldPass, setOldPass] = useState  ('')
  const { run, loading, error } = useRequest(changePass, runableoption)
  function handleClick() {
    if (newPass === '' || oldPass === '') {
      Toast.show('密码不能为空')
      return
    }
    run({
      username: '',
      password: oldPass,
      token: '',
      newNickname: '',
      newPassword: newPass,
      groupName: ''
    }).then((res) => {
      Toast.show('修改成功')
      history.push(path.my)
    })
  }
  if (loading) return <Loading />
  if (error) return <Loading />
  return (
    <>
      <Card className=" m-3" bodyClassName="">
        新密码：<br />
        <Input className=" m-3" placeholder="输入新密码" value={newPass} onChange={setNewPass} />
        旧密码：<br />
        <Input className=" m-3" placeholder="输入旧密码" value={oldPass} onChange={setOldPass} />
        <div className=" h-5" />
        <Button block color='primary' onClick={handleClick}>
          确定修改
        </Button>

      </Card>

    </>
  );
}