import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity, Image, Modal,  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const FILE_PATH = '../data.json';

export default function Home() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [modalVisible, setModalVisible] = React.useState(false);
  const [name, setName] = React.useState('');
  const [grade, setGrade] = React.useState('');
  const [email, setEmail] = React.useState('');
  
   // New state variable for date
  const [submittedForms, setSubmittedForms] = React.useState([]);

  // Function to handle form submission
  const handleSubmit = () => {
      setSubmittedForms([...submittedForms, { name, grade, email}]);
      setModalVisible(false);
      setName(''); // Reset the name input
  };  

  const askForCameraPermission = () => {
    (async () => {``
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  const submitCode = ({code}) => {
    setModalVisible(true);
  }

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <TextInput placeholder='or enter the 6 digit code...' style={{ height: 40, marginTop: 10, marginBottom: 10, borderWidth: 1, padding: 10, width: '80%' }} />
      <Button title="Go" onPress={submitCode} />
      <Text style={styles.maintext}>{text}</Text>
      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
{/* Modal for the registration form */}
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
              setModalVisible(!modalVisible);
          }}
      >
          <View style={{ marginTop: 50, marginHorizontal: 20, backgroundColor: 'white', padding: 35, alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84 }}>
              <Text style={{ marginBottom: 15, textAlign: 'center' }}>My Form</Text>
              <TextInput
                  placeholder="Enter Name"
                  value={name}
                  onChangeText={setName}
                  style={{ height: 40, marginBottom: 10, borderWidth: 1, padding: 10, width: '100%' }}
              />
              <TextInput
                  placeholder="Enter Grade"
                  value={grade}
                  onChangeText={setGrade}
                  style={{ height: 40, marginBottom: 10, borderWidth: 1, padding: 10, width: '100%' }}
              />
              <TextInput
                  placeholder="Enter Email"
                  value={email}
                  onChangeText={setEmail}
                  style={{ height: 40, marginBottom: 10, borderWidth: 1, padding: 10, width: '100%' }}
              />
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
          </View>
      </Modal>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});