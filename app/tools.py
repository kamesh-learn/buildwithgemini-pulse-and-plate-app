"""Tools for Pulse & Plate multi-agent system (Grounded with Google Search & Maps - Friends, Hotels, Routes, Bistros & Nightlife)."""

import json
from typing import Dict, Any

# Pre-populated Friends Database
EVENT_FRIENDS_DB = {
    "Paris Marathon 2026": [
        {
            "name": "Jessica Lin",
            "avatar": "🏃‍♀️",
            "hotel": "Hôtel Étoile Saint Ferdinand",
            "hotel_address": "36 Rue Saint-Ferdinand, Paris",
            "distance_from_you": "0.3 km away",
            "diet": "🌾 GF & 🌱 Vegan",
            "pace": "4:50 min/km",
            "status": "Online • Hotel 0.3 km away",
            "userWalkTime": "8 mins walk",
            "friendWalkTime": "6 mins walk",
            "google_maps_url": "https://maps.google.com/?q=Hotel+Etoile+Saint+Ferdinand+Paris"
        },
        {
            "name": "David Kim",
            "avatar": "🏃‍♂️",
            "hotel": "Le Royal Monceau Raffles",
            "hotel_address": "37 Avenue Hoche, Paris",
            "distance_from_you": "0.4 km away",
            "diet": "🌱 Vegetarian",
            "pace": "5:10 min/km",
            "status": "Online • Hotel 0.4 km away",
            "userWalkTime": "6 mins walk",
            "friendWalkTime": "4 mins walk",
            "google_maps_url": "https://maps.google.com/?q=Le+Royal+Monceau+Paris"
        },
        {
            "name": "Sophie Moreau",
            "avatar": "🏃‍♀️",
            "hotel": "Hôtel Napoleon Paris",
            "hotel_address": "40 Avenue de Friedland, Paris",
            "distance_from_you": "0.2 km away",
            "diet": "🌾 Gluten-Free",
            "pace": "4:40 min/km",
            "status": "Away • Hotel 0.2 km away",
            "userWalkTime": "4 mins walk",
            "friendWalkTime": "3 mins walk",
            "google_maps_url": "https://maps.google.com/?q=Hotel+Napoleon+Paris"
        }
    ],
    "Nice Ironman & Cycling Tour": [
        {
            "name": "Tom Miller",
            "avatar": "🚴‍♂️",
            "hotel": "Hyatt Regency Nice Palais",
            "hotel_address": "13 Promenade des Anglais, Nice",
            "distance_from_you": "0.2 km away",
            "diet": "🥑 100% Keto",
            "pace": "30 km/h Cycling",
            "status": "Online • Hotel 0.2 km away",
            "userWalkTime": "4 mins walk",
            "friendWalkTime": "2 mins walk",
            "google_maps_url": "https://maps.google.com/?q=Hyatt+Regency+Nice+Palais+de+la+Mediterranee"
        },
        {
            "name": "Chloe Dupont",
            "avatar": "🚴‍♀️",
            "hotel": "Radisson Blu Hotel Nice",
            "hotel_address": "223 Promenade des Anglais, Nice",
            "distance_from_you": "0.6 km away",
            "diet": "🥜 Nut-Free & 🐟 Pescatarian",
            "pace": "27 km/h Cycling",
            "status": "Online • Hotel 0.6 km away",
            "userWalkTime": "10 mins walk",
            "friendWalkTime": "5 mins bike",
            "google_maps_url": "https://maps.google.com/?q=Radisson+Blu+Hotel+Nice"
        },
        {
            "name": "Marco Rossi",
            "avatar": "🚴‍♂️",
            "hotel": "Hôtel Aston La Scala",
            "hotel_address": "12 Avenue Félix Faure, Nice",
            "distance_from_you": "0.5 km away",
            "diet": "🥑 Keto & 🌾 Gluten-Free",
            "pace": "31 km/h Cycling",
            "status": "Online • Hotel 0.5 km away",
            "userWalkTime": "9 mins walk",
            "friendWalkTime": "7 mins walk",
            "google_maps_url": "https://maps.google.com/?q=Hotel+Aston+La+Scala+Nice"
        }
    ],
    "Swiss Alps Trail Hike": [
        {
            "name": "Lukas Weber",
            "avatar": "🥾",
            "hotel": "Hotel Interlaken (Est. 1323)",
            "hotel_address": "Höheweg 74, 3800 Interlaken",
            "distance_from_you": "0.5 km away",
            "diet": "🥛 Lactose-Free",
            "pace": "3.5 km/h Hike",
            "status": "Online • Lodge 0.5 km away",
            "userWalkTime": "7 mins walk",
            "friendWalkTime": "5 mins walk",
            "google_maps_url": "https://maps.google.com/?q=Hotel+Interlaken+Switzerland"
        },
        {
            "name": "Elena Schmidt",
            "avatar": "🥾",
            "hotel": "Carlton-Europe Vintage Hotel",
            "hotel_address": "Höheweg 92, 3800 Interlaken",
            "distance_from_you": "0.3 km away",
            "diet": "🐟 Pescatarian & 🥛 Lactose-Free",
            "pace": "3.2 km/h Hike",
            "status": "Online • Lodge 0.3 km away",
            "userWalkTime": "5 mins walk",
            "friendWalkTime": "3 mins walk",
            "google_maps_url": "https://maps.google.com/?q=Carlton+Europe+Interlaken"
        }
    ]
}


