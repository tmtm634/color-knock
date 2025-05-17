import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, typography } from '../styles/tokens';
interface Props {
    onPress?: (event: GestureResponderEvent) => void;
    children: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({ onPress, children, style, textStyle, disabled }) => (
    <TouchableOpacity
        style={[styles.button, style, disabled && styles.disabled]}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={disabled}
    >
        <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#181818',
        borderRadius: 9999,
        paddingHorizontal: 40,
        paddingVertical: 22,
        alignSelf: 'center',
        width: '100%',
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: typography.fontFamily.japanese,
    },
    disabled: {
        opacity: 0.5,
    },
});
