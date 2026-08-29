// KheetSathi Offline LocalStorage State Manager (SIH 2026 Production Edition)

class StorageManager {
  static SCANS_KEY = 'kheet_scans_v1';
  static LANG_KEY = 'kheet_lang_pref';
  static USER_KEY = 'kheet_user_profile';
  static MY_CROPS_KEY = 'kheet_my_crops_v1';

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
