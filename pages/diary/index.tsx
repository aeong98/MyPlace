import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import {Layout} from '@components/common';
import {Repository} from "@hooks/repository";
import {Mood} from "@shared/constants";
import DiaryCardList from '@components/diary/DiaryCardList';

import classes from './diary.module.scss';

export default function Diary() {
  const [postsList, setPostsList]=useState<any[]>([]);
  useEffect(()=>{
    getPosts()
  },[])

  const getPosts=async()=>{
    const data= await Repository.getUserPosts()
                      .then((res:any)=>{return res.val()})
    const keys=Object.keys(data);
    let dataList:any[]=[];
    keys.map((key, i)=>{
      dataList.push(data[key])
    });

    console.log(dataList[0])
    setPostsList(dataList);
  }


  return (
    <>
    <div className={classes.diary_wrapper}>
      <div className={classes.header}>
        <div className={classes.header_title}>Hi, 튼튼형광색물고기!</div>
        <div className={classes.header_btn}>내 버킷 전체 보기</div>
        <div className={classes.bucket_lists}>
           <div className={classes.bucket} id={"addBucketBtn"}>
            <div className={classes.bucket_thumbnail}>
              <div>+</div>
            </div>
            <div className={classes.bucket_title}>새 버킷 추가</div>
          </div>
          <div className={classes.bucket} id={"addBucketBtn"}>
            <div className={classes.bucket_thumbnail}>
              <div>+</div>
            </div>
            <div className={classes.bucket_title}>새 버킷 추가</div>
          </div>
          <div className={classes.bucket} id={"addBucketBtn"}>
            <div className={classes.bucket_thumbnail}>
              <div>+</div>
            </div>
            <div className={classes.bucket_title}>새 버킷 추가</div>
          </div>
          <div className={classes.bucket} id={"addBucketBtn"}>
            <div className={classes.bucket_thumbnail}>
              <div>+</div>
            </div>
            <div className={classes.bucket_title}>새 버킷 추가</div>
          </div>
          <div className={classes.bucket} id={"addBucketBtn"}>
            <div className={classes.bucket_thumbnail}>
              <div>+</div>
            </div>
            <div className={classes.bucket_title}>새 버킷 추가</div>
          </div>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.body_header}>
          <div className={classes.body_title}>
              <div className={classes.main}>내 위시템 전체 보기</div>
              <div className={classes.sub}>총 1개의 위시템</div>
          </div>
          <div className={classes.edit_btn}>편집</div>  
        </div>
        <DiaryCardList diaryLists={postsList}/>
      </div>
      </div>
    </>
  )
}
