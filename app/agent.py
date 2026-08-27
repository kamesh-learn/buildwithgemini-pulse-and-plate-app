"""Pulse & Plate Multi-Agent System (Root Orchestrator + Specialist Sub-Agents)."""

from google.adk.agents import Agent
from google.adk.agents.callback_context import CallbackContext
from google.adk.apps import App
from google.adk.models import Gemini
from google.adk.tools.preload_memory_tool import PreloadMemoryTool
from google.genai import types

from app.tools import (
    search_hotels,
    search_flights,
    get_route_map,
    get_popular_routes,
    get_event_friends,
    add_event_friend,
    calculate_friend_travel_time,
    search_restaurants,
    filter_menu_by_diet,
    generate_dish_image,
    calculate_split_pace,
    calculate_macro_goals,
    calculate_budget_breakdown,
    search_nightlife,
)


MODEL = "gemini-3.7-flash"


async def generate_memories_callback(callback_context: CallbackContext):
    """Callback to persist conversation turns to Vertex AI Memory Bank."""
    await callback_context.add_session_to_memory()
    return None


# 1. Travel & Map Specialist Sub-Agent
travel_agent = Agent(
    name="travel_agent",
    description="Specialist agent for hotel searches, flight options, route maps, nightlife, event friend roster co-planning, friend travel time comparison, and directions.",
    model=Gemini(model=MODEL, retry_options=types.HttpRetryOptions(attempts=3)),
    instruction=(
        "You are the Travel & Map Specialist for Pulse & Plate. "
        "Help active travelers find hotels, discover running/cycling/skiing routes, discover nightlife & events, "
        "retrieve/add friends attending the event, and calculate relative travel times."
    ),
    tools=[search_hotels, search_flights, get_route_map, get_popular_routes, get_event_friends, add_event_friend, calculate_friend_travel_time, search_nightlife],
)


# 2. Culinary & Menu Specialist Sub-Agent
culinary_agent = Agent(
    name="culinary_agent",
    description="Specialist agent for finding local restaurants, filtering menu items by dietary restrictions, nightlife lounge recommendations, and dish image previews.",
    model=Gemini(model=MODEL, retry_options=types.HttpRetryOptions(attempts=3)),
    instruction=(
        "You are the Culinary & Menu Specialist for Pulse & Plate. "
        "Find restaurants & rooftop lounges catering to dietary restrictions (gluten-free, vegan, keto, pescatarian), "
        "present safe menu items, and generate photorealistic dish image previews."
    ),
    tools=[search_restaurants, filter_menu_by_diet, generate_dish_image, search_nightlife],
)


# 3. Fitness & Finance Specialist Sub-Agent
fitness_finance_agent = Agent(
    name="fitness_finance_agent",
    description="Specialist agent for split pace targets, macro goals, and trip budget breakdowns.",
    model=Gemini(model=MODEL, retry_options=types.HttpRetryOptions(attempts=3)),
    instruction="Specialist for marathon kilometer split paces, macro goals, and trip budget allocations.",
    tools=[calculate_split_pace, calculate_macro_goals, calculate_budget_breakdown],
)


# 4. Root Orchestrator Agent
root_agent = Agent(
    name="root_agent",
    description="Main Pulse & Plate Orchestrator Agent.",
    model=Gemini(model=MODEL, retry_options=types.HttpRetryOptions(attempts=3)),
    instruction="Main Orchestrator Agent.",
    tools=[PreloadMemoryTool()],
    sub_agents=[travel_agent, culinary_agent, fitness_finance_agent],
    after_agent_callback=generate_memories_callback,
)


app = App(
    root_agent=root_agent,
    name="app",
)
