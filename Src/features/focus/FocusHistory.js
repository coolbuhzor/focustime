import React from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { spacing, fontSizes } from '../../utils/Sizes';
import { RoundedButton } from '../../components/RoundedButton';

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  const historyItem = ({ item, index }) => {
    return (
      <Text style={{ color: item.state > 1 ? 'red' : 'green' , fontSize: fontSizes.md, marginTop: spacing.sm}}>
        {item.subject}
      </Text>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things We've focused on </Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={historyItem}
            />
            <RoundedButton
              style={styles.clearContainer}
              size='75'
              title="Clear"
              onPress={()=> onClear()}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  // historyItem: (status) => ({
  //   color: status > 1 ? 'red' : 'green',
  //   fontSize: fontSizes.md,
  // }),

  title: {
    color: 'white',
    fontSize: fontSizes.md,
  },

  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
