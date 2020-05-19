import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

export const DishDetail = ({route,navigation,props}) => {

   const { dishId } = route.params;

   state = {
      dishes:DISHES
   };
   return(
      <RenderDish dish={this.state.dishes[+dishId]}/>
   );
};

function RenderDish(props){
   const dish = props.dish;

   if(dish != null){
      return(
         <Card
            featuredTitle={dish.name}
            image={require('./images/uthappizza.png')}>
            <Text style={{margin:10}}>
               {dish.description}
            </Text>

         </Card>
      );
   }else{
      return(<View></View>);
   }
};