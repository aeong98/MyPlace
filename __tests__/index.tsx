import React from 'react'

import {Layout} from '@components/common';
import {Repository} from "@hooks/repository";

import classes from './diary.module.scss';

export default function Diary() {
  const data = Repository.getUserPosts();
  return (
    <>
      <div className={classes.header}>
        <div className={classes.header_title}>Hi, 튼튼형광색물고기!</div>
        <div className={classes.header_btn}>내 버킷 전체 보기</div>
        <div className={classes.bucket_lists}>
          <div className={classes.bucket} id={"addBucketBtn"}>
            <div>+</div>
            <div>새 버킷 추가</div>
          </div>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.body_header}>
          <div className={classes.body_title}>
              <div>내 위시템 전체 보기</div>
              <div>총 1개의 위시템</div>
          </div>
          <div className={classes.edit_btn}>편집</div>
        </div>
        <div className={classes.diary_lists}>
            <div className={classes.diary_month}>
                <div className={classes.diary_grid}>
                    <div className={classes.diary_card}>
                      <div className={classes.diary_card_thumbnai}></div>
                      <div className={classes.diary_card_title}>사이트에서 가격보기 네이버 지식 IN</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
