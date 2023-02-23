import React, { useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

// Cette partie définit un objet styles qui contient du css
const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      marginBottom: 20,
      paddingTop : 40,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
      height: 40,
      marginRight: 10,
    },
    addButton: {
      backgroundColor: '#930050',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 18,
    },
  });
  export default function Todolist(props) {
  // useState => GOALS
    // composant React appelé SampleGoals.
    const [goals, setGoals] = useState([
      { key: 'Faire les courses' },
      { key: 'Aller à la salle de sport 3 fois par semaine' },
      { key: 'Monter à plus de 5000m d altitude' },
      { key: 'Acheter mon premier appartement' },
      { key: 'Perdre 5 kgs' },
      { key: 'Gagner en productivité' },
      { key: 'Apprendre un nouveau langage' },
      { key: 'Faire une mission en freelance' },
      { key: 'Organiser un meetup autour de la tech' },
      { key: 'Faire un triathlon' },
    ]);
    // variable d'état goals qui stocke un tableau de buts initiaux.
  // useState => NEWGOALS
 const [newGoal, setNewGoal] = useState('');
  
  // Appeler lors de de l'appui sur Ajouter, vérifie si newGoal est !vide
  // Si newGoal!vide setGoals ajoute un nouvel objectif à la liste GOALS
  // Vide la valeur SetGoals grâce à SetNewGoals vide 
    const handleAddGoal = () => {
      if (newGoal) {
        setGoals([...goals, { key: newGoal }]);
        setNewGoal('');
      }
    };
  
  // fonction qui permetde supprimer un but spécifique de la liste de but en créant une nouvelle liste
  // avec les goals et qui la met à jour.
  const handleDeleteGoal = (goal) => {
    // création d'une nouvelle variable qui contient la liste de but mis à jour en comparant la liste goal de base avec la nouvelle liste de but
    const updatedGoals = goals.filter((item) => item.key !== goal.key);
    // mise à jour de la variable goals avec la nouvelle liste de but 
    setGoals(updatedGoals);
  };
  
  const renderGoalItem = ({ item }) => (
    <View style={styles.item}>
      <Text> {item.key}</Text>
      <TouchableOpacity onPress={() => handleDeleteGoal(item)}>
        <AntDesign name="closecircle" size={24} color="#930050" />
      </TouchableOpacity>
    </View>
  );
    return (
        <View style={styles.container}>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter un nouveau but"
          value={newGoal}
          onChangeText={setNewGoal}
        />
 {/* touchable opacity est un bouton qui permet d'ajouter une nouvelle tâche lorsqu'il est pressé,
la fonction handleAddGoal est appelée, cette fonction vérifie que le champs NewGoal est rempli  */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal}>
          <Text style={styles.addButtonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
{/* Affiche la liste des tâches stockées dans l'état goals  */}
      <FlatList
        data={goals}
        renderItem={renderGoalItem}
        keyExtractor={(item) => item.key}
        />
    </View>
);
};