// Libs
import { Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import YoutubePlayer from 'react-native-youtube-iframe';

// Images
import backIcon from '../assets/back-icon.png';

// Styles
const Container = styled.View`
	flex: 1;
	width: ${Dimensions.get('window').width}px;
	height: ${Dimensions.get('window').height}px;
`;

const Header = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 54px 16px 24px;
	background-color: #ec6fe6;
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

const AnimeTitle = styled.Text`
	color: #fff;
	font-size: 18px;
	font-weight: bold;
`;

const Content = styled.ScrollView`
	padding: 0 32px;
	background-color: #FEC7FF;
`;

const Synopsis = styled.Text`
	margin: 40px 0;
	font-size: 18px;
	line-height: 24px;
	text-align: center;
`;

const AnimeDetails = ({
	navigation,
	item,
}) => (
	<Container>
		<StatusBar />
		<Header>
			<BackButton
				onPress={() => navigation.navigate('Home')}
			>
				<BackIcon source={backIcon} />
			</BackButton>
			<AnimeTitle>{item.title}</AnimeTitle>
		</Header>
		<Content>
			<Synopsis>
				{item.synopsis}
			</Synopsis>
			<YoutubePlayer
				height={200}
				play={false}
				videoId={item.videoId}
			/>
		</Content>
	</Container>
);

export default AnimeDetails;
