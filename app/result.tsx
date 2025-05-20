import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { StarRating } from '../components/StarRating';
import { colors, typography } from '../styles/tokens';

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
        <View style={styles.bgBase}>
            <ImageBackground source={require('../assets/images/bg_graph_paper.png')} style={styles.bgImage} imageStyle={styles.bgImageInner}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.title}>クイズ完了！</Text>
                        <StarRating score={stars} max={5} size={32} />
                        <Text style={styles.scoreText}>
                            {score}/{total} ({percentage}%)
                        </Text>
                    </View>
                    <View style={styles.contentBox}>
                        <PrimaryButton onPress={() => router.replace('/')}>モード選択に戻る</PrimaryButton>
                        <SecondaryButton onPress={() => router.replace({ pathname: '/quiz', params: { grade, mode, fromResult: 'true' } })}>もう一度プレイ</SecondaryButton>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingTop: 160,
        paddingHorizontal: 24,
        paddingBottom: 32,
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 36,
        borderWidth: 1,
        borderColor: '#181818',
        alignItems: 'center',
        paddingVertical: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '500',
        color: colors.text,
        marginBottom: 24,
        textAlign: 'center',
        fontFamily: typography.fontFamily.japanese,
    },
    scoreText: {
        fontSize: 20,
        color: colors.text,
        marginTop: 24,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: typography.fontFamily.english,
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    bgImageInner: {
        resizeMode: 'cover',
    },
    bgBase: {
        flex: 1,
        backgroundColor: '#FCFBF5',
    },
    contentBox: {
        width: '100%',
        alignItems: 'center',
        rowGap: 16,
    },
});
