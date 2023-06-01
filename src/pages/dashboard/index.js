import { getAvatar, pb } from '@/lib/pocketbase'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loading,setLoading] = useState(true)
  const [user,setUser] = useState()
  const { push } = useRouter();
  useEffect(()=>{
    if(!user && pb.authStore.isValid){
      setUser(pb.authStore.model)
      console.log(user);
    }
    setLoading(false)
    if(!loading && !pb.authStore.isValid){
        push("/login")
    }
  },[user])
  if(!loading && !pb.authStore.isValid){
    push("/login")
}
  if (loading){
    return (<h1>Loading</h1>)
  }
  return (
    <main >
      <h1>Dashboard page</h1>
      <p>This page is reserved at logged users</p>
      <h2>Authenticated</h2>
      <button onClick={()=>{
        push("/logout")
      }}>Logout</button>
    <a href="/account">Account settings</a>
        
    </main>
  )
}
