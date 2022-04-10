import React, {useState,useCallback, useEffect} from 'react'
import classes from './common.module.scss';

interface InputProps{
    value:string;
    label?:string;
    type:string;
    name:string;
    id:string;
    height?:string;
    placeholder:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void;
}


export default function Input({value, label, type, name, id, height, placeholder, onChange}:InputProps) {
    const [inputType, setInputType]=useState("default");

    const handleFocus=useCallback(()=>{
        setInputType("focused");
    },[inputType]);

    const handleBlur=useCallback(()=>{
        if(value.length ==0){
            setInputType("default");
        }else{
            setInputType("active");
        }
    },[value,inputType]);

    useEffect(()=>{
        console.log(value);
        value.length > 0  
        ? setInputType("focused")
        : setInputType("default");
    },[value])
  
    if(type==="textarea"){
        return(
            <div className={classes.input_group}>
            <label 
            className={classes.label} 
            htmlFor={name}
            style={{color: inputType=="default" ? "transparent": "rgba(24, 14, 37, 1)"}}
            >{label}</label>
            <textarea
                className={classes[inputType]}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                onFocus={()=>handleFocus()}
                onBlur={()=>handleBlur()}
                value={value}
            >
            </textarea>
        </div>)
    }
    return (
    <div className={classes.input_group}>
        <label 
            className={classes.label} 
            htmlFor={name}
            style={{color: inputType=="default" ? "transparent": "rgba(24, 14, 37, 1)"}}
        >{label}</label>
        <input
            className={classes[inputType]}
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={()=>handleFocus()}
            onBlur={()=>handleBlur()}
            value={value}
        >
        </input>
    </div>
  )
}
