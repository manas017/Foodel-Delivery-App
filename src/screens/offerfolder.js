import React from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import Swiper from 'react-native-swiper'
export default function Offerfolder() {
  return (
    <View>
      <View style={styles.offerslide}>
        <Swiper autoplay={true} autoplayTimeout={3} activeDotColor='red'>
            <View style={styles.slide}>
                <Image source={require('../../assets/img2.png')} style={styles.img} resizeMode='contain'/>
            </View>
            <View style={styles.slide}>
                <Image source={require('../../assets/img1.png')} style={styles.img} resizeMode='contain'/>
            </View>
            <View style={styles.slide}>
                <Image source={require('../../assets/img3.png')} style={styles.img} resizeMode='contain'/>
            </View>
        </Swiper>
      </View>
    </View>
  )
}
const styles=StyleSheet.create({
    img:{width:'100%',height:260},
    slide:{marginHorizontal:2},
    offerslide:{width:'100%',height:260}
})