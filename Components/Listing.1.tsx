import { Dimensions, FlatList, Text } from "react-native";
import { View } from "react-native";
import { data, renderItem } from "./Listing";

export const Listing = (): JSX.Element => {
    const width: number = Dimensions.get("window").width;
    const height: number = Dimensions.get("window").height;

    return (
        <View
            style={{
                flex: 1,
                marginTop: 100,
                flexDirection: "column",
            }}
        >
            <View
                style={
                    {
                        // flex: 1,
                        // flexDirection: "row",
                        // justifyContent: "space-between",
                        // backgroundColor: "red",
                    }
                }
            >
                <Text>id</Text>
                <Text>id</Text>
                <Text>id</Text>
                <Text>id</Text>
                <Text>id</Text>
                {/* <TextInput placeholder="Search" /> */}
            </View>
            <View
                style={{
                    flex: 1,
                }}
            >
                <FlatList
                    style={
                        {
                            // backgroundColor: "#F6F6F6",
                        }
                    }
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
};
