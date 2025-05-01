import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons';

interface Props {
  placeHolder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeHolder, onPress, value, onChangeText}: Props) => {

  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4 '>
        <Image
              source={icons.search}
              className="size-5" resizeMode="contain" tintColor='#ffffff80'
          />
          <TextInput
              onPress={onPress}
              placeholder={placeHolder}
              value={value}
              onChangeText={onChangeText}
              placeholderTextColor={'#ffffff80'}
              className='flex-1 ml-2 text-white'
        />
    </View>
  )
}

export default SearchBar