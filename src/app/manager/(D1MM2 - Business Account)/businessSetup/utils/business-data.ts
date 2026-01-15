// Define shared option type
export interface Option {
  label: string;
  value: string;
}

// Business types as options
export enum BusinessTypeValue {
  Gym = 'Gym/Fitness Centre',
  Yoga = 'Yoga Studio',
  Wellness = 'Wellness Center',
  MMA = 'Mixed Martial Arts (MMA) & Boxing Gym',
  Sports = 'Sports Academy or Training Institute',
  Dance = 'Dance/Fitness Class Studio',
  Physio = 'Physiotherapy Clinic'
}

export const BUSINESS_TYPES: Option[] = [
  { value: BusinessTypeValue.Gym, label: 'Gym/Fitness Centre' },
  { value: BusinessTypeValue.Yoga, label: 'Yoga Studio' },
  { value: BusinessTypeValue.Wellness, label: 'Wellness Center' },
  { value: BusinessTypeValue.MMA, label: 'Mixed Martial Arts (MMA) & Boxing Gym' },
  { value: BusinessTypeValue.Sports, label: 'Sports Academy or Training Institute' },
  { value: BusinessTypeValue.Dance, label: 'Dance/Fitness Class Studio' },
  { value: BusinessTypeValue.Physio, label: 'Physiotherapy Clinic' }
];

// Business services mapped to business types
export type BusinessServices = Record<BusinessTypeValue, Option[]>;

