import React, {useEffect,useCallback, useState} from 'react';
import { useSelector } from 'react-redux';
import {dbService} from '../../Firebase';
import classes from './register.module.scss';
import Image from 'next/image';
import Register from "../../public/images/register.png";
import {Button, Input} from '@components/common';


interface UserType{
    user:{
        data:{
            email: string,
            token:string,
            uid:string
        },
        isLoggedIn: boolean
    }
}


export default function index() {
    const [userInfo, setUserInfo]=useState({
        "user":"",
        "nickname":"",
        "description":"",
    })
    const user=useSelector(({user}:UserType)=>user).data;
    
    useEffect(()=>{
        setUserInfo({
            ...userInfo,
            ["user"]:user.email,
        })
    },[user])
    
    const onChange=useCallback((e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        const {name, value}=e.target;
        setUserInfo({
            ...userInfo,
            [name]:value,
        })
    },[userInfo]);

    const onSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        console.log("유저 정보 보내기", userInfo);
        dbService
            .ref('users/'+user.uid)
            .set(userInfo)
            .then((res:any)=>{
                console.log(res)
            })
            .catch((err:any)=>{
                console.log(err);
            })

        setUserInfo({
            "user":"",
            "nickname":"",
            "description":"",
        });
        
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.image_wrapper}>
                <Image src={Register} width={200} height={200}></Image>
            </div>
            <div className={classes.title}>
               <div>
                   <span style={{fontWeight:"bold"}}>{user.email}</span><br></br>님 환영합니다.
               </div>
               <div>
                    마이플레이스에 회원가입 하시겠습니까?
               </div>
            </div>
            <div className={classes.form_wrapper}>
            <form onSubmit={onSubmit} className={classes.form}>
                <Input
                    label="닉네임"
                    type="text"
                    name="nickname"
                    id="nickname"
                    placeholder="1. 닉네입을 입력하세요"
                    onChange={onChange}
                    value={userInfo.nickname}
                ></Input>
                <Input
                    label="자기소개"
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="2. 자기소개를 입력해주세요"
                    onChange={onChange}
                    value={userInfo.description}
                ></Input>
                <div className={classes.btn_wrapper}>
                    <Button 
                        text="회원가입"
                        submitType="submit"
                    ></Button>
                </div>
            </form>
            </div>
        </div>
    )
}
