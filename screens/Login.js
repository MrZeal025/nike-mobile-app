import React, { useState } from 'react'
// components
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Formik } from 'formik';
// styles
import { 
    StyledContainer, 
    InnerContainer, 
    PageLogo, 
    PageTitle, 
    SubTitle, 
    StyledFormArea, 
    StyledInputLabel, 
    Colors,
    LeftIcon, 
    RightIcon, 
    StyledButton, 
    ButtonText, 
    StyledTextInput,
    MessageBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from '../components/style';
// icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons"

// deconstruction section
const { darkLight, brand, primary } = Colors;

const Login = () => {

    const [hidePassword, setHidePassword] = useState(true);

    return (
        <StyledContainer>
            <StatusBar style='dark'/>
            <InnerContainer>
                <PageLogo 
                    resizeMode = "contain"
                    source={require('./../assets/nike-logo.png')} 
                />
                <PageTitle>Nike Shoes</PageTitle>
                <SubTitle>Account Login</SubTitle>
                <Formik 
                    initialValues={{ email: "", password: ""}}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {/* this if the function to handle the form interaction */}
                    {
                        ({handleChange, handleBlur, handleSubmit, values}) => (
                            <StyledFormArea>
                                <TextInput 
                                    label="Email Address" 
                                    icon="mail" 
                                    placeholder="sample@gmail.com" 
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <TextInput 
                                    label="Password" 
                                    icon="lock" 
                                    placeholder="* * * * * * * *" 
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MessageBox>...</MessageBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Login
                                    </ButtonText>
                                </StyledButton>
                                <Line/>
                                <StyledButton google={true} onPress={handleSubmit}>
                                    <Fontisto name="google" color={primary} size={25}/>
                                    <ButtonText google={true}>
                                        Sign in with Google
                                    </ButtonText>
                                </StyledButton>
                                <ExtraView>
                                    <ExtraText>Don't have an account already? </ExtraText>
                                   <TextLink>
                                        <TextLinkContent>
                                            Sign Up!
                                        </TextLinkContent>
                                   </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                        )
                    }
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}

// input fields

const TextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props }/>
            {
                isPassword && 
                <RightIcon>
                    <Ionicons onPress={() => setHidePassword(!hidePassword)}
                        size={25} 
                        color={darkLight} 
                        name={hidePassword ? "md-eye-off" : "md-eye"} 
                    />
                </RightIcon>
            }
        </View>
    )
}

export default Login;