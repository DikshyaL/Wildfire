import React, { useEffect } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

const Notification = () => {
  useEffect(() => {
    // Request permissions for notifications
    Notifications.requestPermissionsAsync();

    // Listener to handle incoming notifications
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log("Received notification:", notification);
    });

    // Cleanup on component unmount
    return () => {
      subscription.remove();
    };
  }, []);

  const triggerNotification = () => {
    // Function to trigger a notification manually (e.g., when a new donation is made)
    Notifications.scheduleNotificationAsync({
      content: {
        title: "New Donation Available!",
        body: "A new donation has been posted. Check it out!",
      },
      trigger: { seconds: 1 }, // Trigger immediately
    });
  };

  return (
    <View>
      <Text>Donation Notification Example</Text>
      <Button title="Trigger Notification" onPress={triggerNotification} />
    </View>
  );
};

export default Notification;
