import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import CustomIcon from 'react-native-vector-icons/AntDesign';

const SettingComponent = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <CustomIcon name={props.icon} style={styles.iconStyle} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subtitle}>{props.subheading}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <CustomIcon name={'arrowright'} style={styles.iconStyle} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    color: 'black',
    fontSize: 24,
    paddingHorizontal: 20,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  subtitle: {

    fontSize: 14,
    color: 'grey',
  },
});