import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { productPosts, businessTypes } from '../data/mockData';

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('הכל');
  const [likedPosts, setLikedPosts] = useState(new Set());

  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `לפני ${diffInDays} ימים`;
    } else if (diffInHours > 0) {
      return `לפני ${diffInHours} שעות`;
    } else {
      return 'עכשיו';
    }
  };

  const filteredPosts = productPosts.filter((post) => {
    const matchesSearch = post.description.includes(searchQuery) || post.businessName.includes(searchQuery);
    return matchesSearch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="חיפוש מוצר או עסק..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterContainer}>
          <Ionicons name="filter" size={20} color={COLORS.black} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {businessTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterChip,
                  selectedType === type && styles.filterChipSelected,
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedType === type && styles.filterChipTextSelected,
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.postsContainer}>
        {filteredPosts.map((post) => {
          const isLiked = likedPosts.has(post.id);
          const displayLikes = post.likes + (isLiked ? 1 : 0);

          return (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.businessInfo}>
                  <View style={styles.businessAvatar}>
                    <Ionicons name="business" size={20} color={COLORS.black} />
                  </View>
                  <View style={styles.businessDetails}>
                    <Text style={styles.businessName}>{post.businessName}</Text>
                    <Text style={styles.postTime}>{formatTimeAgo(post.createdAt)}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.postImageContainer}>
                <Text style={styles.postImage}>{post.image}</Text>
              </View>

              <View style={styles.postContent}>
                <Text style={styles.postDescription}>{post.description}</Text>
                <View style={styles.postActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => toggleLike(post.id)}
                  >
                    <Ionicons
                      name={isLiked ? 'heart' : 'heart-outline'}
                      size={24}
                      color={isLiked ? COLORS.red : COLORS.black}
                    />
                    <Text style={styles.actionText}>{displayLikes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubble-outline" size={24} color={COLORS.black} />
                    <Text style={styles.actionText}>{post.comments}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
    backgroundColor: COLORS.cream,
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
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterScroll: {
    marginRight: SPACING.sm,
  },
  filterChip: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    marginRight: SPACING.sm,
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
  postsContainer: {
    paddingHorizontal: SPACING.lg,
  },
  postCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: {
    padding: SPACING.md,
  },
  businessInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  businessAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.beige,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.md,
  },
  businessDetails: {
    flex: 1,
  },
  businessName: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray,
    marginTop: 2,
  },
  postImageContainer: {
    height: 200,
    backgroundColor: COLORS.beige,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postImage: {
    fontSize: 80,
  },
  postContent: {
    padding: SPACING.md,
  },
  postDescription: {
    fontSize: FONT_SIZES.md,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  postActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.lg,
  },
  actionText: {
    fontSize: FONT_SIZES.md,
    marginRight: SPACING.xs,
  },
});
