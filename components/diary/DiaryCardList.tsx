import React, { useEffect, useState } from 'react'
import classes from './diary.module.scss';
import {Mood} from '@shared/constants';
import DiaryCard from './DiaryCard';

interface DiaryCardListProps{
    diaryLists: any[]
}
interface dateObjectType{
  [key:string]:any;
}
export default function DiaryCardList({diaryLists}:DiaryCardListProps) {
  const [sortedData, setSortedData]=useState<any>([]);

  useEffect(()=>{
    // 날짜 순으로 정리
    console.log(diaryLists);
    let dateObject:dateObjectType={}
    diaryLists.map((data, i)=>{
      let dateKey=data.date.substring(0,9);
      let keys=Object.keys(dateObject);
      keys.includes(dateKey)
      ? dateObject[dateKey].push(data)
      : dateObject[dateKey]=[data];
    })
    
    setSortedData(dateObject);
  },[diaryLists])

  useEffect(()=>{
    console.log(sortedData);
  },[sortedData])


  return (
    <div className={classes.diary_lists}>
            <div className={classes.diary_month}>
              {sortedData && Object.keys(sortedData).map((key)=>{
                return(
                  <>
                    <div className={classes.diary_date} key={`date-card-${key}`}>{key}</div>
                    <div className={classes.diary_grid}>
                        {sortedData[key].map((data:any,i:number)=>{
                          return <DiaryCard diary={data} key={`diaryCard-${i}`}></DiaryCard>
                        })}
                    </div>
                  </>
                )
              })}
               
            </div>
    </div>
  )
}
