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

const Welcome = ({ navigation }) => {
    return (
        <>
            <StatusBar style='light'/>
            <InnerContainer>
                <WelcomeContainer>
                    <WelcomeImage 
                        resizeMode = "contain"
                        source={require('./../assets/wl-op-1.jpg')}
                    />
                    <PageTitle welcome={true}>Welcome, Ryan!</PageTitle>
                    <SubTitle welcome={true}>ryannograles.025.gtsi@gmail.com</SubTitle>
                    <Line/>
                    <StyledFormArea>
                        <Avatar 
                            resizeMode = "cover"
                            source={require('./../assets/ako.jpg')} 
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