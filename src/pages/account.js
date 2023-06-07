import { getAvatar, pb } from '@/lib/pocketbase'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {ChangePasswordDialog} from "@/components/Dialogs/changePasswordDialog";
import {DeleteAccountDialog} from "@/components/Dialogs/deleteAccountDialog";

export default function Home({user}) {
    const deleteAccountDialog = useRef();
    const changePasswordDialog = useRef()
  const pdpimg = useRef();
  const { push } = useRouter();

  if(!user) {
      push("/login")
  }
  return (
    <main>
        <DeleteAccountDialog ref={deleteAccountDialog}/>
        <ChangePasswordDialog ref={changePasswordDialog}/>

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
          <p>{user.email}</p>
          <button onClick={()=>{
              console.log(changePasswordDialog)
              changePasswordDialog.current.showModal();
          }}>Change password</button>
      </div>
          <button onClick={async ()=>{
              //TODO : faire les try catch et remonter les erreurs.
              try{

                await pb.collection('users').unlinkExternalAuth(user.id,"twitter")
              }catch (e) {
              }
              await pb.collection("users").authWithOAuth2({provider:"twitter"})
              console.log("done")
              const result = await pb.collection('users').listExternalAuths(
                  pb.authStore.model.id
              );
              let last = "";
              let min = false;
              let minid = 0;
              for (const item of result) {
                  console.log(item.created)
                  let itemDate = Date.parse(item.created.replace(" ","T"))
                                    if(!min) {
                                        min = itemDate
                                        minid = result.indexOf(item)
                                    }
                                    if (itemDate > min){
                                        min = itemDate
                                        minid = result.indexOf(item)
                                    }
              }
              console.log("min = ",min, minid)
              console.log(result[minid])

              await pb.collection("oauth2").create({
                  "provider_name":result[minid].provider,
                  "provider_id":result[minid].providerId,
                  "user_id": user.id
              })
              console.log()
          }}>log with twitter</button>
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
