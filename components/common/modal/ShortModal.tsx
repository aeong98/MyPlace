import React, {useCallback, useState} from 'react'
import classes from './overlay.module.scss';
import classNames from "classnames";

interface ModalProps{
  showModal: boolean;
  setShowModal:(e:boolean)=>void;
  children:React.ReactNode
}

export default function ShortModal({showModal, setShowModal, children}:ModalProps) {

  const clickCloseBtn=()=>{
      setShowModal(false);
  }

  return (
    <div className={classes.overlay} style={{display: showModal? "block": "none"}}>
      <div className={classNames(classes.modal_container, classes.short, showModal? classes.active: "")}>
        <div className={classes.modal_header}>
          <div className={classes.close_btn} onClick={clickCloseBtn}>x</div>
        </div>
        {children}
      </div>
    </div>
  )
}