import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, FileText, Gavel, Scale, BookOpen, ChevronRight } from 'lucide-react';

interface LegalEntry {
  id: string;
  section: string;
  title: string;
  act: string;
  summary: string;
  punishment?: string;
  tags: string[];
}

const legalDatabase: LegalEntry[] = [
  // ── BHARATIYA NYAYA SANHITA (BNS) 2023 — replaced IPC w.e.f. July 1, 2024 ──
  { id: '1',  section: 'Section 100', title: 'Murder', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine. Replaces IPC Section 302.', punishment: 'Death or life imprisonment with fine.', tags: ['murder', 'homicide', 'bns', 'killing'] },
  { id: '2',  section: 'Section 101', title: 'Culpable Homicide Not Amounting to Murder', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Whoever commits culpable homicide not amounting to murder shall be punished. Replaces IPC Section 304.', punishment: 'Up to 10 years, or life imprisonment, with fine.', tags: ['homicide', 'manslaughter', 'bns'] },
  { id: '3',  section: 'Section 103', title: 'Punishment for Causing Death by Negligence', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Whoever causes death by negligence — including rash driving — shall be punished. Replaces IPC 304A. Doctors, drivers covered.', punishment: 'Up to 5 years imprisonment and fine. Rash driving causing death: up to 7 years.', tags: ['accident', 'negligence', 'rash driving', 'bns', 'death'] },
  { id: '4',  section: 'Section 115', title: 'Hurt', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Whoever causes bodily pain, disease, or infirmity to any person is said to cause hurt. Replaces IPC Section 323.', punishment: 'Up to 1 year imprisonment or fine up to ₹10,000, or both.', tags: ['hurt', 'assault', 'injury', 'bns', 'fight'] },
  { id: '5',  section: 'Section 117', title: 'Grievous Hurt', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Voluntarily causing grievous hurt — emasculation, permanent blindness, fractures, etc. Replaces IPC Section 325.', punishment: 'Up to 7 years imprisonment and fine.', tags: ['grievous hurt', 'serious injury', 'bns'] },
  { id: '6',  section: 'Section 63', title: 'Rape', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'A man is said to commit rape if he penetrates without consent or under coercion. Replaces IPC Section 376. Minimum 10 years.', punishment: 'Minimum 10 years, extendable to life imprisonment; death in aggravated cases.', tags: ['rape', 'sexual assault', 'bns', 'women', 'consent'] },
  { id: '7',  section: 'Section 64', title: 'Punishment for Rape (Aggravated)', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Rape committed by police officer, public servant, on a woman under 12 or 16 years, or gang rape. Replaces IPC 376A/B/C/D.', punishment: 'Minimum 20 years to life imprisonment or death.', tags: ['gang rape', 'aggravated rape', 'bns', 'minors'] },
  { id: '8',  section: 'Section 74', title: 'Assault or Use of Criminal Force on Woman', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Intending to outrage the modesty of a woman — touching, gestures, words. Replaces IPC Section 354.', punishment: 'Up to 5 years imprisonment and fine.', tags: ['molestation', 'assault', 'woman', 'modesty', 'bns'] },
  { id: '9',  section: 'Section 75', title: 'Sexual Harassment', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Unwelcome physical contact, demand for sexual favour, showing pornography, or making sexually coloured remarks. Replaces IPC 354A.', punishment: 'Up to 3 years imprisonment and/or fine.', tags: ['harassment', 'sexual harassment', 'workplace', 'bns'] },
  { id: '10', section: 'Section 76', title: 'Voyeurism', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Watching or capturing images of a woman in private acts without her consent. Replaces IPC 354C.', punishment: '1–3 years (first offence); 3–7 years (repeat offence).', tags: ['voyeurism', 'privacy', 'bns', 'women'] },
  { id: '11', section: 'Section 77', title: 'Stalking', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Repeatedly following, contacting, or monitoring a woman despite her disinterest or online stalking. Replaces IPC 354D.', punishment: 'Up to 3 years (first offence); up to 5 years (repeat).', tags: ['stalking', 'harassment', 'women', 'bns'] },
  { id: '12', section: 'Section 85', title: 'Cruelty by Husband or Relatives', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Subjecting a woman to cruelty — mental, physical, or harassment for dowry. Replaces IPC Section 498A.', punishment: 'Up to 3 years imprisonment and fine.', tags: ['domestic violence', 'cruelty', 'marriage', 'dowry', 'bns', 'wife'] },
  { id: '13', section: 'Section 80', title: 'Dowry Death', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Death of a woman within 7 years of marriage caused by burns, bodily injury or under suspicious circumstances related to dowry. Replaces IPC 304B.', punishment: 'Minimum 7 years, up to life imprisonment.', tags: ['dowry death', 'dowry', 'marriage', 'bns', 'wife'] },
  { id: '14', section: 'Section 303', title: 'Theft', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Taking moveable property out of another person\'s possession without consent, with intention to take dishonestly. Replaces IPC 378.', punishment: 'Up to 3 years imprisonment and/or fine.', tags: ['theft', 'stealing', 'property', 'bns'] },
  { id: '15', section: 'Section 309', title: 'Robbery', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Theft with force, threat, or causing wrongful restraint. Replaces IPC Section 390.', punishment: 'Up to 10 years imprisonment and fine.', tags: ['robbery', 'theft', 'force', 'bns'] },
  { id: '16', section: 'Section 310', title: 'Dacoity', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Five or more persons committing or attempting robbery. Replaces IPC Section 391.', punishment: 'Up to life imprisonment and fine.', tags: ['dacoity', 'robbery', 'gang', 'bns'] },
  { id: '17', section: 'Section 318', title: 'Cheating', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Cheating and inducing delivery of property, fraudulent inducement. Replaces IPC Section 420.', punishment: 'Up to 7 years imprisonment and fine.', tags: ['cheating', 'fraud', 'scam', 'bns', 'deception'] },
  { id: '18', section: 'Section 336', title: 'Forgery', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Making a false document or electronic record with intent to cause damage or fraud. Replaces IPC 463.', punishment: 'Up to 2 years imprisonment and/or fine.', tags: ['forgery', 'fake document', 'fraud', 'bns'] },
  { id: '19', section: 'Section 351', title: 'Criminal Intimidation', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'Threatening another person with injury to cause alarm or compel them to act. Replaces IPC 503.', punishment: 'Up to 2 years, or 7 years if threat to cause death/grievous hurt.', tags: ['threat', 'intimidation', 'extortion', 'bns'] },
  { id: '20', section: 'Section 195', title: 'Sedition / Acts against Unity', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'New provision replacing IPC 124A (sedition). Covers acts endangering sovereignty, unity or integrity of India, or armed rebellion.', punishment: 'Life imprisonment or up to 7 years, with fine.', tags: ['sedition', 'treason', 'bns', 'national security'] },
  { id: '21', section: 'Section 111', title: 'Organised Crime', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'New provision: syndicate criminal activity including kidnapping, extortion, land grabbing, cyber crime for financial gain. No equivalent in old IPC.', punishment: 'Minimum 5 years to life imprisonment; death if it causes death.', tags: ['organised crime', 'syndicate', 'mafia', 'bns'] },
  { id: '22', section: 'Section 113', title: 'Terrorist Act', act: 'Bharatiya Nyaya Sanhita (BNS)', summary: 'New provision: committing or abetting acts threatening unity, integrity, sovereignty or security of India, or causing terror.', punishment: 'Death or life imprisonment.', tags: ['terrorism', 'bns', 'national security', 'bomb'] },

  // ── BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS) 2023 — replaced CrPC ──
  { id: '23', section: 'Section 173', title: 'FIR — First Information Report', act: 'Bharatiya Nagarik Suraksha Sanhita (BNSS)', summary: 'Every cognizable offence must be reported to police who must register an FIR. Police cannot refuse. Replaces CrPC 154.', tags: ['fir', 'police', 'complaint', 'bnss', 'report'] },
  { id: '24', section: 'Section 479', title: 'Bail — Undertrial Prisoners', act: 'Bharatiya Nagarik Suraksha Sanhita (BNSS)', summary: 'New: Undertrial prisoners who have served half the maximum sentence for their offence are entitled to bail. First-time offenders get bail after 1/3rd. Replaces CrPC 436A.', tags: ['bail', 'undertrial', 'prison', 'bnss'] },
  { id: '25', section: 'Section 187', title: 'Arrest — Rights of Arrested Person', act: 'Bharatiya Nagarik Suraksha Sanhita (BNSS)', summary: 'Police must inform arrested person of grounds of arrest. Person has right to inform a friend or relative. Replaces CrPC 50.', tags: ['arrest', 'rights', 'police', 'bnss', 'custody'] },
  { id: '26', section: 'Section 43', title: 'Zero FIR', act: 'Bharatiya Nagarik Suraksha Sanhita (BNSS)', summary: 'Police must register FIR regardless of jurisdiction. FIR can be filed at any police station. Transfer to correct station later. New provision.', tags: ['zero fir', 'fir', 'police', 'bnss', 'jurisdiction'] },
  { id: '27', section: 'Section 530', title: 'Trial in Absentia', act: 'Bharatiya Nagarik Suraksha Sanhita (BNSS)', summary: 'New provision: courts can conduct trial and pass judgment even if accused is a proclaimed offender or absconding. Replaces partial provisions of CrPC.', tags: ['trial', 'absentia', 'fugitive', 'bnss'] },
  { id: '28', section: 'Section 125', title: 'Order for Maintenance of Wife and Children', act: 'Bharatiya Nagarik Suraksha Sanhita (BNSS)', summary: 'Magistrate may order monthly maintenance for wife, children or parents where the person has means but neglects to support them. Replaces CrPC 125.', punishment: 'Jail up to 1 month for non-payment.', tags: ['maintenance', 'alimony', 'family', 'bnss', 'divorce', 'wife', 'children'] },

  // ── BHARATIYA SAKSHYA ADHINIYAM (BSA) 2023 — replaced Evidence Act ──
  { id: '29', section: 'Section 57', title: 'Electronic Records as Evidence', act: 'Bharatiya Sakshya Adhiniyam (BSA)', summary: 'Electronic records including emails, WhatsApp messages, CCTV footage, digital documents are admissible as evidence. Replaces IT Act-amended Evidence Act S.65B.', tags: ['evidence', 'electronic', 'whatsapp', 'cctv', 'bsa', 'digital'] },
  { id: '30', section: 'Section 23', title: 'Admission — Confession to Police', act: 'Bharatiya Sakshya Adhiniyam (BSA)', summary: 'Confessions made to a police officer are not admissible in court. Confession must be voluntary and made before a Magistrate. Replaces Evidence Act 25-26.', tags: ['confession', 'police', 'evidence', 'bsa', 'admissible'] },

  // ── CONSUMER PROTECTION ACT 2019 ──
  { id: '31', section: 'Section 2(7)', title: 'Definition of Consumer', act: 'Consumer Protection Act 2019', summary: 'A person who buys goods or avails services for personal use, not for resale or commercial purpose. Online purchases included.', tags: ['consumer', 'buyer', 'online shopping', 'consumer protection'] },
  { id: '32', section: 'Section 35', title: 'Filing Consumer Complaint', act: 'Consumer Protection Act 2019', summary: 'Consumer can file complaint before District Commission (up to ₹1 crore), State Commission (₹1–10 crore), or National Commission (above ₹10 crore).', tags: ['consumer complaint', 'refund', 'defective product', 'consumer protection', 'forum'] },
  { id: '33', section: 'Section 47', title: 'Unfair Trade Practices', act: 'Consumer Protection Act 2019', summary: 'False advertising, misleading labelling, deceptive pricing, bait and switch tactics, and withholding relevant information constitute unfair trade practice.', punishment: 'Fine up to ₹10 lakhs; up to ₹50 lakhs for repeat offence.', tags: ['unfair trade', 'misleading ad', 'consumer protection', 'false advertising'] },
  { id: '34', section: 'Section 86', title: 'Product Liability', act: 'Consumer Protection Act 2019', summary: 'Manufacturer, seller or service provider is liable if a defective product causes harm or injury. Consumer can claim compensation.', tags: ['product liability', 'defective product', 'consumer protection', 'compensation'] },
  { id: '35', section: 'Section 94', title: 'E-Commerce Consumer Rights', act: 'Consumer Protection Act 2019', summary: 'E-commerce platforms must display all mandatory information. Sellers must honour cancellations. Grievance officer must be appointed. No fake reviews allowed.', tags: ['ecommerce', 'online shopping', 'consumer', 'amazon', 'flipkart', 'return'] },

  // ── INFORMATION TECHNOLOGY ACT 2000 (Amended 2023) ──
  { id: '36', section: 'Section 66', title: 'Computer-Related Offences', act: 'Information Technology Act 2000', summary: 'Hacking, data theft, introducing virus/malware, causing damage to computer systems. Minimum dishonest/fraudulent intent required.', punishment: 'Up to 3 years imprisonment and/or fine up to ₹5 lakhs.', tags: ['hacking', 'cybercrime', 'virus', 'malware', 'it act'] },
  { id: '37', section: 'Section 66A', title: 'Online Offensive Messages (Struck Down)', act: 'Information Technology Act 2000', summary: 'Section 66A was struck down by the Supreme Court in Shreya Singhal v. Union of India (2015) as unconstitutional. Cannot be used to arrest for social media posts.', tags: ['social media', 'it act', 'freedom of speech', '66a', 'struck down'] },
  { id: '38', section: 'Section 66C', title: 'Identity Theft', act: 'Information Technology Act 2000', summary: 'Fraudulently using another person\'s electronic signature, password, or unique identification feature.', punishment: 'Up to 3 years imprisonment and fine up to ₹1 lakh.', tags: ['identity theft', 'fraud', 'password', 'it act', 'cyber'] },
  { id: '39', section: 'Section 66D', title: 'Cheating by Personation Online', act: 'Information Technology Act 2000', summary: 'Using a computer resource to cheat by impersonating another person.', punishment: 'Up to 3 years imprisonment and fine up to ₹1 lakh.', tags: ['impersonation', 'fraud', 'fake account', 'it act', 'cyber'] },
  { id: '40', section: 'Section 66E', title: 'Violation of Privacy', act: 'Information Technology Act 2000', summary: 'Intentionally capturing, publishing or transmitting images of private areas of a person without consent.', punishment: 'Up to 3 years imprisonment and/or fine up to ₹2 lakhs.', tags: ['privacy', 'voyeurism', 'it act', 'image', 'photo'] },
  { id: '41', section: 'Section 67', title: 'Publishing Obscene Material Online', act: 'Information Technology Act 2000', summary: 'Publishing or transmitting obscene material in electronic form.', punishment: 'Up to 3 years and fine up to ₹5 lakhs (first offence); up to 5 years thereafter.', tags: ['obscene', 'pornography', 'it act', 'online', 'social media'] },
  { id: '42', section: 'Section 67B', title: 'Child Pornography Online', act: 'Information Technology Act 2000', summary: 'Creating, publishing, browsing or downloading child sexual abuse material (CSAM) or depicting children in sexual acts.', punishment: 'Up to 5 years and fine up to ₹10 lakhs (first offence); up to 7 years thereafter.', tags: ['child abuse', 'pornography', 'csam', 'it act', 'children'] },

  // ── POCSO ACT 2012 ──
  { id: '43', section: 'Section 4', title: 'Penetrative Sexual Assault on Child', act: 'POCSO Act 2012', summary: 'Any person who commits penetrative sexual assault on a child (under 18 years). Mandatory reporting of offence by anyone with knowledge.', punishment: 'Minimum 20 years, up to life imprisonment or death (if victim under 12).', tags: ['pocso', 'child abuse', 'sexual assault', 'minor', 'children'] },
  { id: '44', section: 'Section 7', title: 'Sexual Assault on Child', act: 'POCSO Act 2012', summary: 'Touching sexual body parts of a child or making child touch the accused\'s sexual parts.', punishment: 'Minimum 3 years, up to 5 years, and fine.', tags: ['pocso', 'child', 'molestation', 'sexual assault', 'minor'] },
  { id: '45', section: 'Section 11', title: 'Sexual Harassment of Child', act: 'POCSO Act 2012', summary: 'Making sexually coloured remarks, showing pornography, repeating or persistent following of a child.', punishment: 'Up to 3 years and fine.', tags: ['pocso', 'child harassment', 'sexual harassment', 'minor', 'stalking'] },

  // ── RIGHT TO INFORMATION ACT 2005 ──
  { id: '46', section: 'Section 6', title: 'Request for Information (RTI)', act: 'Right to Information Act 2005', summary: 'Any citizen can request information from any public authority. Request must be in writing. No reasons need to be given. Fee: ₹10 only.', tags: ['rti', 'right to information', 'government', 'transparency', 'public authority'] },
  { id: '47', section: 'Section 7', title: 'Time Limit for Providing Information', act: 'Right to Information Act 2005', summary: 'PIO must provide information within 30 days. If life or liberty is involved, within 48 hours. If rejected, reasons must be given.', tags: ['rti', 'time limit', 'information', 'pio', 'government'] },
  { id: '48', section: 'Section 20', title: 'Penalty for Non-Compliance of RTI', act: 'Right to Information Act 2005', summary: 'If PIO fails to provide information or provides false info, penalty of ₹250 per day up to ₹25,000 can be imposed. Compensation to applicant also possible.', punishment: 'Fine up to ₹25,000 on the PIO.', tags: ['rti', 'penalty', 'pio', 'fine', 'information'] },

  // ── DOMESTIC VIOLENCE ACT 2005 ──
  { id: '49', section: 'Section 3', title: 'Definition of Domestic Violence', act: 'Protection of Women from Domestic Violence Act 2005', summary: 'Physical, sexual, verbal, emotional or economic abuse against a woman in a domestic relationship. Includes harassment for dowry, threats, and controlling behaviour.', tags: ['domestic violence', 'abuse', 'marriage', 'wife', 'women', 'dv act'] },
  { id: '50', section: 'Section 12', title: 'Application for Protection Orders', act: 'Protection of Women from Domestic Violence Act 2005', summary: 'Aggrieved woman can file application before Magistrate for protection orders, residence orders, monetary relief, custody orders and compensation.', tags: ['domestic violence', 'protection order', 'women', 'magistrate', 'dv act'] },
  { id: '51', section: 'Section 17', title: 'Right to Shared Household', act: 'Protection of Women from Domestic Violence Act 2005', summary: 'An aggrieved woman has the right to reside in the shared household, whether or not she has any title or right in it.', tags: ['domestic violence', 'home', 'residence', 'women', 'shelter', 'dv act'] },

  // ── HINDU MARRIAGE ACT 1955 ──
  { id: '52', section: 'Section 13', title: 'Grounds for Divorce', act: 'Hindu Marriage Act 1955', summary: 'Grounds include adultery, cruelty, desertion (2+ years), conversion, unsound mind, venereal disease, or if no resumption of cohabitation after decree of separation.', tags: ['divorce', 'marriage', 'family law', 'hindu', 'cruelty', 'adultery'] },
  { id: '53', section: 'Section 13B', title: 'Mutual Consent Divorce', act: 'Hindu Marriage Act 1955', summary: 'Both parties may file for divorce by mutual consent after living separately for 1 year. Second motion after 6 months (waivable by Supreme Court).', tags: ['mutual consent divorce', 'divorce', 'marriage', 'hindu', 'separation'] },
  { id: '54', section: 'Section 24', title: 'Maintenance Pendente Lite', act: 'Hindu Marriage Act 1955', summary: 'Either spouse can claim interim maintenance and litigation expenses during pending matrimonial proceedings.', tags: ['maintenance', 'alimony', 'interim', 'marriage', 'divorce', 'hindu'] },

  // ── NEGOTIABLE INSTRUMENTS ACT ──
  { id: '55', section: 'Section 138', title: 'Dishonour of Cheque (Cheque Bounce)', act: 'Negotiable Instruments Act 1881', summary: 'Cheque returned unpaid due to insufficient funds or exceeds the arrangement agreed. Payee must send demand notice within 30 days of dishonour. Complaint within 1 month.', punishment: 'Up to 2 years imprisonment or fine up to twice the cheque amount, or both.', tags: ['cheque bounce', 'cheque dishonour', 'bank', 'ni act', 'payment'] },
  { id: '56', section: 'Section 141', title: 'Company Liability for Cheque Bounce', act: 'Negotiable Instruments Act 1881', summary: 'Every person who was responsible for the company\'s business at the time of the offence is also liable for cheque bounce.', punishment: 'Same as Section 138 — up to 2 years and/or double the cheque amount.', tags: ['cheque bounce', 'company', 'director', 'ni act'] },

  // ── RERA 2016 ──
  { id: '57', section: 'Section 18', title: 'Refund and Compensation by Builder', act: 'Real Estate (Regulation and Development) Act 2016 (RERA)', summary: 'If a promoter fails to complete or deliver possession on time, buyer is entitled to full refund with interest, or continue with project and get monthly interest for delay.', tags: ['rera', 'builder', 'possession', 'delay', 'refund', 'real estate', 'flat'] },
  { id: '58', section: 'Section 31', title: 'Filing Complaint Under RERA', act: 'Real Estate (Regulation and Development) Act 2016 (RERA)', summary: 'Any aggrieved homebuyer or association can file complaint against promoter or real estate agent before the RERA Authority of their state.', tags: ['rera', 'complaint', 'builder', 'homebuyer', 'real estate'] },
  { id: '59', section: 'Section 40', title: 'Recovery of Interest and Penalty Under RERA', act: 'Real Estate (Regulation and Development) Act 2016 (RERA)', summary: 'Amount due from promoter shall be recovered as arrears of land revenue by the appropriate government if builder defaults on RERA order.', tags: ['rera', 'recovery', 'penalty', 'builder', 'real estate'] },

  // ── MOTOR VEHICLES ACT 1988 ──
  { id: '60', section: 'Section 184', title: 'Dangerous Driving', act: 'Motor Vehicles Act 1988', summary: 'Driving at dangerous speeds or in a manner dangerous to public. Includes racing on public roads, drunk driving, and reckless overtaking.', punishment: 'Up to 1 year or fine up to ₹5,000 (first offence); up to 2 years or ₹10,000 (repeat).', tags: ['rash driving', 'traffic', 'motor vehicle', 'accident', 'dangerous driving'] },
  { id: '61', section: 'Section 185', title: 'Driving Under Influence of Alcohol or Drugs', act: 'Motor Vehicles Act 1988', summary: 'Driving with blood alcohol content exceeding 30 mg per 100 ml of blood. Zero tolerance for commercial vehicle drivers.', punishment: 'Up to 6 months or fine up to ₹10,000 (first offence); up to 2 years or ₹15,000 (repeat).', tags: ['drunk driving', 'alcohol', 'traffic', 'motor vehicle', 'dui'] },
  { id: '62', section: 'Section 166', title: 'Motor Accident Compensation Claim', act: 'Motor Vehicles Act 1988', summary: 'Any person who suffered loss or injury in a motor accident can claim compensation before Motor Accident Claims Tribunal (MACT). No-fault liability applies.', tags: ['accident', 'compensation', 'mact', 'motor vehicle', 'claim', 'insurance'] },

  // ── LABOUR CODES 2020 ──
  { id: '63', section: 'Section 8', title: 'Written Employment Contract', act: 'Code on Wages 2019', summary: 'Employer must provide appointment letter within 3 months. Includes wages, duty timings, nature of work and other terms. New provision for all workers.', tags: ['employment', 'contract', 'wages', 'appointment letter', 'labour'] },
  { id: '64', section: 'Section 43', title: 'Gratuity Entitlement', act: 'Code on Social Security 2020', summary: 'Employee is entitled to gratuity after completing 5 years of continuous service. Formula: 15 days last drawn salary × years of service / 26.', tags: ['gratuity', 'employment', 'labour', 'salary', 'social security'] },
  { id: '65', section: 'Section 20', title: 'Equal Remuneration', act: 'Code on Wages 2019', summary: 'No employer shall pay to any employee, on the basis of gender, a remuneration less than that paid to another employee performing same work of similar nature.', tags: ['equal pay', 'gender', 'discrimination', 'wages', 'women', 'labour'] },

  // ── CONSTITUTION OF INDIA ──
  { id: '66', section: 'Article 21', title: 'Right to Life and Personal Liberty', act: 'Constitution of India', summary: 'No person shall be deprived of his life or personal liberty except according to procedure established by law. Includes right to dignity, privacy (Puttaswamy), livelihood, and speedy trial.', tags: ['fundamental rights', 'constitution', 'right to life', 'liberty', 'privacy', 'article 21'] },
  { id: '67', section: 'Article 32', title: 'Right to Constitutional Remedies (Writ Petition)', act: 'Constitution of India', summary: 'Right to move Supreme Court to enforce fundamental rights. SC can issue writs — Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto.', tags: ['writ', 'habeas corpus', 'sc', 'constitution', 'fundamental rights', 'remedy'] },
  { id: '68', section: 'Article 226', title: 'High Court Writ Jurisdiction', act: 'Constitution of India', summary: 'High Courts can issue writs for enforcement of fundamental rights or any other purpose. Broader jurisdiction than Supreme Court under Article 32.', tags: ['writ', 'high court', 'constitution', 'fundamental rights', 'habeas corpus'] },
  { id: '69', section: 'Article 14', title: 'Right to Equality', act: 'Constitution of India', summary: 'The State shall not deny to any person equality before law or equal protection of laws. Applicable against state action; forms review basis for laws.', tags: ['equality', 'constitution', 'discrimination', 'fundamental rights', 'article 14'] },
  { id: '70', section: 'Article 19', title: 'Freedom of Speech and Expression', act: 'Constitution of India', summary: 'Citizens have freedoms of speech, assembly, association, movement, residence, and profession. Subject to reasonable restrictions under state law.', tags: ['freedom of speech', 'expression', 'constitution', 'fundamental rights', 'media', 'press'] },
];

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<LegalEntry | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = query.length < 2 ? legalDatabase : legalDatabase.filter(entry =>
    entry.title.toLowerCase().includes(query.toLowerCase()) ||
    entry.section.toLowerCase().includes(query.toLowerCase()) ||
    entry.act.toLowerCase().includes(query.toLowerCase()) ||
    entry.tags.some(t => t.includes(query.toLowerCase()))
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const iconFor = (act: string) => {
    if (act.includes('Penal')) return <Gavel size={18} />;
    if (act.includes('Marriage') || act.includes('Criminal') || act.includes('Children')) return <BookOpen size={18} />;
    return <Scale size={18} />;
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <section style={{ padding: '4rem 0 2rem' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label">Legal Database</div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em', fontFamily: '"Playfair Display", Georgia, serif' }}>
              Search Indian <span style={{ WebkitTextStroke: '1.5px var(--foreground)', color: 'transparent' }}>Laws</span>
            </h1>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '2.5rem', fontSize: '1rem', maxWidth: '600px' }}>
              Instantly search across IPC sections, acts, and legal provisions. Enter a keyword, section number, or describe your situation.
            </p>

            <div style={{ position: 'relative', maxWidth: '720px' }}>
              <SearchIcon size={22} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
              <input
                type="text"
                placeholder="e.g. 'theft', 'Section 420', 'divorce', 'cheque bounce'..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(null); setPage(1); }}
                style={{
                  width: '100%',
                  padding: '1.1rem 1.5rem 1.1rem 4rem',
                  background: 'var(--muted)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '0.75rem',
                  color: 'var(--foreground)',
                  fontSize: '1rem',
                }}
              />
            </div>

            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.82rem', marginTop: '0.75rem' }}>
              Showing {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '1.5rem 0 6rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <AnimatePresence>
              {paginated.map((entry, idx) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="glass-card"
                  onClick={() => setSelected(selected?.id === entry.id ? null : entry)}
                  style={{ padding: '1.25rem 1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', borderColor: selected?.id === entry.id ? 'rgba(255,255,255,0.2)' : undefined }}
                >
                  <div style={{ width: '42px', height: '42px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--glass-border)' }}>
                    {iconFor(entry.act)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{entry.section}</span>
                      <span style={{ color: 'var(--muted-foreground)', fontSize: '0.82rem' }}>— {entry.act}</span>
                    </div>
                    <div style={{ color: 'var(--foreground)', fontSize: '0.92rem', marginTop: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.title}</div>
                  </div>
                  <ChevronRight size={18} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                </motion.div>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted-foreground)' }}>
                <FileText size={40} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                <p>No results found for "{query}"</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Try different keywords or browse all sections above.</p>
              </div>
            )}

            {/* Pagination Bar */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => { setPage(p => Math.max(1, p - 1)); setSelected(null); }}
                  disabled={page === 1}
                  style={{
                    padding: '0.45rem 0.9rem', borderRadius: '0.5rem', border: '1px solid var(--border)',
                    background: 'var(--muted)', color: page === 1 ? 'var(--muted-foreground)' : 'var(--foreground)',
                    cursor: page === 1 ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontWeight: 600,
                    opacity: page === 1 ? 0.4 : 1, transition: 'all 0.2s'
                  }}
                >← Prev</button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => { setPage(p); setSelected(null); }}
                    style={{
                      width: '36px', height: '36px', borderRadius: '0.5rem',
                      border: p === page ? '1px solid var(--foreground)' : '1px solid var(--border)',
                      background: p === page ? 'var(--foreground)' : 'var(--muted)',
                      color: p === page ? 'var(--background)' : 'var(--muted-foreground)',
                      cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, transition: 'all 0.2s'
                    }}
                  >{p}</button>
                ))}

                <button
                  onClick={() => { setPage(p => Math.min(totalPages, p + 1)); setSelected(null); }}
                  disabled={page === totalPages}
                  style={{
                    padding: '0.45rem 0.9rem', borderRadius: '0.5rem', border: '1px solid var(--border)',
                    background: 'var(--muted)', color: page === totalPages ? 'var(--muted-foreground)' : 'var(--foreground)',
                    cursor: page === totalPages ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontWeight: 600,
                    opacity: page === totalPages ? 0.4 : 1, transition: 'all 0.2s'
                  }}
                >Next →</button>
              </div>
            )}
          </div>

          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card"
              style={{ padding: '2rem', position: 'sticky', top: '100px' }}
            >
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{selected.section}</span>
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>{selected.title}</h2>
              <div style={{ background: 'var(--muted)', borderRadius: '0.5rem', padding: '0.4rem 0.8rem', display: 'inline-block', fontSize: '0.8rem', color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
                {selected.act}
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-foreground)', marginBottom: '0.6rem' }}>Legal Definition</h4>
                <p style={{ lineHeight: 1.75, fontSize: '0.95rem', color: 'var(--foreground)' }}>{selected.summary}</p>
              </div>
              {selected.punishment && (
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-foreground)', marginBottom: '0.6rem' }}>Punishment</h4>
                  <p style={{ lineHeight: 1.65, fontSize: '0.95rem' }}>{selected.punishment}</p>
                </div>
              )}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-foreground)', marginBottom: '0.6rem' }}>Related Tags</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selected.tags.map(tag => (
                    <span key={tag} style={{ background: 'var(--muted)', padding: '0.25rem 0.65rem', borderRadius: '2rem', fontSize: '0.78rem', color: 'var(--muted-foreground)', cursor: 'pointer' }} onClick={() => setQuery(tag)}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Search;
