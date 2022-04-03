import React, {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../components/common/Layout';
import classes from './mapPage.module.scss';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import * as mapActions from '../../store/modules/map';

const MapContainerWithNoSSR=dynamic(
    ()=>import('../../components/map/MapContainer'),
    {ssr: false}
)
export default function MapPage() {
    const [check, setCheck]=useState(false);
    const [searchKeyword, setSearchKeyword]=useState('');
    const [place, setPlace]=useState('');
    const dispatch=useDispatch();
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

    return(
        <div>
            <Layout>
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
            </Layout>
        </div>
    )
}
