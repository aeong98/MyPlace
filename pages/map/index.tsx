import React, {useState, useEffect, useCallback} from 'react'
import dynamic from 'next/dynamic'
import classes from './mapPage.module.scss';
import {useRouter} from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import * as mapActions from '@store/modules/map';
import {IconButton,ShortModal, Input , Button} from '@components/common';

import {BsSearch} from 'react-icons/bs';
interface MapType{
    map:{
        data:any;
        map:any;
        status:string;
    }
}

const MapContainerWithNoSSR=dynamic(
    ()=>import('../../components/map/MapContainer'),
    {ssr: false}
)
export default function MapPage() {
    const [check, setCheck]=useState(false);
    const [searchKeyword, setSearchKeyword]=useState('');
    const [place, setPlace]=useState('');

    const [showModal, setShowModal]=useState(false);
    const selectedPlace= useSelector(({map}:MapType)=>map).data;

    const dispatch=useDispatch();
    const router= useRouter();
    const onChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        e.preventDefault();
        setSearchKeyword(e.target.value);
    }

    const handleSubmit=(e:React.SyntheticEvent)=>{
        e.preventDefault();
        setPlace(searchKeyword);
        setSearchKeyword('');

    }

    useEffect(()=>{
        console.log('감지');
        dispatch (mapActions.CLEARMAP());
        setCheck(true)
    },[])

    const onClick=useCallback(()=>{
        setShowModal(true);
    },[showModal]);

    const onClickWriteBtn=()=>{
        router.push('/diary/editor/');
    }   
    // BsSearch
    return(
        <div>
            <div className={classes.search_form_container}>
                <form onSubmit={handleSubmit} className={classes.search_form}>
                    <div className={classes.input_wrapper}>
                    <Input
                        value={searchKeyword}
                        type="default"
                        name="place"
                        id="place"
                        placeholder="장소 이름을 검색하세요"
                        onChange={onChange}
                    ></Input>
                     <button type="submit" style={{backgroundColor: "transparent"}}>
                        <BsSearch className={classes.search_button}/>
                    </button>
                    </div>
                </form>
            </div>    
            {true&&<MapContainerWithNoSSR searchPlace={place}></MapContainerWithNoSSR>}
            <div className={classes.icon_wrapper}>
                <IconButton label={"일기쓰기"} onClick={onClick}></IconButton>
            </div>
            <ShortModal 
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className={classes.description}><span className={classes.bold}>{selectedPlace.place_name}</span><br></br> 이 장소를 기록하시겠습니까?</div>
                <Button 
                    text="기록하러 가기"
                    onClick={onClickWriteBtn}       
                ></Button>
            </ShortModal>
        </div>
    )
}
