import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { Competences } from "../Components/Competences";
import useFavorites from "../Utils/UseFavorite";
import * as Haptics from "expo-haptics";

const getBackgroundColor = (type) => {
  switch (type) {
    case "normal":
      return "bg-gray-400";
    case "fighting":
      return "bg-red-500";
    case "flying":
      return "bg-blue-200";
    case "poison":
      return "bg-purple-500";
    case "ground":
      return "bg-yellow-800";
    case "rock":
      return "bg-yellow-500";
    case "bug":
      return "bg-teal-400";
    case "ghost":
      return "bg-violet-300";
    case "steel":
      return "bg-gray-00";
    case "fire":
      return "bg-red-400";
    case "water":
      return "bg-sky-300";
    case "grass":
      return "bg-emerald-300";
    case "electric":
      return "bg-yellow-400";
    case "psychic":
      return "bg-pink-400";
    case "ice":
      return "bg-blue-100";
    case "dragon":
      return "bg-red-900";
    case "dark":
      return "bg-gray-900";
    case "fairy":
      return "bg-pink-300";
    case "unknown":
      return "bg-gray-300";
    case "shadow":
      return "bg-gray-900";
    default:
      return "bg-slate-200";
  }
};

const images = {
  normal: require("../../assets/types/Type_normal.png"),
  fighting: require("../../assets/types/Type_fighting.png"),
  flying: require("../../assets/types/Type_flying.png"),
  poison: require("../../assets/types/Type_poison.png"),
  ground: require("../../assets/types/Type_ground.png"),
  rock: require("../../assets/types/Type_rock.png"),
  bug: require("../../assets/types/Type_bug.png"),
  ghost: require("../../assets/types/Type_shadow.png"),
  shadow: require("../../assets/types/Type_shadow.png"),
  steel: require("../../assets/types/Type_steel.png"),
  fire: require("../../assets/types/Type_fire.png"),
  water: require("../../assets/types/Type_water.png"),
  grass: require("../../assets/types/Type_grass.png"),
  electric: require("../../assets/types/Type_electric.png"),
  psychic: require("../../assets/types/Type_psychic.png"),
  ice: require("../../assets/types/Type_ice.png"),
  dragon: require("../../assets/types/Type_dragon.png"),
  dark: require("../../assets/types/Type_dark.png"),
  fairy: require("../../assets/types/Type_fairy.png"),
  shadow: require("../../assets/types/Type_shadow.png"),
  unknown: require("../../assets/types/Type_normal.png"),
};

