import React from 'react'
import classNames from 'classnames';
import classes from './common.module.scss';

interface ButtonProps{
    text:string;
    submitType?: "submit" | "button" | "reset"
    state?:string;
    type?:string;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
}
/**
 * 
 * @param text 버튼 텍스트
 * @param submitType 버튼 type submit | button | reset
 * @param state 버튼 상태 normal | disabled
 * @param type 버튼 종류 primary | secondary | transparent
 * @param onClick 클릭 이벤트 콜백 함수
 * @returns 
 */
export function Button({text, submitType="submit", state="normal", type="primary", onClick}:ButtonProps) {
  return (
    <button
        className={classNames(classes.button, classes[type], classes[state])}
        onClick={onClick}
        type={submitType ? submitType: 'button'}
    >
        {text}
    </button>
  )
}
