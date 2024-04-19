import { View, Text, Dimensions } from "react-native";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ScrollView, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
const setSvg = (path: string) => {};
function Home() {
    const height = Dimensions.get("window").height;
    const width = Dimensions.get("window").width;
    return (
        <View
            style={{
                height: height,
                width: width,
                backgroundColor: "#F1F5F9",
            }}
        >
            <ScrollView>
                <View
                    style={{
                        width: width,
                        height: 200,
                        backgroundColor: "white",

                        // backgroundColor: "#E2E8F0",
                        // borderRadius: 50,
                        flexDirection: "column",
                        marginBottom: 10,

                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            marginTop: 50,
                            marginLeft: 10,
                            flexDirection: "row",
                        }}
                    >
                        <Image
                            source={{ uri: "https://picsum.photos/200" }}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100 / 2,
                                borderWidth: 2,
                                borderColor: "gray",
                            }}
                        />
                        <Text
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 10,
                                fontSize: 17,
                                fontWeight: "500",
                            }}
                        >
                            Anand Kumar Dubey
                        </Text>
                    </View>
                    <View
                        style={{
                            marginLeft: 80,
                            marginTop: 80,
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                backgroundColor: "white",
                                width: 120,
                                textAlign: "center",
                                padding: 2,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                            }}
                        >
                            Vijay Kant Dubey
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: "center",
                                padding: 2,
                                marginLeft: 10,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                borderWidth: 1,
                                backgroundColor: "#ECDFFB",
                                borderColor: "#E3D8F0",
                                color: "#4C0F9F",
                            }}
                        >
                            ASIS192000047
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                marginTop: 10,
                                marginLeft: 80,
                                width: 100,
                                fontSize: 14,
                                textAlign: "center",
                                padding: 2,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                borderWidth: 1,
                                backgroundColor: "#FDEAD8",
                                borderColor: "#F5E2D0",
                                color: "#AB531A",
                            }}
                        >
                            Roll 100
                        </Text>
                        <Text
                            style={{
                                marginTop: 10,
                                marginLeft: 10,
                                width: 100,
                                fontSize: 14,
                                textAlign: "center",
                                padding: 2,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                borderWidth: 1,
                                backgroundColor: "#FFE4E6",
                                borderColor: "#FFE4E6",
                                color: "#BE123C",
                            }}
                        >
                            Class A
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                marginTop: 10,
                                marginLeft: 80,
                                width: 100,
                                fontSize: 14,
                                textAlign: "center",
                                padding: 2,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                borderWidth: 1,
                                backgroundColor: "#D1FAE4",
                                borderColor: "#D3F2E1",
                                color: "#227749",
                            }}
                        >
                            Section A
                        </Text>
                    </View>
                </View>
                {/* 1st part */}

                <View style={styles.flexdata}>
                    <TouchableOpacity style={styles.box}>
                        <Svg
                            style={{
                                width: 60,
                                height: 60,
                                top: 1,
                                position: "absolute",
                            }}
                            viewBox="0 0 24 24"
                        >
                            <Path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v5H8v2h3v3h2v-3h3v-2h-3z"
                                fill="#000"
                            />
                        </Svg>
                        <Text style={styles.text}>Annoucement</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>HomeWork</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>Attendence</Text>
                    </TouchableOpacity>
                </View>
                {/* 2nd part */}
                <View style={styles.flexdata}>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>Marks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>Econtent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>Fees Payment</Text>
                    </TouchableOpacity>
                </View>
                {/* 3rd part */}
                <View style={styles.flexdata}>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>Anual Calendar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>Bus Location</Text>
                    </TouchableOpacity>
                </View>
                {/* 4th part */}
                <View style={styles.flexdata}>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>Notice Board</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>Settings</Text>
                    </TouchableOpacity>
                </View>
                {/* 5th part */}
                <View style={styles.flexdata}>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>Write To School</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>Online Class</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Text style={styles.text}>Online Test</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }}></View>
            </ScrollView>
            {/* <View
                style={{
                    width: width,
                    flexDirection: "row",
                    alignItems: "center",
                    // alignItems: "flex-end",
                    justifyContent: "space-around",
                    height: "7%",
                    position: "absolute",
                    elevation: 2,
                    shadowColor: "gray",
                    backgroundColor: "white",
                    bottom: 0,
                }}
            >
                <TouchableOpacity style={styles.botomTap}>
                    <Text>A</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botomTap}>
                    <Text>A</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botomTap}>
                    <Text>A</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botomTap}>
                    <Text>A</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    box: {
        width: "30%",
        maxWidth: 110,
        height: 100,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#F1F5F9",
        elevation: 6,
        shadowColor: "#94A3B8",
    },
    flexdata: {
        width: "100%",
        height: 100,
        marginTop: "3%",
        backgroundColor: "#F1F5F9",
        flexDirection: "row",
        justifyContent: "space-around",
        borderColor: "white",
    },
    botomTap: {
        height: "95%",
        width: "24.6%",
        borderRadius: 5,
        backgroundColor: "",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 14,
        fontWeight: "400",
        position: "absolute",
        bottom: 10,
    },
});
