import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Wrapper = props => (
  <ScrollView>
    <View style={styles.container}>{props.children}</View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: wp(2),
  },
});

export default Wrapper;
