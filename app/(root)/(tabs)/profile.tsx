import {
  GlobeIcon,
  LockIcon,
  NotificationIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@/assets/icons";
import { SafeAreaView, Text, View } from "react-native";
import * as Svg from "react-native-svg";
import tw from "twrnc";
const ArrowBackSvg = () => {
  return (
    <Svg.Svg width="24" height="24" viewBox="0 0 24 24">
      <Svg.Path d="M12 8l-6 6 6 6" stroke="white" strokeWidth="2" />
    </Svg.Svg>
  );
};
const MenuSvg = () => {
  return (
    <Svg.Svg width="24" height="24" viewBox="0 0 24 24">
      <Svg.Path
        d="M11.992 12H12.001"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Svg.Path
        d="M11.9842 18H11.9932"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Svg.Path
        d="M11.9998 6H12.0088"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg.Svg>
  );
};

type SettingItemProps = {
  title: string;
  svg: React.ReactNode;
  iconRight?: React.ReactNode;
};

const SettingItem = ({ title, svg, iconRight }: SettingItemProps) => {
  return (
    <View
      style={tw`flex flex-row justify-between items-center p-4 bg-[#0E0E0E] rounded-2xl `}
    >
      <View style={tw`flex flex-row items-end gap-2`}>
        <Text>{svg}</Text>
        <Text style={tw`text-white font-bold text-[18px]`}>{title}</Text>
      </View>
      <Text>{iconRight}</Text>
    </View>
  );
};

const Profile = () => {
  const menuItems = [
    {
      title: "Account",
      svg: <UserIcon color="white" />,
      iconRight: <ArrowBackSvg />,
    },
    {
      title: "Change Password",
      svg: <LockIcon color="white" />,
      iconRight: <ArrowBackSvg />,
    },
    {
      title: "Notifications",
      svg: <NotificationIcon color="white" />,
      iconRight: <ArrowBackSvg />,
    },
    {
      title: "Security",
      svg: <ShieldCheckIcon color="white" />,
      iconRight: <ArrowBackSvg />,
    },
    {
      title: "Language",
      svg: <GlobeIcon color="white" />,
      iconRight: <ArrowBackSvg />,
    },
  ];
  return (
    <SafeAreaView style={tw`flex h-full w-full `}>
      <View style={tw`flex h-full w-full gap-4`}>
        <View
          style={tw`flex justify-between items-center px-4 flex-row pt-4 text-white w-fit mt-8`}
        >
          <View style={tw``}>
            <Text style={tw` text-white`}>
              <ArrowBackSvg />
            </Text>
          </View>
          <View style={tw``}>
            <Text style={tw`font-semibold text-white`}>Settings</Text>
          </View>
          <View style={tw``}>
            <Text style={tw` text-white`}>
              <MenuSvg />
            </Text>
          </View>
        </View>
        <View style={tw`border-b-[0.5px] border-gray-500`} />

        <View style={tw`flex h-full w-full px-4`}>
          <Text style={tw`text-white font-bold text-[18px]`}>Profile</Text>
          <View style={tw`flex flex-col gap-4 mt-4`}>
            {menuItems.map((item) => (
              <SettingItem key={item?.title} {...item} />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
