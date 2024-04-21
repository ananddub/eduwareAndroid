import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
} from "react-native";

export default function Cameras() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [capturedPhoto, setCapturedPhoto] = useState(null);

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    async function takePicture() {
        if (this.camera) {
            const photo = await this.camera.takePictureAsync();
            setCapturedPhoto(photo);
        }
    }

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={(ref) => {
                    this.camera = ref;
                }}
                style={styles.camera}
                type={type}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraType}
                    >
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={takePicture}
                    >
                        <Text style={styles.text}>Take Picture</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            {capturedPhoto && (
                <View style={styles.preview}>
                    <Text style={styles.previewText}>Preview</Text>
                    <Image
                        source={{ uri: capturedPhoto.uri }}
                        style={styles.previewImage}
                    />
                    <TouchableOpacity
                        style={{
                            width: "50%",
                            paddingVertical: 10,
                            borderRadius: 20,
                            elevation: 10,
                            shadowColor: "#399DFF",
                            shadowOpacity: 1,
                            backgroundColor: "#399DFF",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "500" }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
        borderColor: "white",
        borderWidth: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 20,
        justifyContent: "center",
    },
    button: {
        alignSelf: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    preview: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    previewText: {
        fontSize: 24,
        color: "white",
        marginBottom: 20,
    },
    previewImage: {
        width: 200,
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
});
