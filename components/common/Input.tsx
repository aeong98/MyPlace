import React, {useState,useCallback} from 'react'
import classes from './common.module.scss';

interface InputProps{
    label?:string;
    type:string;
    name:string;
    id:string;
    placeholder:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}


export default function Input({label, type, name, id, placeholder, onChange}:InputProps) {
    
    const [inputType, setInputType]=useState("default");

    const handleFocus=useCallback(()=>{
        setInputType("focused");
    },[inputType]);

    const handleBlur=useCallback(()=>{
        setInputType("default");
    },[inputType]);


  
    if(type==="textarea"){
        return(
            <div className={classes.input_group}>
            <label className={classes.label} htmlFor={name}>{label}</label>
            <textarea
                className={classes[inputType]}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={()=>onChange}
                onFocus={()=>handleFocus()}
                onBlur={()=>handleBlur()}
            >
            </textarea>
        </div>)
    }
    return (
    <div className={classes.input_group}>
        <label className={classes.label} htmlFor={name}>{label}</label>
        <input
            className={classes[inputType]}
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            onChange={()=>onChange}
            onFocus={()=>handleFocus()}
            onBlur={()=>handleBlur()}
        >
        </input>
    </div>
  )
}
