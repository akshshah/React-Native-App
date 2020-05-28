import React, { Component } from 'react';
import {Text, View, ScrollView, FlatList, StyleSheet, Button,Modal, Alert, PanResponder} from 'react-native';
import { Card, Icon, Rating, Input  } from 'react-native-elements';
import { connect} from 'react-redux';
import { baseUrl} from '../shared/baseUrl';
import { postFavourite } from '../redux/ActionCreators';
import {postComment} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
   return{
      dishes: state.dishes,
      comments: state.comments,
      favourites: state.favourites
   }
}

const mapDispatchToProps = (dispatch) => ({
   postFavourite: (dishId) => dispatch(postFavourite(dishId)),
   postComment: (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment))
});


function RenderDish(props){
   const dish = props.dish;

   handleViewRef = ref => this.view = ref;

   const recognizeFavourite = ({moveX, moveY, dx, dy}) => {
      if(dx < -200){
         return true;
      }
      else{
         return false;
      }
   };

   const recognizeComment = ({moveX, moveY, dx, dy}) => {
      if(dx > 200){
         return true;
      }
      else{
         return false;
      }
   };

   const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
         return true;
      },
      onPanResponderGrant: () => {
         this.view.bounce(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
      },
      onPanResponderEnd: (e, gestureState) => {
         if (recognizeFavourite(gestureState)){
            Alert.alert(
               'Add to Favourites ?',
               'Are you sure you want to add ' + dish.name + ' to your favourites ?',
               [
                  {
                     text: 'Cancel',
                     onPress: () => console.log(' Cancel pressed'),
                     style: "cancel"
                  },
                  {
                     text: 'Yes',
                     onPress: () => props.favourite ? console.log('Already favourite') :  props.onPress()
                  }
               ],
               {cancelable: false}
            )
            return true;
         }
         else if( recognizeComment(gestureState)){
            props.toggleModal();
            return true;
         }     
      }
   });

   if(dish != null){
      return(
         <Animatable.View animation="fadeInDown" duration={2000} delay={1000} 
            ref={this.handleViewRef} {...panResponder.panHandlers}>
            <Card
               featuredTitle={dish.name}
               image={{uri: baseUrl + dish.image}}>
               <Text style={{margin:10}}>
                  {dish.description}
               </Text>
               <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                  <Icon
                     style={{alignItems: 'center'}} 
                     raised
                     reverse
                     name={props.favourite ? 'heart' : 'heart-o'}
                     type='font-awesome'
                     color='#f50'
                     onPress={() => props.favourite ? console.log('Already favourite') : props.onPress()}
                  />
                  <Icon
                     style={{alignItems: 'center'}} 
                     raised
                     reverse
                     name='pencil'
                     type='font-awesome'
                     color='#512DA8'
                     onPress={() => props.toggleModal()}
                  />
               </View>
            </Card>
         </Animatable.View>
      );
   }else{
      return(<View></View>);
   }
};


function RenderComments(props){
   const comments = props.comments;

   const renderCommentItem = ({item, index}) => {
      return(
         <View key={index} style={{margin:10, marginBottom:20 }}>
            <Text style={{fontSize:14, fontWeight:'bold'}}>
               {item.comment}
            </Text>
            <Rating imageSize={20} 
                     readonly
                    showRating={true}
                    startingValue={item.rating}
                    style={styles.rating} />
            <Text style={{fontSize:12}}>{'-- ' + item.author + ', ' + item.date}</Text>
         </View>
      );
   } 

   return(
      <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
         <Card title="Comments">
            <FlatList
               data={comments}
               renderItem={renderCommentItem}
               keyExtractor={item => item.id.toString()}
            />
         </Card>
      </Animatable.View>
   );
}

class NewDishDetail extends Component{

   constructor(props){
      super(props);
      this.state = {
         showModal: false,
         username: '',
         comment: '',
         userRating: 0,
      };

      this.toggleModal = this.toggleModal.bind(this);
   }

   toggleModal() {
      this.setState({ showModal: !this.state.showModal });
   }

   markfavourite(dishId){
      this.props.postFavourite(dishId);
   }

   handleComment(dishId,rating,author,comment){
      //console.log(dishId, rating, author, comment);
      this.props.postComment(dishId,rating,author,comment);
      this.toggleModal();
   }

   static navigationOptions = {
      title: 'Dish Details'
   };

   render(){

      const {dishId} = this.props.route.params;

      return(
         <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]} 
               favourite = {this.props.favourites.some( el => el === dishId)}      
               onPress={() => this.markfavourite(dishId)}
               toggleModal={() => this.toggleModal()}
            />
            <RenderComments 
               comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}
            />
            <Modal 
                  animationType={'slide'}
                  transparent={false}
                  visible={this.state.showModal}
                  onDismiss={() => {this.toggleModal(); }}
                  onRequestClose={() => {this.toggleModal(); }}>

                  <View style={styles.modal}>
                     <Text style={styles.modatlTitle}>Your Feedback</Text>
                     <Rating
                        style={{marginBottom: 20}}
                        type='star'
                        ratingCount={5}
                        defaultRating={0}
                        showRating={true}
                        fractions={1}
                        onFinishRating={(rating) => {this.setState({userRating: rating})}}
                     />
                     <Input
                        placeholder="Author"
                        leftIcon={
                           <Icon
                              style={{marginRight:10}}
                              type='font-awesome'
                              name='user-o'
                              size={24}
                              color='black'/>
                        }
                        onChangeText={ author => this.setState({author})}
                     />
                     <Input
                        style={{marginBottom:10}}
                        placeholder="Comment"
                        leftIcon={
                           <Icon
                              style={{marginRight:10}}
                              type='font-awesome'
                              name='comment-o'
                              size={24}
                              color='black'/>
                        }
                        onChangeText= {comment => this.setState({comment})}
                     />
                     <Button 
                        title= 'Submit'
                        color= '#512DA8'
                        onPress={ () => {this.handleComment(dishId,this.state.userRating,this.state.author,this.state.comment)
                        }}
                     />
                     <View style={{margin:10}}></View>
                     <Button
                        title='Cancel'
                        color='grey'
                        onPress={ () => {this.toggleModal();}}
                     />
                  </View>
            </Modal>
         </ScrollView>
      );
   }

}

const styles = StyleSheet.create({

   modal:{
      justifyContent: 'center',
      margin : 20, 
   },
   modatlTitle:{
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: '#512DA8',
      textAlign: 'center',
      color: 'white',
      marginBottom: 20
   },
   modalText:{
      fontSize: 18,
      margin: 10
   },
   inputText:{
      marginTop:20
   }
});


export default connect(mapStateToProps, mapDispatchToProps)(NewDishDetail);