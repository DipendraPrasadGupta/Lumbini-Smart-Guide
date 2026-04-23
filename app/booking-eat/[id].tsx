import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography } from '../../constants/Theme';
import { RESTAURANTS } from '../../constants/Stays';

const { width } = Dimensions.get('window');

const TIMES = ['10:00 AM', '12:00 PM', '02:00 PM', '06:00 PM', '08:00 PM', '09:00 PM'];

const generateNextDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    days.push({
      id: i.toString(),
      fullDate: date,
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: date.getDate().toString(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
    });
  }
  return days;
};

const NEXT_DAYS = generateNextDays();

export default function BookingEatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [selectedDateObj, setSelectedDateObj] = useState(NEXT_DAYS[0]);
  const [guests, setGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState('06:00 PM');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const restaurant = RESTAURANTS.find((r) => r.id === id);

  if (!restaurant) return null;

  if (isConfirmed) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <MaterialCommunityIcons name="food-variant" size={100} color="#2ECC71" />
          </View>
          <Text style={styles.successTitle}>Table Reserved</Text>
          <Text style={styles.successText}>
            Your place at {restaurant.name} is waiting for your spirit on {formatDate(selectedDateObj.fullDate)} at {selectedTime}.
          </Text>
          <TouchableOpacity 
            style={styles.homeButton}
            onPress={() => router.push('/stay-eat')}
          >
            <Text style={styles.homeButtonText}>Back to Discovery</Text>
          </TouchableOpacity>
        </View>
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
        <Text style={styles.headerTitle}>Table Reservation</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Restaurant Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryInfo}>
            <Text style={styles.restType}>{restaurant.type.toUpperCase()}</Text>
            <Text style={styles.restName}>{restaurant.name}</Text>
            <Text style={styles.restLocation}>{restaurant.distance} from Holy Site</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingValue}>{restaurant.rating}</Text>
          </View>
        </View>

        {/* Sanctuary Calendar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sanctuary Calendar</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.calendarContainer}
          >
            {NEXT_DAYS.map((day) => (
              <TouchableOpacity 
                key={day.id}
                style={[
                  styles.dayCard,
                  selectedDateObj.id === day.id && styles.activeDayCard
                ]}
                onPress={() => setSelectedDateObj(day)}
              >
                <Text style={[styles.monthText, selectedDateObj.id === day.id && styles.activeDayText]}>{day.month}</Text>
                <Text style={[styles.dayNumber, selectedDateObj.id === day.id && styles.activeDayText]}>{day.dayNumber}</Text>
                <Text style={[styles.dayName, selectedDateObj.id === day.id && styles.activeDayText]}>{day.dayName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Time</Text>
          <View style={styles.timeGrid}>
            {TIMES.map((time) => (
              <TouchableOpacity 
                key={time}
                style={[
                  styles.timeChip,
                  selectedTime === time && styles.activeTimeChip
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === time && styles.activeTimeText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Guest Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guests</Text>
          <View style={styles.counterRow}>
            <View>
              <Text style={styles.counterTitle}>Number of Spirits</Text>
              <Text style={styles.counterSubtitle}>Total seats available: 12</Text>
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
                onPress={() => guests < 12 && setGuests(guests + 1)}
              >
                <Ionicons name="add" size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Note */}
        <View style={styles.noteBox}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
          <Text style={styles.noteText}>
            Table will be held for 15 minutes after the reserved time.
          </Text>
        </View>

        <View style={styles.footerSpacer} />
      </ScrollView>

      {/* Confirmation Button */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={() => setIsConfirmed(true)}
        >
          <Text style={styles.confirmButtonText}>Confirm Reservation</Text>
          <MaterialCommunityIcons name="silverware-clean" size={20} color={Colors.natural} />
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
  restType: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  restName: {
    color: Colors.white,
    fontSize: 22,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 4,
  },
  restLocation: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ratingValue: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
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
  calendarContainer: {
    paddingRight: 24,
    gap: 12,
  },
  dayCard: {
    width: 65,
    height: 85,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeDayCard: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  monthText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 2,
  },
  dayNumber: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  dayName: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    marginTop: 2,
  },
  activeDayText: {
    color: Colors.natural,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: (width - 48 - 24) / 3,
    alignItems: 'center',
  },
  activeTimeChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
    fontSize: 12,
  },
  activeTimeText: {
    color: Colors.natural,
    fontWeight: '700',
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
    width: 24,
    textAlign: 'center',
  },
  noteBox: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(230, 126, 34, 0.05)',
    borderRadius: 16,
    gap: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  noteText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    zIndex: 50,
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
