import React, {useEffect} from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../components/common/Layout';

const MapContainerWithNoSSR=dynamic(
    ()=>import('../../components/map/MapContainer'),
    {ssr: false}
)
export default function MapPage() {
    return(
        <div>
            <Layout>
                <MapContainerWithNoSSR></MapContainerWithNoSSR>
            </Layout>
        </div>
    )
}
