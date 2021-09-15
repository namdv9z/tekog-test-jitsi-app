import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import { config } from '../../utils/config';

export const JitsiCall = () => {
  const [showJitsi, setShowJitsi] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const room = route.params.room;
  const userInfo = route.params.userInfo;

  useEffect(() => {
    const url = `${config.jitsiUrl}/${room}`;
    // fix black screen on android
    setShowJitsi(false);
    setTimeout(() => {
      setShowJitsi(true);
    }, 500);

    setTimeout(() => {
      JitsiMeet.audioCall(url, userInfo);
    }, 1000);
  }, [userInfo, room]);

  useEffect(() => {
    return () => {
      JitsiMeet.endCall();
    };
  });

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log('onConferenceTerminated');
    navigation.navigate('ConvoList');
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log('onConferenceJoined');
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log('onConferenceWillJoin');
  }

  return (
    <>
      {showJitsi && (
        <JitsiMeetView
          onConferenceWillJoin={onConferenceWillJoin}
          onConferenceTerminated={onConferenceTerminated}
          onConferenceJoined={onConferenceJoined}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            backgroundColor: 'black',
          }}
        />
      )}
    </>
  );
};
