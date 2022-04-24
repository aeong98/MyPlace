import React from 'react'
import classes from './diary.module.scss';
import {Mood} from '@shared/constants';
import DiaryCard from './DiaryCard';

interface DiaryCardListProps{
    diaryLists: any[]
}
export default function DiaryCardList({diaryLists}:DiaryCardListProps) {
  return (
    <div className={classes.diary_lists}>
            <div className={classes.diary_month}>
                <div className={classes.diary_date}>2022년 3월</div>
                <div className={classes.diary_grid}>
                    <DiaryCard diary={diaryLists[0]}></DiaryCard>
                    <DiaryCard diary={diaryLists[0]}></DiaryCard>
                    <DiaryCard diary={diaryLists[0]}></DiaryCard>
                </div>
            </div>
    </div>
  )
}
