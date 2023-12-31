import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import back from '../assets/icon/back.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function NewBack({pageTitle, goBack, icon}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={goBack}>
        <Image source={back} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.tittle}>{pageTitle}</Text>
      <Image source={icon} style={styles.iconHeart} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    width: 20.87,
    height: 20.87,
  },
  tittle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontWeight: '600',
    lineHeight: 24,
    color: '#171621',
  },
  iconHeart: {
    width: 24,
    height: 24,
  },
});
