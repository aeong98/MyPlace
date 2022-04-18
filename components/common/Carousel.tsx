import React, {useState, useRef, useEffect} from 'react';
import classes from './common.module.scss';
import Image from 'next/image';

interface CarouselProps{
    images:string[];
}

export function Carousel({images}: CarouselProps) {
    const [currentSlide, setCurrentSlide]=useState(0);
    const slideRef=useRef<HTMLDivElement>(null);
    const TOTAL= images.length-1;

    const NextSlide = () => {
        if (currentSlide >= TOTAL) {
          // 더 이상 넘어갈 슬라이드가 없으면
          setCurrentSlide(0); // 1번째 사진으로 넘어갑니다.
          // return;  // 클릭이 작동하지 않습니다.
        } else {
          setCurrentSlide(currentSlide + 1);
        }
      };
      // Prev 버튼 클릭 시
      const PrevSlide = () => {
        if (currentSlide === 0) {
          setCurrentSlide(TOTAL); // 마지막 사진으로 넘어갑니다.
          // return;  // 클릭이 작동하지 않습니다.
        } else {
          setCurrentSlide(currentSlide - 1);
        }
      };

      useEffect(() => {
        if(slideRef.current){
            slideRef.current!.style.transition = 'all 0.5s ease-in-out';
            slideRef.current!.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다. 
        }

      }, [currentSlide]);

    return (
        <>
        <div className={classes.carousel_container}>
           
            <div className={classes.carousel_list} ref={slideRef}>
                {images.map((image,idx)=>{
                    return (
                        <div className={classes.img_wrapper}>
                        <img src={image} alt={`${image}-${idx}`} className={classes.img}/>
                        </div>
                    )
                })}
            </div>
                <button onClick={PrevSlide} className={classes.prev_btn}> prev </button>
                <button onClick={NextSlide} className={classes.next_btn}> next </button>
        </div>
        </>
    )
}
