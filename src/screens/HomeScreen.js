import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScrollingTicker from '../components/ScrollingTicker';
import CategoryCard from '../components/CategoryCard';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { tickerMessages, businesses, productPosts, secondHandItems, events } from '../data/mockData';

export default function HomeScreen({ navigation }) {
  const PreviewCard = ({ icon, text, trailing }) => (
    <View style={styles.previewCard}>
      <View style={styles.previewIcon}>
        <Text style={styles.previewEmoji}>{icon}</Text>
      </View>
      <Text style={styles.previewText}>{text}</Text>
      {trailing && <Text style={styles.previewTrailing}>{trailing}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollingTicker messages={tickerMessages} />
      <ScrollView style={styles.content}>
        <View style={styles.categoriesGrid}>
          <View style={styles.categoryRow}>
            <CategoryCard
              title="עסקים"
              icon="business"
              onPress={() => navigation.navigate('Businesses')}
            />
            <CategoryCard
              title="מוצרים"
              icon="bag-handle"
              onPress={() => navigation.navigate('Products')}
            />
          </View>
          <View style={styles.categoryRow}>
            <CategoryCard
              title="יד שנייה"
              icon="refresh"
              onPress={() => navigation.navigate('SecondHand')}
            />
            <CategoryCard
              title="אירועים"
              icon="calendar"
              onPress={() => navigation.navigate('Events')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="business" size={24} color={COLORS.black} />
            <Text style={styles.sectionTitle}>עסקים אחרונים</Text>
          </View>
          <PreviewCard icon={businesses[0].logo} text={businesses[0].name} />
          <PreviewCard icon={businesses[1].logo} text={businesses[1].name} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bag-handle" size={24} color={COLORS.black} />
            <Text style={styles.sectionTitle}>מוצרים אחרונים</Text>
          </View>
          <PreviewCard icon={productPosts[0].image} text={productPosts[0].description.substring(0, 40) + '...'} />
          <PreviewCard icon={productPosts[1].image} text={productPosts[1].description.substring(0, 40) + '...'} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="refresh" size={24} color={COLORS.black} />
            <Text style={styles.sectionTitle}>יד שנייה אחרונה</Text>
          </View>
          <PreviewCard
            icon={secondHandItems[0].images[0]}
            text={secondHandItems[0].title}
            trailing={`₪${secondHandItems[0].price}`}
          />
          <PreviewCard
            icon={secondHandItems[1].images[0]}
            text={secondHandItems[1].title}
            trailing={`₪${secondHandItems[1].price}`}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={24} color={COLORS.black} />
            <Text style={styles.sectionTitle}>אירועים קרובים</Text>
          </View>
          <PreviewCard
            icon={events[0].image}
            text={events[0].title}
            trailing={`${events[0].date.getDate()}/${events[0].date.getMonth() + 1}`}
          />
          <PreviewCard
            icon={events[1].image}
            text={events[1].title}
            trailing={`${events[1].date.getDate()}/${events[1].date.getMonth() + 1}`}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  content: {
    flex: 1,
  },
  categoriesGrid: {
    padding: SPACING.lg,
  },
  categoryRow: {
    flexDirection: 'row',
    marginHorizontal: -SPACING.sm,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginLeft: SPACING.sm,
  },
  previewCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  previewIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.beige,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.md,
  },
  previewEmoji: {
    fontSize: 24,
  },
  previewText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
  },
  previewTrailing: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
});
