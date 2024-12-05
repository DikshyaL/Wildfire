import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, AsyncStorage } from 'react-native';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [donatedHistory, setDonatedHistory] = useState([]);
  const [receivedHistory, setReceivedHistory] = useState([]);
  
  useEffect(() => {
    // For now, set the email as a static value
    const email = 'johndoe@example.com';

    // Fetch the user data using the static email
    const fetchUserData = async () => {
      try {
        // Replace localhost with your local IP address if testing on a real device
        const response = await fetch(`http://localhost:8080/api/user/${email}`);
        
        // Log the response status and body for debugging
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data to see the result

        if (response.ok) {
          setUser(data.user); // Store the user info
          setDonatedHistory(data.donatedHistory); // Set donated history
          setReceivedHistory(data.receivedHistory); // Set received history
        } else {
          console.error('Error fetching user data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  
  const renderDonationItem = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <Text className="text-[#49225B] text-xl font-semibold">{item.donorName || item.receiverName}</Text>
      <Text className="text-sm text-gray-600">Item: {item.item}</Text>
      <Text className="text-sm text-gray-600">Quantity: {item.quantity}</Text>
      <Text className="text-sm text-gray-600">Donation Type: {item.donationType}</Text>
    </View>
  );

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-violet-50 p-6">
      {/* Profile Header */}
      <View className="flex items-center mb-6">
        <Image
          source={{ uri: user.profilePic }}
          className="w-32 h-32 rounded-full mb-4"
        />
        <Text className="text-3xl font-bold text-gray-800">{user.username}</Text>
        <Text className="text-xl text-gray-500">{user.location}</Text>
        <Text className="text-md text-gray-400">Role: {user.role}</Text>
      </View>

      {/* Donation History */}
      {user.role === 'hospital' && (
        <View className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-2">Donation History</Text>

          <Text className="text-lg font-semibold text-gray-700 mb-4">Donated History</Text>
          <FlatList
            data={donatedHistory}
            renderItem={renderDonationItem}
            keyExtractor={(item) => item.id.toString()}
          />

          <Text className="text-lg font-semibold text-gray-700 mb-4">Received History</Text>
          <FlatList
            data={receivedHistory}
            renderItem={renderDonationItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}

      {user.role === 'receiver' && (
        <View className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-2">Received History</Text>
          <FlatList
            data={receivedHistory}
            renderItem={renderDonationItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}

      {user.role === 'donor' && (
        <View className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-2">Donated History</Text>
          <FlatList
            data={donatedHistory}
            renderItem={renderDonationItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Profile;
