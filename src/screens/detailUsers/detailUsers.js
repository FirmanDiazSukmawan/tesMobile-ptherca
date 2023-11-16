import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import attendance from '../../utils/attendance.json';
import {SafeAreaView} from 'react-native-safe-area-context';
import {calculateWorkHours} from '../../utils/calculate';
import Back from '../../component/back';

export default function DetailUsers() {
  const route = useRoute();
  const data = route.params.item;
  // console.log(data);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigation = useNavigation();
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const userAttendance = attendance.data.filter(
    item => item?.user_id === data?.id,
  );
  // console.log(userAttendance);
  const mergedData = userAttendance.map(item => ({
    ...data,
    ...item,
  }));
  // console.log(data);

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
    Alert.alert('ClockIn Successfuly');
  };
  const Adjustment = () => {
    Alert.alert('ClockOut Successfuly');
  };

  const historyAttendance = users => {
    navigation.navigate('DetailAttendance', {
      users,
    });
  };

  const back = () => {
    navigation.goBack();
  };

  const onRefresh = async () => {
    setRefresh(true);
    try {
      await mergedData();
      setRefresh(false);
    } catch (error) {
      // console.error('Error refresh');
    } finally {
      setRefresh(false);
    }
  };

  return (
    <View style={styles.section}>
      <SafeAreaView>
        <FlatList
          data={mergedData}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => {
            const absent = item?.status_presence === 'present';
            return (
              <TouchableOpacity
                style={styles.schedule}
                key={index}
                onPress={() => historyAttendance(item)}>
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
              </TouchableOpacity>
            );
          }}
          ListHeaderComponent={
            <>
              <Back pageTitle="Detail Users" back={back} />
              <View style={styles.header}>
                <View style={styles.profile}>
                  <View style={styles.fotoProfile}>
                    <Image source={data?.avatar} style={styles.avatar} />
                  </View>
                  <View style={styles.total}>
                    <View style={styles.totalPresent}>
                      <Text style={styles.textTotal}>Total Pressent</Text>
                      <Text style={styles.textCount}> {presentCount}</Text>
                    </View>

                    <View style={styles.totalAbsens}>
                      <Text style={styles.textTotal}>Total absens</Text>
                      <Text style={styles.textCount}> {absentCount}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.dataUsers}>
                  <View>
                    <Text style={styles.name}>{data?.name}</Text>
                    <Text style={styles.phone}>{data?.profession}</Text>
                    <Text style={styles.phone}>{data?.phone}</Text>
                    <Text style={styles.email}>{data?.email}</Text>
                  </View>
                  <View style={styles.time}>
                    <View style={styles.currenTime}>
                      <Text style={styles.timer}>
                        {currentTime.toLocaleDateString('id-ID', {
                          timeZone: 'Asia/Jakarta',
                        })}
                      </Text>
                      <Text style={styles.timer}>
                        {currentTime.toLocaleTimeString('id-ID', {
                          timeZone: 'Asia/Jakarta',
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.btn}>
                  <TouchableOpacity style={styles.button} onPress={absens}>
                    <Text style={styles.clockIn}>Clock In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button1} onPress={Adjustment}>
                    <Text style={styles.clockIn}>Clock Out</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.body}>
                <Text style={styles.textHistory}> History Attendance</Text>
              </View>
              <View style={styles.scheduleHead}>
                <Text style={styles.colHead}> Date</Text>
                <Text style={styles.colHead}> Clock_in</Text>
                <Text style={styles.colHead}> Clock_out</Text>
                <Text style={styles.colHead}> Work Hours</Text>
              </View>
            </>
          }
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth: 1,
    marginBottom: 15,
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
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    resizeMode: 'stretch',
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
    width: '70%',
    height: '50%',
    justifyContent: 'space-evenly',
  },
  schedule: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
  },
  scheduleHead: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#7D82D7',
    marginVertical: 5,
    borderRadius: 10,
  },
  colHead: {
    flex: 1,
    textAlign: 'center',
    height: 30,
    marginVertical: 5,
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  col: {
    flex: 1,
    textAlign: 'center',
    height: 30,
    marginVertical: 5,
    textAlignVertical: 'center',
    color: 'black',
  },
  time: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  // currenTime: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   height: '100%',
  //   justifyContent: 'center',
  //   borderRadius: 15,
  //   width: '50%',
  // },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    marginVertical: 25,
  },
  button: {
    backgroundColor: '#EFC81A',
    width: '45%',
    height: '100%',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: '#d3d3d3',
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
  totalPresent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 10,
  },
  totalAbsens: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dataUsers: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  timer: {
    textAlign: 'right',
    color: 'gray',
  },
  clockIn: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  textTotal: {
    color: 'black',
  },
  textCount: {
    color: 'gray',
  },
  textHistory: {
    color: 'black',
  },
});
