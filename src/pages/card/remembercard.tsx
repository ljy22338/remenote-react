import { FloatButton } from "@/components/float";
import { path } from "@/constant/path";
import { listDecks } from "@/service/card";
import { CardVo, DeckVo } from "@/service/entity/response";
import { defaultoption } from "@/service/note";
import { ActionSheet, Avatar, FloatingBubble, List, Selector } from "antd-mobile";
import { Action } from "antd-mobile/es/components/action-sheet";
import { useEffect, useState } from "react";
import { history, useRequest } from 'umi';
import Loading from "../loading";
import { shuffleArray } from "@/utils";
const actions: Action[] = [
    { text: '生成卡组', key: 'copy', onClick: () => { history.push(path.genecard) } },
    { text: '新建卡组', key: 'edit', onClick: () => { history.push(path.createcard) } },

]
export const options = [
    {
        label: '正常模式',
        value: '正常模式',
    },
    {
        label: '乱序复习',
        value: '乱序复习',
    },
    {
        label: '闪过模式',
        value: '闪过模式',
    },
]
export function proficience(memoryCount: number) {
    if (memoryCount >= 0 && memoryCount <= 5) {
        return "不熟"
    } else if (memoryCount >= 6 && memoryCount <= 15) {
        return "还行"
    } else { return "熟记" }
}
export default function RememberCard() {
    const [value, setValue] = useState('正常模式')
    const [visible, setVisible] = useState(false)
    const { run, data, error, loading } = useRequest(listDecks, defaultoption);
    function handleClick(deckVo: DeckVo) {
        if (value == '乱序复习') {
            deckVo.cardList = shuffleArray(deckVo.cardList)
            history.push(path.carddetail, { deckVo: deckVo, mode: '乱序复习' });
        }
        else if (value == '闪过模式') {
            history.push(path.carddetail, { deckVo: deckVo, mode: '闪过模式' });
        }
        else {
            history.push(path.carddetail, { deckVo: deckVo, mode: '正常模式' });
        }
    }
    function comprehensive() {
        // deckName: string;
        // deckId: number;
        // cardList: CardVo[];
        const cardlists = (data as DeckVo[]).map(deck => {
            return deck.cardList
        })
        const allcards: CardVo[] = []
        cardlists.forEach((cardlist) => {
            cardlist.forEach((card) => {
                allcards.push(card)
            })
        })


        const deck: DeckVo = {
            deckName: '综合练习',
            deckId: 0,
            cardList: shuffleArray(allcards)
        }
        history.push(path.carddetail, { deckVo: deck, mode: '乱序复习' });

    }
    useEffect(() => {
        run()
    }, [])
    useEffect(() => {
        if (!data) {
            run()
        }
    }, [data])
    function handleMemory(cardVos: CardVo[]) {
        let unMemoryCount = 0;
        let memoryCount = 0;
        let heartCount = 0;
        cardVos.map((value) => {
            if (proficience(value.memoryCount) == "不熟") {
                unMemoryCount++;
            } else if (proficience(value.memoryCount) == "还行") {
                memoryCount++;
            } else if (proficience(value.memoryCount) == "熟记") { heartCount++; }
        })
        return "不熟" + unMemoryCount + "张，" + "还行" + memoryCount + "张，" + "熟记" + heartCount + "张";
    }
    if (error) return <Loading />
    if (loading) return <Loading />
    return (
        <>
            <FloatButton onClick={() => setVisible(true)} />
            <ActionSheet
                visible={visible}
                actions={actions}
                onClose={() => setVisible(false)}
            />
            <Selector
                className=" m-3"
                options={options}
                value={[value]}
                onChange={v => {
                    if (v.length) {
                        setValue(v[0])
                    }
                }}
            />
            <List mode='card' header='卡组列表'>
                <List.Item
                    clickable={true}
                    onClick={() => { comprehensive() }}
                    key={"12312312312ddddd"}
                    prefix={<><Avatar
                        src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                        style={{ borderRadius: 5 }} fit='cover' /></>}
                    description={"将所用卡片打乱顺序，进行复习"}
                >
                    综合练习
                </List.Item>
                {(data as DeckVo[])?.map(deck => (
                    <List.Item
                        clickable={true}
                        onClick={() => { handleClick(deck) }}
                        key={deck.deckId}
                        prefix={<><Avatar
                            src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                            style={{ borderRadius: 5 }} fit='cover' /></>}
                        description={handleMemory(deck.cardList)}
                    >
                        {deck.deckName}
                    </List.Item>
                ))}
            </List>
        </>
    );
}