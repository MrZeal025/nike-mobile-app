import React, { useContext } from 'react'
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

// storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// credential context
import { CredentialsContext } from './../components/CredentialsContext';

const Welcome = () => {
    
    const AvatarImg = photoUrl ? { uri: photoUrl } : require('./../assets/ako.jpg')
   
    // context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { fullName, email, dateOfBirth, photoUrl, givenName } = storedCredentials;

    const clearLogin = async () => {
        try {
            await AsyncStorage.removeItem('nikeshoesSampleCredentials');
            setStoredCredentials(null);
        } catch (error) {
            console.log(error);
        }
    }

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
                        <StyledButton onPress={clearLogin}>
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