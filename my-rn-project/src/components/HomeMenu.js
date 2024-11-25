import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NuevoPost from '../screens/NuevoPost';

const Tab = createBottomTabNavigator();

function HomeMenu() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="NuevoPost" 
        component={NuevoPost}
        options={{ headerShown: true, title: 'Nuevo Post' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default HomeMenu;
