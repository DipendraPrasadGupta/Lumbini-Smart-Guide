import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Theme';

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const tabs = [
    { name: 'map', path: '/', icon: 'map', type: 'material' },
    { name: 'history', path: '/historical-timeline', icon: 'compass', type: 'ionicons' },
    { name: 'ar', path: '/ar', icon: 'S_AR', type: 'custom' },
    { name: 'chat', path: '/chat', icon: 'chatbubble', type: 'ionicons' },
  ];

  return (
    <View style={[styles.wrapper, { bottom: Math.max(insets.bottom, 20) + 10 }]}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tabItem, isActive && styles.activeTab]}
              onPress={() => router.push(tab.path as any)}
              activeOpacity={0.8}
            >
              {tab.type === 'custom' ? (
                <View style={styles.arTabInner}>
                  <Text style={[styles.arText, isActive && styles.activeArText]}>S_AR</Text>
                </View>
              ) : (
                tab.type === 'ionicons' ? (
                  <Ionicons
                    name={tab.icon as any}
                    size={isActive ? 30 : 26}
                    color={isActive ? '#331D12' : Colors.gray}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={tab.icon as any}
                    size={isActive ? 30 : 26}
                    color={isActive ? '#331D12' : Colors.gray}
                  />
                )
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(25, 25, 25, 0.95)', // Deep dark for navigation
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: '88%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  tabItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFBE9D', // Peach/Orange active state
    shadowColor: '#FFBE9D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  arTabInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arText: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: -1,
  },
  activeArText: {
    color: '#331D12',
  }
});
