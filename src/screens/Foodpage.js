import React, { Component, useState } from 'react'
import { Text, View,ScrollView, Image, StyleSheet, ImageBackground, TouchableOpacity ,Modal} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'
import style from '../globalcss/style';
import Add from 'react-native-vector-icons/Entypo'
import {firebase} from '../Firebase/Firebaseconfig'
import {useNavigation} from '@react-navigation/native'
export default function Foodpage({route}){
    const[foodquantity,SetfoodQuantity]=useState('1')
    const[Addonquantity,SetAddonQuantity]=useState('0')
    const[ismodal,Setismodal]=useState(true)
    const navigation=useNavigation()
    const AddtoCart=()=>{

        const docRef=firebase.firestore().collection('UserCartdata').doc(firebase.auth().currentUser.uid)

        const data1={Addonquantity:Addonquantity,foodquantity:foodquantity,data}
        console.log(data1)

        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    cart: firebase.firestore.FieldValue.arrayUnion(data1)
                })
                console.log('Updated')
            } else {
                docRef.set({
                    cart: [data1]
                })
                console.log('Added')
            }
            alert('Added to cart')
        })
    }

    const buynow=()=>{
        const docRef=firebase.firestore().collection('UserCartdata').doc(firebase.auth().currentUser.uid)
        const data1={Addonquantity:Addonquantity,foodquantity:foodquantity,data}

        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    cart: firebase.firestore.FieldValue.arrayUnion(data1)
                })
                console.log('Updated')
            } else {
                docRef.set({
                    cart: [data1]
                })
                console.log('Added')
            }
            // alert('Added to cart')
        })
        navigation.navigate('Cart')
    }

    const increaseQuantity = () => {
        SetfoodQuantity((parseInt(foodquantity) + 1).toString())
    }
    const decreaseQuantity = () => {
        if (parseInt(foodquantity) > 1) {
            SetfoodQuantity((parseInt(foodquantity) - 1).toString())
        }
    }

    const increaseAddonQuantity = () => {
        SetAddonQuantity((parseInt(Addonquantity) + 1).toString())
    }
    const decreaseAddonQuantity = () => {
        if (parseInt(Addonquantity) > 0) {
            SetAddonQuantity((parseInt(Addonquantity) - 1).toString())
        }
    }
    
    // const buynow=()=>{
        
    // }
    const data=route.params
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems:'center',}}>     
         <Image source={{uri:data.fimgurl}} style={styles.img} />
         <View style={styles.blank}></View>
         <View style={styles.dishname}>
            <Text style={styles.dname}>{data.fname}</Text>
         </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>           
        <Text style={[styles.h3,{position:'relative',left:-90,}]}>About Food</Text>
        
        <View style={{position:'relative',left: 80,}}>
        {(data.fdType=='veg')?<View style={styles.vegc}><Text style={{color:'white'}}>Veg</Text></View>:
                                                <View style={styles.nvegc}><Text style={{color:'white'}}>Non-Veg</Text></View>}
         </View>  
         </View>    
         <Text style={styles.fdes}>{data.fdes}</Text>

         <View style={{flexDirection:'row'}}>
         <View style={[styles.prcbx,{position:'relative',left:-90,top:-8}]}>
            <Text style={styles.money}>Rs.{data.fprc} /-</Text>
         </View>

        
        </View>   

        
        <View style={styles.container2}>
            
            <View style={styles.locbx}>
                <Text style={styles.txt1}>Location</Text>
            </View>
            <Text style={styles.txt2}>{data.rname}</Text>
            <View style={styles.container2in}>
                <Text style={styles.txt3}>{data.rAddressBuilding}</Text>
                <View style={styles.dash}></View>
                <Text style={styles.txt3}>{data.rAddressStreet}</Text>
                <View style={styles.dash}></View>
                <Text style={styles.txt3}>{data.rAddressCity}</Text>
            </View>
        </View>

        <View style={styles.billbox}>
            <Text style={[styles.txxt1,{position:'relative',top:-50}]}>Order Quantity</Text>
            <View style={{flexDirection:'row',position:'relative',left:-30}}>
                <View style={{width:170,height:'auto'}}><Text style={[styles.txt3,{color:'black'}]}>{data.fname}</Text></View>
                <View style={{flexDirection:'row',position:'relative',left: 65,}}>
                    <TouchableOpacity  onPress={() => increaseQuantity()}><Add name='squared-plus' style={styles.icn}/></TouchableOpacity>
                    <View style={styles.quantitybox}><Text style={styles.quantitytext}>{foodquantity}</Text></View>
                    <TouchableOpacity  onPress={() => decreaseQuantity()}><Add name='squared-minus' style={styles.icn}/></TouchableOpacity>
                </View>  
            </View>

            <Text style={[styles.txt3,{color:'red',position:'relative',right:115,marginTop:10}]}>Add On's</Text>
            <View style={{flexDirection:'row',position:'relative',right:20,marginTop:10}}>
                <View style={{width:130,height:'auto',position:'relative',}}><Text style={[styles.txt3,{color:'black'}]}>{data.fdAddon}</Text></View>
                <View style={[styles.Addonprcbox,{}]}><Text style={{color:'white',fontSize:14,fontWeight:'400'}}>Rs {data.fdAddonPrice}</Text></View>
                <View style={{flexDirection:'row',position:'relative',left: 75,}}>
                    <TouchableOpacity  onPress={() => increaseAddonQuantity()}><Add name='squared-plus' style={styles.icn}/></TouchableOpacity>
                    <View style={styles.quantitybox}><Text style={styles.quantitytext}>{Addonquantity}</Text></View>
                    <TouchableOpacity onPress={() => decreaseAddonQuantity()}><Add name='squared-minus' style={styles.icn}/></TouchableOpacity>
                </View>
            </View>
            <View style={[styles.dishname,{position:'relative',top:20,backgroundColor:'red'}]}><Text style={styles.dname}>Total Price - {foodquantity*data.fprc + Addonquantity*data.fdAddonPrice}</Text></View>
        </View>

         <View style={{width:'90%',height:'auto',marginBottom:50,justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row',position:'relative',top:30,marginVertical:10}}>
         <TouchableOpacity style={[styles.btn]} onPress={()=>AddtoCart()}>
            <Text style={styles.dname}>Add to Cart</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.btn} onPress={()=>buynow()}>
            <Text style={styles.dname}>Buy Now</Text>
         </TouchableOpacity>
         </View>
         </View>   

          
         

      </ScrollView>
    )
  }

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F4F4E2',
       
        width:'100%',
        height:'100%'
      },
    img:{width:'100%',height:400,alignSelf:'center',borderBottomLeftRadius:-20,borderBottomRightRadius:20},
    imgbox:{paddingVertical:5},
    icnimg:{flexDirection:"row"},
    blank:{backgroundColor:'#F4F4E2',width:'100%',height:30,position:'absolute',top:370,borderTopLeftRadius:30,borderTopRightRadius:30,},
    dishname:{width:'90%',height:40,backgroundColor:'red',borderRadius:10,justifyContent:'center',alignItems:'center',position:'relative',top:-20,elevation:10},
    dname:{color:'white',fontSize:20,fontWeight:'600'},
    vegc:{ 
        width:70,
        heigth:10,
        borderWidth:2,
        borderColor:'green',
        borderRadius:6,
        backgroundColor:'green',
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        paddingHorizontal:10
    },
    vegdot:{width:10,height:10,backgroundColor:'green',borderRadius:30},
    nvegc:{ 
        width:90,
        heigth:10,
       
        borderWidth:2,
        borderColor:'red',
        borderRadius:6 ,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        paddingHorizontal:10
    },
    nvegdot:{width:10,height:10,backgroundColor:'red',borderRadius:30},
    h3:{color:'black',fontSize:25,fontWeight:'400',alignSelf:'flex-start',paddingLeft:20},
    fdes:{color:'grey',fontSize:17,padding:20},
    btn:{width:'45%',height:40,backgroundColor:'red',borderRadius:10,marginHorizontal:10,paddingHorizontal:15,justifyContent:'center',alignItems:'center',elevation:5,},
    prcbx:{width:100,height:30,backgroundColor:'black',borderRadius:5,alignItems:'center',justifyContent:'center',marginTop:10,alignSelf:'flex-start',marginLeft:30},
    money:{color:'white',fontSize:16,fontWeight:'400',padding:5},
    icn:{fontSize:20,color:'#CC0000'},
    quantitybox:{width:30,height:30,justifyContent:'space-between',alignItems:'center',position:'relative',top:-5},
    Addonprcbox:{justifyContent:'space-between',alignItems:'center',backgroundColor:'black',width:'auto',paddingHorizontal:10,paddingVertical:5,borderRadius:5,height:'auto',position:'absolute',left:140},
    quantitytext:{fontSize:21},
    container2:{ width: '90%',
    backgroundColor: '#606060',
    padding: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    elevation: 5,
    alignItems: 'center',
},
txt1: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',

},
txt2: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    marginVertical: 10,

},
container2in: {
    flexDirection: 'row',
    alignItems: 'center',
},
txt3: {
    color: '#E0E0E0',
    fontSize: 18,
},
dash: {
    width: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,},
locbx:{width:100,height:30,backgroundColor:'#990000',borderRadius:5,alignItems:'center',justifyContent:'center'},
billbox:{width:'85%',height:280,backgroundColor:'#FCFCFF',borderRadius:20,alignItems:'center',marginTop:15,justifyContent:'center',elevation:10},
txxt1:{ color: 'red',
fontSize: 23,
fontWeight: '600',marginTop:15}
    
})