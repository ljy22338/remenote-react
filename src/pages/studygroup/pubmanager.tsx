import { List, Avatar, Switch, Space, CheckList, Button, Popup, SearchBar, Collapse, Card } from "antd-mobile";

import { path } from "@/constant/path";
import { Tabs } from "antd-mobile";
import { history } from 'umi';
// import { books,cards,mindmaps } from "../../data/mock";
import { ShowlistProps } from "@/components/list";
import { DeleteOutline } from "antd-mobile-icons";
import { useRequest } from "@/.umi/plugin-request";
import { NoteVo, NotebookListVo, NotebookVo } from "@/service/entity/response";
import { notebooklist, defaultoption, allnotes, runableoption, updatenote } from "@/service/note";
import { useEffect } from "react";
import Loading from "../loading";
interface Noteitem {
    notebookName: string;
    notelist: { title: string; content: string;ispublic:boolean }[];
}
export default function PubManager() {
    const { run, data, error, loading } = useRequest(allnotes, runableoption);
    const { run: update, error: updateerror, loading: updateloading } = useRequest(updatenote, runableoption);

    function handleClick(notebook: NotebookVo) {
        history.push(path.notelist, { notebook: notebook });
    }
    useEffect(() => {
        run()
    }, [])
    useEffect(() => {
        console.log(data)
        if (!data) {
            run().then((res: any) => {

            })
        }

    }, [data])
    function toNotebooks() {
        const newData: Noteitem[] = [];
        (data as NoteVo[])?.forEach(item => {
            const existingNote = newData.find(entry => entry.notebookName === item.notebookName);
            if (existingNote) {
                existingNote.notelist.push({ title: item.title, content: item.content ,ispublic:item.isPublic});
            } else {
                newData.push({
                    notebookName: item.notebookName,
                    notelist: [{ title: item.title, content: item.content,ispublic:item.isPublic }]
                });
            }
        });
        return newData
    }
    if (loading) return <Loading />
    if (error) return <Loading />
    return (
        <>
              <div className=" m-3">
              笔记本列表：

              </div>
            
       
                <Collapse accordion>
                    {toNotebooks()?.map(notebook => (
                        <Collapse.Panel key={notebook.notebookName} title={notebook.notebookName}>
                            <List style={{
                                "--border-top": " 0px",
                                "--border-inner": "0px",
                                "--border-bottom": "0px",
                                "--padding-left": "0px",
                                "--padding-right":"0px"
                            }}>
                                {
                                    notebook.notelist.map((note: { title: string; content: string,ispublic:boolean }) => {
                                        return <List.Item key={note.title}>{note.title}
                                        <Switch
                                         uncheckedText='私密' checkedText='公开'
                                        defaultChecked={note.ispublic}
                                        onChange={(checked) => {
                                            update(
                                                {
                                                    noteTitle: note.title,
                                                    content: note.content,
                                                    noteOwnerName: '',
                                                    notebookId: 0,
                                                    notebookDescription: '',
                                                    delNoteId: 0,
                                                    notebookName: notebook.notebookName,
                                                    isPublic: checked,
                                                    srcNotebook: '',
                                                    srcTitle: '',
                                                    move: false
                                                }
                                            )
                                        }} /></List.Item>
                                    })
                                }
                            </List>
                        </Collapse.Panel>
                    ))}
                </Collapse>
       

        </>
    );
}
