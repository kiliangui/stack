import PocketBase from "pocketbase"


export const pb = new PocketBase('http://127.0.0.1:8090');

var authData = null


export function getAvatar(user){
    if (!user && !user.avatar){
        return ""
    }
    return pb.baseUrl+"/api/files/_pb_users_auth_/"+user.id+"/"+user.avatar;
}

