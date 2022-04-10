import React, {useState, useEffect} from 'react'
import {authService, firebaseInstance, dbService} from '../../Firebase';
import {useRouter} from "next/router";
import classes from './LoginForm.module.scss';
import Text from '../common/Text';
import Button from '../common/Button';
import Image from 'next/image';
import StartImage from '../../public/images/start.png';


import { useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../store/modules/user';
interface UserType{
    USER:{
        data:{
            email: string,
            token:string,
        },
        isLoggedIn: boolean
    }
}

export default function LoginForm () {
    const [init, setInit]= useState(false);
    const [isLoggedIn, setIsLoggedIn]=useState(false);
    const [userInfo, setUserInfo]=useState({email:'', refreshToken:'', uid:''})

    const user=useSelector(({USER}:UserType)=>USER);
    const router= useRouter();
    const dispath=useDispatch();

    useEffect(()=>{
        isLoggedIn
        ? dispath(userActions.LOGIN(userInfo))
        : dispath(userActions.LOGOUT())
    },[userInfo]);

    useEffect(()=>{
        authService.onAuthStateChanged((user)=>{
            if(user){
                const {email, refreshToken, uid}= user;
                if(email){
                    setIsLoggedIn(true);
                    setUserInfo({
                        email:email,
                        refreshToken: refreshToken,
                        uid: uid,
                    })
                }
            }else{
                setIsLoggedIn(false);
                setUserInfo({
                    email:'',
                    refreshToken: '',
                    uid: '',
                })
            }
        })
    },[])



    const singIn=()=>{
        let provider = new firebaseInstance.auth.GoogleAuthProvider();
        authService.signInWithPopup(provider)
        .then((result)=>{
            dbService.ref('users/'+result.user?.uid)
                     .on('value', (snapshot)=>{
                         const data = snapshot.val();
                         // DSECRIBE: 이미 있는 계정이면 diary 로 이동
                         if(data){
                             router.push('/diary/');
                         }
                        // DESCRIBE: 없는 계정이면 회원가입 페이지로 이동 
                         else{
                            router.push('/register/');
                         }
                     })
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
        <div className={classes.wrapper}>
            <div className={classes.inner_wrapper}>
                <div className={classes.header}>
                    <div className={classes.title}>MYPLACE</div>
                    <div className={classes.image}>
                        <Image src={StartImage} width={200} height={200}></Image>
                    </div>
                    <div className={classes.desc}>
                        <span className={classes.bold}>마이플레이스</span>에<br></br> 장소 일기를 남기고, 공유해보세요!
                    </div>
                </div>
                <div className={classes.btn_wrapper}>
                    <Button onClick={singIn} text="시작하기" type="transparent"></Button>
                </div>
            </div>
        </div>
        {/* <div> */}
            {/* <button onClick={signOut}>로그아웃 버튼</button>
        </div>
        {isLoggedIn? <Text>로그인 상태</Text> : <Text>로그아웃 상태</Text>} */}
        </>
    )
}
