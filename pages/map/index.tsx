import React, {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../components/common/Layout';
import classes from './mapPage.module.scss';
const MapContainerWithNoSSR=dynamic(
    ()=>import('../../components/map/MapContainer'),
    {ssr: false}
)
export default function MapPage() {
    const [searchKeyword, setSearchKeyword]=useState('');
    const [place, setPlace]=useState('');

    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setSearchKeyword(e.target.value);
    }

    const handleSubmit=(e:React.SyntheticEvent)=>{
        e.preventDefault();
        setPlace(searchKeyword);
        setSearchKeyword('');

    }
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
                <MapContainerWithNoSSR searchPlace={place}></MapContainerWithNoSSR>
            </Layout>
        </div>
    )
}
