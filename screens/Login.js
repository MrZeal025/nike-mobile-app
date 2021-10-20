import React, { useState } from 'react'
// components
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { loginValidationSchema } from "../validations/auth";
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
    TextLinkContent,
    ErrorMessageBox
} from '../components/style';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
// icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons"
// apis
import { userSignIn } from '../apis/authentication';

// deconstruction section
const { darkLight, brand, primary } = Colors;

const Login = ({ navigation }) => {
    
    // behaviors
    const [hidePassword, setHidePassword] = useState(true);

    // message displays
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState("");

    // handle display messages for error and success
    const handleMessage = (message, type) => {
        setMessage(message)
        setMessageType(type)
    }

    // this will run the sign up api
    const handleSignIn = async (values, setSubmitting) => {
        handleMessage(null, '')
        // if the password matches try to signup the user
        try {
            delete values.confirmPassword
            const { data } =  await userSignIn(values)   
            // if the sign up is successful navigate the user to the welcome page
            navigation.navigate('Welcome', {...data.data})
            setSubmitting(false)
        } 
        catch (error) {
            setSubmitting(false);
            handleMessage(error.response.data.message, "Error")
        }
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style='dark'/>
                <InnerContainer>
                    <PageLogo 
                        resizeMode = "contain"
                        source={require('./../assets/nike-logo.png')} 
                    />
                    <PageTitle>Nike Shoes</PageTitle>
                    <SubTitle>Account Sign-in</SubTitle>
                    <Formik 
                        initialValues={{ email: "", password: ""}}
                        onSubmit={(values, {setSubmitting}) => {
                            handleSignIn(values, setSubmitting)
                        }}
                        validationSchema={loginValidationSchema}
                    >
                        {/* this if the function to handle the form interaction */}
                        {
                            ({ errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, values}) => (
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
                                    { errors.email && touched.email && <ErrorMessageBox>{errors.email}</ErrorMessageBox> }
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
                                    { errors.password && touched.password && <ErrorMessageBox>{errors.password}</ErrorMessageBox> }
                                    {
                                        message && <MessageBox type={messageType}>{message}</MessageBox>
                                    }
                                    {
                                        !isSubmitting && <StyledButton  onPress={handleSubmit}>
                                            <ButtonText>
                                                Sign In
                                            </ButtonText>
                                        </StyledButton>
                                    }
                                    {/* perform this if the action is submitting something to the api  */}
                                    {
                                        isSubmitting && <StyledButton disabled={true}>
                                            <ActivityIndicator size="large" color={primary} />
                                        </StyledButton>
                                    }
                                    <Line/>
                                    <StyledButton google={true} onPress={handleSubmit}>
                                        <Fontisto name="google" color={primary} size={25}/>
                                        <ButtonText google={true}>
                                            Sign in with Google
                                        </ButtonText>
                                    </StyledButton>
                                    <ExtraView>
                                        <ExtraText>Don't have an account already? </ExtraText>
                                    <TextLink onPress={() => navigation.navigate("Sign Up")}>
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
        </KeyboardAvoidingWrapper>
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