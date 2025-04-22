
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MapPin, MessageSquare, Heart } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ConfessionCardProps {
  id: string;
  text: string;
  location: string | null;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
  onLike: (id: string) => void;
  index: number;
  trending?: number;
}

export function ConfessionCard({
  id,
  text,
  location,
  likes,
  comments,
  timestamp,
  isLiked,
  onLike,
  index,
  trending,
}: ConfessionCardProps) {
  return (
    <Animated.View 
      entering={FadeInDown.duration(400).delay(index * 100)}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View style={styles.maskIcon}>
          <Text style={styles.maskText}>A</Text>
        </View>
        
        {trending ? (
          <View style={styles.trendingBadge}>
            <Text style={styles.trendingText}>#{trending}</Text>
          </View>
        ) : (
          <Text style={styles.timestamp}>{timestamp}</Text>
        )}
      </View>
      
      <Text style={styles.confessionText}>{text}</Text>
      
      {location && (
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#9D50BB" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      )}
      
      <View style={styles.cardFooter}>
        <Pressable 
          style={styles.actionButton}
          onPress={() => onLike(id)}
        >
          <Heart 
            size={18} 
            color={isLiked ? '#E91E63' : '#8E8E93'} 
            fill={isLiked ? '#E91E63' : 'transparent'} 
          />
          <Text style={[
            styles.actionText, 
            isLiked && styles.likedText
          ]}>
            {likes}
          </Text>
        </Pressable>
        
        <Pressable style={styles.actionButton}>
          <MessageSquare size={18} color="#8E8E93" />
          <Text style={styles.actionText}>{comments}</Text>
        </Pressable>
        
        {trending && (
          <Text style={styles.timestamp}>{timestamp}</Text>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
  trendingBadge: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
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
});