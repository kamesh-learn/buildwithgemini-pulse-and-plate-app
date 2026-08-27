// Pulse & Plate At-A-Glance Visual Travel & Lifestyle OS Dashboard JS
// Features: Dual Dark / Light Theme, Reordered Sections (Friends -> Routes/Places -> Bistros/Restaurants -> Nightlife -> Hotels)

const USER_PROFILES = {
    alex: {
        id: "alex",
        name: "Alex Morgan",
        avatar: "🏃‍♂️",
        hotel: "Hôtel Plaza Athénée",
        event: "Paris Marathon 2026",
        location: "Paris, France",
        target: "3 Hours 30 Mins",
        pace: "4:58 min/km",
        dietTags: ["🌾 Gluten-Free", "🌱 Vegan"],
        budget: "$2,000 ($500/day limit)",
        sessionId: "session_alex_morgan_gf_vegan",
        quickActions: [
            { label: "Friends Attending Marathon", prompt: "Show friends attending Paris Marathon 2026 and calculate travel times for us.", icon: "👥" },
            { label: "Marathon Shakeout Loops", prompt: "Find popular 5k running loops in Paris with travel times.", icon: "🏃" },
            { label: "Vegan GF Bistros", prompt: "Recommend top-rated vegan and gluten-free bistros in Paris.", icon: "🥗" },
            { label: "Hotels Near Arc de Triomphe", prompt: "Find gluten-free friendly luxury hotels near Paris Marathon start line.", icon: "🏨" }
        ],
        welcomeText: "Active Athlete: <strong>Alex Morgan</strong> (Gluten-Free & Vegan Marathoner). Explore friends, running loops, bistros, nightlife, and hotels below!"
    },
    sarah: {
        id: "sarah",
        name: "Sarah Chen",
        avatar: "🚴‍♀️",
        hotel: "Hôtel Le Negresco",
        event: "Nice Ironman & Cycling Tour",
        location: "Nice, France",
        target: "5 Hours 15 Mins (Cycling)",
        pace: "28 km/h Cycling",
        dietTags: ["🥑 Keto", "🥜 Nut-Free"],
        budget: "$3,500 ($875/day limit)",
        sessionId: "session_sarah_chen_keto_nutfree",
        quickActions: [
            { label: "Friends Attending Ironman", prompt: "Show friends attending Nice Ironman and calculate travel times.", icon: "👥" },
            { label: "Coastal Cycling Loops", prompt: "Find popular cycling routes and climbs like Col d'Èze in Nice.", icon: "🚴" },
            { label: "Keto & Nut-Free Bistros", prompt: "Find top-rated Keto seafood bistros in Nice.", icon: "🥩" },
            { label: "Bike Storage Hotels Nice", prompt: "Find luxury hotels with secure bike storage near Promenade des Anglais, Nice.", icon: "🏨" }
        ],
        welcomeText: "Active Athlete: <strong>Sarah Chen</strong> (Keto & Nut-Free Triathlete). Explore friends, cycling climbs, keto dining, nightlife, and hotels below!"
    },
    marcus: {
        id: "marcus",
        name: "Marcus Vance",
        avatar: "🥾",
        hotel: "Victoria-Jungfrau Grand Hotel",
        event: "Swiss Alps Trail Hike",
        location: "Interlaken, Switzerland",
        target: "15 km Alpine Day Hikes",
        pace: "3.2 km/h Hiking Pace",
        dietTags: ["🥛 Lactose-Free", "🐟 Pescatarian"],
        budget: "$1,500 ($375/day limit)",
        sessionId: "session_marcus_vance_lf_pescatarian",
        quickActions: [
            { label: "Friends Attending Alps Hike", prompt: "Show friends attending Swiss Alps Hike and calculate travel times.", icon: "👥" },
            { label: "Harder Kulm & Eiger Hikes", prompt: "Find popular alpine hikes and ski runs in Interlaken.", icon: "🥾" },
            { label: "Lactose-Free Lake Fish Dining", prompt: "Recommend lactose-free pescatarian dining in Interlaken.", icon: "🐟" },
            { label: "Alpine Trailhead Lodges", prompt: "Find scenic mountain lodges in Interlaken under $1,500 budget.", icon: "🏔️" }
        ],
        welcomeText: "Active Traveler: <strong>Marcus Vance</strong> (Lactose-Free & Pescatarian Hiker). Explore friends, trail hikes, lakeside dining, nightlife, and hotels below!"
    }
};

