import { useEffect } from "react";
import { path } from "@/constant/path";
import { history } from 'umi';

export default function Index() {
    useEffect(() => {
        history.push(path.notebook);
    }, []);
    
    return (
        <>
       请稍等，正在加载页面...
        </>
    );
}