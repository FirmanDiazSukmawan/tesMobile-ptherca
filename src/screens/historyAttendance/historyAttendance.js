import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';

export default function HistoryAttendance() {
  const route = useRoute();
  const navigation = useNavigation();
  const data = route.params;
  const fotoProfile = data?.[0].avatar;
  const name = data?.[0].name;
  // console.log(data);
  const back = () => {
    navigation.goBack();
  };

  const adjustment = () => {
    navigation.navigate('Adjustment');
  };
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text onPress={back}>{'<='}Back</Text>
        <View style={styles.profile}>
          <Text style={{paddingRight: 10}}>{name}</Text>
          <View style={styles.avatar}>
            <Text>{fotoProfile}</Text>
          </View>
        </View>
      </View>
      <View style={styles.history}>
        <Text>History Attendance</Text>
        <View style={styles.scroll}>
          <ScrollView>
            {data?.map((item, index) => (
              <View style={styles.content} key={index}>
                <View style={styles.time}>
                  <Text>{item.date}</Text>
                  <Text>
                    {item.clock_in}-{item.clock_out}
                  </Text>
                </View>
                <View style={styles.status}>
                  <Text>{item.status_presence}</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={adjustment}>
                  <MaterialCommunityIcons name="update" style={styles.icon} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
    paddingBottom: 10,
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    height: 40,
  },
  history: {
    flex: 1,
  },
  btn: {
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '6%',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  scroll: {
    height: '98%',
  },
  time: {
    width: '47%',
  },
  status: {
    width: '47%',
  },
});
