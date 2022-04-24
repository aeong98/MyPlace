import React from 'react'
import classes from './diary.module.scss';
import {Mood} from '@shared/constants';

interface DiaryCardProps{
    diary:any;
}
export default function DiaryCard({diary}:DiaryCardProps) {
  return (

    <div className={classes.diary_card}>
        <div className={classes.diary_card_thumbnail}>
        <div className={classes.image_wapper}>
            {diary && 
            <div>
            <div className={classes.mood}>{Mood[diary.mood]}</div>
            <div className={classes.place_name}>{diary.place.place_name}</div>
            </div>
            }
        </div>
        </div>
    </div>
  )
}
