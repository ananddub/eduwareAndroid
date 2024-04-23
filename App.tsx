// NavigationContainer
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BasicDetail from './Context/ProvideBasic';
import Login from './Components/Login';
import Home from './Components/Home';
import {Provider} from 'react-redux';
import Profile from './Components/Profile';
import {Listing} from './Components/Listing';
import {store} from './app/sotre';
import InputProfile from './Components/InputProfile';
import Testing from './Components/Test';
import Payment from './Components/payment';
import Input from './BasicComponent/Input';
import {useNavigation} from '@react-navigation/native';
import InputPaymentProfile from './Components/InnputPayment';
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
              name="Edit Profile"
              component={InputProfile}
              initialParams={{data: {fmob: ''}}}
              listeners={{
                beforeRemove: () => {
                  console.log('back key pressed');
                  return;
                },
              }}
              options={{
                headerStyle: {
                  backgroundColor: 'white',
                },
                animation: 'ios',
                animationDuration: 1000,

                headerBackButtonMenuEnabled: true,
              }}
            />
            <stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: 'white',
                },
              }}
            />

            <stack.Screen
              name="Listing"
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: 'white',
                },
                animation: 'ios',
              }}
              component={Listing}
            />
            <stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: '#F1F5F9',
                },
              }}
            />
            {/* 
                        <stack.Screen
                            name="Edit Profile"
                            component={InputProfile}
                            initialParams={{ data: { fmob: "" } }}
                            listeners={{
                                beforeRemove: () => {
                                    console.log("back key pressed");
                                    return;
                                },
                            }}
                            options={{
                                headerStyle: {
                                    backgroundColor: "white",
                                },
                                animation: "ios",
                                animationDuration: 1000,

                                headerBackButtonMenuEnabled: true,
                            }}
                        /> */}
            <stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: 'white',
                },
                animation: 'ios',
                animationDuration: 1000,
              }}
            />
            <stack.Screen
              name="Fee Payment Profile"
              component={Payment}
              options={{
                // headerShown: false,
                headerStyle: {
                  backgroundColor: 'white',
                },
                animation: 'ios',
                animationDuration: 1000,
              }}
            />
            <stack.Screen
              name="Select Month"
              component={InputPaymentProfile}
              options={{
                // headerShown: false,
                headerStyle: {
                  backgroundColor: 'white',
                },
                animation: 'ios',
                animationDuration: 1000,
              }}
            />
          </stack.Navigator>
        </Provider>
      </NavigationContainer>
    </BasicDetail>
  );
}

export default App;
