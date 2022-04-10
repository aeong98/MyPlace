import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/common/Layout';
import {dbService} from '../../Firebase';
import Input from '../../components/common/Input';
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
    
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value}=e.target;
        setUserInfo({
            ...userInfo,
            [name]:value,
        })
    }
    const onSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        console.log("유저 정보 보내기", userInfo);
        dbService
            .ref('users/'+user.uid)
            .set(userInfo)
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err);
            })

        setUserInfo({
            "user":"",
            "nickname":"",
            "description":"",
        });
        
    }
    return (
        <div>
                <div>Playground 에 회원가입 하시겠습니까?</div>
                <form onSubmit={onSubmit}>
                    <Input
                        label="닉네임"
                        type="text"
                        name="nickname"
                        id="nickname"
                        placeholder="닉네입을 입력하세요"
                        onChange={onChange}
                    ></Input>
                    <Input
                        label="자기소개"
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder="자기소개를 입력해주세요"
                        onChange={onChange}
                    ></Input>
                    <div>
                        <button type="submit">회원가입하기</button>
                    </div>
                </form>
        </div>
    )
}
