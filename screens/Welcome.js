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
    const { fullName, email, dateOfBirth } = route.params;
    return (
        <>
            <StatusBar style='dark'/>
            <InnerContainer>
                <WelcomeContainer>
                    <WelcomeImage 
                        resizeMode = "cover"
                        source={require('./../assets/wl-op-1.jpg')}
                    />
                    <PageTitle welcome={true}>Welcome, { fullName }</PageTitle>
                    <SubTitle welcome={true}>{email}</SubTitle>
                    <SubTitle welcome={true}>{dateOfBirth}</SubTitle>
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