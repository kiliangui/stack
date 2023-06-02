'use client';

import {useEffect, useRef, useState} from "react";
import {pb} from "@/lib/pocketbase";
import { useRouter } from 'next/navigation';

export default function Login({user,setUser}) {
    const email = useRef()
    const password = useRef()
    const resetDialog = useRef()

    const resetPasswordMail = useRef()
    const [loading,setLoading] = useState(true)
    const [errors,setErrors] = useState()

    const { push } = useRouter();

    useEffect(()=>{
      
      setLoading(false)

                 
    },[errors])

    if(user){
        push("/dashboard")
    }
    async function login(email,pass1){
        let authUser;
        setLoading(true)
        try{
            authUser = await pb.collection("users").authWithPassword(email,pass1)
            setUser(authUser)
            push("dashboard")
        }catch (err){
            console.log("error");
            setErrors(err.data.data)
            console.log(err.data);
                }

    setLoading(false)
    }

    if (loading){
        return (<h1>Loading</h1>)
      }

    return (
        <main>
            <dialog className="flex-col" ref={resetDialog} id="reset">
                <h2>Reset password</h2>
                <p id="resetStatus"></p>
                <input id="resetPasswordMail" ref={resetPasswordMail} type="text"/>
                <button onClick={(e)=>{
                    pb.collection("users").requestPasswordReset(resetPasswordMail.current.value);
                    const p = document.getElementById("resetStatus")
                    p.innerText = "Mail sent"
                    e.target.setAttribute("disabled","true")
                }}>Send reset mail</button>
            </dialog>
            <h1>Login</h1>
            {errors?<p>Error : Failed to authenticate{
                
                Object.keys(errors).length?Object.keys(errors).map(element => {
                    return errors[element].message
                }):<>Error : Failed to authenticate</>
                
                }</p>:<></>}
            <p>yolo</p>
            <form>
                <div>
                    <label form={"email"}>email</label>
                    <input onChange={()=>{
                        resetPasswordMail.current.value = email.current.value
                    }} ref={email} type="email" id="email" name="email" />
                </div>
                <div>
                    <label form={"password"}>password</label>
                    <input ref={password} type="password" id="password" name="password" />
                </div>
                <button onClick={(event)=>{
                    event.preventDefault()
                    resetDialog.current.showModal();
                }}>Lost password</button>
                <button onClick={(event)=>{
                    event.preventDefault()
                    login(email.current.value,password.current.value)
                }}>Login</button>
                <a href="/register" role="button">Register</a>
                
            </form>

        </main>
        )
}
