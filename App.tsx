// NavigationContainer
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BasicDetail from "./Context/ProvideBasic";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { Provider } from "react-redux";
import Profile from "./Components/Profile";
import { Listing } from "./Components/Listing";
import { store } from "./app/sotre";
// 9122036829
const stack = createNativeStackNavigator();
function App(): JSX.Element {
    // return ;
    return (
        <BasicDetail>
            <NavigationContainer>
                <Provider store={store}>
                    <stack.Navigator>
                        <stack.Screen
                            name="Profile"
                            component={Profile}
                            options={{
                                headerShown: false,
                                headerStyle: {
                                    backgroundColor: "white",
                                },
                            }}
                        />
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
                        <stack.Screen
                            name="Listing"
                            options={{
                                headerShown: false,
                                headerStyle: {
                                    backgroundColor: "white",
                                },
                            }}
                            component={Listing}
                        />
                        <stack.Screen
                            name="Home"
                            component={Home}
                            options={{
                                headerShown: false,
                                headerStyle: {
                                    backgroundColor: "#F1F5F9",
                                },
                            }}
                        />
                    </stack.Navigator>
                </Provider>
            </NavigationContainer>
        </BasicDetail>
    );
}

export default App;
