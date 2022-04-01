import React, {useState, useEffect} from 'react'
import {authService, firebaseInstance} from '../../Firebase';
import classes from './LoginForm.module.scss';
import Text from '../common/Text';
export default function LoginForm () {
    const [init, setInit]= useState(false);
    const [isLoggedIn, setIsLoggedIn]=useState(false);

    useEffect(()=>{
        authService.onAuthStateChanged((user)=>{
            if(user){
                console.log(user);
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
        })
    },[])

    const singIn=()=>{
        let provider = new firebaseInstance.auth.GoogleAuthProvider();
        authService.signInWithPopup(provider)
        .then((result)=>{
            console.log(result);
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    const signOut=()=>{
       authService.signOut()
       .then((result)=>{
           console.log(result);
       })
       .catch((error)=>{
           console.log(error);
       })
    }

    return (
        <>
        <div>
            <button onClick={singIn}>구글 소셜 로그인</button>
        </div>
        <div>
            <button onClick={signOut}>로그아웃 버튼</button>
        </div>
        {isLoggedIn? <Text>로그인 상태</Text> : <Text>로그아웃 상태</Text>}
        </>
    )
}
