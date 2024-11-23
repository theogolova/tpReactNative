import HomeMenu from "./src/components/HomeMenu";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import NuevoPost from "./src/screens/NuevoPost"; 
import Usuarios from "./src/screens/Usuarios"; 

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeMenu"
          component={HomeMenu}
        />
        <Stack.Screen
          name="NuevoPost" 
          component={NuevoPost}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Usuarios"
          component={Usuarios}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
