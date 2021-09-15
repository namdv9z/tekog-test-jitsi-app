import { useNavigation } from '@react-navigation/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, Input, ScrollView } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import Header from '../../components/Header';

const styles = StyleSheet.create({
  convosWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  txtInput: { marginTop: 20, width: '80%' },
  btnAction: { marginTop: 5 },
});
const ConvoListScreen = () => {
  const [room, setRoom] = useState();
  const [targetUsername, setTargetUsername] = useState();
  const { username, voipToken } = useStoreState(state => state.userInfor);
  const navigation = useNavigation();
  const call = useStoreActions(actions => actions.userInfor.call);

  const joinHandler = useCallback(
    room => {
      const userInfo = { displayName: username };
      navigation.navigate('Call', { userInfo, room });
    },
    [navigation, username],
  );

  const callHandler = useCallback(() => {
    call({ caller: username, username: targetUsername });
    joinHandler('Test');
  }, [call, targetUsername, username, joinHandler]);
  return (
    <>
      <Header screenTitle="TEKOG" />
      <ScrollView contentContainerStyle={styles.convosWrapper}>
        <Text>@{username}</Text>
        <Text>Token: {voipToken}</Text>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Input
            placeholder="Room name"
            variant="underlined"
            style={styles.txtInput}
            value={room}
            onChangeText={setRoom}
          />
          <Button
            style={styles.btnAction}
            size="sm"
            onPress={() => joinHandler(room)}>
            Join
          </Button>
          <Input
            placeholder="username"
            variant="underlined"
            style={styles.txtInput}
            value={targetUsername}
            onChangeText={setTargetUsername}
          />
          <Button style={styles.btnAction} size="sm" onPress={callHandler}>
            Call
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default ConvoListScreen;
