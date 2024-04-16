import React, { Component } from 'react'
import { useEffect,useState } from 'react'
import { Text, StyleSheet, View ,ScrollView,FlatList,TouchableOpacity} from 'react-native'
import {firebase} from '../Firebase/Firebaseconfig'
export default function Placeorder({route}){
    const {cartdata}=route.params
    const [orderdata, setOrderdata] = useState([]);
    const [totalCost, setTotalCost] = useState('0');
    // console.log(JSON.parse(cartdata))

    useEffect(() => {
        setOrderdata(JSON.parse(cartdata));
    }, [cartdata])

    const [userloggeduid, setUserloggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);
    useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                // console.log(user);
                if (user) {
                    // navigation.navigate('home');
                    setUserloggeduid(user.uid);
                    
                } else {
                    // No user is signed in.
                    console.log('no user');
                }
            });
        }
        checklogin();
    }, [])

    useEffect(() => {
        const getuserdata = async () => {
            const docRef = firebase.firestore().collection('userData').where('uid', '==', userloggeduid)
            const doc = await docRef.get();
            if (!doc.empty) {
                doc.forEach((doc) => {
                    setUserdata(doc.data());
                    // console.log(userdata);
                })
            }
            else {
                console.log('no user data');
            }
        }
        getuserdata();
    }, [userloggeduid]);

    useEffect(() => {
        if (cartdata != null) {
            const foodprice = JSON.parse(cartdata).cart;
            let totalfoodprice = 0;
            foodprice.map((item) => {
                // console.log(item.data.foodPrice)
                totalfoodprice = (parseInt(item.data.fprc) * parseInt(item.foodquantity)) +
                    (parseInt(item.data.fdAddonPrice) * parseInt(item.Addonquantity)) + totalfoodprice;
            })
            // console.log(totalfoodprice)
            setTotalCost(JSON.stringify(totalfoodprice))
        }
    }, [cartdata])

    const placenow = () => {
        const docRef = firebase.firestore().collection('userOrders').doc(new Date().getTime().toString());
        docRef.set({
            orderid: docRef.id,
            orderdata: orderdata.cart,
            orderstatus: 'pending',
            ordercost: totalCost,
            orderdate: firebase.firestore.FieldValue.serverTimestamp(),
            orderaddress: userdata.address,
            orderphone: userdata.phone,
            ordername: userdata.name,
            orderuseruid: userloggeduid,
            orderpayment: 'online',
            paymenttotal: totalCost
        })
        // navigation.navigate('home');
        alert('Order Placed Successfully');
        // navigation.navigate('trackorders');
    }
    return (
        <ScrollView style={styles.containerout}>
             <View style={styles.container}>

<Text style={styles.head1}>Your Order Summary</Text>
<FlatList style={styles.c1} data={orderdata.cart} renderItem={
    ({ item }) => {
        return (
            <View style={styles.rowout}>
                <View style={styles.titlebox}><Text style={styles.title}>{item.data.fname}</Text></View>
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Text style={styles.qty}>{item.foodquantity} </Text>
                        <Text style={{color:'red',fontSize:15,position:'relative',top:1}}>X</Text>
                        <Text style={styles.price1}>₹{item.data.fprc}</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.totalprice}>₹{parseInt(item.foodquantity) * parseInt(item.data.fprc)}</Text>
                    </View>
                </View>
                {item.Addonquantity ==0 ? <Text style={{color:'red',fontSize:15,paddingHorizontal:20,position:'relative',top:-10}}>No Addon's</Text>:
                <View>
                <Text style={{color:'red',position:'relative',top:-10,left:15}}>Add on's</Text>
                
                <View style={styles.row}>
                    <View style={[styles.left,{position:'relative',top:-10}]}>
                    <Text style={[styles.title,{fontSize:15,fontWeight:'400'}]}>{item.data.fdAddon}</Text>
                        <Text style={styles.qty}>{item.Addonquantity}</Text>
                        <Text style={{color:'red',fontSize:15,position:'relative',top:1}}>X</Text>
                        <Text style={styles.price1}>₹{item.data.fdAddonPrice}</Text>
                    </View>
                    <View style={[styles.right,{position:'relative',top:-18}]}>
                        <Text style={[styles.totalprice,{fontSize:15,fontWeight:'500'}]}>₹{parseInt(item.Addonquantity) * parseInt(item.data.fdAddonPrice)}</Text>
                    </View>
                </View></View>
    }
    <View style={styles.tottalbox}>
        <Text style={{color:'white',fontSize:16}}>Total  </Text>
        <Text style={{color:'white',fontSize:16,fontWeight:'500'}}>Rs.{(parseInt(item.foodquantity) * parseInt(item.data.fprc))+(parseInt(item.Addonquantity) * parseInt(item.data.fdAddonPrice))}</Text>
    </View>
            </View>
        )
    }
} />
</View>

    <View style={[styles.left,{backgroundColor:'red',borderRadius:15,justifyContent:'center',alignSelf:'center',marginTop:20}]}>
        <Text style={[styles.totalprice,{backgroundColor:'#FC1111',color:'white',paddingHorizontal:30,justifyContent:'center',borderRadius:15}]}>Grand Total -  ₹{totalCost}</Text>
    </View>

