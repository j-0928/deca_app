import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './pages/Home';
import Create from './pages/Create';

const homeName = 'Home';
const createName = 'Create';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (rn === createName) {
                        iconName = focused ? 'list' : 'list-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}>
                 
                 <Tab.Screen name={homeName} component={Home}/>
                 <Tab.Screen name={createName} component={Create}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
}