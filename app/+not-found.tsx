import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { colors, layout, typography } from '../styles/tokens';

export default function NotFoundScreen() {
  return (
    <React.Fragment>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen does not exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </React.Fragment>
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
    fontSize: 20,
    fontWeight: '400',
    color: colors.text,
    fontFamily: typography.fontFamily.japanese,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
