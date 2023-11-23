import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import notification from '../../assets/icon/solar_bell-linear.png';

export default function Home() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.location}>
          <Text style={styles.textCurrentLocation}>Current Location</Text>
          <View style={styles.detailLocation}>
            <Text style={{paddingRight: 4}}>Icon</Text>
            <Text>Serang, Indonesia</Text>
          </View>
        </View>
        <View>
          <Image
            source={notification}
            alt="notification"
            style={{width: 'auto', backgroundColor: 'black'}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailLocation: {
    display: 'flex',
    flexDirection: 'row',
  },
  textCurrentLocation: {
    fontSize: 14,
    fontWeight: '400',
  },
});
