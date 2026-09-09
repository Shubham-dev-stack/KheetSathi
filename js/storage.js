// KheetSathi Offline LocalStorage State Manager (SIH 2026 Production Edition)

class StorageManager {
  static SCANS_KEY = 'kheet_scans_v1';
  static LANG_KEY = 'kheet_lang_pref';
  static USER_KEY = 'kheet_user_profile';
  static MY_CROPS_KEY = 'kheet_my_crops_v1';

  static SAVED_PRODUCTS_KEY = 'kheet_saved_products_v1';
  static COMMUNITY_POSTS_KEY = 'kheet_community_posts_v1';
  static EXPERT_BOOKINGS_KEY = 'kheet_expert_bookings_v1';
  static WASTE_PLANS_KEY = 'kheet_waste_plans_v1';

  /**
   * Initializes local storage with seed data if empty or outdated
   */
  static init() {
    const existingScans = localStorage.getItem(this.SCANS_KEY);
    // If empty or if older seed data uses svg data uris, refresh with new photo assets
    if (!existingScans || existingScans.includes('data:image/svg+xml')) {
      localStorage.setItem(this.SCANS_KEY, JSON.stringify(DEFAULT_HISTORY));
    }
    if (!localStorage.getItem(this.LANG_KEY)) {
      localStorage.setItem(this.LANG_KEY, 'hi'); // Default to Hindi for rural accessibility
    }
    if (!localStorage.getItem(this.USER_KEY)) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(DEFAULT_USER));
    }
    if (!localStorage.getItem(this.MY_CROPS_KEY)) {
      localStorage.setItem(this.MY_CROPS_KEY, JSON.stringify(DEFAULT_MY_CROPS));
    }
    if (!localStorage.getItem(this.COMMUNITY_POSTS_KEY)) {
      localStorage.setItem(this.COMMUNITY_POSTS_KEY, JSON.stringify(MOCK_COMMUNITY_POSTS));
    }
    if (!localStorage.getItem(this.EXPERT_BOOKINGS_KEY)) {
      localStorage.setItem(this.EXPERT_BOOKINGS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.SAVED_PRODUCTS_KEY)) {
      localStorage.setItem(this.SAVED_PRODUCTS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.WASTE_PLANS_KEY)) {
      localStorage.setItem(this.WASTE_PLANS_KEY, JSON.stringify([]));
    }
  }

  /**
   * Product Comparison Bookmarks
   */
  static getSavedProducts() {
    try {
      const data = localStorage.getItem(this.SAVED_PRODUCTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  static toggleSavedProduct(productId) {
    try {
      const current = this.getSavedProducts();
      let updated;
      if (current.includes(productId)) {
        updated = current.filter(id => id !== productId);
      } else {
        updated = [...current, productId];
      }
      localStorage.setItem(this.SAVED_PRODUCTS_KEY, JSON.stringify(updated));
      return updated.includes(productId);
    } catch (e) {
      return false;
    }
  }

  /**
   * Community Q&A Store
   */
  static getCommunityPosts() {
    try {
      const data = localStorage.getItem(this.COMMUNITY_POSTS_KEY);
      return data ? JSON.parse(data) : MOCK_COMMUNITY_POSTS;
    } catch (e) {
      return MOCK_COMMUNITY_POSTS;
    }
  }

  static addCommunityPost(post) {
    try {
      const posts = this.getCommunityPosts();
      const newPost = {
        id: 'cp_' + Date.now(),
        farmer_name: post.farmer_name || 'किसान साथी',
        location: post.location || 'मध्य प्रदेश',
        crop_id: post.crop_id || 'general',
        crop_name_hi: post.crop_name_hi || 'फसल',
        title: post.title,
        description: post.description,
        attached_photo: post.attached_photo || null,
        created_at: new Date().toISOString(),
        upvotes: 0,
        answers: []
      };
      const updated = [newPost, ...posts];
      localStorage.setItem(this.COMMUNITY_POSTS_KEY, JSON.stringify(updated));
      return newPost;
    } catch (e) {
      console.error('Failed to add community post', e);
      return null;
    }
  }

  static addCommunityAnswer(postId, answerText, authorName) {
    try {
      const posts = this.getCommunityPosts();
      const post = posts.find(p => p.id === postId);
      if (post) {
        post.answers.push({
          id: 'ans_' + Date.now(),
          author: authorName || 'किसान भाई',
          role: 'किसान',
          text: answerText,
          helpful_count: 0,
          created_at: new Date().toISOString()
        });
        localStorage.setItem(this.COMMUNITY_POSTS_KEY, JSON.stringify(posts));
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  static voteHelpfulAnswer(postId, answerId) {
    try {
      const posts = this.getCommunityPosts();
      const post = posts.find(p => p.id === postId);
      if (post) {
        const ans = post.answers.find(a => a.id === answerId);
        if (ans) {
          ans.helpful_count = (ans.helpful_count || 0) + 1;
          localStorage.setItem(this.COMMUNITY_POSTS_KEY, JSON.stringify(posts));
          return ans.helpful_count;
        }
      }
      return 0;
    } catch (e) {
      return 0;
    }
  }

  /**
   * Expert Consultation Bookings
   */
  static getExpertBookings() {
    try {
      const data = localStorage.getItem(this.EXPERT_BOOKINGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  static bookExpertConsultation(bookingData) {
    try {
      const bookings = this.getExpertBookings();
      const newBooking = {
        id: 'bk_' + Date.now(),
        expert_id: bookingData.expert_id,
        expert_name: bookingData.expert_name,
        expert_role: bookingData.expert_role,
        crop_name: bookingData.crop_name || 'फसल',
        issue_summary: bookingData.issue_summary || '',
        consult_type: bookingData.consult_type || 'call', // call, video, visit
        fee: bookingData.fee || 0,
        preferred_time: bookingData.preferred_time || 'Next available',
        status: 'confirmed', // confirmed, completed, cancelled
        booked_at: new Date().toISOString()
      };
      const updated = [newBooking, ...bookings];
      localStorage.setItem(this.EXPERT_BOOKINGS_KEY, JSON.stringify(updated));
      return newBooking;
    } catch (e) {
      console.error('Failed to book expert consultation', e);
      return null;
    }
  }

  /**
   * Farm Waste Plans
   */
  static getWastePlans() {
    try {
      const data = localStorage.getItem(this.WASTE_PLANS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  static saveWastePlan(plan) {
    try {
      const plans = this.getWastePlans();
      const newPlan = {
        id: 'wp_' + Date.now(),
        crop_id: plan.crop_id,
        crop_name: plan.crop_name,
        acres: plan.acres,
        residue_type: plan.residue_type,
        estimated_tons: plan.estimated_tons,
        recommended_method: plan.recommended_method,
        potential_value_inr: plan.potential_value_inr,
        created_at: new Date().toISOString()
      };
      const updated = [newPlan, ...plans];
      localStorage.setItem(this.WASTE_PLANS_KEY, JSON.stringify(updated));
      return newPlan;
    } catch (e) {
      console.error('Failed to save waste plan', e);
      return null;
    }
  }

  /**
   * Unified Activity Stream
   */
  static getAllFarmerActivity() {
    const scans = this.getScans().map(s => ({
      type: 'scan',
      timestamp: s.scanned_at,
      title: `${s.crop_name_hi} - ${s.disease_name_hi}`,
      subtitle: `गंभीरता: ${s.severity_tier || 'मध्यम'} | शुद्धता: ${(s.confidence * 100).toFixed(0)}%`,
      icon: '🌿',
      data: s
    }));

    const bookings = this.getExpertBookings().map(b => ({
      type: 'expert',
      timestamp: b.booked_at,
      title: `विशेषज्ञ परामर्श: ${b.expert_name}`,
      subtitle: `${b.consult_type === 'call' ? 'फोन कॉल' : b.consult_type === 'video' ? 'वीडियो कॉल' : 'खेत विजिट'} (₹${b.fee})`,
      icon: '👨‍🔬',
      data: b
    }));

    const questions = this.getCommunityPosts().filter(p => p.id.startsWith('cp_')).map(q => ({
      type: 'community',
      timestamp: q.created_at,
      title: `सामुदायिक सवाल: ${q.title}`,
      subtitle: `${q.crop_name_hi} | ${q.answers ? q.answers.length : 0} उत्तर`,
      icon: '👥',
      data: q
    }));

    const wastePlans = this.getWastePlans().map(w => ({
      type: 'waste',
      timestamp: w.created_at,
      title: `अवशेष प्रबंधन योजना: ${w.crop_name}`,
      subtitle: `${w.acres} एकड़ (${w.estimated_tons} टन) $\\rightarrow$ ₹${w.potential_value_inr} अनुमानित मूल्य`,
      icon: '♻️',
      data: w
    }));

    const combined = [...scans, ...bookings, ...questions, ...wastePlans];
    return combined.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  /**
   * Retrieves all scan history records (sorted newest first)
   */
  static getScans() {
    try {
      const data = localStorage.getItem(this.SCANS_KEY);
      const scans = data ? JSON.parse(data) : [];
      return scans.sort((a, b) => new Date(b.scanned_at) - new Date(a.scanned_at));
    } catch (e) {
      console.error('Failed to parse scans from localStorage', e);
      return [];
    }
  }

  /**
   * Retrieves scans for a specific crop ID
   */
  static getScansForCrop(cropId) {
    const scans = this.getScans();
    if (!cropId || cropId === 'all') return scans;
    return scans.filter(s => s.crop_id === cropId);
  }

  /**
   * Saves a new scan to history (prepends to beginning)
   */
  static saveScan(scanRecord) {
    try {
      const scans = this.getScans();
      // Ensure unique ID
      const newScans = [scanRecord, ...scans.filter(s => s.id !== scanRecord.id)];
      // Keep up to 50 recent scans
      if (newScans.length > 50) newScans.pop();
      localStorage.setItem(this.SCANS_KEY, JSON.stringify(newScans));

      // Auto-add crop to My Crops if not already tracked
      if (scanRecord.crop_id) {
        this.addCrop(scanRecord.crop_id);
      }
      return true;
    } catch (e) {
      console.error('Failed to save scan to localStorage', e);
      return false;
    }
  }

  /**
   * Deletes a specific scan by ID
   */
  static deleteScan(scanId) {
    try {
      const scans = this.getScans();
      const filtered = scans.filter(s => s.id !== scanId);
      localStorage.setItem(this.SCANS_KEY, JSON.stringify(filtered));
      return true;
    } catch (e) {
      console.error('Failed to delete scan', e);
      return false;
    }
  }

  /**
   * Clears entire scan history
   */
  static clearScans() {
    localStorage.setItem(this.SCANS_KEY, JSON.stringify([]));
  }

  /**
   * My Crops Management
   */
  static getMyCropIds() {
    try {
      const data = localStorage.getItem(this.MY_CROPS_KEY);
      return data ? JSON.parse(data) : DEFAULT_MY_CROPS;
    } catch (e) {
      return DEFAULT_MY_CROPS;
    }
  }

  static getMyCropsSummary() {
    const cropIds = this.getMyCropIds();
    const allScans = this.getScans();

    return cropIds.map(cropId => {
      const cropMeta = MOCK_CROPS.find(c => c.crop_id === cropId) || {
        crop_id: cropId,
        name_en: cropId.charAt(0).toUpperCase() + cropId.slice(1),
        name_hi: cropId,
        image: CROP_IMAGES[cropId] || CROP_IMAGES.general,
        season: 'Year-round'
      };

      const cropScans = allScans.filter(s => s.crop_id === cropId);
      const latestScan = cropScans.length > 0 ? cropScans[0] : null;

      return {
        ...cropMeta,
        scanCount: cropScans.length,
        lastScannedAt: latestScan ? latestScan.scanned_at : null,
        latestDisease: latestScan ? latestScan.disease_name_hi : null,
        latestSeverity: latestScan ? latestScan.severity_tier : null
      };
    });
  }

  static addCrop(cropId) {
    try {
      const current = this.getMyCropIds();
      if (!current.includes(cropId)) {
        const updated = [...current, cropId];
        localStorage.setItem(this.MY_CROPS_KEY, JSON.stringify(updated));
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  static removeCrop(cropId) {
    try {
      const current = this.getMyCropIds();
      const updated = current.filter(id => id !== cropId);
      localStorage.setItem(this.MY_CROPS_KEY, JSON.stringify(updated));
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Language Preference
   */
  static getLang() {
    return localStorage.getItem(this.LANG_KEY) || 'hi';
  }

  static setLang(lang) {
    localStorage.setItem(this.LANG_KEY, lang);
  }

  /**
   * User Profile
   */
  static getUser() {
    try {
      const data = localStorage.getItem(this.USER_KEY);
      return data ? JSON.parse(data) : DEFAULT_USER;
    } catch (e) {
      return DEFAULT_USER;
    }
  }

  static saveUser(userObj) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(userObj));
  }
}
