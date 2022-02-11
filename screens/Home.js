// Libs
import { useEffect, useRef, useState } from 'react';
import { FlatList, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

// Images
import searchIcon from '../assets/search-icon.png';

// Styles
const Container = styled.View`
	flex: 1;
	justify-content: space-between;
	align-items: center;
	padding: ${Dimensions.get('window').width * .15}px ${Dimensions.get('window').width * .025}px;
	padding-bottom: ${Dimensions.get('window').width * .05}px;
`;

const CoverBox = styled.View`
	position: absolute;
	justify-content: center;
	align-items: center;
	width: ${Dimensions.get('window').width}px;
	height: ${Dimensions.get('window').height}px;
`;

const CoverImage = styled.Image`
	flex: 1;
	width: 100%;
`;

const SearchButton = styled.TouchableOpacity`
	width: 32px;
	height: 32px;
	align-self: flex-end;
	justify-content: center;
	align-items: center;
`;

const SearchIcon = styled.Image`
	flex: 1;
	width: 100%;
`;

const AnimeButton = styled.TouchableWithoutFeedback``;

const AnimeItem = styled.View`
	align-items: center;
	justify-content: flex-start;
	width: ${Dimensions.get('window').width * .9}px;
	height: ${Dimensions.get('window').height - 32}px;
	margin: 0 ${Dimensions.get('window').width * .025}px;
	margin-top: 24px;
`;

const ImageBox = styled.View`
	width: 100%;
	height: 75%;
	margin-bottom: 12px;
	border-radius: 16px;
	overflow: hidden;
`;

const AnimeImage = styled.Image`
	flex: 1;
`;

const AnimeName = styled.Text`
	padding: 5px 24px;
	border-radius: 12px;
	background-color: #FF50E5;
	font-size: 20px;
	font-style: italic;
	font-weight: bold;
	color: #fff;
`;

const Home = ({
	navigation,
	setSelectedAnime,
	animesList,
	setSliderPagination,
	sliderPagination
}) => {
	const flatListRef = useRef();

	const handleScroll = (ev) => {
		const scrollX = ev.nativeEvent.contentOffset.x;

		const currentSlider = (scrollX + Dimensions.get('window').width) / Dimensions.get('window').width;

		const item = animesList[Math.round(currentSlider) - 1];

		setSliderPagination(item);
	};

	const renderAnime = ({ item }) => {
		const handleItem = () => {
			setSelectedAnime(item);
			navigation.navigate('Anime')
		};

		return (
			<AnimeButton onPress={handleItem}>
				<AnimeItem>
					<ImageBox>
						<AnimeImage source={{ uri: item.posterImage }} />
					</ImageBox>
					<AnimeName>{item.title}</AnimeName>
				</AnimeItem>
			</AnimeButton>
		);
	}

	if (!sliderPagination) return null;

	return (
		<Container>
			<CoverBox>
				<CoverImage
					source={{ uri: sliderPagination.coverImage }}
					blurRadius={5}
				/>
			</CoverBox>
			<SearchButton
				onPress={() => navigation.navigate('Search')}
				accessibilityLabel="Search button"
			>
				<SearchIcon
					source={searchIcon}
				/>
			</SearchButton>
			<FlatList
				ref={flatListRef}
				data={animesList}
				renderItem={renderAnime}
				keyExtractor={item => item.id}
				horizontal={true}
				onScroll={handleScroll}
				pagingEnabled={true}
				showsHorizontalScrollIndicator={false}
			/>
			<StatusBar />
		</Container>
	);
}

export default Home;
