
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Send } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreateScreen() {
  const [confession, setConfession] = useState('');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [location, setLocation] = useState('Current Location');
  
  const characterLimit = 280;
  const charactersLeft = characterLimit - confession.length;
  
  const handleSubmit = () => {
    if (confession.trim().length === 0) {
      Alert.alert('Empty Confession', 'Please write something before submitting.');
      return;
    }
    
    Alert.alert(
      'Confession Submitted',
      'Your anonymous confession has been shared with the world.',
      [{ text: 'OK', onPress: () => {
        setConfession('');
        setLocationEnabled(false);
      }}]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Animated.View 
        entering={FadeIn.duration(400)}
        style={styles.content}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.maskIcon}>
              <Text style={styles.maskText}>A</Text>
            </View>
            <Text style={styles.headerText}>Share Your Truth</Text>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="What would you like to confess today?"
            placeholderTextColor="#8E8E93"
            multiline
            maxLength={characterLimit}
            value={confession}
            onChangeText={setConfession}
          />
          
          <Text style={[
            styles.characterCount,
            charactersLeft < 20 && styles.characterCountWarning
          ]}>
            {charactersLeft} characters left
          </Text>
          
          <View style={styles.locationToggle}>
            <View style={styles.locationTextContainer}>
              <MapPin size={16} color={locationEnabled ? '#9D50BB' : '#8E8E93'} />
              <Text style={[
                styles.locationToggleText,
                locationEnabled && styles.locationEnabledText
              ]}>
                Add Location
              </Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#3A3A3C', true: '#9D50BB' }}
              thumbColor={locationEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
          
          {locationEnabled && (
            <Animated.View 
              entering={FadeIn.duration(300)}
              style={styles.locationInfo}
            >
              <Text style={styles.locationLabel}>Your location will be shared as:</Text>
              <Text style={styles.locationValue}>{location}</Text>
            </Animated.View>
          )}
          
          <Pressable onPress={handleSubmit}>
            <LinearGradient
              colors={['#9D50BB', '#6E48AA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitButton}
            >
              <Send size={18} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Share Anonymously</Text>
            </LinearGradient>
          </Pressable>
          
          <Text style={styles.disclaimer}>
            You can only post once per day. Your identity will remain anonymous.
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  content: {
    padding: 16,
    flex: 1,
  },
  card: {
    backgroundColor: '#242424',
    borderRadius: 16,
    padding: 16,
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
    alignItems: 'center',
    marginBottom: 16,
  },
  maskIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9D50BB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  maskText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#333333',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  characterCount: {
    color: '#8E8E93',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 16,
  },
  characterCountWarning: {
    color: '#E91E63',
  },
  locationToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 12,
  },
  locationTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationToggleText: {
    color: '#8E8E93',
    marginLeft: 8,
    fontSize: 14,
  },
  locationEnabledText: {
    color: '#9D50BB',
  },
  locationInfo: {
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  locationLabel: {
    color: '#8E8E93',
    fontSize: 12,
    marginBottom: 4,
  },
  locationValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  disclaimer: {
    color: '#8E8E93',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});