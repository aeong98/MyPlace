import React from 'react'
import {Place} from './map.types';
import List from './List';
import classes from './map.module.scss';

interface ListContainterProps{
    places:Place[],
}

export default function ListContainer({places}:ListContainterProps) {
    return (
        <div id="result-list">
            <div className={classes.list_container}>
                {places.map((item:Place, i:number) => {
                return (<List place={item} i={i} key={`map-list-${i}`}></List>);
                 })}
            </div>
        
        <div id="pagination"></div>
        </div>
    )
}
