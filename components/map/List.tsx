import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {Place} from './map.types';
import * as mapActions from '../../store/modules/map';
import classes from './map.module.scss';


interface ListProps{
    place:Place,
    i:number
}

export default function List({place,i}:ListProps) {
  const [placeInfo, setPlaceInfo]=useState<Place>()

  const dispatch = useDispatch();

  useEffect(()=>{
    setPlaceInfo(place);
  },[place])

  const onClick=(e:React.MouseEvent<HTMLDivElement>)=>{
    if(placeInfo){
      dispatch(mapActions.SEARCH(placeInfo));
    }
  }
    return (
    <div key={i} style={{ marginTop: '20px' }} onClick={onClick} className={classes.list_wrapper}>
        <span className={classes.list_number}>{i + 1}</span>
        <div className={classes.list_header}>
          <h5 className={classes.list_name}>{place.place_name}</h5>
          <div className={classes.list_body}>
            {place.road_address_name ? (
              <div>
                <span>{place.road_address_name}</span>
                <span>{place.address_name}</span>
              </div>
            ) : (
              <span>{place.address_name}</span>
            )}
          </div>
          <span className={classes.phone_number}>{place.phone}</span>
        </div>
      </div>
  )
}
