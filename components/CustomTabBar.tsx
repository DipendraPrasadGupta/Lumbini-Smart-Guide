import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { Colors } from '../constants/Theme';

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={[styles.tabItem, pathname === '/' && styles.activeTab]}
          onPress={() => router.push('/')}
        >
          <MaterialCommunityIcons 
            name="map-marker-path" 
            size={28} 
            color={pathname === '/' ? Colors.natural : Colors.gray} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="compass-outline" size={28} color={Colors.gray} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabItem, pathname === '/ar' && styles.activeTab]}
          onPress={() => router.push('/ar' as any)}
        >
          <View style={styles.arTabInner}>
            <MaterialCommunityIcons 
              name="layers-outline" 
              size={24} 
              color={pathname === '/ar' ? Colors.natural : Colors.gray} 
            />
            <MaterialCommunityIcons 
              name="alpha-s" 
              size={12} 
              color={pathname === '/ar' ? Colors.natural : Colors.gray} 
              style={{ position: 'absolute', left: 24, top: 18 }}
            />
            <MaterialCommunityIcons 
              name="alpha-r" 
              size={12} 
              color={pathname === '/ar' ? Colors.natural : Colors.gray} 
              style={{ position: 'absolute', left: 34, top: 18 }}
            />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabItem, pathname === '/chat' && styles.activeTab]}
          onPress={() => router.push('/chat' as any)}
        >
          <Ionicons 
            name="chatbubble-outline" 
            size={26} 
            color={pathname === '/chat' ? Colors.natural : Colors.gray} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: `${Colors.natural}E0`, // Natural color with transparency
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF15',
  },
  tabItem: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  arTabInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }
});
