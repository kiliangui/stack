import {pb} from "@/lib/pocketbase";

import {forwardRef, useRef} from 'react';
import {createPost} from "@/lib/data/datatype";

export const CreatePostDialog = forwardRef(function ChangePasswordDialog(props, ref) {
    const title = useRef()
    return <dialog ref={ref} className="flex-col" id="changePasswordDialog">
        <form method="dialog">
            <button onClick={()=>{
                ref.current.close();
            }}>X</button>
            <h2>Create a post</h2>
            <div>
                <label htmlFor={"title"}>Post title</label>
                <input type={"text"} ref={title} name={"title"} id={"title"}/>
            </div>

            <menu className='flex'>
                <button onClick={async ()=>{
                    await createPost(title.current.value);
                    ref.current.close();
                }}>Change password</button>
            </menu>
        </form>
    </dialog>
})