import React, { useState, useContext } from 'react'
// components
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { signUpValidationSchema } from "../validations/auth";
import DateTimePicker from '@react-native-community/datetimepicker';
// styles
import { 
    StyledContainer, 
    InnerContainer, 
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
    ErrorMessageBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from '../components/style';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
// icons
import { Octicons, Ionicons } from "@expo/vector-icons"
// apis
import { userSignUp } from '../apis/authentication';
// storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// credential context
import { CredentialsContext } from './../components/CredentialsContext';


// deconstruction section
const { darkLight, brand, primary } = Colors;

const SignUp = ({ navigation }) => {

    // behaviors
    const [hidePassword, setHidePassword] = useState(true);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

    // actual date of birth
    const [dateOfBirth, setDateofBirth] = useState('');

    // message displays
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState("");

    // context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    const onChangeDatePicker = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        setShowDateTimePicker(false);
        setDate(currentDate);
        setDateofBirth(currentDate);
    }

    const showDatePicker = () => {
        setShowDateTimePicker(true);
    }

    // handle display messages for error and success
    const handleMessage = (message, type) => {
        setMessage(message)
        setMessageType(type)
    }
    
    // this will run the sign up api
    const handleSignUp = async (values, setSubmitting) => {
        handleMessage(null, '')
        if(values.password !== values.confirmPassword) {
            handleMessage("Password doest not match", "Error")
        } 
        else {
            // if the password matches try to signup the user
            try {
                delete values.confirmPassword
               const { data } =  await userSignUp(values)   
                // if the sign up is successful navigate the user to the welcome page
                persistLogin({ ...data.data }, "Sign up successful", "Success")
                setSubmitting(false)
            } 
            catch (error) {
                setSubmitting(false);
                handleMessage(error.response.data.message, "Error")
            }
        }
    }

    const persistLogin = async (credemtials, message, status) => {
        try {
            await AsyncStorage.setItem('nikeshoesSampleCredentials', JSON.stringify(credemtials));
            handleMessage(message, status);
            setStoredCredentials(credemtials)
        } 
        catch (error) {
            console.log(error)
            handleMessage("Persisting sign up failed", 'Error');
        }
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style='dark'/>
                <InnerContainer>
                    <PageTitle>Nike Shoes</PageTitle>
                    <SubTitle>Account Sign Up</SubTitle>
                    {showDateTimePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDatePicker}
                        />
                    )}
                    <Formik 
                        initialValues={{ fullName: "", email: "", dateOfBirth: "", password: "", confirmPassword: "" }}
                        onSubmit={(values, {setSubmitting}) => {
                            const trimmedDateOfBirth = dateOfBirth.toString().split('00:00:00')[0].trim()
                            values = {...values, dateOfBirth: trimmedDateOfBirth }
                            handleSignUp(values, setSubmitting);
                        }}
                        validationSchema={signUpValidationSchema}
                    >
                        {/* this if the function to handle the form interaction */}
                        {
                            ({ errors, touched, handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                                <StyledFormArea>
                                    <TextInput 
                                        label="Full Name" 
                                        icon="person" 
                                        placeholder="Juan Dela Cruz" 
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('fullName')}
                                        onBlur={handleBlur('fullName')}
                                        value={values.fullName}
                                    />
                                    { errors.fullName && touched.fullName && <ErrorMessageBox>{errors.fullName}</ErrorMessageBox> }
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
                                        label="Date of Birth" 
                                        icon="calendar" 
                                        placeholder="Mon Jan 1 2000" 
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('dateOfBirth')}
                                        onBlur={handleBlur('dateOfBirth')}
                                        value={dateOfBirth ? dateOfBirth.toDateString(): ''}
                                        isDate={true}
                                        editable={false}
                                        showDatePicker={showDatePicker}
                                    />
                                    { errors.dateOfBirth && touched.dateOfBirth && <ErrorMessageBox>{errors.dateOfBirth}</ErrorMessageBox> }
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
                                    <TextInput 
                                        label="Confirm Password" 
                                        icon="lock" 
                                        placeholder="* * * * * * * *" 
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />
                                    { errors.confirmPassword && touched.confirmPassword && <ErrorMessageBox>{errors.confirmPassword}</ErrorMessageBox> }
                                    { message &&  <MessageBox type={messageType}>{message}</MessageBox> }
                                    {
                                        !isSubmitting && <StyledButton  onPress={handleSubmit}>
                                            <ButtonText>
                                                Sign Up
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
                                    <ExtraView>
                                        <ExtraText>Already have an account? </ExtraText>
                                        <TextLink onPress={() =>  navigation.navigate("Login")}>
                                            <TextLinkContent>
                                                Sign In!
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

const TextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {
               !isDate &&  <StyledTextInput {...props }/>
            }
            {
                isDate && 
                <TouchableOpacity onPress={showDatePicker}>
                     <StyledTextInput {...props }/>
                </TouchableOpacity>
            }
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

export default SignUp;