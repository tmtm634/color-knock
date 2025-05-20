import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { selection } from '../styles/tokens';

interface Props {
    grades: string[];
    selectedGrade: string;
    onSelect: (grade: string) => void;
}

export const GradeRadioGroup: React.FC<Props> = ({ grades, selectedGrade, onSelect }) => {
    return (
        <View style={styles.row}>
            {grades.map((grade) => (
                <TouchableOpacity
                    key={grade}
                    style={[styles.button, selectedGrade === grade && styles.buttonSelected]}
                    onPress={() => onSelect(grade)}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.text, selectedGrade === grade && styles.textSelected]}>{grade}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        ...selection.scrollContainer,
    },
    button: {
        ...selection.radio.container,
    },
    buttonSelected: {
        ...selection.radio.containerSelected,
    },
    text: {
        ...selection.radio.text,
    },
    textSelected: {
        ...selection.radio.textSelected,
    },
});
