export interface Review {
  id: string;
  userName: string;
  userImage: string;
  comment: string;
  rating: number;
  date: string;
}

export interface StayData {
  id: string;
  name: string;
  type: 'monastery' | 'hotel' | 'guesthouse';
  rating: number;
  distance: string;
  image: string;
  galleryImages: string[];
  tags: string[];
  description: string;
  amenities: { icon: string; label: string }[];
  price?: string;
  policies: string[];
  reviews: Review[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
}

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image?: string;
  tags?: string[]; // e.g. 'Spicy', 'Vegan', 'Chef Choice'
  isPopular?: boolean;
}

export interface RestaurantData {
  id: string;
  name: string;
  description: string;
  rating: number;
  distance: string;
  image: string;
  type: 'vegetarian' | 'vegan' | 'all';
  chefNote?: string;
  openingHours: {
    days: string;
    time: string;
  }[];
  menuAvailable: boolean;
  menu: {
    category: string;
    items: MenuItem[];
  }[];
  reviews: Review[];
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
}

export const STAYS: StayData[] = [
  {
    id: 'thai_monastery',
    name: 'Royal Thai Monastery',
    type: 'monastery',
    rating: 4.9,
    distance: '1.2km',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1505933332464-42bc02fc2404?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1590059002624-917c24095493?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1470114716159-e389f8712fad?auto=format&fit=crop&q=80&w=800',
    ],
    tags: ['MEDITATION HALL', 'GARDEN VIEW'],
    description: 'Experience true serenity in the heart of Lumbini. The Royal Thai Monastery offers a unique spiritual retreat where architecture meets mindfulness. Guests can participate in morning chanting and evening meditation sessions while surrounded by traditional Thai craftsmanship.',
    amenities: [
      { icon: 'om', label: 'Meditation' },
      { icon: 'leaf', label: 'Zen Garden' },
      { icon: 'food-apple', label: 'Vegan Meals' },
      { icon: 'wifi', label: 'Free WiFi' },
    ],
    price: '$20 / Night',
    policies: [
      'Check-in: 2:00 PM - 6:00 PM',
      'Check-out: 10:00 AM',
      'No smoking in monastery grounds',
      'Modest dress code required',
      'Silence after 9:00 PM'
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Sarah Jenkins',
        userImage: 'https://i.pravatar.cc/100?img=1',
        comment: 'A transformative experience. The chanting at 5 AM was beautiful.',
        rating: 5,
        date: '2 weeks ago'
      }
    ],
    contact: {
      phone: '+977 71-580123',
      email: 'stay@royalthai.org',
      website: 'www.royalthai.org'
    }
  },
  {
    id: 'lumbini_lotus',
    name: 'The Lumbini Lotus',
    type: 'hotel',
    rating: 4.7,
    distance: '0.8km',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1551882547-ff43c61f3630?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=80&w=800',
    ],
    tags: ['ORGANIC SPA', 'YOGA DECK'],
    description: 'A blend of modern luxury and ancient wisdom. The Lumbini Lotus provides a tranquil sanctuary for travelers seeking comfort and cultural immersion. Each room is designed with natural materials to promote rest and reflection.',
    amenities: [
      { icon: 'pool', label: 'Lotus Pool' },
      { icon: 'spa', label: 'Organic Spa' },
      { icon: 'yoga', label: 'Yoga Deck' },
      { icon: 'silverware-fork-knife', label: 'Fine Dining' },
    ],
    price: '$85 / Night',
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 12:00 PM',
      'Pets not allowed',
      'Free cancellation up to 24h'
    ],
    reviews: [
      {
        id: 'r2',
        userName: 'David Miller',
        userImage: 'https://i.pravatar.cc/100?img=5',
        comment: 'Best spa in Lumbini. Very helpful staff!',
        rating: 4.5,
        date: '1 week ago'
      }
    ],
    contact: {
      phone: '+977 71-580555',
      email: 'info@lumbinilotus.com',
      website: 'www.lumbinilotus.com'
    }
  },
  {
    id: 'korean_temple_stay',
    name: 'Korean Temple Stay',
    type: 'monastery',
    rating: 4.8,
    distance: '2.5km',
    image: 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1549461754-52643a186675?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508213506917-89791461972b?auto=format&fit=crop&q=80&w=800',
    ],
    tags: ['TRADITIONAL', 'VEGAN MEALS'],
    description: 'Immerse yourself in the Korean Buddhist tradition. This temple stay program offers a deep dive into monastic life, including prostrations, tea ceremonies, and communal work (Samu), all within the peaceful environment of Lumbini.',
    amenities: [
      { icon: 'tea', label: 'Tea Ceremony' },
      { icon: 'account-group', label: 'Sangha' },
      { icon: 'bell-outline', label: 'Temple Bell' },
      { icon: 'weather-sunny', label: 'Sunrise Prayer' },
    ],
    price: '$15 / Donation',
    policies: [
      'Participate in all monastery schedules',
      'Lights out at 9:30 PM',
      'Donation based stay'
    ],
    reviews: [
      {
        id: 'r3',
        userName: 'Lin Su',
        userImage: 'https://i.pravatar.cc/100?img=3',
        comment: 'Very authentic. A bit strict but worth it for the peace.',
        rating: 5,
        date: '1 month ago'
      }
    ],
    contact: {
      phone: '+977 71-580111',
      email: 'contact@koreanmonastery.org',
      website: 'www.koreanmonastery.org'
    }
  }
];

