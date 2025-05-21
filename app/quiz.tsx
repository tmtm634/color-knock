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

// PCCS記号から色相とトーンを抽出する関数
function parsePCCS(pccs: string): { hue: string; tone: string } {
    // 例: "lt24+" -> { hue: "24", tone: "lt" }
    const match = pccs.match(/^([a-z]+)(\d+)(\+)?$/);
    if (!match) return { hue: '', tone: '' };
    return { hue: match[2], tone: match[1] };
}

// 色相が近似しているか判定する関数
function isSimilarHue(hue1: string, hue2: string): boolean {
    const h1 = parseInt(hue1);
    const h2 = parseInt(hue2);
    if (isNaN(h1) || isNaN(h2)) return false;

    // 色相環上での距離を計算（24色相環）
    const diff = Math.abs(h1 - h2);
    return diff <= 2 || diff >= 22; // 2色相以内を近似とみなす
}

// トーンが近似しているか判定する関数
function isSimilarTone(tone1: string, tone2: string): boolean {
    if (tone1 === tone2) return true;
    const toneGroups: Record<string, string[]> = {
        v: ['b', 'dp'],
        b: ['v', 'lt', 'sf'],
        lt: ['b', 'p', 'sf', 'ltg'],
        p: ['lt', 'sf', 'ltg'],
        sf: ['p', 'lt', 'ltg', 'd', 'g', 'b'],
        ltg: ['p', 'sf', 'g', 'd', 'lt'],
        d: ['sf', 'g', 'dk', 'dp'],
        dp: ['v', 'd', 'dk'],
        dk: ['d', 'dp', 'dkg', 'g'],
        dkg: ['dk', 'g', 'd', 'Gy', 'Bk'],
        g: ['ltg', 'sf', 'd', 'dk', 'dkg', 'Gy'],
        Gy: ['g', 'dkg', 'Bk', 'mGy'],
        Bk: ['dkg', 'Gy'],
        // 必要に応じて他のトーンも追加
    };
    return toneGroups[tone1]?.includes(tone2) || toneGroups[tone2]?.includes(tone1);
}

export default function Quiz() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { grade, mode } = useQuizSettings();
    let baseColorList = colors3;
    if (grade === '2級') baseColorList = colors2;
    if (grade === '1級') baseColorList = colors1;

    const [colorList, setColorList] = useState(() => {
        const list = shuffleArray(baseColorList);
        // 和名と洋名を分けて出題
        if (mode === 'name-to-color') {
            return list.filter(color => color.origin === 'japanese');
        }
        return list;
    });
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
        if (mode === 'color-to-name') {
            // 色相とトーンが近似している色を除外
            const currentPCCS = parsePCCS(color.pccs);
            const filteredList = colorList.filter(c => {
                const otherPCCS = parsePCCS(c.pccs);
                return !(isSimilarHue(currentPCCS.hue, otherPCCS.hue) &&
                    isSimilarTone(currentPCCS.tone, otherPCCS.tone));
            });
            pool = filteredList.map(c => c.name).filter(n => n !== color.name);
            answer = color.name;
        } else if (mode === 'name-to-color') {
            // 出題と同じ種類（和名/洋名）の色のみを選択肢として使用
            const filteredList = colorList.filter(c => c.origin === color.origin);
            pool = filteredList.map(c => c.name).filter(n => n !== color.name);
            answer = color.name;
        } else if (mode === 'name-to-pccs') {
            // 色相とトーンが近似している色を除外
            const currentPCCS = parsePCCS(color.pccs);
            const filteredList = colorList.filter(c => {
                const otherPCCS = parsePCCS(c.pccs);
                return !(isSimilarHue(currentPCCS.hue, otherPCCS.hue) &&
                    isSimilarTone(currentPCCS.tone, otherPCCS.tone));
            });
            pool = filteredList.map(c => c.pccs).filter(p => p !== color.pccs);
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
        fontSize: 32,
        color: colors.text,
        marginTop: 8,
        lineHeight: 32,
        fontFamily: 'Hiragino Sans',
        fontWeight: 'bold',
    },
});
