import React, { useEffect, useRef } from 'react';
import { Animated, Modal, StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../app/styles/tokens';
import { PrimaryButton } from './PrimaryButton';

interface ColorData {
    name: string;
    hex: string;
    pccs: string;
    munsell: string;
    desc: string;
}

interface Props {
    visible: boolean;
    isCorrect: boolean;
    color: ColorData;
    onNext: () => void;
    isLastQuestion: boolean;
}

export const QuizModal: React.FC<Props> = ({ visible, isCorrect, color, onNext, isLastQuestion }) => {
    const overlayOpacity = useRef(new Animated.Value(0)).current;
    const cardTranslateY = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(overlayOpacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(cardTranslateY, {
                    toValue: 0,
                    duration: 220,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            overlayOpacity.setValue(0);
            cardTranslateY.setValue(40);
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            animationType="none"
            transparent
            onRequestClose={() => { }}
        >
            <Animated.View style={[styles.modalOverlay, { opacity: overlayOpacity }]}>
                <Animated.View style={[styles.modalContainer, { transform: [{ translateY: cardTranslateY }] }]}>
                    <View style={styles.resultHeader}>
                        <Text style={[styles.resultText, isCorrect ? styles.correct : styles.incorrect]}>{isCorrect ? '正解！' : '不正解...'}</Text>
                    </View>
                    <View style={styles.contentBox}>
                        <Text style={styles.answerTitle}>正解：{color.name}</Text>
                        <View style={styles.infoCard}>
                            <View style={styles.infoRow}>
                                <View style={[styles.colorCircle, { backgroundColor: color.hex }]} />
                                <View style={styles.infoTextCol}>
                                    <Text style={styles.pccsText}>PCCS：{color.pccs}</Text>
                                    <Text style={styles.munsellText}>マンセル値：{color.munsell}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.descText}>
                            {color.desc
                                .replace(/<br\s*\/?>(\s*)/gi, '\n')
                                .split('\n')
                                .map(line => line.trim())
                                .join('\n')
                            }
                        </Text>
                        <PrimaryButton onPress={onNext}>
                            {isLastQuestion ? '結果を見る' : '次の問題へ'}
                        </PrimaryButton>
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.20)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: colors.background,
        paddingHorizontal: 0,
        paddingBottom: 32,
        borderTopWidth: 1,
        borderColor: colors.text,
        alignItems: 'center',
        position: 'relative',
    },
    resultHeader: {
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.text,
        marginBottom: 32,
        paddingHorizontal: 24,
        paddingVertical: 16,
        justifyContent: 'center',
    },
    resultText: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 20,
        fontFamily: typography.fontFamily.japanese,
    },
    correct: {
        color: colors.success,
    },
    incorrect: {
        color: colors.error,
    },
    answerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 24,
        textAlign: 'center',
        fontFamily: typography.fontFamily.japanese,
    },
    infoCard: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.primary,
        padding: 12,
        marginBottom: 24,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorCircle: {
        width: 64,
        height: 64,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: colors.primary,
        marginRight: 16,
    },
    infoTextCol: {
        justifyContent: 'center',
    },
    pccsText: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '400',
        fontFamily: typography.fontFamily.english,
        marginBottom: 4,
    },
    munsellText: {
        fontSize: 14,
        color: colors.text,
        fontFamily: typography.fontFamily.english,
    },
    descText: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 48,
        lineHeight: 22.4,
        fontFamily: typography.fontFamily.japanese,
        textAlign: 'left',
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    contentBox: {
        width: '100%',
        paddingHorizontal: 24,
        alignItems: 'center',
    },
});
