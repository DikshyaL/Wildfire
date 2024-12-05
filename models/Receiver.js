import React, { useState } from 'react';
import { Text, TextInput, Button, View, Picker } from 'react-native';

const AddDonation = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [receiver, setReceiver] = useState('');
  const [donationType, setDonationType] = useState('food');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const donorEmail = 'donor@example.com'; // You should use actual logged-in user email here

    const donationData = {
      donorEmail,
      item,
      quantity,
      receiver,  // Receiver is the person receiving the donation
    };

    try {
      const response = await fetch('http://localhost:8080/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Donation request submitted successfully!');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Error submitting donation.');
    }
  };

  return (
    <View className="p-4">
      <Text className="text-lg font-semibold mb-4">Add a Donation</Text>
      
      <Text className="text-sm mb-2">Item:</Text>
      <TextInput
        className="border p-2 mb-4"
        placeholder="Enter item"
        value={item}
        onChangeText={setItem}
      />
      
      <Text className="text-sm mb-2">Quantity:</Text>
      <TextInput
        className="border p-2 mb-4"
        placeholder="Enter quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      
      <Text className="text-sm mb-2">Receiver (Email):</Text>
      <TextInput
        className="border p-2 mb-4"
        placeholder="Enter receiver's email"
        value={receiver}
        onChangeText={setReceiver}
      />

      <Text className="text-sm mb-2">Donation Type:</Text>
      <Picker
        selectedValue={donationType}
        className="border p-2 mb-4"
        onValueChange={setDonationType}
      >
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Clothes" value="clothes" />
        <Picker.Item label="Essentials" value="essentials" />
      </Picker>
      
      <Button title="Submit Donation" onPress={handleSubmit} />
      
      {message && <Text className="mt-4 text-center text-sm">{message}</Text>}
    </View>
  );
};

export default AddDonation;
