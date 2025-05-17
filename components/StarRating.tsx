import React from 'react';
import { StyleSheet, View } from 'react-native';
import StarFill from '../assets/images/star_fill.svg';
import StarOutline from '../assets/images/star_outline.svg';
import { colors } from '../styles/tokens';

interface Props {
    score: number;
    max?: number;
    size?: number;
}

export const StarRating: React.FC<Props> = ({ score, max = 5, size = 32 }) => {
    return (
        <View style={styles.borderBox}>
            <View style={styles.row}>
                {[...Array(max)].map((_, i) =>
                    i < score ? (
                        <StarFill width={size} height={size} key={i} />
                    ) : (
                        <StarOutline width={size} height={size} key={i} />
                    )
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    borderBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 9999,
        paddingHorizontal: 32,
        paddingVertical: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 8,
    },
});
