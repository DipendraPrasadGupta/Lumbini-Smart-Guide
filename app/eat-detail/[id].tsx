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
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography } from '../../constants/Theme';
import { RESTAURANTS, RestaurantData, Review, MenuItem } from '../../constants/Stays';
import CustomTabBar from '../../components/CustomTabBar';

const { width, height } = Dimensions.get('window');

const MenuItemCard = ({ item }: { item: MenuItem }) => (
  <View style={styles.menuItem}>
    <View style={styles.menuItemHeader}>
      <View style={styles.menuItemTitleRow}>
        {item.isPopular && (
          <View style={styles.popularBadge}>
            <Ionicons name="flame" size={10} color={Colors.white} />
            <Text style={styles.popularText}>POPULAR</Text>
          </View>
        )}
        <Text style={styles.menuItemName}>{item.name}</Text>
      </View>
      <Text style={styles.menuItemPrice}>{item.price}</Text>
    </View>
    
    <Text style={styles.menuItemDesc}>{item.description}</Text>
    
    {item.tags && (
      <View style={styles.menuItemTags}>
        {item.tags.map((tag, idx) => (
          <View key={idx} style={styles.miniTag}>
            <Text style={styles.miniTagText}>{tag.toUpperCase()}</Text>
          </View>
        ))}
      </View>
    )}
  </View>
);

export default function EatDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState(0);

  const restaurant = RESTAURANTS.find((r) => r.id === id);

  if (!restaurant) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Experience ${restaurant.name} in Lumbini!`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLink = (url: string) => Linking.openURL(url);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: restaurant.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          
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
            <View style={styles.typeBadge}>
              <MaterialCommunityIcons 
                name={restaurant.type === 'vegan' ? 'sprout' : 'leaf'} 
                size={14} 
                color={Colors.primary} 
              />
              <Text style={styles.typeText}>{restaurant.type.toUpperCase()}</Text>
            </View>
            <Text style={styles.restName}>{restaurant.name}</Text>
            <View style={styles.ratingRow}>
              <View style={styles.starRow}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingValue}>{restaurant.rating}</Text>
              </View>
              <View style={styles.separator} />
              <Text style={styles.distanceText}>{restaurant.distance} away</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          
          {/* Chef's Note */}
          {restaurant.chefNote && (
            <View style={styles.chefSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>A Word from the Soul</Text>
                <MaterialCommunityIcons name="chef-hat" size={20} color={Colors.primary} />
              </View>
              <View style={styles.chefNoteContainer}>
                <Text style={styles.chefNote}>{restaurant.chefNote}</Text>
              </View>
            </View>
          )}

          {/* Quick Actions */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionItem} onPress={() => handleLink(`tel:${restaurant.contact.phone}`)}>
              <View style={styles.actionIcon}>
                <Ionicons name="call-outline" size={20} color={Colors.primary} />
              </View>
              <Text style={styles.actionLabel}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem} onPress={() => handleLink(`https://${restaurant.contact.website}`)}>
              <View style={styles.actionIcon}>
                <Ionicons name="globe-outline" size={20} color={Colors.primary} />
              </View>
              <Text style={styles.actionLabel}>Website</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Ionicons name="navigate-outline" size={20} color={Colors.primary} />
              </View>
              <Text style={styles.actionLabel}>Directions</Text>
            </TouchableOpacity>
          </View>

          {/* Opening Hours */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Operating Hours</Text>
            <View style={styles.hoursContainer}>
              {restaurant.openingHours.map((hour, idx) => (
                <View key={idx} style={styles.hourRow}>
                  <Text style={styles.hourDays}>{hour.days}</Text>
                  <Text style={styles.hourTime}>{hour.time}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Enhanced Nourishment Menu */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nourishment Menu</Text>
            
            {/* Category Tabs */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.menuTabs}
              contentContainerStyle={styles.menuTabsContent}
            >
              {restaurant.menu.map((cat, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  style={[
                    styles.menuTab,
                    activeCategory === idx && styles.activeMenuTab
                  ]}
                  onPress={() => setActiveCategory(idx)}
                >
                  <Text style={[
                    styles.menuTabText,
                    activeCategory === idx && styles.activeMenuTabText
                  ]}>
                    {cat.category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Menu Items */}
            <View style={styles.menuItemsContainer}>
              {restaurant.menu[activeCategory].items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </View>
          </View>

          {/* Contact Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Visit Us</Text>
            <View style={styles.addressCard}>
              <Ionicons name="location-sharp" size={20} color={Colors.primary} />
              <Text style={styles.addressText}>{restaurant.contact.address}</Text>
            </View>
          </View>

          <View style={styles.footerSpacer} />
        </View>
      </ScrollView>

      {/* Floating Reservation Bar */}
      <View style={[styles.bookingBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View>
          <Text style={styles.priceLabel}>Reserve Sanctuary</Text>
          <Text style={styles.priceValue}>Fine Dining</Text>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => router.push({ pathname: '/booking-eat/[id]', params: { id: restaurant.id } } as any)}
        >
          <Text style={styles.bookButtonText}>Reserve Table</Text>
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
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    height: height * 0.45,
    width: '100%',
  },
  heroImage: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
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
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(230, 126, 34, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  typeText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  restName: {
    color: Colors.white,
    fontSize: 32,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  starRow: {
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: Typography.headline,
    fontWeight: '700',
    marginBottom: 16,
  },
  chefSection: {
    marginBottom: 32,
  },
  chefNoteContainer: {
    backgroundColor: 'rgba(230, 126, 34, 0.05)',
    padding: 16,
    borderRadius: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  chefNote: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 22,
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
  hoursContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 20,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  hourDays: {
    color: Colors.white,
    fontWeight: '600',
  },
  hourTime: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  menuTabs: {
    marginBottom: 24,
  },
  menuTabsContent: {
    gap: 12,
  },
  menuTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeMenuTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  menuTabText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '700',
    fontSize: 13,
  },
  activeMenuTabText: {
    color: Colors.natural,
  },
  menuItemsContainer: {
    gap: 16,
  },
  menuItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  menuItemTitleRow: {
    flex: 1,
    gap: 8,
  },
  menuItemName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  menuItemPrice: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  menuItemDesc: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  menuItemTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  miniTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  miniTagText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E74C3C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  popularText: {
    color: Colors.white,
    fontSize: 8,
    fontWeight: '900',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  addressText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    flex: 1,
  },
  footerSpacer: {
    height: 200,
  },
  bookingBar: {
    position: 'absolute',
    bottom: 24, // Lowered since TabBar is removed
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
    zIndex: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  priceLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  priceValue: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookButtonText: {
    color: Colors.natural,
    fontSize: 15,
    fontWeight: '800',
  },
});
