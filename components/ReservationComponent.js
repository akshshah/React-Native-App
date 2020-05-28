import React, { Component } from 'react';
import {Text, View, ScrollView, StyleSheet, Picker, Switch, Button,Modal, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';


class Reservation extends Component {

   constructor(props){
      super(props);
      this.state = {
         guests: 1,
         nonVeg: false,
         date: new Date(),
         time: new Date(),
         show: false,
         showModal: false,
         mode: "date",
      };
   }

   static navigationOptions = {
      title: 'Reserve Table'
   }

   // toggleModal (){
   //    this.setState({showModal : !this.state.showModal})
   // }

   // handleReservation(){
   //    console.log(JSON.stringify(this.state));
   //    this.toggleModal();
   // }

   resetForm(){
      this.setState({
         guests: 1,
         nonVeg: false,
         date: new Date(),
         time: new Date(),
         show: false,
         // showModal:false,
         mode: "date",
      });
   }

   render() {

      const showDatepicker = () => {
         this.setState({show: true});
      };

      const { date } = this.state;

      return (
         <Animatable.View animation="zoomIn" duration={2000} delay={700}>
            <ScrollView>
               <View style={styles.formRow}>
                  <Text style={styles.formLabel}>Number of Guests</Text>
                  <Picker style={styles.formItem} selectedValue={this.state.guests} 
                           onValueChange={(itemValue,itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' /> 
                  </Picker>
               </View>
               <View style={styles.formRow}>
                  <Text style={styles.formLabel}> Non-Veg </Text>
                  <Switch style={styles.formItem} value={this.state.nonVeg} 
                        trackColor='#512DA8' 
                        onValueChange={(value) => this.setState({nonVeg: value})}>
                  </Switch>
               </View>
               <View style={styles.formRow}>
                  <Text style={styles.formLabel}>Date and Time </Text>
                  <Text style={styles.formItem} onPress= {showDatepicker}>
                     {this.state.date.toDateString()+", "+this.state.time.toTimeString()}
                  </Text>
                  { this.state.show && (
                     <DateTimePicker 
                        value={this.state.date}
                        display='default' 
                        mode= {this.state.mode}
                        minimumDate= {new Date()}
                        timeZoneOffsetInMinutes={0}
                        onChange={ (selected, value) => {
                           if(value !== undefined){
                              this.setState({
                                 show: this.state.mode === 'time' ? false : true,
                                 mode: "time",
                                 date: new Date(selected.nativeEvent.timestamp),
                                 time: new Date(selected.nativeEvent.timestamp),
                              });
                           }else{
                              this.setState({show: false});
                           }  
                        }}  
                     />
                  )}
               </View>
               <View style={styles.formRow}>
                  <Button 
                     title= 'Reserve'
                     color= '#512DA8'
                     onPress = { () => {
                        Alert.alert(
                           'Confirm Reservation Details',
                           'Number of Guests : ' + this.state.guests + '\n' +
                           'Non-Veg? : ' + this.state.nonVeg + '\n' +
                           'Date and Time : ' + this.state.date ,
                           [
                              {
                                 text: 'Cancel',
                                 onPress: () => this.resetForm(),
                                 style: "cancel"
                              },
                              {
                                 text: 'Yes',
                                 onPress: () => this.resetForm()
                              }
                           ], 
                           { cancelable: false}
                        );
                     }}
                     accessibilityLabel='Learn more about this purple button'
                  />
               </View>
               {/* <Modal 
                     animationType={'slide'}
                     transparent={false}
                     visible={this.state.showModal}
                     onDismiss={() => {this.toggleModal(); this.resetForm()}}
                     onRequestClose={() => {this.toggleModal(); this.resetForm()}}>

                     <View style={styles.modal}>
                        <Text style={styles.modatlTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>
                           Number of guests: {this.state.guests}
                        </Text>
                        <Text style={styles.modalText}> 
                           NonVeg: {this.state.nonVeg ? "Yes" : "No" }
                        </Text>
                        <Text style={styles.modalText}> 
                           Date: {this.state.date.toDateString()}
                        </Text>
                        <Text style={styles.modalText}> 
                           Time: {this.state.time.toTimeString()}
                        </Text>
                        <Button 
                           onPress={() => {this.toggleModal(); this.resetForm()}}
                           color='#512DA8'
                           title='Close'/>
                     </View>
               </Modal> */}
            </ScrollView>
         </Animatable.View>   
      );
   }
}

const styles = StyleSheet.create({
   formRow:{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
   },
   formLabel:{
      fontSize: 18,
      flex: 2,
   },
   formItem:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
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
   }
});

export default Reservation;