// NavigationContainer
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BasicDetail from "./Context/ProvideBasic";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { Listing } from "./Components/Listing";
const stack = createNativeStackNavigator();
function App(): JSX.Element {
    return <Listing />;
    return (
        <BasicDetail>
            <NavigationContainer>
                <stack.Navigator>
                    <stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            headerShown: false,
                            headerStyle: {
                                backgroundColor: "white",
                            },
                        }}
                    />
                    <stack.Screen name="Home" component={Home} />
                </stack.Navigator>
            </NavigationContainer>
        </BasicDetail>
    );
}

export default App;
