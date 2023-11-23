import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import NewBack from '../../component/newBack';
import {useNavigation} from '@react-navigation/native';
import bookings from '../../assets/icon/carbon_overflow-menu-horizontal.png';
import gallery from '../../assets/icon/solar_gallery-bold.png';
import iconLocation from '../../assets/icon/solar_map-point-outline-white.png';
import calendar from '../../assets/icon/calendar.png';
import clock from '../../assets/icon/clock.png';
import data from '../../utils/homeStay';
import dataBookings from '../../utils/booking';

export default function Bookings() {
  const navigation = useNavigation();
  const back = () => {
    navigation.goBack();
  };

  const joinedData = dataBookings?.map(book => {
    const homeStayInfo = data?.find(
      homeStay => homeStay.id === book.homestay_id,
    );

    return {
      ...book,
      booking: homeStayInfo || null,
    };
  });

  const updatedData = joinedData.map(item => {
    const booking = item.booking;
    if (booking) {
      const {price} = booking;
      const {days} = item;
      const totalPrice = parseInt(price.replace('$', ''), 10) * days;

      return {
        ...item,
        totalPrice,
      };
    }

    return item;
  });

  const goDetail = item => {
    navigation.navigate('DetailHomeStay', item);
  };
  return (
    <View style={styles.section}>
      <NewBack pageTitle="My Bookings" goBack={back} icon={bookings} />
      <FlatList
        data={updatedData}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.content}
            key={index}
            onPress={() => goDetail(item.booking)}>
            <View style={styles.image}>
              <Image source={gallery} style={styles.img} />
            </View>
            <View>
              <Text style={styles.subTittle}>
                {item?.booking?.name_homestay}
              </Text>
              <View style={styles.location}>
                <Image source={iconLocation} style={styles.imageLocation} />
                <Text style={styles.textLocation}>
                  {item?.booking.location}
                </Text>
              </View>
              <View style={styles.date}>
                <View style={styles.dates}>
                  <Image source={calendar} style={styles.calendar} />
                  <Text style={styles.textTime}>
                    {new Date(item?.date).toLocaleString('en-US', {
                      month: 'long',
                    })}
                  </Text>
                </View>

                <View style={styles.time}>
                  <Image source={clock} style={styles.calendar} />
                  <Text style={styles.textTime}>{item.days} Days</Text>
                </View>
              </View>
              <Text style={styles.price}>${item?.totalPrice}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 19,
    backgroundColor: '#fff',
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingTop: 23,
  },
  image: {
    width: 106,
    height: 106,
    backgroundColor: '#D9D9D9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8.918,
    marginRight: 12,
  },
  img: {
    width: 24,
    height: 24,
  },
  subTittle: {
    color: '#171621',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    paddingBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingBottom: 8,
  },
  imageLocation: {
    width: 16,
    height: 16,
  },
  textLocation: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#A3A3A3',
    fontFamily: 'Inter-Regular',
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    paddingBottom: 10,
  },
  dates: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    marginRight: 10,
  },
  calendar: {
    width: 16,
    height: 16,
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#171621',
    fontFamily: 'Inter-Medium',
  },
  textTime: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#171621',
    fontFamily: 'Inter-Regular',
  },
});
