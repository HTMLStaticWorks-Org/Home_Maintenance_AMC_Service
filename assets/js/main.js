/**
 * VESTACARE HOME AMC — PREMIUM WEBSITE TEMPLATE
 * Main Interactive Functionality (Theme, RTL, Navigation, Tabs, Pricing, Forms, Dashboard)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. THEME TOGGLE (LIGHT / DARK MODE) & RTL TOGGLE
     ========================================================================== */
  const THEME_STORAGE_KEY = 'vestacare_theme';
  const DIR_STORAGE_KEY = 'vestacare_dir';

  function getCurrentTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach((btn) => {
      const isDark = theme === 'dark';
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light theme' : 'Switch to dark theme'
      );
      btn.setAttribute(
        'title',
        isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );
    });
  }

  function getCurrentDir() {
    const saved = localStorage.getItem(DIR_STORAGE_KEY);
    if (saved === 'rtl' || saved === 'ltr') {
      return saved;
    }
    return 'ltr';
  }

  function applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_STORAGE_KEY, dir);

    const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
    rtlButtons.forEach((btn) => {
      const isRtl = dir === 'rtl';
      btn.textContent = 'RTL';
      btn.setAttribute('aria-pressed', isRtl ? 'true' : 'false');
      btn.setAttribute('aria-label', 'Toggle RTL layout');
      btn.setAttribute('title', isRtl ? 'Switch to LTR' : 'Switch to RTL');
    });
  }

  function initThemeAndDir() {
    applyTheme(getCurrentTheme());
    applyDir(getCurrentDir());

    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextTheme =
          document.documentElement.getAttribute('data-theme') === 'dark'
            ? 'light'
            : 'dark';
        applyTheme(nextTheme);
      });
    });

    document.querySelectorAll('.rtl-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextDir =
          document.documentElement.getAttribute('dir') === 'rtl'
            ? 'ltr'
            : 'rtl';
        applyDir(nextDir);
      });
    });
  }

  /* ==========================================================================
     2. STICKY NAVBAR, DESKTOP DROPDOWN & MOBILE HAMBURGER MENU
     ========================================================================== */
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileDropdownBtn = document.getElementById('mobile-home-dropdown-btn');
    const mobileSubmenu = document.getElementById('mobile-home-submenu');
    const desktopDropdownItem = document.querySelector('.nav-item.has-dropdown');
    const desktopDropdownToggle = document.querySelector('.dropdown-toggle-btn');

    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 12) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    if (desktopDropdownItem && desktopDropdownToggle) {
      desktopDropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = desktopDropdownItem.classList.toggle('dropdown-open');
        desktopDropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', (e) => {
        if (!desktopDropdownItem.contains(e.target)) {
          desktopDropdownItem.classList.remove('dropdown-open');
          desktopDropdownToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    if (hamburgerBtn && mobileDrawer) {
      hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileDrawer.classList.toggle('open');
        hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', (e) => {
        if (
          mobileDrawer.classList.contains('open') &&
          !mobileDrawer.contains(e.target) &&
          !hamburgerBtn.contains(e.target)
        ) {
          mobileDrawer.classList.remove('open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 1120 && mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.remove('open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    if (mobileDropdownBtn && mobileSubmenu) {
      mobileDropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = mobileSubmenu.classList.toggle('open');
        mobileDropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        const chevron = mobileDropdownBtn.querySelector('.dropdown-chevron');
        if (chevron) {
          chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (desktopDropdownItem) {
          desktopDropdownItem.classList.remove('dropdown-open');
          if (desktopDropdownToggle) {
            desktopDropdownToggle.setAttribute('aria-expanded', 'false');
          }
        }
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.remove('open');
          if (hamburgerBtn) {
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            hamburgerBtn.focus();
          }
        }
      }
    });
  }

  /* ==========================================================================
     3. FAQ ACCORDIONS
     ========================================================================== */
  function initAccordions() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const container = item.closest('.faq-container');
        const isOpen = item.classList.contains('active');

        if (container) {
          container.querySelectorAll('.faq-item').forEach((sibling) => {
            sibling.classList.remove('active');
            const q = sibling.querySelector('.faq-question');
            if (q) q.setAttribute('aria-expanded', 'false');
          });
        }

        if (!isOpen) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ==========================================================================
     4. INTERACTIVE TABS (HOME 2 SERVICE EXPLORER & SERVICES FILTER)
     ========================================================================== */
  function initInteractiveTabs() {
    const tabButtons = document.querySelectorAll('[data-tab-target]');
    if (tabButtons.length > 0) {
      tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-tab-target');
          const wrapper = btn.closest('.interactive-tabs-section') || document;

          wrapper.querySelectorAll('[data-tab-target]').forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          wrapper.querySelectorAll('.tab-panel').forEach((panel) => {
            panel.classList.remove('active');
          });

          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          const targetPanel = document.getElementById(targetId);
          if (targetPanel) {
            targetPanel.classList.add('active');
          }
        });
      });
    }

    const filterBtns = document.querySelectorAll('[data-service-filter]');
    const serviceBlocks = document.querySelectorAll('[data-service-category]');
    if (filterBtns.length > 0 && serviceBlocks.length > 0) {
      filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-service-filter');
          filterBtns.forEach((b) => {
            b.classList.remove('btn-primary');
            b.classList.add('btn-secondary');
          });
          btn.classList.remove('btn-secondary');
          btn.classList.add('btn-primary');

          serviceBlocks.forEach((block) => {
            const cat = block.getAttribute('data-service-category');
            if (filter === 'all' || cat === filter) {
              block.style.display = '';
            } else {
              block.style.display = 'none';
            }
          });
        });
      });
    }
  }

  /* ==========================================================================
     5. HOME 2 AMC QUICK ESTIMATOR & PROPERTY SIZE PRICING SWITCHER
     ========================================================================== */
  function initPricingAndEstimator() {
    const propTypeSelect = document.getElementById('est-property-type');
    const propSizeSelect = document.getElementById('est-property-size');
    const estPlanTier = document.getElementById('est-plan-tier');
    const estPriceOutput = document.getElementById('est-price-output');
    const estVisitsOutput = document.getElementById('est-visits-output');
    const estQuoteLink = document.getElementById('est-quote-link');

    function updateEstimator() {
      if (!propTypeSelect || !propSizeSelect) return;
      const type = propTypeSelect.value;
      const size = propSizeSelect.value;

      let recommendedPlan = 'Standard Care';
      let basePrice = 26999;
      let visits = '4 Scheduled Preventive Inspections + 12 Callouts';

      if (size === 'compact' && type === 'Apartment / Flat') {
        recommendedPlan = 'Basic Care';
        basePrice = 14999;
        visits = '2 Scheduled Preventive Inspections + 6 Callouts';
      } else if (size === 'large' || type === 'Independent Villa / Bungalow') {
        recommendedPlan = 'Premium Care';
        basePrice = size === 'large' ? 46999 : 42999;
        visits = '6 Scheduled Preventive Inspections + Priority Support';
      } else if (size === 'medium') {
        recommendedPlan = 'Standard Care';
        basePrice = 26999;
        visits = '4 Scheduled Preventive Inspections + 12 Callouts';
      }

      if (estPlanTier) estPlanTier.textContent = recommendedPlan + ' (Sample)';
      if (estPriceOutput) {
        estPriceOutput.textContent = '₹' + basePrice.toLocaleString('en-IN') + ' / yr';
      }
      if (estVisitsOutput) estVisitsOutput.textContent = visits;
      if (estQuoteLink) {
        estQuoteLink.href =
          'contact.html?plan=' +
          encodeURIComponent(recommendedPlan) +
          '&type=' +
          encodeURIComponent(type) +
          '#quote-form';
      }
    }

    if (propTypeSelect && propSizeSelect) {
      propTypeSelect.addEventListener('change', updateEstimator);
      propSizeSelect.addEventListener('change', updateEstimator);
      updateEstimator();
    }

    const sizeToggleBtns = document.querySelectorAll('[data-property-scale]');
    if (sizeToggleBtns.length > 0) {
      const priceMapping = {
        standard: {
          basic: '₹14,999',
          standard: '₹26,999',
          premium: '₹42,999',
          basicSuit: '1–2 BHK Apartments (Up to 1,200 sq.ft.)',
          standardSuit: '2–3 BHK Apartments & Duplexes (Up to 2,200 sq.ft.)',
          premiumSuit: '4 BHK, Penthouses & Villas (Up to 4,000 sq.ft.)',
        },
        large: {
          basic: '₹19,499',
          standard: '₹34,999',
          premium: '₹54,999',
          basicSuit: 'Large 2–3 BHK Homes (1,200 – 2,000 sq.ft.)',
          standardSuit: 'Large 3–4 BHK & Row Houses (2,000 – 3,200 sq.ft.)',
          premiumSuit: 'Estates & Large Villas (3,200 – 5,500 sq.ft.)',
        },
      };

      sizeToggleBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const scale = btn.getAttribute('data-property-scale');
          sizeToggleBtns.forEach((b) => {
            b.classList.remove('btn-primary');
            b.classList.add('btn-secondary');
          });
          btn.classList.remove('btn-secondary');
          btn.classList.add('btn-primary');

          const data = priceMapping[scale] || priceMapping.standard;
          const basicEl = document.getElementById('price-basic');
          const stdEl = document.getElementById('price-standard');
          const premEl = document.getElementById('price-premium');
          const basicSuitEl = document.getElementById('suit-basic');
          const stdSuitEl = document.getElementById('suit-standard');
          const premSuitEl = document.getElementById('suit-premium');

          if (basicEl) basicEl.textContent = data.basic;
          if (stdEl) stdEl.textContent = data.standard;
          if (premEl) premEl.textContent = data.premium;
          if (basicSuitEl) basicSuitEl.textContent = data.basicSuit;
          if (stdSuitEl) stdSuitEl.textContent = data.standardSuit;
          if (premSuitEl) premSuitEl.textContent = data.premiumSuit;
        });
      });
    }
  }

  /* ==========================================================================
     6. FORMS: URL PARAM PREFILL, VALIDATION & SUBMISSION FEEDBACK
     ========================================================================== */
  function initForms() {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get('plan');
    const serviceParam = params.get('service');
    const typeParam = params.get('type');

    if (planParam) {
      const planSelect = document.getElementById('preferred-plan');
      if (planSelect) {
        Array.from(planSelect.options).forEach((opt) => {
          if (opt.value.toLowerCase().includes(planParam.toLowerCase())) {
            planSelect.value = opt.value;
          }
        });
      }
    }

    if (typeParam) {
      const typeSelect = document.getElementById('property-type');
      if (typeSelect) {
        Array.from(typeSelect.options).forEach((opt) => {
          if (opt.value.toLowerCase().includes(typeParam.toLowerCase())) {
            typeSelect.value = opt.value;
          }
        });
      }
    }

    if (serviceParam) {
      const checkboxes = document.querySelectorAll('input[name="services"]');
      checkboxes.forEach((cb) => {
        if (cb.value.toLowerCase().includes(serviceParam.toLowerCase())) {
          cb.checked = true;
        }
      });
    }

    document.querySelectorAll('.password-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          btn.textContent = isPassword ? 'Hide' : 'Show';
          btn.setAttribute(
            'aria-label',
            isPassword ? 'Hide password' : 'Show password'
          );
        }
      });
    });

    function setFieldError(input, hasError) {
      if (!input) return;
      const group = input.closest('.form-group');
      if (hasError) {
        input.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        if (group) group.classList.add('has-error');
      } else {
        input.classList.remove('is-invalid');
        input.setAttribute('aria-invalid', 'false');
        if (group) group.classList.remove('has-error');
      }
    }

    function isValidEmail(val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    }

    function isValidPhone(val) {
      return /^[+\d][\d\s\-()]{7,18}$/.test(val.trim());
    }

    document.querySelectorAll('.form-control').forEach((input) => {
      input.addEventListener('input', () => {
        setFieldError(input, false);
      });
      input.addEventListener('change', () => {
        setFieldError(input, false);
      });
    });

    // Contact Quote Enquiry Form
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
      quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const nameInput = document.getElementById('customer-name');
        const emailInput = document.getElementById('customer-email');
        const phoneInput = document.getElementById('customer-phone');
        const propTypeInput = document.getElementById('property-type');
        const propLocInput = document.getElementById('property-location');
        const propSizeInput = document.getElementById('property-size');
        const planInput = document.getElementById('preferred-plan');
        const serviceChecks = quoteForm.querySelectorAll(
          'input[name="services"]:checked'
        );
        const servicesGroup = document.getElementById('services-group');

        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
          setFieldError(nameInput, true);
          isValid = false;
        }
        if (!isValidEmail(emailInput.value)) {
          setFieldError(emailInput, true);
          isValid = false;
        }
        if (!isValidPhone(phoneInput.value)) {
          setFieldError(phoneInput, true);
          isValid = false;
        }
        if (!propTypeInput.value) {
          setFieldError(propTypeInput, true);
          isValid = false;
        }
        if (!propLocInput.value.trim()) {
          setFieldError(propLocInput, true);
          isValid = false;
        }
        if (!propSizeInput.value) {
          setFieldError(propSizeInput, true);
          isValid = false;
        }
        if (!planInput.value) {
          setFieldError(planInput, true);
          isValid = false;
        }
        if (serviceChecks.length === 0) {
          if (servicesGroup) servicesGroup.classList.add('has-error');
          isValid = false;
        } else {
          if (servicesGroup) servicesGroup.classList.remove('has-error');
        }

        if (!isValid) {
          const firstInvalid = quoteForm.querySelector('.is-invalid');
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        const feedbackBox = document.getElementById('quote-feedback');
        const refNumber = 'VC-AMC-' + Math.floor(100000 + Math.random() * 900000);
        const selectedServices = Array.from(serviceChecks)
          .map((c) => c.value)
          .join(', ');

        if (feedbackBox) {
          feedbackBox.innerHTML = `
            <div style="display:flex;align-items:flex-start;gap:14px;">
              <div style="width:40px;height:40px;border-radius:10px;background:var(--accent-primary);color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:800;">✓</div>
              <div>
                <h4 style="margin-bottom:4px;">AMC Quote Enquiry Received — Ref: <span class="tabular-nums">${refNumber}</span></h4>
                <p style="font-size:0.9rem;margin-bottom:8px;">Thank you, <strong>${nameInput.value.trim()}</strong>. Your residential AMC enquiry for a <strong>${propTypeInput.value}</strong> (${propSizeInput.value}) in <strong>${propLocInput.value.trim()}</strong> has been recorded.</p>
                <div style="font-size:0.83rem;background:var(--bg-surface);padding:10px 14px;border-radius:8px;border:1px solid var(--border-subtle);">
                  <strong>Selected Plan:</strong> ${planInput.value}<br>
                  <strong>Requested Coverage:</strong> ${selectedServices}<br>
                  <em>Note: This is a frontend template demonstration confirmation. Our sample AMC advisory desk responds within 4 business hours to schedule an initial baseline inspection.</em>
                </div>
              </div>
            </div>
          `;
          feedbackBox.classList.add('show', 'success');
          feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          quoteForm.reset();
        }
      });

      quoteForm.querySelectorAll('input[name="services"]').forEach((cb) => {
        cb.addEventListener('change', () => {
          const servicesGroup = document.getElementById('services-group');
          if (servicesGroup) servicesGroup.classList.remove('has-error');
        });
      });
    }

    // Login Form UI
    const loginForm = document.getElementById('login-form');
    const forgotTrigger = document.getElementById('forgot-password-trigger');
    const forgotBox = document.getElementById('forgot-password-box');

    if (forgotTrigger && forgotBox) {
      forgotTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isHidden = forgotBox.style.display === 'none' || !forgotBox.style.display;
        forgotBox.style.display = isHidden ? 'block' : 'none';
      });
    }

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const identifier = document.getElementById('login-identifier');
        const password = document.getElementById('login-password');

        const idVal = identifier.value.trim();
        if (!idVal || (!isValidEmail(idVal) && !isValidPhone(idVal))) {
          setFieldError(identifier, true);
          isValid = false;
        }
        if (!password.value || password.value.length < 6) {
          setFieldError(password, true);
          isValid = false;
        }

        if (!isValid) return;

        const feedback = document.getElementById('login-feedback');
        if (feedback) {
          feedback.innerHTML = `
            <strong>Customer Login Successful:</strong> Welcome back, <strong>${idVal}</strong>.
            <span style="display:block;margin-top:6px;font-size:0.84rem;color:var(--text-secondary);">
              <a href="dashboard.html" style="color:var(--accent-primary);font-weight:700;text-decoration:underline;">Proceed to Customer AMC Dashboard &rarr;</a>
            </span>
          `;
          feedback.classList.add('show', 'success');
        }
      });
    }

    // Sign Up Form UI
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      const passInput = document.getElementById('signup-password');
      const strengthBar = document.getElementById('password-strength-text');

      if (passInput && strengthBar) {
        passInput.addEventListener('input', () => {
          const val = passInput.value;
          if (!val) {
            strengthBar.textContent = '';
            return;
          }
          let score = 0;
          if (val.length >= 8) score++;
          if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
          if (/\d/.test(val)) score++;
          if (/[^A-Za-z0-9]/.test(val)) score++;

          const labels = ['Weak', 'Fair', 'Good', 'Strong'];
          const colors = ['#DC2626', '#D97706', '#1D7A74', '#16A34A'];
          const idx = Math.max(0, Math.min(score - 1, 3));
          strengthBar.textContent = 'Password strength: ' + labels[idx];
          strengthBar.style.color = colors[idx];
        });
      }

      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const fullName = document.getElementById('signup-name');
        const email = document.getElementById('signup-email');
        const phone = document.getElementById('signup-phone');
        const password = document.getElementById('signup-password');
        const confirmPass = document.getElementById('signup-confirm-password');
        const propType = document.getElementById('signup-property-type');
        const city = document.getElementById('signup-city');
        const consent = document.getElementById('signup-consent');
        const consentGroup = document.getElementById('consent-group');

        if (!fullName.value.trim() || fullName.value.trim().length < 2) {
          setFieldError(fullName, true);
          isValid = false;
        }
        if (!isValidEmail(email.value)) {
          setFieldError(email, true);
          isValid = false;
        }
        if (!isValidPhone(phone.value)) {
          setFieldError(phone, true);
          isValid = false;
        }
        if (!password.value || password.value.length < 8) {
          setFieldError(password, true);
          isValid = false;
        }
        if (!confirmPass.value || confirmPass.value !== password.value) {
          setFieldError(confirmPass, true);
          isValid = false;
        }
        if (!propType.value) {
          setFieldError(propType, true);
          isValid = false;
        }
        if (!city.value.trim()) {
          setFieldError(city, true);
          isValid = false;
        }
        if (!consent.checked) {
          if (consentGroup) consentGroup.classList.add('has-error');
          isValid = false;
        } else {
          if (consentGroup) consentGroup.classList.remove('has-error');
        }

        if (!isValid) return;

        const feedback = document.getElementById('signup-feedback');
        if (feedback) {
          feedback.innerHTML = `
            <strong>Homeowner Account Created:</strong> Profile validated for <strong>${fullName.value.trim()}</strong> (${propType.value}, ${city.value.trim()}).
            <span style="display:block;margin-top:6px;font-size:0.84rem;color:var(--text-secondary);">
              <a href="dashboard.html" style="color:var(--accent-primary);font-weight:700;text-decoration:underline;">Open Customer Dashboard &rarr;</a> or <a href="amc-plans.html" style="color:var(--accent-primary);font-weight:700;text-decoration:underline;">Explore AMC Plans</a>.
            </span>
          `;
          feedback.classList.add('show', 'success');
          signupForm.reset();
          if (strengthBar) strengthBar.textContent = '';
        }
      });
    }

    // Social Login Buttons (Google / Apple)
    document.querySelectorAll('.social-auth-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const provider = btn.getAttribute('data-provider') || 'Social';
        const feedback =
          document.getElementById('login-feedback') ||
          document.getElementById('signup-feedback');
        if (feedback) {
          feedback.innerHTML = `
            <strong>${provider} Authentication Selected:</strong> Frontend OAuth UI ready.
            <span style="display:block;margin-top:4px;font-size:0.84rem;color:var(--text-secondary);">
              In production, connect this button to your ${provider} OAuth 2.0 client ID. <a href="dashboard.html" style="color:var(--accent-primary);font-weight:700;text-decoration:underline;">Continue to Customer Dashboard &rarr;</a>
            </span>
          `;
          feedback.classList.add('show', 'success');
        }
      });
    });
  }

  /* ==========================================================================
     7. CUSTOMER DASHBOARD INTERACTIONS (SCHEDULE VISITS, PLAN DETAILS, RENEW)
     ========================================================================== */
  function initDashboard() {
    const sidebarToggle = document.getElementById('dashboard-sidebar-toggle');
    const sidebar = document.getElementById('dashboard-sidebar');

    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = sidebar.classList.toggle('open');
        sidebarToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', (e) => {
        if (
          sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) &&
          !sidebarToggle.contains(e.target)
        ) {
          sidebar.classList.remove('open');
          sidebarToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Sidebar section links active highlight
    const sidebarLinks = document.querySelectorAll('.sidebar-nav-link[href^="#"]');
    sidebarLinks.forEach((link) => {
      link.addEventListener('click', () => {
        sidebarLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
        if (sidebar && window.innerWidth <= 1024) {
          sidebar.classList.remove('open');
        }
      });
    });

    // Schedule a Service Visit Form
    const scheduleForm = document.getElementById('dashboard-schedule-form');
    const visitsTbody = document.getElementById('upcoming-visits-tbody');
    const scheduleFeedback = document.getElementById('schedule-feedback');
    const visitDateInput = document.getElementById('visit-date');

    if (visitDateInput && typeof visitDateInput.showPicker === 'function') {
      visitDateInput.addEventListener('click', () => {
        try {
          visitDateInput.showPicker();
        } catch (err) {
          // showPicker might throw if already visible
        }
      });
    }

    if (scheduleForm && visitsTbody) {
      scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const trade = document.getElementById('visit-trade').value;
        const type = document.getElementById('visit-type').value;
        const date = document.getElementById('visit-date').value;
        const slot = document.getElementById('visit-slot').value;
        const notes = document.getElementById('visit-notes').value.trim();

        if (!trade || !type || !date || !slot) {
          if (scheduleFeedback) {
            scheduleFeedback.innerHTML =
              '<strong style="color:var(--danger-600);">Please select a trade category, visit type, date, and preferred time slot.</strong>';
            scheduleFeedback.classList.add('show');
          }
          return;
        }

        const ticketId = 'VC-VST-' + Math.floor(1000 + Math.random() * 9000);
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong class="tabular-nums">${ticketId}</strong></td>
          <td class="scope-col">${trade}<span style="display:block;font-size:0.78rem;color:var(--text-muted);">${notes || type}</span></td>
          <td>${type}</td>
          <td>Assigned on Confirmation</td>
          <td class="tabular-nums">${date} • ${slot}</td>
          <td><span class="allowance-pill" style="background:var(--accent-subtle);color:var(--accent-subtle-text);border-color:var(--border-accent);">Confirmed</span></td>
        `;
        visitsTbody.prepend(tr);

        if (scheduleFeedback) {
          scheduleFeedback.innerHTML = `
            <strong>Technician Visit Scheduled (${ticketId}):</strong> Your <strong>${trade}</strong> (${type}) is booked for <strong>${date}</strong> (${slot}).
          `;
          scheduleFeedback.classList.add('show', 'success');
        }
        scheduleForm.reset();
      });
    }

    // Contract Renewal Form
    const renewForm = document.getElementById('dashboard-renew-form');
    const renewFeedback = document.getElementById('renew-feedback');
    if (renewForm && renewFeedback) {
      renewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedTier = document.getElementById('renew-plan-tier').value;
        const selectedTerm = document.getElementById('renew-term').value;
        const refId = 'VC-RNW-' + Math.floor(10000 + Math.random() * 90000);

        renewFeedback.innerHTML = `
          <strong>Contract Renewal Request Logged (${refId}):</strong>
          <span style="display:block;margin-top:4px;font-size:0.88rem;">
            Your request to renew under <strong>${selectedTier}</strong> for <strong>${selectedTerm}</strong> has been sent to our AMC billing &amp; inspection desk. Your current coverage remains uninterrupted.
          </span>
        `;
        renewFeedback.classList.add('show', 'success');
      });
    }
  }

  /* ==========================================================================
     INITIALIZE ALL MODULES ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initThemeAndDir();
    initNavigation();
    initAccordions();
    initInteractiveTabs();
    initPricingAndEstimator();
    initForms();
    initDashboard();
  });
})();
