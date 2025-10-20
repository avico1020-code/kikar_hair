import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { secondHandItems, secondHandCategories, itemConditions } from '../data/mockData';

export default function SecondHandScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('הכל');
  const [selectedCondition, setSelectedCondition] = useState('הכל');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [filterVisible, setFilterVisible] = useState(false);

  const filteredItems = secondHandItems.filter((item) => {
    const matchesSearch = item.title.includes(searchQuery) || item.description.includes(searchQuery);
    const matchesCategory = selectedCategory === 'הכל' || item.category === selectedCategory;
    const matchesCondition = selectedCondition === 'הכל' || item.condition === selectedCondition;
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="חיפוש מוצר..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <Ionicons name="filter" size={20} color={COLORS.black} />
          <Text style={styles.filterButtonText}>סינון מתקדם</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {filteredItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            onPress={() => navigation.navigate('SecondHandDetail', { item })}
          >
            <View style={styles.itemImageContainer}>
              <Text style={styles.itemImage}>{item.images[0]}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.itemCondition}>{item.condition}</Text>
              <Text style={styles.itemPrice}>₪{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>סינון מתקדם</Text>

            <Text style={styles.filterSectionTitle}>קטגוריה</Text>
            <View style={styles.chipsContainer}>
              {secondHandCategories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.filterChip,
                    selectedCategory === category && styles.filterChipSelected,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.filterChipText,
                    selectedCategory === category && styles.filterChipTextSelected,
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>מצב</Text>
            <View style={styles.chipsContainer}>
              {itemConditions.map((condition) => (
                <TouchableOpacity
                  key={condition}
                  style={[
                    styles.filterChip,
                    selectedCondition === condition && styles.filterChipSelected,
                  ]}
                  onPress={() => setSelectedCondition(condition)}
                >
                  <Text style={[
                    styles.filterChipText,
                    selectedCondition === condition && styles.filterChipTextSelected,
                  ]}>
                    {condition}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>טווח מחירים</Text>
            <Text style={styles.priceRangeText}>
              ₪{priceRange[0]} - ₪{priceRange[1]}
            </Text>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.applyButtonText}>החל סינון</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  searchContainer: {
    padding: SPACING.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  searchIcon: {
    marginLeft: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    textAlign: 'right',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.beige,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
  },
  filterButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    marginRight: SPACING.sm,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACING.sm,
  },
  itemCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    margin: '1.5%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImageContainer: {
    height: 120,
    backgroundColor: COLORS.beige,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    fontSize: 60,
  },
  itemInfo: {
    padding: SPACING.sm,
  },
  itemTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  itemCondition: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray,
    marginBottom: SPACING.xs,
  },
  itemPrice: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.cream,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  filterSectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.sm,
  },
  filterChip: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    margin: SPACING.xs,
  },
  filterChipSelected: {
    backgroundColor: COLORS.beige,
  },
  filterChipText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.black,
  },
  filterChipTextSelected: {
    fontWeight: 'bold',
  },
  priceRangeText: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    marginVertical: SPACING.md,
  },
  applyButton: {
    backgroundColor: COLORS.beige,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  applyButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
});
