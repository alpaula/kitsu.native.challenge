// Libs
import { useEffect, useState } from 'react';

// Components
import Home from './screens/Home';
import AnimeDetails from './screens/AnimeDetails';
import Search from './screens/Search';

const App = () => {
  const [animesList, setAnimesList] = useState([]);
  const [sliderPagination, setSliderPagination] = useState({});
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedAnime, setSelectedAnime] = useState(null);

  useEffect(() => {
    getAnimes();
  }, []);

  const getAnimes = async () => {
    try {
      const response = await fetch('https://kitsu.io/api/edge/trending/anime');
      const json = await response.json();

      const animes = json.data.map(anime => ({
        id: anime.id,
        title: anime.attributes.canonicalTitle,
        synopsis: anime.attributes.synopsis,
        posterImage: anime.attributes.posterImage.small,
        coverImage: anime.attributes.coverImage.small,
        videoId: anime.attributes.youtubeVideoId
      }))

      setAnimesList(animes);
      setSliderPagination(animes[0]);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Home
            animesList={animesList}
            sliderPagination={sliderPagination}
            setCurrentScreen={setCurrentScreen}
            setSliderPagination={setSliderPagination}
            setSelectedAnime={setSelectedAnime}
          />
        );
      case 'search':
        return (
          <Search
            setCurrentScreen={setCurrentScreen}
          />
        );
      case 'anime':
        return (
          <AnimeDetails
            item={selectedAnime}
            setCurrentScreen={setCurrentScreen}
          />
        );
      default:
        return (
          <Home
            animesList={animesList}
            sliderPagination={sliderPagination}
            setCurrentScreen={setCurrentScreen}
            setSliderPagination={setSliderPagination}
            setSelectedAnime={setSelectedAnime}
          />
        );
    }
  }

  return renderScreen();
}

export default App;
