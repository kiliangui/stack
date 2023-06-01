'use client';

import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Login() {
    const { push } = useRouter();
    useEffect(()=>{
        pb.authStore.clear()
        push("/login")
    },[])
    
}
