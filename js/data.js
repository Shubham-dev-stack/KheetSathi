// KheetSathi Master Data Fixtures & Botanical Imagery (SIH 2026 Production Edition)

function createSvgDataUri(svgContent) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
}

// Hero Photographic Agricultural Scene for Home Screen (Authentic Indian Farm Landscape)
const HERO_FARM_IMAGE = './assets/images/hero_farm.jpg';

// High-Fidelity Botanical Crop Imagery (Real Field Photography)
const CROP_IMAGES = {
  potato: './assets/images/crop_potato.jpg',
  tomato: './assets/images/crop_tomato.jpg',
  rice: './assets/images/crop_rice.jpg',
  wheat: './assets/images/crop_wheat.jpg',
  cotton: './assets/images/crop_cotton.jpg',
  general: './assets/images/sample_healthy_leaf.jpg'
};

// Visual Tutorial Cards for Help Screen (01 Distance, 02 Lighting, 03 Single Leaf)
const HELP_IMAGES = {
  distance: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="130" viewBox="0 0 360 130">
      <rect width="360" height="130" fill="#EEF4EC"/>
      <g transform="translate(45, 20)">
        <!-- Phone Outline -->
        <rect x="0" y="10" width="38" height="70" rx="6" fill="#202A1F" stroke="#101810" stroke-width="2"/>
        <circle cx="19" cy="20" r="4" fill="#4B6E44"/>
        <!-- Arrow Distance Metric -->
        <line x1="48" y1="45" x2="140" y2="45" stroke="#8C651E" stroke-width="2" stroke-dasharray="4,3"/>
        <polygon points="48,45 55,41 55,49" fill="#8C651E"/>
        <polygon points="140,45 133,41 133,49" fill="#8C651E"/>
        <text x="94" y="38" font-family="sans-serif" font-size="11.5" font-weight="bold" fill="#8C651E" text-anchor="middle">15 – 20 cm</text>
        <!-- Leaf Sample -->
        <path d="M150,70 C190,30 205,65 190,100 C165,115 150,90 150,70 Z" fill="#3D7532"/>
        <circle cx="175" cy="75" r="8" fill="#7C3B24" opacity="0.8"/>
      </g>
      <!-- Green Checkmark Pill -->
      <circle cx="315" cy="65" r="16" fill="#1B4D20"/>
      <path d="M308,65 L313,70 L322,59" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
    </svg>
  `),
  lighting: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="130" viewBox="0 0 360 130">
      <rect width="360" height="130" fill="#FAF6EC"/>
      <g transform="translate(40, 15)">
        <!-- Soft Daytime Sun -->
        <circle cx="45" cy="35" r="18" fill="#F59E0B" opacity="0.85"/>
        <path d="M35,45 C25,45 18,52 22,60 C26,68 62,68 66,60 C70,52 60,45 52,45 Z" fill="#E2E8F0" opacity="0.9"/>
        <!-- Soft Daylight on Leaf -->
        <path d="M145,35 C195,20 210,70 185,110 C150,125 135,85 145,35 Z" fill="#4B8C3E"/>
        <path d="M145,35 L175,85" stroke="#2B5424" stroke-width="2" fill="none"/>
      </g>
      <!-- Green Checkmark Pill -->
      <circle cx="315" cy="65" r="16" fill="#1B4D20"/>
      <path d="M308,65 L313,70 L322,59" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
    </svg>
  `),
  single_leaf: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="130" viewBox="0 0 360 130">
      <rect width="360" height="130" fill="#EEF4EC"/>
      <g transform="translate(50, 15)">
        <!-- Framing Guide Box -->
        <rect x="25" y="5" width="130" height="95" rx="4" fill="none" stroke="#234E23" stroke-width="2" stroke-dasharray="6,4"/>
        <!-- Centered Single Leaf -->
        <path d="M90,18 C125,26 135,75 120,90 C100,100 80,80 90,18 Z" fill="#386E2E"/>
        <circle cx="105" cy="55" r="8" fill="#1C1813" opacity="0.85"/>
      </g>
      <!-- Green Checkmark Pill -->
      <circle cx="315" cy="65" r="16" fill="#1B4D20"/>
      <path d="M308,65 L313,70 L322,59" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
    </svg>
  `)
};

const MOCK_CROPS = [
  {
    crop_id: "potato",
    botanical_name: "Solanum tuberosum",
    name_en: "Potato",
    name_hi: "आलू",
    image: CROP_IMAGES.potato,
    season: "Rabi"
  },
  {
    crop_id: "tomato",
    botanical_name: "Solanum lycopersicum",
    name_en: "Tomato",
    name_hi: "टमाटर",
    image: CROP_IMAGES.tomato,
    season: "Year-round"
  },
  {
    crop_id: "rice",
    botanical_name: "Oryza sativa",
    name_en: "Rice / Paddy",
    name_hi: "धान",
    image: CROP_IMAGES.rice,
    season: "Kharif"
  },
  {
    crop_id: "wheat",
    botanical_name: "Triticum aestivum",
    name_en: "Wheat",
    name_hi: "गेहूं",
    image: CROP_IMAGES.wheat,
    season: "Rabi"
  },
  {
    crop_id: "cotton",
    botanical_name: "Gossypium hirsutum",
    name_en: "Cotton",
    name_hi: "कपास",
    image: CROP_IMAGES.cotton,
    season: "Kharif"
  }
];

const MOCK_DISEASES = {
  "potato_late_blight": {
    disease_id: "potato_late_blight",
    crop_id: "potato",
    scientific_name: "Phytophthora infestans",
    name_en: "Potato Late Blight",
    name_hi: "पछेती झुलसा",
    pathogen_type: "Fungal-like Oomycete",
    severity_tier: "Moderate Severity",
    confidence_score: 0.89,
    symptoms_en: "1. Dark water-soaked lesions on leaf margins.\n2. White downy fungal mold on leaf underside.\n3. Rapid foliar browning under humid conditions.",
    symptoms_hi: "१. पत्तियों के सिरों पर पानी से भीगे गहरे काले-भूरे धब्बे।\n२. अत्यधिक नमी में पत्तियों के नीचे सफेद महीन फफूंद।\n३. पत्तियों का तेजी से झुलसना और सूखना।",
    observations: [
      "पत्तियों के सिरों पर पानी से भीगे काले-भूरे धब्बे।",
      "निचली सतह पर सफेद महीन फफूंद की परत।",
      "आर्द्र मौसम में धब्बों का तेजी से फैलाव।"
    ]
  },
  "potato_early_blight": {
    disease_id: "potato_early_blight",
    crop_id: "potato",
    scientific_name: "Alternaria solani",
    name_en: "Potato Early Blight",
    name_hi: "अगेती झुलसा",
    pathogen_type: "Fungal",
    severity_tier: "Mild Severity",
    confidence_score: 0.86,
    symptoms_en: "1. Concentric target-board rings on older leaves.\n2. Yellow chlorotic halo around brown spots.\n3. Premature leaf drop from bottom upwards.",
    symptoms_hi: "१. निचली पुरानी पत्तियों पर छल्लेदार गोल धब्बे।\n२. धब्बों के चारों ओर हल्का पीला घेरा।\n३. समय से पहले पत्तियों का सूखकर गिरना।",
    observations: [
      "पुरानी पत्तियों पर गोल छल्लेदार टारगेट-बोर्ड धब्बे।",
      "धब्बों के आसपास पीलापन।",
      "निचले पत्तों से ऊपर की ओर संक्रमण।"
    ]
  },
  "potato_healthy": {
    disease_id: "potato_healthy",
    crop_id: "potato",
    scientific_name: "N/A (Healthy Foliage)",
    name_en: "Healthy Foliage",
    name_hi: "स्वस्थ पौधा",
    pathogen_type: "Healthy",
    severity_tier: "Healthy",
    confidence_score: 0.96,
    symptoms_en: "1. Vibrant deep green leaf color.\n2. Firm, undamaged leaf surface.\n3. Completely free of fungal spots or curling.",
    symptoms_hi: "१. गहरा चमकदार हरा रंग।\n२. मजबूत और बेदाग पत्तियां।\n३. किसी भी प्रकार के रोग या कीड़े के लक्षण नहीं।",
    observations: [
      "पत्तियां चमकदार और पूर्णतः हरी हैं।",
      "कोई फफूंद या कीड़े का प्रकोप नहीं।",
      "पौधे का विकास सामान्य और संतुलित है।"
    ]
  },
  "tomato_leaf_curl": {
    disease_id: "tomato_leaf_curl",
    crop_id: "tomato",
    scientific_name: "Tomato Yellow Leaf Curl Virus (TYLCV)",
    name_en: "Leaf Curl Virus",
    name_hi: "पर्ण कुंचन वायरस",
    pathogen_type: "Viral (Vector: Whitefly)",
    severity_tier: "Severe Infection",
    confidence_score: 0.84,
    symptoms_en: "1. Severe upward curling of leaf margins.\n2. Thickened yellow veins.\n3. Stunted, bushy plant growth.",
    symptoms_hi: "१. पत्तियों का ऊपर की ओर मुड़ना व सिकुड़ना।\n२. नसों का पीला व मोटा होना।\n३. पौधे का बौना व झाड़ीदार रह जाना।",
    observations: [
      "पत्तियां ऊपर की ओर कप के आकार में मुड़ी हुई हैं।",
      "पत्तियों की नसें पीली व कठोर हैं।",
      "पौधे की नई शाखाओं का विकास रुक गया है।"
    ]
  },
  "rice_bacterial_blight": {
    disease_id: "rice_bacterial_blight",
    crop_id: "rice",
    scientific_name: "Xanthomonas oryzae pv. oryzae",
    name_en: "Bacterial Leaf Blight",
    name_hi: "जीवाणु झुलसा रोग",
    pathogen_type: "Bacterial",
    severity_tier: "Severe Infection",
    confidence_score: 0.91,
    symptoms_en: "1. Yellowish-white wavy stripes along leaf margins.\n2. Lesions drying into grayish-white bleached strips.\n3. Bacterial ooze beads during humid mornings.",
    symptoms_hi: "१. पत्ती के किनारों पर लहरदार पीली-सफेद धारियां।\n२. धब्बों का सूखकर भूरा-सफेद होना।\n३. सुबह के समय पत्तियों पर जीवाणु रस की बूंदें।",
    observations: [
      "पत्ती के सिरे से किनारों तक लहरदार धारियां।",
      "पत्तियों के किनारे सूखकर सफेद हो रहे हैं।",
      "खेत में कई पौधों में एक साथ लक्षण।"
    ]
  }
};

const MOCK_RECOMMENDATIONS = {
  "potato_late_blight": {
    cultural_en: [
      "Prune and destroy infected lower leaves away from field.",
      "Clear furrow drainage channels to prevent standing water.",
      "Water early in morning; strictly avoid sprinkler irrigation."
    ],
    cultural_hi: [
      "संक्रमित पत्तियों को तोड़कर खेत से दूर जमीन में दबाएं।",
      "खेत में पानी जमा न होने दें, जल निकासी नालियां साफ रखें।",
      "सुबह के समय क्यारियों में पानी दें; ऊपर से छिड़काव न करें।"
    ],
    biological_en: [
      "Foliar spray of Trichoderma viride bio-agent formulation.",
      "Preventive spray of 5% aqueous Neem Seed Kernel Extract (NSKE)."
    ],
    biological_hi: [
      "ट्राइकोडर्मा विरिडी (Trichoderma viride) जैविक घोल का छिड़काव करें।",
      "नीम के बीज के सत्व (NSKE) का सुरक्षात्मक जैविक छिड़काव करें।"
    ],
    chemical_en: [
      "If chemical intervention is needed, use only a locally approved product (e.g. Mancozeb group) according to its official label and seek agricultural expert guidance."
    ],
    chemical_hi: [
      "रासायनिक उत्पाद का प्रयोग केवल स्थानीय अधिकृत लेबल और कृषि विशेषज्ञ के मार्गदर्शन अनुसार ही करें (उदा. मैनकोजेब समूह)।"
    ]
  },
  "potato_early_blight": {
    cultural_en: [
      "Remove soil-touching older diseased foliage.",
      "Rotate crops with non-solanaceous legumes or cereals.",
      "Maintain balanced fertilization; avoid excess urea nitrogen."
    ],
    cultural_hi: [
      "जमीन से सटी पुरानी बीमार पत्तियों को हटाकर नष्ट करें।",
      "दलहनी या अनाज वाली फसलों के साथ फसल चक्र अपनाएं।",
      "यूरिया का संतुलित प्रयोग करें, अत्यधिक नाइट्रोजन से बचें।"
    ],
    biological_en: [
      "Foliar spray of Bacillus subtilis based bio-formulation.",
      "Soil application of well-rotted FYM enriched with Trichoderma."
    ],
    biological_hi: [
      "बैसिलस सबटिलिस (Bacillus subtilis) आधारित जैविक दवा का छिड़काव करें।",
      "गोबर की सड़ी खाद में ट्राइकोडर्मा मिलाकर खेत में डालें।"
    ],
    chemical_en: [
      "Use only a locally approved protective fungicide according to its registered label and seek agricultural expert guidance."
    ],
    chemical_hi: [
      "रासायनिक उत्पाद का प्रयोग केवल स्थानीय अधिकृत लेबल और कृषि विशेषज्ञ के मार्गदर्शन अनुसार ही करें।"
    ]
  },
  "potato_healthy": {
    cultural_en: [
      "Maintain regular irrigation intervals and keep fields weed-free.",
      "Apply balanced micro-nutrients as per crop stage."
    ],
    cultural_hi: [
      "खेत में पर्याप्त नमी बनाए रखें और क्यारियों को खरपतवार मुक्त रखें।",
      "संतुलित खाद व सूक्ष्म पोषक तत्वों का समय पर प्रयोग करें।"
    ],
    biological_en: [
      "Occasional preventive neem-oil foliar sprays during cloudy weather."
    ],
    biological_hi: [
      "मौसम में नमी रहने पर नीम तेल का हल्का सुरक्षात्मक छिड़काव कर सकते हैं।"
    ],
    chemical_en: [
      "No chemical fungicides required for healthy foliage."
    ],
    chemical_hi: [
      "स्वस्थ फसल पर किसी रासायनिक दवा के छिड़काव की आवश्यकता नहीं है।"
    ]
  },
  "tomato_leaf_curl": {
    cultural_en: [
      "Rogue out and destroy virus-infected plants early.",
      "Install yellow sticky cards across field to trap whiteflies.",
      "Use reflective silver mulch to repel insect vectors."
    ],
    cultural_hi: [
      "शुरुआती अवस्था में रोगग्रस्त पौधों को उखाड़कर नष्ट करें।",
      "सफेद मक्खी की रोकथाम हेतु पीले चिपचिपे कार्ड (Yellow Sticky Traps) लगाएं।",
      "सफेद मक्खी को भगाने के लिए सिल्वर मल्चिंग शीट का प्रयोग करें।"
    ],
    biological_en: [
      "Foliar sprays of cold-pressed Neem oil (10,000 ppm).",
      "Conserve natural predator insects (Green lacewings)."
    ],
    biological_hi: [
      "सफेद मक्खी को दूर रखने के लिए नीम तेल का नियमित छिड़काव करें।",
      "प्राकृतिक मित्र कीटों का संरक्षण करें।"
    ],
    chemical_en: [
      "Vector control: Use only locally approved insecticides according to official label under agricultural expert guidance."
    ],
    chemical_hi: [
      "सफेद मक्खी नियंत्रण: रासायनिक कीटनाशक का प्रयोग केवल आधिकारिक लेबल व कृषि विशेषज्ञ की सलाह अनुसार करें।"
    ]
  },
  "rice_bacterial_blight": {
    cultural_en: [
      "Drain excess standing water from field to arrest spread.",
      "Immediately halt excess top-dressing of urea nitrogen."
    ],
    cultural_hi: [
      "जीवाणु के फैलाव को रोकने के लिए खेत से अतिरिक्त पानी निकाल दें।",
      "संक्रमण के दौरान यूरिया का अत्यधिक छिड़काव तुरंत रोकें।"
    ],
    biological_en: [
      "Foliar spray of Pseudomonas fluorescens bio-formulation."
    ],
    biological_hi: [
      "स्यूडोमोनास फ्लोरोसेंस (Pseudomonas fluorescens) जैविक घोल का छिड़काव करें।"
    ],
    chemical_en: [
      "Use only a locally approved bactericide product according to its official label and seek agricultural expert guidance."
    ],
    chemical_hi: [
      "रासायनिक उत्पाद का प्रयोग केवल स्थानीय अधिकृत लेबल और कृषि विशेषज्ञ के मार्गदर्शन अनुसार ही करें।"
    ]
  }
};

// High-Resolution Photographic Sample Presets (Real Field Macro Photography)
const DEMO_PRESETS = [
  {
    id: "preset_potato_late_blight",
    cropId: "potato",
    title_en: "Potato Late Blight",
    title_hi: "आलू पछेती झुलसा",
    expectedResult: "potato_late_blight",
    isBlurry: false,
    isDark: false,
    qualityScore: 94,
    thumbnail: "./assets/images/sample_potato_blight.jpg"
  },
  {
    id: "preset_tomato_leaf_curl",
    cropId: "tomato",
    title_en: "Tomato Leaf Curl",
    title_hi: "टमाटर लीफ कर्ल",
    expectedResult: "tomato_leaf_curl",
    isBlurry: false,
    isDark: false,
    qualityScore: 91,
    thumbnail: "./assets/images/sample_tomato_curl.jpg"
  },
  {
    id: "preset_rice_bacterial_blight",
    cropId: "rice",
    title_en: "Rice Bacterial Blight",
    title_hi: "धान जीवाणु झुलसा",
    expectedResult: "rice_bacterial_blight",
    isBlurry: false,
    isDark: false,
    qualityScore: 95,
    thumbnail: "./assets/images/sample_rice_blight.jpg"
  },
  {
    id: "preset_healthy_leaf",
    cropId: "potato",
    title_en: "Healthy Leaf (Control)",
    title_hi: "स्वस्थ पत्ती (नियंत्रण)",
    expectedResult: "potato_healthy",
    isBlurry: false,
    isDark: false,
    qualityScore: 98,
    thumbnail: "./assets/images/sample_healthy_leaf.jpg"
  },
  {
    id: "preset_blurry_sample",
    cropId: "potato",
    title_en: "Low Light / Blurry Sample",
    title_hi: "कम रोशनी / धुंधला नमूना",
    expectedResult: "uncertain",
    isBlurry: true,
    isDark: true,
    qualityScore: 38,
    thumbnail: "./assets/images/sample_potato_blight.jpg"
  },
  {
    id: "preset_non_leaf",
    cropId: "general",
    title_en: "Non-Leaf / Tractor",
    title_hi: "अन्य वस्तु / ट्रैक्टर",
    expectedResult: "uncertain_nonleaf",
    isBlurry: false,
    isDark: false,
    qualityScore: 85,
    thumbnail: "./assets/images/sample_tractor.jpg"
  }
];

const DEFAULT_MY_CROPS = ["potato", "tomato", "rice"];

const DEFAULT_HISTORY = [
  {
    id: "scan_seed_001",
    crop_id: "potato",
    crop_name_en: "Potato",
    crop_name_hi: "आलू",
    disease_id: "potato_late_blight",
    disease_name_en: "Late Blight",
    disease_name_hi: "पछेती झुलसा",
    confidence_score: 0.89,
    severity_tier: "Moderate Severity",
    scanned_at: "2026-08-28T10:15:00Z",
    quality_score: 94,
    is_mock: true,
    isDemo: true,
    thumbnail: "./assets/images/sample_potato_blight.jpg"
  },
  {
    id: "scan_seed_002",
    crop_id: "tomato",
    crop_name_en: "Tomato",
    crop_name_hi: "टमाटर",
    disease_id: "tomato_leaf_curl",
    disease_name_en: "Leaf Curl Virus",
    disease_name_hi: "पर्ण कुंचन वायरस",
    confidence_score: 0.84,
    severity_tier: "Severe Infection",
    scanned_at: "2026-08-27T16:40:00Z",
    quality_score: 91,
    is_mock: true,
    isDemo: true,
    thumbnail: "./assets/images/sample_tomato_curl.jpg"
  },
  {
    id: "scan_seed_003",
    crop_id: "rice",
    crop_name_en: "Rice / Paddy",
    crop_name_hi: "धान",
    disease_id: "rice_bacterial_blight",
    disease_name_en: "Bacterial Blight",
    disease_name_hi: "जीवाणु झुलसा",
    confidence_score: 0.91,
    severity_tier: "Severe Infection",
    scanned_at: "2026-08-26T09:20:00Z",
    quality_score: 95,
    is_mock: true,
    isDemo: true,
    thumbnail: "./assets/images/sample_rice_blight.jpg"
  },
  {
    id: "scan_seed_004",
    crop_id: "potato",
    crop_name_en: "Potato",
    crop_name_hi: "आलू",
    disease_id: "potato_early_blight",
    disease_name_en: "Early Blight",
    disease_name_hi: "अगेती झुलसा",
    confidence_score: 0.86,
    severity_tier: "Mild Severity",
    scanned_at: "2026-08-22T11:30:00Z",
    quality_score: 92,
    is_mock: true,
    isDemo: true,
    thumbnail: "./assets/images/sample_potato_blight.jpg"
  },
  {
    id: "scan_seed_005",
    crop_id: "tomato",
    crop_name_en: "Tomato",
    crop_name_hi: "टमाटर",
    disease_id: "tomato_leaf_curl",
    disease_name_en: "Leaf Curl Virus",
    disease_name_hi: "पर्ण कुंचन वायरस",
    confidence_score: 0.79,
    severity_tier: "Moderate Severity",
    scanned_at: "2026-08-20T14:10:00Z",
    quality_score: 89,
    is_mock: true,
    isDemo: true,
    thumbnail: "./assets/images/sample_tomato_curl.jpg"
  }
];

const DEFAULT_USER = {
  user_id: "usr_kisan_demo",
  name: "Ramesh Patel",
  phone: "+91 98765 43210",
  preferred_lang: "hi",
  state: "Madhya Pradesh",
  district: "Indore",
  village: "Sanwer",
  crops_cultivated: ["potato", "tomato", "rice"],
  isDemo: true
};

// =============================================================================
// ECOSYSTEM DATA FIXTURES (RETAILERS, PRODUCTS, EXPERTS, COMMUNITY, WASTE)
// =============================================================================

// 1. Agricultural Input Retailers (Local Agro-Input Dealers)
const MOCK_RETAILERS = [
  {
    retailer_id: "ret_01",
    shop_name: "Kisan Seva Kendra (किसान सेवा केंद्र)",
    owner_name: "Shri Omkar Sharma",
    location: "Main Market, Sanwer",
    distance_km: 1.8,
    phone: "07321-224411",
    address: "Shop No. 12, Mandi Road, Sanwer, Indore (M.P.)",
    rating: 4.8,
    reviews_count: 86,
    is_verified: true,
    opening_hours: "08:00 AM – 07:30 PM",
    isDemo: true
  },
  {
    retailer_id: "ret_02",
    shop_name: "Bharat Krishi Sewa & Seeds (भारत कृषि सेवा)",
    owner_name: "Vikram Singh Patel",
    location: "Old Bus Stand, Sanwer",
    distance_km: 3.2,
    phone: "07321-225588",
    address: "Near IFFCO Center, Bypass Road, Sanwer (M.P.)",
    rating: 4.5,
    reviews_count: 54,
    is_verified: true,
    opening_hours: "08:30 AM – 08:00 PM",
    isDemo: true
  },
  {
    retailer_id: "ret_03",
    shop_name: "Gramin Agro Chemical Center (ग्रामीण एग्रो केमिकल्स)",
    owner_name: "Jagdish Choudhary",
    location: "Kshipra Toll Road",
    distance_km: 5.4,
    phone: "07321-229900",
    address: "Village Kshipra, Sanwer-Indore Highway (M.P.)",
    rating: 4.2,
    reviews_count: 38,
    is_verified: false,
    opening_hours: "09:00 AM – 07:00 PM",
    isDemo: true
  }
];

// 2. Agricultural Products with Multi-Retailer Normalized Pricing
const MOCK_AGRI_PRODUCTS = [
  {
    product_id: "prod_mancozeb_75",
    brand_name: "Indofil M-45 (Mancozeb 75% WP)",
    category: "Fungicide (फफूंदनाशक)",
    active_ingredient: "Mancozeb 75% WP",
    target_crops: ["potato", "tomato", "wheat", "general"],
    target_diseases: ["potato_late_blight", "potato_early_blight", "tomato_early_blight", "tomato_septoria", "wheat_rust"],
    description_hi: "व्यापक स्पेक्ट्रम संपर्क फफूंदनाशक। झुलसा व धब्बा रोगों की रोकथाम हेतु प्रभावी।",
    description_en: "Broad-spectrum contact fungicide effective against early & late blight, leaf spot.",
    safety_cautions_hi: "छिड़काव के समय मास्क और दस्ताने पहनें। पानी के स्रोतों से दूर रखें।",
    safety_cautions_en: "Wear safety mask and gloves during foliar spray. Keep away from water sources.",
    dosage_guide: "2.0 – 2.5 g / Litre of water (or as advised on CIBRC registered label)",
    pack_variants: [
      {
        pack_size: 500,
        unit: "g",
        normalized_unit: "100g",
        retailers: [
          { retailer_id: "ret_01", price: 210, stock_status: "in_stock", last_updated: "2 hours ago" },
          { retailer_id: "ret_02", price: 195, stock_status: "in_stock", last_updated: "1 day ago" },
          { retailer_id: "ret_03", price: 220, stock_status: "unknown", last_updated: "3 days ago" }
        ]
      },
      {
        pack_size: 1000,
        unit: "g",
        normalized_unit: "100g",
        retailers: [
          { retailer_id: "ret_01", price: 380, stock_status: "in_stock", last_updated: "2 hours ago" },
          { retailer_id: "ret_02", price: 360, stock_status: "in_stock", last_updated: "1 day ago" },
          { retailer_id: "ret_03", price: 390, stock_status: "in_stock", last_updated: "3 days ago" }
        ]
      }
    ],
    isDemo: true
  },
  {
    product_id: "prod_metalaxyl_mancozeb",
    brand_name: "Ridomil Gold (Metalaxyl-M 4% + Mancozeb 64% WP)",
    category: "Systemic & Contact Fungicide (दैहिक व संपर्क फफूंदनाशक)",
    active_ingredient: "Metalaxyl-M 4% + Mancozeb 64% WP",
    target_crops: ["potato", "tomato", "general"],
    target_diseases: ["potato_late_blight", "tomato_early_blight", "tomato_late_blight"],
    description_hi: "पछेती झुलसा (Late Blight) के गंभीर संक्रमण में तत्काल सुरक्षा हेतु दोहरा एक्शन फफूंदनाशक।",
    description_en: "Dual-action systemic and contact fungicide for robust control of late blight infections.",
    safety_cautions_hi: "केवल सिफारिश की गई मात्रा में प्रयोग करें। फसल कटाई से 14 दिन पहले प्रयोग बंद करें।",
    safety_cautions_en: "Follow CIBRC approved label recommendations strictly. 14-day pre-harvest interval.",
    dosage_guide: "1.5 – 2.0 g / Litre of water",
    pack_variants: [
      {
        pack_size: 250,
        unit: "g",
        normalized_unit: "100g",
        retailers: [
          { retailer_id: "ret_01", price: 340, stock_status: "in_stock", last_updated: "3 hours ago" },
          { retailer_id: "ret_02", price: 325, stock_status: "in_stock", last_updated: "Today" },
          { retailer_id: "ret_03", price: 350, stock_status: "low_stock", last_updated: "2 days ago" }
        ]
      },
      {
        pack_size: 500,
        unit: "g",
        normalized_unit: "100g",
        retailers: [
          { retailer_id: "ret_01", price: 620, stock_status: "in_stock", last_updated: "3 hours ago" },
          { retailer_id: "ret_02", price: 590, stock_status: "in_stock", last_updated: "Today" },
          { retailer_id: "ret_03", price: 640, stock_status: "unknown", last_updated: "2 days ago" }
        ]
      }
    ],
    isDemo: true
  },
  {
    product_id: "prod_copper_oxychloride",
    brand_name: "Blitox 50 (Copper Oxychloride 50% WP)",
    category: "Contact Fungicide & Bactericide (ताम्र फफूंदनाशक व जीवाणुनाशक)",
    active_ingredient: "Copper Oxychloride 50% WP",
    target_crops: ["potato", "tomato", "rice", "general"],
    target_diseases: ["potato_early_blight", "tomato_bacterial_spot", "rice_bacterial_blight"],
    description_hi: "जीवाणु व फफूंद दोनों रोगों के नियंत्रण हेतु विश्वसनीय सुरक्षात्मक ताम्र कवकनाशी।",
    description_en: "Reliable protective copper-based bactericide and fungicide against blight and bacterial spot.",
    safety_cautions_hi: "अत्यधिक गर्मी के समय छिड़काव न करें। बच्चों की पहुंच से दूर रखें।",
    safety_cautions_en: "Avoid application in extreme midday heat. Keep out of reach of children.",
    dosage_guide: "2.5 – 3.0 g / Litre of water",
    pack_variants: [
      {
        pack_size: 500,
        unit: "g",
        normalized_unit: "100g",
        retailers: [
          { retailer_id: "ret_01", price: 240, stock_status: "in_stock", last_updated: "1 day ago" },
          { retailer_id: "ret_02", price: 230, stock_status: "in_stock", last_updated: "1 day ago" },
          { retailer_id: "ret_03", price: 255, stock_status: "in_stock", last_updated: "4 days ago" }
        ]
      }
    ],
    isDemo: true
  },
  {
    product_id: "prod_neem_oil_10000",
    brand_name: "Econeem Plus (Azadirachtin 1% / 10,000 ppm)",
    category: "Biological / Organic (जैविक वानस्पतिक कीटनाशक)",
    active_ingredient: "Azadirachtin 10000 ppm",
    target_crops: ["potato", "tomato", "cotton", "rice", "general"],
    target_diseases: ["tomato_leaf_curl", "tomato_spider_mites", "cotton_bollworm", "general_healthy"],
    description_hi: "सफेद मक्खी, थ्रिप्स व रस चूसक कीटों के नियंत्रण हेतु प्राकृतिक जैविक समाधान।",
    description_en: "Natural botanical biopesticide for managing whiteflies, aphids, and vector insects.",
    safety_cautions_hi: "पर्यावरण के अनुकूल। सुबह या शाम के समय छिड़काव सर्वोत्तम।",
    safety_cautions_en: "Eco-friendly, safe for beneficial pollinators when sprayed early morning/evening.",
    dosage_guide: "2.0 – 3.0 ml / Litre of water",
    pack_variants: [
      {
        pack_size: 250,
        unit: "ml",
        normalized_unit: "100ml",
        retailers: [
          { retailer_id: "ret_01", price: 280, stock_status: "in_stock", last_updated: "Today" },
          { retailer_id: "ret_02", price: 265, stock_status: "in_stock", last_updated: "Today" },
          { retailer_id: "ret_03", price: 290, stock_status: "in_stock", last_updated: "1 day ago" }
        ]
      },
      {
        pack_size: 1000,
        unit: "ml",
        normalized_unit: "100ml",
        retailers: [
          { retailer_id: "ret_01", price: 850, stock_status: "in_stock", last_updated: "Today" },
          { retailer_id: "ret_02", price: 790, stock_status: "in_stock", last_updated: "Today" },
          { retailer_id: "ret_03", price: 890, stock_status: "unknown", last_updated: "3 days ago" }
        ]
      }
    ],
    isDemo: true
  },
  {
    product_id: "prod_trichoderma_viride",
    brand_name: "Sanjivani (Trichoderma viride 1% WP)",
    category: "Bio-Fungicide (जैविक फफूंद नियंत्रक)",
    active_ingredient: "Trichoderma viride $2\\times 10^6$ cfu/g",
    target_crops: ["potato", "tomato", "rice", "wheat", "cotton", "general"],
    target_diseases: ["potato_late_blight", "potato_early_blight", "tomato_early_blight", "general_healthy"],
    description_hi: "मृदा जनित व फफूंद जनित रोगों की रोकथाम हेतु लाभकारी मित्र फफूंद।",
    description_en: "Beneficial antagonistic bio-fungicide protecting against root & soil-borne pathogens.",
    safety_cautions_hi: "रासायनिक फफूंदनाशक के साथ न मिलाएं। गोबर की खाद के साथ प्रयोग सर्वोत्तम।",
    safety_cautions_en: "Do not mix with chemical fungicides. Best applied with farmyard manure.",
    dosage_guide: "5 – 10 g / kg seed or 2.5 kg / acre with FYM",
    pack_variants: [
      {
        pack_size: 1000,
        unit: "g",
        normalized_unit: "100g",
        retailers: [
          { retailer_id: "ret_01", price: 140, stock_status: "in_stock", last_updated: "Today" },
          { retailer_id: "ret_02", price: 130, stock_status: "in_stock", last_updated: "Today" },
          { retailer_id: "ret_03", price: 150, stock_status: "in_stock", last_updated: "2 days ago" }
        ]
      }
    ],
    isDemo: true
  }
];

// 3. Verified Agricultural Experts Directory
const MOCK_FARMER_EXPERTS = [
  {
    expert_id: "exp_01",
    name: "Dr. Arvind Sharma (डॉ. अरविंद शर्मा)",
    qualification: "M.Sc. (Agri) Plant Pathology, Ph.D.",
    title: "Senior Agronomist & Crop Protection Specialist",
    organization: "KVK Indore / ICAR Affiliate",
    specialization_crops: ["potato", "tomato", "rice", "wheat"],
    experience_years: 16,
    location: "KVK Kasturbagram, Indore",
    distance_km: 12.4,
    consultation_fee: 250,
    field_visit_fee: 500,
    availability_status: "Demo Profile (डेमो प्रोफाइल)",
    languages: ["हिन्दी (Hindi)", "Malwi", "English"],
    rating: 4.9,
    consultations_completed: 412,
    is_verified: true,
    phone: "0731-278899",
    isDemo: true
  },
  {
    expert_id: "exp_02",
    name: "Dr. Sunita Verma (डॉ. सुनीता वर्मा)",
    qualification: "Ph.D. Entomology & Bio-Control",
    title: "Horticultural Pest & Virus Vector Advisor",
    organization: "College of Agriculture, Indore",
    specialization_crops: ["tomato", "cotton", "vegetables"],
    experience_years: 12,
    location: "Agri Campus, Indore",
    distance_km: 15.1,
    consultation_fee: 200,
    field_visit_fee: 450,
    availability_status: "Demo Profile (डेमो प्रोफाइल)",
    languages: ["हिन्दी (Hindi)", "English"],
    rating: 4.8,
    consultations_completed: 285,
    is_verified: true,
    phone: "0731-252233",
    isDemo: true
  },
  {
    expert_id: "exp_03",
    name: "Dr. Rajeshwar Mukati (डॉ. राजेश्वर मुकाती)",
    qualification: "M.Sc. Agronomy & Soil Health",
    title: "Field Diagnostic & Crop Nutrition Expert",
    organization: "District Agriculture Extension Officer (Retd.)",
    specialization_crops: ["wheat", "potato", "cotton", "rice"],
    experience_years: 22,
    location: "Sanwer Tehsil HQ",
    distance_km: 2.5,
    consultation_fee: 150,
    field_visit_fee: 350,
    availability_status: "Demo Profile (डेमो प्रोफाइल)",
    languages: ["हिन्दी (Hindi)", "Malwi", "Nimadi"],
    rating: 4.7,
    consultations_completed: 630,
    is_verified: true,
    phone: "07321-223344",
    isDemo: true
  }
];

// 4. "Ask a Farmer" Community Posts & Answers
const MOCK_COMMUNITY_POSTS = [
  {
    post_id: "post_01",
    author_name: "Babulal Patel (बाबूलाल पटेल)",
    author_region: "Sanwer, Indore",
    author_experience: "Experienced Farmer (18 yrs)",
    authority_level: "farmer_observation",
    crop_id: "potato",
    disease_tag: "potato_late_blight",
    title_hi: "आलू में पत्तियों के किनारे काले होकर झुलस रहे हैं, बारिश के बाद क्या करें?",
    title_en: "Potato leaf margins turning black after heavy dew, what immediate remedy?",
    question_text: "पिछली रात घना कोहरा था। सुबह देखा तो निचली पत्तियों पर भूरे-काले धब्बे हैं और सफेद फफूंद जैसा लग रहा है। क्या तुरंत कॉपर का स्प्रे करना ठीक रहेगा?",
    created_at: "2026-09-08T08:30:00Z",
    image: "./assets/images/sample_potato_blight.jpg",
    helpful_votes: 24,
    answers: [
      {
        answer_id: "ans_01_1",
        author_name: "Ramswaroop Yadav (रामस्वरूप यादव)",
        author_badge: "Top Contributor (मालवा क्षेत्र)",
        experience_crop: "Potato • 24 Acres",
        authority_level: "expert_verified",
        text_hi: "भाई, यह पछेती झुलसा (Late Blight) के पक्के लक्षण हैं। खेत में तुरंत पानी का भराव रोकें और क्यारियों की नाली खोलें। अगर धूप निकले तो पहले अधिकृत लेबल अनुसार सुरक्षात्मक छिड़काव करें।",
        text_en: "Classic late blight symptoms. First ensure drain channels are open. Apply authorized protective spray as per label if sunlight permits.",
        helpful_count: 19,
        is_expert_reviewed: true,
        isDemo: true
      },
      {
        answer_id: "ans_01_2",
        author_name: "Kailash Choudhary",
        author_badge: "Experienced Farmer",
        experience_crop: "Potato & Garlic",
        authority_level: "community_response",
        text_hi: "रोगग्रस्त पौधों के संक्रमित पत्ते तोड़कर खेत से बाहर गड्ढे में दबा दें ताकि हवा से पड़ोसी पौधों में न फैले।",
        text_en: "Prune infected bottom leaves and bury them outside the field to prevent aerial spore spread.",
        helpful_count: 8,
        is_expert_reviewed: false,
        isDemo: true
      }
    ],
    isDemo: true
  },
  {
    post_id: "post_02",
    author_name: "Dharmendra Kushwaha (धर्मेंद्र कुशवाहा)",
    author_region: "Mhow, Indore",
    author_experience: "Vegetable Grower (10 yrs)",
    authority_level: "farmer_observation",
    crop_id: "tomato",
    disease_tag: "tomato_leaf_curl",
    title_hi: "टमाटर की पत्तियां ऊपर की तरफ मुड़ रही हैं और पौधा बौना रह रहा है",
    title_en: "Tomato leaves curling upwards and stunted growth",
    question_text: "रोपाई के 30 दिन बाद नई पत्तियां छोटी व मुड़ी हुई निकल रही हैं। फूल भी झड़ रहे हैं।",
    created_at: "2026-09-07T14:15:00Z",
    image: "./assets/images/sample_tomato_curl.jpg",
    helpful_votes: 18,
    answers: [
      {
        answer_id: "ans_02_1",
        author_name: "Mohanlal Sharma",
        author_badge: "Experienced Farmer",
        experience_crop: "Tomato Polyhouse",
        authority_level: "expert_verified",
        text_hi: "यह लीफ कर्ल वायरस है जिसे सफेद मक्खी फैलाती है। खेत में 10-12 पीले चिपचिपे ट्रैप लगाएं और नीम तेल (10,000 ppm) का नियमित छिड़काव करें।",
        text_en: "This is leaf curl virus vectored by whiteflies. Install yellow sticky traps and apply registered neem oil regularly.",
        helpful_count: 15,
        is_expert_reviewed: true,
        isDemo: true
      }
    ],
    isDemo: true
  }
];

// 5. "Farm Waste Advisor" Guidelines & Rule-Based Options
const MOCK_WASTE_GUIDELINES = {
  potato: {
    crop_name_hi: "आलू (Potato)",
    crop_name_en: "Potato",
    waste_types: [
      {
        id: "potato_haulm",
        name_hi: "आलू की बेल / डंठल (Haulm/Vines)",
        name_en: "Potato Haulms / Vines",
        typical_yield_per_acre: "1.5 – 2.5 Tons",
        recommended_methods: [
          {
            method_id: "composting",
            title_hi: "गड्ढा खाद निर्माण (Aerobic Composting)",
            title_en: "Aerobic Compost Production",
            why_text_hi: "रोग-मुक्त बेलों को गोबर की खाद व ट्राइकोडर्मा के साथ मिलाकर 45-60 दिनों में उच्च गुणवत्ता वाली जैविक खाद बनती है।",
            why_text_en: "Composting haulms with FYM and Trichoderma creates rich organic humus in 45-60 days.",
            environmental_benefit_hi: "खेत में बेल जलाने से वायु प्रदूषण नहीं होता और मिट्टी में कार्बन बढ़ता है।",
            environmental_benefit_en: "Zero air pollution from burning; adds 1.2% organic carbon back to soil.",
            effort_level: "मध्यम (Medium • 45-60 दिन)",
            practical_steps: [
              "स्वस्थ व सूखी बेलों को 3-4 इंच के टुकड़ों में काटें",
              "1 मीटर गहरे गड्ढे में बेल, गोबर की स्लरी और मिट्टी की परत बनाएं",
              "सड़न तेज करने के लिए 100 ग्राम वेस्ट डीकंपोजर का छिड़काव करें",
              "हर 15 दिन में पलटाई करें ताकि हवा का संचार बना रहे"
            ]
          },
          {
            method_id: "soil_incorporation",
            title_hi: "रोटावेटर से मिट्टी में मिलाना (In-situ Soil Incorporation)",
            title_en: "In-situ Soil Incorporation (Mulching)",
            why_text_hi: "कटाई के तुरंत बाद रोटावेटर चलाकर बेलों को जमीन में दबाने से अगली फसल के लिए पोषण मिलता है।",
            why_text_en: "Incorporating chopped vines into topsoil improves moisture retention for subsequent crops.",
            environmental_benefit_hi: "मिट्टी की जलधारण क्षमता 18% बढ़ती है।",
            environmental_benefit_en: "Increases soil moisture retention by ~18%.",
            effort_level: "सरल (Quick • 1-2 दिन)",
            practical_steps: [
              "रोग-रहित खेत में फसल कटाई के बाद रोटावेटर चलाएं",
              "हल्की सिंचाई देकर 15-20 दिन सड़ने दें"
            ]
          }
        ]
      }
    ]
  },
  tomato: {
    crop_name_hi: "टमाटर (Tomato)",
    crop_name_en: "Tomato",
    waste_types: [
      {
        id: "tomato_stalks",
        name_hi: "टमाटर के पौधे व सड़े फल (Stalks & Spoiled Fruits)",
        name_en: "Tomato Stalks & Spoiled Fruit",
        typical_yield_per_acre: "2.0 – 3.0 Tons",
        recommended_methods: [
          {
            method_id: "vermicompost",
            title_hi: "केंचुआ खाद (Vermicomposting)",
            title_en: "Vermicomposting",
            why_text_hi: "टमाटर के वानस्पतिक कचरे को गोबर खाद के साथ मिलाकर केंचुओं (Eisenia fetida) से सर्वोत्तम पोषक खाद बनती है।",
            why_text_en: "Converting tomato biomass via Eisenia fetida earthworms yields NPK-rich bio-fertilizer.",
            environmental_benefit_hi: "रासायनिक उर्वरकों पर 25% तक निर्भरता कम होती है।",
            environmental_benefit_en: "Reduces synthetic fertilizer requirement by up to 25%.",
            effort_level: "मध्यम (40-50 दिन)",
            practical_steps: [
              "टमाटर के पौधों को 5-7 दिन धूप में हल्का सुखाएं",
              "केंचुआ बेड में 60% गोबर व 40% वानस्पतिक कचरे की परत बनाएं",
              "नमी 50-60% बनाए रखें और छायादार स्थान पर रखें"
            ]
          }
        ]
      }
    ]
  },
  rice: {
    crop_name_hi: "धान (Rice / Paddy)",
    crop_name_en: "Rice / Paddy",
    waste_types: [
      {
        id: "paddy_straw",
        name_hi: "धान की पराली व भूसा (Paddy Straw / Parali)",
        name_en: "Paddy Straw & Stubble",
        typical_yield_per_acre: "3.0 – 4.0 Tons",
        recommended_methods: [
          {
            method_id: "happy_seeder_mulching",
            title_hi: "मल्चिंग व हैप्पी सीडर से गेहूं बुवाई (Surface Mulching)",
            title_en: "Surface Retention with Happy Seeder",
            why_text_hi: "पराली को जलाए बिना सतह पर फैलाकर सीधे गेहूं की बुवाई करने से खरपतवार नियंत्रण व नमी संरक्षण होता है।",
            why_text_en: "Sowing wheat directly into standing residue with Happy Seeder suppresses weeds and saves water.",
            environmental_benefit_hi: "धुआं और कार्बन उत्सर्जन शून्य; 100% पराली का खेत में उपयोग।",
            environmental_benefit_en: "Zero smog emissions; retains valuable nitrogen, phosphorus, and potassium.",
            effort_level: "तत्काल (Direct Sowing)",
            practical_steps: [
              "कंबाइन हार्वेस्टर के साथ सुपर-एसएमएस का उपयोग करें",
              "हैप्पी सीडर / सुपर सीडर से सीधे गेहूं की बुवाई करें"
            ]
          },
          {
            method_id: "biomass_collection",
            title_hi: "नजदीकी बायोमास व बायोगैस केंद्र पर विक्रय (Pelleting / Biogas)",
            title_en: "Biomass Processing & Commercial Pellet Supply",
            why_text_hi: "बेलर मशीन से गांठें बनाकर नजदीकी बायोगैस या बायोमास बिजली संयंत्र को बेचकर अतिरिक्त आय प्राप्त करें।",
            why_text_en: "Baling straw for nearby CBG (Compressed Biogas) or thermal power plants creates extra income.",
            environmental_benefit_hi: "जीवाश्म ईंधन का स्वच्छ नवीकरणीय विकल्प।",
            environmental_benefit_en: "Clean renewable alternative replacing coal in industrial boilers.",
            effort_level: "व्यावसायिक (Commercial Baling)",
            practical_steps: [
              "खेत में बेलर मशीन से 25-30 किग्रा की गाठें तैयार करें",
              "नजदीकी संकलक केंद्र या बायोगैस संयंत्र से संपर्क करें"
            ]
          }
        ]
      }
    ]
  },
  wheat: {
    crop_name_hi: "गेहूं (Wheat)",
    crop_name_en: "Wheat",
    waste_types: [
      {
        id: "wheat_straw",
        name_hi: "गेहूं का भूसा / नरवाई (Wheat Straw / Narwai)",
        name_en: "Wheat Straw & Stubble",
        typical_yield_per_acre: "2.5 – 3.5 Tons",
        recommended_methods: [
          {
            method_id: "animal_fodder",
            title_hi: "पशु आहार भूसा निर्माण (Straw Reaper Fodder)",
            title_en: "Dry Livestock Fodder Processing",
            why_text_hi: "स्ट्रॉ रीपर मशीन से नरवाई को काटकर पशुओं के लिए पौष्टिक भूसा बनाएं या स्थानीय डेयरी को बेचें।",
            why_text_en: "Reaping wheat stubble creates high-demand dry livestock roughage.",
            environmental_benefit_hi: "100% अपशिष्ट का उपयोगी चारा रूपांतरण।",
            environmental_benefit_en: "100% circular biomass utilization as valuable cattle feed.",
            effort_level: "सरल (1 दिन)",
            practical_steps: [
              "कंबाइन कटाई के बाद तुरंत स्ट्रॉ रीपर चलाएं",
              "भूसे को सूखे स्थान पर सुरक्षित भंडारित करें"
            ]
          }
        ]
      }
    ]
  },
  cotton: {
    crop_name_hi: "कपास (Cotton)",
    crop_name_en: "Cotton",
    waste_types: [
      {
        id: "cotton_stalks",
        name_hi: "कपास की सूखी पराठी / डंठल (Cotton Stalks)",
        name_en: "Cotton Stalks & Woody Biomass",
        typical_yield_per_acre: "1.8 – 2.8 Tons",
        recommended_methods: [
          {
            method_id: "biochar_production",
            title_hi: "बायोचार व मृदा सुधारक (Biochar Production)",
            title_en: "Biochar Production via Pyrolysis",
            why_text_hi: "कठोर डंठलों को कम ऑक्सीजन में तपाकर बायोचार बनाने से मिट्टी में 100+ वर्षों तक कार्बन संचित रहता है।",
            why_text_en: "Converting woody cotton stalks into biochar improves soil CEC and locks carbon for decades.",
            environmental_benefit_hi: "दीर्घकालिक कार्बन जब्ती (Carbon Sequestration)।",
            environmental_benefit_en: "Long-term carbon sequestration and improved soil fertility.",
            effort_level: "उन्नत (Advanced • 2-3 दिन)",
            practical_steps: [
              "डंठलों को श्रेडर मशीन से 2-3 इंच टुकड़ों में काटें",
              "बायोचार क्लिन में 400°C पर ऑक्सीजन-मुक्त दहन करें",
              "तैयार बायोचार को खाद के साथ खेत में मिलाएं"
            ]
          }
        ]
      }
    ]
  }
};

// 6. Nearby Waste Processing & Composting Facilities
const MOCK_WASTE_FACILITIES = [
  {
    facility_id: "fac_01",
    name: "Sanwer Gramin Biogas & CBG Plant (सांवेर बायोगैस संयंत्र)",
    type: "Compressed Biogas (CBG) & Bio-CNG Facility",
    location: "Kshipra Road, Sanwer",
    distance_km: 4.2,
    accepted_waste: ["paddy_straw", "potato_haulm", "cattle_dung", "organic_residue"],
    contact_phone: "07321-228800",
    rate_per_ton: "₹1,400 – ₹1,800 / Ton",
    operating_status: "Operational (स्वीकार कर रहे हैं)",
    isDemo: true
  },
  {
    facility_id: "fac_02",
    name: "Indore District Organic Compost Cluster (जैविक खाद क्लस्टर)",
    type: "Centralized Vermicompost & Waste Processing Unit",
    location: "Kasturbagram, Indore",
    distance_km: 11.5,
    accepted_waste: ["vegetable_waste", "tomato_stalks", "potato_haulm", "wheat_straw"],
    contact_phone: "0731-278855",
    rate_per_ton: "₹1,100 – ₹1,500 / Ton",
    operating_status: "Operational (स्वीकार कर रहे हैं)",
    isDemo: true
  }
];

// 7. Structured Disease Treatment Knowledge Base
const EXTENDED_TREATMENTS = {
  potato_late_blight: {
    disease_id: "potato_late_blight",
    crop_id: "potato",
    name_hi: "आलू पछेती झुलसा",
    name_en: "Potato Late Blight",
    pathogen: "Phytophthora infestans (फंगस/ओओमाइसेट्स)",
    causes_hi: "लगातार 80%+ आर्द्रता, 12-20°C तापमान और पत्तियों पर ओस या पानी की बूंदें 6-8 घंटे तक जमा रहने से यह फंगस तेजी से फैलती है।",
    causes_en: "High humidity (>80%), moderate temperature (12-20°C), and extended leaf wetness favor rapid fungal sporulation.",
    prevention_hi: [
      "प्रमाणित रोग-मुक्त बीज (Kufri Pukhraj, Kufri Jyoti आदि) का ही चयन करें",
      "खेत में जल-निकासी की उचित व्यवस्था रखें और अधिक नाइट्रोजन उर्वरक से बचें",
      "मौसम में कोहरा या नमी बढ़ने पर सुरक्षात्मक मैंकोजेब का अग्रिम छिड़काव करें"
    ],
    prevention_en: [
      "Use certified disease-free seed tubers (e.g. Kufri varieties)",
      "Ensure proper furrow drainage and avoid excessive nitrogen application",
      "Apply protective prophylactic sprays during high humidity spells"
    ],
    curative_active_ingredients: [
      { ingredient: "Metalaxyl-M 4% + Mancozeb 64% WP", timing: "गंभीर संक्रमण दिखने पर तत्काल (At first symptom)" },
      { ingredient: "Dimethomorph 50% WP", timing: "तीव्र फैलाव की स्थिति में (During rapid spread)" },
      { ingredient: "Cymoxanil 8% + Mancozeb 64% WP", timing: "शुरुआती 48 घंटे में (Early systemic action)" }
    ],
    escalation_triggers_hi: "यदि छिड़काव के 48 घंटे बाद भी नए पत्तों पर काले धब्बे बढ़ते रहें या तने पर काले छल्ले दिखने लगें तो तुरंत कृषि वैज्ञानिक से खेत निरीक्षण का अनुरोध करें।",
    escalation_triggers_en: "If water-soaked dark lesions continue spreading to stems after 48h of spray, escalate immediately for professional field inspection."
  },
  tomato_leaf_curl: {
    disease_id: "tomato_leaf_curl",
    crop_id: "tomato",
    name_hi: "टमाटर पर्ण कुंचन वायरस",
    name_en: "Tomato Leaf Curl Virus (ToLCV)",
    pathogen: "Begomovirus (सफेद मक्खी द्वारा प्रसारित)",
    causes_hi: "सफेद मक्खी (Bemisia tabaci) रस चूसते समय पौधे में यह वायरस फैलाती है। यह सीधे कवकनाशी से ठीक नहीं होता।",
    causes_en: "Vectored by whiteflies (Bemisia tabaci). Direct antiviral chemicals do not exist; management focuses on vector control.",
    prevention_hi: [
      "नर्सरी में 40-मेष वाले नेट हाउस में पौधे तैयार करें",
      "खेत की सीमाओं पर 10-12 पीले चिपचिपे कार्ड (Yellow Sticky Traps) प्रति एकड़ लगाएं",
      "गंभीर रूप से मुड़े व बौने पौधों को तुरंत उखाड़कर नष्ट करें"
    ],
    prevention_en: [
      "Raise seedlings under 40-mesh insect-proof nylon nets",
      "Erect 10-12 yellow sticky traps per acre to monitor vector population",
      "Rogue out and destroy early infected stunted plants immediately"
    ],
    curative_active_ingredients: [
      { ingredient: "Azadirachtin 10000 ppm (Neem Oil)", timing: "जैविक कीट निवारक के रूप में (Weekly organic spray)" },
      { ingredient: "Acetamiprid 20% SP", timing: "सफेद मक्खी की अधिकता पर (When vector population exceeds threshold)" },
      { ingredient: "Diafenthiuron 50% WP", timing: "वयस्क व अप्सरा कीट नियंत्रण हेतु (Vector control)" }
    ],
    escalation_triggers_hi: "यदि खेत के 20% से अधिक पौधों में विकृति आ चुकी हो और फूल पूरी तरह गिर रहे हों तो विशेषज्ञ से सलाह लें।",
    escalation_triggers_en: "If disease incidence exceeds 20% of the field with severe flower drop, consult an entomologist immediately."
  },
  rice_bacterial_blight: {
    disease_id: "rice_bacterial_blight",
    crop_id: "rice",
    name_hi: "धान जीवाणु झुलसा",
    name_en: "Rice Bacterial Leaf Blight (BLB)",
    pathogen: "Xanthomonas oryzae pv. oryzae (जीवाणु)",
    causes_hi: "तेज हवा, बारिश के छींटे और यूरिया की अधिक मात्रा इस जीवाणु को पौधे के घावों से अंदर प्रवेश करने में मदद करती है।",
    causes_en: "Strong winds, rain splashing, and excessive nitrogenous fertilization allow bacterial entry via leaf stomata/wounds.",
    prevention_hi: [
      "यूरिया का प्रयोग कम करें और पोटाश की अनुशंसित मात्रा बढ़ाएं",
      "संक्रमित खेत का पानी स्वस्थ खेतों में न जाने दें",
      "प्रतिरोधी किस्मों (जैसे Pusa Basmati 1718 आदि) का चुनाव करें"
    ],
    prevention_en: [
      "Split nitrogen doses and ensure adequate potassium nutrition",
      "Avoid drainage flow from diseased plots into healthy paddy fields",
      "Cultivate BLB-resistant improved varieties"
    ],
    curative_active_ingredients: [
      { ingredient: "Copper Oxychloride 50% WP + Streptocycline (90:10)", timing: "लक्षण दिखने पर (At leaf stripe onset)" },
      { ingredient: "Kasugamycin 3% SL", timing: "जीवाणु नियंत्रण हेतु (Antibiotic bactericide)" }
    ],
    escalation_triggers_hi: "यदि पत्तियों पर पीले-सफेद टेढ़े-मेढ़े किनारे तेजी से सूख रहे हों और 'क्रेसेक' (पौधों का सूखना) शुरू हो जाए तो कृषि वैज्ञानिक से संपर्क करें।",
    escalation_triggers_en: "If leaf margins display wavy straw-colored drying progressing to kresek wilt, contact KVK scientists."
  }
};

