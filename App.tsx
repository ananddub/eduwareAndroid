import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Dimensions,
} from "react-native";
import {
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import Input from "./BasicComponent/Input";
import { useState } from "react";
import Animated from "react-native-reanimated";
function App() {
    const hieght1 = useSharedValue(Dimensions.get("window").height / 1.6);
    const hieght2 = useSharedValue(Dimensions.get("window").height / 1.7);
    const button = useSharedValue(15);
    const width = Dimensions.get("window").width;
    const [flag, setFlag] = useState(false);
    const onHandle = () => {
        if (flag) {
            hieght1.value = withTiming(Dimensions.get("window").height / 4.5, {
                duration: 500,
            });
            hieght2.value = withTiming(Dimensions.get("window").height / 5.2, {
                duration: 500,
            });
        } else {
            hieght1.value = withTiming(Dimensions.get("window").height / 1.6, {
                duration: 500,
            });
            hieght2.value = withTiming(Dimensions.get("window").height / 1.7, {
                duration: 500,
            });
        }
    };

    const onPressOut = () => {
        // button.value = withSequence(
        //     withSpring(20, { duration: 200 }),
        //     withSpring(15, { duration: 200 })
        // );
    };
    return (
        <View>
            <Animated.View
                style={{
                    height: hieght1,
                    width: width,
                    backgroundColor: "#FF762A",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ fontSize: 50, color: "white" }}>Welcome </Text>
            </Animated.View>
            <Animated.View
                style={{
                    position: "absolute",
                    marginTop: hieght2,
                    width: width,
                    flex: 1,

                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Animated.View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "white",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",

                            borderRadius: 10,
                            elevation: 5,
                        }}
                        onPress={() => {
                            setFlag(!flag);
                            onHandle();
                        }}
                        onPressOut={onPressOut}
                        activeOpacity={1}
                    >
                        <Text
                            style={{
                                color: "#FF762A",
                                fontWeight: "bold",
                                fontSize: 20,
                                padding: button.value,
                                paddingHorizontal: 60,
                            }}
                        >
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </View>
    );
}

export default App;
const styles = StyleSheet.create({
    box: {
        backgroundColor: "#FF762A",
    },
});
