import { View, TextInput, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
function ProfileInputTable(props: {
    title: string;
    isEditable: boolean;
    placeholder: string;
    value: string;
    name: string;
    onChange: (title: string, value: string) => void;
}): JSX.Element {
    const { title, name, isEditable, placeholder, value, onChange } = props;
    const [text, setText] = useState(value);
    useEffect(() => {
        onChange(name, text);
    }, [text]);
    return (
        <View
            style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 5,
                paddingVertical: 5,
            }}
        >
            <Text style={styles.text}>{title}</Text>
            <TextInput
                style={isEditable == true ? styles.focus : styles.etext}
                onChangeText={(e) => setText(e)}
                placeholder={placeholder}
                editable={isEditable}
                value={text}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: "500",
        maxWidth: 200,
        color: "#4B5563",
        backgroundColor: "white",
        flexDirection: "column",
        paddingLeft: 20,
        borderRadius: 10,
        paddingTop: 20,
    },
    etext: {
        fontSize: 15,
        fontWeight: "500",
        width: 200,
        color: "#4B5563",
        backgroundColor: "white",
        flexDirection: "column",
        paddingLeft: 20,
        paddingTop: 20,
    },
    focus: {
        fontSize: 15,
        fontWeight: "500",
        width: 200,
        marginTop: 5,
        marginLeft: 10,
        color: "#4B5563",
        backgroundColor: "white",
        flexDirection: "column",
        borderRadius: 10,
        borderColor: "#F97316",
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});

export default ProfileInputTable;
