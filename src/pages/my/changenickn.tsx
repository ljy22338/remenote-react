import { useRequest } from "@/.umi/plugin-request";
import { InputWithButton } from "@/components/imput";
import { runableoption } from "@/service/note";
import { changeNick } from "@/service/user";
import { changeNickname } from "@/store/slices/userSlice";
import { Card, Input, Button, Toast } from "antd-mobile";
import Loading from "../loading";
import { useState } from "react";
import { UserVo } from "@/service/entity/response";
import { useDispatch } from "react-redux";
import { history } from 'umi'
import { path } from "@/constant/path";

export default function ChangeNickn() {
  const [newNickname, setNewNickname] = useState<string>('')
  const { run, loading, error } = useRequest(changeNick, runableoption)
  const dispatch = useDispatch()
  function handleClick() {
    if (newNickname === '') {
      Toast.show('昵称不能为空')
      return
    }
    run({
      username: '',
      password: '',
      token: '',
      newNickname: newNickname,
      newPassword: '',
      groupName: ''
    }).then((res) => {
      dispatch(changeNickname(newNickname))
      Toast.show('修改成功')
      history.push(path.my)
    })
  }
  if (loading) return <Loading />
  if (error) return <Loading />
  return (
    <>
      <Card className=" m-3" bodyClassName="">
        <Input className=" m-3" placeholder="输入昵称" value={newNickname} onChange={setNewNickname} />
        <div className=" h-5" />
        <Button block color='primary' onClick={handleClick}>
          确定修改
        </Button>

      </Card>
    </>
  );
}