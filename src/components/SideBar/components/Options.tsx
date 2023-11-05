import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment } from "react";

export function Options({open, setOpen}:{open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>}){
    const {data}:any = useSession();
    const router = useRouter();

    function validRouter(url:string){
        if(url === router.pathname) return true;
        return false;
    }

    return(
        <Fragment>
            
        </Fragment>
    )
}