import React, { Component } from 'react';
import Menu from './MenuComponent';
import {DishDetail} from './DishDetailComponent';
import Home from './HomeComponent';
import {createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


const MenuNavigator = createStackNavigator();

const MainNavigator = createDrawerNavigator();

const HomeNavigator = createStackNavigator();
   
function MenuStack(){
   return (
      <MenuNavigator.Navigator initialRouteName="Menu">
        <MenuNavigator.Screen name="Menu" component={Menu} options={{title: "Menu"}} />
        <MenuNavigator.Screen name="DishDetail" component={DishDetail} options={{title : "DishDetail"}}/> 
      </MenuNavigator.Navigator>
    );
}

function HomeStack(){
   return(
      <HomeNavigator.Navigator>
         <HomeNavigator.Screen name="Home" component={Home}/>
      </HomeNavigator.Navigator>
   );
}

function MainDrawer(){
   return(
      <MainNavigator.Navigator>
         <MainNavigator.Screen name="Home" component={HomeStack}/>
         <MainNavigator.Screen name="Menu" component={MenuStack}/>
      </MainNavigator.Navigator>
   );
}


export default function Main(){
   return(
      <NavigationContainer>
         <MainDrawer/>
      </NavigationContainer>
   )
}