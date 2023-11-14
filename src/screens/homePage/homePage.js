import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import user from '../../utils/data.json';
import {FlatList} from 'react-native-gesture-handler';

export default function HomePage() {
  // console.log(user);
  return (
    <View style={styles.section}>
      <Text style={styles.listUsers}>List User</Text>
      <FlatList
        data={user?.data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.card} key={index}>
              <View style={styles.username}>
                <Fontisto style={styles.icon} name="user-secret" />
                <View style={styles.text}>
                  <Text>{item.name}</Text>
                  <Text>{item.email}</Text>
                  <Text>{item.phone}</Text>
                </View>
                <Text>button</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    padding: 10,
  },
  listUsers: {
    color: 'black',
    fontSize: 25,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  icon: {
    fontSize: 24,
    color: 'black',
  },
  text: {
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
    height: '100',
  },
  username: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
