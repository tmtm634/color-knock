import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { GradeRadioGroup } from '../components/GradeRadioGroup';
import { PrimaryButton } from '../components/PrimaryButton';
import { QuizModeSelector } from '../components/QuizModeSelector';
import { useQuizSettings } from '../contexts/QuizSettingsContext';
import { button, layout, selection } from '../styles/tokens';

const GRADES = ['1級', '2級', '3級'];
const MODES = [
    {
        key: 'color-to-name',
        title: '色から色名を当てる',
        example: {
            color: '#F6C6E5',
            name: '桜色'
        },
        image: require('../assets/images/mode1.png'),
        aspectRatio: 987 / 486,
    },
    {
        key: 'name-to-color',
        title: '由来から色名を当てる',
        example: {
            color: '#0000FF',
            name: '青'
        },
        image: require('../assets/images/mode2.png'),
        aspectRatio: 987 / 486,
    },
    {
        key: 'name-to-pccs',
        title: '色名からPCCS記号を当てる',
        example: {
            color: '#00FF00',
            name: '緑'
        },
        image: require('../assets/images/mode3.png'),
        aspectRatio: 987 / 486,
    }
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - (layout.padding.horizontal * 2);

export default function Home() {
    const [selectedGrade, setSelectedGrade] = useState('1級');
    const [selectedModeIndex, setSelectedModeIndex] = useState(0);
    const { setGrade, setMode, mode, grade } = useQuizSettings();

    useEffect(() => {
        if (mode) {
            const idx = MODES.findIndex(m => m.key === mode);
            if (idx !== -1) setSelectedModeIndex(idx);
        }
        if (grade) {
            setSelectedGrade(grade);
        }
    }, [mode, grade]);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFEF7' }}>
            <ImageBackground
                source={require('../assets/images/bg_graph_paper.png')}
                style={{ flex: 1 }}
                resizeMode="cover"
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View>
                            <Text style={styles.title}>級を選択</Text>
                            <View style={{ paddingHorizontal: 24 }}>
                                <GradeRadioGroup
                                    grades={GRADES}
                                    selectedGrade={selectedGrade}
                                    onSelect={setSelectedGrade}
                                />
                            </View>
                            <View style={{ height: 48 }} />
                            <Text style={styles.title}>クイズモードを選択</Text>
                            <QuizModeSelector
                                modes={MODES}
                                selectedIndex={selectedModeIndex}
                                onSelect={setSelectedModeIndex}
                            />
                        </View>

                        <View style={{ paddingHorizontal: 24 }}>
                            <Link
                                href={{ pathname: '/quiz', params: { grade: selectedGrade, mode: MODES[selectedModeIndex].key } }}
                                asChild
                                onPress={() => {
                                    setGrade(selectedGrade);
                                    setMode(MODES[selectedModeIndex].key);
                                }}
                            >
                                <PrimaryButton>
                                    クイズをスタート
                                </PrimaryButton>
                            </Link>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: layout.padding.top,
        paddingBottom: layout.padding.bottom,
        paddingHorizontal: 0,
        justifyContent: 'space-between',
    },
    title: {
        ...selection.title,
        paddingHorizontal: 24,
    },
    startButton: {
        ...button.primary.container,
        marginBottom: 32,
    },
    startButtonText: {
        ...button.primary.text,
    },
});
