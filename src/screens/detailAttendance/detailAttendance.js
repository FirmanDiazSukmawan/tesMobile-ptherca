import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {calculateWorkHours} from '../../utils/calculate';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DetailAttendance({route}) {
  const navigation = useNavigation();
  const {users} = route.params;

  const back = () => {
    navigation.goBack();
  };

  const adjustment = () => {
    navigation.navigate('Adjustment', {users});
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.head}>
          <TouchableOpacity style={styles.back} onPress={back}>
            <Ionicons name="chevron-back" style={styles.iconBack} />
          </TouchableOpacity>
          <Text style={styles.title}> Detail Attendance</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.main}>
            <View style={styles.profile}>
              <View style={styles.fotoProfile}>
                {users?.avatar && (
                  <Image source={users?.avatar} style={styles.avatar} />
                )}
              </View>
              <Text style={styles.textName}>{users?.name}</Text>
              <Text style={styles.profesi}>{users?.profession}</Text>
            </View>
            <View style={styles.work}>
              <View style={styles.date}>
                <Text style={styles.dates}>{users.date}</Text>
              </View>
              <View style={styles.bodyContent}>
                <View style={styles.status}>
                  <Text style={styles.textStatus}>{users.status_presence}</Text>
                </View>
                <View style={styles.clock}>
                  <Text style={styles.workHours}>
                    {users.clock_in} - {users.clock_out}
                  </Text>
                  <Text style={styles.totalWork}>
                    {calculateWorkHours(users?.clock_in, users?.clock_out)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.adjustment} onPress={adjustment}>
                <Text style={styles.textAdjustment}>Adjustment:</Text>
              </TouchableOpacity>
              <View style={styles.reason}>
                <Text style={styles.titleReason}>Reason:</Text>
                <View style={styles.textReason}>
                  <Text style={styles.titleReason}>Text 500</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: '#EFC81A',
    height: '15%',
    paddingBottom: 10,
    padding: 10,
  },
  iconBack: {
    fontSize: 20,
    color: 'black',
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 50,
    position: 'relative',
    justifyContent: 'center',
  },
  fotoProfile: {
    width: 150,
    height: 150,
    backgroundColor: 'gray',
    borderRadius: 75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode: 'stretch',
  },
  back: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    position: 'absolute',
    left: 0,
  },
  profile: {
    display: 'flex',
    flexDirection: 'col',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    height: '89%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    height: '100%',
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: -45,
    padding: 15,
    display: 'flex',
    alignItems: 'center',
  },
  main: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  work: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  bodyContent: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    height: 30,
  },
  status: {width: '50%'},
  clock: {
    width: '50%',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  adjustment: {
    marginTop: 30,
    backgroundColor: '#5E50A1',
    width: 150,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  reason: {
    width: '100%',
    marginTop: 30,
  },
  textAdjustment: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  textName: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profesi: {
    color: '#1F2A36',
    fontSize: 14,
    fontWeight: '400',
  },
  dates: {
    color: '#9EA0A5',
    fontSize: 14,
    fontWeight: '400',
  },
  date: {
    width: '100%',
    alignItems: 'flex-end',
  },
  workHours: {
    color: '#9EA0A5',
    fontSize: 12,
    fontWeight: '400',
  },
  totalWork: {
    color: '#9EA0A5',
    fontSize: 12,
    fontWeight: '400',
  },
  textStatus: {
    color: '#1F2A36',
    fontSize: 16,
    fontWeight: '400',
  },
  title: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
  },
  textReason: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    height: 200,
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  titleReason: {
    color: 'black',
  },
});
