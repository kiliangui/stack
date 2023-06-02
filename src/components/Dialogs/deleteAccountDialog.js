import {pb} from "@/lib/pocketbase";

import {forwardRef} from 'react';
import {useRouter} from "next/navigation";

export const DeleteAccountDialog = forwardRef(function DeleteAccountDialog(props, ref) {
    const { push } = useRouter();
    return <dialog className="flex-col" ref={ref} id="deleteAccountDialog">
        <form method="dialog">
            <h2>Delete account</h2>
            <p>Are you sure you want to delete your account ?</p>

            <menu className='flex'>
                <button onClick={(e)=>{
                    e.preventDefault()
                    pb.collection("users").delete(pb.authStore.model.id)
                    pb.authStore.clear()
                    push("/")
                }}>Yes, i'm sure</button>
                <button>Cancel</button>
            </menu>
        </form>

    </dialog>
})