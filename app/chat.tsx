import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  Keyboard,
  Animated,
  ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography } from '../constants/Theme';
import CustomHeader from '../components/CustomHeader';
import CustomTabBar from '../components/CustomTabBar';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: string;
  isDetailed?: boolean;
}

export default function AIChatGuide() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Namaste. I am your enlightened companion. How may I assist your pilgrimage through the sacred grounds of Lumbini today?',
      timestamp: '09:41 AM',
    },
    {
      id: '2',
      sender: 'user',
      text: 'Who built the Ashoka Pillar?',
      timestamp: '09:42 AM',
    },
    {
      id: '3',
      sender: 'ai',
      text: 'The Ashoka Pillar was built by Emperor Ashoka of India during his historic pilgrimage to Lumbini in 249 BC.\n\nHe erected it to commemorate the exact birthplace of Lord Buddha, marking the site with the famous inscription: "Here the Buddha was born."',
      timestamp: '09:42 AM',
      isDetailed: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const sendBtnScale = useRef(new Animated.Value(1)).current;

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    Keyboard.dismiss();

    // Simulate AI Response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "That is a wonderful question. Let me provide you with the spiritual and historical context of that location.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const onPressIn = () => {
    Animated.spring(sendBtnScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(sendBtnScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isAi = item.sender === 'ai';
    
    return (
      <View style={[styles.messageWrapper, isAi ? styles.aiWrapper : styles.userWrapper]}>
        <View style={[
          styles.bubble, 
          isAi ? styles.aiBubble : styles.userBubble,
          item.isDetailed && styles.aiBubbleDetailed
        ]}>
          <Text style={[styles.messageText, isAi ? styles.aiText : styles.userText]}>
            {item.text}
          </Text>
          
          {item.isDetailed && (
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-outline" size={16} color={Colors.primary} />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="bookmark" size={16} color={Colors.primary} />
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Text style={[styles.timestamp, !isAi && { textAlign: 'right' }]}>
          {isAi ? 'LUMBINI AI' : 'YOU'} • {item.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListHeaderComponent={
            <View style={styles.heroSection}>
              <View style={styles.logoContainer}>
                <MaterialCommunityIcons name="star-four-points-outline" size={40} color={Colors.primary} />
                <MaterialCommunityIcons 
                  name="star-four-points" 
                  size={20} 
                  color={Colors.primary} 
                  style={{ position: 'absolute', top: 5, right: 5 }}
                />
              </View>
              <Text style={styles.heroTitle}>Lumbini AI Guide</Text>
              <Text style={styles.heroSubtitle}>DIVINE KNOWLEDGE ASSISTANT</Text>
            </View>
          }
          ListFooterComponent={
            <View style={{ paddingBottom: 20 }}>
              {isTyping && (
                <View style={[styles.messageWrapper, styles.aiWrapper]}>
                  <View style={[styles.bubble, styles.aiBubble, { flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
                    <ActivityIndicator size="small" color={Colors.primary} />
                    <Text style={styles.aiText}>Divine Guide is thinking...</Text>
                  </View>
                </View>
              )}
              
              <View style={styles.suggestedSection}>
                <Text style={styles.sectionLabel}>SUGGESTED INQUIRIES</Text>
                <View style={styles.pillContainer}>
                  {['When was the Maya Devi Temple built?', 'Show me the Sacred Garden map', 'What are the visiting hours?'].map((q, i) => (
                    <TouchableOpacity key={i} style={styles.pill} onPress={() => setInputText(q)}>
                      <Text style={styles.pillText}>{q}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          }
        />

        {/* Input Bar Overlay */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputBar}>
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="add-circle" size={24} color={Colors.white} />
            </TouchableOpacity>
            <TextInput
              placeholder="Ask your spiritual guide..."
              placeholderTextColor="#FFFFFF60"
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              multiline={false}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity style={styles.micButton}>
              <MaterialCommunityIcons name="microphone" size={22} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Animated.View style={{ transform: [{ scale: sendBtnScale }] }}>
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSend}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="send" size={24} color={Colors.natural} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>

      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.natural,
  },
  flex: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 180, // Space for input bar
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 32,
    fontFamily: Typography.headline,
    fontWeight: '700',
    textAlign: 'center',
  },
  heroSubtitle: {
    color: Colors.primary,
    fontSize: 12,
    letterSpacing: 2,
    fontFamily: Typography.label,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  messageWrapper: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  aiWrapper: {
    alignItems: 'flex-start',
  },
  userWrapper: {
    alignItems: 'flex-end',
  },
  bubble: {
    padding: 16,
    borderRadius: 20,
    maxWidth: '85%',
  },
  aiBubble: {
    backgroundColor: '#FFFFFF12',
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF08',
  },
  aiBubbleDetailed: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    maxWidth: '90%',
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: Typography.body,
  },
  aiText: {
    color: '#E0E0E0',
  },
  userText: {
    color: Colors.natural,
    fontWeight: '600',
  },
  timestamp: {
    color: '#FFFFFF30',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF10',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  suggestedSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionLabel: {
    color: '#FFFFFF40',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },
  pillContainer: {
    gap: 10,
  },
  pill: {
    backgroundColor: '#FFFFFF08',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 24,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#FFFFFF10',
  },
  pillText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: Typography.body,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.natural,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF05',
    position: 'absolute',
    bottom: 110,
    left: 0,
    right: 0,
  },
  inputBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF10',
    height: 54,
    borderRadius: 27,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF08',
  },
  attachButton: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    color: Colors.white,
    fontSize: 15,
    fontFamily: Typography.body,
  },
  micButton: {
    marginLeft: 8,
  },
  sendButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  }
});
