import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import NewBack from '../../component/newBack';
import iconImage from '../../assets/icon/solar_gallery-bold.png';
import iconLocation from '../../assets/icon/solar_map-point-outline-white.png';
import star from '../../assets/icon/solar_star-bold.png';
import wifi from '../../assets/icon/wifi.png';
import fitnes from '../../assets/icon/dumbel.png';
import breakFast from '../../assets/icon/coffe.png';
import beach from '../../assets/icon/beach.png';
import {useNavigation} from '@react-navigation/native';
import iconHeart from '../../assets/icon/iconHeart.png';

export default function DetailHomeStay({route}) {
  const data = route.params;
  // console.log(data);
  const [showReadMore, setShowReadMore] = useState(false);
  const navigation = useNavigation();

  const ReadMore = () => {
    setShowReadMore(!showReadMore);
  };

  const book = () => {
    Alert.alert('booking succesfuly');
  };

  const back = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.section}>
      <NewBack pageTitle="About HomeStay" goBack={back} icon={iconHeart} />
      <View style={styles.image}>
        <Image source={iconImage} style={styles.img} />
      </View>
      <View style={styles.content}>
        <View style={styles.subTittle}>
          <Text style={styles.title}>{data?.name_homestay}</Text>
          <View style={styles.location}>
            <Image source={iconLocation} style={styles.iconLocation} />
            <Text style={styles.textLocation}>{data?.location}</Text>
          </View>
          <View style={styles.rating}>
            <Text style={styles.textRating}>{data?.rating}</Text>
            <Image source={star} style={styles.star} />
          </View>
        </View>
        <View>
          <Text style={styles.price}>{data?.price}</Text>
          <Text style={styles.night}>Per night</Text>
        </View>
      </View>
      <View style={styles.SubFacility}>
        <Text style={styles.titleFacility}>Facility</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <View style={styles.SubIconFacility}>
        <View style={styles.iconFacilty}>
          <View style={styles.ImageFacility}>
            <Image source={wifi} style={styles.IconImageFacilty} />
          </View>
          <Text style={styles.textFacility}>Free Wifi</Text>
        </View>
        <View style={styles.iconFacilty}>
          <View style={styles.ImageFacility}>
            <Image source={fitnes} style={styles.IconImageFacilty} />
          </View>
          <Text style={styles.textFacility}>Fitness</Text>
        </View>
        <View style={styles.iconFacilty}>
          <View style={styles.ImageFacility}>
            <Image source={breakFast} style={styles.IconImageFacilty} />
          </View>
          <Text style={styles.textFacility}>BreakFast</Text>
        </View>
        <View style={styles.iconFacilty}>
          <View style={styles.ImageFacility}>
            <Image source={beach} style={styles.IconImageFacilty} />
          </View>
          <Text style={styles.textFacility}>Beach</Text>
        </View>
      </View>
      <View>
        <Text style={styles.description}>Description</Text>
        <View>
          <Text style={styles.textDescription}>
            The ideal place for those looking for a luxurious and tranquil
            holiday experience with stunning seaView....
            {showReadMore && (
              <Text style={styles.showReadMore}>
                Nestled along the pristine coastline, our resort offers an oasis
                of serenity where luxury meets nature.
              </Text>
            )}
            <TouchableOpacity onPress={ReadMore}>
              <Text style={styles.readMore}>
                {showReadMore ? 'Read less' : 'Read more'}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={book}>
        <Text style={styles.textButton}>Book Now</Text>
      </TouchableOpacity>
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
  image: {
    height: 218,
    backgroundColor: '#D9D9D9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  img: {
    width: 46,
    height: 46,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: '#171621',
    paddingBottom: 5,
    fontFamily: 'Inter-SemiBold',
  },
  iconLocation: {
    width: 22,
    height: 22,
    marginRight: 4,
  },
  textLocation: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  textRating: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#171621',
    marginRight: 5,
    fontFamily: 'Inter-Regular',
  },
  star: {
    width: 24,
    height: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    color: '#171621',
    paddingBottom: 5,
    fontFamily: 'Inter-SemiBold',
  },
  night: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: '#A3A3A3',
    fontFamily: 'Inter-Regular',
  },
  SubFacility: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  titleFacility: {
    fontSize: 18,
    lineHeight: 26,
    color: '#171621',
    fontFamily: 'Inter-SemiBold',
  },
  seeAll: {
    color: '#FA9F54',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Inter-Medium',
  },
  SubIconFacility: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 20,
  },
  iconFacilty: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageFacility: {
    width: 40,
    height: 40,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#F1F1F1',
    marginBottom: 6,
  },
  IconImageFacilty: {
    width: 24,
    height: 24,
  },
  description: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: '#171621',
    fontFamily: 'Inter-SemiBold',
  },
  textDescription: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: '#737373',
    fontFamily: 'Inter-Regular',
  },
  readMore: {
    fontSize: 14,
    lineHeight: 22,
    color: '#FA9F54',
    fontFamily: 'Inter-Medium',
  },
  button: {
    width: '100%',
    paddingVertical: 17,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA9F54',
    borderRadius: 20,
    marginTop: 36,
  },
  showReadMore: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: '#A3A3A3',
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  textFacility: {
    fontFamily: 'Inter-Regular',
    color: '#A1A7B0',
    fontSize: 12,
  },
});
