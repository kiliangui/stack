'use client';
import { pb } from '@/lib/pocketbase'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home({user}) {

  return (
    <main  className={"flex flex-col justify-center items-center h-[100vh]"}>
      <h1>Landing page</h1>
      <p>This page serve as landing page</p>

      <a href={user?"/dashboard":"/register"}>StartNow !</a>
        
    </main>
  )
}
