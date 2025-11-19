import styles from '@/app/styles';
import React from 'react';
import { Text, View } from 'react-native';


type Props = { title: string; subtitle?: string };

const AppTitle: React.FC<Props> = ({ title, subtitle }) => (
    <View style={{ alignItems: 'center', marginTop: 8 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
);

export default AppTitle;