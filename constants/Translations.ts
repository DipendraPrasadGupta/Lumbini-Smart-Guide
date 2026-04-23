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
  | 'logout_confirm_message'
  | 'cancel'
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
  | 'year_present_sanctuary_btn'
  | 'experience'
  | 'location_details'
  | 'year_403ad_faxian_title'
  | 'year_403ad_faxian_desc'
  | 'year_636ad_xuanzang_title'
  | 'year_636ad_xuanzang_desc'
  | 'year_14th_decline_title'
  | 'year_14th_decline_desc'
  | 'year_1967ad_masterplan_title'
  | 'year_1967ad_masterplan_desc'
  | 'year_3rd_bc_brick_title'
  | 'year_3rd_bc_brick_desc'
  | 'year_15th_rummindei_title'
  | 'year_15th_rummindei_desc'
  | 'year_2013ad_timber_title'
  | 'year_2013ad_timber_desc'
  | 'year_623bc_lineage_title'
  | 'year_623bc_lineage_desc'
  | 'year_600bc_palace_title'
  | 'year_600bc_palace_desc'
  | 'year_595bc_sights_title'
  | 'year_595bc_sights_desc'
  | 'year_588bc_sarnath_title'
  | 'year_588bc_sarnath_desc'
  | 'year_543bc_parinirvana_title'
  | 'year_543bc_parinirvana_desc';

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
    logout_confirm_message: 'Are you sure you want to sign out of your spiritual journey?',
    cancel: 'CANCEL',
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
    experience: 'EXPERIENCE',
    location_details: 'LOCATION DETAILS',
    year_403ad_faxian_title: 'The Journey of Faxian',
    year_403ad_faxian_desc: 'The Chinese monk Faxian reached Lumbini, documenting the presence of the sacred pond and the celestial serenity of the birthplace.',
    year_636ad_xuanzang_title: 'Xuanzangs Detailed Edict',
    year_636ad_xuanzang_desc: 'Famous traveler Xuanzang visited and provided the first detailed written record of the Ashoka Pillar, including the lightning strike that split it.',
    year_14th_decline_title: 'The Forgotten Era',
    year_14th_decline_desc: 'Following the 14th century, the site was slowly reclaimed by the Terai jungles, remaining a hidden sacred secret for centuries.',
    year_1967ad_masterplan_title: 'Kenzo Tanges Vision',
    year_1967ad_masterplan_desc: 'UN Secretary-General U Thant visited and initiated the Master Plan by architect Kenzo Tange to develop Lumbini into a global center for peace. This plan laid the foundation for the Monastic Zone and the Sacred Garden as we know them today.',
    year_3rd_bc_brick_title: 'Early Brick Foundations',
    year_3rd_bc_brick_desc: 'Before the grand stone structures, early Buddhist devotees constructed intricate brick foundations. These layers, found beneath the current temple, show that the site was a center of worship immediately following the Buddhas Parinirvana.',
    year_15th_rummindei_title: 'The Goddess of the Woods',
    year_15th_rummindei_desc: 'During the hidden centuries, local communities continued to worship at the site, identifying Maya Devi as Rummindei, the goddess of the woods. This local tradition unknowingly preserved the sanctity of the birthplace until its rediscovery.',
    year_2013ad_timber_title: 'The Oldest Shrine',
    year_2013ad_timber_desc: 'Groundbreaking excavations in 2013 revealed a 6th-century BC timber structure beneath the temple. This discovery provided archaeological evidence that the site is indeed the worlds oldest Buddhist shrine, predating even Emperor Ashoka.',
    year_623bc_lineage_title: 'The Royal Lineage',
    year_623bc_lineage_desc: 'Born to King Suddhodana of the Shakya clan and Queen Maya Devi, Siddhartha was destined for greatness. At his birth, celestial signs and the famous seven steps on lotus flowers announced the arrival of a world teacher.',
    year_600bc_palace_title: 'Palace Life & Marriage',
    year_600bc_palace_desc: 'Raised in luxury at Tilaurakot, Siddhartha married Princess Yasodhara. Despite the kings attempts to shield him from suffering, the princes curious spirit sought the truth beyond the palace walls.',
    year_595bc_sights_title: 'The Four Sights',
    year_595bc_sights_desc: 'Venturing outside, Siddhartha encountered an old man, a sick man, a corpse, and an ascetic. These "Four Sights" shattered his world, revealing the inescapable nature of aging, sickness, and death.',
    year_588bc_sarnath_title: 'The First Sermon',
    year_588bc_sarnath_desc: 'At Sarnath, Buddha delivered his first teaching, the Dhammacakkappavattana Sutta, to five companions. He introduced the Four Noble Truths and the Eightfold Path, the core of Buddhist philosophy.',
    year_543bc_parinirvana_title: 'The Final Parinirvana',
    year_543bc_parinirvana_desc: 'At the age of 80 in Kushinagar, Buddha attained Mahaparinirvana. His final words, "All conditioned things are subject to decay. Strive on with diligence," continue to inspire millions.',
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
    logout_confirm_message: 'के तपाईं आफ्नो आध्यात्मिक यात्राबाट बाहिर निस्कन चाहनुहुन्छ?',
    cancel: 'रद्द गर्नुहोस्',
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
    experience: 'अनुभव',
    location_details: 'स्थान विवरण',
    year_403ad_faxian_title: 'फाहियानको यात्रा',
    year_403ad_faxian_desc: 'चिनियाँ भिक्षु फाहियान लुम्बिनी पुगेर पवित्र पोखरी र जन्मस्थानको आकाशीय शान्तिको दस्तावेजीकरण गर्नुभयो।',
    year_636ad_xuanzang_title: 'ह्वेनसाङको विस्तृत वर्णन',
    year_636ad_xuanzang_desc: 'प्रसिद्ध यात्री ह्वेनसाङले भ्रमण गरी अशोक स्तम्भको पहिलो विस्तृत लिखित अभिलेख राख्नुभयो।',
    year_14th_decline_title: 'विस्मृतिको युग',
    year_14th_decline_desc: '१४औं शताब्दी पछि, यो स्थल बिस्तारै तराईको जंगलले ढाकियो र शताब्दीयौंसम्म लुकेको रहस्य बन्यो।',
    year_1967ad_masterplan_title: 'केन्जो टाङ्गेको परिकल्पना',
    year_1967ad_masterplan_desc: 'संयुक्त राष्ट्र संघका महासचिव ऊ थान्तको भ्रमण पछि वास्तुकार केन्जो टाङ्गेद्वारा लुम्बिनी विकासको गुरुयोजना सुरु भयो। यस योजनाले आजको लुम्बिनीको जग बसालेको हो।',
    year_3rd_bc_brick_title: 'प्रारम्भिक ईंटा संरचना',
    year_3rd_bc_brick_desc: 'ढुंगाका ठूला संरचनाहरू भन्दा पहिले, प्रारम्भिक बौद्ध अनुयायीहरूले ईंटाका संरचनाहरू निर्माण गरेका थिए। यी तहहरूले बुद्धको महापरिनिर्वाण लगत्तै यो स्थल पूजाको केन्द्र रहेको पुष्टि गर्दछ।',
    year_15th_rummindei_title: 'वनकी देवी रुममिन्देई',
    year_15th_rummindei_desc: 'विस्मृतिको समयमा पनि स्थानीय समुदायले यस स्थललाई "रुममिन्देई" (वनकी देवी) को रूपमा पूजा गरिरहे। यो स्थानीय परम्पराले अन्जानमै यस जन्मस्थानको पवित्रतालाई पुनः खोज नहुन्जेलसम्म जोगाइराख्यो।',
    year_2013ad_timber_title: 'सबैभन्दा पुरानो मन्दिर',
    year_2013ad_timber_desc: 'सन् २०१३ को उत्खननले मन्दिरमुनि ६औं शताब्दी ईसा पूर्वको काठको संरचना फेला पारेको थियो। यसले यो स्थल विश्वकै सबैभन्दा पुरानो बौद्ध स्थल भएको पुरातात्विक प्रमाण दियो।',
    year_623bc_lineage_title: 'शाही वंश',
    year_623bc_lineage_desc: 'शाक्य वंशका राजा शुद्धोदन र रानी माया देवीको कोखबाट जन्मिएका सिद्धार्थ महानताका लागि निर्धारित थिए। उनको जन्ममा दैवी संकेत र कमलका फूलहरूमा सात पाइला हिँडेको कथा प्रसिद्ध छ।',
    year_600bc_palace_title: 'राजदरबारको जीवन र विवाह',
    year_600bc_palace_desc: 'तिलौराकोटको विलासमा हुर्किएका सिद्धार्थको विवाह राजकुमारी यशोधरासँग भएको थियो। राजाले उनलाई दुःखबाट जोगाउन खोजे पनि राजकुमारको जिज्ञासु मनले सत्यको खोजी गरिरह्यो।',
    year_595bc_sights_title: 'चार दृश्यहरू',
    year_595bc_sights_desc: 'बाहिर निस्कँदा सिद्धार्थले वृद्ध, रोगी, मृत शरीर र सन्यासी देखे। यी "चार दृश्य" ले उनको संसार बदल्यो र बुढ्यौली, रोग र मृत्युको वास्तविकता देखाइदियो।',
    year_588bc_sarnath_title: 'पहिलो प्रवचन',
    year_588bc_sarnath_desc: 'सारनाथमा बुद्धले आफ्ना पाँच साथीहरूलाई पहिलो उपदेश दिनुभयो। उनले चार आर्य सत्य र अष्टाङ्गिक मार्गको परिचय दिए, जुन बौद्ध दर्शनको मूल आधार हो।',
    year_543bc_parinirvana_title: 'महापरिनिर्वाण',
    year_543bc_parinirvana_desc: '८० वर्षको उमेरमा कुशीनगरमा बुद्धले महापरिनिर्वाण प्राप्त गर्नुभयो। उनका अन्तिम शब्दहरू, "सबै संस्कारित वस्तुहरू क्षय हुन्छन्, लगनशीलताका साथ प्रयास गर" आज पनि उत्तिकै प्रेरणादायी छन्।',
  }
};
