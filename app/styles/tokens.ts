import { Platform, TextStyle, ViewStyle } from 'react-native';

export const typography = {
    fontFamily: {
        japanese: Platform.select({
            ios: 'Hiragino Sans',
            android: '-apple-system',
            web: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            default: 'System',
        }),
        english: Platform.select({
            ios: 'Helvetica Neue',
            android: '-apple-system',
            web: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            default: 'System',
        }),
    },
    fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
    },
    fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    } as const,
    lineHeight: {
        none: 1,
        normal: 1.2,
    },
} as const;

export const colors = {
    background: '#FFFEF7',
    text: '#0E0F0F',
    white: '#FFFFFF',
    border: '#0E0F0F',
    success: '#008383',
    error: '#BA4A4A',
    primary: '#0E0F0F',
} as const;

export const spacing = {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
} as const;

export const layout = {
    padding: {
        top: 64,
        bottom: 32,
        horizontal: 24,
    },
    flex: {
        column: {
            display: 'flex',
            flexDirection: 'column',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
        },
    },
} as const;

export const borderRadius = {
    sm: 6,
    md: 24,
    lg: 28,
    xl: 40,
    circle: 90,
    full: 9999,
} as const;

export const button = {
    primary: {
        container: {
            backgroundColor: colors.primary,
            borderRadius: borderRadius.full,
            display: 'flex',
            paddingVertical: 19,
            paddingHorizontal: 7,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            height: 62,
        } as ViewStyle,
        text: {
            color: colors.white,
            fontSize: typography.fontSize.md,
            fontWeight: Platform.select({
                ios: '700',
                android: '600',
                default: '600',
            }),
            fontFamily: typography.fontFamily.japanese,
            textAlign: 'center',
        } as TextStyle,
    },
} as const;

export const selection = {
    container: {
        paddingTop: 32,
    } as ViewStyle,
    title: {
        fontSize: 20,
        fontWeight: typography.fontWeight.regular,
        color: colors.text,
        fontFamily: typography.fontFamily.japanese,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
    } as TextStyle,
    scrollContainer: {
        flexDirection: 'row',
        gap: 24,
    } as ViewStyle,
    radio: {
        container: {
            display: 'flex',
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            borderRadius: 38,
            borderWidth: 1,
            borderColor: colors.text,
            backgroundColor: colors.background,
        } as ViewStyle,
        containerSelected: {
            display: 'flex',
             padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            borderRadius: borderRadius.full,
            backgroundColor: colors.text,
            borderColor: colors.text,
        } as ViewStyle,
        text: {
            fontSize: 18,
            fontWeight: '300',
            color: colors.text,
            fontFamily: typography.fontFamily.japanese,
            textAlignVertical: 'center',
            includeFontPadding: false,
        } as TextStyle,
        textSelected: {
            fontSize: 18,
            fontWeight: '700',
            color: colors.white,
            fontFamily: typography.fontFamily.japanese,
            textAlignVertical: 'center',
            includeFontPadding: false,
        } as TextStyle,
    },
    card: {
        container: {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: borderRadius.md,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 140,
            backgroundColor: colors.white,
        } as ViewStyle,
        text: {
            fontSize: typography.fontSize.md,
            fontWeight: typography.fontWeight.medium,
            color: colors.text,
            fontFamily: typography.fontFamily.japanese,
        } as TextStyle,
    },
} as const;
