// KheetSathi Deterministic Simulated AI Diagnostic Pipeline
// Produces transparent, stable mock inference results matching botanical fixtures

class SimulationAIEngine {
  /**
   * Simulates deep learning inference on crop leaf image
   * @param {Object} params - { cropId, qualityData, presetId }
   * @returns {Promise<Object>} Diagnostic Result Object
   */
  static async runInference({ cropId, qualityData, presetId }) {
    // Artificial latency (1200ms) to simulate realistic model execution
    await new Promise(resolve => setTimeout(resolve, 1200));

    // 1. Check for explicit Non-Leaf or Blurry preset samples
    if (presetId === "preset_non_leaf") {
      return {
        status: "uncertain",
        isUncertain: true,
        reason: "non_leaf",
        confidence_score: 0.32,
        message_en: "No plant leaf detected. Please take a close-up photo of an affected plant leaf.",
        message_hi: "पत्ती की पहचान नहीं हो सकी। कृपया केवल पौधे की प्रभावित पत्ती की स्पष्ट फोटो लें।"
      };
    }

    if (presetId === "preset_blurry_sample" || (qualityData && qualityData.qualityScore < 45)) {
      return {
        status: "uncertain",
        isUncertain: true,
        reason: "poor_quality",
        confidence_score: 0.44,
        message_en: "Diagnostic uncertain due to severe blur or low illumination. Please retake photo in steady daylight.",
        message_hi: "धुंधलेपन या कम रोशनी के कारण AI परिणाम अनिश्चित है। कृपया अच्छी रोशनी में दोबारा फोटो लें।"
      };
    }

    // 2. Map known presets to exact deterministic diseases
    let diseaseKey = "potato_late_blight";
    if (presetId && DEMO_PRESETS.find(p => p.id === presetId)) {
      const preset = DEMO_PRESETS.find(p => p.id === presetId);
      diseaseKey = preset.expectedResult;
    } else {
      // Fallback mapping based on crop selection
      switch (cropId) {
        case "potato":
          diseaseKey = "potato_late_blight";
          break;
        case "tomato":
          diseaseKey = "tomato_leaf_curl";
          break;
        case "rice":
          diseaseKey = "rice_bacterial_blight";
          break;
        case "wheat":
          diseaseKey = "potato_late_blight"; // Representative mock
          break;
        case "cotton":
          diseaseKey = "potato_late_blight"; // Representative mock
          break;
        default:
          diseaseKey = "potato_late_blight";
      }
    }

    const diseaseData = MOCK_DISEASES[diseaseKey] || MOCK_DISEASES["potato_late_blight"];
    const remedyData = MOCK_RECOMMENDATIONS[diseaseKey] || MOCK_RECOMMENDATIONS["potato_late_blight"];
    const cropMeta = MOCK_CROPS.find(c => c.crop_id === diseaseData.crop_id) || MOCK_CROPS[0];

    return {
      status: "success",
      isUncertain: false,
      disease_id: diseaseData.disease_id,
      scientific_name: diseaseData.scientific_name,
      name_en: diseaseData.name_en,
      name_hi: diseaseData.name_hi,
      crop_id: cropMeta.crop_id,
      crop_name_en: cropMeta.name_en,
      crop_name_hi: cropMeta.name_hi,
      confidence_score: diseaseData.confidence_score,
      severity_tier: diseaseData.severity_tier,
      symptoms_en: diseaseData.symptoms_en,
      symptoms_hi: diseaseData.symptoms_hi,
      cultural_en: remedyData.cultural_en,
      cultural_hi: remedyData.cultural_hi,
      biological_en: remedyData.biological_en,
      biological_hi: remedyData.biological_hi,
      chemical_en: remedyData.chemical_en,
      chemical_hi: remedyData.chemical_hi,
      is_mock: true,
      scanned_at: new Date().toISOString()
    };
  }
}
