import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../../components/RoundedButton";
import { fontSizes, spacing } from "../../utils/Sizes";
import { colors } from "../../utils/colors";

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  const handleSubmit = () => {
    addSubject(subject);
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What Would you like to focus on</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            // onSubmitEditing={({ nativeEvent }) => {
            //   setSubject(nativeEvent.text);
            // }}
            onSubmitEditing={({ nativeEvent }) => {
              addSubject(nativeEvent.text);
            }}
            onChangeText={(newText) => setSubject(newText)}
          />
          <RoundedButton size={75} title="+" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  titleContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "center",
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    flex: 1,
    marginRight: spacing.md,
    // height: 30,
    // border: '1px solid red'
  },
});
// export default Focus;
