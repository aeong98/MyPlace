import React from 'react'
import classes from './common.module.scss';
import {Header, Footer} from "@components/common";
export interface LayoutProps{
    children : React.ReactNode
}

export function Layout(props:LayoutProps) {
  return (
    <>
    <div className={classes.background}>
        <div className={classes.container}>
            <Header></Header>
            {props.children}
            <Footer></Footer>
        </div>  
    </div>
    </>
  )
}
