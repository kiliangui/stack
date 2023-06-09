import './globals.css'
import { Inter } from 'next/font/google'
import '@picocss/pico'
import UnderConstruct from './underConstruct'
import {useEffect, useState} from "react";
import {pb} from "@/lib/pocketbase";
import {Header} from "@/components/header";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function App({ Component, pageProps }) {
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState()
    useEffect(()=>{
        if(pb.authStore.isValid){
            setUser(pb.authStore.model)
            console.log(user);
        }
        setLoading(false)
    },[])

    if (loading){
        return (<h1>Loading</h1>)
    }
    pageProps["user"] = user;
    pageProps["setUser"] = setUser;
    return <>
        <Header {...pageProps} />
    <Component {...pageProps} /></>;
  }

//  export default function App({ Component, pageProps }) {
//    return <UnderConstruct/>;
//  }