export function PokemonDetail({ route }) {
  const { pokemonDetail } = route.params;
  const pokemonId = pokemonDetail.id;
  const navigation = useNavigation();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isPokemonFavorite = isFavorite(pokemonId);

  const handleAddToFavorites = () => {
    addFavorite(pokemonId)
      .then((result) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        console.log(result);
      })
      .catch((error) => {
        console.error("Error adding to favorites:", error);
      });
  };

  const handleRemoveFromFavorites = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    removeFavorite(pokemonId);
  };

  return (
    <>
      <View className=" relative z-[10]">
        <View className="w-[100%] absolute py-3 top-2 left-0 px-4 flex flex-row justify-between">
          <TouchableOpacity
            onPress={() => navigation.navigate("app")}
            className=" w-14 h-14 bg-white/90 border border-slate-200 rounded-full flex justify-center items-center active:scale-90 "
          >
            <Text>
              <Ionicons
                name="chevron-back-outline"
                style={styles.arrowBack}
              ></Ionicons>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              isPokemonFavorite
                ? handleRemoveFromFavorites
                : handleAddToFavorites
            }
            className="love  w-14 h-14 bg-white/90 border border-slate-200 rounded-full flex justify-center items-center active:scale-90 "
          >
            <Text>
              {isPokemonFavorite ? (
                <Ionicons name="heart" style={styles.loveSelected}></Ionicons>
              ) : (
                <Ionicons name="heart" style={styles.love}></Ionicons>
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View
          className="w-[100%] aspect-square relative"
          style={styles.flexCenter}
        >
          <View
            className={`absolute top-0 h-[100%] w-[100%] opacity-60 ${
              pokemonDetail.types &&
              getBackgroundColor(pokemonDetail.types[0].type.name)
            }`}
          ></View>
          <View
            className={`absolute top-[15%] rounded-full left-[12%] w-[75%] aspect-square bg-slate-300 opacity-40 ${
              pokemonDetail.types &&
              getBackgroundColor(pokemonDetail.types[0].type.name)
            }`}
          ></View>
          <View
            className={`absolute top-[30%] rounded-full left-[29%] w-[40%] aspect-square bg-slate-300 ${
              pokemonDetail.types &&
              getBackgroundColor(pokemonDetail.types[0].type.name)
            }`}
          ></View>
          {pokemonDetail.sprites ? (
            <Image
              style={styles.logo}
              source={{ uri: pokemonDetail.sprites.front_default }}
            />
          ) : (
            <Image
              style={styles.logo}
              source={require("../../assets/noimage.png")}
            />
          )}
        </View>
        <View className="w-[100%] py-4 px-4 flex gap-y-6">
          <View>
            <View className="flex justify-between flex-row items-center">
              <Text className="text-3xl font-medium">
                {pokemonDetail.forms[0].name}
              </Text>
              <View className="flex gap-2 flex-row">
                {pokemonDetail.types.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SearchCategorie", {
                          urlFetch: item.type.url,
                        })
                      }
                      key={index}
                      className={`text-slate-100 px-2 h-[23] rounded-full flex flex-row justify-center items-center ${
                        pokemonDetail.types &&
                        getBackgroundColor(item.type.name)
                      }`}
                    >
                      <Image
                        style={styles.imgType}
                        source={images[item.type.name]}
                      />
                      <Text className="text-slate-100 ml-[4]">
                        {item.type.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <Text className="text-lg font-normal text-slate-500">
              {pokemonDetail.height}0cm | {pokemonDetail.height}kg
            </Text>
          </View>
          <View>
            <Text className="text-xl font-medium text-slate-800">Variante</Text>
            <View className="flex flex-row">
              <Image
                className="w-[25%] aspect-square"
                source={{ uri: pokemonDetail.sprites.front_default }}
              />
              <Image
                className="w-[25%] aspect-square"
                source={{ uri: pokemonDetail.sprites.back_default }}
              />
              <Image
                className="w-[25%] aspect-square"
                source={{ uri: pokemonDetail.sprites.front_shiny }}
              />
              <Image
                className="w-[25%] aspect-square"
                source={{ uri: pokemonDetail.sprites.back_shiny }}
              />
            </View>
          </View>
          <View>
            <Text className="text-xl font-medium text-slate-800">
              Statistiques
            </Text>
            {pokemonDetail.stats.map((item, index) => {
              return (
                <View key={index} className="flex flex-row justify-between">
                  <Text className="text-lg font-normal text-slate-500">
                    {item.stat.name}
                  </Text>
                  <Text className="text-lg font-normal text-slate-500">
                    {item.base_stat}
                  </Text>
                </View>
              );
            })}
          </View>
          <View>
            <Text className="text-xl font-medium text-slate-800 mb-1">
              Spécificité
            </Text>
            <View className="divide-y-2 divide-slate-200/80 flex">
              {pokemonDetail.abilities.map((item, index) => {
                return (
                  <View key={index}>
                    <Competences url={item.ability.url} />
                  </View>
                );
              })}
            </View>
          </View>
          <View>
            <Text className="text-xl font-medium text-slate-800">
              Evolutions
            </Text>
            <View className="flex flex-row">
              {pokemonDetail.forms.map((item, index) => {
                return (
                  <View
                    key={index}
                    className="flex flex-col items-center w-[25%] "
                  >
                    <Image
                      className="w-[100%] aspect-square"
                      source={{ uri: pokemonDetail.sprites.front_default }}
                    />
                    <Text className="text-lg font-normal text-slate-500">
                      {item.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View>
            <Text className="text-xl font-medium text-slate-800">Attaques</Text>
            {pokemonDetail.moves.slice(0, 8).map((item, index) => {
              return (
                <Text
                  key={index}
                  className="text-lg font-normal text-slate-500"
                >
                  {item.move.name}
                </Text>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 330,
    height: 330,
  },
  imgType: {
    width: 15,
    height: 15,
  },
  arrowBack: {
    fontSize: 30,
    marginTop: 4,
  },
  love: {
    fontSize: 30,
    marginTop: 4,
    color: "lightgray",
  },
  loveSelected: {
    marginTop: 4,
    fontSize: 30,
    color: "#FF0000",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
