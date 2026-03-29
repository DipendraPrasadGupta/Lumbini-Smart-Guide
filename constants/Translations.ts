export type TranslationKeys = 
  | 'home' 
  | 'history' 
  | 'ar' 
  | 'chat' 
  | 'profile'
  | 'search_placeholder'
  | 'suggested'
  | 'saved_monuments'
  | 'no_saved_monuments'
  | 'menu_discover'
  | 'menu_history'
  | 'menu_ar'
  | 'menu_journal'
  | 'menu_settings'
  | 'view_all'
  | 'spiritual_preferences'
  | 'language_settings'
  | 'language_sub'
  | 'dark_mode'
  | 'dark_mode_sub'
  | 'app_settings'
  | 'app_settings_sub'
  | 'logout'
  | 'away'
  | 'begin_journey'
  | 'unesco_site'
  | 'view_in'
  | 'three_d'
  | 'maya_devi_desc_1'
  | 'architecture_label'
  | 'ashoka_pillar_title'
  | 'ashoka_pillar_desc'
  | 'nearby_monuments'
  | 'ai_voice_guide'
  | 'remaining'
  | 'timeline_chrono'
  | 'timeline_hero_sub'
  | 'year_623bc_prophecy_title'
  | 'year_623bc_prophecy_desc'
  | 'year_623bc_prophecy_btn'
  | 'year_623bc_birth_title'
  | 'year_623bc_birth_desc'
  | 'year_623bc_birth_btn'
  | 'year_594bc_departure_title'
  | 'year_594bc_departure_desc'
  | 'year_594bc_departure_btn'
  | 'year_588bc_enlightenment_title'
  | 'year_588bc_enlightenment_desc'
  | 'year_588bc_enlightenment_btn'
  | 'year_249bc_ashoka_title'
  | 'year_249bc_ashoka_desc'
  | 'year_249bc_ashoka_btn'
  | 'year_1896ad_discovery_title'
  | 'year_1896ad_discovery_desc'
  | 'year_1896ad_discovery_btn'
  | 'year_1997ad_unesco_title'
  | 'year_1997ad_unesco_desc'
  | 'year_1997ad_unesco_btn'
  | 'year_present_sanctuary_title'
  | 'year_present_sanctuary_desc'
  | 'year_present_sanctuary_btn';

