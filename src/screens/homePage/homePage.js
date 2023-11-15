import React, {useState, useMemo} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import user from '../../utils/data.json';
import {useNavigation} from '@react-navigation/native';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const filteredData = useMemo(() => {
    if (!search) {
      return user?.data;
    }
    return user?.data.filter(item =>
      item?.name?.toLowerCase().includes(search?.toLowerCase()),
    );
  }, [search]);

  const detail = item => {
    // console.log(item);
    navigation.navigate('DetailUsers', {item});
  };

  return (
    <SafeAreaView style={styles.section}>
      {/* <Text style={styles.listUsers}>Attendance List</Text> */}
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Search Name"
        />
        <View style={{height: '92.5%'}}>
          <FlatList
            data={filteredData}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity style={styles.card} key={index}>
                  <View style={styles.username}>
                    <Fontisto style={styles.icon} name="user-secret" />
                    <View style={styles.text}>
                      <Text>{item?.name}</Text>
                      <Text>{item?.email}</Text>
                      <Text>{item?.phone}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => detail(item)}>
                      <Text>Attendance</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  listUsers: {
    color: 'black',
    fontSize: 25,
    paddingBottom: 25,
    fontWeight: 'bold',
  },

  search: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    width: '100%',
    backgroundColor: 'white',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    height: 80,
    marginVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  icon: {
    fontSize: 24,
    color: 'black',
  },
  text: {
    paddingHorizontal: 20,
    display: 'flex',
    width: '70%',
  },
  username: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#EFC81A',
    width: '25%',
    height: '50%',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
