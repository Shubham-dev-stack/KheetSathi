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
      "Apply protective contact fungicides (Mancozeb group) as per extension recommendations."
    ],
    chemical_hi: [
      "कृषि विश्वविद्यालय द्वारा अनुशंसित संपर्क कवकनाशी (मैनकोजेब समूह) का सुरक्षात्मक छिड़काव करें।"
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
      "Foliar spray of protective fungicides (Chlorothalonil group) under expert guidance."
    ],
    chemical_hi: [
      "कृषि विशेषज्ञ की सलाह से क्लोरोथैलोनिल समूह के कवकनाशी का प्रयोग करें।"
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
      "No chemical fungicides required for healthy crops."
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
      "Vector control: Approved systemic insecticides under official KVK advice."
    ],
    chemical_hi: [
      "सफेद मक्खी नियंत्रण: स्थानीय कृषि विज्ञान केंद्र (KVK) द्वारा अनुशंसित कीटनाशक का प्रयोग करें।"
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
      "Apply copper-based bactericides as recommended by State Agricultural University."
    ],
    chemical_hi: [
      "राज्य कृषि विश्वविद्यालय द्वारा अनुशंसित कॉपर आधारित जीवाणुनाशी का छिड़काव करें।"
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
  crops_cultivated: ["potato", "tomato", "rice"]
};
