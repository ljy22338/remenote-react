import { List, Avatar, Switch, Space, CheckList, Button, Popup, SearchBar, Card } from "antd-mobile";
import { ShowlistProps } from "@/components/list";
import { CheckCircleFill, CheckCircleOutline, DeleteOutline } from "antd-mobile-icons";
import { useEffect, useState } from "react";
import { CheckListValue } from "antd-mobile/es/components/check-list";
import { history } from "umi";
import { path } from "@/constant/path";
import { useRequest } from "@/.umi/plugin-request";
import { runableoption } from "@/service/note";
import { creategroup, findall } from "@/service/studygroup";
import { StudyGroupVo } from "@/service/entity/response";
import { useDispatch, useSelector } from "react-redux";
import { changeGroupName } from "@/store/slices/userSlice";
import { joingroup } from "@/service/user";

export default function GroupManager() {
    const { run: findallrun, data: findalldata, loading, error } = useRequest(findall, runableoption)
    const {run: joingrouprun}= useRequest(joingroup, runableoption)
    const groupName =useSelector((state: any) => state.user.groupName)
    const dispatch = useDispatch()
    const [data, setData] = useState<StudyGroupVo[]>()
    const [search, setSearch] = useState<string>('')
    const [selected, setSelected] = useState<CheckListValue>()
    useEffect(() => {
        findallrun().then((res: any) => {
            console.log(res)
        })
        
    }, [])
    useEffect(() => {
        if (!findalldata) {
            console.log(findalldata)
            findallrun().then((res: any) => {
                console.log(res)
                setData(findalldata)
            })
        }
    }, [findalldata])
    function handleJoin(){
        joingrouprun({
            username:'',
            password:'',
            newNickname:'',
            token:'',
            newPassword:'',
            groupName:(selected as string)
        }).then(()=>{
            dispatch(changeGroupName(selected))
        })
    }
    function handleSearch() {
        const res = findalldata.filter((item:StudyGroupVo) => item.studyGroupName.includes(search))
        setData(res)
    }

    return (
        <>
            <Card className=" m-3">
                <Button className="" color="primary" block onClick={() => {
                    history.push(path.addnewgroup)
                }}>创建小组</Button>
                <div className=' h-3' />
                <Button className="" color="primary" block onClick={handleJoin}>加入小组</Button>
                <div className=" m-2 align-middle text-xl text-center">
                    当前小组：{groupName}
                </div>
                <div className=' py-3 flex items-center bg-white'>
                    <div className=' flex-auto'><SearchBar value={search} onChange={setSearch} /></div>
                    <div className=' flex-none pl-3'>
                        <Button size='small' color='primary'
                            onClick={handleSearch}
                        >
                            搜索
                        </Button>
                    </div>
                </div>
                <CheckList
                    defaultValue={selected ? [selected] : []}
                    extra={active =>
                        active ? <CheckCircleFill /> : <CheckCircleOutline />
                    }
                    onChange={val => {
                        setSelected(val[0])
                    }}
                >
                    {(data as StudyGroupVo[])?.map(item => (
                        <CheckList.Item key={item.studyGroupName} value={item.studyGroupName}>
                            {item.studyGroupName}
                        </CheckList.Item>
                    ))}
                </CheckList>
            </Card>



        </>
    );
}

export const PubManagerList = (props: { items: Array<ShowlistProps> }) => {
    return <>
        <List mode='card'>
            <List.Item
                key={114514}
                prefix={
                    <>名称</>
                }
                extra={
                    <Space>
                        <>是否公开</>
                        <>操作</>
                    </Space>
                }
            >
            </List.Item>
            {props.items.map(item => (
                <List.Item
                    key={item.name}
                    prefix={
                        <>
                            <Avatar
                                src={item.avatar}
                                style={{ borderRadius: 5 }}
                                fit='cover'
                            />
                        </>
                    }
                    description={item.description}
                    extra={
                        <Space align='center'>
                            <Switch defaultChecked={item.ispublic} />
                            <Button> <DeleteOutline /></Button>
                        </Space>
                    }
                >
                    {item.name}
                </List.Item>
            ))}
        </List>

    </>
}