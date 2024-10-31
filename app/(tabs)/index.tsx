import { useState } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import tw from "twrnc";
export default function HomeScreen() {
  const [invalid, setInvalid] = useState(true);
  return (
    <SafeAreaView style={tw`flex h-full w-full bg-blue-500`}>
      <StatusBar barStyle="dark-content" />
      <View style={tw`mt-12`}>
        <Text style={tw`text-green-500`}>Hello</Text>
      </View>
    </SafeAreaView>
  );
}