{/* <View style={hr80}>
</View> */}

<View style={styles.userdataout}>
    <Text style={styles.head1}>Your Details</Text>
    <View style={styles.row}>
        <View style={[styles.left,{left:50}]}>
            <Text style={[styles.title,{fontWeight:'400'}]}>Name :</Text>
        </View>
        <View style={[styles.right,{right:30}]}>
            <Text style={styles.title}>{userdata?.name}</Text>
        </View>
    </View>
    <View style={styles.row}>
        <View style={[styles.left,{left:50}]}>
            <Text style={[styles.title,{fontWeight:'400'}]}>Email :</Text>
        </View>
        <View style={[styles.right,{right:30}]}>
            <Text style={styles.title}>{userdata?.email}</Text>
        </View>
    </View>

    <View style={styles.row}>
        <View style={[styles.left,{left:50}]}>
            <Text style={[styles.title,{fontWeight:'400'}]}>Phone :</Text>
        </View>

        <View style={[styles.right,{right:30}]}>
            <Text style={styles.title}>{userdata?.phone}</Text>
        </View>
    </View>

    <View style={styles.row}>
        <View style={[styles.left,{left:50}]}>
            <Text style={[styles.title,{fontWeight:'400'}]}>Address :</Text>
        </View>
        <View style={[styles.right,{right:30}]}>
            <Text style={styles.title}>{userdata?.address}</Text>
        </View>
    </View>
</View>



<View >
    <TouchableOpacity  style={{width:250,alignContent:'center',justifyContent:'center',backgroundColor:'#FC1111',borderRadius:15,height:40,margin:10,marginBottom:25,alignSelf:'center'}}>
        <Text style={{color:'white',fontSize:20,alignSelf:'center',fontWeight:'500'}} onPress={() => placenow()}>Proceed to Payment</Text>
    </TouchableOpacity>
</View>


</ScrollView>
    )
  }


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    head1: {
        fontSize: 30,
        fontWeight: '200',
        color: 'black',
        margin: 10,
        textAlign: 'center',
        fontWeight:'300',
        marginVertical:20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
        width:'90%',
        // borderRadius:20
        height:'auto'
    },
    rowout: {
        flexDirection: 'column',
        margin: 10,
        elevation: 5,
        backgroundColor: '#FCFCFF',
        padding: 10,
        borderRadius: 20,
       
    },

    qty: {
        width: 35,
        height: 25,
        // marginRight:10,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        elevation:10
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
        color:'black'
    },
    price1: {
        fontSize: 17,
        fontWeight: 'bold',
        marginHorizontal: 13,
        color: 'black',
        position:'relative',
        top: -1,
    },
    left: {
        flexDirection: 'row',
        marginLeft:20,
        marginVertical:7,
      
        height:40
    },
    right: {
        flexDirection: 'row',
        position:'relative',
        bottom:5
    },
    totalprice: {
        fontSize: 17,
        fontWeight: 'bold',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        backgroundColor:'#FCFCFF',
        color:'black',
        elevation:10
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
    },
    titlebox:{
        width:'auto',
        // backgroundColor:'cyan',
        height:'auto',
        marginHorizontal:13
    },
    tottalbox:{
        flexDirection:'row',
        position:'relative',
        left:210,
        bottom:10,
        backgroundColor:'#FC3333',
        width:120,
        paddingHorizontal:10,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20
    }
})
