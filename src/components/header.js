import {useEffect, useState} from "react";
import {pb} from "@/lib/pocketbase";
export function Header({user}){
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
                            <a href={"/dashboard"}>Dashboard</a>
                        </li>
                        <li>
                            <a href={"/account"}>Account</a>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <a href={"/login"}>Login</a>
                        </li>
                        <li>
                            <a href={"/register"}>SignUp</a>
                        </li>
                    </>}

                
            </ul>
        </nav>
    </header>
}