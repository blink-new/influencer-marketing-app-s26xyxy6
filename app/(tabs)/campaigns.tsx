import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Plus, Calendar, DollarSign, Users, TrendingUp } from 'lucide-react-native';

interface Campaign {
  id: string;
  name: string;
  status: 'Draft' | 'Active' | 'Review' | 'Complete';
  budget: string;
  creators: number;
  startDate: string;
  endDate: string;
  reach: string;
  engagement: string;
  progress: number;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Fashion Collection',
    status: 'Active',
    budget: '$5,000',
    creators: 8,
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    reach: '245K',
    engagement: '4.2%',
    progress: 65,
  },
  {
    id: '2',
    name: 'Tech Product Launch',
    status: 'Review',
    budget: '$8,500',
    creators: 12,
    startDate: '2024-05-15',
    endDate: '2024-06-15',
    reach: '380K',
    engagement: '5.1%',
    progress: 90,
  },
  {
    id: '3',
    name: 'Fitness Challenge',
    status: 'Draft',
    budget: '$3,200',
    creators: 5,
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    reach: '0',
    engagement: '0%',
    progress: 25,
  },
  {
    id: '4',
    name: 'Holiday Promotion',
    status: 'Complete',
    budget: '$12,000',
    creators: 15,
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    reach: '520K',
    engagement: '3.8%',
    progress: 100,
  },
];

const getStatusColor = (status: Campaign['status']) => {
  switch (status) {
    case 'Draft':
      return '#6B7280';
    case 'Active':
      return '#10B981';
    case 'Review':
      return '#F59E0B';
    case 'Complete':
      return '#6366F1';
    default:
      return '#6B7280';
  }
};

const getStatusBgColor = (status: Campaign['status']) => {
  switch (status) {
    case 'Draft':
      return '#F3F4F6';
    case 'Active':
      return '#D1FAE5';
    case 'Review':
      return '#FEF3C7';
    case 'Complete':
      return '#E0E7FF';
    default:
      return '#F3F4F6';
  }
};

export default function CampaignsScreen() {
  const [selectedTab, setSelectedTab] = useState('All');
  const tabs = ['All', 'Active', 'Draft', 'Review', 'Complete'];

  const filteredCampaigns = mockCampaigns.filter(campaign => 
    selectedTab === 'All' || campaign.status === selectedTab
  );

  const renderCampaignCard = (campaign: Campaign) => (
    <TouchableOpacity key={campaign.id} style={styles.campaignCard}>
      <View style={styles.cardHeader}>
        <View style={styles.campaignInfo}>
          <Text style={styles.campaignName}>{campaign.name}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusBgColor(campaign.status) }
          ]}>
            <Text style={[
              styles.statusText,
              { color: getStatusColor(campaign.status) }
            ]}>
              {campaign.status}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${campaign.progress}%`,
                backgroundColor: getStatusColor(campaign.status)
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{campaign.progress}%</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <DollarSign color="#10B981" size={16} />
          <Text style={styles.statValue}>{campaign.budget}</Text>
          <Text style={styles.statLabel}>Budget</Text>
        </View>
        <View style={styles.statItem}>
          <Users color="#6366F1" size={16} />
          <Text style={styles.statValue}>{campaign.creators}</Text>
          <Text style={styles.statLabel}>Creators</Text>
        </View>
        <View style={styles.statItem}>
          <TrendingUp color="#F59E0B" size={16} />
          <Text style={styles.statValue}>{campaign.reach}</Text>
          <Text style={styles.statLabel}>Reach</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{campaign.engagement}</Text>
          <Text style={styles.statLabel}>Engagement</Text>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.dateItem}>
          <Calendar color="#6B7280" size={14} />
          <Text style={styles.dateText}>
            {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Campaigns</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#FFFFFF" size={24} />
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
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>
            {mockCampaigns.filter(c => c.status === 'Active').length}
          </Text>
          <Text style={styles.summaryLabel}>Active Campaigns</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>
            {mockCampaigns.reduce((sum, c) => sum + c.creators, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Total Creators</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>1.2M</Text>
          <Text style={styles.summaryLabel}>Total Reach</Text>
        </View>
      </View>

      <ScrollView style={styles.campaignsContainer} showsVerticalScrollIndicator={false}>
        {filteredCampaigns.map(renderCampaignCard)}
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
  addButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 12,
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
  campaignsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  campaignCard: {
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
  cardHeader: {
    marginBottom: 16,
  },
  campaignInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  campaignName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    minWidth: 35,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  dateContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
});