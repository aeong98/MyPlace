import React from 'react'
import classes from './Text.module.scss';

export interface TextProps{
    children : React.ReactNode
}

export default function Text(props:TextProps) {
  return (
    <div className={classes.text}>{props.children}</div>
  )
}
