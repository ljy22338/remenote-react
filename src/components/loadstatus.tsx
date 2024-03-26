export const LoadStatus = (props:{error?:Error,loading:boolean}) => {
    return <>
    {props.error?<div>error</div>:null}
    {props?.loading?<div>loading</div>:null}
    </>
}