import { Tabs } from "expo-router";
import { View, StyleSheet, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { UserIcon } from "@/assets/icons";
import { useMemo, useEffect } from "react";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

const TAB_BAR_HEIGHT = 65;
const CENTER_BUTTON_SIZE = 60;
const BORDER_RADIUS = 30;

interface TabIconProps {
  isCenterIcon?: boolean;
  focused: boolean;
  icon: React.ReactNode;
}

const TabIcon = ({ icon, focused, isCenterIcon = false }: TabIconProps) => {
  const animation = useSharedValue(0);

  useEffect(() => {
    if (focused) {
      animation.value = withSpring(1, {
        damping: 10,
        stiffness: 100,
      });
    } else {
      animation.value = withTiming(0, {
        duration: 200,
      });
    }
  }, [focused, animation]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animation.value,
      [0, 1],
      [1, isCenterIcon ? 1.1 : 1.2]
    );

    return {
      transform: [{ scale }],
    };
  });

  if (isCenterIcon) {
    return (
      <Animated.View style={[styles.centerButton, animatedStyle]}>
        {icon}
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.tabIcon, animatedStyle]}>
      {icon}
    </Animated.View>
  );
};

export default function Layout() {
  const screenOptions = useMemo<BottomTabNavigationOptions>(() => ({
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "#666666",
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: "#1C1C1E",
      borderRadius: BORDER_RADIUS,
      height: TAB_BAR_HEIGHT,
      position: "absolute",
      bottom: Platform.OS === 'ios' ? 20 : 10,
      left: 20,
      right: 20,
      paddingBottom: 0,
      borderTopWidth: 0,
      elevation: 0,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
  }), []);

  const tabScreens = [
    {
      name: "home",
      title: "Home",
    },
    {
      name: "profile",
      title: "Profile",
    },
  ];

  return (
    <View style={styles.container}>
      <Tabs
        initialRouteName="home"
        screenOptions={screenOptions}
      >
        {tabScreens.map((screen) => (
          <Tabs.Screen
            key={screen.name}
            name={screen.name}
            options={{
              title: screen.title,
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  isCenterIcon={screen.isCenterIcon}
                  icon={
                    screen.isCenterIcon ? (
                      <View style={styles.centerIconWrapper}>
                        <UserIcon color="white"  />
                      </View>
                    ) : (
                      <UserIcon
                        color={focused ? "white" : "#666666"}
                      />
                    )
                  }
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: CENTER_BUTTON_SIZE,
    height: CENTER_BUTTON_SIZE,
    borderRadius: CENTER_BUTTON_SIZE / 2,
    backgroundColor: '#6C5CE7',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 5 : 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  centerIconWrapper: {
    width: CENTER_BUTTON_SIZE,
    height: CENTER_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
