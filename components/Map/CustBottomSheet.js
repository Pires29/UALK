import { useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import PesquisaMapa from "../../pages/PesquisaMapa";

const {height: SCREEN_HEIGHT} = Dimensions.get("window")

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

function CustBottomSheet({numero, selectedMarker, setSelectedMarker}) {

    const translateY = useSharedValue(0)

    const context = useSharedValue( { y:0 } );
    const gesture = Gesture.Pan().onStart(() =>{
        context.value = { y: translateY.value }
    }).onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
    });

    useEffect(() => {
        translateY.value = withSpring(- SCREEN_HEIGHT / 3, { damping: 50 })
    }, []);

    const rBottomSheetStyle = useAnimatedStyle(() =>{
        return{
            transform:[{ translateY: translateY.value }]
        }
    })

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                <View style={styles.line}/>
                <PesquisaMapa selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} />
            </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
      height: SCREEN_HEIGHT,
      width: "100%",
      backgroundColor: "white",
      position: "absolute",
      top: SCREEN_HEIGHT,
      borderRadius: 25,
    },
    line: {
       width: 75,
       height: 4,
       backgroundColor: "grey",
       alignSelf: "center",
       marginVertical: 15,
       borderRadius: 2,
    }
  });

export default CustBottomSheet
