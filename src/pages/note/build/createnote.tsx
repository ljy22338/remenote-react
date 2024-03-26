import React, { useEffect, useState } from 'react';
import { history, useRequest } from 'umi';
import { Avatar, Button, Card, CheckList, Input, List } from 'antd-mobile';
import { defaultoption, runableoption, createnote, baseUrl, notebooklist } from '@/service/note';
import { NotebookListVo, NotebookVo } from '@/service/entity/response';
import Loading from '@/pages/loading';
import { CheckCircleFill, CheckCircleOutline } from 'antd-mobile-icons';

export default function CreateNote() {
    const { data, error, loading } = useRequest(notebooklist, defaultoption);
    const { run, data: createnotedata } = useRequest(createnote, runableoption);
    const [noteTitle, setNoteTitle] = useState('')
    const [selected, setSelected] =useState <number>(0)


    function handleClick() {
        console.log(noteTitle, selected)
        if (noteTitle === ''|| selected === 0) {
            alert('笔记名称不能为空或未选择笔记本')
            return
        }
        run({
            noteTitle: noteTitle,
            content: '默认内容',
            noteOwnerName: '',
            notebookId: selected,
            notebookDescription:'',
            delNoteId: 0,
            notebookName: '',
            isPublic: '',
            srcNotebook: '',
            srcTitle: '',
            move: false
        }).then((res) => {})
    }
    useEffect(() => {
        if (createnotedata) {
            console.log(createnotedata)
        }
    }, [createnotedata])

    if (loading) return <Loading />
    if (error) return <Loading />
    return (
        <>
            <Card title="笔记名称" className=' m-3'>
                <Input value={noteTitle} onChange={setNoteTitle} clearable />
            </Card>

            <Card title="选择笔记本" className=' m-3'>
                <CheckList
                    extra={active => active ? <CheckCircleFill /> : <CheckCircleOutline />}
                    onChange={(val: any) => { setSelected(val[0]) }}
                >
                    {(data as NotebookListVo).notebookList.map((value: NotebookVo) => (
                        <CheckList.Item
                            key={value.notebookId}
                            value={value.notebookId}
                        >
                            {value.notebookName}
                        </CheckList.Item>
                    ))}
                </CheckList>
            </Card>

            <Card className=' m-3'>
                <Button onClick={handleClick} color='primary' block>创建</Button>
            </Card>
        </>
    );
}