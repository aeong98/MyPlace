import React, {useEffect, useState, useRef} from 'react'
import ListContainer from './ListContainer';
import {Place} from './map.types';
import { useSelector, useDispatch } from 'react-redux';
import map from '../../store/modules/map';
import * as mapActions from '../../store/modules/map';
const {kakao} = window;

interface MapContainerProps{
    searchPlace:string
}
interface MapType{
    map:{
        data:Place,
        map:any,
        ps:any
    }
}

export default function MapContainer({searchPlace}:MapContainerProps) {
    // 검색결과 배열에 담아줌
    const [Places, setPlaces] = useState<Place[]>([])
  

    // 사용자가 선택한 장소
    const selectedPlace=useSelector(({map}:MapType)=>map.data);

    // map 중복 렌더링 발생 방지를 위해, map 객체 저장
    const kakaoMap=useSelector(({map}:MapType)=>map.map);

    const dispatch  = useDispatch();


    useEffect(()=>{
        if(kakaoMap.length===0){
            const container = document.getElementById('myMap')
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            }
            const map = new kakao.maps.Map(container, options)
          
            dispatch(mapActions.INITIALIZE({map:map}))
        }

        const ps = new kakao.maps.services.Places()

        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

		ps.keywordSearch(searchPlace, placesSearchCB)
        
        function placesSearchCB(data:Place[], status:string, pagination:any) {
            if (status === kakao.maps.services.Status.OK) {
                let bounds = new kakao.maps.LatLngBounds()

                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i])
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                }

                kakaoMap.setBounds(bounds)
                setPlaces(data)
            }
        }

        function showOnePlage(data:Place){
            let bounds = new kakao.maps.LatLngBounds();

            displayMarker(data);
            bounds.extend(new kakao.maps.LatLng(data.y, data.x))

            kakaoMap.setBounds(bounds);
            setPlaces([data]);
        }


        function displayMarker(place:Place) {
            let marker = new kakao.maps.Marker({
                map: kakaoMap,
                position: new kakao.maps.LatLng(place.y, place.x),
            })

            kakao.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
                infowindow.open(kakaoMap, marker)
            })
        }

    },[searchPlace])


    return (
        <div>
        <div
            id="myMap"
            style={{
            width: '500px',
            height: '500px',
            }}
        ></div>
            <ListContainer places={Places}></ListContainer>
        </div>
    )
}