import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },
    container: { alignItems: 'center', paddingTop: 20, paddingBottom: 40 },
    title: { fontSize: 32, fontWeight: '700', color: '#15803D', letterSpacing: 0.5 },
    subtitle: { fontSize: 14, color: '#6B7280', marginTop: 6 },
    label: { fontSize: 14, color: '#111827', marginBottom: 6, fontWeight: '600' },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 },
    input: { flex: 1, fontSize: 16, paddingVertical: 0, height: 35},
    eyeButton: { padding: 6 },
    primaryButton: { marginTop: 18, backgroundColor: '#15803D', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
    primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: 0.1},
    demoBox: { marginTop: 20, borderWidth: 1, borderColor: '#BFDBFE', backgroundColor: '#EFF6FF', padding: 12, borderRadius: 8 },
    demoTitle: { fontWeight: '700', marginBottom: 8, color: '#1E3A8A' },
    demoLine: { marginTop: 5, color: '#111827' },
    demoLabel: { fontWeight: '600', },
    demoBadge: { backgroundColor: '#fff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: '#E5E7EB', overflow: 'hidden' },
    footerPrimary: { color: '#6B7280', fontWeight: '600', marginTop: 12 },
    footerSecondary: { color: '#9CA3AF', marginTop: 4 },
});