import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

export default function DetailUsers() {
  const route = useRoute();
  const data = route.params.item;
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.fotoProfile}>
            <Text>{data?.avatar}</Text>
          </View>

          <Text style={{paddingLeft: 10}}>Button absen</Text>
          <Text style={{paddingLeft: 10}}>Button izin</Text>
        </View>
        <Text>{data?.name}</Text>
        <Text>{data?.phone}</Text>
        <Text>{data?.email}</Text>
        <View style={styles.total}>
          <Text>Total Hadir</Text>
          <Text style={{paddingLeft: 10}}>Total Cuti</Text>
        </View>
      </View>
      <View>
        <View>
          <Text> History Absen</Text>
          <View style={styles.history}>
            <Text> Date</Text>
            <Text> Clock_in</Text>
            <Text> Clock_out</Text>
            <Text> Work Hours</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    padding: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth: 1,
    height: '25%',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  fotoProfile: {
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  history: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
