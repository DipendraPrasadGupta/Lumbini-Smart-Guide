import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography } from '../constants/Theme';
import CustomHeader from '../components/CustomHeader';
import SearchBar from '../components/SearchBar';
import CustomTabBar from '../components/CustomTabBar';
import { STAYS, RESTAURANTS, StayData, RestaurantData } from '../constants/Stays';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'apps' },
  { id: 'monastic', label: 'Monastic Stays', icon: 'bank' },
  { id: 'hotels', label: 'Hotels', icon: 'office-building' },
  { id: 'veg', label: 'Vegetarian', icon: 'leaf' },
  { id: 'vegan', label: 'Vegan', icon: 'sprout' },
];

export default function StayEatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStays = STAYS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'monastic') return matchesSearch && s.type === 'monastery';
    if (selectedCategory === 'hotels') return matchesSearch && s.type === 'hotel';
    return matchesSearch; // For food categories, show all stays or none? 
    // Let's show all stays if food is selected, but maybe user wants stays that offer food? 
    // Better: if food category is selected, focus on food.
  });

  const filteredRestaurants = RESTAURANTS.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'veg') return matchesSearch && r.type === 'vegetarian';
    if (selectedCategory === 'vegan') return matchesSearch && r.type === 'vegan';
    return matchesSearch;
  });

  const renderStayCard = ({ item }: { item: StayData }) => (
    <TouchableOpacity 
      style={styles.stayCard} 
      activeOpacity={0.9}
      onPress={() => router.push({ pathname: '/stay-detail/[id]', params: { id: item.id } } as any)}
    >
      <Image source={{ uri: item.image }} style={styles.stayImage} />
      <View style={styles.ratingBadge}>
        <Ionicons name="star" size={12} color="#FFD700" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.stayInfo}>
        <View style={styles.stayHeader}>
          <Text style={styles.stayName}>{item.name}</Text>
          <Text style={styles.stayDistance}>{item.distance}</Text>
        </View>
        <View style={styles.tagContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRestaurantCard = ({ item }: { item: RestaurantData }) => (
    <TouchableOpacity 
      style={styles.restaurantCard}
      activeOpacity={0.9}
      onPress={() => router.push({ pathname: '/eat-detail/[id]', params: { id: item.id } } as any)}
    >
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      <View style={styles.restaurantContent}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={styles.smallRating}>
            <Ionicons name="star" size={10} color="#FFD700" />
            <Text style={styles.smallRatingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.restaurantDesc}>{item.description} • {item.distance}</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>View Menu</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <CustomHeader />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Rest your</Text>
          <Text style={[styles.heroTitle, styles.heroTitleItalic]}>Spirit.</Text>
        </View>

        <SearchBar 
          placeholder="Find a sanctuary or meal..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                selectedCategory === cat.id && styles.activeCategoryChip
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text style={[
                styles.categoryLabel,
                selectedCategory === cat.id && styles.activeCategoryLabel
              ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Stays Section */}
        {filteredStays.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionLabel}>ACCOMMODATION</Text>
                <Text style={styles.sectionTitle}>Serene Stays</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={filteredStays}
              renderItem={renderStayCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.staysList}
              snapToInterval={width * 0.82}
              decelerationRate="fast"
            />
          </View>
        )}
        
        {/* Restaurants Section */}
        {filteredRestaurants.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionLabel}>GASTRONOMY</Text>
                <Text style={styles.sectionTitle}>Nearby Nourishment</Text>
              </View>
            </View>

            <FlatList
              data={filteredRestaurants}
              renderItem={renderRestaurantCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.restaurantList}
            />
          </View>
        )}

        {(filteredStays.length === 0 && filteredRestaurants.length === 0) && (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="leaf-off" size={64} color="rgba(255, 255, 255, 0.1)" />
            <Text style={styles.emptyText}>No sanctuaries found for this path.</Text>
          </View>
        )}
      </ScrollView>

      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.natural,
  },
  scrollContent: {
    paddingTop: 10,
  },
  heroSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 48,
    color: Colors.white,
    fontFamily: Typography.headline,
    lineHeight: 56,
  },
  heroTitleItalic: {
    fontStyle: 'italic',
    color: '#FFBE9D', // Peach color from image
    fontWeight: '300',
  },
  categoryScroll: {
    marginTop: 10,
    marginBottom: 20,
  },
  categoryContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeCategoryChip: {
    backgroundColor: '#6D214F', // Deep magenta from monastic button in image
    borderColor: '#D988B9',
  },
  categoryLabel: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Typography.label,
  },
  activeCategoryLabel: {
    color: Colors.white,
  },
  section: {
    marginTop: 10,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionLabel: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: Typography.headline,
    fontWeight: '600',
  },
  viewAll: {
    color: '#FFBE9D',
    fontSize: 14,
    fontWeight: '700',
  },
  staysList: {
    paddingLeft: 24,
    paddingRight: 10,
  },
  stayCard: {
    width: width * 0.78,
    height: 420,
    marginRight: 16,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#2A2A2A',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  stayImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  ratingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 4,
  },
  ratingText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  stayInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  stayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stayName: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: Typography.headline,
  },
  stayDistance: {
    color: Colors.gray,
    fontSize: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  tagText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  restaurantList: {
    paddingLeft: 24,
    paddingRight: 10,
  },
  restaurantCard: {
    width: 260,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  restaurantImage: {
    width: '100%',
    height: 140,
    borderRadius: 18,
    marginBottom: 12,
  },
  restaurantContent: {
    paddingHorizontal: 4,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  restaurantName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Typography.headline,
  },
  smallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  smallRatingText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  restaurantDesc: {
    color: Colors.gray,
    fontSize: 12,
    marginBottom: 12,
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  menuButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Typography.body,
  },
});
