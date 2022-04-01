import React from 'react'
import classes from './Layout.module.scss';

export interface LayoutProps{
    children : React.ReactNode
}

export default function Layout(props:LayoutProps) {
  return (
    <div className={classes.background}>
        <div className={classes.container}>
            {props.children}
        </div>  
    </div>
  )
}
