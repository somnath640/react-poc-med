import styles from '@/app/styles';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';


type Props = {
    label: string;
    placeholder?: string;
    value: string;
    onChangeText: (t: string) => void;
};

const PasswordField: React.FC<Props> = ({ label, placeholder, value, onChangeText }) => {
    const [hidden, setHidden] = useState<boolean>(true);

    return (
        <View style={{ marginVertical: 10 }}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={hidden}
                    value={value}
                    onChangeText={onChangeText}
                />
                <TouchableOpacity onPress={() => setHidden(h => !h)} style={styles.eyeButton}>
                    <Text>{hidden ? '👁️' : '🙈'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PasswordField;