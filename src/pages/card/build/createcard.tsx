
import { List as VirtualizedList, AutoSizer } from 'react-virtualized'
import { useState, type CSSProperties, useRef, useEffect } from 'react'
import { List, Image, Card, TextArea, Input, Button, SwipeAction, Toast, Dialog, SwipeActionRef, Loading } from 'antd-mobile'
import { runableoption } from '@/service/note'
import { useRequest } from '@/.umi/plugin-request'
import { createDeck } from '@/service/card'
import { history } from 'umi'
import { path } from '@/constant/path'



export default function CreateCard() {
    const [deckName, setdeckName] = useState('')
    const [cardfront, setcardfront] = useState('')
    const [cardback, setcardback] = useState('')
    const [data, setData] = useState(Array(0))
    const { run, error, loading } = useRequest(createDeck, runableoption)
    function rowRenderer(props: { index: number, key: string, style: CSSProperties }) {
        const item = data[props.index]
        return (<List.Item
            key={props.key}
            style={props.style}
            prefix={<Image src={item.avatar} style={{ borderRadius: 20 }}
                fit='cover' width={40} height={40} />}
            description={item.back}
            onClick={() => { Toast.show('点击了' + item.name) }}
        > {item.front}
        </List.Item>
        )
    }
    function handleAdd(front: string, back: string) {
        if (front.length == 0 || back.length == 0) {
            Toast.show('请填写完整')
            return
        }
        const item = {
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            front: front,
            back: back,
        }
        setData([item, ...data])
        setcardfront('')
        setcardback('')
    }
    function handleSubmit() {
        if (deckName.length == 0 || data.length == 0) {
            Toast.show('请填写完整')
            return
        }
        console.log(data)
        run({
            deckName: deckName,
            deckId: 0,
            cardItems: data.map(item => ({
                id: 0,
                front: item.front,
                back: item.back,
                memoryCount: 0
            })),
            srcNotebook: '',
            srcNoteTitle: ''
        }).then(() => {
            history.push(path.rememberCard)
        })
    }
    if (loading) return <Loading />
    if (error) return <Loading />
    return (
        <>
            <Card className=" m-3">
                <Input placeholder='卡组名称' value={deckName} onChange={setdeckName} />
            </Card>
            <List header='已添加卡片'>
                <AutoSizer disableHeight>
                    {({ width }: { width: number }) => (
                        <VirtualizedList
                            rowCount={data.length}
                            rowRenderer={rowRenderer}
                            width={width} height={380} rowHeight={60}
                            overscanRowCount={10}
                        />)}
                </AutoSizer>
            </List>
            <Card className=" m-3">
                卡片正面：
                <Input placeholder='卡片正面' value={cardfront} onChange={val => { setcardfront(val) }} />
                <div className=" h-4"></div>
                卡片背面：
                <TextArea placeholder="卡片背面"
                    value={cardback} onChange={val => { setcardback(val) }}
                    showCount maxLength={30} />
                <div className=" h-8"></div>
                <Button color='primary' block onClick={() => { handleAdd(cardfront, cardback) }}>添加</Button>
                <div className=" h-2"></div>
                <Button color='primary' block onClick={handleSubmit}>完成</Button>
            </Card>
        </>
    )
}
