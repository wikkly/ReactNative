import React, { useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Todolist from './Component/handleGoals';
import Modalou from './Component/Modal';

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title:{
      fontSize: 70,
      alignItems: 'center',
      paddingTop: 2,
      color: '#930050',
      fontWeight: 'bold', 
    },
    image:{
      flex: 1,
      justifyContent: 'center',
    },
  });
//TextInput = est stocké dans l'état NewGoal
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../Todolist/assets/backgroundimage.jpeg")} resizeMode="cover" style={styles.image}>
      <View style={styles.title}>
        <Text style={styles.title}> TO DO LIST </Text>
      </View>
      <StatusBar style="auto" />
      <Modalou></Modalou>
      <Todolist></Todolist>
        </ImageBackground>
    </View>
  );
}