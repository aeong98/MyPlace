import { dbService } from "Firebase";

class Repository{
    storePosts(postsId:string, content:any){
        dbService.ref('posts/'+postsId).set({
            "date":content.date,
            "weather":content.weather,
            "mood":content.mood,
            "place":content.place,
            "content":content.content,
            "user":content.user,
            "photos":content.photo,
        })
    }
}
export default Repository;