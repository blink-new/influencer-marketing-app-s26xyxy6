import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Search, Filter, Heart, Users, TrendingUp } from 'lucide-react-native';

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: string;
  engagement: string;
  niche: string;
  verified: boolean;
  avgViews: string;
  rate: string;
}

const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarahjohnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    followers: '125K',
    engagement: '4.2%',
    niche: 'Fashion',
    verified: true,
    avgViews: '45K',
    rate: '$500-800',
  },
  {
    id: '2',
    name: 'Mike Chen',
    username: '@mikechen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    followers: '89K',
    engagement: '5.1%',
    niche: 'Tech',
    verified: false,
    avgViews: '32K',
    rate: '$300-600',
  },
  {
    id: '3',
    name: 'Emma Davis',
    username: '@emmadavis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    followers: '203K',
    engagement: '3.8%',
    niche: 'Lifestyle',
    verified: true,
    avgViews: '78K',
    rate: '$800-1200',
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    username: '@alexrodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followers: '156K',
    engagement: '4.7%',
    niche: 'Fitness',
    verified: true,
    avgViews: '62K',
    rate: '$600-900',
  },
];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('All');

  const niches = ['All', 'Fashion', 'Tech', 'Lifestyle', 'Fitness', 'Food', 'Travel'];

  const filteredCreators = mockCreators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNiche = selectedNiche === 'All' || creator.niche === selectedNiche;
    return matchesSearch && matchesNiche;
  });

  const renderCreatorCard = (creator: Creator) => (
    <TouchableOpacity key={creator.id} style={styles.creatorCard}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: creator.avatar }} style={styles.avatar} />
        <View style={styles.creatorInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.creatorName}>{creator.name}</Text>
            {creator.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>
          <Text style={styles.username}>{creator.username}</Text>
          <Text style={styles.niche}>{creator.niche}</Text>
        </View>
        <TouchableOpacity style={styles.heartButton}>
          <Heart color="#9CA3AF" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Users color="#6366F1" size={16} />
          <Text style={styles.statValue}>{creator.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <TrendingUp color="#10B981" size={16} />
          <Text style={styles.statValue}>{creator.engagement}</Text>
          <Text style={styles.statLabel}>Engagement</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{creator.avgViews}</Text>
          <Text style={styles.statLabel}>Avg Views</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.rate}>{creator.rate}</Text>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Creators</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#6366F1" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#9CA3AF" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search creators..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.nicheContainer}>
        {niches.map((niche) => (
          <TouchableOpacity
            key={niche}
            style={[
              styles.nicheChip,
              selectedNiche === niche && styles.nicheChipActive,
            ]}
            onPress={() => setSelectedNiche(niche)}
          >
            <Text
              style={[
                styles.nicheText,
                selectedNiche === niche && styles.nicheTextActive,
              ]}
            >
              {niche}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.creatorsContainer} showsVerticalScrollIndicator={false}>
        {filteredCreators.map(renderCreatorCard)}
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
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  nicheContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  nicheChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  nicheChipActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  nicheText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  nicheTextActive: {
    color: '#FFFFFF',
  },
  creatorsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  creatorCard: {
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  creatorInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  creatorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: '#6366F1',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  username: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  niche: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
  },
  heartButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  rate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  contactButton: {
    backgroundColor: '#6366F1',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});