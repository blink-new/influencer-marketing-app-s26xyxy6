import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { TrendingUp, TrendingDown, Eye, Heart, Share, DollarSign, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const mockMetrics: MetricCard[] = [
  {
    title: 'Total Reach',
    value: '1.2M',
    change: '+12.5%',
    trend: 'up',
    icon: <Eye color="#6366F1" size={20} />,
  },
  {
    title: 'Engagement Rate',
    value: '4.2%',
    change: '+0.8%',
    trend: 'up',
    icon: <Heart color="#EF4444" size={20} />,
  },
  {
    title: 'Total Spend',
    value: '$28.7K',
    change: '-5.2%',
    trend: 'down',
    icon: <DollarSign color="#10B981" size={20} />,
  },
  {
    title: 'ROI',
    value: '3.4x',
    change: '+0.6x',
    trend: 'up',
    icon: <TrendingUp color="#F59E0B" size={20} />,
  },
];

interface CampaignPerformance {
  name: string;
  reach: string;
  engagement: string;
  spend: string;
  roi: string;
  status: 'Active' | 'Complete';
}

const mockCampaignPerformance: CampaignPerformance[] = [
  {
    name: 'Summer Fashion Collection',
    reach: '245K',
    engagement: '4.2%',
    spend: '$5.0K',
    roi: '2.8x',
    status: 'Active',
  },
  {
    name: 'Tech Product Launch',
    reach: '380K',
    engagement: '5.1%',
    spend: '$8.5K',
    roi: '4.2x',
    status: 'Complete',
  },
  {
    name: 'Holiday Promotion',
    reach: '520K',
    engagement: '3.8%',
    spend: '$12.0K',
    roi: '3.1x',
    status: 'Complete',
  },
];

const chartData = [
  { month: 'Jan', reach: 850, engagement: 3.2, spend: 15 },
  { month: 'Feb', reach: 920, engagement: 3.8, spend: 18 },
  { month: 'Mar', reach: 1100, engagement: 4.1, spend: 22 },
  { month: 'Apr', reach: 1350, engagement: 4.5, spend: 28 },
  { month: 'May', reach: 1200, engagement: 4.2, spend: 25 },
  { month: 'Jun', reach: 1450, engagement: 4.8, spend: 32 },
];

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('reach');
  
  const periods = ['7d', '30d', '90d', '1y'];
  const metrics = [
    { key: 'reach', label: 'Reach', color: '#6366F1' },
    { key: 'engagement', label: 'Engagement', color: '#10B981' },
    { key: 'spend', label: 'Spend', color: '#F59E0B' },
  ];

  const renderMetricCard = (metric: MetricCard, index: number) => (
    <View key={index} style={styles.metricCard}>
      <View style={styles.metricHeader}>
        {metric.icon}
        <View style={styles.trendContainer}>
          {metric.trend === 'up' ? (
            <TrendingUp color="#10B981" size={16} />
          ) : (
            <TrendingDown color="#EF4444" size={16} />
          )}
          <Text style={[
            styles.changeText,
            { color: metric.trend === 'up' ? '#10B981' : '#EF4444' }
          ]}>
            {metric.change}
          </Text>
        </View>
      </View>
      <Text style={styles.metricValue}>{metric.value}</Text>
      <Text style={styles.metricTitle}>{metric.title}</Text>
    </View>
  );

  const renderSimpleChart = () => {
    const maxValue = Math.max(...chartData.map(d => d[selectedMetric as keyof typeof d] as number));
    const selectedColor = metrics.find(m => m.key === selectedMetric)?.color || '#6366F1';
    
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Performance Trend</Text>
          <View style={styles.metricSelector}>
            {metrics.map((metric) => (
              <TouchableOpacity
                key={metric.key}
                style={[
                  styles.metricButton,
                  selectedMetric === metric.key && { backgroundColor: metric.color }
                ]}
                onPress={() => setSelectedMetric(metric.key)}
              >
                <Text style={[
                  styles.metricButtonText,
                  selectedMetric === metric.key && { color: '#FFFFFF' }
                ]}>
                  {metric.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.chart}>
          <View style={styles.chartBars}>
            {chartData.map((data, index) => {
              const value = data[selectedMetric as keyof typeof data] as number;
              const height = (value / maxValue) * 120;
              
              return (
                <View key={index} style={styles.barContainer}>
                  <View style={styles.barWrapper}>
                    <View 
                      style={[
                        styles.bar,
                        { 
                          height: height,
                          backgroundColor: selectedColor,
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.barLabel}>{data.month}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const renderCampaignPerformance = (campaign: CampaignPerformance, index: number) => (
    <View key={index} style={styles.campaignCard}>
      <View style={styles.campaignHeader}>
        <Text style={styles.campaignName}>{campaign.name}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: campaign.status === 'Active' ? '#D1FAE5' : '#E0E7FF' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: campaign.status === 'Active' ? '#10B981' : '#6366F1' }
          ]}>
            {campaign.status}
          </Text>
        </View>
      </View>
      
      <View style={styles.campaignStats}>
        <View style={styles.campaignStat}>
          <Text style={styles.campaignStatValue}>{campaign.reach}</Text>
          <Text style={styles.campaignStatLabel}>Reach</Text>
        </View>
        <View style={styles.campaignStat}>
          <Text style={styles.campaignStatValue}>{campaign.engagement}</Text>
          <Text style={styles.campaignStatLabel}>Engagement</Text>
        </View>
        <View style={styles.campaignStat}>
          <Text style={styles.campaignStatValue}>{campaign.spend}</Text>
          <Text style={styles.campaignStatLabel}>Spend</Text>
        </View>
        <View style={styles.campaignStat}>
          <Text style={[styles.campaignStatValue, { color: '#10B981' }]}>{campaign.roi}</Text>
          <Text style={styles.campaignStatLabel}>ROI</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Share color="#6366F1" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodContainer}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === period && styles.periodTextActive,
              ]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          {mockMetrics.map(renderMetricCard)}
        </View>

        {renderSimpleChart()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Campaign Performance</Text>
          {mockCampaignPerformance.map(renderCampaignPerformance)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performing Content</Text>
          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>Summer Fashion Lookbook</Text>
            <Text style={styles.contentCreator}>by @sarahjohnson</Text>
            <View style={styles.contentStats}>
              <View style={styles.contentStat}>
                <Eye color="#6366F1" size={16} />
                <Text style={styles.contentStatText}>125K views</Text>
              </View>
              <View style={styles.contentStat}>
                <Heart color="#EF4444" size={16} />
                <Text style={styles.contentStatText}>8.2K likes</Text>
              </View>
              <View style={styles.contentStat}>
                <Share color="#10B981" size={16} />
                <Text style={styles.contentStatText}>1.2K shares</Text>
              </View>
            </View>
          </View>
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
  exportButton: {
    padding: 8,
  },
  periodContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  periodButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  periodButtonActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: (width - 52) / 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  metricSelector: {
    flexDirection: 'row',
  },
  metricButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
    backgroundColor: '#F3F4F6',
  },
  metricButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  chart: {
    height: 160,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    paddingHorizontal: 10,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  bar: {
    width: 20,
    borderRadius: 4,
  },
  barLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  campaignCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
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
  campaignStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  campaignStat: {
    alignItems: 'center',
    flex: 1,
  },
  campaignStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  campaignStatLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  contentCreator: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  contentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentStat: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contentStatText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
});