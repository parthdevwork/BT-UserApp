import React, { useContext } from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccountStackNavigator, ActivitiesStackNavigator, HomeStackNavigator, ServicesStackNavigator, UnAuthenticatedStackNavigator } from "./StackNavigator";
import { AuthContext } from "../store/context/auth-context";
import MenuItem from "../components/ui/MenuItem";



const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false
}

const tabs = [
  {
    Icon: (
      <Image
        className="w-5 h-5"
        source={require("../../assets/icons/home.png")}
        resizeMode="contain"
      />
    ),
    title: "HOME",
    routeName: "HomeTab",
    NavigatorComponent: HomeStackNavigator,
  },
  {
    Icon: (
      <Image
        className="w-5 h-5"
        source={require("../../assets/icons/activities.png")}
        resizeMode="contain"
      />
    ),
    title: "ACTIVITIES",
    routeName: "ActivitiesTab",
    NavigatorComponent: ActivitiesStackNavigator,
  },
  // {
  //   Icon: (
  //     <Image
  //       className="w-5 h-5"
  //       source={require("../../assets/icons/services.png")}
  //       resizeMode="contain"
  //     />
  //   ),
  //   title: "SERVICES",
  //   routeName: "ServicesTab",
  //   NavigatorComponent: ServicesStackNavigator,
  // },
  {
    Icon: (
      <Image
        className="w-5 h-5"
        source={require("../../assets/icons/account.png")}
        resizeMode="contain"
      />
    ),
    title: "ACCOUNT",
    routeName: "AccountTab",
    NavigatorComponent: AccountStackNavigator,
  },
];

const TabBar = ({ state, navigation, isAuthenticated }) => {

  if (!isAuthenticated) return null;

  return (
    <View className="items-center justify-between flex-row px-5 py-6 rounded-t-3xl bg-white shadow-lg shadow-black/40 border-2 border-slate-100">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { Icon, title } = tabs.find(({ routeName }) => routeName === route.name) || {};

        if (!Icon && !title) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <MenuItem
            key={route.name}
            Icon={Icon}
            title={title}
            selected={isFocused}
            disabled={!isAuthenticated}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

export const TabNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <UnAuthenticatedStackNavigator />
  }


  return (
    <Tab.Navigator id="MainTabs" screenOptions={screenOptions} tabBar={props => <TabBar {...props} isAuthenticated={isAuthenticated} />}>
      {/* {!isAuthenticated &&
        <Tab.Screen name="UnauthenticatedHomeTab" component={UnAuthenticatedStackNavigator} />
      } */}
      {tabs.map(({ routeName, NavigatorComponent }) => {
        return <Tab.Screen key={routeName} name={routeName} component={NavigatorComponent} />
      })}
    </Tab.Navigator>
  );
};

export default TabNavigator;