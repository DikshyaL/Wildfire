import React, { useState } from 'react';
import { Text, TextInput, Button, View, Picker } from 'react-native';
import * as Notifications from 'expo-notifications';

const AddDonation = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [donationType, setDonationType] = useState('food');
  const [message, setMessage] = useState('');

  // Function to trigger notification
  const triggerNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "New Donation Available!",
        body: "A new donation has been posted. Check it out!",
      },
      trigger: { seconds: 1 }, // Trigger immediately
    });
  };

  // Handle donation submission
  const handleSubmit = async () => {
    const donorEmail = 'donor@example.com'; // Use actual email from AsyncStorage or logged-in user.

    const donationData = {
      donorEmail,
      item,
      quantity,
      donationType,
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
        triggerNotification(); // Notify user about the new donation
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Error submitting donation.');
    }
  };

  return (
    <View className="flex flex-col bg-white items-left justify-center w-full h-full">
      <View className="flex flex-col justify-center items-center w-full h-full p-4">
        <Text className="text-[#49225B] text-4xl font-bold mb-4">Add Donation</Text>

        <View className="flex flex-col justify-between w-80 h-auto p-8 rounded-lg">
          {/* Donation form */}
          <View className="flex flex-col">
            <Text className="text-sm mb-2">Item:</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              placeholder="Enter item"
              value={item}
              onChangeText={setItem}
            />

            <Text className="text-sm mb-2">Quantity:</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              placeholder="Enter quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />

            <Text className="text-sm mb-2">Donation Type:</Text>
            <Picker
              selectedValue={donationType}
              style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
              onValueChange={setDonationType}
            >
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Clothes" value="clothes" />
              <Picker.Item label="Essentials" value="essentials" />
            </Picker>
          </View>

          <Button title="Submit Donation" onPress={handleSubmit} />

          {message && <Text className="mt-4 text-center text-sm">{message}</Text>}
        </View>
      </View>
    </View>
  );
};

export default AddDonation;