export const SERVICES: BusinessServices = {
  [BusinessTypeValue.Gym]: [
    { label: 'Strength Training', value: 'Strength Training' },
    { label: 'Cardio Training', value: 'Cardio Training' },
    { label: 'Personal Training', value: 'Personal Training' },
    { label: 'Group Classes', value: 'Group Classes' },
    { label: 'Nutritional Coaching', value: 'Nutritional Coaching' },
    { label: 'Physical Therapy', value: 'Physical Therapy' },
    { label: 'CrossFit Training', value: 'CrossFit Training' },
    { label: 'Kickboxing', value: 'Kickboxing' },
    { label: 'Indoor Cycling/Spin Classes', value: 'Indoor Cycling/Spin Classes' },
    { label: 'Functional Training (TRX, Kettlebells, etc.)', value: 'Functional Training (TRX, Kettlebells, etc.)' },
    { label: 'Massage Therapy', value: 'Massage Therapy' },
    { label: 'Spa & Wellness', value: 'Spa & Wellness' },
    { label: 'Swimming Pool Access', value: 'Swimming Pool Access' },
    { label: 'Sauna/Steam Room', value: 'Sauna/Steam Room' },
    { label: 'Health Assessments', value: 'Health Assessments' },
  ],
  [BusinessTypeValue.Yoga]: [
    { label: "Hatha Yoga", value: "Hatha Yoga" },
    { label: "Vinyasa Flow", value: "Vinyasa Flow" },
    { label: "Power Yoga", value: "Power Yoga" },
    { label: "Yin Yoga", value: "Yin Yoga" },
    { label: "Ashtanga Yoga", value: "Ashtanga Yoga" },
    { label: "Restorative Yoga", value: "Restorative Yoga" },
    { label: "Prenatal Yoga", value: "Prenatal Yoga" },
    { label: "Meditation/Mindfulness", value: "Meditation/Mindfulness" },
    { label: "Breathing Techniques (Pranayama)", value: "Breathing Techniques (Pranayama)" },
    { label: "Yoga Teacher Training", value: "Yoga Teacher Training" },
    { label: "Workshops & Retreats", value: "Workshops & Retreats" }
  ],
  [BusinessTypeValue.Wellness]: [
    { label: "Massage Therapy", value: "Massage Therapy" },
    { label: "Spa Services (Facials, Body Treatments)", value: "Spa Services (Facials, Body Treatments)" },
    { label: "Sauna & Steam Room", value: "Sauna & Steam Room" },
    { label: "Nutritional Counseling", value: "Nutritional Counseling" },
    { label: "Reiki Therapy", value: "Reiki Therapy" },
    { label: "Acupuncture", value: "Acupuncture" },
    { label: "Chiropractic Care", value: "Chiropractic Care" },
    { label: "Wellness Coaching", value: "Wellness Coaching" },
    { label: "Weight Management Programs", value: "Weight Management Programs" },
    { label: "Stress Relief Programs", value: "Stress Relief Programs" },
    { label: "Hydrotherapy", value: "Hydrotherapy" }
  ],
  [BusinessTypeValue.MMA]: [
    { label: "MMA Training", value: "MMA Training" },
    { label: "Boxing Training", value: "Boxing Training" },
    { label: "Kickboxing", value: "Kickboxing" },
    { label: "Brazilian Jiu-Jitsu (BJJ)", value: "Brazilian Jiu-Jitsu (BJJ)" },
    { label: "Muay Thai", value: "Muay Thai" },
    { label: "Wrestling", value: "Wrestling" },
    { label: "Personal Training", value: "Personal Training" },
    { label: "Sparring Sessions", value: "Sparring Sessions" },
    { label: "Strength & Conditioning", value: "Strength & Conditioning" },
    { label: "Combat Fitness", value: "Combat Fitness" },
    { label: "Self-Defense Training", value: "Self-Defense Training" },
    { label: "Youth MMA Classes", value: "Youth MMA Classes" },
  ],
  [BusinessTypeValue.Sports]: [
    { label: "Sport-Specific Coaching (Football, Basketball, etc.)", value: "Sport-Specific Coaching (Football, Basketball, etc.)" },
    { label: "Athletic Conditioning & Strength Training", value: "Athletic Conditioning & Strength Training" },
    { label: "Speed & Agility Training", value: "Speed & Agility Training" },
    { label: "Sports Nutrition Counseling", value: "Sports Nutrition Counseling" },
    { label: "Sports Psychology", value: "Sports Psychology" },
    { label: "Fitness Testing & Assessments", value: "Fitness Testing & Assessments" },
    { label: "Injury Prevention & Recovery Programs", value: "Injury Prevention & Recovery Programs" },
    { label: "Personal Training", value: "Personal Training" },
    { label: "Sports Camps/Workshops", value: "Sports Camps/Workshops" },
    { label: "Youth Development Programs", value: "Youth Development Programs" }
  ],
  [BusinessTypeValue.Dance]: [
    { label: "Zumba", value: "Zumba" },
    { label: "Hip-Hop Dance", value: "Hip-Hop Dance" },
    { label: "Ballet", value: "Ballet" },
    { label: "Jazzercise", value: "Jazzercise" },
    { label: "Contemporary Dance", value: "Contemporary Dance" },
    { label: "Latin Dance", value: "Latin Dance" },
    { label: "Belly Dance", value: "Belly Dance" },
    { label: "Cardio Dance", value: "Cardio Dance" },
    { label: "Dance Fitness Bootcamps", value: "Dance Fitness Bootcamps" },
    { label: "Dance Workshops & Events", value: "Dance Workshops & Events" },
    { label: "Dance Teacher Training", value: "Dance Teacher Training" },
    { label: "Kids Dance Programs", value: "Kids Dance Programs" }
  ],
  [BusinessTypeValue.Physio]: [
    { label: "Physical Therapy (Orthopedic)", value: "Physical Therapy (Orthopedic)" },
    { label: "Sports Rehabilitation", value: "Sports Rehabilitation" },
    { label: "Post-Surgery Rehabilitation", value: "Post-Surgery Rehabilitation" },
    { label: "Chronic Pain Management", value: "Chronic Pain Management" },
    { label: "Injury Prevention Programs", value: "Injury Prevention Programs" },
    { label: "Gait Analysis & Correction", value: "Gait Analysis & Correction" },
    { label: "Massage Therapy", value: "Massage Therapy" },
    { label: "Electrotherapy (TENS, Ultrasound)", value: "Electrotherapy (TENS, Ultrasound)" },
    { label: "Postural Alignment", value: "Postural Alignment" },
    { label: "Spinal Manipulation", value: "Spinal Manipulation" },
    { label: "Pediatric Physiotherapy", value: "Pediatric Physiotherapy" },
    { label: "Workplace Ergonomics Assessments", value: "Workplace Ergonomics Assessments" }
  ]
};

export const RazorpayBusinessTypes: Option[] = [
  { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
  { value: 'ngo', label: 'Non-Governmental Organization (NGO)' },
  { value: 'other', label: 'Other' },
  { value: 'individual', label: 'Individual' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'proprietorship', label: 'Proprietorship' },
  { value: 'public_limited', label: 'Public Limited' },
  { value: 'private_limited', label: 'Private Limited' },
  { value: 'trust', label: 'Trust' },
  { value: 'society', label: 'Society' },
  { value: 'not_yet_registered', label: 'Not Yet Registered' },
  { value: 'educational_institutes', label: 'Educational Institutes' },
]