import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const colors3 = [
    { name: '桜色', hex: '#F6C6E5', pccs: 'p24+', munsell: '10RP 9/2.5', desc: '3級：桜色の説明' },
    { name: '青', hex: '#0000FF', pccs: 'b14', munsell: '5PB 5/12', desc: '3級：青の説明' },
    { name: '緑', hex: '#00FF00', pccs: 'g24', munsell: '5G 6/8', desc: '3級：緑の説明' },
];
const colors2 = [
    { name: '黄色', hex: '#FFFF00', pccs: 'y14', munsell: '5Y 8/12', desc: '2級：黄色の説明' },
    { name: '紫', hex: '#800080', pccs: 'v6', munsell: '5P 3/8', desc: '2級：紫の説明' },
    { name: 'ピンク', hex: '#FFC0CB', pccs: 'p12', munsell: '5RP 8/4', desc: '2級：ピンクの説明' },
];
const colors1 = [...colors2, ...colors3];

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
    const [showResult, setShowResult] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    useEffect(() => {
        if (showResult) {
            router.push({
                pathname: '/result',
                params: { score: score.toString(), total: colorList.length.toString(), grade: params.grade, mode: params.mode }
            });
        }
    }, [showResult, score, router, colorList.length, params.grade, params.mode]);

    const handleAnswer = (selected: string) => {
        setSelectedColor(selected);
        const correct = selected === colorList[currentColorIndex].name;
        setIsCorrect(correct);
        if (correct) setScore(score + 1);
        setModalVisible(true);
    };

    const handleNext = () => {
        setModalVisible(false);
        setSelectedColor(null);
        if (currentColorIndex < colorList.length - 1) {
            setCurrentColorIndex(currentColorIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    if (showResult) {
        return null;
    }

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
        flex: 1,
        backgroundColor: '#FCFBF5',
        paddingTop: 32,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#181818',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        backgroundColor: '#FCFBF5',
    },
    closeButtonText: {
        fontSize: 24,
        color: '#181818',
        fontWeight: 'bold',
        lineHeight: 28,
    },
    progressBarBg: {
        flex: 1,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#181818',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#181818',
        borderRadius: 6,
    },
    quizContent: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    qMark: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 0,
        color: '#181818',
        alignSelf: 'flex-start',
    },
    question: {
        fontSize: 20,
        color: '#181818',
        marginBottom: 16,
        marginTop: 0,
        alignSelf: 'flex-start',
    },
    colorBox: {
        width: 180,
        height: 180,
        borderRadius: 90,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#181818',
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
        width: (width - 64) / 3,
        margin: 8,
        backgroundColor: '#FCFBF5',
        borderWidth: 1,
        borderColor: '#181818',
        borderRadius: 28,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        color: '#181818',
        fontSize: 16,
        fontWeight: '500',
    },
    // モーダル
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.12)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#FCFBF5',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 40,
        borderWidth: 1,
        borderColor: '#DADADA',
        alignItems: 'center',
    },
    modalResult: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 0,
    },
    correct: {
        color: '#009688',
    },
    incorrect: {
        color: '#C85A5A',
    },
    modalCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#181818',
        padding: 20,
        marginBottom: 20,
    },
    modalAnswerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#181818',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalColorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    modalColorCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#181818',
    },
    modalPccs: {
        fontSize: 16,
        color: '#181818',
        fontWeight: '500',
    },
    modalMunsell: {
        fontSize: 14,
        color: '#181818',
        marginTop: 2,
    },
    modalDesc: {
        fontSize: 15,
        color: '#181818',
        marginTop: 10,
        lineHeight: 22,
    },
    modalNextButton: {
        backgroundColor: '#181818',
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 16,
        alignSelf: 'center',
        width: '100%',
    },
    modalNextButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
