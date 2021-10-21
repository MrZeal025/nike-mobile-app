import React from 'react';

// React Navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// componets
import SignUp from "../screens/Signup";
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';

// color scheme
import { Colors } from '../components/style';

const Stack = createNativeStackNavigator();
const { primary, tertiary } = Colors;

// credential context
import { CredentialsContext } from './../components/CredentialsContext';

const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({storedCredentials}) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: 'transparent'
                            },
                            headerTintColor: tertiary,
                            headerTransparent: true,
                            headerTitle: '',
                        }}
                        initialRouteName='Login'
                    >
                        { 
                            storedCredentials 
                            ? 
                                <Stack.Screen options={{ headerTintColor: primary, headerShadowVisible: false }} name="Welcome" component={Welcome} /> 
                            :
                            <>
                               <Stack.Screen options={{ headerTintColor: primary, headerShadowVisible: false }} name="Login" component={Login} />
                                <Stack.Screen options={{ headerShadowVisible: false}} name="Sign Up" component={SignUp} />
                            </>
                        }
                        
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    )
}

export default RootStack;