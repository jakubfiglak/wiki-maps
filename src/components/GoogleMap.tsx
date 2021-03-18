import { useEffect } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import WikipediaApi from '../services/api/wikipedia';
import { emit } from '../pages/map/mediator';

const poznanPosition: Coords = {
  lat: 52.4006164,
  lng: 16.6214907,
};

const defaultZoom = 10;

export function GoogleMap() {
  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await WikipediaApi.getArticles({
        coords: poznanPosition,
      });
    };
    fetchArticles();
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
      ></GoogleMapReact>
    </div>
  );
}
