
import { Tabs } from 'expo-router';
import { MessageSquare, TrendingUp, PlusCircle, User } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#9D50BB',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0.5,
          borderTopColor: '#2A2A2A',
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: '#FFFFFF',
        },
        headerTintColor: '#FFFFFF',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recent',
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trending"
        options={{
          title: 'Trending',
          tabBarIcon: ({ color, size }) => <TrendingUp size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Confess',
          tabBarIcon: ({ color, size }) => <PlusCircle size={size + 4} color={color} />,
          tabBarLabelStyle: styles.createTabLabel,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  createTabLabel: {
    fontWeight: '600',
  },
});