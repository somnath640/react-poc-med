import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

type Props = { title: string; onPress: () => void };

const PrimaryButton: React.FC<Props> = ({ title, onPress }) => (
    <TouchableOpacity style={styles.primaryButton} onPress={onPress} activeOpacity={0.85}>
        <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default PrimaryButton;