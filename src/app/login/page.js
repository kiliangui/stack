'use client';

import {useEffect, useRef, useState} from "react";
import {pb} from "@/lib/pocketbase";
import { redirect } from "next/navigation";

export default function Login() {
    const email = useRef()
    const password = useRef()
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
      if(pb.authStore.isValid){
        redirect("/")
      }
      setLoading(false)
    },[])

    async function login(email,pass1){
        let authUser;
        setLoading(true)
        authUser = await pb.collection("users").authWithPassword(email,pass1)
        console.log(authUser);

    setLoading(true)
    }
    if (pb.authStore.isValid){
        redirect("/");
    }
    if (loading){
        return (<h1>Loading</h1>)
      }

    return (
        <main>
            <h1>Login</h1>
            <p>yolo</p>
            <form>
                <div>
                    <label form={"email"}>email</label>
                    <input ref={email} type="email" id="email" name="email" />
                </div>
                <div>
                    <label form={"password"}>password</label>
                    <input ref={password} type="password" id="password" name="password" />
                </div>
                <button onClick={(event)=>{
                    event.preventDefault()
                    login(email.current.value,password.current.value)
                }}>Login</button>
                <a href="/register" role="button">Register</a>
                
            </form>

        </main>
        )
}
