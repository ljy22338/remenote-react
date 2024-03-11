
import { List as VirtualizedList, AutoSizer } from 'react-virtualized'
import { useState, type CSSProperties, useRef, useEffect } from 'react'
import { List, Image, Card, TextArea, Input, Button, SwipeAction, Toast } from 'antd-mobile'
import { Action } from 'antd-mobile/es/components/action-sheet'

const rowCount = 50

const item = {
    avatar:
        'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Novalee Spicer',
    description: 'Deserunt dolor ea eaque eos',
}

const data = Array(rowCount).fill(item)

function rowRenderer({
    index,
    key,
    style,
}: {
    index: number
    key: string
    style: CSSProperties
}) {
    const item = data[index]
    return (
        
        <List.Item
            key={key}
            style={style}
            prefix={
                <Image
                    src={item.avatar}
                    style={{ borderRadius: 20 }}
                    fit='cover'
                    width={40}
                    height={40}
                />
            }
            description={item.description}
            onClick={() => {
                Toast.show('点击了' + item.name)
              }}
        >
            {item.name} {index}
        </List.Item>
    )
}

export default function CreateCard() {
    const [cardfront, setcardfront] = useState('')
    const [cardback, setcardback] = useState('')

    return (
        <>
            <List header='已添加卡片'>
          
                <AutoSizer disableHeight>
                    {({ width }: { width: number }) => (
                        <VirtualizedList
                            rowCount={rowCount}
                            rowRenderer={rowRenderer}
                            width={width}
                            height={480}
                            rowHeight={60}
                            overscanRowCount={10}
                        />
                    )}
                </AutoSizer>
     

            </List>
      
            <Card className=" m-3">
                卡片正面：
                <Input
                    className="border"
                    placeholder='卡片正面'
                    value={cardfront}
                    onChange={val => {
                        setcardfront(val)
                    }}
                />
                <div className=" h-4"></div>
                卡片背面：
                <TextArea
                    className="border"
                    placeholder="卡片背面"
                    value={cardback}
                    onChange={val => {
                        setcardback(val)
                    }}
                    showCount
                    maxLength={30}
                />
                <div className=" h-8"></div>
                <Button color='primary' block onClick={() => {  }}>添加</Button>
                <div className=" h-2"></div>
                <Button color='primary' block onClick={() => {  }}>完成</Button>

            </Card>
      
          
        </>
    )
}
