// Pulse & Plate At-A-Glance Visual Travel & Lifestyle OS Dashboard JS
// Features: Dual Theme, Weather Widget, Daily Itinerary Planner, Expense Splitter, Rich Photo/Review Modal, Dynamic AI City & Marathon Switcher

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
            { label: "Boston Marathon 2026", prompt: "Plan for Boston Marathon next month and show Boston hotels, routes, and gluten-free bistros.", icon: "🏙️" },
            { label: "Marathon Shakeout Loops", prompt: "Find popular 5k running loops in active city with travel times.", icon: "🏃" },
            { label: "Vegan GF Bistros", prompt: "Recommend top-rated vegan and gluten-free bistros in active city.", icon: "🥗" },
            { label: "Friends Attending Event", prompt: "Show friends attending event and calculate travel times for us.", icon: "👥" }
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
            { label: "Boston Marathon 2026", prompt: "Plan for Boston Marathon next month and show Boston hotels, routes, and keto dining.", icon: "🏙️" },
            { label: "Coastal Cycling Loops", prompt: "Find popular cycling routes and climbs in active city.", icon: "🚴" },
            { label: "Keto & Nut-Free Bistros", prompt: "Find top-rated Keto seafood bistros in active city.", icon: "🥩" },
            { label: "Friends Attending Event", prompt: "Show friends attending event and calculate travel times.", icon: "👥" }
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
            { label: "Boston Marathon 2026", prompt: "Plan for Boston Marathon next month and show Boston hotels, routes, and seafood bistros.", icon: "🏙️" },
            { label: "Harder Kulm & Hikes", prompt: "Find popular hikes and trails in active city.", icon: "🥾" },
            { label: "Lactose-Free Fish Dining", prompt: "Recommend lactose-free pescatarian dining in active city.", icon: "🐟" },
            { label: "Friends Attending Event", prompt: "Show friends attending event and calculate travel times.", icon: "👥" }
        ],
        welcomeText: "Active Traveler: <strong>Marcus Vance</strong> (Lactose-Free & Pescatarian Hiker). Explore friends, trail hikes, lakeside dining, nightlife, and hotels below!"
    }
};

// LIVE WEATHER & RACE-DAY CONDITIONS DATA
const WEATHER_BY_CITY = {
    "Paris, France": {
        city: "Paris, France",
        temp: "14°C / 57°F",
        condition: "⛅ Partly Cloudy",
        wind: "8 km/h NW",
        humidity: "62%",
        uv: "4 (Moderate)",
        advice: "🏃 Race Day Tip: Ideal marathon running temperature. Hydrate with electrolyte gels every 5 km along Champs-Élysées."
    },
    "Nice, France": {
        city: "Nice, France",
        temp: "22°C / 71°F",
        condition: "☀️ Coastal Riviera Breeze",
        wind: "14 km/h SE",
        humidity: "55%",
        uv: "7 (High)",
        advice: "🚴 Cycling Tip: Strong coastal winds on Col d'Èze descent. Apply sunscreen & carry double water bottles."
    },
    "Interlaken, Switzerland": {
        city: "Interlaken, Switzerland",
        temp: "11°C / 51°F",
        condition: "🏔️ Alpine Crisp & Clear",
        wind: "6 km/h SW",
        humidity: "48%",
        uv: "5 (Moderate)",
        advice: "🥾 Hiking Tip: Crisp air at Harder Kulm peak. Thermal windbreaker & trail boots strongly recommended."
    },
    "Boston, MA": {
        city: "Boston, MA",
        temp: "16°C / 61°F",
        condition: "☀️ Clear Blue Sky",
        wind: "10 km/h East",
        humidity: "50%",
        uv: "5 (Moderate)",
        advice: "🏃 Patriots' Day Marathon Tip: Cool breeze along the Charles River. Perfect conditions for Heartbreak Hill!"
    }
};

