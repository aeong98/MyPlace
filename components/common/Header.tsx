import React, {useState, useEffect}  from 'react';
import { useRouter } from 'next/router';
import classes from "./common.module.scss";

export default function Header() {

    const hidePath=[
        '/',
        '/diary/editor/',
        '/register/'
    ]

    const titleList:any={
        '/diary/':'내 일기장',
        '/map/':'장소 찾기',
        '/feed/': '소통 공간',
        '/setting/': '설정'
    }
    
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
            <div className={classes.logo}>
                MYPLACE
            </div>
            <div className={classes.title}>
                {titleList[router.asPath]}
            </div>
        </div>}
        </>
    )
}
