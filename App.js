import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus } from './Src/features/focus/Focus';
import { FocusHistory } from './Src/features/focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Timer } from './Src/features/timer/Timer';
import { colors } from './Src/utils/colors';
import { spacing } from './Src/utils/Sizes';

const STATUS = {
  completed: 1,
  cancelled: 2,
};
export default function App() {
  // useKeepAwake();
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWihState = (subject, state) => {
    setFocusHistory([...focusHistory, {key:String(focusHistory + 1), subject, state }]);
  };
  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history))
      }
    } catch (e) {
      console.log(e);
    }
  };
useEffect(()=>{
  loadFocusHistory()
},[])
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <>
          <Timer
            focusSubject={focusSubject}
            onTimerEnd={() => {
              addFocusHistorySubjectWihState(focusSubject, STATUS.completed);
              setFocusSubject(null);
            }}
            clearSubject={() => {
              addFocusHistorySubjectWihState(focusSubject, STATUS.cancelled);
              setFocusSubject(null);
            }}
          />
        </>
      ) : (
        <View style={{flex: 1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.xxxl : spacing.xxl,
    // padding: 50,
    backgroundColor: colors.darkBlue,
  },
});
