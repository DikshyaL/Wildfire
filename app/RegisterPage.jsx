import React, { useState } from 'react';
import { TouchableOpacity, TextInput, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import RegistrationSVG from '../assets/images/Registration.svg'; 


export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View className="flex flex-col bg-white items-left justify-center w-full h-full">
      <View className="flex flex-col justify-center items-center w-full h-full p-4">
        <Text className="text-[#49225B] text-4xl font-bold mb-4">Register</Text>
        <RegistrationSVG width={400} height={400} className="border-none" />
        
        <View className="flex flex-col justify-between w-80 h-auto p-8 rounded-lg ">
          <View className="flex flex-row items-center border p-2 mb-4 rounded-lg">
            <FontAwesome name="envelope" size={20} color="#6E3482" />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              className="ml-2 flex-1 "
            />
          </View>

          <View className="flex flex-row items-center border p-2 mb-4 rounded-lg">
            <FontAwesome name="lock" size={20} color="#6E3482" />
            <TextInput
              placeholder="Password"
              secureTextEntry={passwordVisible}
              value={password}
              onChangeText={setPassword}
              className="ml-2 flex-1 "
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <FontAwesome
                name={passwordVisible ? "eye-slash" : "eye"}
                size={24}
                color="#6E3482"
              />
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center border p-2 mb-4 rounded-lg">
            <FontAwesome name="lock" size={24} color="#6E3482" />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={passwordVisible}
              value={password}
              onChangeText={setPassword}
              className="ml-2 flex-1 "
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <FontAwesome
                name={passwordVisible ? "eye-slash" : "eye"}
                size={24}
                color="#6E3482"
              />
            </TouchableOpacity>
          </View>


          <TouchableOpacity className="mt-6 bg-[#49225B] p-2 flex flex-row justify-center items-center rounded-full">
            <Text className="text-white text-2xl pr-4 font-semibold ">Register</Text>
            <FontAwesome name="arrow-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
