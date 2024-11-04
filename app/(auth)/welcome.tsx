import Swiper from '@/components/ui/swiper';
import React from 'react'
import { View ,Text} from 'react-native';
import tw from 'twrnc';

const Welcome = () => {
  const data = [
    {
      image: '',
      title: 'Welcome to Haptic',
      description: 'Haptic is a social media platform that allows you to connect with friends and family.'
    },
    {
      image: '',
      title: 'Welcome to Haptic 2',
      description: 'Haptic is a social media platform that allows you to connect with friends and family.'
    }
  ];


  return (
    <View style={tw`flex-1`}>
      <Text style={tw`text-2xl font-bold text-white`}>Welcome</Text>
      <Swiper data={data}/>
    </View>
  )
}

export default Welcome
