import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from '../screens/homePage/homePage';
import DetailUsers from '../screens/detailUsers/detailUsers';
import AdjustmentForm from '../screens/adjusment/adjustment';
import HistoryAttendance from '../screens/historyAttendance/historyAttendance';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="HomePage"
          component={HomePage}
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
          name="HistoryAttendance"
          component={HistoryAttendance}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
