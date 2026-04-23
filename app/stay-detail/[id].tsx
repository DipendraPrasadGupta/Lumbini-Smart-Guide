import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Share,
  Linking,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography } from '../../constants/Theme';
import { STAYS, StayData, Review } from '../../constants/Stays';
import CustomTabBar from '../../components/CustomTabBar';

const { width, height } = Dimensions.get('window');

const ReviewItem = ({ review }: { review: Review }) => (
  <View style={styles.reviewCard}>
    <View style={styles.reviewHeader}>
      <Image source={{ uri: review.userImage }} style={styles.reviewAvatar} />
      <View style={styles.reviewUser}>
        <Text style={styles.reviewName}>{review.userName}</Text>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
      <View style={styles.reviewRating}>
        <Ionicons name="star" size={12} color="#FFD700" />
        <Text style={styles.reviewRatingText}>{review.rating}</Text>
      </View>
    </View>
    <Text style={styles.reviewComment}>{review.comment}</Text>
  </View>
);

export default function StayDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeImage, setActiveImage] = useState(0);

  const stay = STAYS.find((s) => s.id === id);

  if (!stay) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Stay not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${stay.name} in Lumbini!`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCall = () => Linking.openURL(`tel:${stay.contact.phone}`);
  const handleEmail = () => Linking.openURL(`mailto:${stay.contact.email}`);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Gallery Hero Section */}
        <View style={styles.heroContainer}>
          <FlatList
            data={[stay.image, ...stay.galleryImages]}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              setActiveImage(Math.round(x / width));
            }}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.galleryImage} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.heroOverlay} />
          
          {/* Pagination Dots */}
          <View style={styles.paginationDots}>
            {[stay.image, ...stay.galleryImages].map((_, i) => (
              <View 
                key={i} 
                style={[
                  styles.dot, 
                  activeImage === i ? styles.activeDot : styles.inactiveDot
                ]} 
              />
            ))}
          </View>

          <View style={[styles.headerActions, { paddingTop: Math.max(insets.top, 20) }]}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color={Colors.white} />
            </TouchableOpacity>
            
            <View style={styles.rightActions}>
              <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
                <Ionicons name="share-social-outline" size={22} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="heart-outline" size={22} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.heroInfo}>
            <View style={styles.stayTypeBadge}>
              <Text style={styles.stayTypeText}>{stay.type.toUpperCase()}</Text>
            </View>
            <Text style={styles.stayName}>{stay.name}</Text>
            <View style={styles.ratingRow}>
              <View style={styles.ratingStars}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingValue}>{stay.rating}</Text>
              </View>
              <View style={styles.separator} />
              <Text style={styles.distanceText}>{stay.distance} from Maya Devi</Text>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this sanctuary</Text>
            <Text style={styles.description}>{stay.description}</Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionItem} onPress={handleCall}>
              <View style={styles.actionIcon}>
                <Ionicons name="call-outline" size={20} color={Colors.primary} />
              </View>
              <Text style={styles.actionLabel}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem} onPress={handleEmail}>
              <View style={styles.actionIcon}>
                <Ionicons name="mail-outline" size={20} color={Colors.primary} />
              </View>
              <Text style={styles.actionLabel}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem} onPress={() => Linking.openURL(`https://${stay.contact.website}`)}>
              <View style={styles.actionIcon}>
                <Ionicons name="globe-outline" size={20} color={Colors.primary} />
              </View>
              <Text style={styles.actionLabel}>Website</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {stay.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <View style={styles.amenityIconContainer}>
                    <MaterialCommunityIcons name={amenity.icon as any} size={24} color={Colors.primary} />
                  </View>
                  <Text style={styles.amenityLabel}>{amenity.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>House Rules & Policies</Text>
            <View style={styles.policiesContainer}>
              {stay.policies.map((policy, index) => (
                <View key={index} style={styles.policyRow}>
                  <Ionicons name="checkmark-circle" size={18} color="#2ECC71" />
                  <Text style={styles.policyText}>{policy}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.reviewHeaderSection}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity>
                <Text style={styles.viewMore}>See all</Text>
              </TouchableOpacity>
            </View>
            {stay.reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <TouchableOpacity 
              style={styles.mapPlaceholder}
              onPress={() => router.push('/')}
            >
              <MaterialCommunityIcons name="map-marker-radius" size={40} color={Colors.primary} />
              <Text style={styles.mapText}>View on Interactive Map</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerSpacer} />
        </View>
      </ScrollView>

      {/* Floating Bottom Booking Bar */}
      <View style={[styles.bookingBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.priceValue}>{stay.price}</Text>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => router.push({ pathname: '/booking-stays/[id]', params: { id: stay.id } } as any)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    height: height * 0.5,
    width: '100%',
  },
  galleryImage: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  paginationDots: {
    position: 'absolute',
    bottom: 120,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: Colors.primary,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  headerActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  rightActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  heroInfo: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
  },
  stayTypeBadge: {
    backgroundColor: 'rgba(230, 126, 34, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  stayTypeText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  stayName: {
    color: Colors.white,
    fontSize: 32,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingValue: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  distanceText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: Colors.natural,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 16,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 15,
    lineHeight: 24,
    fontFamily: Typography.body,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(230, 126, 34, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  amenityItem: {
    width: (width - 48 - 32) / 3,
    alignItems: 'center',
    gap: 8,
  },
  amenityIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  amenityLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  policiesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  policyText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  reviewHeaderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewMore: {
    color: Colors.primary,
    fontWeight: '700',
  },
  reviewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  reviewUser: {
    flex: 1,
  },
  reviewName: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  reviewDate: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  reviewRatingText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  reviewComment: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    lineHeight: 20,
  },
  mapPlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
  },
  mapText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  footerSpacer: {
    height: 140,
  },
  bookingBar: {
    position: 'absolute',
    bottom: 24, // Increased from 95 to avoid overlap with CustomTabBar
    left: 20,
    right: 20,
    backgroundColor: 'rgba(25, 25, 25, 0.98)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 20,
    zIndex: 150, // Higher than TabBar's 100
  },
  priceLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  priceValue: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 18,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  bookButtonText: {
    color: Colors.natural,
    fontSize: 16,
    fontWeight: '800',
  },
  errorText: {
    color: Colors.white,
    fontSize: 18,
    marginBottom: 16,
  },
  backLink: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
