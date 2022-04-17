import React, {useState} from 'react'
import classes from './common.module.scss';


interface IconButtonProps{
    label?:string,
    onClick: (e:React.MouseEvent<HTMLDivElement>)=>void;
}

export function IconButton({label, onClick}:IconButtonProps) {

    const [isShown, setIsShown]=useState(false);


    return (
        <>
            <div className={classes.icon_label} style={isShown? {display:"block"}: {display:"none"}}>{label}</div>
            <div onClick={onClick} 
                className={classes.icon_button} 
                onMouseEnter={()=>setIsShown(true)}
                onMouseLeave={()=>setIsShown(false)}
            >
                <div className={classes.icon_content}>+</div>
            </div>
        </>
    )
}
