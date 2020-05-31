import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Image, StyleSheet,Text} from 'react-native';
import  NewDishDetail from './NewDishComponent';
import Home from './HomeComponent';
import Reservation from './ReservationComponent';
import FavouritesComponent from './FavouritesComponent';
import LoginComponent from './LoginComponent';
import {createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView} from '@react-navigation/drawer';
import {ContactUs} from './ContactUs';
import  AboutUs  from './AboutUs';
import { Icon } from 'react-native-elements';
import { connect} from 'react-redux';
import {fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';


const mapStateToProps = state => {
   return{
   }
}

const mapDispatchToProps = dispatch => ({
   fetchDishes: () => dispatch(fetchDishes()),
   fetchPromos: () => dispatch(fetchPromos()),
   fetchComments: () => dispatch(fetchComments()),
   fetchLeaders: () => dispatch(fetchLeaders()),
});

const MenuNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();
const HomeNavigator = createStackNavigator();
const AboutUsNavigator = createStackNavigator();
const ContactUsNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();
const FavouriteNavigator = createStackNavigator();
const LoginNavigator = createStackNavigator();


const HeaderLeft = () => {
   const navigation = useNavigation();
   return (
     <View style={{flexDirection:'row', marginLeft:5}}>
        <Icon name='menu' size={30} color='white' 
            onPress={() => navigation.toggleDrawer()}/>
     </View>
   );
 }

function CustomDrawerContentComponent(props){
   return(
      <DrawerContentScrollView {...props} style={styles.container}
         forceInset={{top: 'always', horizontal: 'never'}}>
         <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
               <Image source={require('./images/logo.png')}
                     style={styles.drawerImage}/>
            </View>
            <View style={{flex: 2, marginLeft:10}}>
               <Text style={styles.drawerHeaderText}>Fusion Restaurant</Text>
            </View>
         </View>

         <DrawerItemList {...props}/>
      </DrawerContentScrollView>
   );
}

function MenuStack(){

   return (
      <MenuNavigator.Navigator initialRouteName="Menu" 
         screenOptions={{
            headerStyle : {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle:{color: '#fff'},
         }}>
        <MenuNavigator.Screen name="Menu" component={Menu} 
            options={{ 
                  headerLeft: ({}) => <HeaderLeft/>
            }}
         />
        <MenuNavigator.Screen name="NewDishDetail" component={NewDishDetail} options={{title : "DishDetail"}}/> 
      </MenuNavigator.Navigator>
    );
}

function HomeStack(){
   return(
      <HomeNavigator.Navigator
         screenOptions={{
            headerStyle : {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle:{color: '#fff'}
         }}>
         <HomeNavigator.Screen name="Home" component={Home} 
            options={{ 
               headerLeft: ({}) => <HeaderLeft/>
         }}
         />
      </HomeNavigator.Navigator>
   );
}

function AboutStack(){
   return(
      <AboutUsNavigator.Navigator
         screenOptions={{
            headerStyle : {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle:{color: '#fff'}
         }}>
         <HomeNavigator.Screen name="About Us" component={AboutUs}
            options={{ 
               headerLeft: ({}) => <HeaderLeft/>
            }}
         /> 
      </AboutUsNavigator.Navigator>
   );
}

function ContactStack(){
   return(
      <ContactUsNavigator.Navigator
         screenOptions={{
            headerStyle : {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle:{color: '#fff'}
         }} >
         <HomeNavigator.Screen name="Contact Us" component={ContactUs} 
            options={{ 
               headerLeft: ({}) => <HeaderLeft/>
            }}
         /> 
      </ContactUsNavigator.Navigator>
   );
}

function ReserveStack(){
   return(
      <ReservationNavigator.Navigator
         screenOptions={{
            headerStyle : {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle:{color: '#fff'}
         }} >
         <HomeNavigator.Screen name="Reserve Table" component={Reservation} 
            options={{ 
               headerLeft: ({}) => <HeaderLeft/>
            }}
         /> 
      </ReservationNavigator.Navigator>
   );
}

function FavouriteStack(){
   return(
      <FavouriteNavigator.Navigator
         screenOptions={{
            headerStyle : {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle:{color: '#fff'}
         }} >
         <HomeNavigator.Screen name="My Favourites" component={FavouritesComponent} 
            options={{ 
               headerLeft: ({}) => <HeaderLeft/>
            }}
         /> 
      </FavouriteNavigator.Navigator>
   );
}

function LoginStack(){
   return(
      <LoginNavigator.Navigator
         screenOptions={{
            headerStyle : {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle:{color: '#fff'}
         }} >
         <HomeNavigator.Screen name="Login" component={LoginComponent} 
            options={{ 
               headerLeft: ({}) => <HeaderLeft/>
            }}
         /> 
      </LoginNavigator.Navigator>
   );
}

function MainDrawer(){
   return(
      <MainNavigator.Navigator drawerStyle={{backgroundColor:'#D1C4E9'}} 
         initialRouteName='Home'
         drawerContent={props => <CustomDrawerContentComponent{...props}/> } >

         <MainNavigator.Screen name="Login" component={LoginStack}
            options={{drawerLabel: 'Login',
               drawerIcon: ({ tintColor }) => (
                  <Icon name='sign-in' type='font-awesome' size={22} color={tintColor}/>
               )
            }}
         />  
         <MainNavigator.Screen name="Home" component={HomeStack} 
            options={{drawerLabel: 'Home',
               drawerIcon: ({ tintColor }) => (
                  <Icon name='home' type='font-awesome' size={24} color={tintColor}/>
               )
            }}
         />
         <MainNavigator.Screen name="Menu" component={MenuStack}
            options={{drawerLabel: 'Menu',
               drawerIcon: ({ tintColor }) => (
                  <Icon name='list' type='font-awesome' size={22} color={tintColor}/>
               )
            }}
         />
         <MainNavigator.Screen name="My Favourites" component={FavouriteStack} 
            options={{drawerLabel: 'My Favourites',
               drawerIcon: ({ tintColor }) => (
                  <Icon name='heart' type='font-awesome' size={22} color={tintColor}/>
               )
            }}
         />
         <MainNavigator.Screen name="Reserve Table" component={ReserveStack} 
            options={{drawerLabel: 'Reserve Table',
               drawerIcon: ({ tintColor }) => (
                  <Icon name='cutlery' type='font-awesome' size={22} color={tintColor}/>
               )
            }}
         />
         <MainNavigator.Screen name="Contact Us" component={ContactStack}
            options={{drawerLabel: 'Contact Us',
               drawerIcon: ({ tintColor }) => (
                  <Icon name='address-card' type='font-awesome' size={22} color={tintColor}/>
               )
            }}
         />
         <MainNavigator.Screen name="About Us" component={AboutStack} 
            options={{drawerLabel: 'About Us',
               drawerIcon: ({ tintColor }) => (
                  <Icon name='info-circle' type='font-awesome' size={24} color={tintColor}/>
               )
            }}
         />
      </MainNavigator.Navigator>
   );
}

const styles = StyleSheet.create({
   container:{
      flex:1
   },
   drawerHeader:{
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
   },
   drawerHeaderText:{
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
   },
   drawerImage:{
      margin: 10,
      width: 80,
      height: 60
   }
})


class Main extends Component{

   componentDidMount(){
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
   }

   render(){
      return(
         <NavigationContainer>
            <MainDrawer></MainDrawer>
         </NavigationContainer>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);