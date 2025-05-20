import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, typography } from '../styles/tokens';

interface Props {
    onPress?: () => void;
    children: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
}

export const SecondaryButton: React.FC<Props> = ({ onPress, children, style, textStyle, disabled }) => (
    <TouchableOpacity
        style={[styles.button, style, disabled && styles.disabled]}
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
    >
        <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.background,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: colors.text,
        paddingHorizontal: 40,
        paddingVertical: 22,
        alignSelf: 'center',
        width: '100%',
    },
    text: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: typography.fontFamily.japanese,
    },
    disabled: {
        opacity: 0.5,
    },
});
