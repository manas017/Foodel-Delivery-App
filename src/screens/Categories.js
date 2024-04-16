// import 'react-native-gesture-handler'
import React from 'react'
import { View,Text,ScrollView ,StyleSheet,TouchableOpacity} from 'react-native'
import NoodleIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import PizzaIcon from 'react-native-vector-icons/FontAwesome6'
import BurgerIcon from 'react-native-vector-icons/MaterialIcons'
import IceIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../globalcss/style'
export default function Categories() {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.box}>
             <Text style={styles.txt}>Breakfast</Text>
             <NoodleIcon name="noodles" style={{fontSize:24, color:"red",marginRight:10 }}/>
        </TouchableOpacity >
        <TouchableOpacity style={styles.box}>
             <Text style={styles.txt}>Starters</Text>
             <PizzaIcon name="pizza-slice" style={{fontSize:24, color:"red",marginRight:10 }}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
             <Text style={styles.txt}>Dinnner</Text>
             <BurgerIcon name="dinner-dining" style={{fontSize:24, color:"red",marginRight:10 }}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
             <Text style={styles.txt}>Desserts</Text>
             <IceIcon name="ice-cream" style={{fontSize:24, color:"red",marginRight:10 }}/>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{backgroundColor:'black',width:'95%',elevation:10,borderRadius:10,alignSelf:'center'},
    head:{color:'white',fontSize:25,fontWeight:'300',margin:10,paddingBottom:5,alignSelf:'center',borderBottomWidth:2,borderBottomColor:'red'},
    box:{backgroundColor:colors.col1,elevation:20,padding:10,borderRadius:10,margin:10,flexDirection:"row-reverse",borderColor:''},
    icon:{marginRight:10},
    txt:{fontSize:16,color:'black',fontWeight:'400'}
})