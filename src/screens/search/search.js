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
  RefreshControl,
} from 'react-native';
import data from '../../utils/data';
import {useNavigation} from '@react-navigation/native';

export default function Search() {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);

  const filteredData = useMemo(() => {
    if (!search) {
      return data;
    }
    return data?.filter(item =>
      item?.name?.toLowerCase().includes(search?.toLowerCase()),
    );
  }, [search]);

  const detail = item => {
    // console.log(item);
    navigation.navigate('DetailUsers', {item});
  };

  const onRefresh = async () => {
    setRefresh(true);
    try {
      await filteredData();
      setRefresh(false);
    } catch (error) {
      // console.error('Error refresh');
    } finally {
      setRefresh(false);
    }
  };

  return (
    <SafeAreaView style={styles.section}>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Search Name"
          placeholderTextColor="#A9A9A9"
          color="black"
        />
        <View style={styles.flatList}>
          <FlatList
            data={filteredData}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View style={styles.card} key={index}>
                  <View style={styles.username}>
                    <View style={styles.fotoProfile}>
                      <Image source={item.avatar} style={styles.avatar} />
                    </View>
                    <View style={styles.text}>
                      <Text style={styles.textName}>{item.name}</Text>
                      <Text style={styles.textEmail}>{item.email}</Text>
                      <Text style={styles.textPhone}>{item.phone}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => detail(item)}>
                      <Text style={styles.textAttendance}>Attendance</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode: 'stretch',
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
    width: '60%',
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
  fotoProfile: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {height: '92.5%'},
  textAttendance: {
    fontSize: 13,
    color: '#fff',
  },
  textName: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
  textEmail: {
    color: 'gray',
    fontSize: 13,
    fontWeight: '400',
  },
  textPhone: {
    color: 'gray',
    fontSize: 13,
    fontWeight: '400',
  },
});
