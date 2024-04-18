import {
    TextInput,
    StyleSheet,
    SafeAreaView,
    View,
    Dimensions,
} from "react-native";
import { useState } from "react";
function Input(props: { onchange: (e: any) => void; placeholder: string }) {
    const { onchange, placeholder } = props;
    const hieght: number = Dimensions.get("window").height;
    const width: number = Dimensions.get("window").width;
    const [focus, setFocus]: [boolean, (value: boolean) => void] =
        useState(false);
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    width: width,
                    padding: 40,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TextInput
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={onchange}
                    placeholder={placeholder}
                    style={[focus ? styles.inputFocus : styles.inputBlur]}
                />
            </View>
        </View>
    );
}

export default Input;
const styles = StyleSheet.create({
    inputFocus: {
        backgroundColor: "white",
        borderColor: "blue",
        color: "gray",
        padding: 3,
        paddingHorizontal: 10,
        fontSize: 25,
        borderWidth: 1,
        borderRadius: 5,
        width: "100%",
        height: 50,
    },
    inputBlur: {
        backgroundColor: "white",
        borderColor: "gray",
        padding: 3,
        paddingHorizontal: 10,
        fontSize: 25,
        borderWidth: 1,
        borderRadius: 5,
        width: "100%",
        height: 50,
    },
});
