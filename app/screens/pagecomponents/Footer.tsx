import styles from '@/app/styles';
import React from 'react';
import { Text, View } from 'react-native';


const Footer: React.FC = () => (
    <View style={{ alignItems: 'center', marginTop: 20, paddingBottom: 10}}>
        <Text style={styles.footerPrimary}>© 2025 Lupin Pharmaceuticals</Text>
        <Text style={styles.footerSecondary}>Secure Field Force Management Platform</Text>
    </View>
);

export default Footer;