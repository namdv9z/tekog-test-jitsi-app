import { Button, Center } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  headerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 70,
  },
});
const Header = ({ screenTitle }) => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={{ fontSize: 20 }}>{screenTitle}</Text>
      {/* <Text style={{ alignSelf: 'flex-end' }}>+</Text> */}
      {/* <Center
        position="absolute"
        // rounded="full"
        borderColor="primary.400"
        borderWidth={1}
        borderRadius={50}
        w={10}
        h={10}
        right={5}
        _text={{
          color: 'primary.400',
          textAlign: 'center',
          fontSize: '20',
        }}>
        +
      </Center> */}
      <Button
        position="absolute"
        borderRadius={50}
        borderColor="primary.400"
        borderWidth={1}
        backgroundColor="#fff"
        right={5}
        w={10}
        h={10}
        _text={{
          color: 'primary.400',
          textAlign: 'center',
          fontSize: '20',
          w: 10,
        }}>
        +
      </Button>
    </View>
  );
};

export default Header;
