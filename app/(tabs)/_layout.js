import { Redirect, Tabs } from 'expo-router';
import React, { useContext, useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { loading, isLogged } = useGlobalContext();

  // if (!loading && !isLogged) return <Redirect href="/signin" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      {/* <Tabs.Screen
          name="index"  // Should correspond to the "index" screen file within the same directory
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"  // Should correspond to the "explore" screen file
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            ),
          }}
        /> */}
      <Tabs.Screen
        name="signup" // Should correspond to the "signup" screen file
        options={{
          title: 'Signup',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person-add' : 'person-add-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="signin" // Should correspond to the "signin" screen file, containing AuthScreen
        options={{
          title: 'Sign In',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'log-in' : 'log-in-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="verifyemail" // Should correspond to the "verifyemail" screen file
        options={{
          title: 'Verify Email',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'mail' : 'mail-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="userdetails" // Should correspond to the "userdetails" screen file
        options={{
          title: 'User Details',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profileHome" // Should correspond to the "userdetails" screen file
        options={{
          title: 'profileHome',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profileCourse" // Should correspond to the "userdetails" screen file
        options={{
          title: 'profileCourse',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="gameList" // Should correspond to the "userdetails" screen file
        options={{
          title: 'gameList',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification" // Should correspond to the "userdetails" screen file
        options={{
          title: 'notification',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="C51" // Should correspond to the "userdetails" screen file
        options={{
          title: 'C51',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
