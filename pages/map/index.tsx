import React, {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../components/common/Layout';

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
                <form onSubmit={handleSubmit}>
                    <input placeholder="장소 이름을 검색하세요." onChange={onChange} value={searchKeyword}></input>
                    <button type="submit">검색</button>
                </form>
                <MapContainerWithNoSSR searchPlace={place}></MapContainerWithNoSSR>
            </Layout>
        </div>
    )
}
