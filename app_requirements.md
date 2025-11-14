# UAE Application Requirements (Draft)

## 1. Overview
The project aims to build a **flexible and easy‑to‑use** application in the **UAE** integrating with **UAE Pass** for authentication. After login, the user experience and available data/actions depend on the user’s role(s). A user can have one or more of the following roles:
- **Company Owner / Authorizer**
- **Sponsor**

The system organizes logic around **Entities**. Each entity contains:
- **Actions** (operations the user can perform)
- **Enquiries** (information the user can view)

Current main entities:
- **Company**
- **Employee**
- **File (Sponsor)**

---

## 2. Authentication
- Login is done using **UAE Pass**.
- After login, the system determines the user roles.
- Based on the role(s), the dashboard displays the relevant entities.

---

## 3. Entity: Company
Displayed only if the logged‑in user is a **Company Owner / Authorizer**.

### 3.1 Entity Overview
The user sees a **list of companies** they own or represent.

### 3.2 Company Entity – Actions
For now:
- **Add New Work Permit**

*(This list is extendable in the future.)*

### 3.3 Company Entity – Enquiries
- None for now (to be added later)

### 3.4 Company Details Page
When a company is clicked:
- Access all **Company Actions**
- Access all **Company Enquiries**
- List all **Employees** under the company

Each employee acts as an **Employee Entity**, meaning the employee card should expose actions and enquiries.

---

## 4. Entity: Employee
Displayed when user selects a company or when the user is a sponsor.

### 4.1 Employee Entity – Actions
- Modify Work Permit
- Cancel Work Permit
- Submit Complaint
- Submit Cancel Work Permit Complaint
- Renew Work Permit
- Pay Fine

### 4.2 Employee Entity – Enquiries
- Work Permit Contract
- (WPP) Worker Protection Program – بوليصة حماية العامل
- (ILOE) Unemployment Insurance – بوليصة التأمين ضد التعطل
- (WHI) Health Insurance – بوليصة التأمين الصحي

---

## 5. Entity: File (Sponsor)
Displayed only if user is a **Sponsor**.

### 5.1 Overview
- A sponsor can list all **domestic workers** they sponsor.
- Each domestic worker is treated as an **Employee Entity**.
- Actions and enquiries for this entity will be defined later.

---

## 6. Future Enhancements (Planned)

### 6.1 Editable Entity Actions & Enquiries
- Each entity’s list of actions and enquiries will be editable via admin configuration.
- This allows the system to remain flexible and adapt to new business requirements.

### 6.2 User Templates (Per Role)
Users will be able to create **custom templates** for forms. Example:
- Template includes fields like:
  - *Text field:* Salary
  - *Dropdown:* Nationality

When the user opens an entity action (e.g., **New Work Permit** under Employee Entity):
- They can choose a previously saved template.
- The template fields will be injected as **additional requirements** into the form.

This feature improves reusability and speeds up repeated workflows.

---

## 7. Summary
This document outlines the current entity‑based structure of the UAE application and planned enhancements. The system prioritizes modularity, clarity, and future expansion. More entities, actions, enquiries, and templates can be added as business needs evolve.

