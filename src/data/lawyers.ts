export interface Lawyer {
  id: string;
  name: string;
  specialization: string[];
  location: string;
  experience: number;
  phone: string;
  email: string;
  fees: string;
  languages: string[];
  bio: string;
}

export const lawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Adv. Ramesh Kumar',
    specialization: ['Criminal Law', 'Civil Litigation'],
    location: 'Delhi',
    experience: 15,
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@lawrato.com',
    fees: '₹2000 - ₹5000',
    languages: ['Hindi', 'English', 'Punjabi'],
    bio: 'Specialist in criminal defense and property disputes with over 15 years of practice at the Delhi High Court.'
  },
  {
    id: '2',
    name: 'Adv. Priya Sharma',
    specialization: ['Family Law', 'Corporate Law'],
    location: 'Mumbai',
    experience: 10,
    phone: '+91 98111 22334',
    email: 'priya.sharma@legalmail.in',
    fees: '₹1500 - ₹4000',
    languages: ['English', 'Marathi', 'Hindi'],
    bio: 'Expert in matrimonial disputes and corporate compliance. Dedicated to providing pocket-friendly legal aid.'
  },
  {
    id: '3',
    name: 'Adv. Anjali Deshmukh',
    specialization: ['Cyber Law', 'Intellectual Property'],
    location: 'Bangalore',
    experience: 8,
    phone: '+91 77223 34455',
    email: 'anjali.d@cyberlawindia.com',
    fees: '₹3000 - ₹6000',
    languages: ['English', 'Kannada', 'Hindi'],
    bio: 'Specialized in tech law, data protection, and IP rights for startups.'
  },
  {
    id: '4',
    name: 'Adv. Vikram Singh',
    specialization: ['Real Estate Law', 'Consumer Court'],
    location: 'Gurugram',
    experience: 12,
    phone: '+91 91122 33445',
    email: 'vikram.property@lawfirm.com',
    fees: '₹2500 - ₹5000',
    languages: ['Hindi', 'English'],
    bio: 'Helping citizens with RERA disputes and consumer protection cases.'
  },
  {
    id: '5',
    name: 'Adv. Sneha Reddy',
    specialization: ['Labor Law', 'Human Rights'],
    location: 'Hyderabad',
    experience: 7,
    phone: '+91 88998 87766',
    email: 'sneha.reddy@laborlawyer.in',
    fees: '₹1000 - ₹3000',
    languages: ['Telugu', 'English', 'Hindi'],
    bio: 'Passionate advocate for employee rights and social justice.'
  },
  {
    id: '6',
    name: 'Adv. Arjun Mehra',
    specialization: ['Tax Law', 'Banking Law'],
    location: 'Delhi',
    experience: 20,
    phone: '+91 99887 76655',
    email: 'arjun.mehra@taxpro.net',
    fees: '₹5000 - ₹10000',
    languages: ['English', 'Hindi'],
    bio: 'Former senior counsel with extensive experience in GST and direct tax litigation.'
  }
];
