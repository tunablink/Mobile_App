import { View, Text, Image, StyleSheet, Button, Platform, TouchableOpacity} from 'react-native';
import Colors from '../services/colors';
import {useNavigation, useRouter} from 'expo-router';
import React, {useCallback, useEffect} from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import {useSSO} from '@clerk/clerk-expo';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    if (Platform.OS !== 'android') return
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}




  export default function Index() {
    useWarmUpBrowser()
    const { startSSOFlow } = useSSO()
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
      navigation.setOptions({
        headerShown: false
    })
  }, []);

  const onPress = useCallback(async () => {
    try{
      const {createdSessionId, setActive, signIn, signUp} = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: AuthSession.makeRedirectUri()
      })

      if(createdSessionId) {
        setActive!({session: createdSessionId,
          navigate: async ({session}) =>{
            if (session?.currentTask){
              console.log(session.currentTask)
              router.push('/')
              return;
          }

          router.push('/')
        }
        })
      } else {
        console.log('No session created')
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  },[])
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

          <TouchableOpacity 
          onPress={onPress}
          style={[styles.button, {
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
          </TouchableOpacity>

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