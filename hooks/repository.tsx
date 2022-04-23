import { dbService } from "../Firebase";


export const Repository={
    storePosts:(postsId:string, content:any)=>
        dbService.ref('posts/'+postsId).set({
            "date":content.date,
            "weather":content.weather,
            "mood":content.mood,
            "place":content.place,
            "content":content.content,
            "user":content.user,
            "user_email":content.user.email,
            "photos":content.photos,
        })
    ,
    getAllPosts:()=>{
        dbService.ref('posts').on("value", (snapshot:any)=>{
            const data=snapshot.val();
            return data
        })
    },
    getUserPosts:()=>{
        dbService.ref()
                .child("posts")
                .orderByChild("user_email")
                .equalTo("sy9815@gmail.com")
                .once("value", (snapshot:any)=>{
            console.log(snapshot.val());
        })
    }

}