# RSL Enterprise: Project Analysis & Requirements

## 1. Executive Summary
**RSL Enterprise** is a North East India-based online financial services firm established in 2017. The primary goal of the organization is to promote "financial inclusion" by offering affordable, reliable, and accessible financial and regulatory services to lower and middle-income groups. Their hallmark is a 99% track record in securing bank loan approvals for their clients. 

The purpose of this new website project is to transition their traditional consultancy services into a streamlined digital SaaS-like platform. Due to the push for online accessibility (accelerated by circumstances like the COVID-19 pandemic), this platform will allow businesses to easily request and process complex financial tasks online. 

**Key services include:**
- Preparing Detailed Project Reports (DPR) for Bank Loans
- Providing CA Certificates (Net Worth, Turnover, Fund Utilization)
- Digital Signature Processing
- MSME (Udyog Aadhaar) Registration
- Cash Credit (CC) Limit Renewals & CMA Data Preparation

## 2. Required Web Pages
Based on the extracted documents, the platform will require the following architecture:

### Core Pages
1. **Home / Landing Page:** Highlighting the 99% loan approval success rate, core services, and clear Call-To-Action buttons to start a new application.
2. **About Us:** The history of RSL since 2017, mission/vision statements, and details on their expert team of CAs and financial professionals.
3. **Services:** Detailed breakdown of all offerings (Loan Projects, Certificates, MSME, CC Renewals).
4. **Pricing:** A clear, tiered pricing table based on the loan limits and required services (extracted from `PRICE LIST.xlsx`).
5. **Portfolio / Gallery:** Showcasing previous successful loan approvals across various sectors (Manufacturing, Trading, Services, Agriculture).
6. **Contact Support:** Providing the dedicated helpline number and email for assistance.

### Client Portal & Forms
7. **Application Wizards (Multi-step Forms):**
   - **Loan Project Application:** To capture business details, investment plans, and upload invoices.
   - **Income Tax Application:** To capture PAN, deductions, and Form 16 uploads.
   - **CC Renewal / CMA Data Form:** To capture balance sheets, bank statements, and existing loan details.
   - **MSME Registration Form:** To capture Aadhaar, business activity, and establishment details.

### Legal & Policies (Footer Links)
8. **Terms of Service:** General rules, account security, and service usage.
9. **Privacy Policy:** Data collection, cookies, and user rights.
10. **Refund & Cancellation Policy:** Conditions for the 4-day refund window and cancellation fees.

---

## 3. Core Content Extraction from Excel Sheets

### A. Pricing Structure (`PRICE LIST.xlsx`)
**1. Loan Project Reports:**
*Prices vary slightly based on state (Assam vs. North East).*
- **₹1 - ₹9.99 Lakhs:** ₹3,799 (Assam) / ₹6,299 (NE)
- **₹10L - ₹24.99 Lakhs:** ₹4,999 (Assam) / ₹7,499 (NE)
- **₹25L - ₹49.99 Lakhs:** ₹6,999 (Assam) / ₹9,499 (NE)
- **₹50L - ₹99.99 Lakhs:** ₹9,499 (Assam) / ₹11,999 (NE)
- **₹1Cr - ₹4.99 Crores:** ₹13,569 (Assam) / ₹16,069 (NE)
- **₹5Cr - ₹9.99 Crores:** ₹19,999 (Assam) / ₹22,499 (NE)

**2. CC Renewal:**
- Sliding scale from **₹2,549** (up to 10 Lakhs) to **₹14,999** (up to 10 Crores).

**3. Flat Rate Services:**
- **MSME Registration:** ₹999
- **Form 13:** ₹999

### B. Input Forms & Data Collection (`FORM.xlsx`)
**1. Project Loan Form**
- **Step 1:** Firm Name, Contact Info, Address.
- **Step 2:** Nature of Business (Trading, Service, Manufacturing), Loan Type (Term, CC, Composite), Investment Goal (Asset, Stock, or Both).
- **Step 3:** Project Cost, Loan Amount, Owner Contribution, Tenure, Uploads (Quotations/Invoices), Declaration check.

**2. Income Tax Form**
- **Step 1 & 2:** Name, PAN, DOB, Phone, Email, Address.
- **Step 3:** Deductions Check (LIC, Housing Loan, Education, Mediclaim).
- **Step 4:** Upload Form 16, IT Portal Registration Status.

**3. CC Renewal / CMA Data**
- **Step 1:** Firm details.
- **Step 2:** Request type (Renewal vs Renewal with Extension), Existing/New Limit amounts, Existing Term Loans (Amount, ROI, EMI).
- **Uploads:** Previous Year Balance Sheets, Bank Statements (last financial year to date). For CMA, 3 years of projected balance sheets are required.

**4. MSME Registration**
- **Details:** Aadhaar, Name, Social Category, Gender, PAN, Business Incorporation Date, Bank Account & IFSC.
- **Business Info:** Main Activity, Number of Employees, Investment in Plant/Machinery, Previous & Estimated Turnover.
- **Uploads:** Aadhaar, Establishment Certificate, PAN.

### C. Project Report Output Format (`FORMAT.xlsx`)
This file defines the ultimate deliverable RSL provides to the client for bank loans. 
- **Sections Included:** Project at a Glance, Feasibility Report, Cost of Project & Means of Finance, Projections & Profitability (7 years), Balance Sheet, Cash Flow.
- **Financial Metrics Calculated:** Depreciation, Capital Account, Break-Even Analysis (BEP), Return on Capital Employed (ROCE), Debt Service Coverage Ratio (DSCR), Current Ratio, Quick Ratio, TOL/TNW, and Debt Equity Ratio.

### D. Service Level Agreements (`TERMS & CONDITIONS.xlsx`)
- **Delivery Time:** Soft copy delivered within 3-5 working days after successful payment.
- **Refund Policy:** Eligible for a refund within 4 working days in the event of a wrong report or missed deadline.
- **Revisions:** Changes are acceptable after delivery (excluding loan amount changes). Changes requested after 2-7 days will incur a fee (₹200 - ₹2,000 depending on the project type). Limited to one round of revisions.
