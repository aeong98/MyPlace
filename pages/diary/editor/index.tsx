import React, {useCallback, useRef, useState} from 'react'
import { useSelector } from 'react-redux';
import {Input, Button} from "@components/common";

import classes from './editor.module.scss';
import {MdInsertPhoto} from 'react-icons/md';
import { getTodayDate } from '@hooks/utils';
interface MapType{
    map:{
        data:any;
        map:any;
        status:string;
    }
}

export default function index() { 
    const [content, setContent]=useState({
        "date":getTodayDate(),
        "weather":'',
        "mood":'',
        "place":{},
        "content":'',
        "user":{}
    })

    const [photos, setPhotos]=useState<string[]>([]);
    const ImgInput=useRef<HTMLInputElement>(null);
    const mood=['😄', '😂', '😘', '😒', '😣'];
    const selectedPlace= useSelector(({map}:MapType)=>map).data;

    const onChange=useCallback((e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        e.preventDefault();
        const {name, value}=e.target;
        setContent({
            ...content,
            [name]:value
        })
    },[content.content]);

    // TODO : 나중에 id 타이핑 에러 고려야됨.
    const onChangeMood=useCallback((e:React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        setContent({
            ...content,
            ["mood"]:e.target.id
        })
    },[content.mood]);


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

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <div className={classes.title}>
                    <span className={classes.main_title}>스타벅스 </span> 에서 
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
                <div className={classes.photo_btn} onClick={onPhotoBtnClick}>
                    <div style={{opacity:"0.6"}}>
                        <MdInsertPhoto></MdInsertPhoto>
                    </div>
                </div>
                <input ref={ImgInput} type="file" id="photo" accept='image/*' multiple onChange={onImgChange}>
                </input>
                {photos.map((image,idx)=>{
                    return (
                        <div style={{width:"50px", height:"50px", display:"block"}}>
                             <img src={image} alt={`${image}-${idx}`} />
                        </div>
                    )
                })}
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
                ></Button>
            </div>
        </div>
    )
}
