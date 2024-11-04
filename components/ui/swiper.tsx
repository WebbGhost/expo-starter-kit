import { View, Text, Image, type ImageSourcePropType, FlatList, Animated, Dimensions, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native'
import React, {  useRef } from 'react'
import tw from 'twrnc';

type SlideItemProps = {
  image: ImageSourcePropType;
  title: string;
  description: string;
}
const SlideItem = ({description, image, title}: SlideItemProps) => {
  return (
    <View>
      <Image source={image}/>
      <Text style={tw`text-2xl font-bold text-white`}>{title}</Text>
      <Text style={tw`text-white`}>{description}</Text>
    </View>
  )
}

const Pagination = ({data, swipeX}: {data: SlideItemProps[], swipeX: Animated.Value}) => {
    const width = Dimensions.get('window').width;
  return <View style={tw`flex-row justify-center items-center gap-2`}>
    {data.map((item, i) => {
      const inputRange = [(i -1) * width, i * width,(i+1) * width];
      const dotWidth = swipeX.interpolate({
        inputRange,
        outputRange: [12, 30,12],
        extrapolate: 'clamp'
      })
      const backgroundColor = swipeX.interpolate({
        inputRange,
        outputRange: ['gray', 'white', 'gray'],
        extrapolate: 'clamp'
      })
      return (
        <Animated.View key={item?.title} style={{width: dotWidth, height: 12, borderRadius: 12, backgroundColor}}/>
      )
    })}
  </View>
}
type SwiperProps = {
  data: SlideItemProps[];
}
export default function Swiper({data}: SwiperProps) {
  const swipeX = useRef(new Animated.Value(0)).current;
  const handleSwipe = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            x: swipeX
          }
        }
      }
    ],{
      useNativeDriver: false
    })(event);
  }
  
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <SlideItem {...item}/>}
        pagingEnabled
        horizontal
        onScroll={handleSwipe}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={data} swipeX={swipeX} />
    </View>
  )
}
