import * as React from 'react';
import { View, TouchableOpacity, Image, Modal, Text, TextInput, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';
export default function Create({ navigation }) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState(''); // New state variable for date
    const [code, setCode] = React.useState('');
    const [submittedForms, setSubmittedForms] = React.useState([]);

    const toggleResponses = () => {
        setIsVisible(!isVisible);
    }

    // Function to handle form submission
    const handleSubmit = () => {
        setSubmittedForms([...submittedForms, { name, date, code }]);
        setModalVisible(false);
        setName(''); // Reset the name input
        setDate(''); // Reset the date input
        setCode('');
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* Button to open the form */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons name="add-circle-outline" size={64}></Ionicons>
            </TouchableOpacity>

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
                    <Text style={{ marginBottom: 15, textAlign: 'center' }}>Create Form</Text>
                    <TextInput
                        placeholder="Enter Name"
                        value={name}
                        onChangeText={setName}
                        style={{ height: 40, marginBottom: 10, borderWidth: 1, padding: 10, width: '100%' }}
                    />
                    <TextInput
                        placeholder="Enter Date"
                        value={date}
                        onChangeText={setDate}
                        style={{ height: 40, marginBottom: 10, borderWidth: 1, padding: 10, width: '100%' }}
                    />
                    <TextInput
                        placeholder="Enter 6 digit code"
                        value={code}
                        onChangeText={setCode}
                        style={{ height: 40, marginBottom: 10, borderWidth: 1, padding: 10, width: '100%' }}
                    />
                    <Button title="Create" onPress={handleSubmit} />
                    <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
                </View>
            </Modal>

            {/* Displaying submitted forms */}
            {submittedForms.map((form, index) => (
                <View key={index} style={{ margin: 10, padding: 10, borderWidth: 1, borderColor: '#ddd' }}>
                    <Text>Name: {form.name}</Text>
                    <Text>Date: {form.date}</Text>
                    <Text>Six digit code: {form.code}</Text>
                    <QRCode value={form.name + form.date}/>
                    <Button title="Show Responses" onPress={toggleResponses} />
                    <Text>Responses:</Text>
                    {isVisible && <Text>Name: [name text]]</Text>}
                    {isVisible && <Text>Grade: [grade text]</Text>}
                    {isVisible && <Text>Email: [email text]</Text>}
                </View>
            ))}
        </View>
    );
}