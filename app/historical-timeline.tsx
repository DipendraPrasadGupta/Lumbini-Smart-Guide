import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import CustomHeader from '../components/CustomHeader';
import TimelineItem from '../components/TimelineItem';
import CustomTabBar from '../components/CustomTabBar';
import { Colors, Typography } from '../constants/Theme';
import { useLanguage } from '../context/LanguageContext';

// Import images
const timeline_1 = require('../assets/images/timeline_1.png');
const timeline_2 = require('../assets/images/timeline_2.png');
const timeline_3 = require('../assets/images/timeline_3.png');
const timeline_4 = require('../assets/images/timeline_4.png');
const timeline_5 = require('../assets/images/timeline_5.png');
const temple_hero = require('../assets/images/temple_hero.png');
const maya_devi_img = require('../assets/images/Maya Devi Temple.jpg');

export default function HistoricalTimeline() {
  const { t, locale } = useLanguage();

  const timelineData = [
    {
      year: "623 BC",
      title: t('year_623bc_lineage_title'),
      description: t('year_623bc_lineage_desc'),
      image: timeline_1,
      buttonText: locale === 'en' ? 'Royal Family' : 'शाही परिवार'
    },
    {
      year: "623 BC",
      title: t('year_623bc_birth_title'),
      description: t('year_623bc_birth_desc'),
      image: timeline_2,
      buttonText: t('year_623bc_birth_btn')
    },
    {
      year: "600 BC",
      title: t('year_600bc_palace_title'),
      description: t('year_600bc_palace_desc'),
      image: timeline_3,
      buttonText: locale === 'en' ? 'Palace Life' : 'राजदरबार जीवन'
    },
    {
      year: "595 BC",
      title: t('year_595bc_sights_title'),
      description: t('year_595bc_sights_desc'),
      image: timeline_4,
      buttonText: locale === 'en' ? 'The Four Sights' : 'चार दृश्य'
    },
    {
      year: "594 BC",
      title: t('year_594bc_departure_title'),
      description: t('year_594bc_departure_desc'),
      image: timeline_3,
      buttonText: t('year_594bc_departure_btn')
    },
    {
      year: "588 BC",
      title: t('year_588bc_enlightenment_title'),
      description: t('year_588bc_enlightenment_desc'),
      image: timeline_4,
      buttonText: t('year_588bc_enlightenment_btn')
    },
    {
      year: "588 BC",
      title: t('year_588bc_sarnath_title'),
      description: t('year_588bc_sarnath_desc'),
      image: timeline_5,
      buttonText: locale === 'en' ? 'First Sermon' : 'पहिलो उपदेश'
    },
    {
      year: "543 BC",
      title: t('year_543bc_parinirvana_title'),
      description: t('year_543bc_parinirvana_desc'),
      image: timeline_1,
      buttonText: locale === 'en' ? 'Final Journey' : 'अन्तिम यात्रा'
    },
    {
      year: "3rd Cent. BC",
      title: t('year_3rd_bc_brick_title'),
      description: t('year_3rd_bc_brick_desc'),
      image: timeline_2,
      buttonText: locale === 'en' ? 'Early Worship' : 'प्रारम्भिक पूजा'
    },
    {
      year: "249 BC",
      title: t('year_249bc_ashoka_title'),
      description: t('year_249bc_ashoka_desc'),
      image: timeline_5,
      buttonText: t('year_249bc_ashoka_btn')
    },
    {
      year: "403 AD",
      title: t('year_403ad_faxian_title'),
      description: t('year_403ad_faxian_desc'),
      image: timeline_1,
      buttonText: locale === 'en' ? 'Faxian\'s Travels' : 'फाहियानका यात्रा'
    },
    {
      year: "636 AD",
      title: t('year_636ad_xuanzang_title'),
      description: t('year_636ad_xuanzang_desc'),
      image: timeline_2,
      buttonText: locale === 'en' ? 'Pillar Records' : 'स्तम्भ अभिलेख'
    },
    {
      year: "14th Cent.",
      title: t('year_14th_decline_title'),
      description: t('year_14th_decline_desc'),
      image: timeline_3,
      buttonText: locale === 'en' ? 'The Lost Period' : 'गुमेको समय'
    },
    {
      year: "15th-19th Cent.",
      title: t('year_15th_rummindei_title'),
      description: t('year_15th_rummindei_desc'),
      image: timeline_2,
      buttonText: locale === 'en' ? 'Local Tradition' : 'स्थानीय परम्परा'
    },
    {
      year: "1896 AD",
      title: t('year_1896ad_discovery_title'),
      description: t('year_1896ad_discovery_desc'),
      image: timeline_4,
      buttonText: t('year_1896ad_discovery_btn')
    },
    {
      year: "1967 AD",
      title: t('year_1967ad_masterplan_title'),
      description: t('year_1967ad_masterplan_desc'),
      image: timeline_5,
      buttonText: locale === 'en' ? 'Master Plan' : 'गुरुयोजना'
    },
    {
      year: "1997 AD",
      title: t('year_1997ad_unesco_title'),
      description: t('year_1997ad_unesco_desc'),
      image: temple_hero,
      buttonText: t('year_1997ad_unesco_btn')
    },
    {
      year: "2013 AD",
      title: t('year_2013ad_timber_title'),
      description: t('year_2013ad_timber_desc'),
      image: timeline_1,
      buttonText: locale === 'en' ? 'Scientific Proof' : 'वैज्ञानिक प्रमाण'
    },
    {
      year: "PRESENT",
      title: t('year_present_sanctuary_title'),
      description: t('year_present_sanctuary_desc'),
      image: maya_devi_img,
      buttonText: t('year_present_sanctuary_btn')
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <CustomHeader />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>{t('timeline_chrono')}</Text>
          <Text style={styles.heroTitle}>
            {locale === 'en' ? 'Echoes of the Enlightened One' : 'प्रबुद्ध एकको प्रतिध्वनि'}
          </Text>
          <Text style={styles.heroSubtitle}>{t('timeline_hero_sub')}</Text>
        </View>

        <View style={styles.timelineContainer}>
          {timelineData.map((item, index) => (
            <TimelineItem 
              key={`${item.year}-${index}`}
              year={item.year}
              title={item.title}
              description={item.description}
              image={item.image}
              buttonText={item.buttonText}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </View>
        
        <View style={styles.bottomSpacer} />
      </ScrollView>

      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.natural,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  heroSection: {
    marginBottom: 40,
  },
  heroLabel: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
    fontFamily: Typography.label,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 36,
    fontFamily: Typography.headline,
    fontWeight: '700',
    lineHeight: 44,
    marginBottom: 16,
  },
  heroSubtitle: {
    color: Colors.gray,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Typography.body,
  },
  timelineContainer: {
    marginTop: 20,
  },
  bottomSpacer: {
    height: 120, // Space for CustomTabBar
  },
});
