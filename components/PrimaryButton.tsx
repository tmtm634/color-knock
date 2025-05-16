import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { button } from '../app/styles/tokens';

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
        ...button.primary.container,
        width: '100%',
    },
    text: {
        ...button.primary.text,
    },
    disabled: {
        opacity: 0.5,
    },
});
