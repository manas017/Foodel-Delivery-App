import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import style from '../globalcss/style'
import {useNavigation} from '@react-navigation/native'
export default function Cardslider({title,data}){
    const navigation=useNavigation()
    const openFoodpage=(item)=>{
        console.log(item)
    }
    return (
      <View style={styles.container}>
        
        <View style={styles.txtbx}>
            <View style={styles.dashline}></View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.dashline}></View>

        </View>
        <FlatList horizontal showsHorizontalScrollIndicator={false} data={data} style={styles.cardout} renderItem={({item})=>(
            <TouchableOpacity key={item.index} onPress={()=>navigation.navigate('Foodpage',item)}>
            <View style={styles.cardin}>
                <View style={styles.imagebox}>
                    <Image source={{uri:item.fimgurl}} style={styles.cardimg}/>
                </View>

                <View style={styles.s2}>
                    <View style={styles.merger}><View style={styles.merger2}></View></View>

                    <View style={styles.fnamebx}><Text style={styles.txt1}>{item.fname}</Text></View>
                    <View style={styles.s2in}>
                        <Text style={styles.txt2}>Rs.{item.fprc}</Text>
                        {(item.fdType=='veg')?<View style={styles.vegc}><View style={styles.vegdot}></View></View>:
                                                <View style={styles.nvegc}><View style={styles.nvegdot}></View></View>}
                    </View>
                </View>
                <View style={styles.rnamebx}><Text style={styles.txt3}> by {item.rname}</Text></View>
                {/* <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btntxt}>Buy</Text>
                </TouchableOpacity> */}
            </View>
            </TouchableOpacity>
        )} />
      </View>
    )
  }

const styles=StyleSheet.create({
    vegc:{ 
        width:20,
        heigth:20,
        display:'flex',
        borderWidth:2,
        borderColor:'green',
        borderRadius:6,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        paddingHorizontal:10
    },
    vegdot:{width:10,height:10,backgroundColor:'green',borderRadius:30},
    nvegc:{ 
        width:20,
        heigth:20,
        display:'flex',
        borderWidth:2,
        borderColor:'red',
        borderRadius:6 ,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        paddingHorizontal:10
    },
    nvegdot:{width:10,height:10,backgroundColor:'red',borderRadius:30},
    btn:{width:'90%',height:40,display:'flex',borderRadius:10,backgroundColor:'red',justifyContent:'center',alignItems:'center',position: 'absolute',
    bottom: 2,alignSelf:'center',marginVertical:5},
    btntxt:{color:'white',fontSize:16,fontWeight:'500'},
    container:{marginVertical:10,flex:1,alignItems:'center',marginHorizontal:10},
    title: {color:'#DC143C',fontSize: 16,fontWeight: '500',borderRadius: 10,marginHorizontal: 10,justifyContent:'center',alignSelf:'center',paddingHorizontal:10},
    cardout:{width:'100%'},
    cardin:{width:300,height:250,margin:10,marginBottom:5,borderRadius:20,backgroundColor:'#FCFCFF',borderWidth:2,borderColor:'#E0E0E0',elevation:10},
    cardimg:{width: "100%",
    height: 200,
    borderTopLeftRadius:10,borderTopRightRadius:10
    },
    s2:{flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',},
    txt1: {
        fontSize: 19,
        color: 'black',
        marginHorizontal: 5,
        width: 150,
        fontWeight:'500'
    },
    txt2: {
        fontSize: 16,
        color: 'white',
        marginRight: 10,
        width:'auto',paddingHorizontal:8,backgroundColor:'#FF4500',borderRadius:6,paddingVertical:5,fontWeight:'400'
    },
    s2in: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        position:'absolute',left:177,top:9

    },
    dashline:{width:'30%',borderStyle:"dashed",borderColor:'#A0A0A0',borderTopWidth:2,marginHorizontal:10},
    txtbx:{width:'80%',flexDirection:'row',alignItems:'center',justifyContent:'center'},
    merger:{width:160,height:20,backgroundColor:'#FCFCFF',borderTopRightRadius:10,position:'absolute',top:-16},
    merger2:{width:30,height:20,backgroundColor:'#FCFCFF',transform:[{rotate:'40deg'}],borderTopLeftRadius:10,position:'absolute',left:144,top:3},
    fnamebx:{width:140,height:'auto' ,marginHorizontal:10,position:'absolute',top:-17,paddingVertical:5,borderRadius:7},
    rnamebx:{width:'auto',height:'30' ,marginHorizontal:10,backgroundColor:'#202020',position:'absolute',bottom:5,borderRadius:5,paddingVertical:3,paddingHorizontal:15},
    txt3:{fontSize:13,color:'white',fontWeight:'400'},
    

})

