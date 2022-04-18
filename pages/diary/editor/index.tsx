import React, {useCallback, useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux';
import Image from "next/image";

import classes from './editor.module.scss';
import {MdInsertPhoto} from 'react-icons/md';
import { getTodayDate } from '@hooks/utils';
import {Input, Button, Carousel} from "@components/common";
import {dbService} from '../../../Firebase';
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
    const ImgInput=useRef<HTMLInputElement>(null);
    const mood=['😄', '😂', '😘', '😒', '😣'];
    console.log(selectedPlace);

    const onChange=useCallback((e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        e.preventDefault();
        const {name, value}=e.target;
        setContent({
            ...content,
            [name]:value
        })
    },[content]);

    // TODO : 나중에 id 타이핑 에러 고려야됨.
    const onChangeMood=(e:React.MouseEvent<HTMLLIElement>)=>{
        e.preventDefault();
        console.log(e.target.id);
        setContent({
            ...content,
            ["mood"]:e.target.id
        })
    };
    
    useEffect(()=>{
        console.log('감지', content);
    },[content])


    const onImgChange=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
        const imageLists=e.target.files;
        let imageUrlLists=[...photos];
        if(imageLists){
            for (let i=0; i<imageLists.length; i++){
                const currentImageUrl= URL.createObjectURL(imageLists[i]);
                imageUrlLists.push(currentImageUrl);
            }
        }

        setPhotos(imageUrlLists);
    },[photos]);

    const onPhotoBtnClick=(e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        if(ImgInput){
            ImgInput.current!.click();
        }
    }

    // DESCRIBE: 일기저장하기 버튼
    const onClickSendBtn=useCallback(()=>{
        console.log(content);
        console.log(photos);
        let newPostKey= dbService.ref().child('posts').push().key;
        const newContent={
            "date":content.date,
            "weather":content.weather,
            "mood":content.mood,
            "place":content.place,
            "content":content.content,
            "user":content.user,
            "photos":photos,
        }
        Repository.storePosts(newPostKey, newContent)
    },[content, photos]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <div className={classes.title}>
                    <span className={classes.main_title}>{selectedPlace.place_name} </span> 에서 
                </div>
                <div className={classes.flex_wrapper}>
                    <div className={classes.date}>{content.date}</div>
                    <div>
                        <ul className={classes.weather_list}>
                            <li className={classes.weather}>화창</li>
                            <li className={classes.weather}>흐림</li>
                            <li className={classes.weather}>비</li>
                            <li className={classes.weather}>눈</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={classes.emotion_wrapper}>
                <div className={classes.label}>기분을 기록해보세요</div>
                <ul className={classes.emotion_list}>
                    {mood.map((item, idx)=>{
                        return <li className={classes.emotion} id={`${idx}`} onClick={onChangeMood}>{item}</li>
                    })}
                </ul>
            </div>
            <div className={classes.photo_wrapper}>
            <div className={classes.label}>장소에서 찍은 사진을 함께 올려 기록하세요</div>
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
                <div className={classes.label}>장소에서 있었던 일을 기록해주세요</div>
                <Input
                    value={content.content}
                    type="textarea"
                    name="content"
                    id="content"
                    placeholder="내용을 입력하세요"
                    onChange={onChange}
                ></Input>
            </div>
            <div className={classes.footer}>
                <Button
                    text="일기 저장하기"
                    onClick={onClickSendBtn}
                ></Button>
            </div>
        </div>
    )
}
