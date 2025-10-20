import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

export default function EventDetailScreen({ route }) {
  const { event } = route.params;

  const openTicketLink = () => {
    if (event.ticketLink) {
      Linking.openURL(event.ticketLink);
    }
  };

  const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={20} color={COLORS.black} />
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Text style={styles.image}>{event.image}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>

          <InfoRow
            icon="calendar"
            label="תאריך"
            value={`${event.date.getDate()}/${event.date.getMonth() + 1}/${event.date.getFullYear()}`}
          />
          <InfoRow icon="time" label="שעה" value={event.time} />
          <InfoRow icon="location" label="מיקום" value={event.location} />
          <InfoRow
            icon="pricetag"
            label="מחיר"
            value={event.price > 0 ? `₪${event.price}` : 'כניסה חופשית'}
          />

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>אודות האירוע</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
      </ScrollView>

      {event.ticketLink && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.ticketButton} onPress={openTicketLink}>
            <Ionicons name="cart" size={20} color={COLORS.white} />
            <Text style={styles.ticketButtonText}>רכישת כרטיסים</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  imageContainer: {
    height: 250,
    backgroundColor: COLORS.beige,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    fontSize: 120,
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: SPACING.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  infoContent: {
    flex: 1,
    marginRight: SPACING.md,
  },
  infoLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
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
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  ticketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
  },
  ticketButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.white,
    marginRight: SPACING.sm,
  },
});
