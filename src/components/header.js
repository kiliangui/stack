import {useEffect, useState} from "react";
import {pb} from "@/lib/pocketbase";

export function Header(){
    const [user,setUser] = useState()
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        console.log("use effect")
        setLoading(false)
        console.log("use effect enter")
        if(!user && pb.authStore.isValid){
            setUser(pb.authStore.model)
            console.log(pb.authStore.model);
        }
        console.log("end")
    },[user])

    if (loading){
        return <h1>Loading</h1>
    }
    return <header className="flex justify-between items-center">
        <a href="/">
            <h1>Website</h1>
        </a>
        <nav className="flex">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                {user?
                    <>
                        <li>
                            <a>Dashboard</a>
                        </li>
                        <li>
                            <a>Account</a>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <a>Login</a>
                        </li>
                        <li>
                            <a>SignUp</a>
                        </li>
                    </>}

                
            </ul>
        </nav>
    </header>
}