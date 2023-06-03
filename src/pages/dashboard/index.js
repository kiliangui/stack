import { useRef} from 'react';
import { useRouter } from 'next/navigation';
import {CreatePostDialog} from "@/components/Dialogs/createPostDialog";

export default function Dashboard({user}) {
    const createPostDialog = useRef()
  const { push } = useRouter();
  if(!user){
      push("/login")
  }
  return (<>
        <CreatePostDialog ref={createPostDialog}/>
          <main >
              <h1>Dashboard page</h1>
              <p>This page is reserved at logged users</p>
              <h2>Authenticated</h2>

              <button onClick={()=>{
                  createPostDialog.current.showModal();
              }}>Add a post</button>
              <a href="/account">Account settings</a>

          </main>
  </>

  )
}
