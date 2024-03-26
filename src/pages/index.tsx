import { useEffect } from "react";
import { path } from "@/constant/path";
import { history } from 'umi';
import { useDispatch, useSelector } from "react-redux";
export default function Index() {
    useEffect(() => {
        history.push(path.notebook);
    }, []);
    
    return (
        <>
       请稍等，正在加载页面...
        </>
    );
    // const count = useSelector((state:any )=> state.counter.a)
    // const dispatch = useDispatch()
  
    // return (
    //   <div>
    //     <div>
    //       <button
    //         aria-label="Increment value"
    //         onClick={() => dispatch(increment())}
    //       >
    //         Increment
    //       </button>
    //       <span>{count}</span>
    //       <button
    //         aria-label="Decrement value"
    //         onClick={() => dispatch(decrement())}
    //       >
    //         Decrement
    //       </button>
    //     </div>
    //   </div>
    // )
}