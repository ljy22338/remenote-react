import { List, Avatar } from "antd-mobile";
import { history } from 'umi';
import { path } from "@/constant/path";
import { useRequest } from "@/.umi/plugin-request";
import { useEffect, useState } from "react";
import { notedetailpost, notelist, runableoption } from "@/service/note";
import { NoteVo, NotebookVo } from "@/service/entity/response";
import { createDeck } from "@/service/card";
import { get } from "mobx";
import { CardRequest } from "@/service/entity/request";
export default function Genecard() {
    const [visible, setVisible] = useState(false)
    const { run, data, loading, error } = useRequest(notelist, runableoption)
    const { run: detailrun, data: detaildata, loading: detailloading, error: detailerror } = useRequest(notedetailpost, runableoption)
    const { run: genecard } = useRequest(createDeck, runableoption)
    const { notebook } = history.location.state as { notebook: NotebookVo }
    useEffect(() => {
        run(notebook.notebookId)
    }, [])
    function description(content: string) {
        if (content?.length <= 40) { return content }
        return content?.substring(0, 40)
    }
    function handleClick(noteTitle: string, notebookName: string) {
        detailrun({
            noteTitle: noteTitle,
            content: '',
            noteOwnerName: '',
            notebookId: 0,
            notebookDescription: '',
            delNoteId: 0,
            notebookName: notebookName,
            isPublic: '',
            srcNotebook: '',
            srcTitle: '',
            move: false
        })
    }
    useEffect(() => {
        if (detaildata) {
            const response = detaildata as NoteVo
            const lines = response.content.split('\n')
            function isFront(line: string) {
                let numOfHash = 0;
                while (line[numOfHash] === '#') {
                    numOfHash++;
                }
                if (line[numOfHash] === ' ' && numOfHash > 0) {
                    return true;
                }
                return false;
            }
            const cards: CardRequest[] = [];
            let currentCard: CardRequest | null = null;
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (isFront(line)) {
                    // 如果当前有卡片请求，将其添加到数组中
                    if (currentCard !== null) {
                        cards.push(currentCard);
                    }
                    // 创建新的卡片请求
                    currentCard = { id: 0, front: line, back: '', memoryCount: 0 };
                    // 如果下一行也是标题，跳过
                    if (isFront(lines[i + 1])) {
                        i++;
                    }
                } else if (currentCard !== null) {
                    // 不是标题，将其作为内容添加到当前卡片请求的后面
                    currentCard.back += line + '\n';
                }
            }
            // 将最后一个卡片请求添加到数组中
            if (currentCard !== null) {
                cards.push(currentCard);
            }
            genecard({
                deckName: response.title,
                deckId: 0,
                cardItems: cards.map(item => ({
                    id: 0,
                    front: item.front,
                    back: item.back,
                    memoryCount: 0
                })),
                srcNotebook: '',
                srcNoteTitle: ''
            })
            console.log(cards)
            history.push(path.rememberCard)
        }
    }, [detaildata])
    return (
        <>
            <List mode='card' header='笔记本列表'>
                {(data as NoteVo[])?.map(book => (
                    <List.Item
                        clickable={true}
                        key={book.id}
                        onClick={() => { handleClick(book.title, book.notebookName) }}
                        description={description(book.content)}
                    >
                        {book.title}
                    </List.Item>
                ))}
            </List>
        </>
    );
}