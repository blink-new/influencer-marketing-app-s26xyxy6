import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { 
  Settings, 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  User,
  Building,
  Mail,
  Phone
} from 'lucide-react-native';

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
}

export default function ProfileScreen() {
  const userInfo = {
    name: 'Alex Thompson',
    email: 'alex@brandstudio.com',
    company: 'Brand Studio',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  };

  const menuSections: MenuSection[] = [
    {
      title: 'Account',
      items: [
        {
          icon: <User color="#6366F1" size={20} />,
          title: 'Edit Profile',
          subtitle: 'Update your personal information',
          onPress: () => {},
          showChevron: true,
        },
        {
          icon: <Building color="#6366F1" size={20} />,
          title: 'Company Settings',
          subtitle: 'Manage your brand information',
          onPress: () => {},
          showChevron: true,
        },
        {
          icon: <Bell color="#6366F1" size={20} />,
          title: 'Notifications',
          subtitle: 'Configure your alerts',
          onPress: () => {},
          showChevron: true,
        },
      ],
    },
    {
      title: 'Billing',
      items: [
        {
          icon: <CreditCard color="#10B981" size={20} />,
          title: 'Payment Methods',
          subtitle: 'Manage cards and billing',
          onPress: () => {},
          showChevron: true,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: <HelpCircle color="#F59E0B" size={20} />,
          title: 'Help Center',
          subtitle: 'Get help and support',
          onPress: () => {},
          showChevron: true,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: <LogOut color="#EF4444" size={20} />,
          title: 'Sign Out',
          onPress: () => {},
          showChevron: false,
        },
      ],
    },
  ];

  const renderMenuItem = (item: MenuItem, index: number) => (
    <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          {item.icon}
        </View>
        <View style={styles.menuItemContent}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      {item.showChevron && (
        <ChevronRight color="#9CA3AF" size={20} />
      )}
    </TouchableOpacity>
  );

  const renderMenuSection = (section: MenuSection, index: number) => (
    <View key={index} style={styles.menuSection}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.sectionContent}>
        {section.items.map(renderMenuItem)}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color="#6366F1" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userCompany}>{userInfo.company}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactCard}>
          <View style={styles.contactItem}>
            <Mail color="#6B7280" size={16} />
            <Text style={styles.contactText}>{userInfo.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Phone color="#6B7280" size={16} />
            <Text style={styles.contactText}>{userInfo.phone}</Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Active Campaigns</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>48</Text>
            <Text style={styles.statLabel}>Total Creators</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>$125K</Text>
            <Text style={styles.statLabel}>Total Spend</Text>
          </View>
        </View>

        {menuSections.map(renderMenuSection)}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Influencer Connect v1.0.0</Text>
          <Text style={styles.footerText}>© 2024 Brand Studio</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  userCompany: {
    fontSize: 16,
    color: '#6B7280',
  },
  editButton: {
    backgroundColor: '#6366F1',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
});