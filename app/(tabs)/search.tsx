import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import Card from '@/components/Card';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';

const search = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({
    query: searchQuery
  }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery])

  return (
    <View className="flex-1 bg-primary">
      <FlatList
        data={movies}
        renderItem={({ item }) => <Card {...item} />}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center items-center mt-20">
              <Image source={icons.logo} className="w-20 h-15 mb-5 mx-auto" />
            </View>

            <View className="mt-5">
              <SearchBar
                placeHolder="Search for a movie..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#ffffff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold mt-5 mb-3">
                  Search result for {""}
                  <Text className="text-bblue">{searchQuery}</Text>
                </Text>
              )}
          </>
        }

        ListEmptyComponent={
          !loading && !error?(
            <View className='mt-10 px-5'>
              <Text className='text-center text-white'>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>   
          ) : null
        }

      ></FlatList>
    </View>
  );
}

export default search