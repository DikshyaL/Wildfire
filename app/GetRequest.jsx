import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, FlatList } from 'react-native';

const GetRequest = () => {
  const [donations, setDonations] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('receiverId');  // Assuming this is the receiver's user ID

  // Fetch the donations that have been posted
  const fetchDonations = async () => {
    try {
      const response = await fetch('http://localhost:8080/getDonations', {
        method: 'GET',
      });
      const data = await response.json();
      if (response.ok) {
        setDonations(data.donations); // Assuming response contains list of donations
      } else {
        setMessage('Error fetching donations.');
      }
    } catch (error) {
      setMessage('Error fetching donations.');
    }
  };

  // Accept the donation request (receiver gets the item)
  const acceptDonation = async (donationId, donorId) => {
    try {
      const response = await fetch('http://localhost:8080/acceptDonation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ donationId, userId, donorId }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Donation accepted successfully!');
        fetchDonations(); // Refresh donations list
      } else {
        setMessage(`Error accepting donation: ${data.message}`);
      }
    } catch (error) {
      setMessage('Error accepting donation.');
    }
  };

  useEffect(() => {
    fetchDonations(); // Fetch donations when component mounts
  }, []);

  // Render each donation item
  const renderDonationItem = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <Text className="text-[#49225B] text-xl font-semibold">{item.item}</Text>
      <Text className="text-sm text-gray-600">Quantity: {item.quantity}</Text>
      <Text className="text-sm text-gray-600">Donation Type: {item.donationType}</Text>
      <TouchableOpacity
        onPress={() => acceptDonation(item.id, item.donorId)}
        className="bg-[#49225B] p-2 rounded-full mt-4"
      >
        <Text className="text-white text-center">Accept Request</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 justify-center items-center p-4 bg-white">
      <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <Text className="text-[#49225B] text-4xl font-bold mb-4 text-center">Community Donation Posts</Text>
        
        {/* Display message if any */}
        {message && <Text className="mt-4 text-center text-sm text-red-500">{message}</Text>}
        
        {/* List of donation posts */}
        <FlatList
          data={donations}
          renderItem={renderDonationItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default GetRequest;
