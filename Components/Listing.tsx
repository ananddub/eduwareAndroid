import { Dimensions, FlatList, Image, Text } from "react-native";
import { View } from "react-native";
import { TextInput } from "react-native";
const data = Array(100)
    .fill(0)
    .map((_, index) =>
        Object.create({
            id: index,
            sec: "A",
            name: "Anand Kumar Dubey",
            class: "XI",
            adm: "ADFSDGB1345",
            roll: "123",
            phone: "9876543210",
            status: "active",
            fname: "Vijay Kant Dubey",
            text: `$index ${index}`,
        })
    );
data[0].name = "anand";
data[5].name = "temp";

const renderItem = ({ item }: { item: any }) => {
    return (
        <View
            style={{
                backgroundColor: "white",
                padding: 10,
                borderWidth: 1,
                borderColor: "#EAEBEF",
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "row",
                }}
            >
                <Image
                    source={{ uri: "https://picsum.photos/200" }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100 / 2,
                        marginRight: 10,
                    }}
                />
                <View></View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        marginTop: 5,
                        justifyContent: "space-between",
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                color: "#3C3C3C",
                            }}
                        >
                            {item.name}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: 120,
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    backgroundColor: "#D1FAE4",
                                    borderColor: "#D3F2E1",
                                    color: "#227749",
                                    padding: 2,
                                    fontSize: 12,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                }}
                            >
                                {item.sec}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    backgroundColor: "#FDEAD8",
                                    borderColor: "#F5E2D0",
                                    color: "#AB531A",
                                    padding: 2,
                                    fontSize: 12,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                }}
                            >
                                {item.roll}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    backgroundColor: "#ECDFFB",
                                    borderColor: "#E3D8F0",
                                    color: "#4C0F9F",
                                    fontSize: 12,
                                    padding: 2,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                }}
                            >
                                {item.class}
                            </Text>
                        </View>
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
            <View
                style={{
                    flex: 1,
                    position: "absolute",
                    flexDirection: "row",
                    marginTop: 45,
                }}
            >
                <Text
                    style={{
                        marginLeft: 70,
                        color: "#414147",
                        fontSize: 12,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#D1D5DB",
                        paddingHorizontal: 7,
                    }}
                >
                    {item.fname}
                </Text>
                <Text
                    style={{
                        marginLeft: 10,
                        color: "#414147",
                        fontSize: 12,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#D1D5DB",
                        paddingHorizontal: 7,
                    }}
                >
                    {item.adm}
                </Text>
            </View>
        </View>
    );
};

export const Listing = (): JSX.Element => {
    const width: number = Dimensions.get("window").width;
    const height: number = Dimensions.get("window").height;

    return (
        <View>
            <View
                style={{
                    marginTop: 100,
                    flexDirection: "row",
                    marginBottom: 5,
                    paddingHorizontal: 6,
                    marginHorizontal: 5,
                    // justifyContent: "center",
                }}
            >
                <TextInput
                    style={{
                        width: "100%",
                        height: 40,
                        backgroundColor: "#F5F5F5",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#D1D5DB",
                        paddingHorizontal: 10,
                    }}
                    placeholder="Search..."
                />
            </View>
            {/* <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "space-between",
                }}
            >
                <Text
                    style={{
                        marginLeft: 75,
                    }}
                >
                    Name
                </Text>
                <View
                    style={{
                        width: 150,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            backgroundColor: "#D1FAE4",
                            borderColor: "#D3F2E1",
                            color: "#227749",
                            borderRadius: 10,
                            borderWidth: 1,
                            paddingHorizontal: 5,
                        }}
                    >
                        Sec
                    </Text>
                    <Text
                        style={{
                            borderRadius: 10,
                            borderWidth: 1,

                            backgroundColor: "#FDEAD8",
                            borderColor: "#F5E2D0",
                            color: "#AB531A",
                            paddingHorizontal: 5,
                        }}
                    >
                        Roll
                    </Text>
                    <Text
                        style={{
                            borderRadius: 10,
                            borderWidth: 1,
                            marginRight: 10,
                            backgroundColor: "#ECDFFB",
                            borderColor: "#E3D8F0",
                            color: "#4C0F9F",
                            paddingHorizontal: 5,
                        }}
                    >
                        Class
                    </Text>
                </View>
            </View> */}
            <View style={{ padding: 2 }}></View>
            <FlatList
                style={{
                    backgroundColor: "#F8F8FA",
                }}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};
