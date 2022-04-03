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
        status:any
    }
}

// TODO : 나중에 밑의 코드 커스텀 훅으로 빼놔야 됨
export default function MapContainer({searchPlace}:MapContainerProps) {
    // 검색결과 배열에 담아줌
    const [Places, setPlaces] = useState<Place[]>([])
    const [markerList, setMarkerList] =useState<any[]>([]);
    const {data:selectedPlace, status:status, map: kakaoMap}=useSelector(({map}:MapType)=>map);
    const dispatch  = useDispatch();

    // DESCRIBE: 검색 후 동작하는 로직(지도와 목록에 검색 결과 띄우기)
    useEffect(()=>{
        console.log('map container');
        // 가장 처음에 kakoMap 객체 초기화 (이후에 중복해서 생기지 않도록 redux 에 객체 저장)
        if(kakaoMap.length===0){
            console.log('엥');
            const container = document.getElementById('myMap')
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            }
            const map = new kakao.maps.Map(container, options)
            dispatch(mapActions.INITIALIZE({map:map}))
        }

        if(searchPlace){
            console.log(searchPlace);
            const ps = new kakao.maps.services.Places()
            ps.keywordSearch(searchPlace, placesSearchCB)
        }
 
        
        // 검색 결과에 따라 마커 생성 및 위치 조정
        function placesSearchCB(data:Place[], status:string, pagination:any) {
            if (status === kakao.maps.services.Status.OK) {
                let bounds = new kakao.maps.LatLngBounds()

                // 마커 지우고, 마커 담는 배열 초기화
                hideMarkers();
                setMarkerList([]);

                // 마커 생성
                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i])
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                }
                
                // 위치 조정
                kakaoMap.setBounds(bounds)
                setPlaces(data)
            }
        }

        function setMarkers(map:any){
            for (var i=0; i <markerList.length; i++){
                markerList[i].setMap(map);
            }
        }
        
        function hideMarkers(){
            setMarkers(null);
        }

    },[searchPlace])


    // DESCRIBE : 검색 결과에서 한가지 클릭했을 때, 발생하는 이벤트 (해당 장소로 zoom-in)
    useEffect(()=>{
        if(status === "click"){
            showOnePlage(selectedPlace);
        }
        function showOnePlage(data:Place){
            console.log('엥');
            let bounds = new kakao.maps.LatLngBounds();

            displayMarker(data);
            bounds.extend(new kakao.maps.LatLng(data.y, data.x))

            kakaoMap.setBounds(bounds);
        }
    },[selectedPlace])


    // DESCRIBE : 마커 생성 함수
    function displayMarker(place:Place) {
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
        let marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(place.y, place.x),
        })

        marker.setMap(kakaoMap);

        setMarkerList(markerList=>[
            ...markerList,
            marker
        ])

        kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
            infowindow.open(kakaoMap, marker)
        })
    }

    return (
        <div>
        <div
            id="myMap"
            style={{
            width: '428px',
            height: '428px',
            }}
        ></div>
            <ListContainer places={Places}></ListContainer>
        </div>
    )
}