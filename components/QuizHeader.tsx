import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing } from '../app/styles/tokens';

interface Props {
    onClose: () => void;
    progress: number; // 0~1
    current: number;
    total: number;
}

export const QuizHeader: React.FC<Props> = ({ onClose, progress, current, total }) => (
    <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={26} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
            </View>
            <View style={styles.progressTextContainer}>
                <View style={styles.progressTextRow}>
                    <Text style={styles.progressCurrent}>{current}</Text>
                    <Text style={styles.progressSlash}>/</Text>
                    <Text style={styles.progressTotal}>{total}</Text>
                </View>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    closeButton: {
        marginRight: spacing.sm,
    },
    progressBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBarBg: {
        flex: 1,
        height: 8,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: colors.primary,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: borderRadius.sm,
    },
    progressTextContainer: {
        marginLeft: 14,
        minWidth: 48,
        alignItems: 'flex-end',
    },
    progressTextRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    progressCurrent: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginRight: 4,
    },
    progressTotal: {
        fontSize: 12,
        fontWeight: 'normal',
        color: colors.primary,
    },
    progressSlash: {
        fontSize: 12,
        fontWeight: 'normal',
        color: colors.primary,
        marginRight: 2,
    },
});

