export interface Property {
  id: string
  title: string
  address: string
  city: string
  county: string
  state: string
  zip: string
  bedrooms: number
  bathrooms: number
  rent: number
  squareFeet: number
  availableDate: string
  description: string
  images: string[]
  amenities: string[]
  accessibilityFeatures: string[]
  subsidyPrograms: string[]
  petPolicy: string
  utilities: string[]
  landlordId: string
  landlordName: string
  landlordPhone: string
  landlordEmail: string
  waitlistOpen: boolean
  waitlistCount: number
  lat: number
  lng: number
  status: 'available' | 'pending' | 'occupied'
  createdAt: string
}

export interface WaitlistEntry {
  id: string
  propertyId: string
  propertyTitle: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  caseManagerId: string
  caseManagerName: string
  status: 'pending' | 'approved' | 'rejected' | 'housed'
  priority: 'standard' | 'high' | 'urgent'
  submittedAt: string
  notes: string
  householdSize: number
  income: number
}

export interface User {
  id: string
  name: string
  email: string
  role: 'public' | 'landlord' | 'case_manager' | 'admin'
  phone?: string
  organization?: string
  createdAt: string
}

export interface Referral {
  id: string
  clientName: string
  propertyId: string
  propertyTitle: string
  caseManagerId: string
  status: 'submitted' | 'under_review' | 'approved' | 'denied'
  submittedAt: string
  notes: string
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Sunny Oak Apartments - Unit 2B',
    address: '123 Oak Street',
    city: 'Chicago',
    county: 'Cook',
    state: 'IL',
    zip: '60601',
    bedrooms: 2,
    bathrooms: 1,
    rent: 1200,
    squareFeet: 950,
    availableDate: '2026-04-01',
    description: 'Bright and spacious 2-bedroom apartment in downtown Chicago. Recently renovated with modern appliances and hardwood floors throughout. Close to public transportation and shopping.',
    images: ['/placeholder-apartment-1.jpg'],
    amenities: ['In-unit Laundry', 'Central AC', 'Parking Available', 'Fitness Center'],
    accessibilityFeatures: ['Wheelchair Accessible', 'Elevator Access'],
    subsidyPrograms: ['Section 8', 'Housing Choice Voucher'],
    petPolicy: 'Cats allowed, dogs under 25lbs',
    utilities: ['Water Included', 'Trash Included'],
    landlordId: 'l1',
    landlordName: 'Oak Property Management',
    landlordPhone: '312-555-0101',
    landlordEmail: 'info@oakproperties.com',
    waitlistOpen: true,
    waitlistCount: 12,
    lat: 41.8781,
    lng: -87.6298,
    status: 'available',
    createdAt: '2026-02-15'
  },
  {
    id: '2',
    title: 'Riverside Gardens - Unit 105',
    address: '456 River Road',
    city: 'Aurora',
    county: 'Kane',
    state: 'IL',
    zip: '60505',
    bedrooms: 3,
    bathrooms: 2,
    rent: 1450,
    squareFeet: 1200,
    availableDate: '2026-03-15',
    description: 'Family-friendly 3-bedroom townhouse with private backyard. Quiet neighborhood near excellent schools and parks.',
    images: ['/placeholder-apartment-2.jpg'],
    amenities: ['Private Backyard', 'Garage', 'Central AC', 'Dishwasher'],
    accessibilityFeatures: ['Ground Floor Unit'],
    subsidyPrograms: ['Section 8', 'LIHTC'],
    petPolicy: 'Pets welcome',
    utilities: ['Tenant pays all utilities'],
    landlordId: 'l2',
    landlordName: 'Riverside Housing LLC',
    landlordPhone: '630-555-0202',
    landlordEmail: 'leasing@riversidegardens.com',
    waitlistOpen: true,
    waitlistCount: 8,
    lat: 41.7606,
    lng: -88.3201,
    status: 'available',
    createdAt: '2026-02-20'
  },
  {
    id: '3',
    title: 'Lincoln Park Studios',
    address: '789 Lincoln Ave',
    city: 'Chicago',
    county: 'Cook',
    state: 'IL',
    zip: '60614',
    bedrooms: 0,
    bathrooms: 1,
    rent: 850,
    squareFeet: 450,
    availableDate: '2026-03-01',
    description: 'Cozy studio apartment in trendy Lincoln Park. Perfect for singles or students. Walking distance to CTA.',
    images: ['/placeholder-apartment-3.jpg'],
    amenities: ['Rooftop Deck', 'Bike Storage', 'Package Lockers'],
    accessibilityFeatures: ['Elevator Access'],
    subsidyPrograms: ['Housing Choice Voucher'],
    petPolicy: 'Small pets allowed',
    utilities: ['Heat Included', 'Water Included'],
    landlordId: 'l3',
    landlordName: 'Urban Living Chicago',
    landlordPhone: '312-555-0303',
    landlordEmail: 'info@urbanliving.com',
    waitlistOpen: false,
    waitlistCount: 0,
    lat: 41.9214,
    lng: -87.6513,
    status: 'available',
    createdAt: '2026-02-10'
  },
  {
    id: '4',
    title: 'Springfield Senior Housing',
    address: '321 Capitol Drive',
    city: 'Springfield',
    county: 'Sangamon',
    state: 'IL',
    zip: '62701',
    bedrooms: 1,
    bathrooms: 1,
    rent: 750,
    squareFeet: 650,
    availableDate: '2026-04-15',
    description: 'Senior-friendly 1-bedroom apartment with 24-hour emergency services. Community room and scheduled transportation available.',
    images: ['/placeholder-apartment-4.jpg'],
    amenities: ['Community Room', 'Transportation Services', 'On-site Laundry', 'Emergency Pull Cords'],
    accessibilityFeatures: ['Wheelchair Accessible', 'Walk-in Shower', 'Grab Bars', 'Elevator Access'],
    subsidyPrograms: ['Section 202', 'Section 8'],
    petPolicy: 'Small pets allowed',
    utilities: ['All Utilities Included'],
    landlordId: 'l4',
    landlordName: 'Capitol Senior Living',
    landlordPhone: '217-555-0404',
    landlordEmail: 'info@capitolsenior.org',
    waitlistOpen: true,
    waitlistCount: 25,
    lat: 39.7817,
    lng: -89.6501,
    status: 'available',
    createdAt: '2026-01-25'
  },
  {
    id: '5',
    title: 'Peoria Family Homes',
    address: '555 Main Street',
    city: 'Peoria',
    county: 'Peoria',
    state: 'IL',
    zip: '61602',
    bedrooms: 4,
    bathrooms: 2,
    rent: 1600,
    squareFeet: 1800,
    availableDate: '2026-05-01',
    description: 'Spacious 4-bedroom single-family home perfect for larger families. Large backyard and attached garage.',
    images: ['/placeholder-apartment-5.jpg'],
    amenities: ['Attached Garage', 'Large Backyard', 'Central AC', 'Basement Storage'],
    accessibilityFeatures: [],
    subsidyPrograms: ['Section 8', 'Housing Choice Voucher'],
    petPolicy: 'Pets negotiable',
    utilities: ['Tenant pays all utilities'],
    landlordId: 'l5',
    landlordName: 'Peoria Property Group',
    landlordPhone: '309-555-0505',
    landlordEmail: 'rentals@peoriaproperties.com',
    waitlistOpen: true,
    waitlistCount: 5,
    lat: 40.6936,
    lng: -89.5890,
    status: 'available',
    createdAt: '2026-02-28'
  },
  {
    id: '6',
    title: 'Rockford Accessible Living',
    address: '888 State Street',
    city: 'Rockford',
    county: 'Winnebago',
    state: 'IL',
    zip: '61101',
    bedrooms: 2,
    bathrooms: 1,
    rent: 1100,
    squareFeet: 900,
    availableDate: '2026-03-20',
    description: 'Fully accessible 2-bedroom apartment designed for residents with mobility needs. Roll-in shower and lowered countertops.',
    images: ['/placeholder-apartment-6.jpg'],
    amenities: ['Accessible Kitchen', 'Roll-in Shower', 'Parking', 'On-site Management'],
    accessibilityFeatures: ['Wheelchair Accessible', 'Roll-in Shower', 'Lowered Countertops', 'Wide Doorways', 'Elevator Access'],
    subsidyPrograms: ['Section 811', 'Section 8'],
    petPolicy: 'Service animals welcome',
    utilities: ['Water Included', 'Heat Included'],
    landlordId: 'l6',
    landlordName: 'Accessible Housing Partners',
    landlordPhone: '815-555-0606',
    landlordEmail: 'info@accessiblehousing.org',
    waitlistOpen: true,
    waitlistCount: 15,
    lat: 42.2711,
    lng: -89.0940,
    status: 'available',
    createdAt: '2026-02-05'
  }
]

