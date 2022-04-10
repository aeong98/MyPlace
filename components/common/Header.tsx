import React, {useState, useEffect}  from 'react';
import { useRouter } from 'next/router';
import classes from "./common.module.scss";

export default function Header() {

    const hidePath=[
        '/',
        '/diary/editor/',
        '/register/'
    ]
    
    const [hide, useHide]=useState(true);
    const router= useRouter();
    
    useEffect(()=>{
        console.log(router.asPath);
      hidePath.includes(router.asPath)
      ? useHide(true)
      : useHide(false)
    },[router.asPath])
  
    return (
        <>
        {!hide&&
        <div className={classes.header}>
            <div>
                뒤로가기
            </div>
            <div>
                제목
            </div>
            <div>
                로그아웃
            </div>
        </div>}
        </>
    )
}
