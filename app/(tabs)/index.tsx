
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, MessageSquare, Heart } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Mock data for confessions
const MOCK_CONFESSIONS = [
  {
    id: '1',
    text: "Sometimes I feel like I'm not good enough for my dream job, but I keep pushing anyway.",
    location: 'New York',
    likes: 24,
    comments: 5,
    timestamp: '2h ago',
  },
  {
    id: '2',
    text: "I told my partner I was working late, but I was actually buying them a surprise gift for our anniversary.",
    location: 'Los Angeles',
    likes: 56,
    comments: 12,
    timestamp: '4h ago',
  },
  {
    id: '3',
    text: "I'm terrified of failing my final exams, but I haven't told anyone how stressed I am.",
    location: null,
    likes: 18,
    comments: 3,
    timestamp: '6h ago',
  },
  {
    id: '4',
    text: "I secretly learned my girlfriend's native language so I could propose to her in it next month.",
    location: 'Chicago',
    likes: 102,
    comments: 24,
    timestamp: '12h ago',
  },
  {
    id: '5',
    text: "I've been helping an elderly neighbor with groceries for months. They think it's a delivery service, but I pay for it myself.",
    location: 'Seattle',
    likes: 87,
    comments: 15,
    timestamp: '1d ago',
  },
];

export default function RecentScreen() {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderConfessionCard = ({ item, index }: { item: typeof MOCK_CONFESSIONS[0], index: number }) => (
    <Animated.View 
      entering={FadeInDown.duration(400).delay(index * 100)}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View style={styles.maskIcon}>
          <Text style={styles.maskText}>A</Text>
        </View>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      
      <Text style={styles.confessionText}>{item.text}</Text>
      
      {item.location && (
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#9D50BB" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      )}
      
      <View style={styles.cardFooter}>
        <Pressable 
          style={styles.actionButton}
          onPress={() => toggleLike(item.id)}
        >
          <Heart 
            size={18} 
            color={likedPosts[item.id] ? '#E91E63' : '#8E8E93'} 
            fill={likedPosts[item.id] ? '#E91E63' : 'transparent'} 
          />
          <Text style={[
            styles.actionText, 
            likedPosts[item.id] && styles.likedText
          ]}>
            {likedPosts[item.id] ? item.likes + 1 : item.likes}
          </Text>
        </Pressable>
        
        <Pressable style={styles.actionButton}>
          <MessageSquare size={18} color="#8E8E93" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={MOCK_CONFESSIONS}
        renderItem={renderConfessionCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#242424',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#333333',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  maskIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9D50BB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  timestamp: {
    color: '#8E8E93',
    fontSize: 12,
  },
  confessionText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    color: '#9D50BB',
    fontSize: 12,
    marginLeft: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    color: '#8E8E93',
    fontSize: 14,
    marginLeft: 4,
  },
  likedText: {
    color: '#E91E63',
  },
});