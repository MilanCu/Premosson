import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import {useEffect, useState} from "react";

export const Map = () => {

    const[lat, setlat] = useState();
    const[lng, setLng] = useState();

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(r => {
            setlat(r.coords.latitude)
            setLng(r.coords.longitude)
        })
    },[])

    //Nemel bych tam davat API, ale udelal jsem to na rychlo :D
    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyAidHy4edSR-C5-IZZV1389WCUNP6mM_p8"})

    if (!isLoaded) {
        return (<div>
            Loading
        </div>)
    }


    const center = {lat: lat, lng: lng}


    return (
        <GoogleMap
            zoom={12}
            center={center}
            mapContainerStyle={{
                width: '400px',
                height: '340px'
            }}
        >
            <Marker position={center}/>
        </GoogleMap>)
}