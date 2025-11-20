import styles from '@/app/styles';
import InputField from '@/components/InputField';
import PasswordField from '@/components/PasswordField';
import { PrimaryButton } from '@/constants/LupinColors';
import { router, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import AppTitle from '../pagecomponents/AppTitle';
import DemoBox from '../pagecomponents/DemoBox';
import Footer from '../pagecomponents/Footer';
// import Logo from '../pagecomponents/Logo';
import { SafeAreaView } from 'react-native-safe-area-context';


const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigator = useNavigation()

    const handleLogin = () => {
        if (!username || !password) {
            alert('Please enter username and password.');
            return;
        }

        // Replace the navigation stack with the tabs layout so the login page
        // is removed from history (becomes the new root).
        // Also pass a flag to open the drawer on first render of the tabs.
        // Cast to `any` to avoid strict expo-router generated route typing issues.
        router.replace({ pathname: '/(tabs)', params: { openDrawer: '1' } } as any);
    };

    const fillDemo = () => {
        setUsername('demo');
        setPassword('demo');
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: 'center', marginTop: "10%" }}>
                    <Image source={require('../../../assets/images/logo-lu.png')} style={styles.logoLarge} resizeMode="contain" />
                    <AppTitle title={"LUPIN CRM"} subtitle={"Field Force Management System"} />
                </View>

                <View style={{ width: '90%', marginTop: 24 }}>
                    <InputField label="Username" placeholder="Enter your username" value={username} onChangeText={setUsername} />

                    <PasswordField label="Password" placeholder="Enter your password" value={password} onChangeText={setPassword} />
                    <View style={{height: 10}} />
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