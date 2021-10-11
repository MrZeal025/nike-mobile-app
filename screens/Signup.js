import React, { useState } from 'react'
// components
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
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
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from '../components/style';
// icons
import { Octicons, Ionicons } from "@expo/vector-icons"

// deconstruction section
const { darkLight, brand } = Colors;

const SignUp = () => {

    const [hidePassword, setHidePassword] = useState(true);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    // actual date of birth
    const [dateOfBirth, setDateofBirth] = useState('');

    const onChangeDatePicker = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        setShowDateTimePicker(false);
        setDate(currentDate);
        setDateofBirth(currentDate);
    }

    const showDatePicker = () => {
        setShowDateTimePicker(true);
    }

    return (
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
                    initialValues={{ fullName: "", email: "", dataOfBirth: "", password: "", confirmPassword: "" }}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {/* this if the function to handle the form interaction */}
                    {
                        ({handleChange, handleBlur, handleSubmit, values}) => (
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
                                    label="Date of Birth" 
                                    icon="calendar" 
                                    placeholder="YYYY - MM - DD" 
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('dateOfBirth')}
                                    onBlur={handleBlur('dateOfBirth')}
                                    value={dateOfBirth ? dateOfBirth.toDateString(): ''}
                                    isDate={true}
                                    editable={false}
                                    showDatePicker={showDatePicker}
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
                                <MessageBox>...</MessageBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Sign Up
                                    </ButtonText>
                                </StyledButton>
                                <Line/>
                                <ExtraView>
                                    <ExtraText>Already have an account? </ExtraText>
                                   <TextLink>
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