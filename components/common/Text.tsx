import React from 'react'
import classes from './common.module.scss';

export interface TextProps{
    children : React.ReactNode
}

export function Text(props:TextProps) {
  return (
    <div className={classes.text}>{props.children}</div>
  )
}
