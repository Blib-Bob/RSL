document.addEventListener('DOMContentLoaded', () => {
  const formContainer = document.getElementById('dynamic-form-container');
  if (!formContainer) return;

  // 1. Get Service from URL Query Parameter
  const urlParams = new URLSearchParams(window.location.search);
  const service = urlParams.get('service') || 'loan'; // Default to loan project

  // Configuration for Web3Forms Access Key
  // REPLACE THIS WITH YOUR WEB3FORMS ACCESS KEY:
  const WEB3FORMS_ACCESS_KEY = "b99be59a-72e1-4670-8495-c6046e57d29e"; 
  const TARGET_EMAIL = "dasabhigyan2@gmail.com";

  // Form schemas matching FORM.xlsx structures
  const formsSchema = {
    loan: {
      title: "Bank Loan Project Report Form",
      subtitle: "Please fill out the detailed form to generate a Project Report (DPR) for your loan approval.",
      steps: [
        {
          title: "Firm Details",
          fields: `
            <div class="form-row">
              <div class="form-group">
                <label for="firm_name">Name of the Firm / Business *</label>
                <input type="text" id="firm_name" name="Firm Name" required placeholder="e.g. RSL Enterprises Ltd">
              </div>
              <div class="form-group">
                <label for="proprietor_name">Name of Owner/Proprietor *</label>
                <input type="text" id="proprietor_name" name="Owner Name" required placeholder="e.g. Ramesh Kalita">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" name="email" required placeholder="e.g. contact@domain.com">
              </div>
              <div class="form-group">
                <label for="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required placeholder="e.g. +91 9876543210">
              </div>
            </div>
            <div class="form-group">
              <label for="office_address">Office Address *</label>
              <textarea id="office_address" name="Office Address" required rows="3" placeholder="Enter complete business address"></textarea>
            </div>
          `
        },
        {
          title: "Business & Financial Details",
          fields: `
            <div class="form-row">
              <div class="form-group">
                <label for="business_nature">Nature of Business *</label>
                <select id="business_nature" name="Nature of Business" required>
                  <option value="">Select Option</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Trading">Trading</option>
                  <option value="Service">Service</option>
                  <option value="Agriculture">Agriculture / Allied</option>
                </select>
              </div>
              <div class="form-group">
                <label for="loan_amount">Requested Loan Amount (₹) *</label>
                <input type="number" id="loan_amount" name="Loan Amount Requested" required placeholder="e.g. 1500000">
              </div>
            </div>
            <div class="form-group">
              <label>Investment Goal (Select all that apply) *</label>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 8px;">
                <label style="font-weight: 500; display: flex; align-items: center; gap: 8px;">
                  <input type="checkbox" name="Investment Goal[]" value="Land & Building" style="width: auto;"> Land & Building
                </label>
                <label style="font-weight: 500; display: flex; align-items: center; gap: 8px;">
                  <input type="checkbox" name="Investment Goal[]" value="Plant & Machinery" style="width: auto;"> Plant & Machinery
                </label>
                <label style="font-weight: 500; display: flex; align-items: center; gap: 8px;">
                  <input type="checkbox" name="Investment Goal[]" value="Working Capital (Stock/Receivables)" style="width: auto;"> Working Capital (Stock)
                </label>
                <label style="font-weight: 500; display: flex; align-items: center; gap: 8px;">
                  <input type="checkbox" name="Investment Goal[]" value="Office Equipment / Vehicles" style="width: auto;"> Equipment / Vehicles
                </label>
              </div>
            </div>
            <div class="form-group">
              <label for="business_desc">Brief Description of Project Activity *</label>
              <textarea id="business_desc" name="Business Description" required rows="3" placeholder="Describe what your business does and what the loan will be used for..."></textarea>
            </div>
          `
        }
      ]
    },
    tax: {
      title: "Income Tax (ITR) Filing Form",
      subtitle: "Provide details of your income, PAN, and deductions to file your tax returns accurately.",
      steps: [
        {
          title: "PAN & Personal Info",
          fields: `
            <div class="form-row">
              <div class="form-group">
                <label for="pan_number">PAN Card Number *</label>
                <input type="text" id="pan_number" name="PAN Number" required placeholder="e.g. ABCDE1234F" style="text-transform: uppercase;">
              </div>
              <div class="form-group">
                <label for="aadhaar_number">Aadhaar Card Number *</label>
                <input type="number" id="aadhaar_number" name="Aadhaar Number" required placeholder="e.g. 123456789012">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="taxpayer_name">Full Name (As per PAN) *</label>
                <input type="text" id="taxpayer_name" name="Full Name" required placeholder="e.g. Anamika Dutta">
              </div>
              <div class="form-group">
                <label for="dob">Date of Birth *</label>
                <input type="date" id="dob" name="DOB" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" name="email" required placeholder="e.g. name@domain.com">
              </div>
              <div class="form-group">
                <label for="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required placeholder="e.g. +91 9876543210">
              </div>
            </div>
          `
        },
        {
          title: "Income Details",
          fields: `
            <div class="form-row">
              <div class="form-group">
                <label for="employer_category">Employer Category *</label>
                <select id="employer_category" name="Employer Category" required>
                  <option value="">Select Option</option>
                  <option value="Government">Government</option>
                  <option value="Public Sector Undertaking">PSU</option>
                  <option value="Private Sector">Private Sector</option>
                  <option value="Self Employed / Professional">Self Employed / Professional</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="gross_salary">Gross Annual Salary Income (₹) *</label>
                <input type="number" id="gross_salary" name="Gross Salary Income" required placeholder="Enter annual salary or 0 if self-employed">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="house_income">Income from House Property (₹)</label>
                <input type="number" id="house_income" name="House Property Income" placeholder="Rental income (if any)">
              </div>
              <div class="form-group">
                <label for="other_income">Income from Other Sources (₹)</label>
                <input type="number" id="other_income" name="Other Income" placeholder="Interest income, dividends, etc.">
              </div>
            </div>
          `
        },
        {
          title: "Deductions & Investments",
          fields: `
            <div class="form-row">
              <div class="form-group">
                <label for="sec_80c">Deductions under Sec 80C (₹)</label>
                <input type="number" id="sec_80c" name="Sec 80C Deductions" placeholder="LIC, PPF, Tuition fees, etc. (Max 1.5L)">
              </div>
              <div class="form-group">
                <label for="sec_80d">Mediclaim (Sec 80D) (₹)</label>
                <input type="number" id="sec_80d" name="Sec 80D Deductions" placeholder="Health Insurance premiums">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="housing_interest">Home Loan Interest (Sec 24) (₹)</label>
                <input type="number" id="housing_interest" name="Home Loan Interest Sec 24" placeholder="Interest paid on housing loan">
              </div>
              <div class="form-group">
                <label for="nps_80ccd">NPS Contribution (Sec 80CCD) (₹)</label>
                <input type="number" id="nps_80ccd" name="NPS Contribution" placeholder="National Pension Scheme investment">
              </div>
            </div>
          `
        }
      ]
    },
    cc: {
      title: "Cash Credit (CC) Renewal / CMA Data Form",
      subtitle: "Renew your CC limits and request CMA projections for bank scrutiny.",
      steps: [
        {
          title: "Existing Account Info",
          fields: `
            <div class="form-group">
              <label for="cc_firm_name">Name of the Enterprise *</label>
              <input type="text" id="cc_firm_name" name="Enterprise Name" required placeholder="e.g. Gupta Distributors">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="lending_bank">Lending Bank & Branch Name *</label>
                <input type="text" id="lending_bank" name="Lending Bank" required placeholder="e.g. State Bank of India, Maligaon">
              </div>
              <div class="form-group">
                <label for="existing_limit">Existing CC Limit (₹) *</label>
                <input type="number" id="existing_limit" name="Existing CC Limit" required placeholder="e.g. 5000000">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="proposed_limit">Requested Renewal / Enhanced Limit (₹) *</label>
                <input type="number" id="proposed_limit" name="Proposed CC Limit" required placeholder="e.g. 7500000">
              </div>
              <div class="form-group">
                <label for="cc_phone">Phone Number *</label>
                <input type="tel" id="cc_phone" name="phone" required placeholder="e.g. +91 9707282201">
              </div>
            </div>
            <div class="form-group">
              <label for="cc_email">Email Address *</label>
              <input type="email" id="cc_email" name="email" required placeholder="e.g. contact@business.com">
            </div>
          `
        },
        {
          title: "Financial Overview",
          fields: `
            <div class="form-row">
              <div class="form-group">
                <label for="turnover_prev">Actual Turnover (Year 1) (₹) *</label>
                <input type="number" id="turnover_prev" name="Actual Turnover Year 1" required placeholder="Turnover of last financial year">
              </div>
              <div class="form-group">
                <label for="turnover_curr">Actual/Estimated Turnover (Year 2) (₹) *</label>
                <input type="number" id="turnover_curr" name="Estimated Turnover Year 2" required placeholder="Turnover of current financial year">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="projected_turnover">Projected Turnover (Next Year) (₹) *</label>
                <input type="number" id="projected_turnover" name="Projected Turnover" required placeholder="Target turnover for renewal approval">
              </div>
              <div class="form-group">
                <label for="profit_margin">Net Profit Margin (%) *</label>
                <input type="number" id="profit_margin" name="Net Profit Margin" required placeholder="e.g. 8" min="0" max="100">
              </div>
            </div>
          `
        }
      ]
    },
    msme: {
      title: "MSME / Udyam Registration Form",
      subtitle: "Register your enterprise under Udyam Registration to avail government benefits.",
      steps: [
        {
          title: "Aadhaar & Proprietor Details",
          fields: `
            <div class="form-row">
              <div class="form-group">
                <label for="msme_aadhaar">Aadhaar Card Number *</label>
                <input type="number" id="msme_aadhaar" name="Aadhaar Number" required placeholder="e.g. 123456789012">
              </div>
              <div class="form-group">
                <label for="msme_name">Name of Entrepreneur (As per Aadhaar) *</label>
                <input type="text" id="msme_name" name="Entrepreneur Name" required placeholder="e.g. Rijoy Bhowmick">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="social_category">Social Category *</label>
                <select id="social_category" name="Social Category" required>
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
              <div class="form-group">
                <label for="gender">Gender *</label>
                <select id="gender" name="Gender" required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="msme_email">Email Address *</label>
                <input type="email" id="msme_email" name="email" required placeholder="e.g. owner@domain.com">
              </div>
              <div class="form-group">
                <label for="msme_phone">Mobile Number (Linked with Aadhaar) *</label>
                <input type="tel" id="msme_phone" name="phone" required placeholder="e.g. +91 9876543210">
              </div>
            </div>
          `
        },
        {
          title: "Enterprise Details",
          fields: `
            <div class="form-row">
              <div class="form-group">
                <label for="org_type">Type of Organization *</label>
                <select id="org_type" name="Organization Type" required>
                  <option value="">Select Option</option>
                  <option value="Proprietary">Proprietary</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Private Limited Company">Private Limited Company</option>
                  <option value="Self Help Group">Self Help Group (SHG)</option>
                  <option value="Co-operative">Co-operative</option>
                </select>
              </div>
              <div class="form-group">
                <label for="enterprise_name">Name of Enterprise / Business *</label>
                <input type="text" id="enterprise_name" name="Enterprise Name" required placeholder="e.g. RSL Logistics">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="plant_address">Location of Plant/Unit Address *</label>
                <input type="text" id="plant_address" name="Plant Location" required placeholder="Address where plant/machinery is located">
              </div>
              <div class="form-group">
                <label for="bank_ac">Bank Account Number *</label>
                <input type="text" id="bank_ac" name="Bank Account Number" required placeholder="e.g. 5010045236214">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="bank_ifsc">Bank IFSC Code *</label>
                <input type="text" id="bank_ifsc" name="Bank IFSC" required placeholder="e.g. HDFC0000123" style="text-transform: uppercase;">
              </div>
              <div class="form-group">
                <label for="commence_date">Date of Commencement *</label>
                <input type="date" id="commence_date" name="Date of Commencement" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="activity_type">Major Activity *</label>
                <select id="activity_type" name="Major Activity" required>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Services">Services</option>
                </select>
              </div>
              <div class="form-group">
                <label for="investment_amount">Investment in Plant & Machinery (₹) *</label>
                <input type="number" id="investment_amount" name="Plant Investment Amount" required placeholder="e.g. 500000">
              </div>
            </div>
          `
        }
      ]
    }
  };

  const currentSchema = formsSchema[service] || formsSchema.loan;

  // 2. Render Form Page Titles
  const mainTitleEl = document.getElementById('apply-title');
  const mainSubTitleEl = document.getElementById('apply-subtitle');
  if (mainTitleEl && mainSubTitleEl) {
    mainTitleEl.textContent = currentSchema.title;
    mainSubTitleEl.textContent = currentSchema.subtitle;
  }

  // 3. Build HTML Form Shell
  let formHTML = `
    <form id="wizard-form" class="form-card" method="POST" action="https://api.web3forms.com/submit">
      <!-- Web3Forms Hidden Settings -->
      <input type="hidden" name="access_key" value="${WEB3FORMS_ACCESS_KEY}">
      <input type="hidden" name="subject" value="New Lead Submission: ${currentSchema.title}">
      <input type="hidden" name="from_name" value="RSL Enterprise Web Portal">
      <input type="hidden" name="replyto" value="dasabhigyan2@gmail.com">
      <input type="hidden" name="redirect" value="${window.location.origin}/success.html">
      
      <!-- Wizard Progress Indicators -->
      <div class="wizard-progress">
        <div class="wizard-progress-bar" id="wizard-progress-bar"></div>
  `;

  currentSchema.steps.forEach((step, idx) => {
    formHTML += `
      <div class="wizard-step ${idx === 0 ? 'active' : ''}" data-step="${idx}">
        <div class="wizard-step-circle">${idx + 1}</div>
        <div class="wizard-step-label">${step.title}</div>
      </div>
    `;
  });

  formHTML += `
      </div>
      <!-- End of progress bar -->
      
      <!-- Steps Contents -->
  `;

  currentSchema.steps.forEach((step, idx) => {
    formHTML += `
      <div class="wizard-form-step ${idx === 0 ? 'active' : ''}" data-step="${idx}">
        <h3 style="margin-bottom: 24px; color: var(--primary-deep); font-size: 20px;">${step.title}</h3>
        ${step.fields}
      </div>
    `;
  });

  // Footer Navigation Buttons
  formHTML += `
      <div class="wizard-buttons">
        <button type="button" class="cta-btn secondary" id="prev-btn" style="visibility: hidden;">Back</button>
        <button type="button" class="cta-btn" id="next-btn">Next</button>
      </div>
      
      <!-- Submission Loader Overlay -->
      <div id="submit-loader" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(10,37,64,0.8); z-index:9999; display:none; flex-direction:column; justify-content:center; align-items:center; color:white;">
        <div class="spinner" style="border: 4px solid rgba(255,255,255,0.1); border-left: 4px solid var(--accent-gold); border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin-bottom:16px;"></div>
        <p style="font-weight:700; font-size:18px;">Submitting Securely...</p>
        <p style="font-size:14px; opacity:0.8; margin-top:4px;">Please wait while we send your details directly to RSL Enterprise</p>
      </div>
      
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </form>
  `;

  formContainer.innerHTML = formHTML;

  // 4. Implement Form Controls & Wizard Logic
  let currentStep = 0;
  const totalSteps = currentSchema.steps.length;
  const form = document.getElementById('wizard-form');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('wizard-progress-bar');
  const stepIndicators = document.querySelectorAll('.wizard-step');
  const formSteps = document.querySelectorAll('.wizard-form-step');
  const loader = document.getElementById('submit-loader');

  updateProgress();

  nextBtn.addEventListener('click', async () => {
    // Validate current step fields
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps - 1) {
        // Go to next step
        stepIndicators[currentStep].classList.remove('active');
        stepIndicators[currentStep].classList.add('completed');
        
        currentStep++;
        
        formSteps.forEach((step, idx) => {
          step.classList.toggle('active', idx === currentStep);
        });
        stepIndicators[currentStep].classList.add('active');
        
        updateProgress();
      } else {
        // Submit Form via AJAX
        await submitForm();
      }
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      stepIndicators[currentStep].classList.remove('active');
      
      currentStep--;
      
      formSteps.forEach((step, idx) => {
        step.classList.toggle('active', idx === currentStep);
      });
      stepIndicators[currentStep].classList.remove('completed');
      stepIndicators[currentStep].classList.add('active');
      
      updateProgress();
    }
  });

  function updateProgress() {
    // Back button visibility
    prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
    
    // Next/Submit button label
    nextBtn.textContent = currentStep === totalSteps - 1 ? 'Submit Application' : 'Next';
    
    // Progress bar width
    if (progressBar && totalSteps > 1) {
      const percentage = (currentStep / (totalSteps - 1)) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  }

  function validateStep(stepIndex) {
    const activeStepContainer = formSteps[stepIndex];
    const inputs = activeStepContainer.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      // Clear previous custom error styles
      input.style.borderColor = 'rgba(15, 76, 129, 0.15)';
      
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = 'red';
      }
      
      // Email validation
      if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          isValid = false;
          input.style.borderColor = 'red';
        }
      }
    });

    if (!isValid) {
      // Smooth scroll to first error
      const firstError = activeStepContainer.querySelector('[style*="border-color: red"], [style*="border-color: rgb(255, 0, 0)"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return isValid;
  }

  // 6. Handle Form AJAX Submission
  async function submitForm() {
    loader.style.display = 'flex';
    
    // Construct FormData to send to Web3Forms
    const formData = new FormData(form);
    
    // Save submission data in session storage to display in success.html summary
    const summaryData = {};
    formData.forEach((value, key) => {
      // Don't save access key or files in session summary
      if (key !== 'access_key' && key !== 'subject' && key !== 'from_name' && key !== 'replyto' && key !== 'redirect' && !(value instanceof File)) {
        summaryData[key] = value;
      }
    });
    sessionStorage.setItem('last_submission_service', service);
    sessionStorage.setItem('last_submission_data', JSON.stringify(summaryData));

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Redirect to success page
        window.location.href = 'success.html';
      } else {
        alert('Submission failed: ' + result.message);
        loader.style.display = 'none';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred during submission. Please check your internet connection and try again.');
      loader.style.display = 'none';
    }
  }
});
