import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Back({pageTitle, back}) {
  return (
    <View style={styles.header}>
      <View style={styles.head}>
        <TouchableOpacity style={styles.back} onPress={back}>
          <Ionicons name="chevron-back" style={styles.iconBack} />
        </TouchableOpacity>
        <Text style={styles.title}>{pageTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    padding: 10,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
  iconBack: {
    fontSize: 20,
    color: 'black',
  },
});
