'use client';
import { redirect } from 'next/navigation';
import {useEffect, useRef, useState} from "react";
import {pb} from "@/lib/pocketbase";
import { useRouter } from 'next/navigation';

export default function Register() {
    const email = useRef()
    const password1 = useRef()
    const password2 = useRef()
    const [errors,setErrors] = useState()

    const [loading,setLoading] = useState(true)

    const { push } = useRouter();
  useEffect(()=>{
    if(pb.authStore.isValid){
      push("/")
    }
    
    setLoading(false)
  },[errors])

  if (pb.authStore.isValid){
    push("/");
}

  if (loading){
    return (<h1>Loading</h1>)
  }

    async function register(email,pass1,pass2){
        console.log("register");
        let authUser;
        let data = {
            "email": email,
            "emailVisibility": false,
            "password": pass1,
            "passwordConfirm": pass2
        }
        setLoading(true)
            try{
                authUser = await pb.collection("users").create(data)
                console.log("auth user : " ,authUser);
                await pb.collection('users').requestVerification(email)
                authUser = await pb.collection("users").authWithPassword(email,pass1)
                console.log(pb.authStore.isValid);
                if (!pb.authStore.isValid){
                    setError("Erreur")
                    
                }

            }catch (err){
                console.log("error");
                setErrors(err.data.data)
                console.log(err.data.data);
            }
        setLoading(false)
        
        
        //await pb.collection('users').requestVerification(email)

    }

    return (
        <main>
            <h1>Login</h1>
            <p>yolo</p>
            {errors?<p>{
                
                Object.keys(errors).length?Object.keys(errors).map(element => {
                    return errors[element].message
                }):<>Error : Failed to authenticate</>
                
                }</p>:<></>}
            <form>
                <div>
                    <label form={"email"}>email</label>
                    <input ref={email} type="email" id="email" name="email" />
                </div>
                <div>
                    <label form={"password1"}>password</label>
                    <input ref={password1} type="password" id="password1" name="password1" />
                </div>
                <div>
                    <label form={"password2"}>Repeat your password</label>
                    <input ref={password2} type="password" id="password2" name="password2" />
                </div>
                <button onClick={(event)=>{
                    event.preventDefault()
                    register(email.current.value,password1.current.value,password2.current.value)
                }}>Register</button>
                <a href="/login" role="button">Login</a>
            </form>

        </main>
        )
}
