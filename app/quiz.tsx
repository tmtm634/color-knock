import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { QuizHeader } from '../components/QuizHeader';
import { QuizModal } from '../components/QuizModal';
import { QuizOptionsGrid } from '../components/QuizOptionsGrid';
import { QuizQuestion } from '../components/QuizQuestion';
import { colors1, colors2, colors3 } from '../constants/Colors';
import { useQuizSettings } from '../contexts/QuizSettingsContext';
import { colors, layout } from '../styles/tokens';

// 配列をシャッフルする関数
function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function Quiz() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { grade, mode } = useQuizSettings();
    let baseColorList = colors3;
    if (grade === '2級') baseColorList = colors2;
    if (grade === '1級') baseColorList = colors1;

    const [colorList, setColorList] = useState(() => shuffleArray(baseColorList));
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setColorList(shuffleArray(baseColorList));
            setCurrentColorIndex(0);
            setScore(0);
            setModalVisible(false);
            setIsCorrect(false);
        }, [grade, mode])
    );

    const color = colorList[currentColorIndex];

    // 選択肢を毎回ランダムに生成
    const options = useMemo(() => {
        let pool: string[] = [];
        let answer: string = '';
        if (mode === 'color-to-name' || mode === 'name-to-color') {
            pool = colorList.map(c => c.name).filter(n => n !== color.name);
            answer = color.name;
        } else if (mode === 'name-to-pccs') {
            pool = colorList.map(c => c.pccs).filter(p => p !== color.pccs);
            answer = color.pccs;
        }
        // poolからランダムに11個選ぶ
        const sampled = shuffleArray(pool).slice(0, 11);
        // 正答を加えてシャッフル
        return shuffleArray([answer, ...sampled]);
    }, [color, colorList, mode]);

    const handleAnswer = (selected: string) => {
        let correct = false;
        if (mode === 'color-to-name' || mode === 'name-to-color') {
            correct = selected === color.name;
        } else if (mode === 'name-to-pccs') {
            correct = selected === color.pccs;
        }
        setIsCorrect(correct);
        if (correct) setScore(score + 1);
        setModalVisible(true);
    };

    const handleNext = () => {
        setModalVisible(false);
        if (currentColorIndex < colorList.length - 1) {
            setCurrentColorIndex(currentColorIndex + 1);
        } else {
            router.push({
                pathname: '/result',
                params: { score: score.toString(), total: colorList.length.toString(), grade, mode }
            });
        }
    };

    const progress = currentColorIndex / colorList.length;

    let questionText = '';
    let questionView = null;
    if (mode === 'color-to-name') {
        questionText = 'この色に最も近い色名はどれか？';
        questionView = (
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.colorBox, { backgroundColor: color.hex }]} />
            </View>
        );
    } else if (mode === 'name-to-color') {
        questionText = 'この由来に最も近い色名はどれか？';
        questionView = <Text style={styles.questionDesc}>{color.desc.replace(/\s*<br\s*\/?>\s*/g, '\n')}</Text>;
    } else if (mode === 'name-to-pccs') {
        questionText = 'この色名に最も近いPCCS記号はどれか？';
        questionView = <Text style={styles.questionName}>{color.name}</Text>;
    }

    return (
        <View style={styles.container}>
            <QuizHeader
                onClose={() => router.replace({ pathname: '/', params: { fromResult: 'true' } })}
                progress={progress}
                current={currentColorIndex + 1}
                total={colorList.length}
            />
            <View style={styles.quizContent}>
                <QuizQuestion questionText={questionText} questionView={questionView} />
                <QuizOptionsGrid options={options} onSelect={handleAnswer} disabled={modalVisible} />
            </View>
            <QuizModal visible={modalVisible} isCorrect={isCorrect} color={color} onNext={handleNext} isLastQuestion={currentColorIndex === colorList.length - 1} />
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
        width: '100%',
    },
    quizContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    colorBox: {
        width: 160,
        height: 160,
        marginTop: 8,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: colors.primary,
        alignItems: 'center',
    },
    questionDesc: {
        fontSize: 16,
        color: colors.text,
        marginTop: 8,
        lineHeight: 22,
        fontFamily: 'Hiragino Sans',
    },
    questionName: {
        fontSize: 24,
        color: colors.text,
        marginTop: 8,
        lineHeight: 24,
        fontFamily: 'Hiragino Sans',
        fontWeight: 'bold',
    },
});
