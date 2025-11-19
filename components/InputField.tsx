import styles from '@/app/styles';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type Props = {
    label: string;
    placeholder?: string;
    value: string;
    onChangeText: (t: string) => void;
} & TextInputProps;

const InputField: React.FC<Props> = ({ label, placeholder, value, onChangeText, ...rest }) => (
    <View style={{ marginVertical: 10 }}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChangeText}
                {...rest}
            />
        </View>
    </View>
);

export default InputField;