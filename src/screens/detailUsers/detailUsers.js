import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import attendance from '../../utils/attendance.json';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function DetailUsers() {
  const route = useRoute();
  const data = route.params.item;
  // console.log(data);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigation = useNavigation();
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  const userAttendance = attendance.data.filter(
    item => item.user_id === data.id,
  );
  // console.log(userAttendance);
  const mergedData = userAttendance.map(item => ({
    ...data,
    ...item,
  }));

  function calculateWorkHours(clock_in, clock_out) {
    const clock_inTime = new Date(`2023-11-15T${clock_in}`);
    const clock_outTime = new Date(`2023-11-15T${clock_out}`);

    const timeDiff = clock_outTime - clock_inTime;

    const hours = Math.floor(timeDiff / (60 * 60 * 1000));
    const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));

    let result = '';
    if (hours > 0) {
      result += `${hours} ${hours === 1 ? 'h' : 'h'}`;
    }
    if (minutes > 0) {
      result += ` ${minutes} ${minutes === 1 ? 'minute' : 'm'}`;
    }

    return result.trim();
  }

  useEffect(() => {
    const counts = mergedData?.reduce(
      (total, item) => {
        if (item?.status_presence === 'present') {
          total.presentCount += 1;
        } else {
          total.absentCount += 1;
        }
        return total;
      },
      {presentCount: 0, absentCount: 0},
    );

    setPresentCount(counts.presentCount);
    setAbsentCount(counts.absentCount);
  }, [mergedData]);

  // console.log(absentCount);

  const absens = () => {
    Alert.alert('Attendant Succes');
  };
  const Adjustment = () => {
    Alert.alert('Attendant back Succes');
  };

  const historyAttendance = () => {
    navigation.navigate('HistoryAttendance', mergedData);
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.fotoProfile}>
            <Text>{data?.avatar}</Text>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity style={styles.button} onPress={absens}>
              <Text>Clock_in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={Adjustment}>
              <Text>Clock_out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.name}>{data?.name}</Text>
        <Text style={styles.phone}>{data?.phone}</Text>
        <Text style={styles.email}>{data?.email}</Text>
        <View style={styles.time}>
          <View style={styles.currenTime}>
            <Text>
              {currentTime.toLocaleDateString('id-ID', {
                timeZone: 'Asia/Jakarta',
              })}
            </Text>
            <Text>
              {currentTime.toLocaleTimeString('id-ID', {
                timeZone: 'Asia/Jakarta',
              })}
            </Text>
          </View>
        </View>
        <View style={styles.total}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingRight: 10,
            }}>
            <Text>Total Pressent</Text>
            <Text> {presentCount}</Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text>Total absens</Text>
            <Text> {absentCount}</Text>
          </View>
        </View>
      </View>
      <View>
        <View>
          <View style={styles.body}>
            <Text> History Attendance</Text>
            <TouchableOpacity onPress={historyAttendance}>
              <Text>See More {'=>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scheduleHead}>
            <Text style={styles.colHead}> Date</Text>
            <Text style={styles.colHead}> Clock_in</Text>
            <Text style={styles.colHead}> Clock_out</Text>
            <Text style={styles.colHead}> Work Hours</Text>
          </View>
          <SafeAreaView style={{height: '70%'}}>
            <FlatList
              data={mergedData}
              renderItem={({item, index}) => {
                const absent = item?.status_presence === 'present';
                return (
                  <View style={styles.schedule} key={index}>
                    {!absent ? (
                      <Text style={styles.col}> Absent</Text>
                    ) : (
                      <>
                        <Text style={styles.col}> {item?.date}</Text>
                        <Text style={styles.col}> {item?.clock_in}</Text>
                        <Text style={styles.col}> {item?.clock_out}</Text>
                        <Text style={styles.col}>
                          {calculateWorkHours(item?.clock_in, item?.clock_out)}
                        </Text>
                      </>
                    )}
                  </View>
                );
              }}
            />
          </SafeAreaView>
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
    height: '45%',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    justifyContent: 'space-between',
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
  name: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  phone: {
    color: 'black',
    fontSize: 13,
    fontWeight: '400',
  },
  email: {
    color: 'gray',
    fontSize: 13,
    fontWeight: '400',
  },
  total: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  schedule: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'gray',
    marginVertical: 5,
    borderRadius: 10,
  },
  scheduleHead: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'yellow',
    marginVertical: 5,
    borderRadius: 10,
  },
  colHead: {
    flex: 1,
    textAlign: 'center',
    height: 30,
    marginVertical: 5,
    textAlignVertical: 'center',
  },
  col: {
    flex: 1,
    textAlign: 'center',
    height: 30,
    marginVertical: 5,
    textAlignVertical: 'center',
  },
  time: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '30%',
    justifyContent: 'center',
    borderRadius: 15,
    width: '100%',
    padding: 10,
  },
  currenTime: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#adb8b0',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 15,
    width: '50%',
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    height: '50%',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#65ab7a',
    width: '45%',
    height: '100%',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: '#fa192c',
    width: '45%',
    height: '100%',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
  },
});
