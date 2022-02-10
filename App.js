// Libs
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import Home from './screens/Home';
import AnimeDetails from './screens/AnimeDetails';
import Search from './screens/Search';

const App = () => {
  const [animesList, setAnimesList] = useState([]);
  const [sliderPagination, setSliderPagination] = useState({});
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

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {props => <Home
            {...props}
            animesList={animesList}
            sliderPagination={sliderPagination}
            setSliderPagination={setSliderPagination}
            setSelectedAnime={setSelectedAnime}
          />}
        </Stack.Screen>
        <Stack.Screen
          name="Search"
          options={{ headerShown: false }}
        >
          {props => <Search
            {...props}
          />}
        </Stack.Screen>
        <Stack.Screen
          name="Anime"
          options={{ headerShown: false }}
        >
          {props => <AnimeDetails
            {...props}
            item={selectedAnime}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
