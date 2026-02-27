import { FlatList } from "react-native";
import PlaceListItem from "./PlaceListItem";

export default function PlacesList() {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      keyExtractor={(item) => item.toString()}
      renderItem={() => <PlaceListItem />}
      showsVerticalScrollIndicator={false}
    />
  );
}
