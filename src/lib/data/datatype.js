import {pb} from "@/lib/pocketbase";

const collection = "posts";

//CREATE
export async function createPost(title) {
    try {
        const data = {
            "title": title,
            "author": pb.authStore.model.id
        };
        const record = await pb.collection(collection).create(data);
        return ([true, record])
    } catch (e) {
        console.warn("error while creating posts by pages : ", e);
        return ([false, e])
    }
}
//READ

export async function listPosts(page,query){
    try{
        const resultList = await pb.collection(collection).getList(page, 50, {
            filter: query,
        });
        return ([true,resultList])
    }catch (e){
        console.warn("error while listing posts by pages : ", e);
        return ([false,e])
    }
}
export async function listAllPosts(){
    try{
        const records = await pb.collection(collection).getFullList({
            sort: '-created',
        });
        return ([true,records])
    }catch (e){
        console.warn("error while listing all posts : ", e);
        return ([false,e])
    }
}

export async function getPostById(id){
    try{
        const record = await pb.collection(collection).getOne(id)
        return ([true,record])
    }catch (e){
        console.warn("error while reading a post by ID : ", e);
        return ([false,e])
    }
}


//UPDATE

    export async function updatePost(id,title){
        try{
            const data = {
            };
            data["title"] = title;

            const record = await pb.collection(collection).update(id, data);
        return ([true,record]);
        }catch (e){
        console.warn("error while updating a post : ", e);
        return ([false,e])
    }

}

//DELETE

    export async function deletePost(id){
        try{
            await pb.collection(collection).delete(id);
            return ([true,null])
        }catch (e){
            console.warn("error while deleting a post : ", e);
            return ([false,e])
        }
    }
