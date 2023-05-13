import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from './IconMap';
import 'leaflet';
declare let L: any;
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import Geocoder from 'leaflet-control-geocoder';
import { useMap } from 'react-leaflet';

interface CoordsProps {
    lat: number;
    lng: number;
}

function Map() {
    const [coords, setCoords] = useState<CoordsProps>();

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

    return (
        <>
            {coords && (
                <MapContainer
                    center={[
                        coords?.lat || 10.4640476,
                        coords?.lng || 105.6295345,
                    ]}
                    zoom={15}
                    scrollWheelZoom={false}
                    className="mr-4 h-full w-[60%] cursor-pointer rounded-lg border-[2px] border-gray-50 object-cover"
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker coords={coords} />
                    {/* <LeafletGeocoder /> */}
                    <LeafletRoutingMachine coords={coords} />
                </MapContainer>
            )}
        </>
    );
}

export default Map;

function LocationMarker({ coords }: { coords?: CoordsProps }) {
    return (
        <Marker
            position={[coords?.lat || 10.4640476, coords?.lng || 105.6295345]}
            icon={icon}
        >
            <Popup>Vị trí của tôi</Popup>
        </Marker>
    );
}

function LeafletGeocoder() {
    const map = useMap();
    const GeocoderControl = new Geocoder({
        defaultMarkGeocode: false,
    });
    GeocoderControl.addTo(map);
    GeocoderControl.on('markgeocode', function (e) {
        const lat_lng = e.geocode.center;
        new L.Marker(lat_lng, { icon: icon })
            .addTo(map)
            .bindPopup(e.geocode.name)
            .openPopup();
        map.fitBounds(e.geocode.bbox);
    });
    return null;
}

function LeafletRoutingMachine({ coords }: { coords?: CoordsProps }) {
    const map = useMap();
    useEffect(() => {
        map.on('click', function (e) {
            L.Routing.control({
                waypoints: [
                    L.latLng(coords?.lat, coords?.lng),
                    L.latLng(e.latlng.lat, e.latlng.lng),
                ],
                lineOptions: {
                    styles: [
                        {
                            color: 'red',
                            opacity: 0.7,
                        },
                    ],
                },
                createMarker: function (i: number, waypoint: any, n: number) {
                    const marker = L.marker(waypoint.latLng, {
                        draggable: true,
                        icon: L.icon({
                            iconSize: [25, 41],
                            iconAnchor: [10, 41],
                            popupAnchor: [2, -40],
                            iconUrl:
                                'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
                            shadowUrl:
                                'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
                        }),
                    });
                    return marker;
                },
                routeWhiteDragging: false,
                geocoder: L.Control.Geocoder.nominatim(),
            }).addTo(map);
        });
    }, []);

    return null;
}
