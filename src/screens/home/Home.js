import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import notification from '../../assets/icon/solar_bell-linear.png';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import search from '../../assets/icon/Search.png';
import tuning from '../../assets/icon/solar_tuning-linear.png';
import {TabView, TabBar} from 'react-native-tab-view';
import iconImage from '../../assets/icon/solar_gallery-bold.png';
import iconLocation from '../../assets/icon/solar_map-point-outline.png';
import solarStarBold from '../../assets/icon/solar_star-bold.png';
import heartIcon from '../../assets/icon/Heart.png';
import iconLocationWhite from '../../assets/icon/solar_map-point-outline-white.png';
import {useNavigation} from '@react-navigation/native';
import data from '../../utils/homeStay';

const First = ({goDetail}) => {
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => b.rating - a.rating);
    setSortedData(sorted);
  }, []);

  return (
    <View style={styles.tab1}>
      <View style={styles.subHomeStay}>
        <Text style={styles.textHomeStay}>Homestays Near You</Text>
        <Text style={styles.textSeeAll}>See All</Text>
      </View>
      <View style={styles.card}>
        <FlatList
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.card1}
              onPress={() => goDetail(item)}
              key={index}>
              <View style={styles.topCard}>
                <View style={styles.topCardIcon}>
                  <Image source={solarStarBold} style={styles.iconStar} />
                  <Text style={styles.textStar}>{item?.rating}</Text>
                </View>
                <Image source={heartIcon} style={styles.heartIcon} />
              </View>
              <View style={styles.cardImage}>
                <Image source={iconImage} style={styles.iconImage} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.textTitle}>{item?.name_homestay}</Text>
                <View style={styles.cardLocation}>
                  <Image source={iconLocation} style={styles.cardIcon1} />
                  <Text style={styles.textCardLocation}>{item?.location}</Text>
                </View>
                <Text style={styles.price}>{item?.price}/night</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.subHomeStay}>
        <Text style={styles.textPopularHomeStay}>Popular Homestay</Text>
        <Text style={styles.textSeeAll}>See All</Text>
      </View>
      <FlatList
        data={sortedData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.popularCard}
            key={index}
            onPress={() => goDetail(item)}>
            <View style={styles.cardImage2}>
              <Image source={iconImage} />
            </View>
            <View style={styles.popularCardContent}>
              <Text style={styles.subPopular}>{item.name_homestay}</Text>
              <View style={styles.cardLocation}>
                <Image source={iconLocationWhite} style={styles.cardIcon1} />
                <Text style={styles.textPopularLocation}>{item.location}</Text>
              </View>
              <View style={styles.popularIcon}>
                <Text style={styles.textStarPopular}>{item.rating}</Text>
                <Image source={solarStarBold} style={styles.iconStar} />
              </View>
              <Text style={styles.popularPrice}>{item.price}/Night</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const Second = () => (
  <View style={styles.Hotels}>
    <Text>No Data for Hotels</Text>
  </View>
);
const Third = () => (
  <View style={styles.Hotels}>
    <Text>No Data for Villas</Text>
  </View>
);
const Fourth = () => (
  <View style={styles.Hotels}>
    <Text>No Data for Guest House</Text>
  </View>
);
const Fifth = () => (
  <View style={styles.Hotels}>
    <Text>No Data for Hostels</Text>
  </View>
);

