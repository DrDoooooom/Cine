import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import MaskedView from "@react-native-masked-view/masked-view";

import { images } from '@/constants/images';

const TrendingCard = ({movie: {id, title, poster_path}, index}: TrendingCardProps) => {
  return (
      <Link href={`/details/${id.toString()}`} asChild>
          <TouchableOpacity className='w-32 relative pl-5'>
              <Image
                  source={{
                      uri: poster_path
                          ? `https://image.tmdb.org/t/p/w500${[poster_path]}`
                          : "https://placehold.co/600x400/1a1a1a/ffffff.png",
                  }}
                  className='w-32 h-48 rounded-lg'
                  resizeMode='cover'
              />

              <View className='absolute bottom-8 left-2.5 px-1 py-1 rounded-full'>
                  <MaskedView maskElement={
                      <Text className='font-bold text-white text-5xl'>{index + 1}</Text>
                  }>
                      <Image
                          source={images.rankingGradient}
                          className='size-12'
                          resizeMode='cover'
                      />
                  </MaskedView>
              </View>
              <Text className='text-sm font-bold mt-2 text-white' numberOfLines={1}>
                  {title}
              </Text>
          </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard