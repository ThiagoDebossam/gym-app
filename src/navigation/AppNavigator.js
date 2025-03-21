import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { ActivityIndicator, View } from "react-native";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import RegisterStudentScreen from "../screens/RegisterStudentScreen";
import StudentListScreen from "../screens/StudentListScreen";
import StudentTrainingsScreen from "../screens/StudentTrainingsScreen";
import CreateTrainingScreen from "../screens/CreateTrainingScreen";
import CreateExerciseScreen from "../screens/CreateExerciseScreen";
import TrainingDetailsScreen from "../screens/TrainingDetailsScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RegisterStudent" component={RegisterStudentScreen} />
            <Stack.Screen name="StudentList" component={StudentListScreen} />
            <Stack.Screen name="StudentTrainings" component={StudentTrainingsScreen} />
            <Stack.Screen name="CreateTraining" component={CreateTrainingScreen} />
            <Stack.Screen name="CreateExercise" component={CreateExerciseScreen} />
            <Stack.Screen name="TrainingDetails" component={TrainingDetailsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
