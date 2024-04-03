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
import { creategroup } from "@/service/studygroup";


export default () => {
    const [groupName, setgroupName] = useState<string>('')
    const { run:createrun, loading, error } = useRequest(creategroup, runableoption)
    const dispatch = useDispatch()
    function handleClick() {
        createrun({
            groupName:groupName
        }).then(()=>{
            history.push(path.groupmanager)
        })
    }
    if (loading) return <Loading />
    if (error) return <Loading />
    return (
      <>
        <Card className=" m-3" bodyClassName="">
          <Input className=" m-3" placeholder="输入小组名称" value={groupName} onChange={setgroupName} />
          <div className=" h-5" />
          <Button block color='primary' onClick={handleClick}>
            创建小组
          </Button>
  
        </Card>
      </>
    );
}