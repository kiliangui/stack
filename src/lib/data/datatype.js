import {pb} from "@/lib/pocketbase";

const collection = "posts";

"CREATE"
export async function createPost(title){
    try{
        const data = {
            "title": title,
            "author": pb.authStore.model.id
        };
        const record = await pb.collection(collection).create(data);
        return ([true,record])
    }catch (e){
        console.warn("error while creating a post : ", e);
        return ([false,e])
    }
}
"READ"

"UPDATE"

"DELETE"