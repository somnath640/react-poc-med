import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ProgressBarProps = {
  current: number;
  total: number;
  label?: string;
  dotColor?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label = 'Progress', dotColor = 'blue' }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <View style={styles.container}>
      {/* Top Row: Dot + Text on left, Progress on right */}
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.percentage}>{`${current}/${total} (${percentage}%)`}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'blue',
    marginRight: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  percentage: {
    fontSize: 16,
    color: '#333',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'black',
  },
});

export default ProgressBar;
