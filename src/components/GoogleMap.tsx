import { useEffect } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import WikipediaApi from '../services/api/wikipedia';

const poznanPosition: Coords = {
  lat: 52.4006164,
  lng: 16.6214907,
};

const defaultZoom = 10;

export function GoogleMap() {
  useEffect(() => {
    const getArticles = async () => {
      const articles = await WikipediaApi.getArticles({
        coord: poznanPosition,
      });
      console.log(articles.query);
    };
    getArticles();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_API_KEY as string,
        }}
        defaultCenter={poznanPosition}
        defaultZoom={defaultZoom}
      ></GoogleMapReact>
    </div>
  );
}
