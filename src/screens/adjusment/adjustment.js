// AdjustmentForm.js

import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Back from '../../component/back';
import {ScrollView} from 'react-native-gesture-handler';

const AdjustmentForm = ({route}) => {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [clockIn, setClockIn] = useState('');
  const [clockOut, setClockOut] = useState('');
  const [reason, setReason] = useState('');
  const [checked, setChecked] = useState('');
  const navigation = useNavigation();

  const {users} = route.params;

  // console.log(users);

  useEffect(() => {
    if (users) {
      setName(users.name || '');
      setProfession(users.profession || '');
      setClockIn(users.clock_in || '');
      setClockOut(users.clock_out || '');
      setReason(users.reason || '');
      setChecked(users.status_presence || '');
    }
  }, [users]);

  const submit = () => {
    if (name && profession && clockIn && clockOut && reason && checked) {
      Alert.alert('Adjustment sending successfully');
    } else {
      Alert.alert('Need input all Form Data');
    }
  };

  const back = () => {
    navigation.goBack();
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Back pageTitle="Form Adjustment" back={back} />
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Input your Name"
          value={name}
          onChangeText={text => setName(text)}
          color="black"
          placeholderTextColor="gray"
        />
        <Text style={styles.label}>Profession</Text>
        <TextInput
          style={styles.input}
          placeholder="Fullstack Developer"
          value={profession}
          onChangeText={text => setProfession(text)}
          color="black"
          placeholderTextColor="gray"
        />
        <Text style={styles.label}>Clock In:</Text>
        <TextInput
          style={styles.input}
          placeholder="09:00"
          value={clockIn}
          onChangeText={text => setClockIn(text)}
          color="black"
          placeholderTextColor="gray"
        />

        <Text style={styles.label}>Clock Out:</Text>
        <TextInput
          style={styles.input}
          placeholder="12:00"
          value={clockOut}
          onChangeText={text => setClockOut(text)}
          color="black"
          placeholderTextColor="gray"
        />

        <View style={styles.radio}>
          <View style={styles.radioButton}>
            <RadioButton
              value="present"
              status={checked === 'present' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('present')}
            />
            <Text style={styles.textRadioButton}>Present</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              value="sick"
              status={checked === 'sick' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('sick')}
            />
            <Text style={styles.textRadioButton}>Sick</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              value="permission"
              status={checked === 'permission' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('permission')}
            />
            <Text style={styles.textRadioButton}>Permission</Text>
          </View>
        </View>

        <Text style={styles.label}>Your Reason:</Text>
        <TextInput
          style={styles.inputTextArea}
          placeholder="Input your reason..."
          numberOfLines={4}
          value={reason}
          onChangeText={text => setReason(text)}
          color="black"
          placeholderTextColor="gray"
        />

        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text style={styles.textBtn}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
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
  label: {
    fontSize: 16,
    marginTop: 8,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 40,
    padding: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  inputTextArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 150,
    padding: 8,
    marginTop: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  radioButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radio: {
    display: 'flex',
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#EFC81A',
    height: 40,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  textRadioButton: {
    color: 'gray',
  },
});

export default AdjustmentForm;
