import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, typography } from '../styles/tokens';

const { width } = Dimensions.get('window');
const COLS = 3;
const COL_GAP = 8;
const ROW_GAP = 16;
const SIDE_PADDING = 24;
const buttonWidth = (width - SIDE_PADDING * 2 - COL_GAP * (COLS - 1)) / COLS;

interface Props {
    options: string[];
    onSelect: (value: string) => void;
    disabled?: boolean;
}

export const QuizOptionsGrid: React.FC<Props> = ({ options, onSelect, disabled }) => {
    // 12個に満たない場合は空文字で埋める
    const filledOptions = [...options.slice(0, 12)];
    while (filledOptions.length < 12) filledOptions.push('');

    // 3個ずつで4行に分割
    const rows = [0, 1, 2, 3].map(i => filledOptions.slice(i * 3, i * 3 + 3));

    return (
        <View style={styles.optionsGrid}>
            {rows.map((row, rowIdx) => (
                <View
                    key={`row-${rowIdx}`}
                    style={[styles.optionsRow, { marginBottom: rowIdx < 3 ? 16 : 0 }]}
                >
                    {row.map((opt, idx) => (
                        <TouchableOpacity
                            key={`opt-${rowIdx * 3 + idx}`}
                            style={[
                                styles.optionButton,
                                { flex: 1, minWidth: 0, marginRight: idx < 2 ? 8 : 0 }
                            ]}
                            onPress={() => opt && onSelect(opt)}
                            disabled={disabled || !opt}
                            activeOpacity={opt ? 0.7 : 1}
                        >
                            <Text
                                style={[styles.optionText, !opt && { color: 'transparent' }]}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                {opt || '　'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    optionsGrid: {
        width: '100%',
    },
    optionsRow: {
        flexDirection: 'row',
        width: '100%',
    },
    optionButton: {
        height: 50,
        paddingVertical: 2,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#0E0F0F',
        backgroundColor: '#FFFCE8',
    },
    optionText: {
        color: colors.text,
        textAlign: 'center',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 17,
        fontFamily: typography.fontFamily.japanese,
        flexWrap: 'wrap',
    },
});
