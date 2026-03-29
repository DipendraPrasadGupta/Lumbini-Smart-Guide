import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Theme';

interface SearchBarProps {
  placeholder?: string;
  onVoicePress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search locations, temples...", 
  onVoicePress, 
  onChangeText, 
  value,
  onClear
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons name="search" size={20} color={Colors.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray}
          onChangeText={onChangeText}
          value={value}
          underlineColorAndroid="transparent"
          autoCorrect={false}
        />
        {value && value.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={18} color={Colors.gray} />
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={styles.voiceButton} 
          onPress={onVoicePress}
          activeOpacity={0.7}
        >
          <Ionicons name="mic" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 10,
    zIndex: 100,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 54,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: Colors.white,
    fontSize: 16,
    height: '100%',
  },
  clearButton: {
    padding: 8,
  },
  voiceButton: {
    marginLeft: 4,
    padding: 8,
    backgroundColor: 'rgba(230, 126, 34, 0.15)',
    borderRadius: 20,
  },
});

export default SearchBar;
