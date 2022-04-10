import React from 'react'
import classNames from 'classnames';
import classes from './common.module.scss';

interface ButtonProps{
    text:string;
    submitType?:string;
    state?:string;
    type?:string;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
}
export default function Button({text, submitType="submit", state="normal", type="primary", onClick}:ButtonProps) {
  return (
    <button
        className={classNames(classes.button, classes[type], classes[state])}
        onClick={onClick}
    >
        {text}
    </button>
  )
}
