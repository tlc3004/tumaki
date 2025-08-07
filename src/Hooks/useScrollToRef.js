import { useRef } from "react";

export function useScrollToRef(){
    const ref = useRef(null);

    const scrollTo = () =>{
        if(ref.current){
            ref.current.scrollIntoView({ behavior:"smooth"});
        }
    };
    return[ref, scrollTo];
}