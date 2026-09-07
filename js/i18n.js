// KheetSathi Master Bilingual Internationalization Dictionary (SIH 2026 Production Edition)

const I18N_DICTIONARY = {
  hi: {
    brand_title: "खेती साथी",
    brand_subtitle: "खेती का सच्चा साथी",
    tagline: "फसल स्वास्थ्य एवं रोग पहचान सहायक",
    offline_msg: "आप ऑफलाइन हैं — सहेजे गए स्कैन उपलब्ध हैं",
    
    // Nav items
    nav_home: "मुख्य पृष्ठ",
    nav_scan: "फसल जांच",
    nav_history: "इतिहास",
    nav_help: "सहायता",
    nav_profile: "प्रोफाइल",
    
    // Home Dashboard
    hero_eyebrow: "फसल स्वास्थ्य",
    hero_title: "आज आपकी फसल कैसी है?",
    hero_desc: "पत्ती की एक साफ फोटो लें और संभावित रोग व उपचार तुरंत जानें।",
    btn_start_scan: "फसल की जांच करें",
    today_tip_badge: "कृषि विज्ञान सलाह",
    today_tip_title: "मौसम चेतावनी: पछेती झुलसा का खतरा",
    today_tip_text: "हवा में अधिक नमी से आलू व टमाटर में झुलसा रोग की संभावना है। खेत में जल निकासी नालियां साफ रखें।",
    recent_scans_title: "हाल की जांचें",
    no_recent_scans: "अभी कोई हालिया स्कैन दर्ज नहीं है।",
    view_all_history: "पूरा इतिहास देखें →",
    
    // FEATURE C: My Crops Tracked Space
    my_crops_title: "आपकी फसलें",
    my_crops_subtitle: "ट्रैक की गई फसलें एवं स्वास्थ्य स्थिति",
    btn_add_crop: "+ फसल जोड़ें",
    view_all_crops: "सभी फसलें →",
    my_crops_empty: "अभी कोई फसल नहीं जोड़ी गई है। नीचे बटन दबाकर जोड़ें।",
    add_crop_modal_title: "ट्रैक करने के लिए फसल चुनें",
    
    // Crop Overview Screen
    crop_overview_title: "फसल स्थिति विवरण",
    latest_check_prefix: "अंतिम जांच:",
    btn_scan_again: "इस फसल की नई जांच करें",
    btn_scan_crop_again: "इस फसल की नई जांच करें",
    btn_view_timeline: "स्वास्थ्य टाइमलाइन देखें",
    btn_view_crop_timeline: "स्वास्थ्य टाइमलाइन देखें",
    btn_compare_scans: "दो जांचों की तुलना करें",
    btn_compare_this_crop: "दो जांचों की तुलना करें",
    crop_recent_checks_title: "इस फसल की पिछली जांचें",
    crop_scans_heading: "इस फसल की पिछली जांचें",
    
    // FEATURE A: Crop Health Timeline
    timeline_title: "फसल स्वास्थ्य टाइमलाइन",
    timeline_subtitle: "समय के साथ बीमारी के प्रभाव का इतिहास",
    timeline_desc: "समय के साथ बीमारी के प्रभाव का इतिहास",
    timeline_trend_title: "स्वास्थ्य स्थिति रुझान:",
    timeline_trend_improving: "सुधार की ओर (Improving)",
    trend_improving: "सुधार की ओर (Improving)",
    timeline_trend_stable: "स्थिर स्थिति (Stable)",
    timeline_trend_attention: "ध्यान देने योग्य (Needs Attention)",
    prototype_trend_note: "स्वास्थ्य रुझान — दर्ज किए गए ऑन-डिवाइस स्कैन इतिहास पर आधारित",
    btn_compare_scans_timeline: "पुरानी व नई जांच की तुलना करें",
    
    // FEATURE B: Compare Two Scans
    compare_title: "दो जांचों की तुलना",
    compare_subtitle: "उपचार से पूर्व और बाद के बदलाव का विश्लेषण",
    compare_desc: "उपचार से पूर्व और बाद के बदलाव का विश्लेषण",
    compare_select_label: "फसल चुनें:",
    compare_earlier_scan: "पहले की जांच",
    scan_earlier: "पहले की जांच",
    compare_latest_scan: "हाल की जांच",
    scan_latest: "हाल की जांच",
    compare_summary_title: "देखा गया बदलाव (Observed Change)",
    compare_empty_msg: "तुलना करने के लिए कम से कम 2 स्कैन का होना आवश्यक है।",
    prototype_compare_note: "तुलना — दर्ज किए गए ऑन-डिवाइस निदान डेटा पर आधारित",
    
    // Crop Selection
    crop_select_title: "आपकी फसल कौन-सी है?",
    crop_select_desc: "जिस फसल की पत्ती जांचनी है, उसे चुनें:",
    crop_auto_detect: "अन्य फसल",
    
    // Upload / Camera
    upload_title: "पत्ती की फोटो लें",
    upload_desc: "साफ फोटो से बेहतर जांच मिलती है",
    btn_open_camera: "कैमरा खोलें",
    btn_choose_gallery: "गैलरी",
    dropzone_hint: "पत्ती को फ्रेम के बीच रखें",
    demo_presets_title: "परीक्षण हेतु नमूना पत्ती:",
    
    // Image Quality Pre-check
    preview_title: "फोटो की गुणवत्ता",
    quality_good: "फोटो साफ और अच्छी रोशनी में है",
    quality_blurry: "फोटो थोड़ी धुंधली है (कृपया दोबारा लें)",
    quality_dark: "फोटो में रोशनी कम है (अच्छी रोशनी में लें)",
    quality_glare: "अत्यधिक चमक या धूप का परावर्तन है",
    btn_analyze: "जांच शुरू करें",
    btn_retake: "दोबारा फोटो लें",
    roi_hint: "पत्ती या रोग के धब्बे पर बॉक्स सेट करें",
    roi_full: "पूरी फोटो",
    roi_focus: "फोकस (ROI)",
    roi_tag: "रोग लक्षण (ROI)",
    
    // Analyzing Loading State
    analyzing_title: "पत्ती का विश्लेषण हो रहा है...",
    analyzing_step1: "फोटो देख रहे हैं और धब्बों की पहचान कर रहे हैं...",
    analyzing_step2: "रोग डेटाबेस से मिलान हो रहा है...",
    analyzing_subtext: "ऑन-डिवाइस Edge AI विश्लेषण (WASM)",
    
    // Diagnostic Result
    condition_eyebrow: "संभावित समस्या",
    result_title: "जांच परिणाम",
    prototype_badge: "ऑन-डिवाइस AI परिणाम (MobileNetV2 ONNX)",
    confidence_label: "मॉडल कॉन्फिडेंस स्कोर:",
    severity_label: "प्रभाव का स्तर:",
    severity_mild: "हल्का संक्रमण (Mild)",
    severity_moderate: "मध्यम संक्रमण (Moderate)",
    severity_severe: "गंभीर संक्रमण (Severe)",
    severity_healthy: "स्वस्थ पौधा (Healthy)",
    symptoms_title: "हमने क्या देखा",
    remedies_title: "अगला कदम",
    
    // 3-Tier Action Hierarchy
    tier_cultural_title: "पहले क्या करें (खेत में तत्काल उपाय)",
    tier_biological_title: "फिर जैविक / कम-जोखिम विकल्प",
    tier_chemical_title: "सावधानी एवं रासायनिक सलाह",
    
    // Safety Box & Kisan Call Center
    safety_disclaimer_title: "अनिवार्य सुरक्षा चेतावनी:",
    safety_disclaimer_text: "रासायनिक दवाओं के प्रयोग से पूर्व सुरक्षा मास्क और दस्ताने पहनें। सटीक क्षेत्रीय मात्रा हेतु नजदीकी कृषि विज्ञान केंद्र (KVK) से सलाह लें।",
    btn_call_kvk: "किसान कॉल सेंटर से बात करें (1800-180-1551)*",
    kvk_verify_note: "*सरकारी स्रोत से सत्यापन योग्य",
    
    // Actions & Voice / Share
    btn_save_scan: "स्कैन सहेजें",
    btn_share_scan: "रिपोर्ट साझा करें",
    btn_voice_read: "बोलकर सुनें",
    btn_voice_stop: "आवाज रोकें",
    share_copied_toast: "जांच रिपोर्ट क्लिपबोर्ड पर कॉपी हो गई है!",
    voice_unsupported: "इस डिवाइस पर आवाज की सुविधा उपलब्ध नहीं है।",
    btn_new_scan: "नई जांच करें",
    
    // Fallback / Uncertainty
    fallback_title: "जांच परिणाम अनिश्चित है",
    fallback_msg: "AI पत्ती के रोग की पुष्टि पर्याप्त सटीकता से नहीं कर सका। कृपया बेहतर रोशनी में पत्ती की स्पष्ट फोटो लें या कृषि विशेषज्ञ से सलाह लें।",
    fallback_reasons: "संभावित कारण: पत्ती पूरी तरह फ्रेम में नहीं थी, बहुत अधिक धुंधलापन था, या यह लक्षण समर्थित सूची में नहीं है।",
    btn_try_again: "नई फोटो के साथ पुनः प्रयास करें",
    
    // History
    history_title: "स्कैन इतिहास",
    filter_all: "सभी",
    filter_potato: "आलू",
    filter_tomato: "टमाटर",
    filter_rice: "धान",
    btn_clear_history: "साफ़ करें",
    
    // Enhanced Visual Help Guide & Do's / Don'ts
    help_title: "मार्गदर्शिका एवं सहायता केंद्र",
    help_subtitle: "सटीक फोटो और सही रोग पहचान के सरल नियम",
    help_dos_donts_title: "फोटो खींचने के सही व गलत नियम (Do's & Don'ts)",
    help_rule_dist_title: "1. कैमरे की दूरी (Camera Distance)",
    help_rule_dist_do: "15–20 सेमी पास रखें। पत्ती का रोगग्रस्त धब्बा फ्रेम के 70% भाग में साफ दिखना चाहिए।",
    help_rule_dist_dont: "बहुत दूर से पूरे पौधे या खेत की फोटो न लें, इससे बारीक धब्बे नहीं दिखते।",
    help_rule_light_title: "2. रोशनी और परछाई (Lighting & Shadows)",
    help_rule_light_do: "दिन के सामान्य प्राकृतिक उजाले में फोटो लें। पत्ती पर एकसमान रोशनी रहे।",
    help_rule_light_dont: "हाथ या फोन की गहरी परछाई न आने दें और न ही सीधी चिलचिलाती धूप का परावर्तन।",
    help_rule_leaf_title: "3. पत्ती का चयन (Single Leaf Focus)",
    help_rule_leaf_do: "एक समय में केवल एक प्रभावित पत्ती पर फोकस करें। हाथ में स्थिर पकड़ें।",
    help_rule_leaf_dont: "जमीन, ट्रैक्टर, जूते या एक साथ 10 पत्तों का गुच्छा फ्रेम में न रखें।",
    
    // How It Works Steps
    help_how_title: "खेती साथी कैसे काम करता है?",
    help_how_step1: "१. अपनी फसल चुनें (आलू, टमाटर, धान आदि)।",
    help_how_step2: "२. प्रभावित पत्ती की पास से स्पष्ट फोटो लें।",
    help_how_step3: "३. तुरंत संभावित रोग, लक्षण और ३-स्तरीय उपचार जानें।",
    help_how_step4: "४. स्वास्थ्य टाइमलाइन में परिणाम सहेजें और सुधार ट्रैक करें।",
    
    // FAQ Section
    help_faq_title: "अक्सर पूछे जाने वाले सवाल (FAQs)",
    help_faq_q1: "क्या यह ऐप बिना इंटरनेट (ऑफलाइन) काम करता है?",
    help_faq_a1: "हाँ, खेती साथी एक PWA ऐप है जो पहली बार खुलने के बाद पूरी तरह ऑफलाइन काम करता है। आपके सभी स्कैन फोन में सुरक्षित रहते हैं।",
    help_faq_q2: "अगर फोटो थोड़ी धुंधली हो तो क्या होगा?",
    help_faq_a2: "हमारा इन-बिल्ट क्वालिटी सिस्टम आपको तुरंत चेतावनी देता है और गलत निदान से बचने के लिए दोबारा साफ फोटो लेने को कहता है।",
    help_faq_q3: "दवाइयों की सटीक मात्रा के लिए क्या करें?",
    help_faq_a3: "सुरक्षा कारणों से ऐप सामान्य दिशानिर्देश देता है। सटीक मात्रा के लिए नजदीकी कृषि विज्ञान केंद्र (KVK) या किसान हेल्पलाइन पर संपर्क करें।",
    help_faq_q4: "क्या मैं पुरानी जांचों में सुधार की तुलना कर सकता हूँ?",
    help_faq_a4: "हाँ, 'जांच तुलना' (Compare Scans) विकल्प से आप उपचार से पहले और बाद के पत्ती के स्कैन में फर्क देख सकते हैं।",
    
    // Help Support Card
    help_support_title: "सरकारी किसान हेल्पलाइन (24x7)",
    help_support_desc: "विशेषज्ञ कृषि वैज्ञानिकों से सीधे फोन पर मुफ्त सलाह प्राप्त करें:",
    help_support_hours: "समय: प्रातः 6:00 बजे से रात्रि 10:00 बजे तक (सातों दिन)",
    help_support_badge: "टोल फ्री नंबर",
    
    // Farmer Profile
    profile_title: "किसान प्रोफाइल एवं सेटिंग्स",
    farmer_name: "किसान का नाम:",
    farmer_location: "राज्य / जिला:",
    total_scans: "कुल किए गए स्कैन:",
    offline_cache_status: "ऑफलाइन डेटा स्थिति:",
    cache_ready: "सक्रिय (PWA Cache Ready)"
  },
  
  en: {
    brand_title: "KheetSathi",
    brand_subtitle: "The True Companion of Farming",
    tagline: "Your AI Crop Health Companion",
    offline_msg: "You are offline — cached scans available",
    
    // Nav items
    nav_home: "Home",
    nav_scan: "Scan Crop",
    nav_history: "History",
    nav_help: "Help",
    nav_profile: "Profile",
    
    // Home Dashboard
    hero_eyebrow: "Crop Health",
    hero_title: "How is your crop today?",
    hero_desc: "Take a clear photo of the leaf to identify possible crop issues.",
    btn_start_scan: "Scan Crop Leaf",
    today_tip_badge: "Field Agronomy Advisory",
    today_tip_title: "High Humidity Alert: Foliar Blight Risk",
    today_tip_text: "High atmospheric humidity elevates Late Blight risk in potato and tomato. Ensure clean furrow drainage.",
    recent_scans_title: "Recent Checks",
    no_recent_scans: "No recent scans logged. Start your first scan!",
    view_all_history: "View Full History →",
    
    // FEATURE C: My Crops Tracked Space
    my_crops_title: "Your Crops",
    my_crops_subtitle: "Tracked crops and health status",
    btn_add_crop: "+ Add Crop",
    view_all_crops: "All Crops →",
    my_crops_empty: "No crops added yet. Tap below to track your crops.",
    add_crop_modal_title: "Select Crop to Track",
    
    // Crop Overview Screen
    crop_overview_title: "Crop Health Hub",
    latest_check_prefix: "Latest check:",
    btn_scan_again: "Scan this Crop Again",
    btn_scan_crop_again: "Scan this Crop Again",
    btn_view_timeline: "View Health Timeline",
    btn_view_crop_timeline: "View Health Timeline",
    btn_compare_scans: "Compare Two Scans",
    btn_compare_this_crop: "Compare Two Scans",
    crop_recent_checks_title: "Recent Scans for this Crop",
    crop_scans_heading: "Recent Scans for this Crop",
    
    // FEATURE A: Crop Health Timeline
    timeline_title: "Crop Health Timeline",
    timeline_subtitle: "Chronological foliar disease progression",
    timeline_desc: "Chronological foliar disease progression",
    timeline_trend_title: "Observed Health Trend:",
    timeline_trend_improving: "Improving Trend",
    trend_improving: "Improving Trend",
    timeline_trend_stable: "Stable Condition",
    timeline_trend_attention: "Needs Attention",
    prototype_trend_note: "Health trend — based on recorded on-device scan history",
    btn_compare_scans_timeline: "Compare Earlier vs Latest Scan",
    
    // FEATURE B: Compare Two Scans
    compare_title: "Compare Two Scans",
    compare_subtitle: "Side-by-side comparative analysis",
    compare_desc: "Side-by-side comparative analysis",
    compare_select_label: "Select Crop:",
    compare_earlier_scan: "Earlier Scan",
    scan_earlier: "Earlier Scan",
    compare_latest_scan: "Latest Scan",
    scan_latest: "Latest Scan",
    compare_summary_title: "Observed Change Analysis",
    compare_empty_msg: "At least 2 recorded scans required for side-by-side comparison.",
    prototype_compare_note: "Comparison — based on recorded on-device diagnostic metadata",
    
    // Crop Selection
    crop_select_title: "Select Your Crop",
    crop_select_desc: "Choose the crop leaf you wish to diagnose:",
    crop_auto_detect: "Other Crop",
    
    // Upload / Camera
    upload_title: "Take Leaf Photo",
    upload_desc: "A clear photo delivers accurate diagnostics",
    btn_open_camera: "Open Camera",
    btn_choose_gallery: "Gallery",
    dropzone_hint: "Place leaf in center frame",
    demo_presets_title: "Quick-Test Sample Leaves:",
    
    // Image Quality Pre-check
    preview_title: "Photo Quality Gate",
    quality_good: "Photo is clear and well-exposed",
    quality_blurry: "Photo is slightly blurry (please retake)",
    quality_dark: "Photo is low-light (take in daylight)",
    quality_glare: "Harsh glare or reflection detected",
    btn_analyze: "Start Diagnosis",
    btn_retake: "Retake Photo",
    roi_hint: "Adjust box to focus on leaf/lesion",
    roi_full: "Full Photo",
    roi_focus: "Focus (ROI)",
    roi_tag: "Lesion ROI",
    
    // Analyzing Loading State
    analyzing_title: "Analyzing Leaf Symptoms...",
    analyzing_step1: "Examining leaf photo and lesion textures...",
    analyzing_step2: "Matching botanical disease catalog...",
    analyzing_subtext: "On-Device Edge AI Inference (WASM)",
    
    // Diagnostic Result
    condition_eyebrow: "Possible Condition",
    result_title: "Diagnostic Report",
    prototype_badge: "On-Device AI Result (MobileNetV2 ONNX)",
    confidence_label: "Model Confidence Score:",
    severity_label: "Severity Tier:",
    severity_mild: "Mild Severity",
    severity_moderate: "Moderate Severity",
    severity_severe: "Severe Infection",
    severity_healthy: "Healthy Foliage",
    symptoms_title: "Observed Symptoms",
    remedies_title: "Next Action Plan",
    
    // 3-Tier Action Hierarchy
    tier_cultural_title: "01 Immediate Field Actions (Cultural)",
    tier_biological_title: "02 Biological & Low-Risk Options",
    tier_chemical_title: "03 Safety & Chemical Advisory",
    
    // Safety Box & Kisan Call Center
    safety_disclaimer_title: "Mandatory Safety Warning:",
    safety_disclaimer_text: "Always wear safety gloves and masks before handling chemical sprays. Consult your local Krishi Vigyan Kendra (KVK) for exact regional dosage calibration.",
    btn_call_kvk: "Call Kisan Helpline (1800-180-1551)*",
    kvk_verify_note: "*Verifiable Government Extension Resource",
    
    // Actions & Voice / Share
    btn_save_scan: "Save Scan",
    btn_share_scan: "Share Report",
    btn_voice_read: "Listen",
    btn_voice_stop: "Stop Voice",
    share_copied_toast: "Diagnostic report copied to clipboard!",
    voice_unsupported: "Voice guidance is not supported on this browser.",
    btn_new_scan: "New Scan",
    
    // Fallback / Uncertainty
    fallback_title: "Diagnosis Uncertain",
    fallback_msg: "The AI cannot identify the condition with high confidence. Please retake a clearer photo in daylight or consult an agricultural expert.",
    fallback_reasons: "Possible causes: leaf not centered, excessive blur, or symptoms outside supported catalog.",
    btn_try_again: "Try Again with New Photo",
    
    // History
    history_title: "Scan History",
    filter_all: "All",
    filter_potato: "Potato",
    filter_tomato: "Tomato",
    filter_rice: "Rice",
    btn_clear_history: "Clear All",
    
    // Enhanced Visual Help Guide & Do's / Don'ts
    help_title: "Field Guide & Help Center",
    help_subtitle: "Best practices for accurate leaf photography & diagnosis",
    help_dos_donts_title: "Photo Quality Do's & Don'ts",
    help_rule_dist_title: "1. Camera Distance",
    help_rule_dist_do: "Keep 15–20 cm close. The infected leaf lesion should occupy 70% of the frame.",
    help_rule_dist_dont: "Do not take distant shots of the entire crop field or ground soil.",
    help_rule_light_title: "2. Lighting & Shadows",
    help_rule_light_do: "Take photos in natural diffused daylight with even illumination across the leaf.",
    help_rule_light_dont: "Avoid casting hand/phone shadows directly over the leaf or capturing harsh midday glare.",
    help_rule_leaf_title: "3. Subject Isolation",
    help_rule_leaf_do: "Focus steadily on one single infected leaf held against a clean background.",
    help_rule_leaf_dont: "Do not photograph clusters of 10 leaves, farm tractors, tools, or footwear.",
    
    // How It Works Steps
    help_how_title: "How KheetSathi Works",
    help_how_step1: "1. Choose your crop (Potato, Tomato, Rice, etc.).",
    help_how_step2: "2. Take a close-up photo of the affected leaf.",
    help_how_step3: "3. Get instant condition identification, symptoms, and 3-tier remedies.",
    help_how_step4: "4. Save to Crop Health Timeline to track recovery over time.",
    
    // FAQ Section
    help_faq_title: "Frequently Asked Questions (FAQs)",
    help_faq_q1: "Does this app work without an internet connection?",
    help_faq_a1: "Yes! KheetSathi is an offline-first PWA. Once loaded, all scans, image quality checks, and history remain fully functional offline.",
    help_faq_q2: "What happens if my photo is blurry?",
    help_faq_a2: "Our built-in image quality gate calculates edge variance and alerts you to retake the photo, preventing inaccurate diagnoses.",
    help_faq_q3: "Where can I get verified chemical dosage amounts?",
    help_faq_a3: "For agronomic safety, exact chemical dosages must be calibrated with your local Krishi Vigyan Kendra (KVK) or Kisan Call Center.",
    help_faq_q4: "Can I track disease recovery over multiple weeks?",
    help_faq_a4: "Yes! Use 'Crop Health Timeline' and 'Compare Scans' to monitor foliar severity changes from earlier to recent checks.",
    
    // Help Support Card
    help_support_title: "National Kisan Call Center (24x7)",
    help_support_desc: "Speak directly with government agricultural scientists toll-free:",
    help_support_hours: "Hours: 6:00 AM – 10:00 PM (All 7 Days)",
    help_support_badge: "Toll-Free Helpline",
    
    // Farmer Profile
    profile_title: "Farmer Profile & Settings",
    farmer_name: "Farmer Name:",
    farmer_location: "State / District:",
    total_scans: "Total Checks Logged:",
    offline_cache_status: "Offline PWA Status:",
    cache_ready: "Active (PWA Cache Ready)"
  }
};
