import React, {useCallback, useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux';
import Image from "next/image";

import classes from './editor.module.scss';
import {MdInsertPhoto} from 'react-icons/md';
import { getTodayDate } from '@hooks/utils';
import {Input, Button, Carousel} from "@components/common";
import {dbService, storageService} from '../../../Firebase';
import {Repository} from '@hooks/repository';
interface MapType{
    map:{
        data:any;
        map:any;
        status:string;
    }
}

interface User{
    user:{
        data:{
            email:string,
            refreshToken:string,
            uid:string,
        }
    }
   
}


export default function index() { 
    const selectedPlace= useSelector(({map}:MapType)=>map.data);
    const user= useSelector(({user}:User)=>user.data);

    const [content, setContent]=useState({
        "date":getTodayDate(),
        "weather":'',
        "mood":'',
        "place":selectedPlace,
        "content":'',
        "user":user,
    })

    const [photos, setPhotos]=useState<string[]>([]);
    const [attachments, setAttachments]=useState([]);
    const [fileNames, setFileNames]=useState<string[]>([]);
    const ImgInput=useRef<HTMLInputElement>(null);
    const mood=['π', 'π', 'π', 'π', 'π£'];
    console.log(selectedPlace);

    const onChange=useCallback((e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        e.preventDefault();
        const {name, value}=e.target;
        setContent({
            ...content,
            [name]:value
        })
    },[content]);

    // TODO : λμ€μ id νμ΄ν μλ¬ κ³ λ €μΌλ¨.
    const onChangeMood=(e:React.MouseEvent<HTMLLIElement>)=>{
        e.preventDefault();
        console.log(e.target.id);
        setContent({
            ...content,
            ["mood"]:e.target.id
        })
    };
    
    useEffect(()=>{
        console.log('κ°μ§', content);
    },[content])


    const onImgChange=useCallback(async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const imageLists=e.target.files;
        let attach:any=[...attachments];
        let imageUrlLists:any=[...photos];
        let names=[];
        if(imageLists){
            for (let i=0; i<imageLists.length; i++){    
                // νμΌμ΄λ¦ μ μ₯
                names.push(imageLists[i].name);   
                // μλ²μ μ μ₯ν  μΈμ½λ© νμΌ μ μ₯
                const reader = new FileReader();
                reader.readAsDataURL(imageLists[i]);
                reader.onloadend=()=>{
                    let base64data =reader.result;
                    attach.push(base64data);

                }     
                // νμ¬ μ΄λ―Έμ§ URL μ μ₯ (νλ¦¬λ·°μ©)
                const currentImageUrl= URL.createObjectURL(imageLists[i]);
                imageUrlLists.push(currentImageUrl)
            }
        }
        setFileNames(names);
        setAttachments(attach);
        setPhotos(imageUrlLists);
    },[photos]);

    const onPhotoBtnClick=(e:React.MouseEvent<HTMLDivElement>)=>{
        e.preventDefault();
        if(ImgInput){
            ImgInput.current!.click();
        }
    }

    // DESCRIBE: μΌκΈ°μ μ₯νκΈ° λ²νΌ
    const onClickSendBtn=useCallback(async()=>{
        let attachmentURL=[];
        if(attachments.length !==0){
            for (let i=0; i< attachments.length; i++){
                const fileRef = storageService.ref().child(`${user.uid}/${fileNames![i]}`)
                const response= await fileRef.putString(attachments[i],"data_url")
                attachmentURL.push(await response.ref.getDownloadURL());
            }
        }

        let newPostKey= dbService.ref().child('posts').push().key;
        const newContent={
            "date":content.date,
            "weather":content.weather,
            "mood":content.mood,
            "place":content.place,
            "content":content.content,
            "user":content.user,
            "photos":attachmentURL,
        }
        await Repository.storePosts(newPostKey, newContent)
                  .then((res:any)=>{
                    console.log(res)
                  })
                  .catch((err:any)=>{
                      console.log(err);
                  })

        
    },[content, photos, fileNames]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <div className={classes.title}>
                    <span className={classes.main_title}>{selectedPlace.place_name} </span> μμ 
                </div>
                <div className={classes.flex_wrapper}>
                    <div className={classes.date}>{content.date}</div>
                    <div>
                        <ul className={classes.weather_list}>
                            <li className={classes.weather}>νμ°½</li>
                            <li className={classes.weather}>νλ¦Ό</li>
                            <li className={classes.weather}>λΉ</li>
                            <li className={classes.weather}>λ</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={classes.emotion_wrapper}>
                <div className={classes.label}>κΈ°λΆμ κΈ°λ‘ν΄λ³΄μΈμ</div>
                <ul className={classes.emotion_list}>
                    {mood.map((item, idx)=>{
                        return <li key={`emotion-${item}-${idx}`}className={classes.emotion} id={`${idx}`} onClick={onChangeMood}>{item}</li>
                    })}
                </ul>
            </div>
            <div className={classes.photo_wrapper}>
            <div className={classes.label}>μ₯μμμ μ°μ μ¬μ§μ ν¨κ» μ¬λ € κΈ°λ‘νμΈμ</div>
                {photos.length<1?
                <>
                    <div className={classes.photo_btn} onClick={onPhotoBtnClick}>
                        <div style={{opacity:"0.6"}}>
                            <MdInsertPhoto></MdInsertPhoto>
                        </div>
                    </div>
                </>
                :
                <Carousel images={photos}></Carousel>
                }
                <input ref={ImgInput} type="file" id="photo" accept='image/*' multiple onChange={onImgChange} style={{display:"none"}}>
                </input>
              
            </div>
            <div className={classes.body}>
                <div className={classes.label}>μ₯μμμ μμλ μΌμ κΈ°λ‘ν΄μ£ΌμΈμ</div>
                <Input
                    value={content.content}
                    type="textarea"
                    name="content"
                    id="content"
                    placeholder="λ΄μ©μ μλ ₯νμΈμ"
                    onChange={onChange}
                ></Input>
            </div>
            <div className={classes.footer}>
                <Button
                    text="μΌκΈ° μ μ₯νκΈ°"
                    onClick={onClickSendBtn}
                ></Button>
            </div>
        </div>
    )
}
