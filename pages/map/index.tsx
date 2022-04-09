import React, {useState, useEffect, useCallback} from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../components/common/Layout';
import classes from './mapPage.module.scss';
import {useRouter} from "next/router";
import { useSelector, useDispatch } from 'react-redux';
import * as mapActions from '../../store/modules/map';
import IconButton from '../../components/common/IconButton';
import ShortModal from '../../components/common/modal/ShortModal';
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
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
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

    return(
        <div>
                <div className={classes.search_form_container}>
                    <form onSubmit={handleSubmit} className={classes.search_form}>
                        <input 
                            placeholder="장소 이름을 검색하세요." 
                            onChange={onChange} 
                            value={searchKeyword} 
                            className={classes.search_input}></input>
                        <button type="submit" className={classes.search_button}>검색</button>
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
                    <div>{selectedPlace.place_name}여기서 일기를 작성하기겠습니까?</div>
                    <button onClick={onClickWriteBtn}>일기 쓰기</button>
                </ShortModal>
        </div>
    )
}
