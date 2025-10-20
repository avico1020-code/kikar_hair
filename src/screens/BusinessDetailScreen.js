import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';

export default function BusinessDetailScreen({ route }) {
  const { business } = route.params;

  const openPhone = () => {
    Linking.openURL(`tel:${business.phone}`);
  };

  const openWebsite = () => {
    Linking.openURL(`https://${business.website}`);
  };

  const openMap = () => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${business.latitude},${business.longitude}`);
  };

  const openSocialMedia = (url) => {
    Linking.openURL(url);
  };

  const InfoRow = ({ icon, text, onPress }) => (
    <TouchableOpacity style={styles.infoRow} onPress={onPress} disabled={!onPress}>
      <Ionicons name={icon} size={20} color={COLORS.black} />
      <Text style={styles.infoText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>{business.logo}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.businessName}>{business.name}</Text>
        <Text style={styles.businessType}>{business.type}</Text>

        <View style={styles.divider} />

        <InfoRow icon="location" text={business.address} />
        <InfoRow icon="call" text={business.phone} onPress={openPhone} />
        <InfoRow icon="globe" text={business.website} onPress={openWebsite} />

        {(business.socialMedia.facebook || business.socialMedia.instagram) && (
          <>
            <Text style={styles.sectionTitle}>עקבו אחרינו:</Text>
            <View style={styles.socialContainer}>
              {business.socialMedia.facebook && (
                <TouchableOpacity
                  style={[styles.socialButton, { backgroundColor: '#1877F2' }]}
                  onPress={() => openSocialMedia(business.socialMedia.facebook)}
                >
                  <Text style={styles.socialButtonText}>F</Text>
                </TouchableOpacity>
              )}
              {business.socialMedia.instagram && (
                <TouchableOpacity
                  style={[styles.socialButton, { backgroundColor: '#E4405F' }]}
                  onPress={() => openSocialMedia(business.socialMedia.instagram)}
                >
                  <Text style={styles.socialButtonText}>I</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        <Text style={styles.sectionTitle}>אודות</Text>
        <Text style={styles.description}>{business.description}</Text>

        <Text style={styles.sectionTitle}>מיקום</Text>
        <TouchableOpacity onPress={openMap} style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: business.latitude,
              longitude: business.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: business.latitude,
                longitude: business.longitude,
              }}
            />
          </MapView>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapButton} onPress={openMap}>
          <Ionicons name="map" size={20} color={COLORS.blue} />
          <Text style={styles.mapButtonText}>פתח ב-Google Maps</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  logoContainer: {
    backgroundColor: COLORS.beige,
    padding: SPACING.xxl,
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
  },
  content: {
    padding: SPACING.lg,
  },
  businessName: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  businessType: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray,
    marginBottom: SPACING.lg,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SPACING.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  infoText: {
    fontSize: FONT_SIZES.md,
    marginRight: SPACING.md,
    flex: 1,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  socialContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
  },
  socialButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  description: {
    fontSize: FONT_SIZES.md,
    lineHeight: 24,
    color: COLORS.black,
  },
  mapContainer: {
    height: 250,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  map: {
    flex: 1,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
  },
  mapButtonText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.blue,
    marginRight: SPACING.sm,
  },
});
