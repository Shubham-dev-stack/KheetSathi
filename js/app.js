// KheetSathi Master Application Controller (SIH 2026 Full MVP Edition)

class KheetSathiApp {
  constructor() {
    this.currentLang = StorageManager.getLang();
    this.selectedCrop = MOCK_CROPS[0]; // Default Potato
    this.overviewCropId = 'potato';
    this.currentImageDataUrl = null;
    this.currentQualityData = null;
    this.currentPresetId = null;
    this.currentScanResult = null;
    this.activeView = 'view-home';
    this.demoDrawerOpen = true;
    this.isSpeaking = false;
    this.currentHistoryFilter = 'all';

    this.init();
  }

  init() {
    StorageManager.init();
    this.setupStaticImages();
    this.setupServiceWorker();
    this.setupNetworkListeners();
    this.bindEvents();
    
    // Core Rendering
    this.renderCropGrid();
    this.renderMyCrops();
    this.renderPresets();
    this.renderDesktopPresets();
    this.renderRecentScans();
    this.renderHistoryFilters();
    this.applyLanguage(this.currentLang);
    
    console.log('[KheetSathi] SIH 2026 Full MVP Prototype initialized in mode:', this.currentLang);
  }

  setupStaticImages() {
    const heroBanner = document.getElementById('hero-banner-img');
    if (heroBanner) heroBanner.src = HERO_FARM_IMAGE;
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('[PWA] ServiceWorker registered:', reg.scope))
          .catch(err => console.log('[PWA] ServiceWorker note:', err));
      });
    }
  }

  setupNetworkListeners() {
    const banner = document.getElementById('offline-banner');
    const updateOnlineStatus = () => {
      if (navigator.onLine) {
        banner.classList.add('hidden');
      } else {
        banner.classList.remove('hidden');
      }
    };
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
  }

  // Toast Notification
  showToast(message) {
    const toast = document.getElementById('global-toast');
    const msgEl = document.getElementById('toast-message');
    if (toast && msgEl) {
      msgEl.textContent = message;
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 2500);
    }
  }

  // Navigation Router
  navigateTo(viewId, payload = null) {
    // Stop any ongoing speech
    if (this.isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.updateVoiceButtonState();
    }

    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    const targetView = document.getElementById(viewId);
    if (targetView) {
      targetView.classList.add('active');
      this.activeView = viewId;
      
      // Scroll internal main container to top smoothly
      const mainEl = document.querySelector('.main-content');
      if (mainEl) mainEl.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Bottom navigation highlights
    document.querySelectorAll('.bnav-btn').forEach(el => el.classList.remove('active'));
    if (viewId === 'view-home') document.getElementById('bnav-home')?.classList.add('active');
    if (viewId === 'view-crop-select' || viewId === 'view-upload' || viewId === 'view-preview' || viewId === 'view-result') {
      document.getElementById('bnav-scan')?.classList.add('active');
    }
    if (viewId === 'view-history') document.getElementById('bnav-history')?.classList.add('active');
    if (viewId === 'view-help') document.getElementById('bnav-help')?.classList.add('active');

    // Contextual view initializations
    if (viewId === 'view-home') {
      this.renderMyCrops();
      this.renderRecentScans();
    }
    if (viewId === 'view-my-crops') this.renderMyCropsFullGrid();
    if (viewId === 'view-crop-overview') this.renderCropOverview(payload || this.overviewCropId);
    if (viewId === 'view-crop-timeline') this.renderCropTimeline(payload || this.overviewCropId);
    if (viewId === 'view-compare-scans') this.renderCompareScans(payload || this.overviewCropId);
    if (viewId === 'view-history') this.renderFullHistory(this.currentHistoryFilter);
  }

  // Language & i18n
  applyLanguage(lang) {
    this.currentLang = lang;
    StorageManager.setLang(lang);
    const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.hi;

    // Update language switch label
    const langLabel = document.getElementById('lang-label');
    if (langLabel) {
      langLabel.textContent = lang === 'hi' ? 'English' : 'हिन्दी';
    }

    // Translate DOM elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Re-render dependent views
    this.renderCropGrid();
    this.renderMyCrops();
    this.renderPresets();
    this.renderDesktopPresets();
    this.renderRecentScans();
    this.renderHistoryFilters();
    if (this.activeView === 'view-my-crops') this.renderMyCropsFullGrid();
    if (this.activeView === 'view-crop-overview') this.renderCropOverview(this.overviewCropId);
    if (this.activeView === 'view-crop-timeline') this.renderCropTimeline(this.overviewCropId);
    if (this.activeView === 'view-compare-scans') this.renderCompareScans(this.overviewCropId);
    if (this.activeView === 'view-history') this.renderFullHistory(this.currentHistoryFilter);
    if (this.activeView === 'view-result' && this.currentScanResult) this.renderResultScreen(this.currentScanResult);
  }

  toggleLanguage() {
    const nextLang = this.currentLang === 'hi' ? 'en' : 'hi';
    this.applyLanguage(nextLang);
  }

  // =========================================================================
  // FEATURE C: My Crops Implementation
  // =========================================================================

  renderMyCrops() {
    const strip = document.getElementById('home-my-crops-strip');
    if (!strip) return;
    const myCrops = StorageManager.getMyCropsSummary();
    const isHi = this.currentLang === 'hi';

    if (myCrops.length === 0) {
      strip.innerHTML = `
        <div style="padding: 10px; color: var(--text-muted); font-size: 11.5px;">
          ${isHi ? 'अभी कोई फसल नहीं है।' : 'No crops tracked.'}
        </div>
      `;
      return;
    }

    strip.innerHTML = '';
    myCrops.forEach(crop => {
      const card = document.createElement('div');
      card.className = 'my-crop-card';
      const cropTitle = isHi ? crop.name_hi : crop.name_en;
      const countLabel = isHi ? `${crop.scanCount} जांच दर्ज` : `${crop.scanCount} ${crop.scanCount === 1 ? 'scan' : 'scans'}`;
      card.innerHTML = `
        <img src="${crop.image}" class="my-crop-card-img" alt="${crop.name_en}">
        <div class="my-crop-card-body">
          <div class="my-crop-card-title">${cropTitle}</div>
          <div class="my-crop-card-count">${countLabel}</div>
        </div>
      `;
      card.addEventListener('click', () => {
        this.overviewCropId = crop.crop_id;
        this.navigateTo('view-crop-overview', crop.crop_id);
      });
      strip.appendChild(card);
    });

    // Add Crop Card button in strip
    const addCard = document.createElement('div');
    addCard.className = 'my-crop-card';
    addCard.style.justifyContent = 'center';
    addCard.style.alignItems = 'center';
    addCard.style.background = 'var(--bg-subtle)';
    addCard.style.borderStyle = 'dashed';
    addCard.innerHTML = `
      <div style="text-align: center; padding: 12px 6px; color: var(--primary); font-size: 11px; font-weight: 700;">
        <div style="font-size: 16px; line-height: 1;">+</div>
        <div style="margin-top: 2px;">${isHi ? 'फसल जोड़ें' : 'Add Crop'}</div>
      </div>
    `;
    addCard.addEventListener('click', () => this.openAddCropModal());
    strip.appendChild(addCard);
  }

  renderMyCropsFullGrid() {
    const container = document.getElementById('my-crops-full-grid');
    if (!container) return;
    const myCrops = StorageManager.getMyCropsSummary();
    const isHi = this.currentLang === 'hi';

    container.innerHTML = '';
    myCrops.forEach(crop => {
      const card = document.createElement('div');
      card.className = 'crop-card';
      const cropTitle = isHi ? crop.name_hi : crop.name_en;
      const countLabel = isHi ? `${crop.scanCount} जांच दर्ज` : `${crop.scanCount} ${crop.scanCount === 1 ? 'check logged' : 'checks logged'}`;
      const latestDate = crop.lastScannedAt ? new Date(crop.lastScannedAt).toLocaleDateString(isHi ? 'hi-IN' : 'en-IN', { month: 'short', day: 'numeric' }) : 'None';

      card.innerHTML = `
        <img src="${crop.image}" class="crop-card-img" alt="${crop.name_en}">
        <div class="crop-card-text">
          <div class="crop-name-hi">${cropTitle}</div>
          <div class="crop-name-en">${countLabel}</div>
          <div style="font-size: 10px; color: var(--text-faint); margin-top: 2px;">${isHi ? 'अंतिम:' : 'Latest:'} ${latestDate}</div>
        </div>
      `;
      card.addEventListener('click', () => {
        this.overviewCropId = crop.crop_id;
        this.navigateTo('view-crop-overview', crop.crop_id);
      });
      container.appendChild(card);
    });
  }

  openAddCropModal() {
    const modal = document.getElementById('add-crop-modal');
    const container = document.getElementById('add-crop-options-grid');
    if (!modal || !container) return;

    const myCropIds = StorageManager.getMyCropIds();
    const availableCrops = MOCK_CROPS.filter(c => !myCropIds.includes(c.crop_id));
    const isHi = this.currentLang === 'hi';

    container.innerHTML = '';
    if (availableCrops.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 14px; color: var(--text-muted); font-size: 12px;">
          ${isHi ? 'सभी समर्थित फसलें पहले से जोड़ी जा चुकी हैं।' : 'All supported crops are already added.'}
        </div>
      `;
    } else {
      availableCrops.forEach(crop => {
        const card = document.createElement('div');
        card.className = 'crop-card';
        card.innerHTML = `
          <img src="${crop.image}" class="crop-card-img" alt="${crop.name_en}">
          <div class="crop-card-text">
            <div class="crop-name-hi">${isHi ? crop.name_hi : crop.name_en}</div>
            <div class="crop-name-en">${isHi ? crop.name_en : crop.name_hi}</div>
          </div>
        `;
        card.addEventListener('click', () => {
          StorageManager.addCrop(crop.crop_id);
          modal.classList.remove('active');
          this.renderMyCrops();
          if (this.activeView === 'view-my-crops') this.renderMyCropsFullGrid();
          this.showToast(isHi ? `${crop.name_hi} फसल सूची में जोड़ी गई!` : `${crop.name_en} added to your tracked crops!`);
        });
        container.appendChild(card);
      });
    }

    modal.classList.add('active');
  }

  renderCropOverview(cropId) {
    this.overviewCropId = cropId;
    const isHi = this.currentLang === 'hi';
    const matchedCrop = MOCK_CROPS.find(c => c.crop_id === cropId) || {
      crop_id: cropId,
      name_en: cropId.charAt(0).toUpperCase() + cropId.slice(1),
      name_hi: cropId,
      image: CROP_IMAGES[cropId] || CROP_IMAGES.general,
      season: 'Year-round'
    };

    const scans = StorageManager.getScansForCrop(cropId);
    const latestScan = scans.length > 0 ? scans[0] : null;

    // Set Hero
    document.getElementById('overview-crop-title').textContent = isHi ? `${matchedCrop.name_hi} (${matchedCrop.name_en})` : `${matchedCrop.name_en} (${matchedCrop.name_hi})`;
    document.getElementById('overview-crop-img').src = matchedCrop.image;
    document.getElementById('overview-crop-season').textContent = matchedCrop.season ? `${matchedCrop.season} Season` : 'Tracked Crop';

    const latestDiseaseEl = document.getElementById('overview-latest-disease');
    const latestSevEl = document.getElementById('overview-latest-severity');

    if (latestScan) {
      latestDiseaseEl.textContent = isHi ? latestScan.disease_name_hi : latestScan.disease_name_en;
      const isSevere = latestScan.severity_tier && latestScan.severity_tier.includes('Severe');
      const isMod = latestScan.severity_tier && latestScan.severity_tier.includes('Moderate');
      latestSevEl.className = `badge ${isSevere ? 'badge-danger' : (isMod ? 'badge-warning' : 'badge-success')}`;
      latestSevEl.textContent = isHi ? (isSevere ? 'गंभीर' : (isMod ? 'मध्यम' : 'स्वस्थ')) : latestScan.severity_tier;
      latestSevEl.style.display = 'inline-flex';
    } else {
      latestDiseaseEl.textContent = isHi ? 'कोई स्कैन दर्ज नहीं' : 'No scans logged';
      latestSevEl.style.display = 'none';
    }

    // Render Recent Scans for this Crop
    const container = document.getElementById('overview-crop-scans-list');
    if (container) {
      if (scans.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 16px; color: var(--text-muted); font-size: 12px;">
            ${isHi ? 'इस फसल की कोई जांच नहीं मिली। नई जांच शुरू करें।' : 'No scans recorded for this crop.'}
          </div>
        `;
      } else {
        container.innerHTML = '';
        scans.slice(0, 4).forEach(scan => {
          container.appendChild(this.createHistoryRow(scan));
        });
      }
    }
  }

  // =========================================================================
  // FEATURE A: Crop Health Timeline Implementation
  // =========================================================================

  renderCropTimeline(cropId) {
    this.overviewCropId = cropId;
    const isHi = this.currentLang === 'hi';
    const scans = StorageManager.getScansForCrop(cropId);
    const container = document.getElementById('timeline-events-list');
    const matchedCrop = MOCK_CROPS.find(c => c.crop_id === cropId) || { name_en: cropId, name_hi: cropId };

    document.getElementById('timeline-crop-header').textContent = isHi ? `${matchedCrop.name_hi} स्वास्थ्य टाइमलाइन` : `${matchedCrop.name_en} Health Timeline`;

    if (!container) return;

    if (scans.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 24px 14px; color: var(--text-muted); font-size: 12px;">
          ${isHi ? 'इस फसल के लिए अभी कोई टाइमलाइन डेटा उपलब्ध नहीं है।' : 'No timeline data logged for this crop yet.'}
        </div>
      `;
      document.getElementById('timeline-trend-badge').textContent = 'N/A';
      document.getElementById('timeline-trend-desc').textContent = isHi ? 'कम से कम एक स्कैन करें।' : 'Record a scan first.';
      return;
    }

    // Determine trend (Compare newest with oldest)
    const latest = scans[0];
    const oldest = scans[scans.length - 1];
    let isImproved = false;
    let isWorse = false;

    if (scans.length >= 2) {
      const getSeverityWeight = (s) => (s && s.includes('Severe')) ? 3 : ((s && s.includes('Moderate')) ? 2 : 1);
      const latestWeight = getSeverityWeight(latest.severity_tier);
      const oldestWeight = getSeverityWeight(oldest.severity_tier);
      isImproved = latestWeight < oldestWeight;
      isWorse = latestWeight > oldestWeight;
    }

    const trendBadge = document.getElementById('timeline-trend-badge');
    const trendDesc = document.getElementById('timeline-trend-desc');

    if (isImproved) {
      trendBadge.className = 'badge badge-success';
      trendBadge.textContent = isHi ? 'सुधार की ओर (Improving)' : 'Improving Trend';
      trendDesc.textContent = isHi ? 'हाल के स्कैन में गंभीरता स्तर में कमी दर्ज की गई है।' : 'Recent prototype scans show reduced severity level.';
    } else if (isWorse) {
      trendBadge.className = 'badge badge-danger';
      trendBadge.textContent = isHi ? 'ध्यान देने योग्य (Needs Attention)' : 'Needs Attention';
      trendDesc.textContent = isHi ? 'लक्षणों का फैलाव देखा गया है, कृषि परामर्श का पालन करें।' : 'Increased symptoms detected, follow agronomic recommendations.';
    } else {
      trendBadge.className = 'badge badge-warning';
      trendBadge.textContent = isHi ? 'स्थिर स्थिति (Stable)' : 'Stable Condition';
      trendDesc.textContent = isHi ? 'फसल की स्थिति पिछले स्कैन के समान बनी हुई है।' : 'Condition remains consistent across recorded scans.';
    }

    // Render Timeline Items
    container.innerHTML = '';
    scans.forEach((scan, idx) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';

      const isSevere = scan.severity_tier && scan.severity_tier.includes('Severe');
      const isMod = scan.severity_tier && scan.severity_tier.includes('Moderate');
      const nodeClass = isSevere ? 'attention' : (isMod ? '' : 'improved');
      const badgeClass = isSevere ? 'badge-danger' : (isMod ? 'badge-warning' : 'badge-success');

      const dateFormatted = new Date(scan.scanned_at).toLocaleDateString(isHi ? 'hi-IN' : 'en-IN', {
        month: 'short', day: 'numeric', year: 'numeric'
      });

      item.innerHTML = `
        <span class="timeline-node ${nodeClass}"></span>
        <div class="timeline-card">
          <img src="${scan.thumbnail}" class="timeline-thumb" alt="${scan.disease_name_en}">
          <div class="timeline-content">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <div class="timeline-date">${dateFormatted} ${idx === 0 ? (isHi ? '• नवीनतम' : '• Latest') : ''}</div>
              <span class="badge ${badgeClass}" style="font-size: 9px;">${scan.severity_tier || 'Checked'}</span>
            </div>
            <div class="timeline-disease">${isHi ? scan.disease_name_hi : scan.disease_name_en}</div>
            <div style="font-size: 10px; color: var(--text-muted);">${Math.round((scan.confidence_score || 0.85) * 100)}% Confidence Score</div>
          </div>
        </div>
      `;

      item.querySelector('.timeline-card').addEventListener('click', () => {
        const mappedDisease = MOCK_DISEASES[scan.disease_id] || MOCK_DISEASES["potato_late_blight"];
        const mappedRemedy = MOCK_RECOMMENDATIONS[scan.disease_id] || MOCK_RECOMMENDATIONS["potato_late_blight"];
        this.currentScanResult = {
          ...mappedDisease,
          ...mappedRemedy,
          crop_name_en: scan.crop_name_en,
          crop_name_hi: scan.crop_name_hi,
          confidence_score: scan.confidence_score,
          severity_tier: scan.severity_tier,
          scanned_at: scan.scanned_at,
          is_mock: true
        };
        this.currentImageDataUrl = scan.thumbnail;
        this.renderResultScreen(this.currentScanResult);
        this.navigateTo('view-result');
      });

      container.appendChild(item);
    });
  }

  // =========================================================================
  // FEATURE B: Compare Two Scans Implementation
  // =========================================================================

  renderCompareScans(cropId) {
    this.overviewCropId = cropId;
    const isHi = this.currentLang === 'hi';
    const scans = StorageManager.getScansForCrop(cropId);
    const selectEl = document.getElementById('compare-crop-select');

    // Populate Crop Selector
    if (selectEl) {
      const myCropIds = StorageManager.getMyCropIds();
      selectEl.innerHTML = myCropIds.map(id => {
        const c = MOCK_CROPS.find(crop => crop.crop_id === id) || { name_en: id, name_hi: id };
        return `<option value="${id}" ${id === cropId ? 'selected' : ''}>${isHi ? c.name_hi : c.name_en}</option>`;
      }).join('');

      selectEl.onchange = (e) => {
        this.renderCompareScans(e.target.value);
      };
    }

    const gridEl = document.getElementById('compare-grid-view');

    if (scans.length < 2) {
      if (gridEl) gridEl.style.display = 'none';
      document.getElementById('compare-trend-pill').textContent = 'N/A';
      document.getElementById('compare-trend-explanation').textContent = isHi ? 
        'तुलना करने के लिए इस फसल के कम से कम 2 स्कैन होना आवश्यक है। कृपया इस फसल की नई जांच करें।' :
        'At least 2 recorded scans are required to compare progress. Please perform another scan.';
      return;
    }

    if (gridEl) gridEl.style.display = 'grid';

    // Sort: Latest = index 0, Earlier = index 1 or oldest
    const latest = scans[0];
    const earlier = scans[scans.length - 1];

    // Populate Earlier
    document.getElementById('compare-earlier-img').src = earlier.thumbnail;
    document.getElementById('compare-earlier-date').textContent = new Date(earlier.scanned_at).toLocaleDateString(isHi ? 'hi-IN' : 'en-IN', { month: 'short', day: 'numeric' });
    document.getElementById('compare-earlier-disease').textContent = isHi ? earlier.disease_name_hi : earlier.disease_name_en;
    document.getElementById('compare-earlier-severity').textContent = isHi ? earlier.severity_tier : earlier.severity_tier;
    document.getElementById('compare-earlier-conf').textContent = `${Math.round(earlier.confidence_score * 100)}% Conf.`;

    // Populate Latest
    document.getElementById('compare-latest-img').src = latest.thumbnail;
    document.getElementById('compare-latest-date').textContent = new Date(latest.scanned_at).toLocaleDateString(isHi ? 'hi-IN' : 'en-IN', { month: 'short', day: 'numeric' });
    document.getElementById('compare-latest-disease').textContent = isHi ? latest.disease_name_hi : latest.disease_name_en;
    document.getElementById('compare-latest-severity').textContent = isHi ? latest.severity_tier : latest.severity_tier;
    document.getElementById('compare-latest-conf').textContent = `${Math.round(latest.confidence_score * 100)}% Conf.`;

    // Compute Trend Explanation
    const getSeverityWeight = (s) => (s && s.includes('Severe')) ? 3 : ((s && s.includes('Moderate')) ? 2 : 1);
    const latestWeight = getSeverityWeight(latest.severity_tier);
    const earlierWeight = getSeverityWeight(earlier.severity_tier);

    const trendPill = document.getElementById('compare-trend-pill');
    const trendExp = document.getElementById('compare-trend-explanation');

    if (latestWeight < earlierWeight) {
      trendPill.className = 'badge badge-success';
      trendPill.textContent = isHi ? 'सुधार की ओर (Improving)' : 'Improving';
      trendExp.textContent = isHi ? 
        `दर्ज रिकॉर्ड के अनुसार पत्ती पर रोग का स्तर ${earlier.severity_tier} से घटकर ${latest.severity_tier} दर्ज हुआ है।` :
        `Recorded prototype entries show severity reduced from ${earlier.severity_tier} to ${latest.severity_tier}.`;
    } else if (latestWeight > earlierWeight) {
      trendPill.className = 'badge badge-danger';
      trendPill.textContent = isHi ? 'ध्यान देने योग्य (Needs Attention)' : 'Needs Attention';
      trendExp.textContent = isHi ? 
        `पूर्व जांच की तुलना में रोग का फैलाव बढ़ा हुआ पाया गया है। तत्काल अनुशंसित रोकथाम उपायों का पालन करें।` :
        `Recorded prototype entries indicate elevated foliar symptoms. Follow recommended field remedies.`;
    } else {
      trendPill.className = 'badge badge-warning';
      trendPill.textContent = isHi ? 'स्थिर स्थिति (Stable)' : 'Stable';
      trendExp.textContent = isHi ? 
        `रोग की स्थिति दोनों जांचों में समान स्तर (${latest.severity_tier}) पर बनी हुई है।` :
        `Condition remains steady at ${latest.severity_tier} across comparison scans.`;
    }
  }

  // =========================================================================
  // FEATURE D: Voice Guidance (Accessible Text-to-Speech)
  // =========================================================================

  toggleVoiceReadout() {
    if (!('speechSynthesis' in window)) {
      alert(this.currentLang === 'hi' ? 'इस डिवाइस पर आवाज की सुविधा उपलब्ध नहीं है।' : 'Voice guidance is not supported on this browser.');
      return;
    }

    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.updateVoiceButtonState();
      return;
    }

    if (!this.currentScanResult) return;

    window.speechSynthesis.cancel();
    const isHi = this.currentLang === 'hi';
    const res = this.currentScanResult;
    const condName = isHi ? res.name_hi : res.name_en;
    const confPercent = Math.round((res.confidence_score || 0.85) * 100);
    const symptoms = isHi ? (res.observations ? res.observations.join('. ') : res.symptoms_hi) : res.symptoms_en;
    const firstRemedy = isHi ? (res.cultural_hi ? res.cultural_hi[0] : '') : (res.cultural_en ? res.cultural_en[0] : '');

    const textToSpeak = isHi ?
      `फसल जांच परिणाम। संभावित समस्या: ${condName}। विश्वास स्तर: ${confPercent} प्रतिशत। मुख्य लक्षण: ${symptoms}। तत्काल उपाय: ${firstRemedy}` :
      `Crop diagnostic report. Possible condition: ${condName}. Model confidence: ${confPercent} percent. Observed symptoms: ${symptoms}. Immediate action: ${firstRemedy}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = isHi ? 'hi-IN' : 'en-US';
    utterance.rate = 0.92;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.updateVoiceButtonState();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.updateVoiceButtonState();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.updateVoiceButtonState();
    };

    window.speechSynthesis.speak(utterance);
  }

  updateVoiceButtonState() {
    const btnText = document.getElementById('voice-btn-text');
    const isHi = this.currentLang === 'hi';
    if (btnText) {
      btnText.textContent = this.isSpeaking ? 
        (isHi ? 'आवाज रोकें' : 'Stop Voice') : 
        (isHi ? 'बोलकर सुनें' : 'Listen');
    }
  }

  // =========================================================================
  // FEATURE E: Share Diagnostic Report
  // =========================================================================

  async shareDiagnosticReport() {
    if (!this.currentScanResult) return;
    const isHi = this.currentLang === 'hi';
    const res = this.currentScanResult;
    const confPercent = Math.round((res.confidence_score || 0.85) * 100);

    const shareText = `🌿 KheetSathi (खेती साथी) Diagnostic Report
---------------------------------
🌾 Crop: ${isHi ? res.crop_name_hi : res.crop_name_en}
🔍 Condition: ${res.name_hi} / ${res.name_en} (${res.scientific_name || 'Foliar condition'})
📊 Confidence: ${confPercent}%
⚠️ Severity: ${res.severity_tier || 'Moderate'}

📋 Observed Symptoms:
${res.observations ? res.observations.map(o => `• ${o}`).join('\n') : `• ${res.symptoms_en}`}

✅ Next Action:
${res.cultural_en ? res.cultural_en.map(c => `• ${c}`).join('\n') : '• Maintain field hygiene'}

📞 Kisan Call Center: 1800-180-1551
*Prototype report — simulated AI output`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `KheetSathi Report: ${res.name_en}`,
          text: shareText
        });
        return;
      } catch (err) {
        console.log('[Share] Native share dismissed, using clipboard fallback');
      }
    }

    // Fallback: Copy to Clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(shareText);
      this.showToast(isHi ? 'जांच रिपोर्ट क्लिपबोर्ड पर कॉपी हो गई है!' : 'Diagnostic report copied to clipboard!');
    } else {
      prompt(isHi ? 'रिपोर्ट कॉपी करें:' : 'Copy report:', shareText);
    }
  }

  // =========================================================================
  // Crop Grid & Presets
  // =========================================================================

  renderCropGrid() {
    const container = document.getElementById('crop-grid-container');
    if (!container) return;
    container.innerHTML = '';

    MOCK_CROPS.forEach(crop => {
      const card = document.createElement('div');
      card.className = `crop-card ${this.selectedCrop.crop_id === crop.crop_id ? 'selected' : ''}`;
      card.innerHTML = `
        <img src="${crop.image}" class="crop-card-img" alt="${crop.name_en}">
        <div class="crop-card-text">
          <div class="crop-name-hi">${crop.name_hi}</div>
          <div class="crop-name-en">${crop.name_en}</div>
        </div>
      `;
      card.addEventListener('click', () => {
        document.querySelectorAll('.crop-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedCrop = crop;
        document.getElementById('btn-crop-next').removeAttribute('disabled');
      });
      container.appendChild(card);
    });

    // General / Other crop option
    const autoCard = document.createElement('div');
    autoCard.className = `crop-card ${this.selectedCrop.crop_id === 'general' ? 'selected' : ''}`;
    autoCard.innerHTML = `
      <img src="${CROP_IMAGES.general}" class="crop-card-img" alt="Other Crop">
      <div class="crop-card-text">
        <div class="crop-name-hi">अन्य फसल</div>
        <div class="crop-name-en">Other Crop</div>
      </div>
    `;
    autoCard.addEventListener('click', () => {
      document.querySelectorAll('.crop-card').forEach(c => c.classList.remove('selected'));
      autoCard.classList.add('selected');
      this.selectedCrop = { crop_id: 'general', name_en: 'General Crop', name_hi: 'अन्य फसल', image: CROP_IMAGES.general };
      document.getElementById('btn-crop-next').removeAttribute('disabled');
    });
    container.appendChild(autoCard);
  }

  renderPresets() {
    const uploadList = document.getElementById('upload-presets-list');
    if (!uploadList) return;
    uploadList.innerHTML = '';

    DEMO_PRESETS.forEach(preset => {
      const chip = document.createElement('div');
      chip.className = 'sample-chip';
      chip.innerHTML = `
        <img src="${preset.thumbnail}" width="20" height="20" style="border-radius: 3px; object-fit: cover;" alt="${preset.title_en}">
        <span>${this.currentLang === 'hi' ? preset.title_hi : preset.title_en}</span>
      `;
      chip.addEventListener('click', () => this.handlePresetSelect(preset));
      uploadList.appendChild(chip);
    });
  }

  renderDesktopPresets() {
    const container = document.getElementById('desktop-presets-container');
    if (!container) return;
    container.innerHTML = '';

    DEMO_PRESETS.forEach(preset => {
      const btn = document.createElement('button');
      btn.className = 'desktop-preset-btn';
      btn.innerHTML = `
        <img src="${preset.thumbnail}" width="26" height="26" style="border-radius: 4px; object-fit: cover;" alt="${preset.title_en}">
        <div>
          <div style="font-size: 11px; font-weight: 700; color: var(--text-title);">${this.currentLang === 'hi' ? preset.title_hi : preset.title_en}</div>
          <div style="font-size: 9.5px; color: var(--text-muted);">${preset.cropId.toUpperCase()} • Q: ${preset.qualityScore}%</div>
        </div>
      `;
      btn.addEventListener('click', () => {
        this.handlePresetSelect(preset);
      });
      container.appendChild(btn);
    });
  }

  // =========================================================================
  // Recent Scans & History Implementation
  // =========================================================================

  renderRecentScans() {
    const container = document.getElementById('home-recent-scans');
    if (!container) return;
    const scans = StorageManager.getScans().slice(0, 3);

    if (scans.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 14px; color: var(--text-muted); font-size: 11.5px;">
          ${this.currentLang === 'hi' ? 'अभी कोई हालिया स्कैन दर्ज नहीं है।' : 'No recent scans logged.'}
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    scans.forEach(scan => {
      container.appendChild(this.createHistoryRow(scan));
    });
  }

  renderHistoryFilters() {
    const container = document.getElementById('history-filter-tabs');
    if (!container) return;
    const isHi = this.currentLang === 'hi';
    const filters = [
      { id: 'all', label: isHi ? 'सभी' : 'All' },
      { id: 'potato', label: isHi ? 'आलू' : 'Potato' },
      { id: 'tomato', label: isHi ? 'टमाटर' : 'Tomato' },
      { id: 'rice', label: isHi ? 'धान' : 'Rice' }
    ];

    container.innerHTML = '';
    filters.forEach(f => {
      const chip = document.createElement('button');
      chip.className = `filter-chip ${this.currentHistoryFilter === f.id ? 'active' : ''}`;
      chip.textContent = f.label;
      chip.addEventListener('click', () => {
        this.currentHistoryFilter = f.id;
        this.renderHistoryFilters();
        this.renderFullHistory(f.id);
      });
      container.appendChild(chip);
    });
  }

  renderFullHistory(filterCropId = 'all') {
    const container = document.getElementById('history-items-container');
    if (!container) return;
    const scans = StorageManager.getScansForCrop(filterCropId);

    if (scans.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 24px 14px; color: var(--text-muted); font-size: 12px;">
          <p>${this.currentLang === 'hi' ? 'कोई सहेजा गया स्कैन नहीं मिला।' : 'No saved diagnostic scans found.'}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    scans.forEach(scan => {
      container.appendChild(this.createHistoryRow(scan));
    });
  }

  createHistoryRow(scan) {
    const row = document.createElement('div');
    row.className = 'history-row';
    const isHi = this.currentLang === 'hi';
    const diseaseTitle = isHi ? scan.disease_name_hi : scan.disease_name_en;
    const cropName = isHi ? scan.crop_name_hi : scan.crop_name_en;
    const dateStr = new Date(scan.scanned_at).toLocaleDateString(isHi ? 'hi-IN' : 'en-IN', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const isSevere = scan.severity_tier && scan.severity_tier.includes('Severe');
    const isMod = scan.severity_tier && scan.severity_tier.includes('Moderate');
    const badgeClass = isSevere ? 'badge-danger' : (isMod ? 'badge-warning' : 'badge-success');

    row.innerHTML = `
      <img src="${scan.thumbnail}" class="history-thumb" alt="${cropName}">
      <div class="history-details">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div class="history-crop-tag">${cropName}</div>
          <span class="badge ${badgeClass}" style="font-size: 9px;">${scan.severity_tier || 'Checked'}</span>
        </div>
        <div class="history-disease-title">${diseaseTitle}</div>
        <div class="history-date">${dateStr} • ${Math.round((scan.confidence_score || 0.85) * 100)}% Conf.</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" stroke-width="2" style="flex-shrink: 0;"><polyline points="9 18 15 12 9 6"/></svg>
    `;

    row.addEventListener('click', () => {
      const mappedDisease = MOCK_DISEASES[scan.disease_id] || MOCK_DISEASES["potato_late_blight"];
      const mappedRemedy = MOCK_RECOMMENDATIONS[scan.disease_id] || MOCK_RECOMMENDATIONS["potato_late_blight"];
      this.currentScanResult = {
        ...mappedDisease,
        ...mappedRemedy,
        crop_name_en: scan.crop_name_en,
        crop_name_hi: scan.crop_name_hi,
        confidence_score: scan.confidence_score,
        severity_tier: scan.severity_tier,
        scanned_at: scan.scanned_at,
        is_mock: true
      };
      this.currentImageDataUrl = scan.thumbnail;
      this.renderResultScreen(this.currentScanResult);
      this.navigateTo('view-result');
    });

    return row;
  }

  // =========================================================================
  // Ingestion & Quality Pre-Check
  // =========================================================================

  handlePresetSelect(preset) {
    this.currentPresetId = preset.id;
    this.currentImageDataUrl = preset.thumbnail;
    
    const matchedCrop = MOCK_CROPS.find(c => c.crop_id === preset.cropId);
    if (matchedCrop) {
      this.selectedCrop = matchedCrop;
      const cropBadge = document.getElementById('active-crop-badge');
      if (cropBadge) cropBadge.textContent = this.currentLang === 'hi' ? matchedCrop.name_hi : matchedCrop.name_en;
    }

    this.processImageForPreview(preset.thumbnail, preset);
  }

  handleFileSelection(file) {
    if (!file) return;
    this.currentPresetId = null;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.currentImageDataUrl = e.target.result;
      this.processImageForPreview(e.target.result, null);
    };
    reader.readAsDataURL(file);
  }

  processImageForPreview(dataUrl, presetData) {
    const previewImg = document.getElementById('preview-image-element');
    const analyzingImg = document.getElementById('analyzing-image-element');
    previewImg.src = dataUrl;
    analyzingImg.src = dataUrl;

    previewImg.onload = async () => {
      let qualityResult;
      if (presetData && presetData.isBlurry) {
        qualityResult = {
          qualityScore: 38,
          meanLuminance: 32,
          blurVariance: 42,
          isDark: true,
          isBlurry: true,
          isOverexposed: false,
          status: 'warning',
          message_en: '! Photo is slightly blurry / dark',
          message_hi: '! फोटो थोड़ी धुंधली व कम रोशनी में है'
        };
      } else {
        qualityResult = await ImageQualityChecker.analyze(previewImg);
      }

      this.currentQualityData = qualityResult;
      this.updateQualityUI(qualityResult);
      this.navigateTo('view-preview');
    };
  }

  updateQualityUI(quality) {
    const verdictCard = document.getElementById('quality-verdict-card');
    const verdictIcon = document.getElementById('quality-verdict-icon');
    const verdictText = document.getElementById('quality-verdict-text');
    const scorePill = document.getElementById('quality-score-pill');

    const isGood = quality.qualityScore >= 65;
    verdictCard.className = `quality-verdict-bar ${isGood ? 'good' : 'warning'}`;
    verdictIcon.textContent = isGood ? '✓' : '!';
    scorePill.className = `badge ${isGood ? 'badge-success' : 'badge-warning'}`;
    scorePill.textContent = `${quality.qualityScore}/100`;

    if (isGood) {
      verdictText.textContent = this.currentLang === 'hi' ? '✓ फोटो साफ और अच्छी रोशनी में है' : '✓ Photo is clear and well-exposed';
    } else {
      verdictText.textContent = this.currentLang === 'hi' ? '! फोटो थोड़ी धुंधली या कम रोशनी में है' : '! Photo is slightly blurry / low exposure';
    }
  }

  // =========================================================================
  // Inference & Diagnostic Result Execution
  // =========================================================================

  async startAnalysis() {
    this.navigateTo('view-analyzing');

    const stepText = document.getElementById('analyzing-step-text');
    const isHi = this.currentLang === 'hi';
    
    stepText.textContent = isHi ? 'फोटो देख रहे हैं और धब्बों की पहचान कर रहे हैं...' : 'Examining leaf photo and lesion textures...';
    
    setTimeout(() => {
      stepText.textContent = isHi ? 'पत्ती के लक्षण जांच रहे हैं...' : 'Matching foliar symptom signatures...';
    }, 400);

    setTimeout(() => {
      stepText.textContent = isHi ? 'ऑन-डिवाइस AI मॉडल से विश्लेषण जारी है...' : 'Running on-device neural network inference...';
    }, 800);

    try {
      // 1. Run REAL on-device ML model diagnosis
      const imageSource = this.currentImageDataUrl || (DEMO_PRESETS && DEMO_PRESETS[0] ? DEMO_PRESETS[0].thumbnail : './assets/images/sample_potato_blight.jpg');

      const result = await MLEngine.runDiagnosis({
        imageSource: imageSource,
        selectedCrop: this.selectedCrop,
        qualityData: this.currentQualityData,
        presetId: this.currentPresetId
      });

      if (result.status === 'uncertain') {
        const reasonEl = document.getElementById('fallback-reason-text');
        if (reasonEl) reasonEl.textContent = isHi ? result.message_hi : result.message_en;
        this.navigateTo('view-fallback');
      } else {
        this.currentScanResult = result;
        this.renderResultScreen(result);
        this.navigateTo('view-result');
      }
    } catch (err) {
      console.error('[KheetSathi] Real ML Engine diagnosis error:', err);
      const reasonEl = document.getElementById('fallback-reason-text');
      if (reasonEl) {
        reasonEl.textContent = isHi ?
          'मॉडल विश्लेषण में तकनीकी समस्या आई। कृपया दोबारा प्रयास करें।' :
          'An issue occurred during on-device model inference. Please try again.';
      }
      this.navigateTo('view-fallback');
    }
  }

  renderResultScreen(result) {
    const isHi = this.currentLang === 'hi';
    
    // Set Scanned Leaf Hero Image
    const leafImg = document.getElementById('result-leaf-img');
    if (leafImg) leafImg.src = this.currentImageDataUrl || DEMO_PRESETS[0].thumbnail;

    // Header
    document.getElementById('result-crop-name').textContent = isHi ? result.crop_name_hi : result.crop_name_en;
    document.getElementById('result-disease-hi').textContent = result.name_hi;
    document.getElementById('result-disease-en').textContent = result.name_en;
    document.getElementById('result-scientific-name').textContent = result.scientific_name;

    // Confidence
    const confPercent = Math.round(result.confidence_score * 100);
    document.getElementById('result-confidence-text').textContent = `${confPercent}%`;
    document.getElementById('result-confidence-fill').style.width = `${confPercent}%`;

    // Severity Tag
    const severityBadge = document.getElementById('result-severity-badge');
    const isSevere = result.severity_tier && result.severity_tier.includes('Severe');
    const isMod = result.severity_tier && result.severity_tier.includes('Moderate');
    const isMild = result.severity_tier && result.severity_tier.includes('Mild');
    
    severityBadge.className = `badge ${isSevere ? 'badge-danger' : (isMod ? 'badge-warning' : (isMild ? 'badge-warning' : 'badge-success'))}`;
    severityBadge.textContent = isHi ? 
      (isSevere ? 'गंभीर संक्रमण (Severe)' : (isMod ? 'मध्यम संक्रमण (Moderate)' : (isMild ? 'हल्का संक्रमण (Mild)' : 'स्वस्थ पौधा (Healthy)'))) :
      result.severity_tier;

    // Observations (3 Concise Bullet Points)
    const obsList = document.getElementById('result-observations-list');
    if (obsList) {
      const observations = result.observations || (isHi ? [result.symptoms_hi] : [result.symptoms_en]);
      obsList.innerHTML = observations.map(obs => `<li>${obs}</li>`).join('');
    }

    // 3-Step Action Plan
    const culturalList = document.getElementById('remedy-cultural-list');
    const bioList = document.getElementById('remedy-bio-list');
    const chemList = document.getElementById('remedy-chem-list');

    culturalList.innerHTML = (isHi ? result.cultural_hi : result.cultural_en).map(item => `<li>${item}</li>`).join('');
    bioList.innerHTML = (isHi ? result.biological_hi : result.biological_en).map(item => `<li>${item}</li>`).join('');
    chemList.innerHTML = (isHi ? result.chemical_hi : result.chemical_en).map(item => `<li>${item}</li>`).join('');

    // Reset save button label
    const saveBtnText = document.getElementById('save-btn-text');
    if (saveBtnText) {
      saveBtnText.textContent = isHi ? 'स्कैन इतिहास में सहेजें' : 'Save Scan';
    }

    // Reset voice button state
    this.isSpeaking = false;
    this.updateVoiceButtonState();
  }

  saveCurrentScan() {
    if (!this.currentScanResult) return;
    
    const scanRecord = {
      id: `scan_${Date.now()}`,
      crop_id: this.currentScanResult.crop_id,
      crop_name_en: this.currentScanResult.crop_name_en,
      crop_name_hi: this.currentScanResult.crop_name_hi,
      disease_id: this.currentScanResult.disease_id,
      disease_name_en: this.currentScanResult.name_en,
      disease_name_hi: this.currentScanResult.name_hi,
      confidence_score: this.currentScanResult.confidence_score,
      severity_tier: this.currentScanResult.severity_tier,
      scanned_at: new Date().toISOString(),
      quality_score: this.currentQualityData?.qualityScore || 90,
      is_mock: this.currentScanResult.is_mock !== undefined ? this.currentScanResult.is_mock : false,
      thumbnail: this.currentImageDataUrl || DEMO_PRESETS[0].thumbnail
    };

    StorageManager.saveScan(scanRecord);
    this.renderMyCrops();
    this.renderRecentScans();
    
    const saveBtnText = document.getElementById('save-btn-text');
    if (saveBtnText) {
      saveBtnText.textContent = this.currentLang === 'hi' ? '✓ सहेजा गया (Saved)' : '✓ Saved to History';
    }
    this.showToast(this.currentLang === 'hi' ? 'सहेजा गया: स्कैन इतिहास एवं टाइमलाइन में जोड़ा गया।' : 'Saved: Scan added to your history and crop timeline.');
  }

  // =========================================================================
  // Event Listeners Binding
  // =========================================================================

  bindEvents() {
    // Top Nav
    document.getElementById('nav-brand-btn')?.addEventListener('click', (e) => { e.preventDefault(); this.navigateTo('view-home'); });
    document.getElementById('lang-toggle-btn')?.addEventListener('click', () => this.toggleLanguage());
    document.getElementById('btn-help-nav')?.addEventListener('click', () => this.navigateTo('view-help'));
    document.getElementById('btn-profile-nav')?.addEventListener('click', () => {
      const scans = StorageManager.getScans();
      document.getElementById('profile-total-scans').textContent = scans.length;
      document.getElementById('profile-modal').classList.add('active');
    });
    document.getElementById('btn-close-profile')?.addEventListener('click', () => {
      document.getElementById('profile-modal').classList.remove('active');
    });

    // Add Crop Modal
    document.getElementById('btn-open-add-crop')?.addEventListener('click', () => this.openAddCropModal());
    document.getElementById('btn-close-add-crop')?.addEventListener('click', () => {
      document.getElementById('add-crop-modal').classList.remove('active');
    });

    // Bottom Nav
    document.getElementById('bnav-home')?.addEventListener('click', (e) => { e.preventDefault(); this.navigateTo('view-home'); });
    document.getElementById('bnav-scan')?.addEventListener('click', (e) => { e.preventDefault(); this.navigateTo('view-crop-select'); });
    document.getElementById('bnav-history')?.addEventListener('click', (e) => { e.preventDefault(); this.navigateTo('view-history'); });
    document.getElementById('bnav-help')?.addEventListener('click', (e) => { e.preventDefault(); this.navigateTo('view-help'); });

    // Home Actions
    document.getElementById('btn-hero-scan')?.addEventListener('click', () => this.navigateTo('view-crop-select'));
    document.getElementById('link-view-all-crops')?.addEventListener('click', (e) => { e.preventDefault(); this.navigateTo('view-my-crops'); });
    document.getElementById('link-view-all-history')?.addEventListener('click', (e) => { e.preventDefault(); this.navigateTo('view-history'); });

    // Back Buttons Across All Sub-screens
    document.getElementById('btn-back-from-my-crops')?.addEventListener('click', () => this.navigateTo('view-home'));
    document.getElementById('btn-back-from-crop-select')?.addEventListener('click', () => this.navigateTo('view-home'));
    document.getElementById('btn-back-from-upload')?.addEventListener('click', () => this.navigateTo('view-crop-select'));
    document.getElementById('btn-back-from-preview')?.addEventListener('click', () => this.navigateTo('view-upload'));
    document.getElementById('btn-back-from-crop-overview')?.addEventListener('click', () => this.navigateTo('view-home'));
    document.getElementById('btn-back-from-timeline')?.addEventListener('click', () => this.navigateTo('view-crop-overview', this.overviewCropId));
    document.getElementById('btn-back-from-compare')?.addEventListener('click', () => this.navigateTo('view-crop-overview', this.overviewCropId));
    document.getElementById('btn-back-from-result')?.addEventListener('click', () => this.navigateTo('view-home'));

    // Crop Overview Actions
    document.getElementById('btn-overview-scan-again')?.addEventListener('click', () => {
      const matchedCrop = MOCK_CROPS.find(c => c.crop_id === this.overviewCropId);
      if (matchedCrop) this.selectedCrop = matchedCrop;
      const cropBadge = document.getElementById('active-crop-badge');
      if (cropBadge) cropBadge.textContent = this.currentLang === 'hi' ? this.selectedCrop.name_hi : this.selectedCrop.name_en;
      this.navigateTo('view-upload');
    });
    document.getElementById('btn-overview-view-timeline')?.addEventListener('click', () => this.navigateTo('view-crop-timeline', this.overviewCropId));
    document.getElementById('btn-overview-compare-scans')?.addEventListener('click', () => this.navigateTo('view-compare-scans', this.overviewCropId));

    // Timeline Actions
    document.getElementById('btn-timeline-compare-trigger')?.addEventListener('click', () => this.navigateTo('view-compare-scans', this.overviewCropId));
    document.getElementById('btn-timeline-scan-trigger')?.addEventListener('click', () => {
      const matchedCrop = MOCK_CROPS.find(c => c.crop_id === this.overviewCropId);
      if (matchedCrop) this.selectedCrop = matchedCrop;
      this.navigateTo('view-upload');
    });

    // Compare Actions
    document.getElementById('btn-compare-scan-action')?.addEventListener('click', () => this.navigateTo('view-crop-select'));

    // Crop Selection Next
    document.getElementById('btn-crop-next')?.addEventListener('click', () => {
      const badge = document.getElementById('active-crop-badge');
      if (badge) badge.textContent = this.currentLang === 'hi' ? this.selectedCrop.name_hi : this.selectedCrop.name_en;
      this.navigateTo('view-upload');
    });

    // Ingestion Triggers
    const cameraInput = document.getElementById('file-input-camera');
    const galleryInput = document.getElementById('file-input-gallery');

    document.getElementById('btn-trigger-camera')?.addEventListener('click', () => cameraInput?.click());
    document.getElementById('btn-trigger-gallery')?.addEventListener('click', () => galleryInput?.click());

    cameraInput?.addEventListener('change', (e) => this.handleFileSelection(e.target.files[0]));
    galleryInput?.addEventListener('change', (e) => this.handleFileSelection(e.target.files[0]));

    // Drag & Drop
    const dropzone = document.getElementById('upload-dropzone');
    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.style.background = '#223020'; });
      dropzone.addEventListener('dragleave', () => { dropzone.style.background = '#141C13'; });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.background = '#141C13';
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.handleFileSelection(e.dataTransfer.files[0]);
        }
      });
    }

    // Demo Drawer Toggle
    const demoToggle = document.getElementById('btn-toggle-demo-drawer');
    const demoList = document.getElementById('upload-presets-list');
    const demoArrow = document.getElementById('demo-drawer-arrow');
    if (demoToggle && demoList) {
      demoToggle.addEventListener('click', () => {
        this.demoDrawerOpen = !this.demoDrawerOpen;
        if (this.demoDrawerOpen) {
          demoList.style.display = 'flex';
          demoArrow.textContent = '▾';
        } else {
          demoList.style.display = 'none';
          demoArrow.textContent = '▸';
        }
      });
    }

    // Preview Actions
    document.getElementById('btn-preview-retake')?.addEventListener('click', () => this.navigateTo('view-upload'));
    document.getElementById('btn-preview-analyze')?.addEventListener('click', () => this.startAnalysis());

    // Result Actions (Voice, Share, Save, New Scan)
    document.getElementById('btn-voice-readout')?.addEventListener('click', () => this.toggleVoiceReadout());
    document.getElementById('btn-share-report')?.addEventListener('click', () => this.shareDiagnosticReport());
    document.getElementById('btn-save-scan-action')?.addEventListener('click', () => this.saveCurrentScan());
    document.getElementById('btn-result-new-scan')?.addEventListener('click', () => this.navigateTo('view-crop-select'));

    // Fallback Retry
    document.getElementById('btn-fallback-retry')?.addEventListener('click', () => this.navigateTo('view-upload'));

    // Clear History
    document.getElementById('btn-clear-history-action')?.addEventListener('click', () => {
      if (confirm(this.currentLang === 'hi' ? 'क्या आप पूरा स्कैन इतिहास मिटाना चाहते हैं?' : 'Clear all scan history logs?')) {
        StorageManager.clearScans();
        this.renderFullHistory(this.currentHistoryFilter);
        this.renderRecentScans();
        this.renderMyCrops();
      }
    });

    // Help Start
    document.getElementById('btn-help-start-scan')?.addEventListener('click', () => this.navigateTo('view-crop-select'));
  }
}

// Global App Initialization
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new KheetSathiApp();
});
