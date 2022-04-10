import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

import classes from './editor.module.scss';
import {MdInsertPhoto} from 'react-icons/md';
interface MapType{
    map:{
        data:any;
        map:any;
        status:string;
    }
}

export default function index() { 
    const [content, setContent]=useState({
        "date":'',
        "weather":'',
        "place":{},
        "photo":'',
        "content":'',
        "user":{}
    })
    const selectedPlace= useSelector(({map}:MapType)=>map).data;

    const onChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        e.preventDefault();
        const {name, value}=e.target;
        setContent({
            ...content,
            [name]:value
        })
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <div className={classes.title}>
                    <span className={classes.main_title}>스타벅스 </span> 에서 
                </div>
                <div className={classes.flex_wrapper}>
                    <div className={classes.date}>2022년 04월 10일</div>
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
                    <li className={classes.emotion}>😄</li>
                    <li className={classes.emotion}>😂</li>
                    <li className={classes.emotion}>😘</li>
                    <li className={classes.emotion}>😒</li>
                    <li className={classes.emotion}>😣</li>
                </ul>
            </div>
            <div className={classes.photo_wrapper}>
                <div className={classes.label}>장소에서 찍은 사진을 함께 올려 기록하세요</div>
                <div className={classes.photo_btn}>
                    <div style={{opacity:"0.6"}}>
                        <MdInsertPhoto></MdInsertPhoto>
                    </div>

                </div>
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