export const Translations: Record<'en' | 'ne', Record<TranslationKeys, string>> = {
  en: {
    home: 'Home',
    history: 'History',
    ar: 'S_AR',
    chat: 'Chat',
    profile: 'Profile',
    search_placeholder: 'Search sacred sites...',
    suggested: 'Suggested',
    saved_monuments: 'Saved Monuments',
    no_saved_monuments: 'No saved monuments yet. Start exploring to save your favorites!',
    menu_discover: 'Discover',
    menu_history: 'History',
    menu_ar: 'AR Guide',
    menu_journal: 'Journal',
    menu_settings: 'Settings',
    view_all: 'VIEW ALL',
    spiritual_preferences: 'Spiritual Preferences',
    language_settings: 'Language Settings',
    language_sub: 'Choose your preferred guide dialect',
    dark_mode: 'Dark Mode',
    dark_mode_sub: 'Gentle on the eyes during evening meditation',
    app_settings: 'App Settings',
    app_settings_sub: 'Notifications, cache, and system data',
    logout: 'LOGOUT FROM PATH',
    away: 'away',
    begin_journey: 'BEGIN JOURNEY',
    unesco_site: 'UNESCO WORLD HERITAGE SITE',
    view_in: 'VIEW IN',
    three_d: '3D',
    maya_devi_desc_1: 'The birthplace of Lord Buddha, marked by the ancient Nativity Stone and the sacred Puskarni pond where Queen Maya Devi bathed before giving birth.',
    architecture_label: 'ARCHITECTURE',
    ashoka_pillar_title: 'The Ashoka Pillar',
    ashoka_pillar_desc: 'Erected by Emperor Ashoka in 249 BC, it stands as the oldest monumental evidence of Buddha\'s birthplace.',
    nearby_monuments: 'Nearby Monuments',
    ai_voice_guide: 'AI Voice Guide',
    remaining: 'REMAINING',
    timeline_chrono: 'THE CHRONOLOGY OF PEACE',
    timeline_hero_sub: 'Trace the footsteps of Siddhartha Gautama from his birth in the sacred gardens to the global spread of his profound wisdom.',
    year_623bc_prophecy_title: 'Asita\'s Prophecy',
    year_623bc_prophecy_desc: 'The sage Asita, upon seeing the newborn prince, predicted he would either be a great king or a Buddha.',
    year_623bc_prophecy_btn: 'About the Sage',
    year_623bc_birth_title: 'Birth of Siddhartha',
    year_623bc_birth_desc: 'Queen Maya Devi gave birth to Prince Siddhartha Gautama in the serene gardens of Lumbini.',
    year_623bc_birth_btn: 'Explore the Garden',
    year_594bc_departure_title: 'The Great Departure',
    year_594bc_departure_desc: 'At 29, the Prince abandoned his royal life in search of a way to end human suffering.',
    year_594bc_departure_btn: 'The Midnight Escape',
    year_588bc_enlightenment_title: 'Supreme Awakening',
    year_588bc_enlightenment_desc: 'Meditating under the Bodhi tree, Siddhartha attained Enlightenment, becoming the Buddha.',
    year_588bc_enlightenment_btn: 'First Sermon',
    year_249bc_ashoka_title: 'The Edict of Ashoka',
    year_249bc_ashoka_desc: 'Emperor Ashoka visited Lumbini and erected a commemorative pillar, marking the birthplace for eternity.',
    year_249bc_ashoka_btn: 'Translate the Pillar',
    year_1896ad_discovery_title: 'Modern Rediscovery',
    year_1896ad_discovery_desc: 'General Khadga Samsher and Dr. Alois Führer rediscovered the Ashoka Pillar, confirming the site\'s identity.',
    year_1896ad_discovery_btn: 'Excavation History',
    year_1997ad_unesco_title: 'World Heritage Status',
    year_1997ad_unesco_desc: 'Lumbini was officially inscribed as a UNESCO World Heritage Site, recognizing its universal value.',
    year_1997ad_unesco_btn: 'UNESCO Details',
    year_present_sanctuary_title: 'Universal Sanctuary',
    year_present_sanctuary_desc: 'Today, Lumbini is a global center for peace, attracting millions of pilgrims every year.',
    year_present_sanctuary_btn: 'Current Overview',
  },
  ne: {
    home: 'होम',
    history: 'इतिहास',
    ar: 'S_AR',
    chat: 'च्याट',
    profile: 'प्रोफाइल',
    search_placeholder: 'पवित्र स्थलहरू खोज्नुहोस्...',
    suggested: 'सुझाव गरिएको',
    saved_monuments: 'सुरक्षित गरिएका स्मारकहरू',
    no_saved_monuments: 'अझै कुनै स्मारक सुरक्षित गरिएको छैन। आफ्नो मनपर्ने ठाउँहरू सुरक्षित गर्न अन्वेषण सुरु गर्नुहोस्!',
    menu_discover: 'खोज्नुहोस्',
    menu_history: 'इतिहास',
    menu_ar: 'AR गाइड',
    menu_journal: 'जर्नल',
    menu_settings: 'सेटिङहरू',
    view_all: 'सबै हेर्नुहोस्',
    spiritual_preferences: 'आध्यात्मिक प्राथमिकताहरू',
    language_settings: 'भाषा सेटिङहरू',
    language_sub: 'आफ्नो मनपर्ने भाषा रोज्नुहोस्',
    dark_mode: 'डार्क मोड',
    dark_mode_sub: 'साँझको ध्यानको समयमा आँखाका लागि सजिलो',
    app_settings: 'एप सेटिङहरू',
    app_settings_sub: 'सूचनाहरू, क्यास, र प्रणाली डाटा',
    logout: 'Path बाट बाहिर निस्कनुहोस्',
    away: 'टाढा',
    begin_journey: 'यात्रा सुरु गर्नुहोस्',
    unesco_site: 'युनेस्को विश्व सम्पदा क्षेत्र',
    view_in: 'हेर्नुहोस्',
    three_d: 'थ्रीडी',
    maya_devi_desc_1: 'भगवान बुद्धको जन्मस्थान, प्राचीन नेटिभिटी स्टोन र पवित्र पुष्करिणी पोखरीद्वारा चिन्हित जहाँ रानी माया देवीले जन्म दिनुअघि स्नान गर्नुभएको थियो।',
    architecture_label: 'वास्तुकला',
    ashoka_pillar_title: 'अशोक स्तम्भ',
    ashoka_pillar_desc: 'सम्राट अशोकद्वारा २४९ ईसा पूर्वमा खडा गरिएको, यो बुद्धको जन्मस्थानको सबैभन्दा पुरानो स्मारक प्रमाणको रूपमा रहेको छ।',
    nearby_monuments: 'नजिकैका स्मारकहरू',
    ai_voice_guide: 'एआई भ्वाइस गाइड',
    remaining: 'बाँकी',
    timeline_chrono: 'शान्तिको इतिहास',
    timeline_hero_sub: 'सिद्धार्थ गौतमको जन्मदेखि बुद्धत्व प्राप्तिको विश्वव्यापी प्रभावसम्मका पाइलाहरू पछ्याउनुहोस्।',
    year_623bc_prophecy_title: 'असितको भविष्यवाणी',
    year_623bc_prophecy_desc: 'ऋषि असितले नवजात राजकुमारलाई देखेपछि उनी महान राजा वा बुद्ध बन्ने भविष्यवाणी गर्नुभएको थियो।',
    year_623bc_prophecy_btn: 'ऋषिको बारेमा',
    year_623bc_birth_title: 'सिद्धार्थको जन्म',
    year_623bc_birth_desc: 'रानी माया देवीले लुम्बिनीको रमणीय बगैचामा राजकुमार सिद्धार्थ गौतमलाई जन्म दिनुभएको थियो।',
    year_623bc_birth_btn: 'बगैचा अन्वेषण',
    year_594bc_departure_title: 'महाअभिनिष्क्रमण',
    year_594bc_departure_desc: '२९ वर्षको उमेरमा राजकुमारले मानव दुःखको अन्त्य खोज्न आफ्नो राजकीय जीवन त्याग्नुभयो।',
    year_594bc_departure_btn: 'मध्यरातको प्रस्थान',
    year_588bc_enlightenment_title: 'परम जागृति',
    year_588bc_enlightenment_desc: 'बोधि वृक्षमुनि ध्यान गर्दै सिद्धार्थले बुद्धत्व प्राप्त गरी बुद्ध बन्नुभयो।',
    year_588bc_enlightenment_btn: 'पहिलो प्रवचन',
    year_249bc_ashoka_title: 'अशोकको शिलास्तम्भ',
    year_249bc_ashoka_desc: 'सम्राट अशोकले लुम्बिनी भ्रमण गरी बुद्धको जन्मस्थानलाई स्थायी रूपमा चिन्हित गर्न स्तम्भ खडा गर्नुभयो।',
    year_249bc_ashoka_btn: 'स्तम्भको अनुवाद',
    year_1896ad_discovery_title: 'आधुनिक पुनः खोज',
    year_1896ad_discovery_desc: 'जनरल खड्ग शमशेर र डा. एलोइस फुहररले अशोक स्तम्भ पुनः पत्ता लगाएर बुद्धको जन्मस्थान पुष्टि गर्नुभयो।',
    year_1896ad_discovery_btn: 'उत्खनन इतिहास',
    year_1997ad_unesco_title: 'विश्व सम्पदा स्थिति',
    year_1997ad_unesco_desc: 'लुम्बिनीलाई आधिकारिक रूपमा युनेस्को विश्व सम्पदा क्षेत्रमा सूचीकृत गरियो।',
    year_1997ad_unesco_btn: 'युनेस्को विवरण',
    year_present_sanctuary_title: 'विश्वव्यापी शान्तिधाम',
    year_present_sanctuary_desc: 'आज लुम्बिनी शान्तिको विश्वव्यापी केन्द्र हो, जसले हरेक वर्ष लाखौं तीर्थयात्रीहरूलाई आकर्षित गर्दछ।',
    year_present_sanctuary_btn: 'वर्तमान अवलोकन',
  }
};
