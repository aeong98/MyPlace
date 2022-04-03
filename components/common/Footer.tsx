import React, {useEffect, useState} from 'react'
import classes from './common.module.scss';
import {useRouter} from 'next/router';
import Link from 'next/link';

export default function Footer() {
  const router= useRouter();
  // 만약에 router 가 홈(로그인) 화면이라면, footer 숨기기
  const style={
    display: router.asPath === '/'? 'none':'flex',
  }

  const menu=[
    ['/diary/', '내 일기장'],
    ['/map/', '일기장 쓰기'],
    ['/feed/', '소통 공간'],
    ['/setting/', '설정']
  ]


  return (
    <div className={classes.footer} style={style}>
        <ul className={classes.menu_list}>
            {menu.map((mu,i)=>{
              const [path, name]=mu;
              return(
                <Link href={path}>
                  <li className={classes.menu} style={{
                    color: router.asPath === path
                    ? '#5D5FEF'
                    : '#667080'
                  }} >{name}</li>
                </Link>
              )
            })}
        </ul>
    </div>
  )
}
