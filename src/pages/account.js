import { getAvatar, pb } from '@/lib/pocketbase'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loading,setLoading] = useState(true)
  const [user,setUser] = useState()
  const deleteAccountDialog = useRef();
  const pdpimg = useRef()
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
  }else if (!user){
    push("/login")
  }
  return (
    <main >
      <dialog className="flex-col" ref={deleteAccountDialog} id="deleteAccountDialog">
        <form method="dialog">
                <h2>Delete account</h2>
                <p>Are you sure you want to delete your account ?</p>

                <menu className='flex'>
                <button onClick={(e)=>{
                  e.preventDefault()
                    pb.collection("users").delete(pb.authStore.model.id)
                    pb.authStore.clear()
                    }}>Yes, i'm sure</button>
                <button>Cancel</button>
                </menu>
        </form>
                
      </dialog>
      <h1>Account page</h1>
      <p>This page is reserved at logged users</p>
      <div className='flex'>
        <div className='relative w-48 h-48'>
          <img ref={pdpimg} id="pdp" className=' w-full h-full hover:opacity-50 object-cover rounded-[20rem]' src={user.avatar?getAvatar(user):"https://picsum.photos/536/354"}/>
          <input onChange={async (event)=>{
            
            const formData = new FormData();
            for (let file of event.target.files) {
              formData.append('avatar', file);
          }
          const record = await pb.collection('users').update(user.id, formData);

          pdpimg.current.setAttribute("src",getAvatar(pb.authStore.model))
                
          }} type="file" className='hidden' id="selectedFile"/>
          <button type="button" onClick={()=>{
            document.getElementById('selectedFile').click();}}
            id="selectfiles" 
            className='absolute top-0 rounded-[20rem] p-0 border-0'></button>
          </div>


      <div>
      <h2>Welcome {user.username?user.username:user.email}</h2>
      </div>
      </div>
      

      <h2>Authenticated</h2>
      <button onClick={()=>{
          push("/logout")
      }}>Logout</button>
    <button onClick={()=>{
      deleteAccountDialog.current.showModal()
      
    }}>Delete account</button>
        
    </main>
  )
}
