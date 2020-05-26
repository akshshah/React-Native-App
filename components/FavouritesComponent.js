import React, { Component } from 'react';
import { View, FlatList , Text, Alert} from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect} from 'react-redux';
import { baseUrl} from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import {deleteFavourite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
   return{
      dishes: state.dishes,
      favourites: state.favourites
   }
}

const mapDispatchToProps = (dispatch) => ({
   deleteFavourite: (dishId) => dispatch(deleteFavourite(dishId))
});


export class FavouritesComponent extends Component {

   static navigationOptions = {
      title: 'My Favourites'
   }

   render() {

      const {navigate} = this.props.navigation;

      const renderMenuItem = ({item,index}) => {

         const rightButton = [
            {
               text: 'Delete',
               type: 'delete',
               onPress: () => {
                  Alert.alert(
                     'Delete Favourite ?',
                     "Are you sure you want to delete the favourite dish " + item.name + " ?",
                     [
                        {
                           text: 'Cancel',
                           onPress : () => console.log(item.name + " Not Deleted"),
                           style: 'cancel'
                        },
                        {
                           text: 'Yes',
                           onPress: () => this.props.deleteFavourite(item.id)
                        }
                     ],
                     {cancelable: false}
                  );
               }
            }
         ];

         return (
            <Swipeout right={rightButton} autoClose={true}>
               <Animatable.View animation="fadeInRightBig" duration={2000}>
                  <ListItem
                     key={index}
                     title={item.name}
                     subtitle={item.description}
                     hideChevron={true}
                     onPress={() => navigate('NewDishDetail',{ dishId: item.id })}
                     leftAvatar={{source: {uri: baseUrl + item.image}}}
                  />
               </Animatable.View>
            </Swipeout>
         );
      }

      if(this.props.dishes.isLoading){
         return(
            <Loading></Loading>
         );
      }
      else if(this.props.dishes.errMsg){
         return(
            <View>
               <Text>{this.props.dishes.errMsg}</Text>
            </View>
         );
      }  
      else{
         return(
           <FlatList
               data={this.props.dishes.dishes.filter(dish => this.props.favourites.some(el => el === dish.id))}
               renderItem={renderMenuItem}
               keyExtractor={item => item.id.toString()}
            />
         );
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesComponent);
