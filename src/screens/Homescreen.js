import React, { useEffect, useState } from 'react'
import {View,Text,StyleSheet,TextInput,ScrollView,FlatList} from 'react-native'
import Homeheadnav from './Homeheadnav'
import SearchIcon from 'react-native-vector-icons/EvilIcons'
import Categories from './Categories'
import Offerfolder from './offerfolder'
import {useNavigation} from '@react-navigation/native'
import Cardslider from './Cardslider'
import ArrowIcon from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore'
import Bottomnav from './Bottomnav'
export default function Homescreen() {
  let [fooddata,Setfooddata]=useState([])
  let[vegData,setvegData]=useState([])
  let[nvegData,SetnvegData]=useState([])
  const foodRef=firestore().collection('Fooddata')
  const navigation=useNavigation()
  useEffect(()=>{
    foodRef.onSnapshot(snapshot=>{
      Setfooddata(snapshot.docs.map(doc=>doc.data()))
    })
  },[])

  useEffect(()=>{
      setvegData(fooddata.filter(item=>item.fdType=='veg'))
  },[fooddata])

  useEffect(()=>{
    SetnvegData(fooddata.filter(item=>item.fdType=='non-veg'))
},[fooddata])
 
  let[searchData,SetsearchData]=useState('')

  return (
    <View style={styles.container}>
      <Homeheadnav/>
    <ScrollView  >
        
        <View style={styles.srchbx}>
          <View style={styles.srchicnbx}><SearchIcon name="search" style={{fontSize:30,color:"white" }}/></View>
          <TextInput placeholder='Search' value={searchData} onChangeText={(text)=>SetsearchData(text)}style={styles.srchinp}/>
  
        </View>
        {searchData != '' && <View style={styles.seacrhresultsouter}>
                    <FlatList style={styles.searchresultsinner} data={fooddata} renderItem={
                        ({ item }) => {
                            if (item.fname.toLowerCase().includes(searchData.toLowerCase())) {
                                return (
                                    <View style={styles.searchresult}>
                                        <ArrowIcon name="arrowright" size={24} color="black" />
                                        <Text style={styles.searchresulttext}>{item.fname}</Text>
                                    </View>
                                )
                            }
                        }
                    } />
        </View>}
        <Categories/>
        <Offerfolder/>
        <Cardslider title="EXPLORE" data={fooddata} navigation={navigation}/>
        <Cardslider title="VEG CRAVINGS" data={vegData} navigation={navigation}/>
        <Cardslider title="NON-VEG CRAVINGS" data={nvegData} navigation={navigation}/>
    </ScrollView>
    <Bottomnav/>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor:'#FCFCFF',
    width:'100%',
    height:'100%'
  },
  srchbx:{
    flexDirection:'row',
    margin:10,
    width:'80%',
    height:50,
    alignSelf:'center',
    justifyContent:'center'
  },
  srchinp:{
    width:340,
    backgroundColor:'white',
    elevation:10,
    borderBottomRightRadius:20,
    borderTopRightRadius:20,
    paddingLeft:5
  },
  srchicnbx:{
    backgroundColor:'red',
    borderBottomLeftRadius:20,
    borderTopLeftRadius:20,
    justifyContent:'center',
    alignItems:'center',
    width:40,
  },
  seacrhresultsouter: {
    width: '100%',
    marginHorizontal: 30,
    height: '100%',
    backgroundColor: '#E0E0E0',
},
searchresultsinner: {
    width: '100%',
},
searchresult: {
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
    padding: 5,
},
searchresulttext: {
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
},
bottomnav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#E0E0E0',
    zIndex: 20,
}
});