import React, { useEffect, useRef } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, typography } from '../app/styles/tokens';

interface Mode {
    key: string;
    title: string;
    example: {
        color: string;
        name: string;
    };
    image: any;
    aspectRatio: number;
}

interface Props {
    modes: Mode[];
    selectedIndex: number;
    onSelect: (index: number) => void;
}

const CARD_WIDTH = 329;
const CARD_GAP = 16;
const snapWidth = CARD_WIDTH + CARD_GAP;
const SIDE_PADDING = (Dimensions.get('window').width - CARD_WIDTH) / 2;

export const QuizModeSelector: React.FC<Props> = ({ modes, selectedIndex, onSelect }) => {
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                x: selectedIndex * snapWidth,
                animated: false,
            });
        }
    }, [selectedIndex]);

    const handleScroll = (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / snapWidth);
        if (index !== selectedIndex) {
            onSelect(index);
        }
    };

    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={snapWidth}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                ref={scrollRef}
            >
                {modes.map((mode, index) => (
                    <TouchableOpacity
                        key={mode.key}
                        style={[
                            styles.modeCard,
                            index === selectedIndex && styles.modeCardSelected,
                            { width: CARD_WIDTH, marginRight: index === modes.length - 1 ? 0 : CARD_GAP, opacity: index === selectedIndex ? 1 : 0.3 }
                        ]}
                        onPress={() => onSelect(index)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.modeCardTop}>
                            <Text style={styles.modeTitle}>{mode.title}</Text>
                        </View>
                        <View style={styles.modeCardBottom}>
                            <Image
                                source={mode.image}
                                style={{ width: 329, height: 162, alignSelf: 'center' }}
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.dotsRow}>
                {modes.map((_, index) => (
                    <View key={index} style={[styles.dot, index === selectedIndex && styles.dotActive]} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
    },
    modeCard: {
        padding: 76,
        backgroundColor: 'white',
        borderRadius: 28,
        marginBottom: 0,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
        height: 238,
    },
    modeCardSelected: {
        borderColor: colors.text,
        borderWidth: 1,
    },
    modeCardTop: {
        position: 'absolute',
        top: -1,
        left: -1,
        right: -1,
        backgroundColor: colors.text,
        borderTopLeftRadius: 29,
        borderTopRightRadius: 29,
        zIndex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 28,
        paddingHorizontal: 24,
    },
    modeCardBottom: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        height: 162,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modeTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.white,
        textAlign: 'left',
        fontFamily: typography.fontFamily.japanese,
        lineHeight: 20,
        fontStyle: 'normal',
    },
    modeExample: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    colorCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.text,
    },
    arrow: {
        fontSize: 24,
        color: colors.text,
        fontFamily: typography.fontFamily.japanese,
    },
    colorName: {
        fontSize: 20,
        color: colors.text,
        fontFamily: typography.fontFamily.japanese,
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 0,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FFFEF7',
        borderWidth: 1,
        borderColor: '#0E0F0F',
    },
    dotActive: {
        backgroundColor: '#0E0F0F',
        borderColor: '#0E0F0F',
        borderWidth: 1,
    },
});
