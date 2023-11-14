import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import attendance from '../../utils/attendance.json';

export default function DetailUsers() {
  const route = useRoute();
  const data = route.params.item;
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

  console.log(mergedData);

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
          <Text> History Attendance</Text>
          <View style={styles.history}>
            <Text style={styles.col}> Date</Text>
            <Text style={styles.col}> Clock_in</Text>
            <Text style={styles.col}> Clock_out</Text>
            <Text style={styles.col}> Work Hours</Text>
          </View>
          <FlatList
            data={mergedData}
            renderItem={({item, index}) => {
              return (
                <View style={styles.history} key={index}>
                  <Text style={styles.col}> {item?.date}</Text>
                  <Text style={styles.col}> {item?.clock_in}</Text>
                  <Text style={styles.col}> {item?.clock_out}</Text>
                  <Text style={styles.col}>
                    {calculateWorkHours(item?.clock_in, item?.clock_out)}
                  </Text>
                </View>
              );
            }}
          />
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
    alignItems: 'center',
    width: '100%',
  },
  col: {
    flex: 1,
    textAlign: 'center',
  },
});