// AT-A-GLANCE GROUNDED DATASETS (5 Items Per Category Per City)
const DASHBOARD_DATA = {
    "Paris, France": {
        hotels: [
            { title: "Hôtel Plaza Athénée", rating: "4.7 ★ (2,100 Reviews)", price: "$480/night", meta: "0.6 km to Start Line", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop"], queryText: "Hotel Plaza Athenee Paris", mapsUrl: "https://maps.google.com/?q=Hotel+Plaza+Athenee+Paris", badge: "Certified GF Bakery • Spa", reviews: ["'Outstanding gluten-free pre-marathon breakfast buffet!' - Jean L."] },
            { title: "Hôtel Étoile Saint Ferdinand", rating: "4.5 ★ (980 Reviews)", price: "$290/night", meta: "0.3 km from Jessica Lin", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop"], queryText: "Hotel Etoile Saint Ferdinand Paris", mapsUrl: "https://maps.google.com/?q=Hotel+Etoile+Saint+Ferdinand+Paris", badge: "Vegan Breakfast • Quiet", reviews: ["'Quiet rooms for a solid night sleep before race day.' - Sarah B."] },
            { title: "Le Royal Monceau Raffles", rating: "4.8 ★ (1,540 Reviews)", price: "$520/night", meta: "0.4 km from David Kim", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop"], queryText: "Le Royal Monceau Paris", mapsUrl: "https://maps.google.com/?q=Le+Royal+Monceau+Paris", badge: "Luxury Pool • GF Dining", reviews: ["'World-class spa recovery post marathon!' - David K."] },
            { title: "Hôtel Napoleon Paris", rating: "4.6 ★ (1,120 Reviews)", price: "$340/night", meta: "0.2 km from Sophie Moreau", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop"], queryText: "Hotel Napoleon Paris", mapsUrl: "https://maps.google.com/?q=Hotel+Napoleon+Paris", badge: "Arc de Triomphe Views", reviews: ["'Step right out to the Arc de Triomphe!' - Sophie M."] },
            { title: "Pullman Paris Tour Eiffel", rating: "4.5 ★ (3,400 Reviews)", price: "$310/night", meta: "1.1 km to Finish Line", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop"], queryText: "Pullman Paris Tour Eiffel", mapsUrl: "https://maps.google.com/?q=Pullman+Paris+Tour+Eiffel", badge: "Fitness Gym • Eiffel Views", reviews: ["'Stunning view of the Eiffel Tower from balcony.' - Claire D."] }
        ],
        routes: [
            { title: "Parc Rives de Seine Loop", rating: "4.8 ★ (Google Trail)", price: "5.2 km Track", meta: "Pace Target: 4:58 min/km", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop"], queryText: "Parc Rives de Seine Paris", mapsUrl: "https://maps.google.com/?q=Parc+Rives+de+Seine+Paris", badge: "Car-Free Riverfront Run", reviews: ["'Flat car-free path along the river! Perfect pre-marathon shakeout.' - Alex M."] },
            { title: "Parc Monceau Circuit", rating: "4.7 ★ (Google Trail)", price: "2.5 km Perimeter", meta: "Flat Asphalt • Smooth", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop"], queryText: "Parc Monceau Paris", mapsUrl: "https://maps.google.com/?q=Parc+Monceau+Paris", badge: "Shaded Runners Track", reviews: ["'Shaded smooth loop for interval sprints.' - Marc T."] },
            { title: "Jardin du Luxembourg Loop", rating: "4.9 ★ (Google Trail)", price: "3.8 km Gravel Track", meta: "Light Elevation Gain", img: "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=600&auto=format&fit=crop"], queryText: "Jardin du Luxembourg Paris", mapsUrl: "https://maps.google.com/?q=Jardin+du+Luxembourg+Paris", badge: "Historic Gardens Track", reviews: ["'Beautiful morning garden run.' - Ellen R."] },
            { title: "Bois de Boulogne Marathon Trail", rating: "4.6 ★ (Google Trail)", price: "12.0 km Forest Track", meta: "Trail & Asphalt Mix", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop"], queryText: "Bois de Boulogne Paris", mapsUrl: "https://maps.google.com/?q=Bois+de+Boulogne+Paris", badge: "Scenic Lakes & Woodlands", reviews: ["'Sub-marathon distance long run trail.' - Luc P."] },
            { title: "Champ de Mars Eiffel Sprint", rating: "4.8 ★ (Google Trail)", price: "4.0 km Loop", meta: "Flat Sprint Grounds", img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&auto=format&fit=crop"], queryText: "Champ de Mars Paris", mapsUrl: "https://maps.google.com/?q=Champ+de+Mars+Paris", badge: "Eiffel Tower Finish", reviews: ["'Finishing right beneath the Eiffel Tower feels unreal.' - Antoine C."] }
        ],
        bistros: [
            { title: "Noglu Paris (Gluten-Free)", rating: "4.7 ★ (1,240 Reviews)", price: "€18 - €32", meta: "🌾 100% GF & 🌱 Vegan", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop"], queryText: "Noglu Paris France", mapsUrl: "https://maps.google.com/?q=Noglu+Paris", badge: "Certified Gluten-Free Bakery", reviews: ["'The gold standard for gluten-free pasta & bread in Paris!' - Celiac Travel Review"] },
            { title: "Wild & The Moon (Paris)", rating: "4.6 ★ (1,890 Reviews)", price: "€14 - €24", meta: "🌱 Organic Vegan & GF Bowls", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop"], queryText: "Wild and The Moon Paris", mapsUrl: "https://maps.google.com/?q=Wild+and+The+Moon+Paris", badge: "Cold-Pressed Juices & Protein Bowls", reviews: ["'Best cold-pressed juices for marathon prep.' - Tom H."] },
            { title: "Le Potager de Charlotte", rating: "4.8 ★ (1,150 Reviews)", price: "€26 - €42", meta: "🌱 Fine Plant-Based Dining", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop"], queryText: "Le Potager de Charlotte Paris", mapsUrl: "https://maps.google.com/?q=Le+Potager+de+Charlotte+Paris", badge: "Gourmet Avocado Roti & GF Pasta", reviews: ["'Mind-blowing gourmet plant-based creations!' - Gourmet Paris Guide"] },
            { title: "Aujourd'hui Demain", rating: "4.7 ★ (890 Reviews)", price: "€16 - €28", meta: "🌱 Vegan Comfort Bistro", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop"], queryText: "Aujourdhui Demain Paris", mapsUrl: "https://maps.google.com/?q=Aujourdhui+Demain+Paris", badge: "Vegan Pancakes & Mac-Cheese", reviews: ["'Cozy vegan cafe with great pre-race carbs.' - Marion S."] },
            { title: "Hank Burger (Paris)", rating: "4.5 ★ (2,100 Reviews)", price: "€12 - €20", meta: "🌱 Vegan Burgers & GF Buns", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop"], queryText: "Hank Burger Paris", mapsUrl: "https://maps.google.com/?q=Hank+Burger+Paris", badge: "Quick Pre-Race Carbo Loading", reviews: ["'Super fast, delicious GF vegan burgers.' - Ben K."] }
        ],
        nightlife: [
            { title: "Le Perchoir Marais Rooftop", rating: "4.6 ★ (1,450 Reviews)", price: "Rooftop Lounge", meta: "Skyline Views • Organic Drinks", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop"], queryText: "Le Perchoir Marais Paris", mapsUrl: "https://maps.google.com/?q=Le+Perchoir+Marais+Paris", badge: "Eiffel Tower Sunset Terrace", reviews: ["'Incredible sunset panorama of Paris rooftops!' - Camille L."] },
            { title: "La Station Gare des Mines", rating: "4.5 ★ (980 Reviews)", price: "Open-Air Music", meta: "Outdoor Sets & Food Trucks", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop"], queryText: "La Station Gare des Mines Paris", mapsUrl: "https://maps.google.com/?q=La+Station+Gare+des+Mines+Paris", badge: "Post-Race Celebration Venue", reviews: ["'Vibrant open-air dancefloor.' - Leo G."] },
            { title: "Rex Club Paris", rating: "4.6 ★ (2,800 Reviews)", price: "Electronic Lounge", meta: "World-Class Acoustics", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop"], queryText: "Rex Club Paris", mapsUrl: "https://maps.google.com/?q=Rex+Club+Paris", badge: "Legendary Parisian DJ Venue", reviews: ["'Best sound system in Europe.' - Techno Review"] },
            { title: "Le Comptoir Général", rating: "4.7 ★ (1,920 Reviews)", price: "Tropical Speakeasy", meta: "Canal Saint-Martin Bar", img: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop"], queryText: "Le Comptoir General Paris", mapsUrl: "https://maps.google.com/?q=Le+Comptoir+General+Paris", badge: "Eclectic Botanical Lounge", reviews: ["'Felt like a hidden botanical garden speakeasy.' - Nina R."] },
            { title: "Bambou Paris (Cocktail Lounge)", rating: "4.5 ★ (840 Reviews)", price: "Asian Courtyard Bar", meta: "Opium Den Vibe & Mocktails", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop"], queryText: "Bambou Paris Bar", mapsUrl: "https://maps.google.com/?q=Bambou+Paris", badge: "Heated Terrace & Chill Music", reviews: ["'Super cozy heated courtyard for relaxing drinks.' - Victor M."] }
        ]
    },
    "Boston, MA": {
        hotels: [
            { title: "Fairmont Copley Plaza", rating: "4.8 ★ (2,450 Reviews)", price: "$420/night", meta: "0.1 km to Finish Line", img: "https://images.unsplash.com/photo-1506751470038-e579eb91f580?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1506751470038-e579eb91f580?w=600&auto=format&fit=crop"], queryText: "Fairmont Copley Plaza Boston", mapsUrl: "https://maps.google.com/?q=Fairmont+Copley+Plaza+Boston", badge: "Official Marathon Finish Hotel", reviews: ["'Right at the Copley Square finish line! Steps to bed post-race.' - Emily D."] },
            { title: "The Westin Copley Place", rating: "4.7 ★ (1,890 Reviews)", price: "$360/night", meta: "0.2 km from Michael Brown", img: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=600&auto=format&fit=crop"], queryText: "The Westin Copley Place Boston", mapsUrl: "https://maps.google.com/?q=The+Westin+Copley+Place+Boston", badge: "Westin Workout Gear Lending", reviews: ["'Direct skywalk to Copley Mall & finish line.' - Michael B."] },
            { title: "Boston Park Plaza", rating: "4.6 ★ (3,120 Reviews)", price: "$290/night", meta: "0.3 km to Public Garden", img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&auto=format&fit=crop"], queryText: "Boston Park Plaza", mapsUrl: "https://maps.google.com/?q=Boston+Park+Plaza", badge: "20,000 sq ft Fitness Gym", reviews: ["'Huge fitness center for race day warmups.' - Sarah J."] },
            { title: "The Colonnade Hotel", rating: "4.6 ★ (1,450 Reviews)", price: "$310/night", meta: "0.4 km to Prudential Center", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop"], queryText: "The Colonnade Hotel Boston", mapsUrl: "https://maps.google.com/?q=The+Colonnade+Hotel+Boston", badge: "Rooftop Pool & Deck", reviews: ["'Rooftop pool deck with Back Bay skyline views.' - Alex M."] },
            { title: "The Liberty Hotel", rating: "4.7 ★ (2,100 Reviews)", price: "$390/night", meta: "Beacon Hill Riverfront", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop"], queryText: "The Liberty Hotel Boston", mapsUrl: "https://maps.google.com/?q=The+Liberty+Hotel+Boston", badge: "Historic Beacon Hill Landmark", reviews: ["'Stunning architecture right next to the Charles River path.' - Chris P."] }
        ],
        routes: [
            { title: "Charles River Esplanade Loop", rating: "4.9 ★ (Google Trail)", price: "5.0 km Shakeout Run", meta: "Flat Riverfront Asphalt", img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop"], queryText: "Charles River Esplanade Boston", mapsUrl: "https://maps.google.com/?q=Charles+River+Esplanade+Boston", badge: "Premier Boston Runners Loop", reviews: ["'The quintessential Boston marathon shakeout path along the water.' - Boston Runners Club"] },
            { title: "Heartbreak Hill Course Segment", rating: "4.8 ★ (Google Trail)", price: "8.2 km Hill Track", meta: "90m Elevation Climb", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop"], queryText: "Heartbreak Hill Newton Boston", mapsUrl: "https://maps.google.com/?q=Heartbreak+Hill+Newton+Boston", badge: "Iconic Mile 20 Marathon Climb", reviews: ["'Tasting the famous Mile 20 hill before race day!' - Alex M."] },
            { title: "Freedom Trail Heritage Walk", rating: "4.7 ★ (Google Trail)", price: "4.0 km Brick Trail", meta: "Historic Downtown Walk", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop"], queryText: "Freedom Trail Boston", mapsUrl: "https://maps.google.com/?q=Freedom+Trail+Boston", badge: "Historic Red Brick Path", reviews: ["'Great recovery day walking tour of Revolutionary Boston.' - Emily D."] },
            { title: "Boston Common & Garden Circuit", rating: "4.8 ★ (Google Trail)", price: "2.8 km Park Loop", meta: "Shaded Garden Path", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop"], queryText: "Boston Common", mapsUrl: "https://maps.google.com/?q=Boston+Common", badge: "Swan Boats & Tulip Gardens", reviews: ["'Peaceful park loop right in the center of Boston.' - Michael B."] },
            { title: "Jamaica Pond Trail", rating: "4.6 ★ (Google Trail)", price: "3.5 km Lake Loop", meta: "Gravel & Dirt Path", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop"], queryText: "Jamaica Pond Boston", mapsUrl: "https://maps.google.com/?q=Jamaica+Pond+Boston", badge: "Emerald Necklace Park", reviews: ["'Shaded lake loop for easy aerobic runs.' - Sarah J."] }
        ],
        bistros: [
            { title: "Tatte Bakery & Cafe (Back Bay)", rating: "4.7 ★ (3,200 Reviews)", price: "$14 - $28", meta: "🌾 GF Pastries & 🌱 Vegan Bowls", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"], queryText: "Tatte Bakery Back Bay Boston", mapsUrl: "https://maps.google.com/?q=Tatte+Bakery+Back+Bay+Boston", badge: "Boston's Top GF & Vegan Cafe", reviews: ["'Unbelievable gluten-free shakshuka and oat milk lattes!' - Boston Foodie"] },
            { title: "Red White Ramen (100% Vegan)", rating: "4.8 ★ (1,450 Reviews)", price: "$18 - $26", meta: "🌱 100% Vegan Carbo Loading", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop"], queryText: "Red White Ramen Boston", mapsUrl: "https://maps.google.com/?q=Red+White+Ramen+Boston", badge: "Vegan King Ramen Bowls", reviews: ["'Rich garlic avocado broth & gluten-free noodles!' - Emily D."] },
            { title: "Life Alive Organic Cafe", rating: "4.8 ★ (2,100 Reviews)", price: "$12 - $22", meta: "🌱 Organic Vegan & GF Bowls", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop"], queryText: "Life Alive Organic Cafe Boston", mapsUrl: "https://maps.google.com/?q=Life+Alive+Organic+Cafe+Boston", badge: "Green Goddess Protein Bowls", reviews: ["'Pure clean fuel before marathon long runs!' - Alex M."] },
            { title: "Legal Sea Foods (Copley Place)", rating: "4.6 ★ (4,100 Reviews)", price: "$28 - $55", meta: "🌾 Certified GF Clam Chowder", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop"], queryText: "Legal Sea Foods Copley Place Boston", mapsUrl: "https://maps.google.com/?q=Legal+Sea+Foods+Copley+Place+Boston", badge: "Dedicated GF Fryers & Chowder", reviews: ["'Gluten-free Boston clam chowder & wild salmon!' - Michael B."] },
            { title: "My Kingdom For A Cook (North End)", rating: "4.7 ★ (890 Reviews)", price: "$22 - $38", meta: "🌾 GF & 🌱 Vegan Italian Pasta", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop"], queryText: "My Kingdom For A Cook Boston", mapsUrl: "https://maps.google.com/?q=My+Kingdom+For+A+Cook+Boston", badge: "Pre-Marathon Carbo Loading Pasta", reviews: ["'Awesome gluten-free penne arrabbiata!' - Sarah J."] }
        ],
        nightlife: [
            { title: "Top of the Hub (Prudential Bar)", rating: "4.7 ★ (2,800 Reviews)", price: "Skyline Lounge", meta: "52nd Floor Prudential Views", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop"], queryText: "Top of the Hub Prudential Boston", mapsUrl: "https://maps.google.com/?q=Top+of+the+Hub+Boston", badge: "Highest Panorama in Boston", reviews: ["'View of the whole marathon course from 52 floors up!' - Boston Mag"] },
            { title: "The Beehive (South End Jazz)", rating: "4.6 ★ (1,950 Reviews)", price: "Bohemian Jazz Bar", meta: "Live Jazz & Craft Mocktails", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop"], queryText: "The Beehive Jazz Bar Boston", mapsUrl: "https://maps.google.com/?q=The+Beehive+Boston", badge: "Nightly Live Acoustic Jazz", reviews: ["'Unmatched vibe and acoustic soul performances.' - Emily D."] },
            { title: "Lookout Rooftop (Envoy Hotel)", rating: "4.6 ★ (1,420 Reviews)", price: "Harbor Rooftop", meta: "Boston Seaport Skyline Deck", img: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop"], queryText: "Lookout Rooftop Envoy Hotel Boston", mapsUrl: "https://maps.google.com/?q=Lookout+Rooftop+Boston", badge: "Seaport Harbor Panoramic Terrace", reviews: ["'Cool igloos in spring and harbor views!' - Dan K."] },
            { title: "Cisco Brewers Seaport Garden", rating: "4.5 ★ (1,100 Reviews)", price: "Outdoor Beer Garden", meta: "Nantucket Vibe & Food Trucks", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop"], queryText: "Cisco Brewers Seaport Boston", mapsUrl: "https://maps.google.com/?q=Cisco+Brewers+Seaport+Boston", badge: "Post-Race Celebration Deck", reviews: ["'Huge outdoor party vibe near the water.' - Michael B."] },
            { title: "Mariel Underground Lounge", rating: "4.6 ★ (980 Reviews)", price: "Cuban Speakeasy", meta: "Post-Modern Cocktail Den", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop", gallery: ["https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop"], queryText: "Mariel Lounge Boston", mapsUrl: "https://maps.google.com/?q=Mariel+Lounge+Boston", badge: "Opulent Vault Speakeasy", reviews: ["'Gorgeous vault lounge in Downtown Crossing.' - Sarah J."] }
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
    ],
    "Boston Marathon 2026": [
        { name: "Emily Davis", avatar: "🏃‍♀️", hotel: "The Westin Copley Place", distance: "0.2 km away", diet: "🌾 GF & 🌱 Vegan", userWalkTime: "4 mins walk", friendWalkTime: "2 mins walk", queryText: "The Westin Copley Place Boston", mapsUrl: "https://maps.google.com/?q=The+Westin+Copley+Place+Boston", status: "Online • 0.2 km away" },
        { name: "Michael Brown", avatar: "🏃‍♂️", hotel: "Boston Park Plaza", distance: "0.3 km away", diet: "🌱 Vegetarian & GF", userWalkTime: "5 mins walk", friendWalkTime: "3 mins walk", queryText: "Boston Park Plaza", mapsUrl: "https://maps.google.com/?q=Boston+Park+Plaza", status: "Online • 0.3 km away" },
        { name: "Sarah Jenkins", avatar: "🏃‍♀️", hotel: "The Colonnade Hotel", distance: "0.4 km away", diet: "🌾 Gluten-Free", userWalkTime: "6 mins walk", friendWalkTime: "4 mins walk", queryText: "The Colonnade Hotel Boston", mapsUrl: "https://maps.google.com/?q=The+Colonnade+Hotel+Boston", status: "Online • 0.4 km away" }
    ]
};

// USER ITINERARY STORAGE
const USER_ITINERARY = {
    Day1: [
        { time: "09:00 AM", title: "Morning Pre-Event Shakeout Run", meta: "Parc Rives de Seine Loop (5.2 km)", type: "route" },
        { time: "12:30 PM", title: "Gluten-Free & Vegan Lunch", meta: "Noglu Paris (Certified Bakery)", type: "bistro" }
    ],
    Day2: [
        { time: "07:00 AM", title: "Paris Marathon Start Line", meta: "Arc de Triomphe Start", type: "event" },
        { time: "06:00 PM", title: "Post-Marathon Dinner with Friends", meta: "Le Potager de Charlotte", type: "bistro" }
    ],
    Day3: [
        { time: "11:00 AM", title: "Spa & Recovery Warmup", meta: "Hôtel Plaza Athénée Spa", type: "hotel" },
        { time: "08:00 PM", title: "Celebration Drinks & Sunset", meta: "Le Perchoir Marais Rooftop", type: "nightlife" }
    ]
};

// SQUAD EXPENSES DATA
const SQUAD_EXPENSES = [
    { title: "Hôtel Plaza Athénée Stay (3 Nights)", amount: 1440, payer: "Alex Morgan", splitWith: ["Alex Morgan", "Jessica Lin", "David Kim"], category: "🏨 Hotel" },
    { title: "Noglu Pre-Marathon Squad Dinner", amount: 180, payer: "Jessica Lin", splitWith: ["Alex Morgan", "Jessica Lin", "David Kim", "Sophie Moreau"], category: "🥗 Dining" },
    { title: "Paris Metro & Race Transfers", amount: 60, payer: "David Kim", splitWith: ["Alex Morgan", "David Kim"], category: "🚆 Transport" }
];

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

    // Render Live Weather Widget
    renderWeatherWidget();

    // Render At-A-Glance Visual Dashboard Grid
    renderAtAGlanceDashboard(activeCategoryTab);
}

function renderWeatherWidget() {
    const weatherCard = document.getElementById("weatherWidgetCard");
    const weather = WEATHER_BY_CITY[currentProfile.location] || WEATHER_BY_CITY["Paris, France"];

    weatherCard.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-secondary); text-transform:uppercase;">🌦️ Race-Day Weather</div>
            <span class="badge">${escapeHtml(weather.city)}</span>
        </div>
        <div style="display:flex; align-items:baseline; gap:10px; margin:4px 0;">
            <div class="weather-temp">${weather.temp}</div>
            <div style="font-weight:700; font-size:0.9rem; color:var(--text-primary);">${weather.condition}</div>
        </div>
        <div class="weather-meta-grid">
            <div>💨 Wind: <strong>${weather.wind}</strong></div>
            <div>💧 Humidity: <strong>${weather.humidity}</strong></div>
            <div>☀️ UV Index: <strong>${weather.uv}</strong></div>
            <div>📍 Location: <strong>${escapeHtml(currentProfile.location.split(',')[0])}</strong></div>
        </div>
        <div class="weather-advice">${weather.advice}</div>
    `;
}

function switchCategoryTab(category, btnEl) {
    activeCategoryTab = category;
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");

    if (category === "itinerary") {
        renderDailyItinerary();
    } else if (category === "expenses") {
        renderExpenseSplitter();
    } else {
        renderAtAGlanceDashboard(category);
    }
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
                        <div class="item-card">
                            <img src="${r.img}" class="item-card-img" alt="${escapeHtml(r.title)}" onclick="openPhotoReviewModal('${escapeHtml(r.title)}', 'routes')"/>
                            <div class="item-card-body">
                                <div class="item-card-title" onclick="openPhotoReviewModal('${escapeHtml(r.title)}', 'routes')">${escapeHtml(r.title)}</div>
                                <div class="item-card-meta">
                                    <span style="color:#f59e0b; font-weight:700;">${r.rating}</span>
                                    <span style="color:#10b981; font-weight:700;">${r.price}</span>
                                </div>
                                <div style="font-size:0.72rem; color:var(--text-secondary);">⛰️ ${r.meta}</div>
                                <div class="item-card-badge">${r.badge}</div>
                                <div style="display:flex; gap:6px; margin-top:6px;">
                                    <button class="map-btn-inline" style="flex:1;" onclick="openPhotoReviewModal('${escapeHtml(r.title)}', 'routes')">📸 Photos & Reviews</button>
                                    <button class="map-btn-inline" style="flex:1; background:rgba(245,158,11,0.2); color:#f59e0b; border-color:#f59e0b;" onclick="addToItinerary('${escapeHtml(r.title)}', '${escapeHtml(r.price)}', 'Day 1')">+ Add to Day 1</button>
                                </div>
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
                        <div class="item-card">
                            <img src="${b.img}" class="item-card-img" alt="${escapeHtml(b.title)}" onclick="openPhotoReviewModal('${escapeHtml(b.title)}', 'bistros')"/>
                            <div class="item-card-body">
                                <div class="item-card-title" onclick="openPhotoReviewModal('${escapeHtml(b.title)}', 'bistros')">${escapeHtml(b.title)}</div>
                                <div class="item-card-meta">
                                    <span style="color:#f59e0b; font-weight:700;">${b.rating}</span>
                                    <span style="color:#10b981; font-weight:700;">${b.price}</span>
                                </div>
                                <div style="font-size:0.72rem; color:var(--text-secondary);">🥗 ${b.meta}</div>
                                <div class="item-card-badge">${b.badge}</div>
                                <div style="display:flex; gap:6px; margin-top:6px;">
                                    <button class="map-btn-inline" style="flex:1;" onclick="openPhotoReviewModal('${escapeHtml(b.title)}', 'bistros')">📸 Photos & Reviews</button>
                                    <button class="map-btn-inline" style="flex:1; background:rgba(245,158,11,0.2); color:#f59e0b; border-color:#f59e0b;" onclick="addToItinerary('${escapeHtml(b.title)}', '${escapeHtml(b.meta)}', 'Day 2')">+ Add to Day 2</button>
                                </div>
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
                        <div class="item-card">
                            <img src="${n.img}" class="item-card-img" alt="${escapeHtml(n.title)}" onclick="openPhotoReviewModal('${escapeHtml(n.title)}', 'nightlife')"/>
                            <div class="item-card-body">
                                <div class="item-card-title" onclick="openPhotoReviewModal('${escapeHtml(n.title)}', 'nightlife')">${escapeHtml(n.title)}</div>
                                <div class="item-card-meta">
                                    <span style="color:#f59e0b; font-weight:700;">${n.rating}</span>
                                    <span style="color:#10b981; font-weight:700;">${n.price}</span>
                                </div>
                                <div style="font-size:0.72rem; color:var(--text-secondary);">🍸 ${n.meta}</div>
                                <div class="item-card-badge">${n.badge}</div>
                                <div style="display:flex; gap:6px; margin-top:6px;">
                                    <button class="map-btn-inline" style="flex:1;" onclick="openPhotoReviewModal('${escapeHtml(n.title)}', 'nightlife')">📸 Photos & Reviews</button>
                                    <button class="map-btn-inline" style="flex:1; background:rgba(245,158,11,0.2); color:#f59e0b; border-color:#f59e0b;" onclick="addToItinerary('${escapeHtml(n.title)}', '${escapeHtml(n.meta)}', 'Day 3')">+ Add to Day 3</button>
                                </div>
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
                        <div class="item-card">
                            <img src="${h.img}" class="item-card-img" alt="${escapeHtml(h.title)}" onclick="openPhotoReviewModal('${escapeHtml(h.title)}', 'hotels')"/>
                            <div class="item-card-body">
                                <div class="item-card-title" onclick="openPhotoReviewModal('${escapeHtml(h.title)}', 'hotels')">${escapeHtml(h.title)}</div>
                                <div class="item-card-meta">
                                    <span style="color:#f59e0b; font-weight:700;">${h.rating}</span>
                                    <span style="color:#10b981; font-weight:700;">${h.price}</span>
                                </div>
                                <div style="font-size:0.72rem; color:var(--text-secondary);">📍 ${h.meta}</div>
                                <div class="item-card-badge">${h.badge}</div>
                                <div style="display:flex; gap:6px; margin-top:6px;">
                                    <button class="map-btn-inline" style="flex:1;" onclick="openPhotoReviewModal('${escapeHtml(h.title)}', 'hotels')">📸 Photos & Reviews</button>
                                    <button class="map-btn-inline" style="flex:1; background:rgba(245,158,11,0.2); color:#f59e0b; border-color:#f59e0b;" onclick="addToItinerary('${escapeHtml(h.title)}', '${escapeHtml(h.price)}', 'Day 1')">+ Add to Day 1</button>
                                </div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </section>
        `;
    }

    mainContainer.innerHTML = html;
}

// 📅 DAILY ITINERARY PLANNER
function renderDailyItinerary() {
    const mainContainer = document.getElementById("atAGlanceView");
    mainContainer.innerHTML = `
        <section class="glance-section">
            <div class="glance-header">
                <h3>📅 Interactive Daily Itinerary Timeline <span class="badge" style="background:rgba(16,185,129,0.2); color:#10b981;">3-Day Master Schedule</span></h3>
                <span class="subtext">Customized for ${escapeHtml(currentProfile.name)} — ${escapeHtml(currentProfile.event)}</span>
            </div>

            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-top:10px;">
                <!-- Day 1 -->
                <div class="card" style="background:rgba(16,185,129,0.05); border:1px solid rgba(16,185,129,0.3);">
                    <div style="font-weight:800; font-size:1.1rem; color:#10b981; margin-bottom:8px; border-bottom:1px solid rgba(16,185,129,0.2); padding-bottom:6px;">
                        Day 1: Pre-Event & Shakeout
                    </div>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        ${USER_ITINERARY.Day1.map((item, idx) => `
                            <div class="profile-item" style="border-left:3px solid #10b981;">
                                <div style="font-size:0.75rem; color:#f59e0b; font-weight:700;">⏱️ ${item.time}</div>
                                <div style="font-weight:700; font-size:0.9rem;">${escapeHtml(item.title)}</div>
                                <div style="font-size:0.75rem; color:var(--text-secondary);">${escapeHtml(item.meta)}</div>
                                <button onclick="removeItineraryItem('Day1', ${idx})" style="background:none; border:none; color:#ef4444; font-size:0.7rem; text-align:right; cursor:pointer; margin-top:4px;">✖ Remove</button>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <!-- Day 2 -->
                <div class="card" style="background:rgba(245,158,11,0.05); border:1px solid rgba(245,158,11,0.3);">
                    <div style="font-weight:800; font-size:1.1rem; color:#f59e0b; margin-bottom:8px; border-bottom:1px solid rgba(245,158,11,0.2); padding-bottom:6px;">
                        Day 2: Main Event & Squad Dinner
                    </div>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        ${USER_ITINERARY.Day2.map((item, idx) => `
                            <div class="profile-item" style="border-left:3px solid #f59e0b;">
                                <div style="font-size:0.75rem; color:#10b981; font-weight:700;">⏱️ ${item.time}</div>
                                <div style="font-weight:700; font-size:0.9rem;">${escapeHtml(item.title)}</div>
                                <div style="font-size:0.75rem; color:var(--text-secondary);">${escapeHtml(item.meta)}</div>
                                <button onclick="removeItineraryItem('Day2', ${idx})" style="background:none; border:none; color:#ef4444; font-size:0.7rem; text-align:right; cursor:pointer; margin-top:4px;">✖ Remove</button>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <!-- Day 3 -->
                <div class="card" style="background:rgba(6,182,212,0.05); border:1px solid rgba(6,182,212,0.3);">
                    <div style="font-weight:800; font-size:1.1rem; color:#06b6d4; margin-bottom:8px; border-bottom:1px solid rgba(6,182,212,0.2); padding-bottom:6px;">
                        Day 3: Recovery & Celebration
                    </div>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        ${USER_ITINERARY.Day3.map((item, idx) => `
                            <div class="profile-item" style="border-left:3px solid #06b6d4;">
                                <div style="font-size:0.75rem; color:#f59e0b; font-weight:700;">⏱️ ${item.time}</div>
                                <div style="font-weight:700; font-size:0.9rem;">${escapeHtml(item.title)}</div>
                                <div style="font-size:0.75rem; color:var(--text-secondary);">${escapeHtml(item.meta)}</div>
                                <button onclick="removeItineraryItem('Day3', ${idx})" style="background:none; border:none; color:#ef4444; font-size:0.7rem; text-align:right; cursor:pointer; margin-top:4px;">✖ Remove</button>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        </section>
    `;
}

function addToItinerary(title, meta, dayKey) {
    if (!USER_ITINERARY[dayKey]) USER_ITINERARY[dayKey] = [];
    USER_ITINERARY[dayKey].push({
        time: "02:00 PM",
        title: title,
        meta: meta,
        type: "custom"
    });
    alert(`✅ Added "${title}" to your ${dayKey} Itinerary!`);
}

function removeItineraryItem(dayKey, idx) {
    if (USER_ITINERARY[dayKey]) {
        USER_ITINERARY[dayKey].splice(idx, 1);
        renderDailyItinerary();
    }
}

// 💰 SQUAD EXPENSE SPLITTER
function renderExpenseSplitter() {
    const mainContainer = document.getElementById("atAGlanceView");
    const friends = FRIENDS_BY_EVENT[currentProfile.event] || [];
    const allMembers = [currentProfile.name, ...friends.map(f => f.name)];

    const totalAmount = SQUAD_EXPENSES.reduce((sum, exp) => sum + exp.amount, 0);
    const perPersonShare = Math.round(totalAmount / allMembers.length);

    mainContainer.innerHTML = `
        <section class="glance-section">
            <div class="glance-header">
                <h3>💰 Squad Expense & Hotel Cost Splitter <span class="badge" style="background:rgba(245,158,11,0.2); color:#f59e0b;">Shared Trip Ledger</span></h3>
                <span class="subtext">Co-planning costs with ${allMembers.join(", ")}</span>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:12px; margin-top:8px;">
                <div class="profile-item" style="background:rgba(16,185,129,0.1); border-color:#10b981;">
                    <span class="label">Total Shared Expenses</span>
                    <span class="value" style="font-size:1.4rem; color:#10b981;">$${totalAmount}</span>
                </div>
                <div class="profile-item" style="background:rgba(245,158,11,0.1); border-color:#f59e0b;">
                    <span class="label">Equal Per-Person Share</span>
                    <span class="value" style="font-size:1.4rem; color:#f59e0b;">$${perPersonShare} / person</span>
                </div>
                <div class="profile-item" style="background:rgba(6,182,212,0.1); border-color:#06b6d4;">
                    <span class="label">Attending Members</span>
                    <span class="value" style="font-size:1.4rem; color:#06b6d4;">${allMembers.length} People</span>
                </div>
            </div>

            <!-- Log Expense Form -->
            <div class="card" style="margin-top:14px; padding:14px; background:rgba(15,23,42,0.5);">
                <h4 style="font-family:'Plus Jakarta Sans',sans-serif; color:var(--emerald-primary); margin-bottom:8px;">➕ Log New Shared Expense</h4>
                <form onsubmit="submitNewExpense(event)" style="display:grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap:8px;">
                    <input type="text" id="expenseTitleInput" placeholder="Expense description (e.g., Noglu Group Dinner)" required style="background:rgba(10,16,32,0.9); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:8px; color:#fff; font-family:'Outfit',sans-serif;"/>
                    <input type="number" id="expenseAmountInput" placeholder="Amount ($)" required style="background:rgba(10,16,32,0.9); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:8px; color:#fff; font-family:'Outfit',sans-serif;"/>
                    <select id="expensePayerInput" style="background:rgba(10,16,32,0.9); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:8px; color:#fff; font-family:'Outfit',sans-serif;">
                        ${allMembers.map(m => `<option value="${escapeHtml(m)}">Paid by ${escapeHtml(m)}</option>`).join("")}
                    </select>
                    <button type="submit" class="send-btn" style="padding:8px;">Add Expense 💳</button>
                </form>
            </div>

            <!-- Expense Ledger Table -->
            <div style="margin-top:14px;">
                <h4 style="font-family:'Plus Jakarta Sans',sans-serif; color:var(--text-primary); margin-bottom:8px;">📜 Trip Ledger Details</h4>
                <div style="display:flex; flex-direction:column; gap:8px;">
                    ${SQUAD_EXPENSES.map(exp => `
                        <div class="profile-item" style="flex-direction:row; justify-content:space-between; align-items:center; padding:12px;">
                            <div>
                                <div style="font-weight:700; font-size:0.95rem;">${escapeHtml(exp.title)}</div>
                                <div style="font-size:0.75rem; color:var(--text-secondary);">Paid by <strong>${escapeHtml(exp.payer)}</strong> • Split among: ${exp.splitWith.join(", ")}</div>
                            </div>
                            <div style="text-align:right;">
                                <div style="font-weight:800; font-size:1.1rem; color:#10b981;">$${exp.amount}</div>
                                <div style="font-size:0.72rem; color:#f59e0b;">$${Math.round(exp.amount / exp.splitWith.length)} each</div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        </section>
    `;
}

function submitNewExpense(e) {
    e.preventDefault();
    const title = document.getElementById("expenseTitleInput").value.trim();
    const amount = parseFloat(document.getElementById("expenseAmountInput").value);
    const payer = document.getElementById("expensePayerInput").value;
    const friends = FRIENDS_BY_EVENT[currentProfile.event] || [];
    const allMembers = [currentProfile.name, ...friends.map(f => f.name)];

    if (!title || !amount) return;

    SQUAD_EXPENSES.push({
        title: title,
        amount: amount,
        payer: payer,
        splitWith: allMembers,
        category: "💸 Shared"
    });

    renderExpenseSplitter();
}

// 📸 RICH PHOTO GALLERY & REVIEW MODAL
function openPhotoReviewModal(itemTitle, category) {
    const cityData = DASHBOARD_DATA[currentProfile.location] || DASHBOARD_DATA["Paris, France"];
    const list = cityData[category] || [];
    const item = list.find(i => i.title === itemTitle) || list[0];
    if (!item) return;

    const modalContent = document.getElementById("photoReviewModalContent");
    modalContent.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div>
                <h2 class="modal-header-title">📸 ${escapeHtml(item.title)}</h2>
                <div style="font-size:0.8rem; color:#10b981; font-weight:700;">${item.rating} • ${item.price} • ${item.meta}</div>
            </div>
            <button class="send-btn" style="padding:6px 12px; font-size:0.8rem;" onclick="openMapModal('${escapeHtml(item.title)}', '${escapeHtml(item.queryText)}', '${item.mapsUrl}')">🗺️ Open Map</button>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:14px;">
            <img src="${item.img}" style="width:100%; height:200px; object-fit:cover; border-radius:12px; border:1px solid var(--emerald-primary);" alt="${escapeHtml(item.title)}"/>
            <img src="${item.gallery ? item.gallery[0] : item.img}" style="width:100%; height:200px; object-fit:cover; border-radius:12px; border:1px solid var(--card-border);" alt="${escapeHtml(item.title)}"/>
        </div>

        <div style="margin-bottom:12px;">
            <h4 style="font-size:0.9rem; color:var(--text-secondary); text-transform:uppercase; margin-bottom:6px;">Dietary & Lifestyle Certifications:</h4>
            <div class="diet-tag" style="display:inline-block; font-size:0.8rem; padding:4px 10px;">🛡️ ${item.badge}</div>
        </div>

        <div>
            <h4 style="font-size:0.9rem; color:var(--text-secondary); text-transform:uppercase; margin-bottom:6px;">Verified Athlete & Traveler Reviews:</h4>
            <div style="display:flex; flex-direction:column; gap:8px;">
                ${item.reviews ? item.reviews.map(r => `
                    <div class="profile-item" style="background:rgba(16,185,129,0.06); font-size:0.85rem; padding:10px;">
                        ${escapeHtml(r)}
                    </div>
                `).join("") : `<div class="profile-item">Top-rated venue verified by local athletes.</div>`}
            </div>
        </div>
    `;

    document.getElementById("photoReviewModal").classList.remove("hidden");
}

function closePhotoReviewModal() {
    document.getElementById("photoReviewModal").classList.add("hidden");
}

function handlePhotoReviewBackdropClick(e) {
    if (e.target.id === "photoReviewModal") {
        closePhotoReviewModal();
    }
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

    // DYNAMIC AI TRIP SWITCHER INTENT CHECK
    const lowerText = text.toLowerCase();
    if (lowerText.includes("boston") || lowerText.includes("boston marathon")) {
        setTimeout(() => {
            removeMessage(loadingId);

            // Switch current user profile to Boston Marathon
            currentProfile.event = "Boston Marathon 2026";
            currentProfile.location = "Boston, MA";
            currentProfile.hotel = "Fairmont Copley Plaza";

            // Update Itinerary to Boston items
            USER_ITINERARY.Day1 = [
                { time: "09:00 AM", title: "Charles River Esplanade Shakeout Run", meta: "5.0 km Riverfront Loop", type: "route" },
                { time: "12:30 PM", title: "Gluten-Free & Vegan Lunch", meta: "Tatte Bakery & Cafe (Back Bay)", type: "bistro" }
            ];
            USER_ITINERARY.Day2 = [
                { time: "07:00 AM", title: "Boston Marathon Start Line", meta: "Hopkinton to Copley Square Finish", type: "event" },
                { time: "06:00 PM", title: "Post-Marathon Dinner with Squad", meta: "Legal Sea Foods (Certified GF)", type: "bistro" }
            ];
            USER_ITINERARY.Day3 = [
                { time: "11:00 AM", title: "Recovery Walk along Freedom Trail", meta: "Historic Downtown Boston", type: "route" },
                { time: "08:00 PM", title: "Skyline Celebration Drinks", meta: "Top of the Hub (52nd Floor)", type: "nightlife" }
            ];

            document.getElementById("profileEvent").innerText = "Boston Marathon 2026";
            
            // Re-render Weather, Itinerary & Dashboard immediately!
            renderWeatherWidget();
            renderAtAGlanceDashboard("all");

            appendAgentResponse(
                "🏙️ **Switched active planning to Boston Marathon 2026!**<br/><br/>" +
                "I have updated your At-A-Glance dashboard with grounded Boston hotels near Copley Square, 5k shakeout loops along the Charles River, certified Gluten-Free & Vegan bistros (Tatte, Red White Ramen, Life Alive), attending friends (Emily, Michael, Sarah), and Patriots' Day race weather forecasts.",
                [],
                text
            );
        }, 800);
        return;
    }

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
        <button class="map-btn-inline" onclick="suggestPlaceToFriend('Charles River Esplanade')">🏃 Suggest Esplanade Loop (5 min both)</button>
        <button class="map-btn-inline" style="background:rgba(245,158,11,0.2); color:#f59e0b; border-color:#f59e0b;" onclick="suggestPlaceToFriend('Tatte GF & Vegan Cafe')">🥗 Suggest Tatte Cafe (4 min walk both)</button>
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
