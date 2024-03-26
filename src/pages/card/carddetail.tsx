import { useRequest } from "@/.umi/plugin-request";
import { path } from "@/constant/path";
import { listDecks, saveDeck } from "@/service/card";
import { CardVo, DeckVo } from "@/service/entity/response";
import { defaultoption, runableoption } from "@/service/note";
import { Button, Card, Loading, PageIndicator, Toast } from "antd-mobile";
import { useState } from "react";
import { history } from 'umi'
import { proficience } from "./remembercard";
import { CardRequest } from "@/service/entity/request";
export default function CardDetail() {
    const { run, data, error, loading } = useRequest(saveDeck, runableoption)
    const { deckVo, mode } = history.location.state as { deckVo: DeckVo, mode: string }
    const cardlist = deckVo.cardList
    const [cardlistState, setCardlist] = useState<CardVo[]>(deckVo.cardList)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [currentCard, setCurrentCard] = useState<CardVo>(cardlist[0])
    const [isFront, setIsFront] = useState<boolean>(true)
    function nextCard() {
        setIsFront(true)
        setCurrentCard(cardlist[currentIndex + 1])
        setCurrentIndex(currentIndex + 1)
    }
    function handleMemory() {
        const cardlist_ = cardlistState
        cardlist_[currentIndex].memoryCount = + 1
        setCardlist(cardlist_)
        console.log(cardlist_)
        nextCard()
    }
    function handleVague() {
        nextCard()
    }
    function handleForget() {
        const proficie = proficience(cardlist[currentIndex].memoryCount)
        if (proficie === '还行' || proficie === '熟记') {
            const cardlist_ = cardlistState
            cardlist_[currentIndex].memoryCount = - 1
            setCardlist(cardlist_)
            console.log(cardlist_)
        }
        nextCard()
    }
    function handleSubmin() {
        const cardRequests: CardRequest[] = cardlistState.map(card => {
            return {
                id: card.id,
                front: card.front,
                back: card.back,
                memoryCount: card.memoryCount
            }
        })
        console.log(cardRequests)

        run(
            {
                deckName: '',
                deckId: 0,
                cardItems: cardRequests,
                srcNotebook: '',
                srcNoteTitle: ''
            }
        ).then((res) => {
            console.log(res)
            history.push(path.rememberCard)
        })
    }
    if (loading) return <Loading />
    if (error) return <Loading />
    if (currentIndex >= cardlist.length) {
        return <><div
            className=" bg-slate-400 size-full flex justify-center items-center text-white text-4xl"
        >记完啦!!!
            <Button onClick={() => {
                handleSubmin()
            }}>提交结果</Button>
        </div>

        </>
    }
    if (mode === '闪过模式') {
        return <div className="flex justify-center items-center w-full h-full">
            <Card className=" w-5/6 h-5/6" bodyClassName=" w-full h-full ">
                <PageIndicator className=" m-3" total={cardlist.length} current={currentIndex} color='primary' />
                <>
                    <div className={"h-2/6 bg-slate-600 w-full  flex justify-center items-center text-white text-2xl"}>
                        {currentCard.front}
                    </div>
                    <div className={"h-3/6 bg-amber-900 w-full  flex justify-center items-center text-white text-2xl"}>
                        {currentCard.back}
                    </div>
                    <BottomButton
                        handlememory={handleMemory}
                        handleVague={handleVague}
                        handleForget={handleForget}
                    /></>
            </Card>

        </div>
    }
    return (<>
        <div className="flex justify-center items-center w-full h-full">
            <Card className=" w-5/6 h-5/6" bodyClassName=" w-full h-full ">
                <PageIndicator className=" m-3" total={cardlist.length} current={currentIndex} color='primary' />
                {isFront
                    ? <><div className={"h-5/6 bg-slate-600 w-full  flex justify-center items-center text-white text-2xl"}>
                        {currentCard.front}
                    </div>
                        <div className={"flex justify-end  pt-3 border-t  w-full "} onClick={e => e.stopPropagation()}>
                            <div className=" mx-1 my-4">
                                <Button color='primary' onClick={() => {
                                    setIsFront(false)
                                }}>查看答案</Button>
                            </div>
                        </div></>
                    : <><div className={"h-5/6 bg-amber-900 w-full  flex justify-center items-center text-white text-2xl"}>
                        {currentCard.back}
                    </div>
                        <BottomButton
                            handlememory={handleMemory}
                            handleVague={handleVague}
                            handleForget={handleForget}
                        />
                    </>
                }
            </Card>

        </div>
    </>
    );
}

const BottomButton = (props: { handlememory: () => void, handleVague: () => void, handleForget: () => void }) => (<><div className={"flex justify-end  pt-3 border-t  w-full "} onClick={e => e.stopPropagation()}>
    <div className=" mx-1 my-3">
        <Button color='primary' onClick={props.handlememory}>记住了！</Button>
    </div>
    <div className=" mx-1 my-3">
        <Button color='primary' onClick={props.handleVague}>模模糊糊？</Button>
    </div>
    <div className=" mx-1 my-3">
        <Button color='primary' onClick={props.handleForget}>忘掉了！</Button>
    </div>
</div></>)