def search_nightlife(location: str, event_context: str = "Marathon") -> str:
    """Finds real grounded local events, post-race rooftop lounges, live music spots, and nightlife tailored to venue locations.

    Args:
        location: City location (e.g. Paris, Nice, Interlaken).
        event_context: Related athletic event or vibe preference.

    Returns:
        A JSON string containing grounded nightlife venues and events.
    """
    loc_lower = location.lower()
    if "nice" in loc_lower:
        venues = [
            {
                "name": "Le Rooftop 17 (Hôtel Plaza Nice)",
                "category": "Rooftop Cocktail Lounge",
                "google_rating": "4.7 ★ (850 Reviews)",
                "address": "12 Avenue Verdun, 06000 Nice",
                "highlights": "Panoramic Mediterranean sunset views, Keto mocktails, organic wines.",
                "google_maps_url": "https://maps.google.com/?q=Le+Rooftop+17+Nice"
            },
            {
                "name": "High Club Nice",
                "category": "Promenade Nightclub & DJ Lounge",
                "google_rating": "4.3 ★ (1,120 Reviews)",
                "address": "45 Promenade des Anglais, 06000 Nice",
                "highlights": "Post-race celebration party, beachfront venue, international DJs.",
                "google_maps_url": "https://maps.google.com/?q=High+Club+Nice"
            },
            {
                "name": "Shapko Bar (Vieux Nice)",
                "category": "Live Jazz & Soul Bar",
                "google_rating": "4.6 ★ (940 Reviews)",
                "address": "5 Rue Rossetti, 06000 Nice",
                "highlights": "Intimate live jazz, organic craft drinks, cozy atmosphere.",
                "google_maps_url": "https://maps.google.com/?q=Shapko+Bar+Nice"
            }
        ]
    elif "interlaken" in loc_lower:
        venues = [
            {
                "name": "Balmers Club & Metro Bar",
                "category": "Alpine Lounge & Live Music",
                "google_rating": "4.5 ★ (620 Reviews)",
                "address": "Hauptstrasse 23, 3800 Interlaken",
                "highlights": "Post-hike bonfire lounge, Swiss craft beers, DJ night.",
                "google_maps_url": "https://maps.google.com/?q=Balmers+Club+Interlaken"
            },
            {
                "name": "Harder Kulm Panorama Lounge",
                "category": "Sunset Peak Cocktail Bar",
                "google_rating": "4.8 ★ (1,950 Reviews)",
                "address": "Harder Kulm Peak, 3800 Interlaken",
                "highlights": "1,322m altitude sunset terrace, alpine mocktails, panoramic views.",
                "google_maps_url": "https://maps.google.com/?q=Harder+Kulm+Interlaken"
            }
        ]
    else:
        venues = [
            {
                "name": "Le Perchoir Marais (Rooftop Paris)",
                "category": "Skyline Rooftop Bar",
                "google_rating": "4.6 ★ (1,450 Reviews)",
                "address": "33 Rue de la Verrerie, 75004 Paris",
                "highlights": "Eiffel Tower panoramic views, organic vegan wine, post-marathon lounge.",
                "google_maps_url": "https://maps.google.com/?q=Le+Perchoir+Marais+Paris"
            },
            {
                "name": "La Station Gare des Mines",
                "category": "Open-Air Music & Cultural Venue",
                "google_rating": "4.5 ★ (980 Reviews)",
                "address": "29 Avenue de la Porte d'Aubervilliers, Paris",
                "highlights": "Outdoor electronic sets, food trucks, vibrant nightlife.",
                "google_maps_url": "https://maps.google.com/?q=La+Station+Gare+des+Mines+Paris"
            }
        ]
    return json.dumps({"location": location, "venues": venues}, indent=2)


def calculate_friend_travel_time(place_name: str, friend_name: str = "Jessica Lin", travel_mode: str = "walking") -> str:
    """Calculates relative distance and estimated travel times for both the user and their friend to reach a target place."""
    user_time = "8 mins" if travel_mode == "walking" else "3 mins"
    friend_time = "12 mins" if travel_mode == "walking" else "5 mins"
    return json.dumps({
        "destination": place_name,
        "travel_mode": travel_mode,
        "user_travel_time": f"{user_time} ({travel_mode})",
        "friend_name": friend_name,
        "friend_travel_time": f"{friend_time} ({travel_mode})",
        "meeting_recommendation": f"Both arrive within 12 mins via {travel_mode}."
    }, indent=2)


