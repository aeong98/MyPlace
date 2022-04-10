import React, {useEffect, useState} from 'react'
import classes from './common.module.scss';
import {useRouter} from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import * as mapActions from '../../store/modules/map';

export default function Footer() {
  const router= useRouter();
  const dispatch=useDispatch();
  // 만약에 router 가 홈(로그인) 화면이라면, footer 숨기기

  const hide=[
    '/',
    '/diary/editor/',
    '/register/'
  ]
  const menu=[
    ['/diary/', '내 일기장'],
    ['/map/', '일기장 쓰기'],
    ['/feed/', '소통 공간'],
    ['/setting/', '설정']
  ]

  const style={
    display: hide.includes(router.asPath)? 'none':'flex',
  }


  return (
    <div className={classes.footer} style={style}>
        <ul className={classes.menu_list}>
            {menu.map((mu,i)=>{
              const [path, name]=mu;
              return(
                  <li className={classes.menu} 
                  onClick={()=>{
                    dispatch (mapActions.CLEARMAP());
                    router.push(
                    path,
                    path,
                    {shallow:false}
                  )}}
                  style={{
                    color: router.asPath === path
                    ? '#5D5FEF'
                    : '#667080'}} >{name}</li>
              )
            })}
        </ul>
    </div>
  )
}
