import styles from '@/app/styles';
import React from 'react';
import { Text, View } from 'react-native';


type Props = { usernameHint?: string; passwordHint?: string };

const DemoBox: React.FC<Props> = ({ usernameHint = 'demo', passwordHint = 'demo' }) => (
    <View style={styles.demoBox}>
        <Text style={styles.demoTitle}>Demo Access:</Text>
        <Text style={styles.demoLine}>
            <Text style={styles.demoLabel}>Username: </Text>
            <Text style={styles.demoBadge}>{usernameHint}</Text>
            <Text> (or any username)</Text>
        </Text>
        <Text style={styles.demoLine}>
            <Text style={styles.demoLabel}>Password: </Text>
            <Text style={styles.demoBadge}>{passwordHint}</Text>
            <Text> (min 4 characters)</Text>
        </Text>
    </View>
);

export default DemoBox;