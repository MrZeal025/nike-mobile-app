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

const RootStack = () => {
    return (
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
                <Stack.Screen options={{ headerTintColor: primary, headerShadowVisible: false }} name="Login" component={Login} />
                <Stack.Screen options={{ headerShadowVisible: false}} name="Sign Up" component={SignUp} />
                <Stack.Screen options={{ headerTintColor: primary, headerShadowVisible: false }} name="Welcome" component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;