export default function Home() {
  const layout = useWindowDimensions();
  const navigation = useNavigation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'All'},
    {key: 'second', title: 'Hotels'},
    {key: 'third', title: 'Villas'},
    {key: 'fourth', title: 'Guest Houses'},
    {key: 'fifth', title: 'Hostels'},
  ]);

  const goDetail = item => {
    navigation.navigate('DetailHomeStay', item);
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <First goDetail={goDetail} />;
      case 'second':
        return <Second />;
      case 'third':
        return <Third />;
      case 'fourth':
        return <Fourth />;
      case 'fifth':
        return <Fifth />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.location}>
          <Text style={styles.textCurrentLocation}>Current Location</Text>
          <View style={styles.detailLocation}>
            <EvilIcon name="location" style={styles.icon1} />
            <Text style={styles.textDetailLocation}>Serang, Indonesia</Text>
          </View>
        </View>
        <View style={styles.bgIcon}>
          <Image
            source={notification}
            alt="notification"
            style={styles.icon2}
          />
        </View>
      </View>
      <View style={styles.headInput}>
        <TextInput
          style={styles.input}
          placeholder="Search Homestay..."
          placeholderTextColor="#A3A3A3"
          placeholderStyle={styles.placeholderStyle}
        />
        <Image source={search} style={styles.searchIcon} />
        <Image source={tuning} style={styles.tuning} />
      </View>
      <View style={styles.subCategory}>
        <Text style={styles.textCategory}>Category</Text>
        <Text style={styles.textSeeAll}>See All</Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        swipeEnabled={false}
        renderTabBar={props => {
          return (
            <TabBar
              {...props}
              style={styles.tabBar}
              scrollEnabled
              renderLabel={({route, focused, color}) => (
                <View>
                  <Text
                    style={[
                      styles.titleTabsInactive,
                      focused && styles.titleTabsActive,
                    ]}>
                    {route.title}
                  </Text>
                </View>
              )}
              indicatorStyle={styles.indicatorStyle}
              tabStyle={styles.tabStyle}
              gap={0}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: '#fff',
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
    alignItems: 'center',
  },
  textCurrentLocation: {
    fontSize: 14,
    fontWeight: '400',
    color: '#737373',
    lineHeight: 22,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  bgIcon: {
    width: 40,
    height: 40,
    padding: 10,
    borderRadius: 20,
    borderWidth: 0.769,
    borderColor: '#DADDDD',
  },
  icon1: {
    fontSize: 16,
    color: '#171717',
    paddingRight: 4,
  },
  textDetailLocation: {
    color: '#171621',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  icon2: {width: 20, height: 20},

  input: {
    flex: 1,
    borderColor: '#E5E5E5',
    borderWidth: 1.5,
    paddingLeft: 48,
    paddingRight: 48,
    borderRadius: 25,
    backgroundColor: '#FFF',
    marginVertical: 20,
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  headInput: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  searchIcon: {
    position: 'absolute',
    bottom: 33,
    left: 12,
    width: 24,
    height: 24,
  },
  tuning: {
    position: 'absolute',
    bottom: 33,
    right: 12,
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
    fontStyle: 'normal',
    lineHeight: 24,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  subCategory: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCategory: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    color: '#171621',
    fontFamily: 'Inter-SemiBold',
  },
  textSeeAll: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    color: '#FA9F54',
    fontFamily: 'Inter-Medium',
  },
  tab1: {
    flex: 1,
  },
  subHomeStay: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 22,
    paddingBottom: 16,
  },
  textHomeStay: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#171621',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  textPopularHomeStay: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#171621',
    fontFamily: 'Inter-SemiBold',
  },
  card: {
    // height: 227,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card1: {
    backgroundColor: '#D9D9D9',
    flex: 1,
    height: 227,
    borderRadius: 20,
    paddingBottom: 16,
    paddingHorizontal: 12,
    paddingTop: 20,
    marginRight: 12,
  },
  card2: {
    backgroundColor: '#D9D9D9',
    flex: 1,
    height: 227,
    borderRadius: 20,
    paddingBottom: 16,
    paddingHorizontal: 12,
    paddingTop: 20,
    marginLeft: 12,
  },
  topCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardImage: {
    paddingTop: 48,
    paddingHorizontal: 68,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  cardContent: {
    paddingTop: 34,
  },
  textTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
    fontFamily: 'Inter-SemiBold',
    paddingBottom: 5,
  },
  cardLocation: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 4,
  },
  textCardLocation: {
    fontSize: 12,
    lineHeight: 16,
    color: '#fff',
    fontFamily: 'Inter-Regular',
  },
  cardIcon1: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  price: {
    fontFamily: 'Inter-Medium',
    color: '#FFF',
    fontSize: 14,
    lineHeight: 22,
  },
  topCardIcon: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconStar: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  textStar: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    fontFamily: 'Inter-Medium',
  },
  heartIcon: {
    width: 16,
    height: 16,
  },
  popularCard: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  cardImage2: {
    width: 119,
    height: 119,
    borderRadius: 8.918,
    backgroundColor: '#D9D9D9',
    marginRight: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularCardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  subPopular: {
    color: '#171621',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    paddingBottom: 5,
  },
  textPopularLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#A3A3A3',
    paddingBottom: 6,
  },
  popularIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  textStarPopular: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    marginRight: 3,
    color: '#A3A3A3',
  },
  popularPrice: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#171621',
  },
  titleTabsInactive: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#A3A3A3',
    lineHeight: 22,
  },
  titleTabsActive: {
    fontWeight: '600',
    color: '#171621',
    lineHeight: 22,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  tabStyle: {width: 'auto', marginRight: 5},
  Hotels: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorStyle: {
    backgroundColor: '#171621',
  },
});
