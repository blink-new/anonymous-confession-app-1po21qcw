
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, MessageSquare, Heart, TrendingUp } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Mock data for trending confessions
const MOCK_TRENDING = [
  {
    id: '1',
    text: "I've been pretending to like my best friend's music for years. I can't tell them the truth now.",
    location: 'Boston',
    likes: 342,
    comments: 78,
    timestamp: '1d ago',
    trending: 5, // trending rank
  },
  {
    id: '2',
    text: "I anonymously paid for a stranger's groceries when I saw them counting coins at checkout. Their smile made my week.",
    location: 'Miami',
    likes: 289,
    comments: 45,
    timestamp: '2d ago',
    trending: 4,
  },
  {
    id: '3',
    text: "I'm a doctor and sometimes I google symptoms just to double-check myself. We're all human.",
    location: null,
    likes: 256,
    comments: 62,
    timestamp: '1d ago',
    trending: 3,
  },
  {
    id: '4',
    text: "I've been secretly learning to dance for 6 months to surprise my partner at our wedding.",
    location: 'San Francisco',
    likes: 198,
    comments: 34,
    timestamp: '3d ago',
    trending: 2,
  },
  {
    id: '5',
    text: "I pretend to hate reality TV shows in public but I've seen every season of The Bachelor.",
    location: 'Austin',
    likes: 176,
    comments: 41,
    timestamp: '2d ago',
    trending: 1,
  },
];

export default function TrendingScreen() {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderTrendingCard = ({ item, index }: { item: typeof MOCK_TRENDING[0], index: number }) => (
    <Animated.View 
      entering={FadeInDown.duration(400).delay(index * 100)}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View style={styles.maskIcon}>
          <Text style={styles.maskText}>A</Text>
        </View>
        <View style={styles.trendingBadge}>
          <TrendingUp size={12} color="#FFFFFF" />
          <Text style={styles.trendingText}>#{item.trending}</Text>
        </View>
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
        
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={MOCK_TRENDING}
        renderItem={renderTrendingCard}
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
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E91E63',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
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
    alignItems: 'center',
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
  timestamp: {
    color: '#8E8E93',
    fontSize: 12,
    marginLeft: 'auto',
  },
});