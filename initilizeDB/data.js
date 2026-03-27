const sampleListings = [
  // --- BEACHFRONT (5) ---
  {
    title: "Marari Sands Eco-Villa",
    description: "A serene getaway on the quiet shores of Mararikulam. Stay in a traditional thatched-roof villa set within a sprawling coconut grove just steps from the tide.",
    image: { 
        url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=1200", 
        filename: "marari_eco_beach" 
    },
    price: 11000, 
    location: "Alleppey, Kerala", 
    country: "India", 
    category: "Beachfront"
  },
  {
    title: "The Arabian Sea Cliff House",
    description: "A stunning glass-fronted villa perched on the Varkala cliffs with a private staircase leading to the sand.",
    image: { url: "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=1200" },
    price: 14000, 
    location: "Varkala, Kerala", 
    country: "India", 
    category: "Beachfront"
  },
  {
    title: "Coral Reef Pavilion",
    description: "Eco-friendly luxury on the shores of Lakshadweep. Step out of your room and directly into a turquoise lagoon.",
    image: { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=1200" },
    price: 28000, 
    location: "Bangaram Island", 
    country: "India", 
    category: "Beachfront"
  },
  {
    title: "The Kovalam Lighthouse Villa",
    description: "Stay in a heritage-inspired villa with a direct view of the iconic red-and-white Vizhinjam Lighthouse.",
    image: { url: "https://images.unsplash.com/photo-1533760881669-80db4d7b4c15?q=80&w=1200" },
    price: 11000, 
    location: "Kovalam, Kerala", 
    country: "India", 
    category: "Beachfront"
  },
  {
    title: "Silver Sands Boutique Stay",
    description: "A minimalist boutique hotel on the quiet stretch of Mandrem beach, perfect for sunset enthusiasts.",
    image: { url: "https://images.unsplash.com/photo-1520483601560-389dff434fdf?q=80&w=1200" },
    price: 9500, 
    location: "Mandrem, Goa", 
    country: "India", 
    category: "Beachfront"
  },
  {
    title: "The Gokarna Beach Cabana",
    description: "Located on the pristine Om Beach, these luxury wooden cabanas offer a bohemian-chic experience with unobstructed views of the sunset over the rocks.",
    image: { 
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=1200", 
        filename: "gokarna_om_beach" 
    },
    price: 5200, 
    location: "Gokarna, Karnataka", 
    country: "India", 
    category: "Beachfront"
  },
  {
    title: "Digha Marine Luxury Suite",
    description: "A modern, glass-fronted suite on the shores of the Bay of Bengal. Features a private balcony perfect for watching the unique high-tide waves of the East Coast.",
    image: { 
        url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=1200", 
        filename: "digha_marine_view" 
    },
    price: 7800, 
    location: "Digha, West Bengal", 
    country: "India", 
    category: "Beachfront"
  },
  {
    title: "Eco-Luxe Hut",
    description: "Sustainable luxury right on Palolem beach. Wake up to the sound of waves.",
    image: { url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800" },
    price: 4500, 
    location: "Canacona", 
    country: "India", 
    category: "Beachfront"
  },
  {
    title: "The Azure Sands Resort",
    description: "Nestled right on the edge of the world-famous Radhanagar Beach. Experience luxury in eco-friendly wood cottages under the canopy of ancient tropical rainforests.",
    image: { 
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000", 
        filename: "havelock_beach_resort" 
    },
    price: 18500, 
    location: "Havelock Island", 
    country: "India", 
    category: "Beachfront"
  },
  {
    title: "The Shore Temple Villa",
    description: "Stay in a heritage-inspired villa overlooking the Bay of Bengal.",
    image: { url: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=800" },
    price: 7500, 
    location: "Mahabalipuram", 
    country: "India", 
    category: "Beachfront"
  },
  {
    title: "Blue Lagoon Cottage",
    description: "Private lagoon access and seafood dining under the stars.",
    image: { url: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=800" },
    price: 9000, 
    location: "Pondicherry", 
    country: "India", 
    category: "Beachfront"
  },

  // --- ICONIC CITIES (5) ---
  {
    title: "The Pink City Mansion",
    description: "A stunning historical haveli featuring traditional frescoes and a sun-drenched courtyard, located just minutes from the Hawa Mahal.",
    image: { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000" },
    price: 8500, 
    location: "Jaipur", 
    country: "India", 
    category: "Iconic cities"
  },
  {
    title: "The Connaught Executive",
    description: "A sleek, art-deco inspired stay in the pulsing heart of New Delhi's Connaught Place.",
    image: { url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200" },
    price: 16000, 
    location: "CP, New Delhi", 
    country: "India", 
    category: "Iconic cities"
  },
  {
    title: "The Sabarmati Riverfront Suite",
    description: "Modern, sustainable luxury overlooking the transformed riverfront in Ahmedabad.",
    image: { url: "https://images.unsplash.com/photo-1624314138470-5a2f24623f10?q=80&w=1200" },
    price: 8500, 
    location: "Ahmedabad, Gujarat", 
    country: "India", 
    category: "Iconic cities"
  },
  {
    title: "Gateway View Penthouse",
    description: "A modern penthouse with an unobstructed view of the Gateway of India and the Arabian Sea.",
    image: { url: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1200" },
    price: 25000, 
    location: "Mumbai, Maharashtra", 
    country: "India", 
    category: "Iconic cities"
  },
  {
    title: "Lutyens' Delhi Boutique Suite",
    description: "An exclusive stay in a high-ceilinged bungalow located in the historic Lutyens' zone. Features private gardens and proximity to India Gate.",
    image: { 
        url: "https://images.unsplash.com/photo-1585129777188-94600bc7b4b3?q=80&w=1200", 
        filename: "delhi_lutyens_stay" 
    },
    price: 18000, 
    location: "New Delhi", 
    country: "India", 
    category: "Iconic cities"
  },

  // --- MOUNTAIN (5) ---
  {
    title: "Snowy Peak Lodge",
    description: "Chalet-style home with views of the Rohtang Pass.",
    image: { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800" },
    price: 5500, 
    location: "Manali", 
    country: "India", 
    category: "Mountain"
  },
  {
    title: "The Cedar Wood Chalet",
    description: "A traditional Himalayan chalet built with deodar wood and stone. Offers panoramic views of the Dhauladhar range and a private sun deck for morning yoga.",
    image: { 
        url: "https://images.unsplash.com/photo-1602391833977-358a52198938?q=80&w=1200", 
        filename: "mcloedganj_mountain_chalet" 
    },
    price: 8500, 
    location: "McLeod Ganj, Himachal Pradesh", 
    country: "India", 
    category: "Mountain"
  },
  {
    title: "Cloud-End Forest Lodge",
    description: "Set at the highest point of Mussoorie, this heritage lodge is surrounded by thick oak and rhododendron forests with a 360-degree view of the Doon Valley.",
    image: { 
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200", 
        filename: "mussoorie_cloud_end" 
    },
    price: 11000, 
    location: "Mussoorie, Uttarakhand", 
    country: "India", 
    category: "Mountain"
  },
  {
    title: "Brahmatal Base Retreat",
    description: "A high-altitude retreat catering to trekkers and nature lovers. Features rustic architecture that blends seamlessly with the rugged mountain terrain.",
    image: { 
        url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1200", 
        filename: "lohajung_mountain_stay" 
    },
    price: 4200, 
    location: "Lohajung, Uttarakhand", 
    country: "India", 
    category: "Mountain"
  },
  {
    title: "The Cloud Forest Pavilion",
    description: "A sustainable glass-and-stone pavilion perched on the edge of the Western Ghats. Watch the monsoon clouds roll into your living room from the Silent Valley.",
    image: { 
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200", 
        filename: "attappadi_mountain_stay" 
    },
    price: 13500, 
    location: "Palakkad, Kerala", 
    country: "India", 
    category: "Mountain"
  },
  {
    title: "Nubra Valley Eco-Lodge",
    description: "Located at the foot of the Karakoram range. This lodge features organic gardens and offers a stark, beautiful contrast between desert dunes and towering mountains.",
    image: { 
        url: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200", 
        filename: "nubra_valley_mountain" 
    },
    price: 8800, 
    location: "Hunder, Ladakh", 
    country: "India", 
    category: "Mountain"
  },

  // --- CASTLES (5) ---
  {
    title: "Neemrana Fort-Palace",
    description: "15th-century heritage hotel with hanging gardens and pools.",
    image: { url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800" },
    price: 11000, 
    location: "Rajasthan", 
    country: "India", 
    category: "Castles"
  },
  {
    title: "Devigarh Fort Villa",
    description: "Modern luxury meets 18th-century Rajputana architecture.",
    image: { url: "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?q=80&w=800" },
    price: 14000, 
    location: "Delwara", 
    country: "India", 
    category: "Castles"
  },

  // --- AMAZING POOLS (5) ---
  {
    title: "Infinity Pool Resort",
    description: "Swim in the clouds with our world-class infinity pool.",
    image: { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800" },
    price: 13000, 
    location: "Coorg", 
    country: "India", 
    category: "Amazing pools"
  },
  {
    title: "The Tamara Coorg Infinity Suite",
    description: "Nestled in a 180-acre coffee plantation, this pool offers views of the Western Ghats' misty valleys. A temperature-controlled oasis in the heart of the rainforest.",
    image: { 
        url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200", 
        filename: "coorg_valley_pool" 
    },
    price: 21000, 
    location: "Coorg, Karnataka", 
    country: "India", 
    category: "Amazing pools"
  },
  {
    title: "Evolve Back Kabini Water-Side",
    description: "Inspired by the tribal villages of the region, this resort features a private pool villa on the banks of the Kabini River, perfect for watching wildlife while you swim.",
    image: { 
        url: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=1200", 
        filename: "kabini_river_pool" 
    },
    price: 32000, 
    location: "Kabini, Karnataka", 
    country: "India", 
    category: "Amazing pools"
  },
  {
    title: "Tree of Life Highland Suite",
    description: "Features a private, temperature-controlled plunge pool tucked away in the Aravali hills. Perfect for quiet mornings watching the fog lift off the Jaipur countryside.",
    image: { 
        url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200", 
        filename: "jaipur_hill_pool" 
    },
    price: 15500, 
    location: "Kukas, Rajasthan", 
    country: "India", 
    category: "Amazing pools"
  },
  {
    title: "Jungle Pool Villa",
    description: "Private pool surrounded by the dense forests of Bandhavgarh.",
    image: { url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800" },
    price: 11000, 
    location: "Madhya Pradesh", 
    country: "India", 
    category: "Amazing pools"
  },
  {
    title: "Heritage Pool Haveli",
    description: "Indoor traditional pool (Baori style) in a luxury haveli.",
    image: { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800" },
    price: 7000, 
    location: "Bikaner", 
    country: "India",  
    category: "Amazing pools"
  },
  {
    title: "Sunset Infinity Suite",
    description: "Overlooking the ocean with a private temperature-controlled pool.",
    image: { url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800" },
    price: 21000, 
    location: "Kovalam", 
    country: "India", 
    category: "Amazing pools"
  },

  // --- CAMPING (5) ---
  {
    title: "Starlight Desert Camp",
    description: "Luxury tents in the Thar desert with camel safaris.",
    image: { url: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=800" },
    price: 5500, 
    location: "Jaisalmer", 
    country: "India", 
    category: "Camping"
  },
  {
    title: "Valley of Gods Tents",
    description: "Glamping by the Ganges with white water rafting access.",
    image: { url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800" },
    price: 4500, 
    location: "Rishikesh", 
    country: "India", 
    category: "Camping"
  },
  {
    title: "The Ultimate Traveller's Camp",
    description: "Ultra-luxury glamping in the nomadic heart of Ladakh. These seasonally pitched tents offer butler service, private decks, and views of the Thiksey Monastery.",
    image: { 
        url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200", 
        filename: "tutc_ladakh" 
    },
    price: 35000, 
    location: "Thiksey, Ladakh", 
    country: "India", 
    category: "Camping"
  },
  {
    title: "Atali Dogra Ganga Camp",
    description: "An 'actively' luxury glamping site perched above the Ganges. Known for high-end safari tents and access to the best white-water rafting and mountain climbing in the region.",
    image: { 
        url: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=1200", 
        filename: "atali_rishikesh" 
    },
    price: 14500, 
    location: "Rishikesh, Uttarakhand", 
    country: "India", 
    category: "Camping"
  },
  {
    title: "The Ultimate Traveller’s Camp (TUTC)",
    description: "A seasonal nomadic camp featuring colonial-style tents with teak wood floors and private valets. Wake up to views of the ancient Thiksey Monastery.",
    image: { 
        url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200", 
        filename: "tutc_thiksey" 
    },
    price: 38000, 
    location: "Thiksey, Ladakh", 
    country: "India", 
    category: "Camping"
  },
  
  // --- ARCTIC (5) ---
  {
    title: "High Altitude Desert Camp",
    description: "Stay in luxury tents near the blue waters of Pangong Lake.",
    image: { url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800" },
    price: 6500, 
    location: "Ladakh", 
    country: "India", 
    category: "Arctic"
  },
  {
    title: "The Khyber Himalayan Resort",
    description: "A world-renowned luxury retreat in Gulmarg. Experience premier ski-in/ski-out access and a glass-enclosed heated pool with views of the snow-covered Affarwat peaks.",
    image: { 
        url: "https://images.unsplash.com/photo-1548777123-e216912df7d8?q=80&w=1200", 
        filename: "khyber_gulmarg" 
    },
    price: 45000, 
    location: "Gulmarg", 
    country: "India", 
    category: "Arctic"
  },
  {
    title: "Grand Dragon Luxury Suite",
    description: "The first 5-star hotel in Leh, featuring heated teak wood floors and panoramic views of the Stok Kangri mountain range in its winter glory.",
    image: { 
        url: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200", 
        filename: "grand_dragon_ladakh" 
    },
    price: 18000, 
    location: "Leh, Ladakh", 
    country: "India", 
    category: "Arctic"
  },
  {
    title: "The Himalayan Victorian Castle",
    description: "A premier boutique resort built in Victorian Gothic style. Located at 6,500 ft, it offers a dramatic snow-covered castle experience in the heart of Manali.",
    image: { 
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200", 
        filename: "himalayan_manali" 
    },
    price: 12500, 
    location: "Manali", 
    country: "India", 
    category: "Arctic"
  },
  {
    title: "Chumbi Mountain Retreat",
    description: "A serene escape in West Sikkim offering a monastic atmosphere and breathtaking winter views of the Kanchenjunga range.",
    image: { 
        url: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200", 
        filename: "chumbi_retreat_sikkim" 
    },
    price: 9500, 
    location: "Pelling, Sikkim", 
    country: "India", 
    category: "Arctic"
  },
  {
    title: "Wildflower Hall Luxury Lodge",
    description: "Formerly the residence of Lord Kitchener, this Oberoi resort offers a fairy-tale arctic experience amidst 23 acres of protected cedar forests.",
    image: { 
        url: "https://images.unsplash.com/photo-1486915307544-b1ae7d33a214?q=80&w=1200", 
        filename: "wildflower_hall_shimla" 
    },
    price: 32000, 
    location: "Shimla", 
    country: "India", 
    category: "Arctic"
  },
  {
    title: "Glacier Watch Lodge",
    description: "Modern architecture on the edge of a melting glacier.",
    image: { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800" },
    price: 13000, 
    location: "North Sikkim", 
    country: "India", 
    category: "Arctic"
  },

  // --- ROOMS / TRENDING (5) ---
  {
    title: "Modern Minimalist Room",
    description: "A sleek, clean room in the heart of the tech hub.",
    image: { url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800" },
    price: 2500, 
    location: "Bangalore", 
    country: "India", 
    category: "Rooms"
  },
  {
    title: "Artistic Studio Room",
    description: "A creative space filled with local art and vibrant colors.",
    image: { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800" },
    price: 3500, 
    location: "Chennai", 
    country: "India", 
    category: "Rooms"
  },
  {
    title: "Urban Loft Room",
    description: "High ceilings and industrial vibes for the modern traveler.",
    image: { url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800" },
    price: 4500, 
    location: "Pune", 
    country: "India", 
    category: "Rooms"
  },
  {
    title: "Heritage Guest Room",
    description: "Stay in a room that feels like a trip back in time.",
    image: { url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800" },
    price: 3000, 
    location: "Lucknow", 
    country: "India", 
    category: "Rooms"
  },
  {
    title: "The Sabarmati Executive Suite",
    description: "Experience unparalleled luxury with a 180-degree view of the Riverfront. Featuring a walk-in closet, Italian marble bathroom, and 24/7 personalized butler service.",
    image: { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000" },
    price: 12500, 
    location: "Ahmedabad", 
    country: "India", 
    category: "Rooms"
  },

  // Trending (5)
  {
    title: "The Glass Igloo Retreat",
    description: "The most viral stay in the Himalayas. Sleep under the stars and the Milky Way in a 360-degree glass dome surrounded by deep winter snow.",
    image: { 
        url: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=1200", 
        filename: "sethan_glass_igloo" 
    },
    price: 18500, 
    location: "Sethan, Himachal Pradesh", 
    country: "India", 
    category: "Trending"
  },
  {
    title: "Eco-Luxury Floating Houseboat",
    description: "A modern take on the traditional Kettuvallam. This ultra-luxury solar-powered boat features a private upper-deck jacuzzi and a personal chef.",
    image: { 
        url: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=1200", 
        filename: "kerala_luxury_boat" 
    },
    price: 22000, 
    location: "Alleppey, Kerala", 
    country: "India", 
    category: "Trending"
  },
  {
    title: "Heritage Stepwell Suite",
    description: "A unique boutique stay built directly into the architecture of a 17th-century stepwell. A masterpiece of subterranean design and cool desert living.",
    image: { 
        url: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200", 
        filename: "jodhpur_stepwell_stay" 
    },
    price: 15000, 
    location: "Jodhpur, Rajasthan", 
    country: "India", 
    category: "Trending"
  },
  {
    title: "The Rainforest Treehouse",
    description: "Rising 60 feet above the forest floor, this luxury 'Machan' offers a bird's-eye view of the Western Ghats and frequent sightings of rare wildlife.",
    image: { 
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200", 
        filename: "wyanad_treehouse_trending" 
    },
    price: 19500, 
    location: "Wayanad, Kerala", 
    country: "India", 
    category: "Trending"
  },
  {
    title: "The Safari Glamping Deck",
    description: "Ultra-luxury canvas tents located in the heart of leopard country. Features a private sunset deck and open-air shower under the desert stars.",
    image: { 
        url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200", 
        filename: "jawai_safari_camp" 
    },
    price: 35000, 
    location: "Jawai, Rajasthan", 
    country: "India", 
    category: "Trending"
  }
];

module.exports = { data: sampleListings };