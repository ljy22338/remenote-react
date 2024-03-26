import { Button, Card, Input, SearchBar } from "antd-mobile";

export const InputWithButton = (props: { handle: () => void, buttontitle: string },) => {
    return (
        <Card className=" m-3" bodyClassName="flex p-3 items-center bg-white">
            <div className=' flex-auto'><Input className=" border" /></div>
            <div className=' flex-none pl-3'>
                <Button size='small' color='primary' onClick={props.handle}>
                    {props.buttontitle}
                </Button>
            </div>
        </Card>
    );
}