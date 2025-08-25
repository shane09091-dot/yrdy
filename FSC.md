## Financial Services Cloud (FSC)

### Overview
Salesforce Financial Services Cloud (FSC) is an industry-specific data model and set of capabilities built on the Salesforce Platform for banks, wealth managers, insurers, and lenders. It accelerates client onboarding, relationship management, compliance workflows, and engagement across retail, commercial, and wealth lines of business.

### When to Use FSC
- **Relationship-centric selling and service** across persons, households, and businesses
- **Wealth/client management**: goals, financial accounts, holdings, and advice workflows
- **Retail/commercial banking**: deposits, lending, KYC, referrals, and onboarding
- **Insurance**: policy and claim servicing, producer management

### Editions and Prerequisites
- Requires a Salesforce org with FSC licenses enabled
- Person Accounts are recommended/commonly used for individual clients
- Uses standard Salesforce features (Lightning App Builder, Flow, Reports, Sharing)

### Core Data Model Highlights
- **Party Model**
  - `Account` (Business) and `Person Account` (Individual)
  - `Contact` linked to Accounts; often secondary for Person Accounts
  - `Relationship Group` / `Household` to aggregate persons and related entities
  - `Party Relationship` to represent roles between parties (e.g., spouse, attorney)
- **Financial Accounts and Holdings**
  - `Financial Account` for products (brokerage, deposit, loan, credit, insurance)
  - `Financial Holding` for positions within investment accounts
  - `Financial Goal` for client objectives (retirement, education)
- **Engagement and Lifecycle**
  - `Referral`, `Lead`, `Opportunity` for pipeline and onboarding
  - `Interaction` / `Interaction Summary` for call notes and meeting records
  - `KYC`, `Compliance` records for onboarding checks
  - `Case` for service processes

### Typical Relationships
- Person Account belongs to one or more `Relationship Groups` (households)
- Business Account relates to multiple Contacts and Groups
- Financial Accounts roll up to Parties and Groups for AUM/TVM calculations
- Opportunities and Referrals link to the primary Party and associated products

### Security and Compliance
- Use **org-wide defaults** and **role hierarchy** for least-privilege access
- Apply **Field-Level Security** and **Restricted Fields** for PII/sensitive data
- Use **Shield Platform Encryption** for data-at-rest where required
- Leverage **Event Monitoring** and **Transaction Security** for audit
- Consider **data residency** and retention policies per regulation

### Implementation Checklist
1. Provision FSC licenses and enable Person Accounts (if in-scope)
2. Enable key FSC features (e.g., KYC, Interaction Summaries, Action Plans)
3. Configure Record Types, Page Layouts, and Lightning Pages per persona
4. Set up Relationship Groups/Households and Party Relationship types
5. Define product taxonomy and map to `Financial Account` subtypes
6. Build onboarding/referral flows (Flow/Screen Flow) and approval paths
7. Set security model: OWDs, roles, permission sets, Shield encryption
8. Migrate seed data; validate deduplication rules and matching
9. Build analytics: core reports, AUM dashboards, pipeline, service KPIs
10. Train users; iterate with a pilot group before broader rollout

### Customization Guidance
- Prefer **clicks over code**: Flow, Dynamic Forms, Dynamic Actions, and validation
- Use **External Services** or **Apex** for integrations not covered by standard connectors
- Keep custom fields lean; extend via **custom metadata types** for reference data
- Modularize Flows and use **subflows**; document entry/exit criteria
- Encapsulate complex logic in **Apex Services** with unit tests (≥75% coverage)

### Integration Patterns
- Use **Platform Events** and **Change Data Capture** for event-driven sync
- For core banking/portfolio systems, use **MuleSoft** or **Apex callouts**
- Normalize client identities via an MDM; apply an enterprise customer ID
- Batch data loads with **Bulk API v2**; observe daily API/row limits

### Analytics
- Start with FSC packaged dashboards; extend via custom reports
- Consider **Einstein/CRM Analytics** for advanced AUM, churn risk, and NBO
- Standardize KPI definitions (AUM, NNM, wallet share) as report formulas

### Best Practices
- Establish a clear **party and householding strategy** early
- Keep referral-to-onboarding process **simple and measurable**
- Minimize custom objects; extend standard FSC objects where possible
- Document data lineage and ownership for each domain
- Implement a **data quality** plan (matching/dupe, completeness, timeliness)

### Common Pitfalls
- Over-customizing before validating processes with users
- Mixing B2C and B2B models without clear governance
- Inconsistent AUM/rollups due to missing relationships or record types
- Ignoring Shield/FLS earlier, leading to rework

### Glossary
- **AUM**: Assets Under Management
- **KYC**: Know Your Customer
- **MDM**: Master Data Management
- **OWD**: Organization-Wide Defaults
- **PII**: Personally Identifiable Information
- **TVM**: Total Value Managed

### References
- Salesforce Help: Financial Services Cloud
- Salesforce Architect Center: Industry Architectures
- Implementation Guides and Data Models from Salesforce documentation

