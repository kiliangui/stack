import {pb} from "@/lib/pocketbase";

import {forwardRef, useRef} from 'react';

export const ChangePasswordDialog = forwardRef(function ChangePasswordDialog(props, ref) {
    const currentPassword = useRef()
    const newPassword = useRef()
    const confirmPassword = useRef();
    return <dialog ref={ref} className="flex-col" id="changePasswordDialog">
        <form method="dialog">
            <button onClick={()=>{
                ref.current.close();
            }}>X</button>
            <h2>Change password</h2>
            <div>
                <label htmlFor={"currentPassword"}>Current password</label>
                <input type={"password"} ref={currentPassword} name={"currentPassword"} id={"currentPassword"}/>
            </div>
            <div>
                <label htmlFor={"newPassword"}>New password</label>
                <input type={"password"} ref={newPassword} name={"newPassword"} id={"newPassword"}/>
            </div>
            <div>
                <label htmlFor={"confirmPassword"}>New password</label>
                <input type={"password"} ref={confirmPassword} name={"confirmPassword"} id={"confirmPassword"}/>
            </div>

            <menu className='flex'>
                <button onClick={async ()=>{
                    await pb.collection("users").update(pb.authStore.model.id,{
                        "oldPassword": currentPassword.current.value,
                        "password": newPassword.current.value,
                        "passwordConfirm": confirmPassword.current.value
                    })
                    ref.current.close();
                }}>Change password</button>
            </menu>
        </form>
    </dialog>
})