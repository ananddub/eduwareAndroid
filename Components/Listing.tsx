import { Dimensions, FlatList, Text } from "react-native";
import { View } from "react-native";
import { TextInput } from "react-native";
const data = Array(100)
    .fill(0)
    .map((_, index) =>
        Object.create({
            id: index,
            name: "Anand Kumar Dubey",
            class: "XI",
            roll: "123",
            phone: "9876543210",
            status: "active",
            fname: "Vijay Kant Dubey",
            text: `$index ${index}`,
        })
    );

const renderItem = ({ item }: { item: any }) => {
    return (
        <View
            style={{
                backgroundColor: "white",
                padding: 10,
                borderWidth: 1,
                borderColor: "#E7E7E9",
                // marginHorizontal: 5,
                marginVertical: 1,
                // borderRadius: 10,
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexWrap: "wrap",

                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        backgroundColor: "#E7E7E9",
                        height: 50,
                        width: 50,
                        marginRight: 10,
                        borderRadius: 100,
                    }}
                ></View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        marginTop: 10,
                        justifyContent: "space-between",
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 13,
                                color: "#3C3C3C",
                            }}
                        >
                            {item.name}
                        </Text>
                        <Text
                            style={{
                                color: "#414147",
                                fontSize: 12,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                                padding: 2,
                                paddingHorizontal: 7,
                            }}
                        >
                            {item.fname}
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                backgroundColor: "#D1FAE4",
                                padding: 2,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                borderColor: "#D3F2E1",
                                color: "#227749",
                            }}
                        >
                            {item.id}
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                backgroundColor: "#FDEAD8",
                                padding: 2,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                borderColor: "#F5E2D0",
                                color: "#AB531A",
                            }}
                        >
                            {item.roll}
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                backgroundColor: "#ECDFFB",
                                padding: 2,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                borderColor: "#E3D8F0",
                                color: "#4C0F9F",
                            }}
                        >
                            {item.class}
                        </Text>
                    </View>
                </View>
                {/* <View>
                    <Text
                        style={{
                            marginLeft: 10,
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 16,

                            fontWeight: "bold",
                            color: "#4BA7E6",
                        }}
                    >
                        next
                    </Text>
                </View> */}
            </View>
        </View>
    );
};

export const Listing = (): JSX.Element => {
    const width: number = Dimensions.get("window").width;
    const height: number = Dimensions.get("window").height;

    return (
        <View>
            <FlatList
                style={{
                    marginTop: 100,
                    backgroundColor: "#F6F6F6",
                }}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};
