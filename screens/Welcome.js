import React from 'react'
// components
import { StatusBar } from 'expo-status-bar';
// styles
import { 
    InnerContainer, 
    PageTitle, 
    SubTitle, 
    StyledFormArea, 
    StyledButton, 
    ButtonText, 
    Line,
    WelcomeContainer,
    Avatar,
    WelcomeImage
} from '../components/style';

const Welcome = ({ navigation, route }) => {
    const { fullName, email, dateOfBirth, photoUrl, givenName } = route.params;
    const AvatarImg = photoUrl ? { uri: photoUrl } : require('./../assets/ako.jpg')
    return (
        <>
            <StatusBar style='dark'/>
            <InnerContainer>
                <WelcomeContainer>
                    <WelcomeImage 
                        resizeMode = "contain"
                        source={require('./../assets/wl-op-1.jpg')}
                    />
                    <PageTitle welcome={true}>Welcome, { fullName ? fullName : givenName }!</PageTitle>
                    <SubTitle welcome={true}>{email}</SubTitle>
                    <SubTitle welcome={true}>{dateOfBirth}</SubTitle>
                    <Line/>
                    <StyledFormArea>
                        <Avatar 
                            resizeMode = "cover"
                            source={AvatarImg} 
                        />
                        <StyledButton onPress={() =>  navigation.navigate("Login")}>
                            <ButtonText>
                                Logout
                            </ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
}

export default Welcome;