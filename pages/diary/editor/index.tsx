import React from 'react'
import { useSelector } from 'react-redux';

interface MapType{
    map:{
        data:any;
        map:any;
        status:string;
    }
}

export default function index() { 
    const selectedPlace= useSelector(({map}:MapType)=>map).data;

    return (
        <div>
            <div>여기서 일기를 작성합니다.</div>
            <div>{selectedPlace.place_name}</div>
        </div>
    )
}
