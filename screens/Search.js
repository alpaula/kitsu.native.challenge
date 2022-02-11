// Libs
import { Dimensions, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import styled from 'styled-components/native';

// Images
import backIcon from '../assets/back-icon.png';
import searchIcon from '../assets/search-white.png';
import loaderIcon from '../assets/loader-icon.gif';

// Styles
const Container = styled.View`
	flex: 1;
	align-items: center;
	background-color: #000;
`;

const Header = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 54px 16px 24px;
`;

const BackButton = styled.TouchableOpacity`
	position: absolute;
	top: 48px;
	left: 12px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 40px;
	width: 40px;
`;

const BackIcon = styled.Image`
	width: 24px;
	height: 24px;
	margin-right: 4px;
`;

const SearchTitle = styled.Text`
	color: #fff;
	font-size: 18px;
	font-weight: bold;
`;

const SearchBox = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: ${Dimensions.get('window').width - 48}px;
	padding: 6px;
	border-bottom-color: #fff;
	border-bottom-width: 1px;
`;

const SearchInput = styled.TextInput`
	flex: 1;
	font-size: 16px;
	color: #fff;
`;

const SearchButton = styled.TouchableOpacity`
	width: 32px;
	height: 32px;
`;

const SearchIcon = styled.Image`
	width: 32px;
	height: 32px;
`;

const AnimeItemButton = styled.TouchableWithoutFeedback``;

const AnimeItem = styled.View`
	align-items: center;
	justify-content: flex-start;
	width: 48%;
	margin-bottom: 24px;
`;

const ImageBox = styled.View`
	width: 100%;
	height: 250px;
`;

const AnimeImage = styled.Image`
	flex: 1;
	margin-bottom: 4px;
	border-radius: 12px;
`;

const AnimeName = styled.Text`
	color: #fff;
	text-align: center;
`;

const LoaderBox = styled.View`
	align-items: center;
	margin: auto;
`;

const LoaderImage = styled.Image`
	width: 160px;
	height: 120px;
`;

const EmptyText = styled.Text`
	margin: auto;
	font-size: 20px;
	font-style: italic;
	color: #fff;
`;

const Search = ({
	navigation,
	setSelectedAnime
}) => {
	const [inputValue, setInputValue] = useState('');
	const [animesList, setAnimesList] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [isEmpty, setEmpty] = useState(false);

	const getAnimes = async () => {
		try {
			setLoading(true);
			setEmpty(false);

			const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${inputValue}`);
			const json = await response.json();

			if (json.data.length === 0) {
				setEmpty(true);
				setTimeout(() => {
					setLoading(false);
				}, 1000);

				return;
			}

			const animes = json.data.map(anime => ({
				id: anime.id,
				title: anime.attributes.canonicalTitle,
				synopsis: anime.attributes.synopsis,
				posterImage: anime.attributes.posterImage?.small,
				coverImage: anime.attributes.coverImage?.small,
				videoId: anime.attributes.youtubeVideoId
			}));

			setAnimesList(animes);

			setTimeout(() => {
				setLoading(false);
			}, 1000);
		} catch (err) {
			console.log('err: ', err);
		}
	};

	const renderLoader = () => (
		<LoaderBox>
			<LoaderImage source={{ uri: 'https://media.giphy.com/media/3y0oCOkdKKRi0/giphy.gif' }} />
		</LoaderBox>
	);

	const renderEmpty = () => <EmptyText>No anime found</EmptyText>;

	const renderItem = ({ item }) => {
		const handleItem = () => {
			setSelectedAnime(item);
			navigation.navigate('Anime')
		};

		return (
			<AnimeItemButton
				onPress={handleItem}
			>
				<AnimeItem>
					<ImageBox>
						<AnimeImage source={{ uri: item.posterImage }} />
					</ImageBox>
					<AnimeName>
						{item.title}
					</AnimeName>
				</AnimeItem>
			</AnimeItemButton>
		);
	}

	const renderList = () => (
		<FlatList
			data={animesList}
			keyExtractor={item => item.id}
			renderItem={renderItem}
			numColumns={2}
			columnWrapperStyle={{ justifyContent: 'space-between' }}
			style={{ width: '100%' }}
			contentContainerStyle={{ padding: 24 }}
		/>
	);

	const renderContent = () => {
		if (isLoading) return renderLoader();

		if (isEmpty) return renderEmpty();

		if (animesList.length > 0) return renderList();

		return null;
	}

	return (
		<Container>
			<StatusBar hidden />
			<Header>
				<BackButton
					onPress={() => navigation.navigate('Home')}
				>
					<BackIcon source={backIcon} />
				</BackButton>
				<SearchTitle>Search</SearchTitle>
			</Header>
			<SearchBox>
				<SearchInput
					onChangeText={setInputValue}
					value={inputValue}
					placeholder="type your anime"
					placeholderTextColor='#dcdcdcaa'
				/>
				<SearchButton
					onPress={getAnimes}
					disabled={isLoading}
				>
					<SearchIcon
						source={searchIcon}
					/>
				</SearchButton>
			</SearchBox>
			{renderContent()}
		</Container>
	);
}

export default Search;
