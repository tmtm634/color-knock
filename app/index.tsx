import { Link } from 'expo-router';
import { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GRADES = ['1級', '2級', '3級'];
const MODES = [
    {
        key: 'color-to-name',
        title: '色から色名を当てる',
        image: require('../assets/images/mode_color_to_name.png'),
        description: '色を見て色名を選ぶ',
    },
    {
        key: 'origin-to-name',
        title: '由来から色名を当てる',
        image: require('../assets/images/mode_origin_to_name.png'),
        description: '由来説明から色名を選ぶ',
    },
    {
        key: 'name-to-pccs',
        title: '色名からPCCS記号を当てる',
        image: require('../assets/images/mode_name_to_pccs.png'),
        description: '色名からPCCS記号を選ぶ',
    },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

export default function Home() {
    const [selectedGrade, setSelectedGrade] = useState('1級');
    const [selectedModeIndex, setSelectedModeIndex] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>級を選択</Text>
            <View style={styles.gradeRow}>
                {GRADES.map((grade) => (
                    <TouchableOpacity
                        key={grade}
                        style={[styles.gradeButton, selectedGrade === grade && styles.gradeButtonSelected]}
                        onPress={() => setSelectedGrade(grade)}
                    >
                        <Text style={[styles.gradeText, selectedGrade === grade && styles.gradeTextSelected]}>{grade}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.label}>クイズモードを選択</Text>
            <FlatList
                data={MODES}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.cardList}
                contentContainerStyle={{ alignItems: 'center' }}
                snapToInterval={CARD_WIDTH + 20}
                decelerationRate="fast"
                onMomentumScrollEnd={e => {
                    const idx = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + 20));
                    setSelectedModeIndex(idx);
                }}
                renderItem={({ item, index }) => (
                    <View style={[styles.card, index === selectedModeIndex && styles.cardSelected]}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
                        <Text style={styles.cardDesc}>{item.description}</Text>
                    </View>
                )}
                keyExtractor={item => item.key}
                getItemLayout={(_, index) => ({ length: CARD_WIDTH + 20, offset: (CARD_WIDTH + 20) * index, index })}
            />
            <View style={styles.dotsRow}>
                {MODES.map((_, idx) => (
                    <View key={idx} style={[styles.dot, idx === selectedModeIndex && styles.dotActive]} />
                ))}
            </View>
            <Link
                href={{ pathname: '/quiz', params: { grade: selectedGrade, mode: MODES[selectedModeIndex].key } }}
                asChild
            >
                <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.startButtonText}>クイズをスタート</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFBF5',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 0,
    },
    label: {
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 16,
        marginTop: 8,
        color: '#181818',
        alignSelf: 'center',
    },
    gradeRow: {
        flexDirection: 'row',
        marginBottom: 32,
        gap: 16,
    },
    gradeButton: {
        borderWidth: 1,
        borderColor: '#181818',
        borderRadius: 40,
        paddingHorizontal: 32,
        paddingVertical: 18,
        marginHorizontal: 4,
        backgroundColor: '#FCFBF5',
    },
    gradeButtonSelected: {
        backgroundColor: '#181818',
    },
    gradeText: {
        fontSize: 20,
        color: '#181818',
        fontWeight: '500',
    },
    gradeTextSelected: {
        color: '#fff',
    },
    cardList: {
        flexGrow: 0,
        height: 260,
        marginBottom: 8,
    },
    card: {
        width: CARD_WIDTH,
        height: 240,
        backgroundColor: '#fff',
        borderRadius: 32,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#DADADA',
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    cardSelected: {
        borderColor: '#181818',
        borderWidth: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#181818',
        marginBottom: 8,
        marginTop: 8,
    },
    cardImage: {
        width: 80,
        height: 80,
        marginBottom: 8,
    },
    cardDesc: {
        fontSize: 14,
        color: '#444',
        textAlign: 'center',
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 8,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#DADADA',
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: '#181818',
    },
    startButton: {
        backgroundColor: '#181818',
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 18,
        marginTop: 16,
        marginBottom: 24,
        alignSelf: 'center',
        width: width * 0.9,
    },
    startButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
