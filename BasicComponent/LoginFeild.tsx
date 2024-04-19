import { View, Text } from "react-native";
import Input from "./Input";
import ButtonAnimation from "./Button";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { userDetail } from "../Context/globalUsername";
import { URL } from "../Context/Address";
import { Circle } from "react-native-animated-spinkit";
function LoginFeild(props: { fun: () => void }): JSX.Element {
    const width = Dimensions.get("window").width;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isExisting, setIsExisting] = useState(false);
    const [isDoesNot, setDoenNot] = useState(false);
    const contextDetail = useContext(userDetail);
    const onSubmit = async () => {
        setIsExisting(true);
        fetch(`${URL}phoneVerfication?phone=${username}`).then(
            async (response: Response) => {
                if (response.status === 200) {
                    const value: { status: boolean; data: any } =
                        await response.json();
                    if (value.status) {
                        setIsExisting(false);
                        const data = value.data[0];
                        // contextDetail.setUserAdm(data.admno);
                        // contextDetail.setUserClass(data.class);
                        // contextDetail.setUserRoll(data.roll);
                        // contextDetail.setUserSession(data.session);
                        // contextDetail.setUserStatus(data.active);
                        contextDetail.setUserPhone(username);
                        // contextDetail.setUserFatherName(data.fname);
                        // contextDetail.setUserUserName(data.name);
                        props.fun();
                    } else {
                        setTimeout(() => {
                            setDoenNot(true);
                            setIsExisting(false);
                        }, 1000);
                    }
                }
            }
        );
        console.log(username, "\n", password);
    };
    return (
        <View style={{ marginTop: 30 }}>
            <Input
                onchange={(e) => {
                    setUsername(e);
                    setDoenNot(false);
                }}
                flag={false}
                numberic={true}
                placeholder="Enter your phone number"
            />
            {isDoesNot === true && (
                <Text
                    style={{
                        textAlign: "right",
                        fontSize: 12,
                        paddingHorizontal: 50,
                        fontWeight: "bold",
                        paddingBottom: 10,
                        color: "#FF8F50",
                    }}
                >
                    user does not exist
                </Text>
            )}
            <Input onchange={setPassword} flag={true} placeholder="password" />
            <View
                style={{
                    width: width,
                    paddingHorizontal: 50,
                    flex: 1,
                    alignItems: "flex-end",
                }}
            >
                <TouchableOpacity>
                    <Text
                        style={{
                            textAlign: "right",
                            fontSize: 12,
                            fontWeight: "bold",
                            paddingBottom: 10,
                            color: "#FF8F50",
                        }}
                    >
                        Forgot Password
                    </Text>
                </TouchableOpacity>
            </View>
            <ButtonAnimation
                onPrssedKey={onSubmit}
                styles={{
                    color: "white",
                    backgroundColor: "#FF762A",
                    fontWeight: "bold",
                    fontSize: 20,
                    width: width / 1.3,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                }}
                flags={isExisting == true}
                text="Sign"
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                }}
            >
                <Text style={{ color: "gray" }}>Don't have an account? </Text>
                <TouchableOpacity>
                    <Text style={{ color: "#FF762A", fontWeight: "bold" }}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default LoginFeild;
