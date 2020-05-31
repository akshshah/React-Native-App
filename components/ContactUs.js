import React, { Component } from 'react'
import { Card, Button , Icon } from 'react-native-elements';
import { Text,View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

export class ContactUs extends Component {

   sendMail(){
      MailComposer.composeAsync({
         recipients: ['confusion@food.net', '123akshshah@gmail.com'],
         subject: "Enquiry",
         body: 'To whom it may concern: '
      });
   }

   static navigationOptions = {
      title : 'Contact Us'
   };
   render() {
      return (
         <View style={{marginTop: 10}}>
            <Animatable.View animation="fadeInDown" duration={2000} delay={500}>
               <Card title="Contact Information">
                  <Text style={{lineHeight:30}}>
                     121, Clear Water Bay Road{"\n"}
                     Clear Water Bay, Kowloon{"\n"}
                     HONG KONG{"\n"}
                     Tel: +852 1234 5678{"\n"}
                     Fax: +852 8765 4321{"\n"}
                     Email:confusion@food.net
                  </Text>
                  <Button 
                     title= '  Send Email'
                     buttonStyle = {{backgroundColor: '#512DA8', marginTop:10}}
                     icon={<Icon name = 'envelope-o' type='font-awesome' color='white'/>}
                     onPress = {this.sendMail}
                  />
               </Card>
            </Animatable.View>
         </View>
      )
   }
}



