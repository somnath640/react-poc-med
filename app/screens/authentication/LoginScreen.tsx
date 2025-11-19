import styles from '@/app/styles';
import InputField from '@/components/InputField';
import PasswordField from '@/components/PasswordField';
import { PrimaryButton } from '@/constants/LupinColors';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import AppTitle from '../pagecomponents/AppTitle';
import DemoBox from '../pagecomponents/DemoBox';
import Footer from '../pagecomponents/Footer';
// import Logo from '../pagecomponents/Logo';

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigator = useNavigation()

    const handleLogin = () => {
        if (!username || !password) {
            alert('Please enter username and password.');
            return;
        }
        // router.replace('/bottom-nav');
    };

    const fillDemo = () => {
        setUsername('demo');
        setPassword('demo');
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: 'center', marginTop: 8 }}>
                    {/* <Logo size={110} /> */}
                    <AppTitle title={"LUPIN CRM"} subtitle={"Field Force Management System"} />
                </View>

                <View style={{ width: '90%', marginTop: 24 }}>
                    <InputField label="Username" placeholder="Enter your username" value={username} onChangeText={setUsername} />

                    <PasswordField label="Password" placeholder="Enter your password" value={password} onChangeText={setPassword} />

                    <PrimaryButton title="Login" onPress={handleLogin} />

                    <DemoBox />

                    <PrimaryButton title="Fill demo credentials" onPress={fillDemo} />

                    
                </View>
            </ScrollView>
            <Footer />
        </SafeAreaView>
    );
};

export default LoginScreen;