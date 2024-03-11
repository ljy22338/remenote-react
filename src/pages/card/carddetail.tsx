import { Button, Card, Toast } from "antd-mobile";



export default function CardDetail() {
    return (
        <>

            <div className="flex justify-center items-center w-full h-full">


                <Card className=" w-5/6 h-5/6" bodyClassName="flex  w-full h-full "
                >
   
                <div className={"self-end flex justify-end  pt-3 border-t  w-full "} onClick={e => e.stopPropagation()}>
                
                        <div className=" mx-3">
                            <Button
                                className=" mx-3"
                                color='primary'
                                onClick={() => {
                                    Toast.show('点击了底部按钮')
                                }}
                            >
                                底部按钮
                            </Button></div>
                        <div className=" mx-3">
                            <Button
                                color='primary'
                                onClick={() => {
                                    Toast.show('点击了底部按钮')
                                }}
                            >
                                底部按钮
                            </Button>
                        </div>

                    </div>
                </Card>

            </div>



        </>
    );
}