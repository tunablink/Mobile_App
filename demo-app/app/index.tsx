import { View, Text, Image, StyleSheet} from 'react-native';
import Colors from '../services/colors';
import {useNavigation} from 'expo-router';
import { useEffect } from 'react';

  export default function Index() {
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({
        headerShown: false
    })
  }, []);
    return (
      <View
      style={{backgroundColor: Colors.PRIMARY,
        height: '100%',
        alignItems: 'center', 
      }}>
        <Image source={require('../assets/images/icon.png')} 
        style={{alignItems: 'center', width: '50%', height: 200,
                  marginTop: 50,
                  marginBottom: 30

        }}/>
        <Text style={styles.heading}>Welcome to Nopee Shop</Text>
        <View style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          margin: 20,
          borderRadius: 20,
          alignSelf: 'stretch'
        }}>
          <Text
          style={{
            fontFamily: 'appFont',
            fontSize: 20,
            textAlign: 'center'
          }}>Discover thousands of ...</Text>

          <View style={[styles.button, {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3
           }]}>
            <Image source={require('../assets/images/google.jpg')}
            style={{width: 30, height: 30}}/>
            <Text style={{
              fontFamily: 'appFont',
              fontSize: 20,
              textAlign: 'center'
            }}>Sign in with Google</Text>
          </View>

          <View style={[styles.button,{backgroundColor: Colors.PRIMARY, borderColor: Colors.PRIMARY}]}>
            <Text style={{
              fontFamily: 'appFont',
              fontSize: 20,
              textAlign: 'center', 
              color: Colors.WHITE
            }}>Skip</Text>
          </View>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.PRIMARY,
      height: '100%',
      paddingBottom: 2
    },

    heading:{
      fontFamily: 'appFontBold',
      fontSize: 30,
      color: Colors.WHITE
    },

    button: {
      borderWidth: 1,
      borderRadius: 99,
      padding: 10,
      marginTop: 15
    }
  })