import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import { fetchMovies, fetchTrendingMovies} from "@/services/api";
import Card from "@/components/Card";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {

  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: movieError
  } = useFetch(() => fetchMovies({
    query: ''
  }))

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError
  } = useFetch(fetchTrendingMovies)

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-20 h-15 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#ffffff"
            className="mt-10 self-center"
          />
        ) : movieError || trendingMoviesError ? (
          <Text>
            Error: {movieError?.message || trendingMoviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeHolder="Search for a movie..."
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Trending Movies
                </Text>
              </View>
            )}

            <>
              <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4" />}
                className="mb-4 mt-3"
                data={trendingMovies}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
              />

              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Popular Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <Card {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
