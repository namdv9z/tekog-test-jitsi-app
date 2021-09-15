import { useNavigation } from '@react-navigation/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, Input } from 'native-base';
import Pushy from 'pushy-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNCallKeep from 'react-native-callkeep';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState();
  // const [voipToken, setVoipToken] = useState('');
  const { voipToken } = useStoreState(state => state.userInfor);
  const setToken = useStoreActions(actions => actions.userInfor.setToken);
  const login = useStoreActions(actions => actions.userInfor.login);

  const inited = useRef(false);

  useEffect(() => {
    RNCallKeep.addEventListener('answerCall', () => {
      RNCallKeep.backToForeground();
      navigation.navigate('Call', { username, room: 'Test' });
      RNCallKeep.endAllCalls();
    });
    return () => {
      RNCallKeep.removeEventListener('answerCall');
    };
  }, [navigation, username]);

  useEffect(() => {
    if (!inited.current) {
      Pushy.register()
        .then(async deviceToken => {
          // Display an alert with device token
          console.log('Pushy device token: ' + deviceToken);
          // Succeeded, optionally do something to alert the user
          setToken(deviceToken);
        })
        .catch(err => {
          // Handle registration errors
          console.error(err);
        });
    }
  }, [setToken]);

  const handleLogin = useCallback(async () => {
    await login({ username, voipToken });
    navigation.navigate('ConvoList');
  }, [username, voipToken, login, navigation]);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Input
        placeholder="Username"
        variant="underlined"
        style={{ marginTop: 20, width: '80%' }}
        _light={{
          placeholderTextColor: 'blueGray.400',
        }}
        _dark={{
          placeholderTextColor: 'blueGray.50',
        }}
        onChangeText={value => {
          setUsername(value);
        }}
        value={username}
      />
      <Button
        disabled={!voipToken}
        borderRadius={45}
        colorScheme="purple"
        style={{ marginTop: 20, width: '40%' }}
        onPress={handleLogin}>
        <Text style={{ color: '#fff' }}>
          {!voipToken ? 'Registering token...' : 'Login'}
        </Text>
      </Button>
    </View>
  );
};

export default LoginScreen;
