import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Modal, Text, TextInput, TouchableOpacity, View, TouchableNativeFeedback, Platform,} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

// Cette partie définit un objet styles qui contient du css
const styles = StyleSheet.create({
    containerList:{
      height: '80%',
    },
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
      marginBottom: 10,
      marginTop:40,
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
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    modalButton: {
      backgroundColor: '#930050',
      borderRadius: 5,
      padding: 10,
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalCancelButton: {
      marginRight: 10,
      },
      modalConfirmButton: {
      backgroundColor: '#930050',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      },
      modalCancelButtonText: {
      color: '#333',
      },
      modalConfirmButtonText: {
      color: '#fff',
      fontWeight: 'bold',
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
const [deleteModalVisible, setDeleteModalVisible] = useState(false);
const [goalToDelete, setGoalToDelete] = useState(null);
const [editModalVisible, setEditModalVisible] = useState(false);
const [selectedGoal, setSelectedGoal] = useState(null);
const [editedGoal, setEditedGoal] = useState('');

const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  // Appeler lors de de l'appui sur Ajouter, vérifie si newGoal est !vide
  // Si newGoal!vide setGoals ajoute un nouvel objectif à la liste GOALS
  // Vide la valeur SetGoals grâce à SetNewGoals vide 
    const handleAddGoal = () => {
      if (newGoal) {
        setGoals([...goals, { key: newGoal }]);
        setNewGoal('');
      }
    };
  
    const handleDeleteGoal = (goal) => {
      setGoalToDelete(goal);
      setDeleteModalVisible(true);
    };
  // fonction qui permetde supprimer un but spécifique de la liste de but en créant une nouvelle liste
  // avec les goals et qui la met à jour.
  const handleConfirmDelete = () => {
    // création d'une nouvelle variable qui contient la liste de but mis à jour en comparant la liste goal de base avec la nouvelle liste de but
    const updatedGoals = goals.filter((item) => item.key !== goalToDelete.key);
    // mise à jour de la variable goals avec la nouvelle liste de but 
    setGoals(updatedGoals);
    setDeleteModalVisible(false);
  };
  
  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const handleEditGoal = (goal) => {
    setSelectedGoal(goal);
    setEditedGoal(goal.key);
    setEditModalVisible(true);
  };

  const handleSaveEditedGoal = () => {
    const updatedGoals = goals.map((goal) => {
      if (goal.key === selectedGoal.key) {
        return { key: editedGoal };
      }
      return goal;
    });
    setGoals(updatedGoals);
    setEditModalVisible(false);
  };

  const renderGoalItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => handleEditGoal(item)}>
      <AntDesign name="edit" size={24} color="#930050" />
      </TouchableOpacity>
      <Text> {item.key}</Text>
      <TouchableOpacity onPress={() => handleDeleteGoal(item)}>
      <AntDesign name="closecircle" size={24} color="#930050" />
      </TouchableOpacity>
    </View>
  );

  const handleReplaceGoal = (index, modifiedGoal) => {
    const modif = goals.map((goal, indexMap) =>
      indexMap == index ? modifiedGoal : goal
    );
    setGoals(modif);
  };

    return (
      <SafeAreaView>
        <View style={styles.containerList}>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter un nouveau but"
          value={newGoal}
          onChangeText={setNewGoal}
        />
 {/* touchable opacity est un bouton qui permet d'ajouter une nouvelle tâche lorsqu'il est pressé,
la fonction handleAddGoal est appelée, cette fonction vérifie que le champs NewGoal est rempli  */}
       <TouchableComponent style={styles.addButton} onPress={handleAddGoal} background={TouchableNativeFeedback.Ripple('#ffffff', true)}>
        <Text style={styles.addButtonText}>Ajouter</Text>
      </TouchableComponent>
      </View>
{/* Affiche la liste des tâches stockées dans l'état goals */}
      <FlatList
        data={goals}
        renderItem={renderGoalItem}
        keyExtractor={(item) => item.key}
        />
   <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Supprimer l'objectif ?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirmDelete}>
                <Text style={styles.modalButtonText}>Confirmer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCancelDelete}>
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
      animationType="slide"
      transparent={true}
      visible={editModalVisible}
      onRequestClose={() => setEditModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Modifier l'objectif</Text>
          <TextInput
            style={styles.modalInput}
            value={editedGoal}
            onChangeText={setEditedGoal}
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalConfirmButton}
              onPress={handleSaveEditedGoal}
            >
              <Text style={styles.modalConfirmButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
      </View>
  </SafeAreaView>
);
};

