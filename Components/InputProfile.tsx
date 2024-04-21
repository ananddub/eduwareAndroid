import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
} from "react-native";
import { Modal } from "react-native";
import ButtonAnimation from "../BasicComponent/Button";
const App = (props: { route: { params: any } }) => {
    const { data } = props.route.params;
    const { width, height } = useWindowDimensions();
    const [name, setName] = useState(data?.name);
    const [fatherName, setFatherName] = useState(data?.fname);
    const [motherName, setMotherName] = useState(data?.mname);
    const [address, setAddress] = useState(data?.pdist);
    const [phoneNum, setPhoneNum] = useState(data?.fmob);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [flag, setFag] = useState(new Array(6).fill(false));
    const handleSubmit = () => {
        // Handle form submission here
        console.log("Name:", name);
        console.log("Father's Name:", fatherName);
        console.log("Mother's Name:", motherName);
        console.log("Address:", address);
        console.log("Phone Number:", phoneNum);
        // alert("Data Store Sucessfully Added!");
        if (
            data?.name === name &&
            data?.fname === fatherName &&
            data?.mname === motherName &&
            data?.fmob === phoneNum &&
            data?.pdist === address
        ) {
            setVisible2(true);
        } else {
            setVisible(true);
        }
    };

    return (
        <View
            style={{
                width: width,
                height: height,
                flexDirection: "column",
                // justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "red",
                // paddingHorizontal: 10,
                backgroundColor: "#F1F5F9",
            }}
        >
            <Modal
                animationType="fade"
                visible={visible}
                transparent={true}
                onRequestClose={() => {
                    setVisible(false);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        paddingHorizontal: 30,
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 150,
                            backgroundColor: "#F1F5F9",
                            flexDirection: "Column",
                            borderRadius: 20,
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "500",
                                color: "#4B5563",
                                textAlign: "center",
                            }}
                        >
                            Data Success fully Submited
                        </Text>
                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={{
                                width: 200,
                                height: 50,

                                backgroundColor: "#32AD29",
                                borderRadius: 25,
                                elevation: 32,
                                shadowColor: "#32AD29",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "400",
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                visible={visible2}
                transparent={true}
                onRequestClose={() => {
                    setVisible2(false);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        paddingHorizontal: 30,
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 150,
                            backgroundColor: "#F1F5F9",
                            flexDirection: "Column",
                            borderRadius: 20,
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "500",
                                color: "#4B5563",
                                textAlign: "center",
                            }}
                        >
                            No changes made
                        </Text>
                        <TouchableOpacity
                            onPress={() => setVisible2(false)}
                            style={{
                                width: 200,
                                height: 50,

                                backgroundColor: "#FF3E03",
                                borderRadius: 25,
                                elevation: 32,
                                shadowColor: "#FF3E03",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "400",
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                Done
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View
                style={{
                    // flex: 1,
                    width: "100%",
                    height: height,
                    alignItems: "center",
                    backgroundColor: "white",
                    // borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 30,
                }}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        onPressIn={() => {
                            setFag(new Array(6).fill(false));
                            setFag(flag.map((_, x) => x == 0));
                        }}
                        style={flag[0] ? styles.finput : styles.input}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Father's Name</Text>
                    <TextInput
                        onPressIn={() => {
                            setFag(new Array(6).fill(false));
                            setFag(flag.map((_, x) => x == 1));
                        }}
                        style={flag[1] ? styles.finput : styles.input}
                        placeholder="Enter father's name"
                        value={fatherName}
                        onChangeText={setFatherName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mother's Name</Text>
                    <TextInput
                        onPressIn={() => {
                            setFag(new Array(6).fill(false));
                            setFag(flag.map((_, x) => x == 2));
                        }}
                        style={flag[2] ? styles.finput : styles.input}
                        placeholder="Enter mother's name"
                        value={motherName}
                        onChangeText={setMotherName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        onPressIn={() => {
                            setFag(new Array(6).fill(false));
                            setFag(flag.map((_, x) => x == 3));
                        }}
                        style={flag[3] ? styles.finput : styles.input}
                        placeholder="Enter your address"
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        onPressIn={() => {
                            setFag(new Array(6).fill(false));
                            setFag(flag.map((_, x) => x == 4));
                        }}
                        style={flag[4] ? styles.finput : styles.input}
                        placeholder="Enter your phone number"
                        value={phoneNum}
                        onChangeText={setPhoneNum}
                        keyboardType="numeric"
                    />
                </View>
                <View
                    style={{
                        top: -300,
                    }}
                >
                    <ButtonAnimation
                        onPrssedKey={handleSubmit}
                        styles={{
                            color: "white",
                            backgroundColor: "#FF762A",
                            fontWeight: "bold",
                            fontSize: 20,
                            width: width / 1.3,
                            borderRadius: 10,
                        }}
                        text="Save"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    label: {
        width: 120,
        marginRight: 10,
        fontSize: 16,
        fontWeight: "500",
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: "#F1F5F9",
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    finput: {
        flex: 1,
        height: 40,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#FF762A",
        borderRadius: 10,
        paddingHorizontal: 10,
    },
});

export default App;
