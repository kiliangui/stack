'use client';

import {useRef} from "react";
import {pb} from "@/lib/pocketbase";

export default function Login() {
    const email = useRef()
    const password1 = useRef()
    const password2 = useRef()

    function register(email,pass1,pass2){
        if (pass1 != pass2)

        const authUser = pb.collection("users").authWithPassword(email,pass1)
    }
    func

    if (pb.authStore.isValid){
        return (<main>
                <h1>Authenticated</h1>
                <button onClick={logout} >Logout</button>
            </main>

            )
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
                }}>Login</button>
            </form>

        </main>
        )
}
