import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

export default function SecondHandDetailScreen({ route }) {
  const { item } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `פורסם לפני ${diffInDays} ימים`;
    } else if (diffInHours > 0) {
      return `פורסם לפני ${diffInHours} שעות`;
    } else {
      return 'פורסם עכשיו';
    }
  };

  const openPhone = () => {
    Linking.openURL(`tel:${item.sellerPhone}`);
  };

  const openWhatsApp = () => {
    const cleanPhone = item.sellerPhone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`שלום, אני מעוניין/ת במוצר: ${item.title}`);
    Linking.openURL(`https://wa.me/972${cleanPhone}?text=${message}`);
  };

  const InfoChip = ({ icon, text }) => (
    <View style={styles.infoChip}>
      <Ionicons name={icon} size={16} color={COLORS.black} />
      <Text style={styles.infoChipText}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Text style={styles.image}>{item.images[currentImageIndex]}</Text>
          {item.images.length > 1 && (
            <View style={styles.pagination}>
              {item.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentImageIndex === index && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>₪{item.price}</Text>
          </View>

          <View style={styles.chipsRow}>
            <InfoChip icon="albums" text={item.category} />
            <InfoChip icon="checkmark-circle" text={item.condition} />
          </View>

          <Text style={styles.timeAgo}>{formatTimeAgo(item.createdAt)}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>תיאור</Text>
          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>פרטי מוכר</Text>
          <View style={styles.sellerInfo}>
            <Ionicons name="person" size={20} color={COLORS.black} />
            <Text style={styles.sellerName}>{item.sellerName}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.phoneButton} onPress={openPhone}>
          <Ionicons name="call" size={20} color={COLORS.black} />
          <Text style={styles.phoneButtonText}>התקשר</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
          <Ionicons name="logo-whatsapp" size={20} color={COLORS.white} />
          <Text style={styles.whatsappButtonText}>שלח הודעה</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  imageContainer: {
    height: 300,
    backgroundColor: COLORS.beige,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    fontSize: 120,
  },
  pagination: {
    position: 'absolute',
    bottom: SPACING.lg,
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: COLORS.black,
  },
  content: {
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: SPACING.md,
  },
  price: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  chipsRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.beige,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    marginLeft: SPACING.sm,
  },
  infoChipText: {
    fontSize: FONT_SIZES.sm,
    marginRight: SPACING.xs,
  },
  timeAgo: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZES.md,
    lineHeight: 24,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerName: {
    fontSize: FONT_SIZES.md,
    marginRight: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  phoneButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.beige,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    marginLeft: SPACING.sm,
  },
  phoneButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    marginRight: SPACING.sm,
  },
  whatsappButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
  },
  whatsappButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.white,
    marginRight: SPACING.sm,
  },
});
