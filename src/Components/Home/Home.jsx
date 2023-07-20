import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import HomeItems from '../HomeItems/HomeItems';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTrending(mediaType, usestate) {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=cf4a1f832611fa30173f10337b20dba4`);
      usestate(data.results);
      setLoading(false);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  useEffect(() => {
    getTrending('movie', setMovies);
    getTrending('tv', setSeries);
    getTrending('person', setPeople);
  }, []);

  const TrendingSection = ({ title, subtitle, data }) => (
    <div className="row gy-3 gx-3 py-4">
      <div className="col-md-4 d-flex align-items-center">
        <div>
          <div className="brdr w-25 mb-3"></div>
          <h2 className="h3">
            {title} <br />
            {subtitle}
          </h2>
          <p className="text-muted">{subtitle}</p>
          <div className="brdr w-100 mt-3"></div>
        </div>
      </div>
      {data.slice(0, 15).map(({ id, ...rest }) => (
        <HomeItems key={id} item={rest} />
      ))}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {loading ? (
        <div className="center my-5">
          <div className="circle"></div>
          <span>LOADING....</span>
        </div>
      ) : (
        <>
          <TrendingSection
            title="Trending Movies"
            subtitle="To Watch Now"
            data={movies}
          />
          <TrendingSection
            title="Trending Series"
            subtitle="To Watch Now"
            data={series}
          />
          <TrendingSection
            title="Trending People"
            subtitle="To Watch Now"
            data={people}
          />
        </>
      )}
    </>
  );
}
