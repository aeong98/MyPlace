import React, {useState,useCallback, useEffect} from 'react'
import classes from './common.module.scss';

interface InputProps{
    value:string;
    label?:string;
    type:string;
    name:string;
    id:string;
    placeholder:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void;
}

/**
 * 
 * @param value : input 값
 * @param label : input 라벨
 * @param type : input 종류 default | active | focused
 * @param name : input name 
 * @param id : input id
 * @param placeholder : input placeholder
 * @param onChange : onChange 콜백 함수
 * @returns 
 */
export default function Input({value, label, type, name, id, placeholder, onChange}:InputProps) {
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
            {label &&<label 
                        className={classes.label} 
                        htmlFor={name}
                        style={{color: inputType=="default" ? "transparent": "rgba(24, 14, 37, 1)"}}>
                        {label}
                    </label>
            }
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
