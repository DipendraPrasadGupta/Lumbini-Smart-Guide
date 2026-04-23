import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography } from '../../constants/Theme';
import { STAYS } from '../../constants/Stays';
import CustomTabBar from '../../components/CustomTabBar';

const { width } = Dimensions.get('window');

export default function BookingScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(2);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const stay = STAYS.find((s) => s.id === id);

  const totalPrice = useMemo(() => {
    if (!stay?.price) return 0;
    const priceValue = parseInt(stay.price.replace(/[^0-9]/g, ''));
    return priceValue * nights * (stay.type === 'hotel' ? guests : 1); // Monasteries usually fixed per room
  }, [stay, nights, guests]);

  if (!stay) return null;

  if (isConfirmed) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={100} color="#2ECC71" />
          </View>
          <Text style={styles.successTitle}>Journey Confirmed</Text>
          <Text style={styles.successText}>
            Your sanctuary at {stay.name} is ready. 
            A confirmation email has been sent to your spirit.
          </Text>
          <TouchableOpacity 
            style={styles.homeButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.homeButtonText}>Back to Map</Text>
          </TouchableOpacity>
        </View>
        <CustomTabBar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Secure Booking</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Stay Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryInfo}>
            <Text style={styles.stayType}>{stay.type.toUpperCase()}</Text>
            <Text style={styles.stayName}>{stay.name}</Text>
            <Text style={styles.stayLocation}>{stay.distance} from Holy Site</Text>
          </View>
          <View style={styles.priceTag}>
            <Text style={styles.priceTagValue}>{stay.price}</Text>
            <Text style={styles.priceTagLabel}>/ night</Text>
          </View>
        </View>

        {/* Date Selection Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Dates</Text>
          <View style={styles.dateSelector}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>CHECK-IN</Text>
              <Text style={styles.dateValue}>24 April, 2026</Text>
            </View>
            <View style={styles.dateSeparator} />
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>CHECK-OUT</Text>
              <Text style={styles.dateValue}>26 April, 2026</Text>
            </View>
          </View>
        </View>

        {/* Guest Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travelers</Text>
          <View style={styles.counterRow}>
            <View>
              <Text style={styles.counterTitle}>Number of Spirits</Text>
              <Text style={styles.counterSubtitle}>Maximum 4 per room</Text>
            </View>
            <View style={styles.counterActions}>
              <TouchableOpacity 
                style={styles.counterBtn}
                onPress={() => guests > 1 && setGuests(guests - 1)}
              >
                <Ionicons name="remove" size={20} color={Colors.white} />
              </TouchableOpacity>
              <Text style={styles.counterValue}>{guests}</Text>
              <TouchableOpacity 
                style={styles.counterBtn}
                onPress={() => guests < 4 && setGuests(guests + 1)}
              >
                <Ionicons name="add" size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{stay.price || 'N/A'} x {nights} nights</Text>
            <Text style={styles.priceAmount}>
              ${stay.price ? parseInt(stay.price.replace(/[^0-9]/g, '')) * nights : 0}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceAmount}>$0.00</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Holy Contribution</Text>
            <Text style={styles.totalValue}>${totalPrice}</Text>
          </View>
        </View>

        <View style={styles.footerSpacer} />
      </ScrollView>

      {/* Confirmation Button */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={() => setIsConfirmed(true)}
        >
          <Text style={styles.confirmButtonText}>Confirm Sanctuary</Text>
          <MaterialCommunityIcons name="shield-check" size={20} color={Colors.natural} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.natural,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.natural,
    zIndex: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Typography.headline,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  summaryCard: {
    backgroundColor: 'rgba(230, 126, 34, 0.15)',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 32,
  },
  summaryInfo: {
    flex: 1,
  },
  stayType: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  stayName: {
    color: Colors.white,
    fontSize: 22,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 4,
  },
  stayLocation: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  priceTag: {
    alignItems: 'flex-end',
  },
  priceTagValue: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  priceTagLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 16,
  },
  dateSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  dateValue: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  dateSeparator: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  counterTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  counterSubtitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
  },
  counterActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  counterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    width: 20,
    textAlign: 'center',
  },
  paymentSection: {
    marginBottom: 40,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
  priceAmount: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  totalLabel: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    zIndex: 150,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    height: 64,
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  confirmButtonText: {
    color: Colors.natural,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: Typography.headline,
  },
  footerSpacer: {
    height: 120,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  successIcon: {
    marginBottom: 32,
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  successTitle: {
    color: Colors.white,
    fontSize: 32,
    fontFamily: Typography.headline,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  successText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  homeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 20,
  },
  homeButtonText: {
    color: Colors.natural,
    fontSize: 16,
    fontWeight: '800',
  },
});