// AT-A-GLANCE GROUNDED DATASETS (5 Items Per Category Per City)
const DASHBOARD_DATA = {
    "Paris, France": {
        hotels: [
            { title: "Hôtel Plaza Athénée", rating: "4.7 ★ (2,100 Reviews)", price: "$480/night", meta: "0.6 km to Start Line", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop", queryText: "Hotel Plaza Athenee Paris", mapsUrl: "https://maps.google.com/?q=Hotel+Plaza+Athenee+Paris", badge: "Certified GF Bakery • Spa" },
            { title: "Hôtel Étoile Saint Ferdinand", rating: "4.5 ★ (980 Reviews)", price: "$290/night", meta: "0.3 km from Jessica Lin", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop", queryText: "Hotel Etoile Saint Ferdinand Paris", mapsUrl: "https://maps.google.com/?q=Hotel+Etoile+Saint+Ferdinand+Paris", badge: "Vegan Breakfast • Quiet" },
            { title: "Le Royal Monceau Raffles", rating: "4.8 ★ (1,540 Reviews)", price: "$520/night", meta: "0.4 km from David Kim", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop", queryText: "Le Royal Monceau Paris", mapsUrl: "https://maps.google.com/?q=Le+Royal+Monceau+Paris", badge: "Luxury Pool • GF Dining" },
            { title: "Hôtel Napoleon Paris", rating: "4.6 ★ (1,120 Reviews)", price: "$340/night", meta: "0.2 km from Sophie Moreau", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop", queryText: "Hotel Napoleon Paris", mapsUrl: "https://maps.google.com/?q=Hotel+Napoleon+Paris", badge: "Arc de Triomphe Views" },
            { title: "Pullman Paris Tour Eiffel", rating: "4.5 ★ (3,400 Reviews)", price: "$310/night", meta: "1.1 km to Finish Line", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop", queryText: "Pullman Paris Tour Eiffel", mapsUrl: "https://maps.google.com/?q=Pullman+Paris+Tour+Eiffel", badge: "Fitness Gym • Eiffel Views" }
        ],
        routes: [
            { title: "Parc Rives de Seine Loop", rating: "4.8 ★ (Google Trail)", price: "5.2 km Track", meta: "Pace Target: 4:58 min/km", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop", queryText: "Parc Rives de Seine Paris", mapsUrl: "https://maps.google.com/?q=Parc+Rives+de+Seine+Paris", badge: "Car-Free Riverfront Run" },
            { title: "Parc Monceau Circuit", rating: "4.7 ★ (Google Trail)", price: "2.5 km Perimeter", meta: "Flat Asphalt • Smooth", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop", queryText: "Parc Monceau Paris", mapsUrl: "https://maps.google.com/?q=Parc+Monceau+Paris", badge: "Shaded Runners Track" },
            { title: "Jardin du Luxembourg Loop", rating: "4.9 ★ (Google Trail)", price: "3.8 km Gravel Track", meta: "Light Elevation Gain", img: "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=600&auto=format&fit=crop", queryText: "Jardin du Luxembourg Paris", mapsUrl: "https://maps.google.com/?q=Jardin+du+Luxembourg+Paris", badge: "Historic Gardens Track" },
            { title: "Bois de Boulogne Marathon Trail", rating: "4.6 ★ (Google Trail)", price: "12.0 km Forest Track", meta: "Trail & Asphalt Mix", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop", queryText: "Bois de Boulogne Paris", mapsUrl: "https://maps.google.com/?q=Bois+de+Boulogne+Paris", badge: "Scenic Lakes & Woodlands" },
            { title: "Champ de Mars Eiffel Sprint", rating: "4.8 ★ (Google Trail)", price: "4.0 km Loop", meta: "Flat Sprint Grounds", img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&auto=format&fit=crop", queryText: "Champ de Mars Paris", mapsUrl: "https://maps.google.com/?q=Champ+de+Mars+Paris", badge: "Eiffel Tower Finish" }
        ],
        bistros: [
            { title: "Noglu Paris (Gluten-Free)", rating: "4.7 ★ (1,240 Reviews)", price: "€18 - €32", meta: "🌾 100% GF & 🌱 Vegan", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop", queryText: "Noglu Paris France", mapsUrl: "https://maps.google.com/?q=Noglu+Paris", badge: "Certified Gluten-Free Bakery" },
            { title: "Wild & The Moon (Paris)", rating: "4.6 ★ (1,890 Reviews)", price: "€14 - €24", meta: "🌱 Organic Vegan & GF Bowls", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop", queryText: "Wild and The Moon Paris", mapsUrl: "https://maps.google.com/?q=Wild+and+The+Moon+Paris", badge: "Cold-Pressed Juices & Protein Bowls" },
            { title: "Le Potager de Charlotte", rating: "4.8 ★ (1,150 Reviews)", price: "€26 - €42", meta: "🌱 Fine Plant-Based Dining", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop", queryText: "Le Potager de Charlotte Paris", mapsUrl: "https://maps.google.com/?q=Le+Potager+de+Charlotte+Paris", badge: "Gourmet Avocado Roti & GF Pasta" },
            { title: "Aujourd'hui Demain", rating: "4.7 ★ (890 Reviews)", price: "€16 - €28", meta: "🌱 Vegan Comfort Bistro", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop", queryText: "Aujourdhui Demain Paris", mapsUrl: "https://maps.google.com/?q=Aujourdhui+Demain+Paris", badge: "Vegan Pancakes & Mac-Cheese" },
            { title: "Hank Burger (Paris)", rating: "4.5 ★ (2,100 Reviews)", price: "€12 - €20", meta: "🌱 Vegan Burgers & GF Buns", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop", queryText: "Hank Burger Paris", mapsUrl: "https://maps.google.com/?q=Hank+Burger+Paris", badge: "Quick Pre-Race Carbo Loading" }
        ],
        nightlife: [
            { title: "Le Perchoir Marais Rooftop", rating: "4.6 ★ (1,450 Reviews)", price: "Rooftop Lounge", meta: "Skyline Views • Organic Drinks", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop", queryText: "Le Perchoir Marais Paris", mapsUrl: "https://maps.google.com/?q=Le+Perchoir+Marais+Paris", badge: "Eiffel Tower Sunset Terrace" },
            { title: "La Station Gare des Mines", rating: "4.5 ★ (980 Reviews)", price: "Open-Air Music", meta: "Outdoor Sets & Food Trucks", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop", queryText: "La Station Gare des Mines Paris", mapsUrl: "https://maps.google.com/?q=La+Station+Gare+des+Mines+Paris", badge: "Post-Race Celebration Venue" },
            { title: "Rex Club Paris", rating: "4.6 ★ (2,800 Reviews)", price: "Electronic Lounge", meta: "World-Class Acoustics", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop", queryText: "Rex Club Paris", mapsUrl: "https://maps.google.com/?q=Rex+Club+Paris", badge: "Legendary Parisian DJ Venue" },
            { title: "Le Comptoir Général", rating: "4.7 ★ (1,920 Reviews)", price: "Tropical Speakeasy", meta: "Canal Saint-Martin Bar", img: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop", queryText: "Le Comptoir General Paris", mapsUrl: "https://maps.google.com/?q=Le+Comptoir+General+Paris", badge: "Eclectic Botanical Lounge" },
            { title: "Bambou Paris (Cocktail Lounge)", rating: "4.5 ★ (840 Reviews)", price: "Asian Courtyard Bar", meta: "Opium Den Vibe & Mocktails", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop", queryText: "Bambou Paris Bar", mapsUrl: "https://maps.google.com/?q=Bambou+Paris", badge: "Heated Terrace & Chill Music" }
        ]
    },
    "Nice, France": {
        hotels: [
            { title: "Hôtel Le Negresco", rating: "4.6 ★ (2,840 Reviews)", price: "$340/night", meta: "0.2 km to Transition Zone", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop", queryText: "Hotel Le Negresco Nice", mapsUrl: "https://maps.google.com/?q=Hotel+Le+Negresco+Nice", badge: "Locked Bike Storage • Keto Breakfast" },
            { title: "Hyatt Regency Nice Palais", rating: "4.5 ★ (1,420 Reviews)", price: "$280/night", meta: "0.2 km from Tom Miller", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop", queryText: "Hyatt Regency Nice Palais", mapsUrl: "https://maps.google.com/?q=Hyatt+Regency+Nice", badge: "Indoor & Outdoor Pool • Nut-Free" },
            { title: "Radisson Blu Hotel Nice", rating: "4.4 ★ (1,890 Reviews)", price: "$240/night", meta: "0.6 km from Chloe Dupont", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop", queryText: "Radisson Blu Hotel Nice", mapsUrl: "https://maps.google.com/?q=Radisson+Blu+Hotel+Nice", badge: "Rooftop Pool • Sea Views" },
            { title: "Hôtel Aston La Scala", rating: "4.5 ★ (1,210 Reviews)", price: "$220/night", meta: "0.5 km from Marco Rossi", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop", queryText: "Hotel Aston La Scala Nice", mapsUrl: "https://maps.google.com/?q=Hotel+Aston+La+Scala+Nice", badge: "Panoramic Sky Bar" },
            { title: "Hôtel West End Promenade", rating: "4.4 ★ (950 Reviews)", price: "$210/night", meta: "0.3 km to Beach", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop", queryText: "Hotel West End Nice", mapsUrl: "https://maps.google.com/?q=Hotel+West+End+Nice", badge: "Historic Belle Époque Hotel" }
        ],
        routes: [
            { title: "Col d'Èze Climb (M2564)", rating: "4.9 ★ (Google Trail)", price: "10.0 km Climb", meta: "507m Elevation Gain", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop", queryText: "Col d Eze Nice", mapsUrl: "https://maps.google.com/?q=Col+d+Eze+Nice", badge: "Famous Tour de France Climb" },
            { title: "Promenade des Anglais Track", rating: "4.8 ★ (Google Trail)", price: "7.0 km Flat Loop", meta: "Sea Breeze • Smooth Asphalt", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop", queryText: "Promenade des Anglais Nice", mapsUrl: "https://maps.google.com/?q=Promenade+des+Anglais+Nice", badge: "Ironman Run Course" },
            { title: "Mont Chauve Challenge", rating: "4.7 ★ (Google Trail)", price: "14.5 km Mountain Loop", meta: "780m Elevation Gain", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop", queryText: "Mont Chauve Nice", mapsUrl: "https://maps.google.com/?q=Mont+Chauve+Nice", badge: "Panoramic Riviera Peak" },
            { title: "Cap Ferrat Coastal Loop", rating: "4.9 ★ (Google Trail)", price: "11.2 km Scenic Ride", meta: "Rolling Hills & Villas", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop", queryText: "Cap Ferrat Loop Nice", mapsUrl: "https://maps.google.com/?q=Cap+Ferrat+Nice", badge: "Crystal Blue Bay Views" },
            { title: "Gorges du Loup Alpine Loop", rating: "4.8 ★ (Google Trail)", price: "45.0 km Endurance Ride", meta: "1,200m Elevation Gain", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop", queryText: "Gorges du Loup Nice", mapsUrl: "https://maps.google.com/?q=Gorges+du+Loup+Nice", badge: "Canyon Wall Cycling Track" }
        ],
        bistros: [
            { title: "Le Bistrot Gourmand", rating: "4.7 ★ (1,100 Reviews)", price: "€28 - €45", meta: "🥑 Keto & 🥜 100% Nut-Free", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop", queryText: "Le Bistrot Gourmand Nice", mapsUrl: "https://maps.google.com/?q=Le+Bistrot+Gourmand+Nice", badge: "Grilled Riviera Sea Bass" },
            { title: "La Merenda (Vieux Nice)", rating: "4.6 ★ (1,450 Reviews)", price: "€24 - €38", meta: "🥑 High-Fat Keto Bistro", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop", queryText: "La Merenda Nice", mapsUrl: "https://maps.google.com/?q=La+Merenda+Nice", badge: "Authentic Niçoise Stew & Fish" },
            { title: "L'Apostrophe Nice", rating: "4.5 ★ (780 Reviews)", price: "€20 - €34", meta: "🥜 Certified Nut-Free Kitchen", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop", queryText: "L Apostrophe Nice", mapsUrl: "https://maps.google.com/?q=L+Apostrophe+Nice", badge: "Fresh Seafood & Grass-Fed Steak" },
            { title: "Bistrot d'Antoine", rating: "4.8 ★ (1,920 Reviews)", price: "€26 - €42", meta: "🥑 Keto Friendly Seafood", img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop", queryText: "Bistrot d Antoine Nice", mapsUrl: "https://maps.google.com/?q=Bistrot+d+Antoine+Nice", badge: "Pan-Seared Duck & Calamari" },
            { title: "Peixes (Seafood & Ceviche Bar)", rating: "4.7 ★ (1,340 Reviews)", price: "€22 - €36", meta: "🥑 Low-Carb Keto Ceviche", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop", queryText: "Peixes Nice", mapsUrl: "https://maps.google.com/?q=Peixes+Nice", badge: "Fresh Wild Riviera Octopus" }
        ],
        nightlife: [
            { title: "Le Rooftop 17 (Plaza Nice)", rating: "4.7 ★ (850 Reviews)", price: "Rooftop Lounge", meta: "Sunset Sea Views • Keto Mocktails", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop", queryText: "Le Rooftop 17 Nice", mapsUrl: "https://maps.google.com/?q=Le+Rooftop+17+Nice", badge: "Mediterranean Panorama" },
            { title: "High Club Nice", rating: "4.3 ★ (1,120 Reviews)", price: "Beach Club", meta: "International DJs", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop", queryText: "High Club Nice", mapsUrl: "https://maps.google.com/?q=High+Club+Nice", badge: "Post-Ironman Celebration" },
            { title: "Shapko Bar (Vieux Nice)", rating: "4.6 ★ (940 Reviews)", price: "Live Jazz Bar", meta: "Intimate Craft Cocktails", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop", queryText: "Shapko Bar Nice", mapsUrl: "https://maps.google.com/?q=Shapko+Bar+Nice", badge: "Nightly Live Jazz Sets" },
            { title: "Waka Bar Nice", rating: "4.5 ★ (1,650 Reviews)", price: "Oceanfront Pub", meta: "Promenade des Anglais Deck", img: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop", queryText: "Waka Bar Nice", mapsUrl: "https://maps.google.com/?q=Waka+Bar+Nice", badge: "Sunset House DJs" },
            { title: "L'Absinthe Bar (Old Town)", rating: "4.4 ★ (620 Reviews)", price: "Vintage Cellar Bar", meta: "Historic Speakeasy", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop", queryText: "L Absinthe Bar Nice", mapsUrl: "https://maps.google.com/?q=L+Absinthe+Bar+Nice", badge: "Cozy Cellar Atmosphere" }
        ]
    },
    "Interlaken, Switzerland": {
        hotels: [
            { title: "Victoria-Jungfrau Grand Hotel", rating: "4.8 ★ (1,950 Reviews)", price: "$650/night", meta: "0.1 km to Heightweg Promenade", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop", queryText: "Victoria Jungfrau Interlaken", mapsUrl: "https://maps.google.com/?q=Victoria+Jungfrau+Interlaken", badge: "5,500m² Alpine Spa • Lactose-Free" },
            { title: "Hotel Interlaken (Est. 1323)", rating: "4.6 ★ (1,220 Reviews)", price: "$280/night", meta: "0.5 km from Lukas Weber", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop", queryText: "Hotel Interlaken Switzerland", mapsUrl: "https://maps.google.com/?q=Hotel+Interlaken+Switzerland", badge: "Historic Lodge • Garden Bar" },
            { title: "Carlton-Europe Vintage Hotel", rating: "4.5 ★ (890 Reviews)", price: "$240/night", meta: "0.3 km from Elena Schmidt", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop", queryText: "Carlton Europe Interlaken", mapsUrl: "https://maps.google.com/?q=Carlton+Europe+Interlaken", badge: "Natural Swimming Pond" },
            { title: "Hotel Bellevue Interlaken", rating: "4.5 ★ (740 Reviews)", price: "$210/night", meta: "Aare Riverfront Views", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop", queryText: "Hotel Bellevue Interlaken", mapsUrl: "https://maps.google.com/?q=Hotel+Bellevue+Interlaken", badge: "Balcony River Views" },
            { title: "Salzano Hotel & Spa", rating: "4.7 ★ (610 Reviews)", price: "$260/night", meta: "1.2 km to Lakeshore", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop", queryText: "Salzano Hotel Interlaken", mapsUrl: "https://maps.google.com/?q=Salzano+Hotel+Interlaken", badge: "Swiss Pine Bio Sauna" }
        ],
        routes: [
            { title: "Harder Kulm Summit Climb", rating: "4.9 ★ (Google Trail)", price: "8.5 km Ridge Hike", meta: "800m Elevation Gain", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop", queryText: "Harder Kulm Interlaken", mapsUrl: "https://maps.google.com/?q=Harder+Kulm+Interlaken", badge: "Top of Interlaken Peak" },
            { title: "Eiger Glacier Ski & Hike Run", rating: "4.9 ★ (Google Trail)", price: "14.0 km Alpine Route", meta: "3.5 km/h Hike Pace", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop", queryText: "Eiger Glacier Trail Interlaken", mapsUrl: "https://maps.google.com/?q=Eiger+Glacier+Trail", badge: "Eiger North Face Trail" },
            { title: "Schynige Platte Ridge Walk", rating: "4.8 ★ (Google Trail)", price: "11.0 km Panorama Walk", meta: "Wildflower Gardens & Lakes", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop", queryText: "Schynige Platte Interlaken", mapsUrl: "https://maps.google.com/?q=Schynige+Platte+Interlaken", badge: "Jungfrau Panorama" },
            { title: "Lake Brienz Trail Loop", rating: "4.7 ★ (Google Trail)", price: "9.2 km Lakefront Track", meta: "Flat Gravel & Paved", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop", queryText: "Lake Brienz Trail Interlaken", mapsUrl: "https://maps.google.com/?q=Lake+Brienz+Interlaken", badge: "Turquoise Lake Views" },
            { title: "First Cliff Walk Grindelwald", rating: "4.9 ★ (Google Trail)", price: "6.4 km Cliff Bridge", meta: "Skywalk Suspension Bridge", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop", queryText: "First Cliff Walk Grindelwald", mapsUrl: "https://maps.google.com/?q=First+Cliff+Walk+Grindelwald", badge: "Suspended Cliffwalk Bridge" }
        ],
        bistros: [
            { title: "Restaurant Taverne (Interlaken)", rating: "4.7 ★ (980 Reviews)", price: "CHF 32 - CHF 55", meta: "🥛 Lactose-Free & 🐟 Pescatarian", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop", queryText: "Restaurant Taverne Interlaken", mapsUrl: "https://maps.google.com/?q=Restaurant+Taverne+Interlaken", badge: "Wild Swiss Lake Trout" },
            { title: "Restaurant Laterne", rating: "4.6 ★ (810 Reviews)", price: "CHF 28 - CHF 48", meta: "🥛 Lactose-Free Fondue & Fish", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop", queryText: "Restaurant Laterne Interlaken", mapsUrl: "https://maps.google.com/?q=Restaurant+Laterne+Interlaken", badge: "Pan-Seared Alpine Perch" },
            { title: "Sublime Lakefront Dining", rating: "4.8 ★ (1,150 Reviews)", price: "CHF 38 - CHF 65", meta: "🐟 Wild Pescatarian Menu", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop", queryText: "Sublime Interlaken", mapsUrl: "https://maps.google.com/?q=Sublime+Interlaken", badge: "Lake Brienz Terrace" },
            { title: "Restaurant Goldener Anker", rating: "4.5 ★ (670 Reviews)", price: "CHF 24 - CHF 42", meta: "🥛 Lactose-Free Craft Dining", img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&auto=format&fit=crop", queryText: "Goldener Anker Interlaken", mapsUrl: "https://maps.google.com/?q=Goldener+Anker+Interlaken", badge: "Fresh Alpine Salmon & Risotto" },
            { title: "Swiss Chalet Restaurant", rating: "4.6 ★ (1,420 Reviews)", price: "CHF 30 - CHF 52", meta: "🥛 Dairy-Free Swiss Specials", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop", queryText: "Swiss Chalet Interlaken", mapsUrl: "https://maps.google.com/?q=Swiss+Chalet+Interlaken", badge: "Traditional Wood Chalet" }
        ],
        nightlife: [
            { title: "Harder Kulm Panorama Lounge", rating: "4.8 ★ (1,950 Reviews)", price: "Peak Lounge", meta: "1,322m Altitude Terrace • Sunset", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop", queryText: "Harder Kulm Interlaken", mapsUrl: "https://maps.google.com/?q=Harder+Kulm+Interlaken", badge: "Panoramic Peak Sunset Views" },
            { title: "Balmers Club & Metro Bar", rating: "4.5 ★ (620 Reviews)", price: "Alpine Music Bar", meta: "Bonfire Outdoor Lounge & DJ", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop", queryText: "Balmers Club Interlaken", mapsUrl: "https://maps.google.com/?q=Balmers+Club+Interlaken", badge: "Swiss Craft Beer & Music" },
            { title: "Hüsi Bierhaus", rating: "4.6 ★ (1,340 Reviews)", price: "Craft Taproom", meta: "50+ Craft Beers & Terrace", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop", queryText: "Husi Bierhaus Interlaken", mapsUrl: "https://maps.google.com/?q=Husi+Bierhaus+Interlaken", badge: "Cozy Rustic Pub" },
            { title: "Three Tells Irish Pub", rating: "4.5 ★ (910 Reviews)", price: "Live Music Pub", meta: "Aare River Terrace", img: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop", queryText: "Three Tells Irish Pub Interlaken", mapsUrl: "https://maps.google.com/?q=Three+Tells+Irish+Pub+Interlaken", badge: "Weekend Acoustic Sets" },
            { title: "Victoria Lounge & Bar", rating: "4.7 ★ (850 Reviews)", price: "Grand Piano Bar", meta: "Jungfrau Peak Views", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop", queryText: "Victoria Lounge Interlaken", mapsUrl: "https://maps.google.com/?q=Victoria+Lounge+Interlaken", badge: "Classic Piano & Cocktails" }
        ]
    }
};

// Friends Data
const FRIENDS_BY_EVENT = {
    "Paris Marathon 2026": [
        { name: "Jessica Lin", avatar: "🏃‍♀️", hotel: "Hôtel Étoile Saint Ferdinand", distance: "0.3 km away", diet: "🌾 GF & 🌱 Vegan", userWalkTime: "8 mins walk", friendWalkTime: "6 mins walk", queryText: "Hotel Etoile Saint Ferdinand Paris", mapsUrl: "https://maps.google.com/?q=Hotel+Etoile+Saint+Ferdinand+Paris", status: "Online • 0.3 km away" },
        { name: "David Kim", avatar: "🏃‍♂️", hotel: "Le Royal Monceau Raffles", distance: "0.4 km away", diet: "🌱 Vegetarian", userWalkTime: "6 mins walk", friendWalkTime: "4 mins walk", queryText: "Le Royal Monceau Paris", mapsUrl: "https://maps.google.com/?q=Le+Royal+Monceau+Paris", status: "Online • 0.4 km away" },
        { name: "Sophie Moreau", avatar: "🏃‍♀️", hotel: "Hôtel Napoleon Paris", distance: "0.2 km away", diet: "🌾 Gluten-Free", userWalkTime: "4 mins walk", friendWalkTime: "3 mins walk", queryText: "Hotel Napoleon Paris", mapsUrl: "https://maps.google.com/?q=Hotel+Napoleon+Paris", status: "Away • 0.2 km away" }
    ],
    "Nice Ironman & Cycling Tour": [
        { name: "Tom Miller", avatar: "🚴‍♂️", hotel: "Hyatt Regency Nice", distance: "0.2 km away", diet: "🥑 100% Keto", userWalkTime: "4 mins walk", friendWalkTime: "2 mins walk", queryText: "Hyatt Regency Nice", mapsUrl: "https://maps.google.com/?q=Hyatt+Regency+Nice", status: "Online • 0.2 km away" },
        { name: "Chloe Dupont", avatar: "🚴‍♀️", hotel: "Radisson Blu Hotel Nice", distance: "0.6 km away", diet: "🥜 Nut-Free & 🐟 Pescatarian", userWalkTime: "10 mins walk", friendWalkTime: "5 mins bike", queryText: "Radisson Blu Hotel Nice", mapsUrl: "https://maps.google.com/?q=Radisson+Blu+Hotel+Nice", status: "Online • 0.6 km away" },
        { name: "Marco Rossi", avatar: "🚴‍♂️", hotel: "Hôtel Aston La Scala", distance: "0.5 km away", diet: "🥑 Keto & 🌾 GF", userWalkTime: "9 mins walk", friendWalkTime: "7 mins walk", queryText: "Hotel Aston La Scala Nice", mapsUrl: "https://maps.google.com/?q=Hotel+Aston+La+Scala+Nice", status: "Online • 0.5 km away" }
    ],
    "Swiss Alps Trail Hike": [
        { name: "Lukas Weber", avatar: "🥾", hotel: "Hotel Interlaken (Est. 1323)", distance: "0.5 km away", diet: "🥛 Lactose-Free", userWalkTime: "7 mins walk", friendWalkTime: "5 mins walk", queryText: "Hotel Interlaken Switzerland", mapsUrl: "https://maps.google.com/?q=Hotel+Interlaken+Switzerland", status: "Online • 0.5 km away" },
        { name: "Elena Schmidt", avatar: "🥾", hotel: "Carlton-Europe Vintage Hotel", distance: "0.3 km away", diet: "🐟 Pescatarian & 🥛 Lactose-Free", userWalkTime: "5 mins walk", friendWalkTime: "3 mins walk", queryText: "Carlton Europe Interlaken", mapsUrl: "https://maps.google.com/?q=Carlton+Europe+Interlaken", status: "Online • 0.3 km away" }
    ]
};

let currentProfile = USER_PROFILES.alex;
let activeCategoryTab = "all";
let activeChatFriend = null;

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    switchUserProfile();
});

// DARK / LIGHT THEME FUNCTIONS
function initTheme() {
    const savedTheme = localStorage.getItem("pulse_plate_theme") || "dark";
    if (savedTheme === "light") {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        updateThemeBtnUI(true);
    } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        updateThemeBtnUI(false);
    }
}

function toggleTheme() {
    const isLight = document.body.classList.contains("light-theme");
    if (isLight) {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("pulse_plate_theme", "dark");
        updateThemeBtnUI(false);
    } else {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("pulse_plate_theme", "light");
        updateThemeBtnUI(true);
    }
}

function updateThemeBtnUI(isLight) {
    const iconEl = document.getElementById("themeIcon");
    const labelEl = document.getElementById("themeLabel");
    if (isLight) {
        if (iconEl) iconEl.innerText = "🌙";
        if (labelEl) labelEl.innerText = "Dark Mode";
    } else {
        if (iconEl) iconEl.innerText = "☀️";
        if (labelEl) labelEl.innerText = "Light Mode";
    }
}

function switchUserProfile() {
    const selectEl = document.getElementById("userProfileSelect");
    const selectedKey = selectEl ? selectEl.value : "alex";
    currentProfile = USER_PROFILES[selectedKey] || USER_PROFILES.alex;
    
    // Update Profile Sidebar
    document.getElementById("profileAvatar").innerText = currentProfile.avatar;
    document.getElementById("profileName").innerText = currentProfile.name;
    document.getElementById("profileEvent").innerText = currentProfile.event;
    document.getElementById("profileTarget").innerText = currentProfile.target;
    document.getElementById("profilePace").innerText = currentProfile.pace;
    document.getElementById("profileBudget").innerText = currentProfile.budget;
    
    document.getElementById("profileDietTags").innerHTML = currentProfile.dietTags.map(tag => `<span class="diet-tag">${tag}</span>`).join(" ");

    // Update Quick Actions
    const actionGrid = document.getElementById("actionGrid");
    actionGrid.innerHTML = currentProfile.quickActions.map(act => `
        <button class="action-btn" onclick="sendAction('${escapeHtml(act.prompt)}')">
            <span class="icon">${act.icon}</span>
            <span class="label">${act.label}</span>
        </button>
    `).join("");

    // Render At-A-Glance Visual Dashboard Grid (Friends -> Routes -> Bistros -> Nightlife -> Hotels)
    renderAtAGlanceDashboard(activeCategoryTab);
}

function switchCategoryTab(category, btnEl) {
    activeCategoryTab = category;
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
    renderAtAGlanceDashboard(category);
}

function renderAtAGlanceDashboard(category = "all") {
    const mainContainer = document.getElementById("atAGlanceView");
    const cityData = DASHBOARD_DATA[currentProfile.location] || DASHBOARD_DATA["Paris, France"];
    const friends = FRIENDS_BY_EVENT[currentProfile.event] || [];

    let html = "";

    // 1. ATTENDING FRIENDS SQUAD SECTION (FIRST AT TOP)
    if (category === "all" || category === "friends") {
        html += `
            <section class="glance-section">
                <div class="glance-header">
                    <h3>👥 Friends Attending ${escapeHtml(currentProfile.event)} <span class="badge" style="background:rgba(245,158,11,0.2); color:#f59e0b;">${friends.length} Squad Members</span></h3>
                    <button class="map-btn-inline" onclick="openAddFriendModal()">+ Add Friend to Event</button>
                </div>
                <div class="glance-card-grid">
                    ${friends.map(f => `
                        <div class="item-card" style="padding:12px; cursor:default;">
                            <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                                <div class="friend-avatar" style="width:40px; height:40px; font-size:1.2rem;">${f.avatar}</div>
                                <div>
                                    <div style="font-weight:700; font-size:0.95rem;">${escapeHtml(f.name)}</div>
                                    <div style="font-size:0.75rem; color:#10b981;">🟢 ${f.status}</div>
                                </div>
                            </div>
                            <div style="font-size:0.78rem; color:var(--text-secondary);">🏨 Staying at: <strong>${escapeHtml(f.hotel)}</strong> (${f.distance})</div>
                            <div style="font-size:0.78rem; color:#10b981; margin-top:4px;">Diet: <strong>${f.diet}</strong></div>
                            <div class="travel-time-badge" style="margin-top:6px;">⏱️ You: ${f.userWalkTime} | ${f.name.split(' ')[0]}: ${f.friendWalkTime}</div>
                            
                            <div style="display:flex; gap:6px; margin-top:10px;">
                                <button class="send-btn" style="flex:1; justify-content:center; padding:6px; font-size:0.75rem;" onclick="openFriendChatModal('${escapeHtml(f.name)}')">💬 Chat</button>
                                <button class="map-btn-inline" style="flex:1;" onclick="openMapModal('${escapeHtml(f.name)}\\'s Hotel', '${escapeHtml(f.queryText)}', '${f.mapsUrl}')">📍 Map Hotel</button>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </section>
        `;
    }

    // 2. ROUTES & PLACES SECTION (SECOND)
    if (category === "all" || category === "routes") {
        html += `
            <section class="glance-section">
                <div class="glance-header">
                    <h3>🏃 Popular Routes, Hikes & Places <span class="badge">${cityData.routes.length} Grounded Routes</span></h3>
                    <span class="subtext" style="color:#10b981;">Target Pace: ${currentProfile.pace}</span>
                </div>
                <div class="glance-card-grid">
                    ${cityData.routes.map(r => `
                        <div class="item-card" onclick="openMapModal('${escapeHtml(r.title)}', '${escapeHtml(r.queryText)}', '${r.mapsUrl}')">
                            <img src="${r.img}" class="item-card-img" alt="${escapeHtml(r.title)}"/>
                            <div class="item-card-body">
                                <div class="item-card-title">${escapeHtml(r.title)}</div>
                                <div class="item-card-meta">
                                    <span style="color:#f59e0b; font-weight:700;">${r.rating}</span>
                                    <span style="color:#10b981; font-weight:700;">${r.price}</span>
                                </div>
                                <div style="font-size:0.72rem; color:var(--text-secondary);">⛰️ ${r.meta}</div>
                                <div class="item-card-badge">${r.badge}</div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </section>
        `;
    }

    // 3. DIETARY RESTAURANTS & BISTROS SECTION (THIRD)
    if (category === "all" || category === "bistros") {
        html += `
            <section class="glance-section">
                <div class="glance-header">
                    <h3>🥗 Dietary Restaurants & Bistros <span class="badge">${cityData.bistros.length} Grounded Bistros</span></h3>
                    <span class="subtext" style="color:#10b981;">100% Compliant with ${currentProfile.dietTags.join(", ")}</span>
                </div>
                <div class="glance-card-grid">
                    ${cityData.bistros.map(b => `
                        <div class="item-card" onclick="openMapModal('${escapeHtml(b.title)}', '${escapeHtml(b.queryText)}', '${b.mapsUrl}')">
                            <img src="${b.img}" class="item-card-img" alt="${escapeHtml(b.title)}"/>
                            <div class="item-card-body">
                                <div class="item-card-title">${escapeHtml(b.title)}</div>
                                <div class="item-card-meta">
                                    <span style="color:#f59e0b; font-weight:700;">${b.rating}</span>
                                    <span style="color:#10b981; font-weight:700;">${b.price}</span>
                                </div>
                                <div style="font-size:0.72rem; color:var(--text-secondary);">🥗 ${b.meta}</div>
                                <div class="item-card-badge">${b.badge}</div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </section>
        `;
    }

    // 4. EVENTS & NIGHTLIFE SECTION (FOURTH)
    if (category === "all" || category === "nightlife") {
        html += `
            <section class="glance-section">
                <div class="glance-header">
                    <h3>🎭 Local Events & Nightlife Lounges <span class="badge">${cityData.nightlife.length} Grounded Venues</span></h3>
                    <span class="subtext">Rooftop Bars, Live Music & Post-Event Celebrations</span>
                </div>
                <div class="glance-card-grid">
                    ${cityData.nightlife.map(n => `
                        <div class="item-card" onclick="openMapModal('${escapeHtml(n.title)}', '${escapeHtml(n.queryText)}', '${n.mapsUrl}')">
                            <img src="${n.img}" class="item-card-img" alt="${escapeHtml(n.title)}"/>
                            <div class="item-card-body">
                                <div class="item-card-title">${escapeHtml(n.title)}</div>
                                <div class="item-card-meta">
                                    <span style="color:#f59e0b; font-weight:700;">${n.rating}</span>
                                    <span style="color:#10b981; font-weight:700;">${n.price}</span>
                                </div>
                                <div style="font-size:0.72rem; color:var(--text-secondary);">🍸 ${n.meta}</div>
                                <div class="item-card-badge">${n.badge}</div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </section>
        `;
    }

    // 5. HOTELS & STAYS SECTION (FIFTH AT BOTTOM)
    if (category === "all" || category === "hotels") {
        html += `
            <section class="glance-section">
                <div class="glance-header">
                    <h3>🏨 Hotels & Stays in ${escapeHtml(currentProfile.location)} <span class="badge">${cityData.hotels.length} Grounded Hotels</span></h3>
                    <span class="subtext" style="color:#10b981;">Matching ${currentProfile.dietTags.join(" & ")} Preferences</span>
                </div>
                <div class="glance-card-grid">
                    ${cityData.hotels.map(h => `
                        <div class="item-card" onclick="openMapModal('${escapeHtml(h.title)}', '${escapeHtml(h.queryText)}', '${h.mapsUrl}')">
                            <img src="${h.img}" class="item-card-img" alt="${escapeHtml(h.title)}"/>
                            <div class="item-card-body">
                                <div class="item-card-title">${escapeHtml(h.title)}</div>
                                <div class="item-card-meta">
                                    <span style="color:#f59e0b; font-weight:700;">${h.rating}</span>
                                    <span style="color:#10b981; font-weight:700;">${h.price}</span>
                                </div>
                                <div style="font-size:0.72rem; color:var(--text-secondary);">📍 ${h.meta}</div>
                                <div class="item-card-badge">${h.badge}</div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </section>
        `;
    }

    mainContainer.innerHTML = html;
}

// AI CHAT DRAWER & CONCIERGE FUNCTIONS
function toggleAiDrawer() {
    const drawer = document.getElementById("aiChatDrawer");
    drawer.classList.toggle("hidden");
}

function handleDrawerBackdropClick(e) {
    if (e.target.id === "aiChatDrawer") {
        toggleAiDrawer();
    }
}

function sendAction(promptText) {
    document.getElementById("userInput").value = promptText;
    const drawer = document.getElementById("aiChatDrawer");
    if (drawer.classList.contains("hidden")) {
        toggleAiDrawer();
    }
    submitMessage();
}

async function submitMessage() {
    const inputEl = document.getElementById("userInput");
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = "";
    appendUserMessage(text);
    const loadingId = appendLoadingMessage();

    try {
        const response = await fetch("/api/custom_chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: text, session_id: currentProfile.sessionId })
        });
        const data = await response.json();
        removeMessage(loadingId);
        appendAgentResponse(data.reply, data.tool_calls, text);
    } catch (err) {
        removeMessage(loadingId);
        appendAgentResponse("❌ Failed to reach AI assistant: " + err.message, [], text);
    }
}

function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submitMessage();
    }
}

function appendUserMessage(text) {
    const feed = document.getElementById("feedMessages");
    const msgDiv = document.createElement("div");
    msgDiv.className = "message user-message";
    msgDiv.innerHTML = `
        <div class="msg-avatar">${currentProfile.avatar}</div>
        <div class="msg-body">
            <div class="msg-author">${currentProfile.name}</div>
            <div class="msg-text">${escapeHtml(text)}</div>
        </div>
    `;
    feed.appendChild(msgDiv);
    feed.scrollTop = feed.scrollHeight;
}

function appendLoadingMessage() {
    const feed = document.getElementById("feedMessages");
    const id = "loading_" + Date.now();
    const msgDiv = document.createElement("div");
    msgDiv.id = id;
    msgDiv.className = "message";
    msgDiv.innerHTML = `
        <div class="msg-avatar">${currentProfile.avatar}</div>
        <div class="msg-body">
            <div class="msg-author">Pulse & Plate Assistant</div>
            <div class="msg-text"><em>Consulting specialist sub-agents for ${currentProfile.name}... ✈️</em></div>
        </div>
    `;
    feed.appendChild(msgDiv);
    feed.scrollTop = feed.scrollHeight;
    return id;
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function appendAgentResponse(reply, toolCalls, userPrompt = "") {
    const feed = document.getElementById("feedMessages");
    const msgDiv = document.createElement("div");
    msgDiv.className = "message";
    const formattedReply = reply.replace(/\n/g, "<br/>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    msgDiv.innerHTML = `
        <div class="msg-avatar">${currentProfile.avatar}</div>
        <div class="msg-body">
            <div class="msg-author">Pulse & Plate Assistant</div>
            <div class="msg-text">${formattedReply}</div>
        </div>
    `;
    feed.appendChild(msgDiv);
    feed.scrollTop = feed.scrollHeight;
}

// FRIEND DIRECT CHAT MODAL FUNCTIONS
function openFriendChatModal(friendName) {
    const friends = FRIENDS_BY_EVENT[currentProfile.event] || [];
    const friend = friends.find(f => f.name === friendName) || friends[0];
    if (!friend) return;

    activeChatFriend = friend;
    if (!activeChatFriend.chatHistory) {
        activeChatFriend.chatHistory = [
            { sender: friend.name, text: `Hey ${currentProfile.name}! Ready to pick places in ${currentProfile.location.split(',')[0]}?` }
        ];
    }

    const headerEl = document.getElementById("friendChatHeader");
    headerEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:10px;">
                <div class="friend-avatar" style="width:42px; height:42px; font-size:1.3rem;">${friend.avatar}</div>
                <div>
                    <h3 class="modal-header-title" style="font-size:1.2rem; margin:0;">Chat with ${escapeHtml(friend.name)}</h3>
                    <div style="font-size:0.75rem; color:#10b981;">🟢 ${friend.status}</div>
                </div>
            </div>
            <div style="text-align:right;">
                <div style="font-size:0.75rem; color:var(--text-secondary);">Staying at: <strong>${escapeHtml(friend.hotel)}</strong></div>
                <div class="travel-time-badge">⏱️ Walk to Venue: You (${friend.userWalkTime}) | ${friend.name.split(' ')[0]} (${friend.friendWalkTime})</div>
            </div>
        </div>
    `;

    renderFriendChatMessages();

    const pillsEl = document.getElementById("friendPlacePills");
    pillsEl.innerHTML = `
        <span style="font-size:0.75rem; color:var(--text-secondary); align-self:center; font-weight:700;">Pick Places Together:</span>
        <button class="map-btn-inline" onclick="suggestPlaceToFriend('Parc Track Loop')">🏃 Suggest Track Loop (10 min both)</button>
        <button class="map-btn-inline" style="background:rgba(245,158,11,0.2); color:#f59e0b; border-color:#f59e0b;" onclick="suggestPlaceToFriend('Dietary Safe Bistro')">🥗 Suggest Dietary Bistro (12 min walk both)</button>
    `;

    document.getElementById("friendChatModal").classList.remove("hidden");
}

function renderFriendChatMessages() {
    if (!activeChatFriend) return;
    const msgContainer = document.getElementById("friendChatMessages");
    msgContainer.innerHTML = activeChatFriend.chatHistory.map(m => `
        <div class="${m.sender === currentProfile.name ? 'chat-msg-sent' : 'chat-msg-recv'}">
            <div style="font-size:0.7rem; color:var(--text-secondary); margin-bottom:2px;">${m.sender}</div>
            <div>${escapeHtml(m.text)}</div>
        </div>
    `).join("");
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

function sendFriendDirectMessage() {
    const input = document.getElementById("friendChatInput");
    const text = input.value.trim();
    if (!text || !activeChatFriend) return;

    input.value = "";
    activeChatFriend.chatHistory.push({ sender: currentProfile.name, text: text });
    renderFriendChatMessages();

    setTimeout(() => {
        let friendReply = `Awesome proposal! That spot is only ${activeChatFriend.friendWalkTime} from my hotel (${activeChatFriend.hotel}). See you there! 🙌`;
        activeChatFriend.chatHistory.push({ sender: activeChatFriend.name, text: friendReply });
        renderFriendChatMessages();
    }, 1000);
}

function suggestPlaceToFriend(placeName) {
    if (!activeChatFriend) return;
    const suggestionText = `Hey ${activeChatFriend.name.split(' ')[0]}! How about meeting up at ${placeName}? It's ${activeChatFriend.userWalkTime} for me and ${activeChatFriend.friendWalkTime} for you! 📍`;
    activeChatFriend.chatHistory.push({ sender: currentProfile.name, text: suggestionText });
    renderFriendChatMessages();

    setTimeout(() => {
        let friendReply = `Sounds perfect! ${placeName} fits our dietary restrictions and travel times. Count me in! 🚀`;
        activeChatFriend.chatHistory.push({ sender: activeChatFriend.name, text: friendReply });
        renderFriendChatMessages();
    }, 1000);
}

function handleFriendChatKeyPress(e) {
    if (e.key === "Enter") {
        sendFriendDirectMessage();
    }
}

function closeFriendChatModal() {
    document.getElementById("friendChatModal").classList.add("hidden");
}

function handleFriendChatBackdropClick(e) {
    if (e.target.id === "friendChatModal") {
        closeFriendChatModal();
    }
}

// Map Modal Function
function openMapModal(title, queryText, externalUrl) {
    const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(queryText)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    const mapContent = document.getElementById("mapModalContent");

    mapContent.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div>
                <h2 class="modal-header-title">🗺️ ${escapeHtml(title)} Map View</h2>
                <div class="modal-meta-bar" style="margin-bottom:0;">Grounded Location View • Google Maps Embed</div>
            </div>
            <a href="${externalUrl}" target="_blank" class="send-btn" style="padding:8px 14px; font-size:0.8rem; text-decoration:none; margin-right:40px;">
                <span>🔗 Open in New Window / Tab</span>
            </a>
        </div>

        <div class="map-view-box">
            <iframe src="${embedSrc}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; color:var(--text-secondary); margin-top:8px;">
            <span>📍 Location: <strong>${escapeHtml(queryText)}</strong></span>
            <a href="${externalUrl}" target="_blank" style="color:#10b981; font-weight:700; text-decoration:none;">Open Full Screen Google Maps ↗</a>
        </div>
    `;

    document.getElementById("mapModal").classList.remove("hidden");
}

function closeMapModal() {
    document.getElementById("mapModal").classList.add("hidden");
}

function handleMapModalBackdropClick(e) {
    if (e.target.id === "mapModal") {
        closeMapModal();
    }
}

// Add Friend Modal Functions
function openAddFriendModal() {
    document.getElementById("addFriendModal").classList.remove("hidden");
}

function closeAddFriendModal() {
    document.getElementById("addFriendModal").classList.add("hidden");
}

function handleAddFriendBackdropClick(e) {
    if (e.target.id === "addFriendModal") {
        closeAddFriendModal();
    }
}

function submitNewFriend(e) {
    e.preventDefault();
    const name = document.getElementById("friendNameInput").value.trim();
    const email = document.getElementById("friendEmailInput").value.trim();
    const hotel = document.getElementById("friendHotelInput").value.trim();
    const diet = document.getElementById("friendDietInput").value.trim() || "Gluten-Free & Vegan";

    if (!name || !hotel) return;

    const newFriendObj = {
        name: name,
        avatar: "🏃‍♂️",
        hotel: hotel,
        distance: "0.5 km away",
        diet: diet,
        userWalkTime: "7 mins walk",
        friendWalkTime: "5 mins walk",
        status: "Online • 0.5 km away",
        queryText: `${hotel} ${currentProfile.location}`,
        mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(hotel)}`,
        chatHistory: [
            { sender: name, text: `Hey ${currentProfile.name}! Thanks for adding me to your ${currentProfile.event} squad! I'm staying at ${hotel}.` }
        ]
    };

    if (!FRIENDS_BY_EVENT[currentProfile.event]) {
        FRIENDS_BY_EVENT[currentProfile.event] = [];
    }
    FRIENDS_BY_EVENT[currentProfile.event].push(newFriendObj);

    renderAtAGlanceDashboard(activeCategoryTab);
    closeAddFriendModal();

    document.getElementById("friendNameInput").value = "";
    document.getElementById("friendEmailInput").value = "";
    document.getElementById("friendHotelInput").value = "";
    document.getElementById("friendDietInput").value = "";

    openFriendChatModal(name);
}

function resetSession() {
    renderAtAGlanceDashboard("all");
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