export const RESTAURANTS: RestaurantData[] = [
  {
    id: 'gautam_veg',
    name: 'Gautam Buddha Veg',
    description: 'Pure Nepali Flavors & Organic Ingredients',
    rating: 4.8,
    distance: '400m',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    type: 'vegetarian',
    chefNote: "Our kitchen follows the principle of 'Ahimsa'. We source every grain from local spiritual cooperatives in the Lumbini zone.",
    openingHours: [
      { days: 'Mon - Fri', time: '7:00 AM - 9:00 PM' },
      { days: 'Sat - Sun', time: '8:00 AM - 10:00 PM' },
    ],
    menuAvailable: true,
    menu: [
      {
        category: 'STARTERS',
        items: [
          { id: 'v1', name: 'Veg Momos', price: '$5', description: 'Hand-folded spinach dumplings', tags: ['Organic'], isPopular: true },
          { id: 'v2', name: 'Paneer Tikka', price: '$8', description: 'Clay-oven roasted cottage cheese', tags: ['Spicy'] },
        ]
      },
      {
        category: 'MAINS',
        items: [
          { id: 'v3', name: 'Thakali Set', price: '$12', description: 'Traditional mountain meal with lentils', tags: ['Gluten Free'], isPopular: true },
          { id: 'v4', name: 'Mushroom Choila', price: '$10', description: 'Grilled mushroom with local spices', tags: ['Spicy', 'Vegan'] },
        ]
      },
      {
        category: 'BEVERAGES',
        items: [
          { id: 'v5', name: 'Masala Tea', price: '$2', description: 'Spiced aromatic milk tea', tags: ['Traditional'] },
          { id: 'v6', name: 'Lassi', price: '$4', description: 'Sweet or salty yogurt drink', tags: ['Cooling'], isPopular: true },
        ]
      },
      {
        category: 'DESSERTS',
        items: [
          { id: 'v7', name: 'Sel Roti', price: '$3', description: 'Sweet ring-shaped rice bread', tags: ['Traditional'] },
          { id: 'v8', name: 'Kheer', price: '$5', description: 'Sacred rice pudding', tags: ['Spiritual'] },
        ]
      }
    ],
    reviews: [
      { id: 'r4', userName: 'Anita Roy', userImage: 'https://i.pravatar.cc/100?img=10', comment: 'Best Thali in town!', rating: 5, date: '3 days ago' }
    ],
    contact: {
      phone: '+977 71-580998',
      email: 'hello@gautamveg.com',
      website: 'www.gautamveg.com',
      address: 'Temple Street, Lumbini'
    }
  },
  {
    id: 'zen_garden',
    name: 'The Zen Garden',
    description: 'Artisan Tea & Salads for Mindful Eating',
    rating: 4.6,
    distance: '1.5km',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
    type: 'vegan',
    chefNote: "Silence is the secret ingredient here. We invite you to dine in mindful awareness.",
    openingHours: [
      { days: 'Everyday', time: '9:00 AM - 7:00 PM' },
    ],
    menuAvailable: true,
    menu: [
      {
        category: 'APPETIZERS',
        items: [
          { id: 'z0', name: 'Zen Edamame', price: '$6', description: 'Mindfully steamed soy beans', tags: ['High Protein'], isPopular: true },
        ]
      },
      {
        category: 'REFRESHMENTS',
        items: [
          { id: 'z1', name: 'Buddha Tea', price: '$4', description: 'Ancient herbal blend', tags: ['Healing'], isPopular: true },
          { id: 'z2', name: 'Lotus Salad', price: '$9', description: 'Fresh flowers and seeds', tags: ['Nut Free'] },
        ]
      },
      {
        category: 'BEVERAGES',
        items: [
          { id: 'z4', name: 'Matcha Monk', price: '$7', description: 'Ceremonial grade green tea', tags: ['Antioxidant'], isPopular: true },
          { id: 'z5', name: 'Holy Water', price: '$3', description: 'Infused with mint and ginger', tags: ['Refreshing'] },
        ]
      },
      {
        category: 'SWEETS',
        items: [
          { id: 'z3', name: 'Coconut Zen', price: '$6', description: 'Mindful coconut cream delight', tags: ['Vegan'] },
        ]
      }
    ],
    reviews: [
      { id: 'r5', userName: 'Mark S.', userImage: 'https://i.pravatar.cc/100?img=11', comment: 'So peaceful here.', rating: 4, date: '1 week ago' }
    ],
    contact: {
      phone: '+977 71-580777',
      email: 'zen@lumbini.com',
      website: 'www.zengardenlumbini.com',
      address: 'West Monastic Zone'
    }
  }
];
