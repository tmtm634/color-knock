import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

function getStars(percentage: number) {
    if (percentage >= 90) return 5;
    if (percentage >= 70) return 4;
    if (percentage >= 50) return 3;
    if (percentage >= 30) return 2;
    if (percentage > 0) return 1;
    return 0;
}

export default function Result() {
    const router = useRouter();
    const { score, total, grade, mode } = useLocalSearchParams<{
        score: string;
        total: string;
        grade?: string;
        mode?: string;
    }>();
    const percentage = Math.round((Number(score) / Number(total)) * 100);
    const stars = getStars(percentage);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>クイズ完了！</Text>
                <View style={styles.starsRow}>
                    {[...Array(5)].map((_, i) => (
                        <Text key={i} style={i < stars ? styles.starActive : styles.star}>★</Text>
                    ))}
                </View>
                <Text style={styles.scoreText}>
                    {score}/{total} ({percentage}%)
                </Text>
            </View>
            <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.replace('/')}
            >
                <Text style={styles.primaryButtonText}>モード選択に戻る</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.replace({ pathname: '/quiz', params: { grade, mode } })}
            >
                <Text style={styles.secondaryButtonText}>もう一度プレイ</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFBF5',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 0,
    },
    card: {
        width: width * 0.9,
        backgroundColor: '#fff',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#181818',
        alignItems: 'center',
        paddingVertical: 36,
        marginBottom: 48,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#181818',
        marginBottom: 24,
    },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    star: {
        fontSize: 36,
        color: '#E0E0E0',
        marginHorizontal: 4,
    },
    starActive: {
        fontSize: 36,
        color: '#FFD600',
        marginHorizontal: 4,
    },
    scoreText: {
        fontSize: 20,
        color: '#181818',
        marginTop: 8,
        fontWeight: '500',
    },
    primaryButton: {
        backgroundColor: '#181818',
        borderRadius: 40,
        paddingHorizontal: 40,
        paddingVertical: 18,
        marginTop: 16,
        marginBottom: 16,
        alignSelf: 'center',
        width: width * 0.9,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    secondaryButton: {
        backgroundColor: '#FCFBF5',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#181818',
        paddingHorizontal: 40,
        paddingVertical: 18,
        alignSelf: 'center',
        width: width * 0.9,
    },
    secondaryButtonText: {
        color: '#181818',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
