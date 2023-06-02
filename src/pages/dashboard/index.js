import { pb } from '@/lib/pocketbase'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard({user}) {
  const { push } = useRouter();
  if(!user){
      push("/login")
  }
  return (
    <main >
      <h1>Dashboard page</h1>
      <p>This page is reserved at logged users</p>
      <h2>Authenticated</h2>

    <a href="/account">Account settings</a>
        
    </main>
  )
}
