import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { MessageSquare, Clock, CheckCircle, XCircle, Send } from 'lucide-react-native';

interface OutreachItem {
  id: string;
  creatorName: string;
  creatorUsername: string;
  creatorAvatar: string;
  campaign: string;
  status: 'Sent' | 'Opened' | 'Replied' | 'Accepted' | 'Declined';
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const mockOutreach: OutreachItem[] = [
  {
    id: '1',
    creatorName: 'Sarah Johnson',
    creatorUsername: '@sarahjohnson',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    campaign: 'Summer Fashion Collection',
    status: 'Replied',
    lastMessage: 'I\'d love to collaborate! When do you need the content?',
    timestamp: '2h ago',
    unreadCount: 2,
  },
  {
    id: '2',
    creatorName: 'Mike Chen',
    creatorUsername: '@mikechen',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    campaign: 'Tech Product Launch',
    status: 'Accepted',
    lastMessage: 'Perfect! I\'ll start working on the content draft.',
    timestamp: '1d ago',
    unreadCount: 0,
  },
  {
    id: '3',
    creatorName: 'Emma Davis',
    creatorUsername: '@emmadavis',
    creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    campaign: 'Fitness Challenge',
    status: 'Opened',
    lastMessage: 'Hi Emma! We\'d love to work with you on our fitness campaign...',
    timestamp: '3d ago',
    unreadCount: 0,
  },
  {
    id: '4',
    creatorName: 'Alex Rodriguez',
    creatorUsername: '@alexrodriguez',
    creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    campaign: 'Summer Fashion Collection',
    status: 'Declined',
    lastMessage: 'Thanks for reaching out, but this doesn\'t align with my brand.',
    timestamp: '5d ago',
    unreadCount: 0,
  },
  {
    id: '5',
    creatorName: 'Lisa Park',
    creatorUsername: '@lisapark',
    creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    campaign: 'Tech Product Launch',
    status: 'Sent',
    lastMessage: 'Hi Lisa! We think you\'d be perfect for our tech campaign...',
    timestamp: '1w ago',
    unreadCount: 0,
  },
];

const getStatusIcon = (status: OutreachItem['status']) => {
  switch (status) {
    case 'Sent':
      return <Send color="#6B7280" size={16} />;
    case 'Opened':
      return <Clock color="#F59E0B" size={16} />;
    case 'Replied':
      return <MessageSquare color="#6366F1" size={16} />;
    case 'Accepted':
      return <CheckCircle color="#10B981" size={16} />;
    case 'Declined':
      return <XCircle color="#EF4444" size={16} />;
    default:
      return <Send color="#6B7280" size={16} />;
  }
};

const getStatusColor = (status: OutreachItem['status']) => {
  switch (status) {
    case 'Sent':
      return '#6B7280';
    case 'Opened':
      return '#F59E0B';
    case 'Replied':
      return '#6366F1';
    case 'Accepted':
      return '#10B981';
    case 'Declined':
      return '#EF4444';
    default:
      return '#6B7280';
  }
};

const getStatusBgColor = (status: OutreachItem['status']) => {
  switch (status) {
    case 'Sent':
      return '#F3F4F6';
    case 'Opened':
      return '#FEF3C7';
    case 'Replied':
      return '#E0E7FF';
    case 'Accepted':
      return '#D1FAE5';
    case 'Declined':
      return '#FEE2E2';
    default:
      return '#F3F4F6';
  }
};

export default function OutreachScreen() {
  const [selectedTab, setSelectedTab] = useState('All');
  const tabs = ['All', 'Sent', 'Replied', 'Accepted', 'Declined'];

  const filteredOutreach = mockOutreach.filter(item => 
    selectedTab === 'All' || item.status === selectedTab
  );

  const renderOutreachItem = (item: OutreachItem) => (
    <TouchableOpacity key={item.id} style={styles.outreachItem}>
      <Image source={{ uri: item.creatorAvatar }} style={styles.avatar} />
      
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <View style={styles.creatorInfo}>
            <Text style={styles.creatorName}>{item.creatorName}</Text>
            <Text style={styles.creatorUsername}>{item.creatorUsername}</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusBgColor(item.status) }
            ]}>
              {getStatusIcon(item.status)}
              <Text style={[
                styles.statusText,
                { color: getStatusColor(item.status) }
              ]}>
                {item.status}
              </Text>
            </View>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.campaign}>{item.campaign}</Text>
        
        <Text style={styles.lastMessage} numberOfLines={2}>
          {item.lastMessage}
        </Text>

        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  const getStatsForStatus = (status: string) => {
    if (status === 'All') return mockOutreach.length;
    return mockOutreach.filter(item => item.status === status).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Outreach</Text>
        <TouchableOpacity style={styles.composeButton}>
          <MessageSquare color="#FFFFFF" size={20} />
          <Text style={styles.composeText}>New</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.tabActive,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.tabTextActive,
              ]}
            >
              {tab} ({getStatsForStatus(tab)})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>
            {mockOutreach.filter(item => item.status === 'Replied').length}
          </Text>
          <Text style={styles.summaryLabel}>Replies</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>
            {mockOutreach.filter(item => item.status === 'Accepted').length}
          </Text>
          <Text style={styles.summaryLabel}>Accepted</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>
            {Math.round((mockOutreach.filter(item => item.status === 'Accepted').length / mockOutreach.length) * 100)}%
          </Text>
          <Text style={styles.summaryLabel}>Success Rate</Text>
        </View>
      </View>

      <ScrollView style={styles.outreachContainer} showsVerticalScrollIndicator={false}>
        {filteredOutreach.map(renderOutreachItem)}
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
  composeButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  composeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  tabContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  tab: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tabActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  outreachContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  outreachItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  creatorUsername: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  campaign: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
    marginBottom: 8,
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});