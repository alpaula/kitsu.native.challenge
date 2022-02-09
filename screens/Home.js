// Libs
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Text, View, Dimensions } from 'react-native';
import styled from 'styled-components/native';

// Styles
const Container = styled(View)`
	flex: 1;
	background-color: #f0f;
	justify-content: center;
	align-items: center;
`;

const AnimeItem = styled.View`
	width: ${Dimensions.get(`window`).width * .9}px;
	height: ${Dimensions.get(`window`).height * .75}px;
	margin: ${Dimensions.get(`window`).width * .05}px;
	background-color: #0ff;
	align-items: center;
	justify-content: center;
`;

const Home = () => {
	const [animesList, setAnimesList] = useState([]);

	useEffect(() => {
		getAnimes();
	}, []);

	const getAnimes = async () => {
		try {
			const response = await fetch('https://kitsu.io/api/edge/trending/anime');
			const json = await response.json();

			const animes = json.data.map(anime => ({
				id: anime.id,
				canonicalTitle: anime.attributes.canonicalTitle,
				synopsis: anime.attributes.synopsis,
				posterImage: anime.attributes.posterImage.small,
				coverImage: anime.attributes.coverImage.small,
			}))

			setAnimesList(animes);
		} catch (err) {
			console.log('err: ', err);
		}
	};

	const renderAnime = ({ item }) => {
		return (
			<AnimeItem>
				<Text>{item.canonicalTitle}</Text>
			</AnimeItem>
		);
	}

	return (
		<Container>
			<FlatList
				data={animesList}
				renderItem={renderAnime}
				keyExtractor={item => item.id}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				// bounces={false}
				pagingEnabled={true}
			/>
			{/* <StatusBar style="auto" /> */}
		</Container>
	);
}

export default Home;
