import { useEffect } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { Marker } from './Marker';
import { emit } from '../pages/map/mediator';
import { useMapStore } from '../pages/map/store';

const poznanPosition: Coords = {
  lat: 52.4006164,
  lng: 16.6214907,
};

const defaultZoom = 10;

export function GoogleMap() {
  const [{ markers }] = useMapStore();

  useEffect(() => {
    emit('mapLoaded', poznanPosition);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_API_KEY as string,
        }}
        defaultCenter={poznanPosition}
        defaultZoom={defaultZoom}
        onChange={(e) => emit('mapDragged', e.center)}
      >
        {markers.map((marker) => (
          <Marker key={marker.pageid} lat={marker.lat} lng={marker.lng} />
        ))}
      </GoogleMapReact>
    </div>
  );
}
