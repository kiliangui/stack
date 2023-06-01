'use client';
import { pb } from '@/lib/pocketbase'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
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
  return (
    <main >
      <h1>Landing page</h1>
      <p>This page serve as landing page</p>
      {user?
      <>
      <h2>Authenticated</h2>
      <button onClick={()=>{
        pb.authStore.clear()
        setUser(null)
        
      }}>Logout</button>
      <a href="/dashboard">Dashboard</a>
      </>
      :
      <>
        <a href={"/login"} >Login</a>
        <a href={"/register"}>register</a>
        </>}
        
    </main>
  )
}