export const mockWaitlist: WaitlistEntry[] = [
  {
    id: 'w1',
    propertyId: '1',
    propertyTitle: 'Sunny Oak Apartments - Unit 2B',
    applicantName: 'Maria Garcia',
    applicantEmail: 'maria.garcia@email.com',
    applicantPhone: '312-555-1001',
    caseManagerId: 'cm1',
    caseManagerName: 'Sarah Johnson',
    status: 'pending',
    priority: 'high',
    submittedAt: '2026-03-01',
    notes: 'Currently in temporary housing. Needs permanent placement within 60 days.',
    householdSize: 3,
    income: 28000
  },
  {
    id: 'w2',
    propertyId: '1',
    propertyTitle: 'Sunny Oak Apartments - Unit 2B',
    applicantName: 'James Wilson',
    applicantEmail: 'james.wilson@email.com',
    applicantPhone: '312-555-1002',
    caseManagerId: 'cm2',
    caseManagerName: 'Michael Brown',
    status: 'approved',
    priority: 'standard',
    submittedAt: '2026-02-28',
    notes: 'All documentation verified. Background check passed.',
    householdSize: 2,
    income: 32000
  },
  {
    id: 'w3',
    propertyId: '2',
    propertyTitle: 'Riverside Gardens - Unit 105',
    applicantName: 'Linda Thompson',
    applicantEmail: 'linda.t@email.com',
    applicantPhone: '630-555-1003',
    caseManagerId: 'cm1',
    caseManagerName: 'Sarah Johnson',
    status: 'pending',
    priority: 'urgent',
    submittedAt: '2026-03-05',
    notes: 'Family with young children. Current housing situation is unsafe.',
    householdSize: 5,
    income: 42000
  },
  {
    id: 'w4',
    propertyId: '4',
    propertyTitle: 'Springfield Senior Housing',
    applicantName: 'Robert Davis',
    applicantEmail: 'robert.davis@email.com',
    applicantPhone: '217-555-1004',
    caseManagerId: 'cm3',
    caseManagerName: 'Jennifer Lee',
    status: 'housed',
    priority: 'standard',
    submittedAt: '2026-02-15',
    notes: 'Successfully placed. Move-in date: March 1, 2026.',
    householdSize: 1,
    income: 18000
  },
  {
    id: 'w5',
    propertyId: '6',
    propertyTitle: 'Rockford Accessible Living',
    applicantName: 'Patricia Martinez',
    applicantEmail: 'patricia.m@email.com',
    applicantPhone: '815-555-1005',
    caseManagerId: 'cm2',
    caseManagerName: 'Michael Brown',
    status: 'pending',
    priority: 'high',
    submittedAt: '2026-03-08',
    notes: 'Requires wheelchair accessible unit. Veteran.',
    householdSize: 1,
    income: 24000
  }
]

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    role: 'public',
    phone: '312-555-2001',
    createdAt: '2026-01-15'
  },
  {
    id: 'l1',
    name: 'Oak Property Management',
    email: 'info@oakproperties.com',
    role: 'landlord',
    phone: '312-555-0101',
    organization: 'Oak Property Management LLC',
    createdAt: '2025-06-01'
  },
  {
    id: 'cm1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@agency.org',
    role: 'case_manager',
    phone: '312-555-3001',
    organization: 'Chicago Housing Authority',
    createdAt: '2025-08-15'
  },
  {
    id: 'cm2',
    name: 'Michael Brown',
    email: 'michael.brown@agency.org',
    role: 'case_manager',
    phone: '312-555-3002',
    organization: 'Catholic Charities',
    createdAt: '2025-09-01'
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@ihda.org',
    role: 'admin',
    phone: '312-555-4001',
    organization: 'IHDA',
    createdAt: '2025-01-01'
  }
]

