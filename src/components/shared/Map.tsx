import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
    GoogleMapProps,
} from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';

type MapProps = GoogleMapProps;

export interface CoordsProps {
    lat: number;
    lng: number;
}

const Map = (props: MapProps) => {
    const [coords, setCoords] = useState<CoordsProps>();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
        libraries: ['places'],
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCoords({
                    lat: latitude,
                    lng: longitude,
                });
            });
        }
    }, []);

    const mapRef = useRef<google.maps.Map | null>(null);

    const onLoad = (map: google.maps.Map): void => {
        mapRef.current = map;
    };

    const unMount = (): void => {
        mapRef.current = null;
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <GoogleMap
            center={coords}
            zoom={15}
            mapContainerClassName="w-full h-[400px]"
            onLoad={onLoad}
            onUnmount={unMount}
            {...props}
        >
            {coords && <MarkerF position={coords} />}
        </GoogleMap>
    );
};

export default Map;
