import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../styles/tokens';

interface Props {
    questionText: string;
    questionView: React.ReactNode;
}

export const QuizQuestion: React.FC<Props> = ({ questionText, questionView }) => (
    <View style={styles.container}>
        <Text style={styles.qMark}>Q.</Text>
        <Text style={styles.question}>{questionText}</Text>
        <View style={{ width: '100%', alignItems: 'center' }}>
            {questionView}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
    },
    qMark: {
        fontSize: 32,
        fontWeight: '400',
        marginTop: 0,
        marginBottom: spacing.sm,
        color: colors.text,
        alignSelf: 'flex-start',
        fontFamily: typography.fontFamily.english,
    },
    question: {
        fontSize: 20,
        color: colors.text,
        marginBottom: 8,
        marginTop: 0,
        alignSelf: 'flex-start',
        fontFamily: typography.fontFamily.japanese,
    },
});
