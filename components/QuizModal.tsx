import React, { useEffect, useRef } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, typography } from '../app/styles/tokens';

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
}

export const QuizModal: React.FC<Props> = ({ visible, isCorrect, color, onNext }) => {
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
                        <Text style={styles.descText}>{color.desc}</Text>
                        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
                            <Text style={styles.nextButtonText}>次へ</Text>
                        </TouchableOpacity>
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
        marginBottom: 24,
        paddingHorizontal: 24,
        display: 'flex',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 24,
        paddingRight: 24,
        justifyContent: 'center',
        gap: 10,
        alignSelf: 'stretch',
    },
    resultText: {
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 20,
        fontFamily: typography.fontFamily.japanese,
        textAlign: 'center',
        marginTop: 0,
        marginBottom: 0,
    },
    correct: {
        color: colors.success,
    },
    incorrect: {
        color: colors.error,
    },
    answerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 28,
        textAlign: 'center',
        fontFamily: typography.fontFamily.japanese,
    },
    infoCard: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.text,
        padding: 20,
        marginBottom: 32,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 1,
        borderColor: colors.text,
        marginRight: 20,
    },
    infoTextCol: {
        justifyContent: 'center',
    },
    pccsText: {
        fontSize: 18,
        color: colors.text,
        fontWeight: '500',
        fontFamily: typography.fontFamily.japanese,
        marginBottom: 4,
    },
    munsellText: {
        fontSize: 16,
        color: colors.text,
        fontFamily: typography.fontFamily.japanese,
    },
    descText: {
        fontSize: 16,
        color: colors.text,
        marginTop: 0,
        marginBottom: 32,
        lineHeight: 24,
        fontFamily: typography.fontFamily.japanese,
        textAlign: 'left',
    },
    nextButton: {
        backgroundColor: colors.text,
        borderRadius: 9999,
        paddingVertical: 19,
        paddingHorizontal: 7,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 62,
    },
    nextButtonText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: typography.fontFamily.japanese,
    },
    contentBox: {
        width: '100%',
        paddingHorizontal: 24,
        alignItems: 'center',
    },
});