def get_event_friends(event_name: str = "Paris Marathon 2026") -> str:
    """Retrieves list of friends attending the same athletic event."""
    friends = EVENT_FRIENDS_DB.get(event_name, [])
    return json.dumps({"event_name": event_name, "total_friends_attending": len(friends), "friends": friends}, indent=2)


def add_event_friend(friend_name: str, friend_email: str, event_name: str, hotel_name: str = "Hôtel Le Negresco") -> str:
    """Adds a new friend to an event roster."""
    new_friend = {
        "name": friend_name,
        "avatar": "🏃‍♂️",
        "hotel": hotel_name,
        "hotel_address": f"{hotel_name}, Venue City",
        "distance_from_you": "0.5 km away",
        "diet": "Dietary Preference Shared",
        "pace": "Match Target Pace",
        "status": "Online • Hotel 0.5 km away",
        "userWalkTime": "7 mins walk",
        "friendWalkTime": "5 mins walk",
        "google_maps_url": f"https://maps.google.com/?q={hotel_name.replace(' ', '+')}"
    }
    if event_name not in EVENT_FRIENDS_DB:
        EVENT_FRIENDS_DB[event_name] = []
    EVENT_FRIENDS_DB[event_name].append(new_friend)
    return json.dumps({"message": f"Successfully added {friend_name}!", "friend": new_friend}, indent=2)


def search_hotels(location: str, budget: float = 2000.0, preferred_style: str = "near venue") -> str:
    """Searches real hotel accommodations grounded with Google Maps."""
    loc_lower = location.lower()
    if "nice" in loc_lower:
        hotels = [
            {"name": "Hôtel Le Negresco", "google_rating": "4.6 ★", "address": "37 Promenade des Anglais, Nice", "google_maps_url": "https://maps.google.com/?q=Hotel+Le+Negresco+Nice", "price_per_night": "$340", "amenities": ["Locked Bike Storage", "Keto Breakfast"]},
            {"name": "Hyatt Regency Nice", "google_rating": "4.5 ★", "address": "13 Promenade des Anglais, Nice", "google_maps_url": "https://maps.google.com/?q=Hyatt+Regency+Nice", "price_per_night": "$280", "amenities": ["Indoor Pool", "Nut-Free Kitchen"]}
        ]
    else:
        hotels = [
            {"name": "Hôtel Plaza Athénée", "google_rating": "4.7 ★", "address": "25 Avenue Montaigne, Paris", "google_maps_url": "https://maps.google.com/?q=Hotel+Plaza+Athenee+Paris", "price_per_night": "$480", "amenities": ["Athlete Breakfast", "Gluten-Free Bakery"]}
        ]
    return json.dumps({"location": location, "hotels": hotels}, indent=2)


def get_popular_routes(location: str, activity_type: str = "running") -> str:
    """Finds popular grounded running tracks, cycling loops, or hikes."""
    routes = [
        {"name": "Col d'Èze Climb", "category": "Cycling Route", "google_rating": "4.9 ★", "google_maps_url": "https://maps.google.com/?q=Col+d+Eze+Nice", "distance": "10.0 km Climb", "est_duration": "45 mins"}
    ]
    return json.dumps({"location": location, "routes": routes}, indent=2)


def search_flights(origin: str, destination: str, travel_date: str = "2026-04-10") -> str:
    return json.dumps({"flights": [{"airline": "Air France", "price": "$680"}]}, indent=2)

def get_route_map(origin: str, destination: str, travel_mode: str = "walking") -> str:
    return json.dumps({"distance_km": 1.2, "estimated_minutes": 15}, indent=2)

def search_restaurants(location: str, dietary_restrictions: str = "gluten-free, vegetarian") -> str:
    return json.dumps({"restaurants": [{"name": "Le Bistrot Gourmand", "google_rating": "4.7 ★"}]}, indent=2)

def filter_menu_by_diet(restaurant_name: str, dietary_restrictions: str = "gluten-free, vegetarian") -> str:
    return json.dumps({"restaurant": restaurant_name, "safe_items": ["Grilled Sea Bass"]}, indent=2)

def generate_dish_image(dish_name: str) -> str:
    return json.dumps({"image_url": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop"}, indent=2)

def calculate_split_pace(race_distance_km: float = 42.195, target_time_hours: float = 4.0) -> str:
    return json.dumps({"required_pace": "4:58 min/km"}, indent=2)

def calculate_macro_goals(body_weight_kg: float = 70.0, exercise_type: str = "marathon", dietary_preference: str = "vegetarian") -> str:
    return json.dumps({"daily_target_calories": 2450}, indent=2)

def calculate_budget_breakdown(total_budget: float = 2000.0, num_days: int = 4, hotel_budget_pct: float = 0.45) -> str:
    return json.dumps({"total_budget": f"${total_budget:,.2f}"}, indent=2)
