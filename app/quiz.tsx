import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors1, colors2, colors3 } from '../constants/Colors';
import { borderRadius, colors, layout, spacing, typography } from './styles/tokens';

const { width } = Dimensions.get('window');

export default function Quiz() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const grade = params.grade as string;
    let colorList = colors3;
    if (grade === '2級') colorList = colors2;
    if (grade === '1級') colorList = colors1;

    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleAnswer = (selected: string) => {
        const correct = selected === colorList[currentColorIndex].name;
        setIsCorrect(correct);
        if (correct) setScore(score + 1);
        setModalVisible(true);
    };

    const handleNext = () => {
        setModalVisible(false);
        if (currentColorIndex < colorList.length - 1) {
            setCurrentColorIndex(currentColorIndex + 1);
        } else {
            // 最後の問題の次へで即リザルト遷移
            router.push({
                pathname: '/result',
                params: { score: score.toString(), total: colorList.length.toString(), grade: params.grade, mode: params.mode }
            });
        }
    };

    // カスタムヘッダー
    const progress = (currentColorIndex + 1) / colorList.length;
    const color = colorList[currentColorIndex];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton} onPress={() => router.replace('/')}>
                    <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                </View>
            </View>
            <View style={styles.quizContent}>
                <Text style={styles.qMark}>Q.</Text>
                <Text style={styles.question}>この色に最も近い色名は？</Text>
                <View style={[styles.colorBox, { backgroundColor: color.hex }]} />
                <View style={styles.optionsGrid}>
                    {colorList.map((c, idx) => (
                        <TouchableOpacity
                            key={c.name}
                            style={styles.optionButton}
                            onPress={() => handleAnswer(c.name)}
                            disabled={modalVisible}
                        >
                            <Text style={styles.optionText}>{c.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {/* 解答モーダル */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => { }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={[styles.modalResult, isCorrect ? styles.correct : styles.incorrect]}>
                            {isCorrect ? '正解！' : '不正解...'}
                        </Text>
                        <View style={styles.modalCard}>
                            <Text style={styles.modalAnswerTitle}>正解：{color.name}</Text>
                            <View style={styles.modalColorRow}>
                                <View style={[styles.modalColorCircle, { backgroundColor: color.hex }]} />
                                <View style={{ marginLeft: 16 }}>
                                    <Text style={styles.modalPccs}>PCCS：{color.pccs}</Text>
                                    <Text style={styles.modalMunsell}>マンセル値：{color.munsell}</Text>
                                </View>
                            </View>
                            <Text style={styles.modalDesc}>{color.desc}</Text>
                        </View>
                        <TouchableOpacity style={styles.modalNextButton} onPress={handleNext}>
                            <Text style={styles.modalNextButtonText}>次へ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...layout.flex.column,
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: layout.padding.top,
        paddingBottom: layout.padding.bottom,
        paddingHorizontal: layout.padding.horizontal,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.sm,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.text,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
        backgroundColor: colors.background,
    },
    closeButtonText: {
        fontSize: 24,
        color: colors.text,
        fontWeight: 'bold',
        lineHeight: 28,
        fontFamily: typography.fontFamily.japanese,
    },
    progressBarBg: {
        flex: 1,
        height: 12,
        borderRadius: borderRadius.sm,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.text,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.text,
        borderRadius: borderRadius.sm,
    },
    quizContent: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: spacing.md,
    },
    qMark: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: spacing.xs,
        marginBottom: 0,
        color: colors.text,
        alignSelf: 'flex-start',
        fontFamily: typography.fontFamily.japanese,
    },
    question: {
        fontSize: 20,
        color: colors.text,
        marginBottom: spacing.md,
        marginTop: 0,
        alignSelf: 'flex-start',
        fontFamily: typography.fontFamily.japanese,
    },
    colorBox: {
        width: 180,
        height: 180,
        borderRadius: borderRadius.circle,
        marginBottom: spacing.xl,
        borderWidth: 1,
        borderColor: colors.text,
        alignSelf: 'center',
    },
    optionsGrid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 0,
        gap: 0,
    },
    optionButton: {
        width: (width - spacing.xxl * 2) / 3,
        margin: spacing.xs,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.text,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '500',
        fontFamily: typography.fontFamily.japanese,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.12)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: colors.background,
        borderTopLeftRadius: borderRadius.md,
        borderTopRightRadius: borderRadius.md,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.xxl,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
    },
    modalResult: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.sm,
        marginTop: 0,
        fontFamily: typography.fontFamily.japanese,
    },
    correct: {
        color: colors.success,
    },
    incorrect: {
        color: colors.error,
    },
    modalCard: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: colors.text,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },
    modalAnswerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.sm,
        textAlign: 'center',
        fontFamily: typography.fontFamily.japanese,
    },
    modalColorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    modalColorCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.text,
    },
    modalPccs: {
        fontSize: 16,
        color: colors.text,
        fontWeight: '500',
        fontFamily: typography.fontFamily.japanese,
    },
    modalMunsell: {
        fontSize: 14,
        color: colors.text,
        marginTop: spacing.xs,
        fontFamily: typography.fontFamily.japanese,
    },
    modalDesc: {
        fontSize: 15,
        color: colors.text,
        marginTop: spacing.xs,
        lineHeight: 22,
        fontFamily: typography.fontFamily.japanese,
    },
    modalNextButton: {
        backgroundColor: colors.text,
        borderRadius: borderRadius.xl,
        paddingHorizontal: spacing.xxl,
        paddingVertical: spacing.md,
        alignSelf: 'center',
        width: '100%',
    },
    modalNextButtonText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: typography.fontFamily.japanese,
    },
});
