import * as Font from "expo-font";
import { useState } from "react";
import {
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
} from "react-native";
import ProfileInputTable from "../BasicComponent/ProfileInput";
import { Svg, Path } from "react-native-svg";
import { ProfileEditable } from "../Context/Class";
const onChangeData = (state: ProfileEditable, title: string, data: string) => {
    switch (title) {
        case "name":
            state.userName = data;
            break;
        case "email":
            state.userMailId = data;
            break;
        case "phone":
            state.userPhone = data;
            break;
        case "houseNumber":
            state.userHouseNo = data;
            break;
        case "fname":
            state.userFatherName = data;
        case "mname":
            state.userMotherName = data;
        case "Address":
            state.userAddress = data;
            break;
        case "dob":
            state.userAddress = data;
    }
};
function Profile() {
    const [isEditable, setIsEditable]: [boolean, (value: boolean) => void] =
        useState(true);
    const hieght: number = Dimensions.get("window").height;
    const width: number = Dimensions.get("window").width;
    const onChange = (title: string, value: string) => {};
    return (
        <View
            style={{
                width: width,
                height: hieght,
                backgroundColor: "#F1F5F9",
            }}
        >
            <ScrollView>
                <View
                    style={{
                        bottom: -120,
                        width: width,
                        height: 150,
                        backgroundColor: "white",
                        // elevation: 5,
                    }}
                ></View>
                <View
                    style={{
                        position: "absolute",
                        width: width,
                        height: 150,
                        backgroundColor: "#000000",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            left: 10,
                            top: 20,
                        }}
                    >
                        <Svg
                            width={40}
                            height={40}
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <Path
                                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                                fill="white"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <Image
                        source={{ uri: "https://picsum.photos/200" }}
                        style={{
                            bottom: -60,
                            width: 120,
                            height: 120,
                            position: "absolute",
                            // backgroundColor: "red",
                            borderWidth: 3,

                            borderColor: "white",
                            borderRadius: 1000 / 2,
                        }}
                    />
                </View>
                <View
                    style={{
                        marginTop: 60,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "500",
                            color: "black",
                        }}
                    >
                        Anand Kumar Dubey
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "500",
                            color: "gray",
                        }}
                    >
                        ASIS192000047
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: 10,
                        width: width,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "baseline",
                        }}
                    >
                        <View style={styles.textContainer}>
                            <ProfileInputTable
                                name="name"
                                title="Name"
                                isEditable={isEditable}
                                placeholder="Enter your name"
                                value="Anand Kumar Dubey"
                                onChange={onChange}
                            />
                            <ProfileInputTable
                                name="class"
                                title="Class"
                                isEditable={false}
                                placeholder="Enter your class"
                                value="10"
                                onChange={onChange}
                            />
                            <ProfileInputTable
                                name="section"
                                title="Section"
                                isEditable={false}
                                placeholder="Enter your section"
                                value="A"
                                onChange={onChange}
                            />
                            <ProfileInputTable
                                name="roll"
                                title="Roll No"
                                isEditable={false}
                                placeholder="Enter your roll number"
                                value="001"
                                onChange={onChange}
                            />
                            <ProfileInputTable
                                name="adm"
                                title="Adm No"
                                isEditable={false}
                                placeholder="Enter your admission number"
                                value="123456"
                                onChange={onChange}
                            />
                            <ProfileInputTable
                                name="address"
                                title="Address"
                                isEditable={isEditable}
                                placeholder="Enter your address"
                                value="Blue"
                                onChange={onChange}
                            />
                            <ProfileInputTable
                                name="dob"
                                title="DOB"
                                isEditable={isEditable}
                                placeholder="Enter your date of birth"
                                value="01/01/2000"
                                onChange={onChange}
                            />
                            <ProfileInputTable
                                name="fname"
                                title="Father's Name"
                                isEditable={isEditable}
                                placeholder="Enter your father's name"
                                value="John Doe"
                                onChange={onChange}
                            />
                            <ProfileInputTable
                                title="mname"
                                title="Mother's Name"
                                isEditable={isEditable}
                                placeholder="Enter your mother's name"
                                value="Jane Doe"
                                onChange={onChange}
                            />
                            <ProfileInputTable
                                name="phone"
                                title="Contact No"
                                isEditable={isEditable}
                                placeholder="Enter your contact number"
                                value="1234567890"
                                onChange={onChange}
                            />
                            <ProfileInputTable
                                name="email"
                                title="Mail Id"
                                isEditable={isEditable}
                                placeholder="Enter your email address"
                                value="example@example.com"
                                onChange={onChange}
                            />
                            <ProfileInputTable
                                name="trans"
                                title="Trans"
                                isEditable={false}
                                placeholder="Enter your transportation status"
                                value="Yes"
                                onChange={onChange}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Profile;
const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: "500",
        maxWidth: 200,
        color: "#4B5563",
        backgroundColor: "white",
        flexDirection: "column",
        paddingLeft: 20,
        paddingTop: 20,
    },
    focus: {
        fontSize: 15,
        fontWeight: "500",
        maxWidth: 200,
        marginTop: 2,
        color: "#4B5563",
        backgroundColor: "red",
        flexDirection: "column",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    textContainer: {
        width: "100%",
        height: "100%",
        // maxWidth: 500,
        elevation: 5,
        shadowColor: "gray",
        backgroundColor: "white",
        flexDirection: "column",
        marginTop: 50,
        // borderRadius: 20,
    },
});