export const mockReferrals: Referral[] = [
  {
    id: 'r1',
    clientName: 'Maria Garcia',
    propertyId: '1',
    propertyTitle: 'Sunny Oak Apartments - Unit 2B',
    caseManagerId: 'cm1',
    status: 'under_review',
    submittedAt: '2026-03-01',
    notes: 'Priority placement needed'
  },
  {
    id: 'r2',
    clientName: 'Linda Thompson',
    propertyId: '2',
    propertyTitle: 'Riverside Gardens - Unit 105',
    caseManagerId: 'cm1',
    status: 'submitted',
    submittedAt: '2026-03-05',
    notes: 'Large family, needs 3+ bedrooms'
  },
  {
    id: 'r3',
    clientName: 'James Wilson',
    propertyId: '1',
    propertyTitle: 'Sunny Oak Apartments - Unit 2B',
    caseManagerId: 'cm2',
    status: 'approved',
    submittedAt: '2026-02-28',
    notes: 'All documentation complete'
  }
]

export const illinoisCounties = [
  'Adams', 'Alexander', 'Bond', 'Boone', 'Brown', 'Bureau', 'Calhoun', 'Carroll',
  'Cass', 'Champaign', 'Christian', 'Clark', 'Clay', 'Clinton', 'Coles', 'Cook',
  'Crawford', 'Cumberland', 'DeKalb', 'DeWitt', 'Douglas', 'DuPage', 'Edgar',
  'Edwards', 'Effingham', 'Fayette', 'Ford', 'Franklin', 'Fulton', 'Gallatin',
  'Greene', 'Grundy', 'Hamilton', 'Hancock', 'Hardin', 'Henderson', 'Henry',
  'Iroquois', 'Jackson', 'Jasper', 'Jefferson', 'Jersey', 'Jo Daviess', 'Johnson',
  'Kane', 'Kankakee', 'Kendall', 'Knox', 'Lake', 'LaSalle', 'Lawrence', 'Lee',
  'Livingston', 'Logan', 'Macon', 'Macoupin', 'Madison', 'Marion', 'Marshall',
  'Mason', 'Massac', 'McDonough', 'McHenry', 'McLean', 'Menard', 'Mercer', 'Monroe',
  'Montgomery', 'Morgan', 'Moultrie', 'Ogle', 'Peoria', 'Perry', 'Piatt', 'Pike',
  'Pope', 'Pulaski', 'Putnam', 'Randolph', 'Richland', 'Rock Island', 'Saline',
  'Sangamon', 'Schuyler', 'Scott', 'Shelby', 'St. Clair', 'Stark', 'Stephenson',
  'Tazewell', 'Union', 'Vermilion', 'Wabash', 'Warren', 'Washington', 'Wayne',
  'White', 'Whiteside', 'Will', 'Williamson', 'Winnebago', 'Woodford'
]

export const subsidyPrograms = [
  'Section 8',
  'Housing Choice Voucher',
  'LIHTC',
  'Section 202',
  'Section 811',
  'HOME Program',
  'CDBG',
  'Public Housing'
]

export const accessibilityOptions = [
  'Wheelchair Accessible',
  'Elevator Access',
  'Roll-in Shower',
  'Grab Bars',
  'Walk-in Shower',
  'Lowered Countertops',
  'Wide Doorways',
  'Ground Floor Unit',
  'Visual Alerts',
  'Hearing Accessible'
]
