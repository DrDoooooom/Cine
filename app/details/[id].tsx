import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import useFetch from '@/services/useFetch';
import { fetchDetails } from '@/services/api';
import { icons } from '@/constants/icons';

interface MovieInfoProps {
  label: string;
  value?: string | null | number;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-bblue font-normal text-sm'>
      {label}
    </Text>
    
    <Text className='text-white font-bold text-sm mt-2'>
      {value || 'N/A'}
    </Text>
  </View>
)

const Details = () => {

  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() => fetchDetails(id as string));
  

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="cover"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-bblue text-xs font-medium mt-1">
              Release Date:
              <Text className="text-white text-xs font-medium">
                {" "}
                {movie?.release_date}
                {"\n"}
              </Text>
              <Text className="text-bblue text-xs font-medium mt-1">
                Runtime:
                <Text className="text-white text-xs font-medium">
                  {" "}
                  {movie?.runtime}m
                </Text>
              </Text>
            </Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-xs font-bold">
              {movie?.vote_average?.toFixed(1)?.toString()}/10
            </Text>
            <Text className="text-bblue text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres.map((g) => g.name).join(", " || "N/A")}
          />
          <View className="flex flex-row justify-between gap-x-2">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue / 1_000_000)} million`}
            />
            <MovieInfo
              label='Release Status'
              value={movie?.status}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((c) => c.name).join(", ") || "N/A"
            }
          />
          <MovieInfo
            label="Country of Origin"
            value={
              movie?.production_countries.map((c) => c.name).join(", ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50" onPress={() => setTimeout(() => router.back(), 100)}>
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#FFFFFF"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Details