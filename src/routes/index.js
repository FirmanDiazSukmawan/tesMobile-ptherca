import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DetailUsers from '../screens/detailUsers/detailUsers';
import AdjustmentForm from '../screens/adjusment/adjustment';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import detailAttendance from '../screens/detailAttendance/detailAttendance';
import Search from '../screens/search/search';
import Home from '../screens/home/Home';
import DetailHomeStay from '../screens/detailHomeStay/detailHomeStay';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  const homeIcon = ({color, size}) => (
    <Feather name="home" color={color} size={size} />
  );
  const searchIcon = ({color, size}) => (
    <Feather name="search" color={color} size={size} />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: homeIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Search',
          tabBarIcon: searchIcon,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="HomePage"
          component={Routes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailUsers"
          component={DetailUsers}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Adjustment"
          component={AdjustmentForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailAttendance"
          component={detailAttendance}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailHomeStay"
          component={DetailHomeStay}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
