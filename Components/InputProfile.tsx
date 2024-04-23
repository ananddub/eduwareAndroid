import React, { useEffect, useState } from "react";
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
import {
    dataSelector,
    setFetchData,
    setuserAdm,
    setuserFatherName,
    setuserName,
} from "../app/Data/userValue";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Circle } from "react-native-animated-spinkit";
const App = (props: { route: { params: any } }) => {
    const { data } = props.route.params;
    const { width, height } = useWindowDimensions();
    const [name, setName] = useState(data?.name);
    const [fatherName, setFatherName] = useState(data?.fname);
    const [motherName, setMotherName] = useState(data?.mname);
    const userData = useAppSelector(dataSelector);
    const dispatch = useAppDispatch();
    const [fetchData, setFetchDatas] = useState<any>(userData.userData);
    const [address, setAddress] = useState(data?.pdist);
    const [visible, setVisible] = useState(false);
    const [spin, setSpin] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [flag, setFag] = useState(new Array(6).fill(false));
    const handleSubmit = () => {
        // Handle form submission here
        console.log("Name:", name);
        console.log("Father's Name:", fatherName);
        console.log("Mother's Name:", motherName);
        console.log("Address:", address);
        // alert("Data Store Sucessfully Added!");
        if (
            data?.name === name &&
            data?.fname === fatherName &&
            data?.mname === motherName &&
            data?.pdist === address
        ) {
            setVisible2(true);
        } else {
            setConfirm(true);
        }
    };
    const Update = () => {
        const header = new Headers();
        header.append("Content-Type", "application/json");
        const raw = {
            method: "PUT",
            headers: header,
            body: JSON.stringify({
                admno: data?.admno,
                name: name,
                fname: fatherName,
                mname: motherName,
                pdist: address,
            }),
        };
        fetch(`${userData?.url}profileupdate`, raw)
            .then(async (resp: any) => {
                if (resp.status === 200) {
                    await resp.json().then((data: any) => {
                        console.log("response Data ", data);
                        if (data.status === true) {
                            setSpin(true);
                            fetch(
                                `${userData.url}paymentDetails?admno=${userData.userAdm}`
                            )
                                .then((response: any) => {
                                    if (response.status === 200) {
                                        response.json().then((data: any) => {
                                            try {
                                                if (data.status === false) {
                                                    return;
                                                }
                                                // console.log(data);
                                                setFetchDatas(data.data);
                                                setSpin(false);
                                                setVisible(true);
                                                // setVisible(true);
                                            } catch (err: any) {}
                                        });
                                    }
                                })
                                .catch((error: any) => {
                                    console.log(error);
                                });
                        }
                    });
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    useEffect(() => {
        dispatch(setuserName(name));
        dispatch(setuserFatherName(fatherName));
        dispatch(setFetchData(fetchData));
        console.log(userData.userData?.tbl_admission.fname);
    }, [visible]);

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
                visible={spin}
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
                    <Circle size={80} color="white"></Circle>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                visible={confirm}
                transparent={true}
                onRequestClose={() => {
                    // setVisible(false);
                    setConfirm(false);
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
                            Confirm Update?
                        </Text>
                        <View
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    {
                                        Update();
                                        setConfirm(false);
                                        setVisible(false);
                                    }
                                }}
                                style={{
                                    width: "40%",
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
                                    Yes
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setConfirm(false);
                                    setVisible(false);
                                }}
                                style={{
                                    width: "40%",
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
                                    No
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
                                color: "gray",
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
                                    color: "gray",

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
                        onChangeText={(e: string) => setName(e.toUpperCase())}
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
                        onChangeText={(e: string) =>
                            setFatherName(e.toUpperCase())
                        }
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
                        onChangeText={(e: string) =>
                            setMotherName(e.toUpperCase())
                        }
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
                        onChangeText={(e: string) =>
                            setAddress(e.toUpperCase())
                        }
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
        color: "gray",

        fontSize: 16,
        fontWeight: "500",
    },
    input: {
        flex: 1,
        height: 40,
        color: "gray",

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
