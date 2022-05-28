import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { spacing, fontSizes } from "../utils/Sizes";
import { colors } from "../utils/colors";

const minsToMillis = (min) => {
  return min * 1000 * 60;
};
const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

export const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  const interval = React.useRef(null);

  useEffect(() => {
    setMillis(minsToMillis(minutes));
  }, [minutes]);

  const countDown = (time) => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        // do more stuff
        return time;
      }
      const timeLeft = time - 1000;
      // report progress
      return timeLeft;
    });
  };

  useEffect(() => {
    onProgress(millis / minsToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
      <Text>{onProgress}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: colors.bgLight,
    // background:Platform.os === 'ios' ? 'red': colors.bgLight
  },
});
