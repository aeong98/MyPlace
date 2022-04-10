import React from 'react'
import classes from './common.module.scss';
import Footer from './Footer';
import Header from './Header';
export interface LayoutProps{
    children : React.ReactNode
}

export default function Layout(props:LayoutProps) {
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
