import React from 'react'
import classes from './common.module.scss';


export default function Footer() {
  return (
    <div className={classes.footer}>
        <ul className={classes.menu_list}>
            <li className={classes.menu}>내 일기장</li>
            <li className={classes.menu}>일기장 쓰기</li>
            <li className={classes.menu}>소통 공간</li>
            <li className={classes.menu}>설정</li>
        </ul>
    </div>
  )
}
