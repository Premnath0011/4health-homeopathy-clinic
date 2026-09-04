import React, { useEffect, useState } from "react";
import {
  Activity,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  Droplets,
  Heart,
  Leaf,
  Moon,
  Search,
  Shield,
  Users,
  Utensils,
  XCircle,
} from "lucide-react";
import {
  FaAllergies,
  FaBone,
  FaBrain,
  FaHeartbeat,
  FaLeaf,
  FaLungs,
  FaTint,
  FaUserMd,
  FaWeight,
} from "react-icons/fa";
import { GiKidneys, GiLiver, GiStomach, GiMedicines } from "react-icons/gi";
import Footer from "./Footer/Footer";
import AppointmentPopup from "./Appoinmnet/Appoinmnetpop";

// ── ONLINE banner image (hero) ─────────────────────────────────
const dietBannerImg = require("../../assets/Image/Diet-plan/diet-plan-banner.webp");

// ── Brand tokens ──────────────────────────────────────────────
const C = {
  blueDark: "#0f3d6e",
  blue: "#0f6baf",
  green: "#4ba86a",
  greenDark: "#3a8a56",
  lightGreen: "#e8f5ed",
  lightBlue: "#eaf4fb",
  muted: "#5f6b7a",
  border: "#e8edf2",
  bgSoft: "#f8fafc",
  red: "#e53935",
  lightRed: "#fdecea",
};

// ── LOCAL food images (from /assets/Image/Diet-plan) ────────────
const FOOD_IMG_POOLS = {
  wholeGrains: [
    require("../../assets/Image/Diet-plan/Whole-Grains.webp"),
    require("../../assets/Image/Diet-plan/Whole-Grains-2.webp"),
    require("../../assets/Image/Diet-plan/Whole-Grains-3.webp"),
    require("../../assets/Image/Diet-plan/Whole-Grains-4.webp"),
  ],
  greens: [
    require("../../assets/Image/Diet-plan/Green-Leafy-Vegetables.webp"),
    require("../../assets/Image/Diet-plan/Greens-1.webp"),
    require("../../assets/Image/Diet-plan/Greens-2.webp"),
    require("../../assets/Image/Diet-plan/Greens-3.webp"),
    require("../../assets/Image/Diet-plan/Greens-4.webp"),
  ],
  protein: [
    require("../../assets/Image/Diet-plan/Protein-Foods.webp"),
    require("../../assets/Image/Diet-plan/Protein-Foods-2.webp"),
    require("../../assets/Image/Diet-plan/Protein-Foods-3.webp"),
    require("../../assets/Image/Diet-plan/Protein-Foods-4.webp"),
    require("../../assets/Image/Diet-plan/Protein-Foods-5.webp"),
  ],
  nuts: [
    require("../../assets/Image/Diet-plan/Nuts-Seeds.webp"),
    require("../../assets/Image/Diet-plan/Nuts-Seeds_2.webp"),
    require("../../assets/Image/Diet-plan/Nuts-Seeds-2.webp"),
    require("../../assets/Image/Diet-plan/Nuts-Seeds-3.webp"),
    require("../../assets/Image/Diet-plan/Nuts-Seeds-4.webp"),
  ],
  fruits: [
    require("../../assets/Image/Diet-plan/Fruits.webp"),
    require("../../assets/Image/Diet-plan/Fruits-2.webp"),
    require("../../assets/Image/Diet-plan/Fruits-3.webp"),
    require("../../assets/Image/Diet-plan/Fruits-4.webp"),
    require("../../assets/Image/Diet-plan/Fruits-5.webp"),
  ],
  spices: [
    require("../../assets/Image/Diet-plan/Herbs-Spices.webp"),
    require("../../assets/Image/Diet-plan/Herbs-Spices-2.webp"),
    require("../../assets/Image/Diet-plan/Herbs-Spices-3.webp"),
  ],
  water: [
    require("../../assets/Image/Diet-plan/Hydration.webp"),
    require("../../assets/Image/Diet-plan/Hydration-2.webp"),
    require("../../assets/Image/Diet-plan/Hydration-3.webp"),
  ],
  dairy: [
    require("../../assets/Image/Diet-plan/Dairy.webp"),
    require("../../assets/Image/Diet-plan/Dairy-2.webp"),
    require("../../assets/Image/Diet-plan/Dairy-3.webp"),
  ],
  refCarbs: [
    require("../../assets/Image/Diet-plan/Refined-Carbohydrates.webp"),
    require("../../assets/Image/Diet-plan/refined-carbs-2.webp"),
    require("../../assets/Image/Diet-plan/refined-carb3.webp"),
  ],
  sugar: [
    require("../../assets/Image/Diet-plan/Sugar-Sweets.webp"),
    require("../../assets/Image/Diet-plan/Sugar_&_Sweets_1.webp"),
    require("../../assets/Image/Diet-plan/Sugar_&_Sweets_2.webp"),
    require("../../assets/Image/Diet-plan/Sugar_&_Sweets_3.webp"),
  ],
  fried: [
    require("../../assets/Image/Diet-plan/Deep-Fried-Foods.webp"),
    require("../../assets/Image/Diet-plan/Fried_Foods_1.webp"),
    require("../../assets/Image/Diet-plan/Fried_Foods_2.webp"),
    require("../../assets/Image/Diet-plan/Fried_Foods_3.webp"),
  ],
  processed: [
    require("../../assets/Image/Diet-plan/Processed-Foods.webp"),
    require("../../assets/Image/Diet-plan/Processed_Foods_1.webp"),
    require("../../assets/Image/Diet-plan/Processed_Foods_2.webp"),
    require("../../assets/Image/Diet-plan/Processed_Foods_3.webp"),
  ],
  caffeine: [
    require("../../assets/Image/Diet-plan/Caffeine.webp"),
    require("../../assets/Image/Diet-plan/Caffeine_1.webp"),
    require("../../assets/Image/Diet-plan/Caffeine_2.webp"),
  ],
  highFruits: [
    require("../../assets/Image/Diet-plan/High-GI-Fruits.webp"),
    require("../../assets/Image/Diet-plan/High_GI_Fruits_1.webp"),
    require("../../assets/Image/Diet-plan/High_GI_Fruits_2.webp"),
    require("../../assets/Image/Diet-plan/High_GI_Fruits_3.webp"),
  ],
  alcohol: [
    require("../../assets/Image/Diet-plan/Alcohol.webp"),
    require("../../assets/Image/Diet-plan/Alcohol_1.webp"),
    require("../../assets/Image/Diet-plan/Alcohol_2.webp"),
    require("../../assets/Image/Diet-plan/Alcohol_3.webp"),
  ],
  junk: [
    require("../../assets/Image/Diet-plan/Junk-Food.webp"),
    require("../../assets/Image/Diet-plan/Junk_Food_1.webp"),
    require("../../assets/Image/Diet-plan/Junk_Food_2.webp"),
    require("../../assets/Image/Diet-plan/Junk_Food_3.webp"),
    require("../../assets/Image/Diet-plan/Junk_Food_4.webp"),
  ],
};

const FOOD_IMG_CURSOR = {};

const food = (imageKey, name, desc) => {
  const pool = FOOD_IMG_POOLS[imageKey] || FOOD_IMG_POOLS.greens;
  const cursor = FOOD_IMG_CURSOR[imageKey] || 0;
  FOOD_IMG_CURSOR[imageKey] = (cursor + 1) % pool.length;
  return {
    img: pool[cursor % pool.length],
    name,
    desc,
  };
};

const CONDITIONS = [
  { id: "pcos", label: "PCOS / PCOD", icon: <span style={{ color: C.green, fontSize: "1rem" }}>♀</span> },
  { id: "amenorrhoea", label: "Amenorrhoea", icon: <span style={{ color: C.green, fontSize: "1rem" }}>♀</span> },
  { id: "fibroid", label: "Fibroid", icon: <span style={{ color: C.green, fontSize: "1rem" }}>♀</span> },
  { id: "fibroadenoma", label: "Fibroadenoma", icon: <span style={{ color: C.green, fontSize: "1rem" }}>♀</span> },
  { id: "leucorrhoea", label: "Leucorrhoea", icon: <span style={{ color: C.green, fontSize: "1rem" }}>♀</span> },
  { id: "melasma", label: "Melasma / Hyperpigmentation", icon: <Shield size={14} style={{ color: C.green }} /> },
  { id: "hairfall", label: "Hair Fall", icon: <FaLeaf size={14} style={{ color: C.green }} /> },
  { id: "hypothyroid", label: "Hypothyroidism", icon: <FaHeartbeat size={14} style={{ color: C.green }} /> },
  { id: "hyperthyroid", label: "Hyperthyroidism", icon: <FaHeartbeat size={14} style={{ color: C.green }} /> },
  { id: "goitre", label: "Goitre", icon: <FaHeartbeat size={14} style={{ color: C.green }} /> },
  { id: "diabetes", label: "Diabetes Mellitus", icon: <Droplets size={14} style={{ color: C.green }} /> },
  { id: "hypertension", label: "Hypertension", icon: <Activity size={14} style={{ color: C.green }} /> },
  { id: "cholesterol", label: "Cholesterol / Hyperlipidemia", icon: <FaHeartbeat size={14} style={{ color: C.green }} /> },
  { id: "weightLoss", label: "Weight Loss", icon: <FaWeight size={14} style={{ color: C.green }} /> },
  { id: "weightGain", label: "Weight Gain", icon: <FaWeight size={14} style={{ color: C.green }} /> },
  { id: "anemia", label: "Anemia", icon: <FaTint size={14} style={{ color: C.green }} /> },
  { id: "calcium", label: "Calcium-Rich Foods", icon: <FaBone size={14} style={{ color: C.green }} /> },
  { id: "vitaminB12", label: "Vitamin B12 Foods", icon: <GiMedicines size={14} style={{ color: C.green }} /> },
  { id: "vitaminD", label: "Vitamin D Foods", icon: <GiMedicines size={14} style={{ color: C.green }} /> },
  { id: "fattyLiver", label: "Fatty Liver", icon: <GiLiver size={14} style={{ color: C.green }} /> },
  { id: "gallStone", label: "Gall Stone", icon: <GiLiver size={14} style={{ color: C.green }} /> },
  { id: "gastricUlcer", label: "Gastric Ulcer", icon: <GiStomach size={14} style={{ color: C.green }} /> },
  { id: "ibs", label: "Irritable Bowel Syndrome", icon: <GiStomach size={14} style={{ color: C.green }} /> },
  { id: "constipation", label: "Constipation", icon: <GiStomach size={14} style={{ color: C.green }} /> },
  { id: "piles", label: "Piles", icon: <GiStomach size={14} style={{ color: C.green }} /> },
  { id: "ckd", label: "Chronic Kidney Disease", icon: <GiKidneys size={14} style={{ color: C.green }} /> },
  { id: "kidneyStone", label: "Kidney Stone", icon: <GiKidneys size={14} style={{ color: C.green }} /> },
  { id: "gout", label: "Gout", icon: <FaBone size={14} style={{ color: C.green }} /> },
  { id: "rheumatoid", label: "Rheumatoid Arthritis", icon: <FaBone size={14} style={{ color: C.green }} /> },
  { id: "osteoarthritis", label: "Osteoarthritis", icon: <FaBone size={14} style={{ color: C.green }} /> },
  { id: "radiculopathy", label: "Cervical / Lumbar Radiculopathy", icon: <FaBone size={14} style={{ color: C.green }} /> },
  { id: "cough", label: "Cough", icon: <FaLungs size={14} style={{ color: C.green }} /> },
  { id: "urticaria", label: "Urticaria", icon: <FaAllergies size={14} style={{ color: C.green }} /> },
  { id: "ichthyosis", label: "Ichthyosis", icon: <Shield size={14} style={{ color: C.green }} /> },
  { id: "mindCalm", label: "Mind Calm", icon: <FaBrain size={14} style={{ color: C.green }} /> },
  { id: "sleep", label: "Sleep-Inducing Diet", icon: <Moon size={14} style={{ color: C.green }} /> },
  { id: "vertigo", label: "Vertigo", icon: <FaBrain size={14} style={{ color: C.green }} /> },
];

const DIET_DATA = {
  pcos: {
    title: "PCOS / PCOD Diet Chart",
    icon: <span style={{ fontSize: "2rem", color: C.green }}>♀</span>,
    desc: "High-fibre, protein-rich and low-glycaemic food guidance from the supplied PCOS / PCOD charts.",
    include: [
      food("wholeGrains", "High-Fibre Grains", "Ragi, kambu, bajra, jowar, brown rice, red rice, quinoa, millet dosa/idli, rolled or steel-cut oats."),
      food("greens", "Vegetables & Greens", "Spinach, broccoli, beetroot, carrot, cabbage, okra, moringa leaves and other green leafy vegetables."),
      food("fruits", "Low-GI Fruits", "Apple, pear, papaya, guava, oranges and pomegranate."),
      food("protein", "Protein-Rich Foods", "Eggs, dals, peas, channa, cowpea, green gram, horse gram, rajma, sprouts, limited paneer, soya chunks and curd."),
      food("nuts", "Healthy Fats & Seeds", "Pistachio, almonds, walnuts, flax, chia, pumpkin and sesame seeds; rotate olive, groundnut and sesame oils."),
      food("spices", "Anti-Inflammatory Foods", "Turmeric water, ginger with lemon and moringa leaves."),
      food("fruits", "Iron & Magnesium Support", "Tomato-pomegranate-amla-carrot-beetroot juice, halim seeds, black-eyed peas, nuts, seeds, beans and whole grains."),
      food("dairy", "Gut-Friendly Foods", "Buttermilk and curd, when they suit the individual."),
    ],
    avoid: [
      food("sugar", "Sugar & Sweets", "Sugary drinks, sweets, cakes, desserts, ice cream, chocolates, milkshakes and sweetened juices."),
      food("refCarbs", "Refined Carbohydrates", "Maida, white bread, pasta, noodles, biscuits, bakery foods, samosa, puffs and rolls."),
      food("highFruits", "High-GI Fruits", "Limit grapes, ripe yellow banana, mango, sapota and dates."),
      food("dairy", "Dairy When It Triggers Symptoms", "Limit cheese, cream, butter and milk when acne or bloating worsens."),
      food("processed", "Inflammatory & Packaged Foods", "Red meat, processed chicken, chips, packaged foods, mayonnaise, soda and cool drinks."),
      food("fried", "Unhealthy Oils & Fried Foods", "Dalda, vanaspati, reused oil and deep-fried foods."),
      food("refCarbs", "Wheat Restriction in Source Chart", "The chart advises avoiding bread, pasta, sooji, chapati and wheat dosa, replacing them with millets."),
    ],
  },
  amenorrhoea: {
    title: "Amenorrhoea Diet Chart",
    icon: <span style={{ fontSize: "2rem", color: C.green }}>♀</span>,
    desc: "Daily and alternate-day foods listed in the supplied amenorrhoea chart.",
    include: [
      food("spices", "Daily Seeds & Herbs", "Soaked fenugreek, flaxseed powder 1 tsp and sesame seeds 1 tsp daily."),
      food("fruits", "Daily Fruit", "Papaya or pomegranate, about ½ cup."),
      food("dairy", "Daily Curd", "Curd, about 1 cup per day."),
      food("nuts", "Daily Nuts", "Almonds or walnuts, 5–6 daily."),
      food("wholeGrains", "Alternate-Day Grains", "Oats or ragi."),
      food("greens", "Alternate-Day Greens", "Moringa leaves or spinach."),
      food("fruits", "Alternate-Day Beetroot", "Beetroot, about ½ cup."),
      food("protein", "Alternate-Day Sprouts", "Sprouts, about 1 cup."),
    ],
    avoid: [
      food("processed", "Processed Foods", "Packaged and preserved foods that can disrupt hormone balance."),
      food("sugar", "Excess Sugar", "Sweets and sugary drinks that spike insulin and affect hormones."),
      food("caffeine", "Excess Caffeine", "More than 1–2 cups of tea or coffee daily."),
      food("fried", "Fried Foods", "Deep-fried and oily snacks."),
    ],
  },
  fibroid: {
    title: "Fibroid Diet Chart",
    icon: <span style={{ fontSize: "2rem", color: C.green }}>♀</span>,
    desc: "Whole foods, iron-rich choices and hydration guidance from the supplied fibroid charts.",
    include: [
      food("wholeGrains", "Whole Grains", "Brown rice, oats, red rice and millets such as ragi, kambu, bajra and jowar."),
      food("greens", "Vegetables & Greens", "Spinach, carrot, beetroot, cabbage, drumstick leaves, amaranth and palak."),
      food("fruits", "Fruits", "Papaya, guava, oranges, pomegranate and amla."),
      food("protein", "Legumes", "Rajma, channa, green gram, horse gram and cowpea."),
      food("greens", "Cruciferous Vegetables", "Cooked cauliflower, broccoli and cabbage about three times a week."),
      food("nuts", "Iron & Healthy Fat Foods", "Dates, raisins, black sesame, flaxseed powder, walnuts and chia seeds."),
      food("spices", "Anti-Inflammatory Foods", "Garlic, ginger and turmeric added to regular cooking."),
      food("water", "Hydrating Drinks", "Tender coconut water, barley water, buttermilk, ginger/mint/tulsi tea, jeera or coriander water and ajwain water."),
    ],
    avoid: [
      food("processed", "Hormone-Disrupting Foods", "Excess soy milk or tofu, packaged foods, canned foods and hot food stored in BPA plastics."),
      food("sugar", "Refined Sugar", "Sweets, bakery foods and cold drinks."),
      food("fried", "Fatty & Processed Foods", "Fried items, chips, bakery snacks, processed meat and creamy, cheesy or buttery dishes."),
      food("caffeine", "Caffeine & Alcohol", "Coffee, energy drinks and alcohol."),
      food("processed", "Red Meat", "Mutton and pork."),
    ],
  },
  fibroadenoma: {
    title: "Fibroadenoma Diet Chart",
    icon: <span style={{ fontSize: "2rem", color: C.green }}>♀</span>,
    desc: "Food groups listed in the supplied fibroadenoma charts for regular use and restriction.",
    include: [
      food("nuts", "Seed Foods", "Flaxseed powder 1 tsp daily, sesame seeds and pumpkin or sunflower seeds."),
      food("protein", "Legumes", "Horse gram and moderate soy foods such as tofu or soybeans two to three times weekly."),
      food("greens", "Green Vegetables", "Spinach, methi, moringa leaves, carrot, beetroot, bottle gourd, cabbage and broccoli."),
      food("spices", "Anti-Inflammatory Foods", "Turmeric with black pepper, ginger, garlic and moringa."),
      food("wholeGrains", "High-Fibre Foods", "Ragi, jowar, bajra, other millets, red rice and brown rice."),
      food("fruits", "Fruits", "Papaya, apple, orange, pear and lemon water."),
      food("nuts", "Healthy Fats", "Almonds, walnuts, small amounts of coconut and occasional avocado."),
      food("greens", "Liver-Supporting Choices", "Beetroot, cabbage and coriander juice."),
    ],
    avoid: [
      food("dairy", "Excess Dairy", "Avoid daily full-fat milk, paneer and cheese."),
      food("processed", "Junk & Processed Foods", "Chips, biscuits, bakery items and packaged snacks."),
      food("caffeine", "Excess Tea or Coffee", "Limit tea or coffee to about one cup per day."),
      food("processed", "Frequent Broiler Chicken", "The source chart advises avoiding frequent broiler chicken."),
      food("fried", "Fried Foods", "Bajji, samosa, parippu vada and fried chicken."),
      food("processed", "Red Meat & Hot Food in Plastic", "Mutton, beef and storing hot food in plastic containers."),
    ],
  },
  leucorrhoea: {
    title: "Leucorrhoea Diet Chart",
    icon: <span style={{ fontSize: "2rem", color: C.green }}>♀</span>,
    desc: "Simple daily include and avoid guidance from the supplied leucorrhoea chart.",
    include: [
      food("fruits", "Amla", "Include amla daily."),
      food("wholeGrains", "Millets & Rice", "Millets and white rice."),
      food("greens", "Gourds", "Bottle gourd, ash gourd and ridge gourd."),
      food("dairy", "Curd", "Curd during daytime only."),
      food("nuts", "Almonds", "Include almonds."),
    ],
    avoid: [
      food("sugar", "Sweeteners", "Jaggery and honey."),
      food("processed", "Pickles & Packed Foods", "Pickles, processed foods and packaged foods."),
      food("caffeine", "Tea, Coffee & Soft Drinks", "Tea, coffee and soft drinks."),
      food("dairy", "Curd at Night", "Avoid curd at night."),
    ],
  },
  melasma: {
    title: "Melasma / Hyperpigmentation Diet Chart",
    icon: <Shield size={32} style={{ color: C.green }} />,
    desc: "Time-based daily food plan and restriction list from the supplied melasma charts.",
    include: [
      food("water", "Early Morning", "Warm water with ½ lemon, one glass."),
      food("fruits", "Amla", "One fruit or 1 tbsp juice in the early morning."),
      food("protein", "Breakfast Protein", "One whole egg or 40–50 g paneer."),
      food("wholeGrains", "Breakfast & Lunch Grains", "Small portion of millet dosa or oats; small portion of brown rice or millet at lunch."),
      food("nuts", "Flaxseed Powder", "1 tsp with breakfast."),
      food("dairy", "Buttermilk & Curd", "One glass buttermilk mid-morning and ½ cup curd at lunch, daytime only."),
      food("fruits", "Fruit & Evening Snack", "Small guava or papaya mid-morning; ½ cup pomegranate or a small handful of nuts before 6 PM."),
      food("greens", "Lunch Vegetables", "Bottle or ash gourd, snake or ridge gourd and spinach or moringa greens, about 1 cup each."),
      food("protein", "Lunch Dal", "One small bowl of dal."),
      food("nuts", "Ghee", "1 tsp at lunch."),
      food("greens", "Early Dinner", "Vegetable soup or steamed vegetables by 7:30 PM."),
    ],
    avoid: [
      food("sugar", "Sugar, Jaggery & Honey", "The source chart links these with pigmentation triggers."),
      food("refCarbs", "White Rice & Maida", "Listed as insulin-spiking foods."),
      food("processed", "Bakery & Processed Foods", "Listed as hormone-imbalance triggers."),
      food("caffeine", "Tea or Coffee Daily", "The chart advises avoiding daily tea or coffee."),
      food("fruits", "Fruits or Curd at Night", "Avoid at night according to the source chart."),
      food("processed", "Sunflower & Refined Oils", "Listed as pro-inflammatory oils."),
    ],
  },
  hairfall: {
    title: "Hair Fall Diet Chart",
    icon: <FaLeaf size={32} style={{ color: C.green }} />,
    desc: "Daily nutrient-focused food list from the supplied hair-fall charts.",
    include: [
      food("greens", "Iron-Rich Foods", "Amla, moringa leaves, palak or araikeerai, pomegranate, dates and soaked dry grapes."),
      food("fruits", "Vitamin C Foods", "Amla and orange or mosambi to accompany iron-rich foods."),
      food("protein", "Protein Foods", "One to two eggs, ragi, peanut chutney or groundnuts; target listed in the chart is 20–30 g protein daily."),
      food("dairy", "Calcium & Vitamin D", "Curd or buttermilk, about 1 cup with lunch."),
      food("nuts", "Zinc & Biotin", "Sesame seeds, curry leaves, moringa leaves and banana stem."),
      food("nuts", "Healthy Fats & Omega-3", "Fresh coconut or coconut chutney, flaxseed powder, walnuts and almonds."),
    ],
    avoid: [
      food("sugar", "Sugar & Sweets", "Refined sugar that depletes B-vitamins needed for hair growth."),
      food("fried", "Fried & Oily Foods", "Excess fried snacks that contribute to scalp inflammation."),
      food("caffeine", "Excess Caffeine", "Interferes with iron and zinc absorption."),
      food("processed", "Processed Foods", "Packaged and preservative-heavy foods."),
    ],
  },
  hypothyroid: {
    title: "Hypothyroidism Diet Chart",
    icon: <FaHeartbeat size={32} style={{ color: C.green }} />,
    desc: "Food and routine guidance listed in the supplied hypothyroidism charts.",
    include: [
      food("dairy", "Iodine-Related Foods", "Rock or sambharam salt in normal amounts, curd-based foods, avarakkai, drumstick, beans and small idli-sambar portions."),
      food("protein", "Selenium & Protein Foods", "Spinach, coconut, groundnut, horse gram, green gram, mushroom, sprouts, dal and small paneer portions."),
      food("spices", "Anti-Inflammatory Foods", "Turmeric with pepper, ginger, garlic, drumstick or methi leaves, curry leaves, jeera and cinnamon."),
      food("dairy", "Gut-Supporting Foods", "Small curd portions, buttermilk, jeera water, lemon water, papaya, mosambi and orange."),
      food("nuts", "Daily Combination Ideas", "Curd with flaxseed powder, moringa leaves with lemon, warm turmeric water and sprouts with coconut."),
      food("water", "Routine Guidance", "Walk or yoga 30 minutes, sleep 7–8 hours, drink 2–2.5 L water and avoid skipping meals."),
    ],
    avoid: [
      food("refCarbs", "Maida & Bakery Foods", "Parotta, bakery items, rusk, biscuits and buns."),
      food("fried", "Deep-Fried Foods", "Avoid deep-fried items."),
      food("greens", "Raw Cruciferous Vegetables", "Raw cabbage, cauliflower and broccoli; the source says cooked forms are acceptable."),
      food("sugar", "White Sugar & Sweet Drinks", "White sugar, packed juices and cold drinks."),
      food("processed", "Excess Soy", "The source allows tofu about twice a week but advises against excess soy."),
      food("refCarbs", "Heavy Rice at Night", "Avoid too much rice at night."),
    ],
  },
  hyperthyroid: {
    title: "Hyperthyroidism Diet Chart",
    icon: <FaHeartbeat size={32} style={{ color: C.green }} />,
    desc: "Food groups to include and avoid from the supplied hyperthyroidism charts.",
    include: [
      food("greens", "Cruciferous Vegetables", "Cabbage, cauliflower, broccoli, kale, mustard greens, turnip and Brussels sprouts."),
      food("dairy", "Calcium-Rich Foods", "Curd, paneer, milk when tolerated, ragi and sesame seeds."),
      food("nuts", "Iron & Zinc Foods", "Spinach, methi, groundnut, pumpkin seeds, almonds and cashews."),
      food("wholeGrains", "B-Complex Foods", "Whole wheat, brown rice and millets such as kambu and thinai."),
      food("nuts", "Healthy Fats", "Coconut, flaxseeds, walnuts and avocado."),
      food("protein", "Protein", "Dal, channa, rajma, soya chunks, paneer, curd and eggs."),
    ],
    avoid: [
      food("processed", "Iodine-Rich Foods", "Iodised salt, sea fish, prawns and seaweed."),
      food("caffeine", "Stimulants", "Tea, coffee, green tea and energy drinks."),
      food("sugar", "High-Sugar Foods", "Sweets, soft drinks, bakery items and excess chocolate."),
      food("spices", "Very Spicy Foods", "Red-chilli-heavy curries, masala-fried dishes and pickles."),
      food("refCarbs", "High-GI Carbohydrates", "White rice, maida items, parotta and white bread."),
      food("junk", "Junk Foods", "Fried foods, chips and fast food."),
    ],
  },
  goitre: {
    title: "Goitre Diet Chart",
    icon: <FaHeartbeat size={32} style={{ color: C.green }} />,
    desc: "Daily vegetables, fruits, proteins and gut-support foods from the supplied goitre charts.",
    include: [
      food("greens", "Daily Vegetables", "Moringa leaves, carrot, beetroot, bottle gourd, ash gourd and tomato."),
      food("fruits", "Daily Fruits", "Papaya, apple, guava, orange or mosambi and pomegranate; one to two servings."),
      food("protein", "Protein Foods", "Eggs, fish two to three times weekly, green gram, channa and toor dal."),
      food("greens", "Greens & Herbs", "Curry leaves, coriander and mint."),
      food("nuts", "Healthy Fats", "Coconut oil, fresh coconut and groundnuts in small daily amounts."),
      food("dairy", "Gut Support", "Curd, buttermilk, lemon water and warm jeera water."),
    ],
    avoid: [
      food("greens", "Raw Cruciferous Foods", "Avoid raw cabbage, cauliflower and broccoli; the source permits limited cooked use."),
      food("processed", "Soy Foods", "The source chart advises complete avoidance."),
      food("wholeGrains", "Kambu / Bajra", "Limit to about once monthly according to the source chart."),
      food("processed", "Bakery Items", "Avoid heavily processed bakery foods."),
    ],
  },
  diabetes: {
    title: "Diabetes Mellitus Diet Chart",
    icon: <Droplets size={32} style={{ color: C.green }} />,
    desc: "Food categories, meal timing and add-on habits from the supplied diabetes charts.",
    include: [
      food("nuts", "Healthy Fats", "Walnuts, almonds, peanuts and pumpkin seeds in small daily portions."),
      food("fruits", "Controlled Fruits", "Guava, green apple, orange and lemon in controlled portions."),
      food("greens", "Leafy Vegetables", "Spinach, moringa leaves and agathi greens daily."),
      food("protein", "Legumes", "Sprouts, channa and green gram, about 1 cup per day."),
      food("dairy", "Protein with Meals", "Eggs or homemade curd in moderate amounts with meals."),
      food("greens", "Vegetables & Fibre", "Vegetables, legumes and seeds daily; bitter gourd or similar vegetables frequently."),
      food("spices", "Spice in Cooking", "Fenugreek in daily cooking; soaked fenugreek water is listed as a morning add-on."),
      food("wholeGrains", "Restricted Rice Choice", "Brown or hand-pounded rice, about ½ cup cooked and no more than once daily."),
      food("nuts", "Cooking Oils", "Sesame and groundnut oil, with total oil limited to about 2 tsp daily in the chart."),
      food("water", "Meal & Lifestyle Timing", "Biggest meal before 3 PM, light early dinner, do not eat carbohydrates alone, use muscles daily and sleep before 11 PM."),
    ],
    avoid: [
      food("refCarbs", "Refined Carbohydrates", "White rice in excess, maida, rava and broken wheat."),
      food("sugar", "Sugar, Jaggery & Sweets", "Sugar, jaggery, sweet foods, ice cream, soda and cool drinks."),
      food("fried", "Fried Foods", "Fried and trans-fat-rich foods."),
      food("processed", "Bakery & Packaged Foods", "Bakery items, maida foods and biscuits."),
      food("highFruits", "High-Sugar Fruits", "Custard apple, banana, mango and pineapple."),
      food("processed", "Red Meat", "Beef and pork."),
      food("water", "Tender Coconut Water", "The source chart places tender coconut water in the avoid list."),
      food("alcohol", "Alcohol", "Avoid alcohol."),
    ],
  },
  hypertension: {
    title: "Hypertension Diet Chart",
    icon: <Activity size={32} style={{ color: C.green }} />,
    desc: "Daily foods and high-salt restrictions from the supplied hypertension charts.",
    include: [
      food("fruits", "Fruits", "Banana, pomegranate, apple, papaya, mosambi, watermelon and grapes."),
      food("greens", "Vegetables", "Beetroot, carrot, cucumber, tomato, spinach, broccoli, cauliflower, bottle gourd, drumstick leaves and bitter gourd."),
      food("wholeGrains", "Carbohydrates & Grains", "Oats, ragi, bajra, foxtail millet, small brown-rice portions and wheat chapati."),
      food("protein", "Protein", "Moong dal, toor dal, channa, cowpea, sprouts, sardine or mackerel and boiled or grilled skinless chicken."),
      food("nuts", "Healthy Fats", "Olive, rice-bran or groundnut oil, total about 2–3 tsp/day."),
      food("water", "Drinks", "Warm water, lemon water, tender coconut, hibiscus tea and green tea."),
      food("nuts", "Healthy Snacks", "Five almonds, one walnut, 1 tsp flaxseed and 1 tsp pumpkin seeds."),
      food("fruits", "Special Source Tip", "Daily beetroot-carrot juice and two garlic cloves at night are listed in the chart."),
    ],
    avoid: [
      food("processed", "High-Salt Foods", "Pickles, papad, podi, salted peanuts, ready soups, canned foods, soy sauce and tomato sauce."),
      food("fried", "Fried & Oily Foods", "Chips, pakoda, puffs and deep-fried fish or chicken."),
      food("refCarbs", "Refined Carbohydrates", "Maida, parotta, white bread and bakery items."),
      food("processed", "High-Fat Animal Foods", "Beef, mutton, pork, organ meats, sausages and nuggets."),
      food("sugar", "Sugary Foods & Drinks", "White sugar, sweets, ice cream, soft drinks and energy drinks."),
      food("caffeine", "Excess Caffeine", "More than two cups of tea or more than one cup of coffee."),
      food("processed", "Other Processed Foods", "Instant noodles, biscuits and mixture."),
    ],
  },
  cholesterol: {
    title: "Cholesterol / Hyperlipidemia Diet Chart",
    icon: <FaHeartbeat size={32} style={{ color: C.green }} />,
    desc: "Detailed include, avoid, quantity and timing guidance from the supplied cholesterol charts.",
    include: [
      food("nuts", "Oils & Healthy Fats", "Cold-pressed gingelly oil 2 tsp, groundnut oil 1 tsp, olive oil for raw use, flaxseed oil or powder 1 tsp and 5–6 soaked almonds."),
      food("wholeGrains", "Grains & Cereals", "Oats, barley, brown rice and millets such as ragi or jowar."),
      food("protein", "Pulses & Plant Protein", "Green gram, moong dal, masoor dal, horse gram and small soy portions."),
      food("fruits", "Whole Fruits", "Guava, pear and citrus fruits such as orange or sweet lime."),
      food("greens", "Fibre-Rich Vegetables", "Okra, bottle gourd, ash gourd, snake gourd and leafy vegetables."),
      food("nuts", "Seeds & Nuts", "Flaxseed, soaked chia seeds and pumpkin seeds, about 1 tsp each."),
      food("spices", "Functional Foods", "Garlic, turmeric with black pepper, cinnamon and ginger."),
      food("water", "Water & Timing", "About 2.5–3 L water, dinner before 7:30 PM, 12-hour overnight fasting and a post-meal walk."),
    ],
    avoid: [
      food("fried", "Trans & Oxidised Fats", "Vanaspati, dalda, bakery shortening, reheated oil and excess ghee."),
      food("refCarbs", "Refined Grains", "White rice in excess, white bread, refined flour and other fibre-poor starches."),
      food("sugar", "Sugar & Sweets", "White sugar, jaggery and sweets."),
      food("fried", "Fried & Processed Foods", "Deep-fried foods, fast foods and packaged snacks."),
      food("processed", "Animal Foods When LDL Is High", "Red meat, organ meats, processed meat and more than two egg yolks weekly."),
      food("highFruits", "Sugar-Rich Fruits", "Grapes and excess large or ripe banana."),
      food("dairy", "Full-Fat Dairy", "Full-fat milk and ice cream."),
      food("alcohol", "Lifestyle Restrictions", "Alcohol, late-night dinner, sleeping under six hours and a sedentary lifestyle."),
    ],
  },
  weightLoss: {
    title: "Weight Loss Diet Chart",
    icon: <FaWeight size={32} style={{ color: C.green }} />,
    desc: "General food list and restrictions from the supplied weight-loss charts.",
    include: [
      food("wholeGrains", "Limited Carbohydrates", "Red or brown rice, small white-rice portions, chapati, wheat dosa, ragi dosa or porridge and oats."),
      food("protein", "Proteins", "Toor, moong, channa, rajma, curd, paneer, eggs, green gram, fish and other lean proteins."),
      food("greens", "Vegetables", "All vegetables, greens, cabbage, carrot, beans, beetroot, cucumber, tomato and gourds."),
      food("fruits", "Fruits", "Apple, orange, papaya, watermelon and pomegranate; one to two servings daily."),
      food("nuts", "Healthy Fats", "Small amounts of coconut, groundnut or gingelly oil, 5–6 nuts and chia or flax seeds."),
      food("water", "Other Options", "Buttermilk, lemon water, green tea, jeera water, soups, salads, sprouts and boiled corn."),
    ],
    avoid: [
      food("sugar", "Sugar Items", "Sugar in tea or coffee, sweets, chocolates, cakes, biscuits, rusk and fruit juices."),
      food("refCarbs", "Maida Foods", "Parotta, bakery bread, pizza, burger, maida biscuits, white pasta and noodles."),
      food("fried", "Fried & High-Fat Foods", "Chicken 65, beef or pork fry, frequent fish fry, chips, mixture, puffs, samosa and bajji."),
      food("highFruits", "High-Calorie Fruits", "Nendran banana, grapes, jackfruit and mango during weight loss."),
      food("junk", "Other Restrictions", "Soft drinks, ice cream, late-night food, rice at night and excess nuts or dry fruits."),
      food("caffeine", "Late Caffeine", "Tea or coffee after 6 PM."),
      food("nuts", "Excess Ghee", "More than 1 tsp ghee per day."),
    ],
  },
  weightGain: {
    title: "Weight Gain Diet Chart",
    icon: <FaWeight size={32} style={{ color: C.green }} />,
    desc: "Calorie-dense, nutrient-rich foods and healthy-fat guidance to support gradual, healthy weight gain.",
    include: [
      food("protein", "Protein-Rich Foods", "Eggs, chicken, fish, paneer, tofu, dal, rajma and channa to support muscle growth."),
      food("dairy", "Full-Fat Dairy", "Whole milk, curd, paneer and cheese for calorie-dense nutrition."),
      food("nuts", "Nuts & Dry Fruits", "Almonds, cashews, walnuts, raisins and dates as calorie-rich snacks."),
      food("wholeGrains", "Carbohydrate-Rich Grains", "Rice, wheat chapati, oats and potatoes for sustained energy."),
      food("nuts", "Healthy Fats", "Ghee, peanut butter, olive oil and avocado added to daily meals."),
      food("fruits", "Calorie-Dense Fruits", "Banana, mango, chikoo and dried fruits between meals."),
      food("protein", "Frequent Small Meals", "5–6 smaller meals through the day instead of 2–3 large ones."),
      food("dairy", "Shakes & Smoothies", "Milk-banana-peanut butter smoothies as a calorie boost between meals."),
    ],
    avoid: [
      food("junk", "Empty-Calorie Junk Food", "Chips, aerated drinks and sugary snacks that add calories without nutrition."),
      food("caffeine", "Excess Caffeine", "Reduces appetite and interferes with nutrient absorption."),
      food("alcohol", "Alcohol & Smoking", "Suppresses appetite and interferes with nutrient absorption."),
      food("fried", "Skipping Meals", "Irregular eating patterns that make it harder to maintain a calorie surplus."),
    ],
  },
  anemia: {
    title: "Anemia Diet Chart",
    icon: <FaTint size={32} style={{ color: C.green }} />,
    desc: "Iron-rich foods paired with vitamin C combinations from the supplied anemia chart.",
    include: [
      food("greens", "Spinach + Lemon", "Spinach poriyal with squeezed lemon."),
      food("greens", "Moringa Leaves + Tomato", "Moringa leaf curry prepared with tomato."),
      food("fruits", "Dates + Orange", "Three dates with one orange in the morning."),
      food("nuts", "Black Sesame + Lemon", "Black-sesame powder with lemon rice."),
      food("wholeGrains", "Ragi + Amla", "Ragi dosa with amla chutney."),
      food("fruits", "Beetroot + Lemon", "Beetroot salad with lemon."),
      food("protein", "Horse Gram + Tomato", "Horse-gram rasam with tomato."),
      food("protein", "Chickpeas + Lemon", "Sundal with squeezed lemon."),
      food("protein", "Green Gram + Tomato", "Green-gram sprouts salad with tomato."),
      food("sugar", "Jaggery + Amla", "Jaggery with amla as a snack, as listed in the source chart."),
    ],
    avoid: [
      food("caffeine", "Tea/Coffee with Meals", "Tannins in tea and coffee reduce iron absorption when taken with food."),
      food("dairy", "Calcium Foods with Iron Meals", "Milk or curd taken alongside iron-rich meals, since calcium competes with iron absorption."),
      food("processed", "Processed Foods", "Low in the nutrients needed to rebuild healthy blood cells."),
    ],
  },
  calcium: {
    title: "Calcium-Rich Foods Chart",
    icon: <FaBone size={32} style={{ color: C.green }} />,
    desc: "Food sources and practical serving ideas from the supplied calcium charts.",
    include: [
      food("greens", "Green Leafy Vegetables", "Moringa leaves, agathi leaves and spinach as kootu, poriyal, soup or cooked curry."),
      food("wholeGrains", "Ragi", "Ragi dosa, porridge or kali; listed as a very high-calcium grain."),
      food("dairy", "Dairy", "Curd with lunch and paneer as curry or stir-fry."),
      food("nuts", "Almonds", "Five soaked almonds in the morning."),
      food("nuts", "Seeds", "Sesame as powder, laddu or chutney; soaked chia seeds; flaxseed powder in food."),
      food("protein", "Fish with Bones", "Sardines and nethili fish, including edible bones."),
      food("fruits", "Vitamin C Fruits", "Amla and orange or sweet lime."),
      food("fruits", "Dry Figs", "Two soaked figs daily."),
    ],
    avoid: [
      food("caffeine", "Excess Caffeine", "Increases calcium loss through urine."),
      food("sugar", "Excess Sugar & Soft Drinks", "Colas and sugary drinks linked to lower bone density."),
      food("processed", "High-Sodium Processed Foods", "Excess salt increases calcium excretion."),
    ],
  },
  vitaminB12: {
    title: "Vitamin B12 Food Reference",
    icon: <GiMedicines size={32} style={{ color: C.green }} />,
    desc: "Vitamin B12 values listed in the supplied reference chart.",
    include: [
      food("protein", "Chicken Liver", "About 16–20 mcg vitamin B12 per 100 g."),
      food("protein", "Sheep Liver", "About 80–95 mcg per 100 g."),
      food("protein", "Clams", "About 85–99 mcg per 100 g."),
      food("protein", "Sardines", "About 8–12 mcg per 100 g."),
      food("protein", "Egg Yolk", "About 2–2.5 mcg per 100 g."),
      food("protein", "Whole Egg", "About 1.1–1.4 mcg per 100 g."),
      food("dairy", "Curd / Yogurt", "About 0.4–0.8 mcg per 100 g."),
    ],
    avoid: [
      food("alcohol", "Alcohol", "Interferes with B12 absorption in the gut."),
      food("processed", "Highly Processed Foods", "Offer little to no natural B12."),
    ],
  },
  vitaminD: {
    title: "Vitamin D Food Reference",
    icon: <GiMedicines size={32} style={{ color: C.green }} />,
    desc: "Vitamin D food quantities and IU values listed in the supplied reference chart.",
    include: [
      food("greens", "Sun-Exposed Mushrooms", "100 g provides about 400–600 IU in the source chart."),
      food("nuts", "Cod Liver Oil", "1 tsp (5 ml) provides about 450–500 IU."),
      food("protein", "Salmon", "100 g provides about 360–400 IU."),
      food("protein", "Mackerel", "100 g provides about 300–360 IU."),
      food("protein", "Sardines", "100 g provides about 250–300 IU."),
      food("dairy", "Fortified Milk", "1 cup (250 ml) provides about 100–120 IU."),
      food("dairy", "Fortified Soy / Almond Milk", "1 cup provides about 100–120 IU."),
      food("fruits", "Fortified Orange Juice", "About 90–100 IU per listed serving."),
      food("dairy", "Fortified Curd / Yogurt", "About 80–100 IU per listed serving."),
      food("protein", "Rohu / Katla Fish", "100 g provides about 80–120 IU."),
      food("wholeGrains", "Fortified Breakfast Cereals", "About 40–80 IU per listed serving."),
      food("greens", "Regular Mushrooms", "100 g provides about 20–40 IU."),
    ],
    avoid: [
      food("caffeine", "Excess Caffeine", "Some studies link heavy intake with lower vitamin D levels."),
      food("processed", "Processed Foods", "Low in natural vitamin D and can displace fortified foods."),
      food("sugar", "Excess Sugar", "Linked with lower vitamin D status in some studies."),
    ],
  },
  fattyLiver: {
    title: "Fatty Liver Diet Chart",
    icon: <GiLiver size={32} style={{ color: C.green }} />,
    desc: "Insulin-lowering, anti-inflammatory and fibre-rich foods from the supplied fatty-liver charts.",
    include: [
      food("wholeGrains", "Low-Glycaemic Grains", "Ragi, kambu, thinai, red or brown rice, oats and whole-wheat chapati."),
      food("spices", "Liver-Focused Foods", "Garlic, green tea, black coffee and apple-cider vinegar as listed in the chart."),
      food("spices", "Anti-Inflammatory Foods", "Turmeric with pepper, ginger, curry leaves and amla."),
      food("greens", "Supportive Vegetables", "Beetroot, cabbage, broccoli, leafy vegetables and coriander leaves."),
      food("dairy", "Gut Microbiome Foods", "Homemade curd, buttermilk and fermented foods."),
      food("nuts", "Omega-3 Foods", "Flaxseed, walnuts and fish when non-vegetarian."),
      food("fruits", "High-Fibre Fruits", "Guava and apple."),
    ],
    avoid: [
      food("sugar", "Sugar & Sweets", "Listed as direct liver-fat-forming foods."),
      food("fruits", "Fruit Juice", "Listed as a concentrated fructose source."),
      food("processed", "Bakery Foods", "Listed as trans-fat foods."),
      food("sugar", "Soft Drinks", "Listed as high-fructose-corn-syrup sources."),
      food("alcohol", "Alcohol", "The source chart lists alcohol as directly damaging to liver cells."),
    ],
  },
  gallStone: {
    title: "Gall Stone Diet Chart",
    icon: <GiLiver size={32} style={{ color: C.green }} />,
    desc: "Low-fat, high-fibre and hydration guidance from the supplied gall-stone charts.",
    include: [
      food("fruits", "Fruits", "Apple, pear, papaya, watermelon, pomegranate and mosambi."),
      food("greens", "Vegetables", "Cucumber, carrot, beetroot, snake gourd, bottle gourd, pumpkin, bitter gourd and spinach."),
      food("wholeGrains", "Whole Grains", "Ragi, oats, red rice, brown rice and thin wheat chapati."),
      food("nuts", "Very Small Healthy Fats", "Small amounts of gingelly or olive oil."),
      food("protein", "Vegetarian Proteins", "Green gram, horse gram, sprouts and tofu."),
      food("protein", "Non-Vegetarian Proteins", "Boiled or grilled skinless chicken and steamed fish."),
      food("water", "Daily Drinks", "Warm lemon water, jeera water and overnight-soaked methi water."),
    ],
    avoid: [
      food("fried", "Deep-Fried & Fatty Foods", "Bajji, bhatura, parotta, pakkavada, butter, ghee and cheese."),
      food("protein", "Egg Yolk", "The source chart advises egg white instead of yolk."),
      food("processed", "Red Meat", "Beef, mutton and pork."),
      food("spices", "Spicy / Oily Curries", "Kadai dishes, butter masala, fried fish and Chicken 65."),
      food("processed", "Bakery Items", "Puffs, cakes and butter-based biscuits."),
      food("nuts", "Coconut-Heavy Foods", "Coconut-ground curries and excess coconut chutney."),
      food("sugar", "Sugary Foods", "Sweets and chocolates."),
      food("dairy", "Full-Fat Milk", "Use lower-fat options according to the source chart."),
    ],
  },
  gastricUlcer: {
    title: "Gastric Ulcer Diet Chart",
    icon: <GiStomach size={32} style={{ color: C.green }} />,
    desc: "Soft, non-spicy foods and restriction guidance from the supplied gastric-ulcer charts.",
    include: [
      food("wholeGrains", "Grains & Staples", "Rice, well-cooked oats, rice khichdi, idli, dosa and chapati."),
      food("greens", "Vegetables", "Bottle gourd, ash gourd, pumpkin, ridge gourd, snake gourd, chow chow and carrot."),
      food("fruits", "Non-Acidic Fruits", "Ripe banana, papaya, peeled or stewed apple and small pomegranate portions."),
      food("dairy", "Dairy", "Buttermilk and small quantities of warm milk."),
      food("protein", "Soft Proteins", "Moong dal, thin toor dal and paneer."),
      food("water", "Drinks", "Warm water, coconut water, jeera water, fennel water and vegetable soup."),
      food("nuts", "Minimal Healthy Fats", "Small amounts of ghee, coconut oil or gingelly oil; honey and rice porridge are also listed."),
    ],
    avoid: [
      food("spices", "Spicy Foods", "Chilli, pepper-heavy curries, masala and pickles."),
      food("fried", "Fried & Oily Foods", "Samosa, chips, pakoda, fries and fast food."),
      food("fruits", "Sour / Acidic Foods", "Excess lemon, tamarind, vinegar, raw mango and excess raw tomato."),
      food("caffeine", "Caffeinated Drinks", "Coffee, strong tea, cola and energy drinks."),
      food("alcohol", "Alcohol & Tobacco", "Alcohol, smoking and chewing tobacco."),
      food("processed", "Extreme Temperatures", "Very hot tea or soup, ice cream and iced drinks."),
      food("processed", "Processed / Junk Foods", "Instant noodles, packaged snacks, pastries and sausages."),
      food("greens", "Raw Gas-Forming Vegetables", "Raw onion, cabbage, radish and cauliflower."),
      food("dairy", "High-Fat Foods", "Chocolate, cheese, butter, excess ghee and red meat."),
    ],
  },
  ibs: {
    title: "Irritable Bowel Syndrome Diet Chart",
    icon: <GiStomach size={32} style={{ color: C.green }} />,
    desc: "Low-FODMAP include and high-FODMAP avoid lists from the supplied IBS charts.",
    include: [
      food("wholeGrains", "Low-FODMAP Grains", "White rice, brown rice, oats, ragi, jowar, bajra, quinoa and fermented idli or dosa."),
      food("greens", "Vegetables", "Carrot, cucumber, spinach, bottle gourd, ridge gourd, pumpkin, zucchini and small tomato portions."),
      food("fruits", "Fruits", "Ripe banana, papaya, orange, pineapple, strawberry and kiwi."),
      food("protein", "Proteins", "Eggs, boiled or grilled chicken, steamed or grilled fish and tofu."),
      food("nuts", "Nuts & Oils", "Plain peanuts, small coconut portions, rice-bran oil and coconut oil."),
      food("water", "Drinks", "Warm water, jeera water, ginger water and diluted buttermilk without onion or heavy spices."),
    ],
    avoid: [
      food("greens", "High-FODMAP Vegetables", "Onion, garlic, cabbage, excess cauliflower or broccoli, mushroom, green peas and sweet corn."),
      food("highFruits", "High-FODMAP Fruits", "Apple, watermelon, guava, pear, ripe mango and chikoo."),
      food("dairy", "Dairy Triggers", "Milk, ice cream, cream, processed cheese and milk-based sweets."),
      food("protein", "Pulses & Wheat Foods", "Rajma, channa, moong sprouts, wheat bread, maida noodles, pasta and bakery foods."),
      food("fried", "Other Triggers", "Fried foods, spicy or masala-heavy dishes, soft drinks and packaged juices."),
      food("caffeine", "Caffeine, Alcohol & Sweeteners", "Excess coffee, alcohol, artificial sweeteners and chewing gum."),
    ],
  },
  constipation: {
    title: "Constipation Diet Chart",
    icon: <GiStomach size={32} style={{ color: C.green }} />,
    desc: "Fruit, fibre, vegetable and hydration guidance from the supplied constipation charts.",
    include: [
      food("fruits", "High-Fibre Fruits", "Papaya, apple with skin and orange or mosambi; whole fruits rather than packet juice."),
      food("wholeGrains", "Whole Grains & Fibre Foods", "Oats, brown rice, wheat chapati, millet or ragi dosa and idli with sambar."),
      food("greens", "Vegetables", "Spinach or other greens, cabbage, ridge gourd and bottle gourd."),
      food("water", "Water & Natural Lubricants", "Two glasses of water in the morning, adequate fluids through the day and soaked seed-based options listed in the chart."),
    ],
    avoid: [
      food("processed", "Bakery Items", "Avoid daily bakery foods."),
      food("caffeine", "Excess Tea / Coffee", "Listed as a constipation-promoting habit."),
      food("fried", "Fried Snacks", "Avoid frequent fried snacks."),
      food("dairy", "Cheese", "The source chart lists cheese among foods to reduce."),
      food("processed", "Too Much Non-Vegetarian Food", "Avoid excessive non-vegetarian intake."),
      food("processed", "Packaged Foods", "Reduce packaged foods."),
    ],
  },
  piles: {
    title: "Piles Diet Chart",
    icon: <GiStomach size={32} style={{ color: C.green }} />,
    desc: "High-fibre, hydrating and light-food guidance from the supplied piles chart.",
    include: [
      food("fruits", "Fruits", "Papaya, pear, apple, banana, pomegranate, watermelon, muskmelon and coconut water."),
      food("greens", "Vegetables", "Pumpkin, bottle gourd, snake gourd, cucumber, beetroot, carrot, cabbage and spinach or greens."),
      food("wholeGrains", "Fibre Foods", "Oats, ragi, brown or red rice, whole-wheat chapati, flaxseed and soaked chia seeds."),
      food("protein", "Light Protein Foods", "Moong dal, toor dal, sambar, light curd and buttermilk with cumin."),
      food("nuts", "Healthy Fats", "Ghee 1–2 tsp, small coconut-oil portions and olive oil."),
      food("water", "Fluids", "Warm water, jeera water, lemon water, herbal teas and vegetable soups."),
      food("fruits", "Helpful Extras", "Aloe-vera pulp, soaked black raisins and fenugreek water."),
      food("greens", "Eating Pattern", "Light dinner, fruit twice daily and vegetables at every meal."),
    ],
    avoid: [
      food("spices", "Spicy or Pickled Fruits", "Avoid fruits prepared with chilli powder or as pickles."),
      food("fried", "Spicy / Oily Vegetables", "Avoid spicy curries and oily vegetable fries."),
      food("refCarbs", "Maida Foods", "Parotta, pizza and bakery foods."),
      food("processed", "Heavy Protein Foods", "Heavy non-vegetarian dishes, beef and mutton."),
      food("fried", "Vanaspati & Deep-Fried Oils", "Avoid vanaspati and deep-fried oils."),
      food("sugar", "Soft Drinks & Excess Coffee", "Soda, soft drinks, cold drinks and excess coffee."),
      food("junk", "Heavy Late-Night Meals", "Avoid heavy late-night meals and spicy fried snacks."),
    ],
  },
  ckd: {
    title: "Chronic Kidney Disease Diet Chart",
    icon: <GiKidneys size={32} style={{ color: C.green }} />,
    desc: "Controlled protein, sodium, potassium, fluids and phosphorus guidance from the supplied CKD charts.",
    include: [
      food("protein", "Controlled Protein", "Small moong-dal portions, limited milk and egg white as advised by the treating team."),
      food("greens", "Lower-Potassium Choices in Source", "Apple, cabbage, bottle gourd, ridge gourd, pumpkin and beans."),
      food("wholeGrains", "Cereals & Carbohydrates", "White rice, semolina, rice flakes, idli, dosa and upma."),
      food("dairy", "Controlled Dairy", "Small curd or a little milk."),
      food("processed", "Light Snacks", "Puffed rice and Marie biscuits are listed as snack options."),
      food("water", "Fluids", "About 1–1.5 L/day only when it matches urine output and clinician advice, as stated in the chart."),
    ],
    avoid: [
      food("processed", "High Sodium Foods", "Pickle, papad, chips, salted snacks and processed foods."),
      food("protein", "Excess Protein", "Red meat, excess chicken, large dal portions and protein powders."),
      food("highFruits", "Higher-Potassium Foods", "Banana, orange and chikoo."),
      food("greens", "Higher-Potassium Vegetables", "Potato, tomato and spinach."),
      food("water", "Coconut Water & Excess Fluids", "The source chart lists coconut water and excess fluid intake for restriction."),
      food("dairy", "High-Phosphorus Foods", "Cheese, paneer in excess, nuts, seeds and cola."),
      food("wholeGrains", "Excess Brown Rice / Millets", "The chart restricts excess brown rice and millet."),
      food("processed", "Chips & Bakery Snacks", "Chips, bakery foods and salted snacks."),
    ],
  },
  kidneyStone: {
    title: "Kidney Stone Diet Chart",
    icon: <GiKidneys size={32} style={{ color: C.green }} />,
    desc: "Low-oxalate foods and hydration options from the supplied kidney-stone charts.",
    include: [
      food("fruits", "Fruits", "Watermelon, muskmelon, papaya, apple, pear, banana and orange."),
      food("greens", "Low-Oxalate Vegetables", "Bottle gourd, ash gourd, snake gourd, pumpkin, cabbage, carrot in small amounts, drumstick, cucumber and banana stem."),
      food("wholeGrains", "Cereals & Staples", "White or boiled rice, idli, dosa, wheat chapati, thin oats, idiyappam and upma."),
      food("protein", "Pulses in Small Portions", "Moong dal, horse gram, green gram and limited brown channa."),
      food("water", "Fluids", "Lemon water, coconut water, barley water, jeera water, tender coconut and small buttermilk portions."),
    ],
    avoid: [
      food("greens", "High-Oxalate Vegetables", "Palak or spinach, beetroot, excess tomato, mushroom and cauliflower."),
      food("nuts", "High-Oxalate Nuts & Seeds", "Peanuts, cashews, excess almonds and sesame seeds."),
      food("protein", "High-Oxalate Pulses", "Rajma, black channa, soybeans and excess horse gram."),
      food("caffeine", "Tea, Coffee & Cola", "Excess tea, coffee, cola, soft drinks and energy drinks."),
      food("processed", "High-Salt Packaged Foods", "Pickles, papad, chips, bakery foods, chocolate and fast food."),
      food("processed", "Animal & Other Restrictions", "Red meat, organ meat, too much salt and very spicy foods."),
    ],
  },
  gout: {
    title: "Gout Diet Chart",
    icon: <FaBone size={32} style={{ color: C.green }} />,
    desc: "Low-purine, hydrating and anti-inflammatory foods from the supplied gout charts.",
    include: [
      food("wholeGrains", "Low-Purine Grains", "Red rice, brown rice, oats, ragi, wheat and other millets."),
      food("greens", "Low-Purine Vegetables", "Bottle gourd, ridge gourd, snake gourd, pumpkin, ash gourd and cucumber."),
      food("fruits", "Fruits", "Apple, papaya, guava, watermelon and orange."),
      food("dairy", "Low-Fat Dairy", "Low-fat milk, curd and buttermilk."),
      food("fruits", "Uric-Acid-Lowering Foods", "Amla, cherries, lemon water and buttermilk."),
      food("spices", "Anti-Inflammatory Foods", "Turmeric, garlic, flaxseed and walnuts."),
      food("greens", "Alkaline Foods", "Cucumber, ash gourd, pumpkin and watermelon."),
      food("water", "Hydrating Foods", "Tender coconut water, buttermilk, lemon water and coriander water."),
    ],
    avoid: [
      food("protein", "Very High-Purine Foods", "Red meat, organ meats, sardines and anchovies."),
      food("alcohol", "Alcohol", "Especially beer; listed as reducing uric-acid excretion."),
      food("sugar", "Sugary & High-Fructose Foods", "Sugary drinks and high-fructose foods."),
      food("protein", "Foods to Limit", "Small dal portions and occasional spinach, cauliflower and mushroom."),
    ],
  },
  rheumatoid: {
    title: "Rheumatoid Arthritis Diet Chart",
    icon: <FaBone size={32} style={{ color: C.green }} />,
    desc: "Fruit, vegetable, fibre, protein and anti-inflammatory guidance from the supplied rheumatoid-arthritis charts.",
    include: [
      food("fruits", "One Fruit Daily", "Guava, papaya, pomegranate, apple, orange or sweet lime."),
      food("greens", "One Vegetable Daily", "Spinach or other greens, drumstick leaves, broccoli or cauliflower, beetroot, bottle gourd or ash gourd."),
      food("wholeGrains", "Fibre-Rich Staples", "Ragi, kambu, thinai, brown or red rice, oats and whole-wheat chapati."),
      food("protein", "Pulses & Protein", "Green gram, chickpeas or channa and horse gram."),
      food("spices", "Anti-Inflammatory Foods", "Turmeric and ginger."),
      food("nuts", "Omega-3 Foods", "Flaxseed powder and walnuts."),
      food("dairy", "Probiotic Foods", "Curd and fermented idli or dosa batter."),
      food("nuts", "Healthy Fats", "Small amounts of oil and soaked chia seeds."),
      food("water", "Drink", "Warm turmeric water in the morning."),
    ],
    avoid: [
      food("highFruits", "Fruits to Limit", "Frequent mango and fruit juices."),
      food("greens", "Nightshade Foods During Flares", "Limit potato, tomato, brinjal and capsicum when symptoms worsen."),
      food("refCarbs", "Refined Carbohydrates", "Maida products, white bread, bakery foods and instant noodles."),
      food("alcohol", "Alcohol", "Avoid alcohol."),
      food("protein", "Pulses to Limit", "Rajma, black gram and large quantities of channa."),
      food("fried", "Inflammatory Fats", "Refined vegetable oils, vanaspati, hydrogenated fats and deep-fried foods."),
      food("sugar", "High-Sugar Foods", "Sweetened milk products and sugary soft drinks."),
      food("junk", "Fast Foods", "Avoid fast food."),
    ],
  },
  osteoarthritis: {
    title: "Osteoarthritis Diet Chart",
    icon: <FaBone size={32} style={{ color: C.green }} />,
    desc: "Anti-inflammatory, calcium and collagen-supporting foods from the supplied osteoarthritis charts.",
    include: [
      food("spices", "Anti-Inflammatory Foods", "Turmeric with black pepper, ginger, curry leaves and flaxseed."),
      food("wholeGrains", "Calcium-Rich Foods", "Ragi, sesame seeds, spinach or methi leaves, drumstick leaves, curd and paneer."),
      food("fruits", "Vitamin C Foods", "Amla, lemon, orange, mosambi and tomato."),
      food("nuts", "Omega-3 Foods", "Flaxseed, chia seeds, walnuts and almonds."),
      food("water", "Morning Drinks", "Turmeric water, lemon water, dry-ginger water and soaked fenugreek water."),
      food("protein", "Protein Foods", "Horse gram soup or sundal, green gram, groundnuts and dal varieties."),
      food("greens", "Vegetables", "Drumstick, beetroot, carrot, pumpkin, snake gourd and ridge gourd."),
    ],
    avoid: [
      food("refCarbs", "Refined Carbohydrates", "Maida foods, white bread and bakery foods."),
      food("sugar", "Sugar Foods", "Sweets, cakes and soft drinks."),
      food("fried", "Fried Foods", "Chips, pakoda and deep-fried snacks."),
      food("processed", "Processed Foods", "Instant noodles and packaged snacks."),
      food("greens", "Nightshade Vegetables When Sensitive", "Limit potato, tomato and brinjal when they aggravate joint pain."),
    ],
  },
  radiculopathy: {
    title: "Cervical / Lumbar Radiculopathy Diet Chart",
    icon: <FaBone size={32} style={{ color: C.green }} />,
    desc: "Anti-inflammatory, B-complex, mineral and calcium foods from the supplied radiculopathy charts.",
    include: [
      food("spices", "Anti-Inflammatory Foods", "Turmeric milk, ginger, garlic, flaxseed, walnuts and olive or gingelly oil."),
      food("wholeGrains", "Vitamin B-Complex Foods", "Whole wheat and millets."),
      food("fruits", "Banana", "One daily, listed for B vitamins and potassium."),
      food("nuts", "Groundnuts", "A small handful."),
      food("protein", "Eggs", "One daily when non-vegetarian, listed for vitamin B12."),
      food("nuts", "Muscle-Relaxing Minerals", "Pumpkin seeds, soaked almonds and spinach."),
      food("wholeGrains", "Calcium Support", "Sesame seeds and drumstick leaves."),
      food("spices", "Natural Drink", "Ginger-turmeric tea with pepper."),
    ],
    avoid: [
      food("sugar", "Refined Sugar", "Listed as increasing nerve inflammation."),
      food("refCarbs", "White Bread / Maida", "Listed as inflammatory."),
      food("fried", "Deep-Fried Foods", "Listed as aggravating nerve irritation."),
      food("caffeine", "Excess Coffee", "The source chart advises reducing excess coffee."),
    ],
  },
  cough: {
    title: "Cough Diet Chart",
    icon: <FaLungs size={32} style={{ color: C.green }} />,
    desc: "Warm fluids and food restrictions from the supplied cough charts.",
    include: [
      food("spices", "Ginger", "Fresh or dry ginger daily."),
      food("spices", "Garlic", "One clove daily."),
      food("spices", "Turmeric + Pepper", "Use daily as listed in the chart."),
      food("greens", "Drumstick / Moringa", "Two to three times weekly."),
      food("fruits", "Beetroot", "About half to one cup daily or on alternate days."),
      food("spices", "Tulsi Tea", "Tulsi leaves or tea."),
      food("fruits", "Apple", "Two to three times weekly."),
      food("greens", "Cabbage & Carrot", "Two to three times weekly."),
      food("water", "Warm Water", "Sip through the day."),
    ],
    avoid: [
      food("dairy", "Curd at Night", "Listed as causing throat congestion or phlegm."),
      food("highFruits", "Sapota / Chikoo", "Listed as thickening mucus."),
      food("water", "Ice Cream & Cold Drinks", "Avoid cold beverages and ice cream."),
      food("processed", "Bread, Bakery & Pastries", "Listed as airway irritants."),
      food("refCarbs", "Maida Foods", "Parotta, pizza and buns."),
      food("fried", "Deep-Fried Foods", "Avoid deep-fried items."),
      food("sugar", "Excess Sugar", "Listed as reducing immunity."),
      food("spices", "Very Spicy Foods", "Listed as irritating bronchial tubes."),
      food("nuts", "Peanuts When Sensitive", "Listed as a common allergen and cough trigger."),
      food("water", "Cold Foods & Water", "Avoid when they trigger bronchospasm or cough."),
    ],
  },
  urticaria: {
    title: "Urticaria Diet Chart",
    icon: <FaAllergies size={32} style={{ color: C.green }} />,
    desc: "Safe-food and high-histamine restriction lists from the supplied urticaria charts.",
    include: [
      food("fruits", "Fruits", "Apple, pear, papaya, watermelon, muskmelon, pomegranate and coconut water."),
      food("greens", "Vegetables", "Cucumber, carrot, beetroot, snake gourd, bottle gourd, ash gourd, beans, pumpkin, broccoli, lettuce and cabbage."),
      food("wholeGrains", "Cereals & Grains", "Rice, red rice, oats and millets such as varagu, thinai and kambu when they do not cause bloating."),
      food("protein", "Proteins", "Moong dal, masoor dal, green gram, small white-channa portions and homemade curd if tolerated."),
      food("nuts", "Healthy Fats", "Ghee, coconut oil and olive oil."),
      food("water", "Drinks", "Jeera water, mild turmeric milk, mild ginger tea, warm water and small amla-juice portions."),
    ],
    avoid: [
      food("highFruits", "High-Histamine / Trigger Fruits", "Lime, lemon, orange, pineapple, grapes, banana, strawberry, avocado and dry fruits when itching increases."),
      food("greens", "Trigger Vegetables", "Tomato, brinjal, spinach, capsicum, mushroom and fermented vegetables."),
      food("protein", "Animal Foods", "Egg, fish, prawns, shellfish, processed meat and tinned fish."),
      food("dairy", "Dairy Triggers", "Cheese, paneer in some people and flavoured milk."),
      food("caffeine", "Drinks & Snacks", "More than one tea or coffee, soda, energy drinks, strong black tea, bakery foods, chocolate and ice cream."),
      food("nuts", "Nuts When Itching Increases", "Peanuts, cashews and almonds when they trigger itching."),
      food("processed", "Packaged & Fermented Foods", "Papad, pickle, vinegar, sauces, chips, instant noodles and yeast bread."),
    ],
  },
  ichthyosis: {
    title: "Ichthyosis Diet Chart",
    icon: <Shield size={32} style={{ color: C.green }} />,
    desc: "Daily nutrient groups listed in the supplied ichthyosis chart.",
    include: [
      food("nuts", "Essential Fatty Acids", "Flaxseed powder, walnuts and almonds."),
      food("greens", "Vitamin A Foods", "Carrot, pumpkin, spinach and papaya."),
      food("nuts", "Vitamin E Foods", "Sunflower seeds and related seed foods listed in the chart."),
      food("nuts", "Zinc Foods", "Pumpkin seeds, peanuts and whole grains."),
      food("protein", "Protein", "Dal, paneer, tofu, sprouts and egg or fish."),
      food("water", "Hydration Foods", "Water-rich foods such as cucumber and orange."),
    ],
    avoid: [
      food("fried", "Fried Foods", "Can worsen skin inflammation."),
      food("processed", "Processed Foods", "Low in the essential fatty acids the skin needs."),
      food("sugar", "Excess Sugar", "Linked with increased skin inflammation."),
    ],
  },
  mindCalm: {
    title: "Mind Calm Diet Chart",
    icon: <FaBrain size={32} style={{ color: C.green }} />,
    desc: "Calming foods, regular quantities and avoid guidance from the supplied mind-calm charts.",
    include: [
      food("dairy", "GABA-Calming Foods", "Warm cow milk 200 ml at night, a pinch of nutmeg and four cashews."),
      food("fruits", "Serotonin Stabilisers", "One small banana in the evening, oats 40 g in the morning and two dates."),
      food("nuts", "Magnesium-Rich Foods", "Five soaked almonds, one cup cooked spinach and 1 tbsp pumpkin seeds."),
      food("fruits", "Adaptogenic Foods", "One amla, one cup ash gourd and 200 ml buttermilk."),
      food("nuts", "Brain Nourishment", "1 tsp cow ghee and about 30 g fresh coconut."),
      food("wholeGrains", "Blood-Sugar Stability", "One serving of ragi in any form."),
      food("water", "Hydration", "Warm water sipped through the day."),
    ],
    avoid: [
      food("caffeine", "Neuro-Irritants", "Coffee or tea after 4 PM and alcohol."),
      food("sugar", "Dopamine Disruptors", "Excess sugar."),
      food("fried", "Inflammatory Foods", "Fried and junk foods."),
      food("junk", "Sleep Disruptors", "Late-night eating."),
    ],
  },
  sleep: {
    title: "Sleep-Inducing Diet Chart",
    icon: <Moon size={32} style={{ color: C.green }} />,
    desc: "Melatonin, tryptophan and magnesium foods with timing from the supplied sleep charts.",
    include: [
      food("fruits", "Melatonin-Boosting Fruits", "½ cup tart cherries or 100 ml juice 1–2 hours before sleep, two kiwis one hour before sleep and one small banana in the evening."),
      food("nuts", "Evening Nuts", "Five to six soaked almonds in the evening."),
      food("dairy", "Warm Milk", "One cup (200 ml), 30–45 minutes before sleep."),
      food("nuts", "Tryptophan Seeds", "1 tbsp pumpkin seeds in the evening and 1 tbsp sesame seeds with dinner."),
      food("wholeGrains", "Oats", "½ cup cooked oats with dinner."),
      food("nuts", "Magnesium-Rich Foods", "Almonds, avocado, spinach and seed foods listed in the chart."),
      food("spices", "Calming Drinks", "Chamomile tea, turmeric milk, ashwagandha milk and nutmeg milk."),
      food("dairy", "Bedtime Drink Combination", "Warm milk 200 ml with a pinch of nutmeg, ¼ tsp turmeric and 1 tsp pumpkin seeds."),
    ],
    avoid: [
      food("caffeine", "Caffeine After 4 PM", "Coffee or tea after 4 PM."),
      food("sugar", "Excess Sugar", "Listed as causing a night cortisol spike."),
      food("fried", "Heavy Fried Food", "Listed as delaying gastric emptying."),
      food("spices", "Excess Spicy Food", "Listed as causing gastric reflux."),
    ],
  },
  vertigo: {
    title: "Vertigo Diet Chart",
    icon: <FaBrain size={32} style={{ color: C.green }} />,
    desc: "Hydration, mineral, iron, B12 and calming foods from the supplied vertigo chart.",
    include: [
      food("water", "Hydration Foods", "Tender coconut, cucumber, watermelon and buttermilk."),
      food("nuts", "Magnesium-Rich Foods", "Pumpkin seeds, almonds, banana, greens and ragi."),
      food("protein", "Iron / B12 Foods", "Dates, beetroot, egg, fish and greens."),
      food("dairy", "Anti-Anxiety Foods", "Banana, warm milk at night, nuts and oats."),
    ],
    avoid: [
      food("caffeine", "Excess Caffeine", "Can worsen dizziness and inner-ear symptoms."),
      food("sugar", "Excess Sugar", "Blood sugar swings can trigger vertigo episodes."),
      food("processed", "High-Sodium Foods", "Excess salt affects inner-ear fluid balance (linked to Meniere's-type vertigo)."),
    ],
  },
};

// ── Bottom feature bar data ───────────────────────────────────
const FEATURES = [
  {
    icon: <Users size={20} color="#fff" />,
    bg: C.green,
    title: "Personalized Guidance",
    sub: "Diet advice tailored to your condition and body type.",
  },
  {
    icon: <Leaf size={20} color="#fff" />,
    bg: C.blue,
    title: "Holistic Approach",
    sub: "We treat the root cause, not just the symptoms.",
  },
  {
    icon: <Heart size={20} color="#fff" />,
    bg: "#178a8a",
    title: "Natural Healing",
    sub: "Food and lifestyle changes that support long-term wellness.",
  },
  {
    icon: <FaUserMd size={18} color="#fff" />,
    bg: C.blueDark,
    title: "Expert Support",
    sub: "Guidance from experienced homeopathic doctors.",
  },
];

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function DietPlan() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [selected, setSelected] = useState("pcos");
  const [search, setSearch] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("dp-visible");
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".dp-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selected]);

  const filtered = CONDITIONS.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase()),
  );

  const diet = DIET_DATA[selected] || DIET_DATA["pcos"];

  // ── Handles selecting a condition (from sidebar OR mobile dropdown)
  // and scrolls the diet-title/content block into view.
  const handleSelectCondition = (id) => {
    setSelected(id);
    setSearch("");
    requestAnimationFrame(() => {
      const el = document.getElementById("dp-diet-top");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  const iconCircle = (bg, size = "44px") => ({
    width: size,
    height: size,
    borderRadius: "50%",
    background: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  });

  return (
    <div
      className="dp-page"
      style={{
        fontFamily: "'Poppins', sans-serif",
        color: "#233143",
        overflowX: "hidden",
      }}
    >
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="dp-hero"
        style={{
          background: `linear-gradient(
            135deg,
            #f8faf8 0%,
            #f2f8f3 25%,
            #e9f5ec 65%,
            #dff1e5 100%
          )`,
          position: "relative",
          overflow: "hidden",
          minHeight: 480,
        }}
      >
        {/* Decorative leaf — bottom left */}
        <FaLeaf
          style={{
            position: "absolute",
            bottom: 20,
            left: 30,
            fontSize: 70,
            opacity: 0.13,
            color: C.green,
            transform: "rotate(-25deg)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {/* Decorative leaf — top right */}
        <FaLeaf
          className="d-none d-lg-block"
          style={{
            position: "absolute",
            top: 20,
            right: 60,
            fontSize: 110,
            opacity: 0.09,
            color: C.green,
            transform: "rotate(15deg)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div className="container-fluid px-0" style={{ maxWidth: "100%" }}>
          <div className="row g-0 dp-hero-row" style={{ minHeight: 480 }}>
            {/* ── LEFT — Text ── */}
            <div
              className="col-lg-6 col-md-12 d-flex align-items-center dp-reveal dp-hero-content"
              style={{
                padding: "80px 48px 60px 10%",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div className="dp-hero-inner">
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: C.green,
                    marginBottom: 14,
                  }}
                >
                  Nutrition & Diet
                </span>

                <h1
                  style={{
                    fontSize: "clamp(32px, 4vw, 50px)",
                    fontWeight: 800,
                    color: C.blueDark,
                    lineHeight: 1.15,
                    margin: "0 0 18px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Eat Right for
                  <br />
                  <span style={{ color: C.green }}>Every Condition</span>
                </h1>

                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    color: C.muted,
                    maxWidth: 440,
                    margin: "0 0 28px",
                  }}
                >
                  Personalized diet charts curated by our homeopathic doctors to
                  support your treatment, restore balance, and help you heal
                  naturally from within.
                </p>

                <div className="dp-hero-actions" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <button
                    className="dp-hero-btn"
                    onClick={() =>
                      document
                        .getElementById("dp-chart-section")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: C.green,
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      padding: "12px 24px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      cursor: "pointer",
                      boxShadow: "0 4px 16px rgba(75,168,106,0.3)",
                    }}
                  >
                    <Utensils size={16} /> Explore Diet Charts
                  </button>
                  <button
                    className="dp-hero-btn"
                    onClick={() => setPopupOpen(true)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "transparent",
                      color: C.blueDark,
                      border: `1.5px solid ${C.border}`,
                      borderRadius: 10,
                      padding: "11px 22px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    <Calendar size={16} /> Book Consultation
                  </button>
                </div>

                <div
                  className="dp-topic-badge"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 22,
                    background: C.lightGreen,
                    border: `1px solid #b6dfca`,
                    borderRadius: 8,
                    padding: "8px 14px",
                  }}
                >
                  <Leaf size={14} style={{ color: C.green }} />
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: C.greenDark,
                      fontWeight: 600,
                    }}
                  >
                    {CONDITIONS.length} Diet Topics Available
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT — Full-bleed banner image with fade overlays ── */}
            <div
              className="col-lg-6 col-md-12 d-none d-lg-block dp-reveal"
              style={{
                position: "relative",
                minHeight: 480,
                overflow: "hidden",
              }}
            >
              <img
                src={dietBannerImg}
                alt="Healthy diet plan — fresh vegetables, fruits and nutrition journal"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center center",
                  display: "block",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  pointerEvents: "none",
                  background: `linear-gradient(
                  to right,
                  #e9f5ec 0%,
                  rgba(233,245,236,.98) 10%,
                  rgba(233,245,236,.82) 26%,
                  rgba(233,245,236,.38) 46%,
                  transparent 70%
                )`,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  pointerEvents: "none",
                  background: `linear-gradient(
                  to bottom,
                  rgba(248,250,248,0.92) 0%,
                  rgba(242,248,243,0.70) 14%,
                  rgba(233,245,236,0.30) 32%,
                  transparent 58%
                )`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — SIDEBAR + DIET CONTENT
      ═══════════════════════════════════════════════════ */}
      <section
        id="dp-chart-section"
        className="py-5 dp-chart-section"
        style={{ background: "#fff" }}
      >
        <div className="container">
          <div className="row g-4 align-items-start">
            {/* ── Mobile / Tablet Dropdown (below lg) ── */}
            <div className="col-12 d-lg-none dp-reveal dp-mobile-selector">
              <div
                className="rounded-4 p-3"
                style={{
                  background: "#fff",
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 4px 24px rgba(15,61,110,0.07)",
                }}
              >
                <h6 className="fw-bold mb-3" style={{ color: C.blueDark }}>
                  Choose a Condition
                </h6>
                <select
                  className="form-select"
                  value={selected}
                  onChange={(e) => handleSelectCondition(e.target.value)}
                  style={{
                    border: `1px solid ${C.border}`,
                    borderRadius: "10px",
                    padding: "10px 14px",
                    fontSize: "0.88rem",
                    color: C.blueDark,
                    fontWeight: 600,
                    maxHeight:"auto",
                    outline: "none",
                  }}
                >
                  {CONDITIONS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── Sidebar (lg and up only) ── */}
            <div className="col-lg-3 d-none d-lg-block dp-reveal">
              <div
                className="rounded-4 p-3 sticky-top"
                style={{
                  background: "#fff",
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 4px 24px rgba(15,61,110,0.07)",
                  top: "90px",
                }}
              >
                <h6 className="fw-bold mb-3" style={{ color: C.blueDark }}>
                  Choose a Condition
                </h6>

                <div className="position-relative mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search condition..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      border: `1px solid ${C.border}`,
                      borderRadius: "10px",
                      padding: "10px 40px 10px 14px",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                  <Search
                    size={15}
                    style={{
                      position: "absolute",
                      right: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: C.muted,
                    }}
                  />
                </div>

                <div
                  // className="diet-sidebar-scroll"
                  style={{
                    // maxHeight: "520px",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    paddingRight: "6px",
                    scrollbarGutter: "stable",
                  }}
                >
                  {filtered.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCondition(c.id)}
                      className="d-flex align-items-center justify-content-between w-100 border-0 text-start mb-1"
                      style={{
                        background:
                          selected === c.id ? C.lightGreen : "transparent",
                        color: selected === c.id ? C.greenDark : C.muted,
                        fontWeight: selected === c.id ? 600 : 400,
                        borderRadius: "8px",
                        padding: "9px 10px",
                        fontSize: "0.84rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <span className="d-flex align-items-center gap-2">
                        {c.icon} {c.label}
                      </span>
                      <ChevronRight size={14} />
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <p
                      style={{ color: C.muted, fontSize: "0.82rem" }}
                      className="text-center py-2"
                    >
                      No condition found
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Diet Content ── */}
            <div className="col-lg-9 dp-content-col">
              <div
                id="dp-diet-top"
                className="d-flex align-items-start gap-3 mb-4 dp-reveal dp-diet-header"
                style={{ scrollMarginTop: "90px" }}
              >
                <div style={iconCircle(C.lightGreen, "56px")}>{diet.icon}</div>
                <div>
                  <h3
                    className="fw-bold mb-1"
                    style={{
                      color: C.blueDark,
                      fontSize: "clamp(20px,2.5vw,28px)",
                    }}
                  >
                    {diet.title}
                  </h3>
                  <p
                    className="mb-0"
                    style={{
                      color: C.muted,
                      fontSize: "0.93rem",
                      maxWidth: "680px",
                    }}
                  >
                    {diet.desc}
                  </p>
                  {diet.sourceNote && (
                    <p
                      className="mb-0 mt-2"
                      style={{
                        color: "#8a6d1d",
                        fontSize: "0.8rem",
                        lineHeight: 1.55,
                        maxWidth: "680px",
                      }}
                    >
                      <strong>Source note:</strong> {diet.sourceNote}
                    </p>
                  )}
                </div>
              </div>

              <div className="row g-3">
                {/* What to Include */}
                <div className="col-lg-6 dp-reveal dp-food-col dp-include-col">
                  <div
                    className="rounded-4 h-100 dp-food-card"
                    style={{
                      border: `1.5px solid ${C.border}`,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="d-flex align-items-center gap-2 p-3"
                      style={{
                        background: C.lightGreen,
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      <CheckCircle size={20} style={{ color: C.green }} />
                      <span
                        className="fw-bold"
                        style={{ color: C.greenDark, fontSize: "1rem" }}
                      >
                        What to Include
                      </span>
                    </div>
                    <div className="p-3">
                      {diet.include.length === 0 && (
                        <div
                          className="rounded-3 p-3 text-center"
                          style={{
                            background: C.bgSoft,
                            color: C.muted,
                            fontSize: "0.82rem",
                          }}
                        >
                          No include-list content is available in the supplied source.
                        </div>
                      )}
                      {diet.include.map((item, i) => (
                        <div
                          key={`${item.name}-${i}`}
                          className="d-flex align-items-start gap-3 mb-3 dp-food-item"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            loading="lazy"
                            style={{
                              width: 56,
                              height: 56,
                              borderRadius: "12px",
                              objectFit: "cover",
                              flexShrink: 0,
                            }}
                          />
                          <div>
                            <div
                              className="fw-semibold"
                              style={{ color: C.green, fontSize: "0.9rem" }}
                            >
                              {item.name}
                            </div>
                            <div
                              style={{
                                color: C.muted,
                                fontSize: "0.8rem",
                                lineHeight: 1.5,
                              }}
                            >
                              {item.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* What to Avoid */}
                <div className="col-lg-6 dp-reveal dp-food-col dp-avoid-col">
                  <div
                    className="rounded-4 h-100 dp-food-card"
                    style={{
                      border: `1.5px solid ${C.border}`,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="d-flex align-items-center gap-2 p-3"
                      style={{
                        background: C.lightRed,
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      <XCircle size={20} style={{ color: C.red }} />
                      <span
                        className="fw-bold"
                        style={{ color: C.red, fontSize: "1rem" }}
                      >
                        What to Avoid
                      </span>
                    </div>
                    <div className="p-3">
                      {diet.avoid.length === 0 && (
                        <div
                          className="rounded-3 p-3 text-center"
                          style={{
                            background: C.bgSoft,
                            color: C.muted,
                            fontSize: "0.82rem",
                          }}
                        >
                          No separate avoid list was provided in the supplied source chart.
                        </div>
                      )}
                      {diet.avoid.map((item, i) => (
                        <div
                          key={`${item.name}-${i}`}
                          className="d-flex align-items-start gap-3 mb-3 dp-food-item"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            loading="lazy"
                            style={{
                              width: 56,
                              height: 56,
                              borderRadius: "12px",
                              objectFit: "cover",
                              flexShrink: 0,
                            }}
                          />
                          <div>
                            <div
                              className="fw-semibold"
                              style={{ color: C.red, fontSize: "0.9rem" }}
                            >
                              {item.name}
                            </div>
                            <div
                              style={{
                                color: C.muted,
                                fontSize: "0.8rem",
                                lineHeight: 1.5,
                              }}
                            >
                              {item.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="d-flex align-items-start gap-3 rounded-3 mt-4 p-3 dp-reveal dp-note"
                style={{
                  background: C.lightGreen,
                  border: `1px solid #b6dfca`,
                }}
              >
                <Leaf
                  size={18}
                  style={{ color: C.green, flexShrink: 0, marginTop: 2 }}
                />
                <p
                  className="mb-0"
                  style={{
                    color: C.greenDark,
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  <strong>Note:</strong> This page reproduces the supplied clinic diet-chart content in a static format. Diet needs can vary by diagnosis, medicines, age and laboratory results. Please consult a qualified doctor or dietitian before following a condition-specific plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — BOTTOM FEATURE BAR (4 icons)
      ═══════════════════════════════════════════════════ */}
      <section
        className="py-5 dp-features-section"
        style={{ background: "#fff", borderTop: `1px solid ${C.border}` }}
      >
        <div className="container">
          <div className="row g-4 text-center text-md-start dp-features-row">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="col-md-3 col-6 d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3 dp-reveal dp-feature-item"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div style={iconCircle(f.bg, "48px")}>{f.icon}</div>
                <div>
                  <div
                    className="fw-bold"
                    style={{ color: C.blueDark, fontSize: "0.88rem" }}
                  >
                    {f.title}
                  </div>
                  <p
                    className="mb-0"
                    style={{
                      color: C.muted,
                      fontSize: "0.78rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {f.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppointmentPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
      />
      <Footer />

      <style>{`
        .dp-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .dp-reveal.dp-visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 991.98px) {
          .dp-hero, .dp-hero-row { min-height: auto !important; }
          .dp-hero-content { justify-content: center; }
          .dp-hero-inner { width: 100%; max-width: 680px; }
          .dp-chart-section, .dp-features-section {
            padding-top: 42px !important;
            padding-bottom: 42px !important;
          }
          .sticky-top { position: relative !important; top: 0 !important; }
        }

        @media (max-width: 767.98px) {
          .dp-page .container { padding-left: 16px; padding-right: 16px; }

          .dp-hero, .dp-hero-row { min-height: auto !important; }
          .dp-hero-content {
            padding: 32px 18px 38px !important;
            justify-content: flex-start;
          }
          .dp-hero-inner > span { margin-bottom: 10px !important; font-size: 0.66rem !important; }
          .dp-hero-inner h1 {
            font-size: 30px !important;
            line-height: 1.14 !important;
            margin-bottom: 14px !important;
          }
          .dp-hero-inner > p {
            max-width: 100% !important;
            margin-bottom: 20px !important;
            font-size: 0.85rem !important;
            line-height: 1.65 !important;
          }
          .dp-hero-actions {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px !important;
            width: 100%;
          }
          .dp-hero-btn {
            width: 100%;
            min-width: 0;
            min-height: 40px;
            justify-content: center;
            padding: 9px 7px !important;
            font-size: 0.67rem !important;
            line-height: 1.2;
            text-align: center;
          }
          .dp-hero-btn svg { flex-shrink: 0; width: 15px; height: 15px; }
          .dp-topic-badge {
            margin-top: 16px !important;
            padding: 7px 11px !important;
          }
          .dp-topic-badge span { font-size: 0.7rem !important; }

          .dp-chart-section, .dp-features-section {
            padding-top: 34px !important;
            padding-bottom: 34px !important;
          }
          .dp-mobile-selector > div {
            padding: 14px !important;
            border-radius: 14px !important;
          }
          .dp-mobile-selector h6 { margin-bottom: 10px !important; font-size: 0.88rem !important; }
          .dp-mobile-selector .form-select {
            padding: 9px 11px !important;
            font-size: 0.8rem !important;
          }

          .dp-content-col { margin-top: 2px; }
          .dp-diet-header {
            gap: 10px !important;
            margin-bottom: 16px !important;
          }
          .dp-diet-header > div:first-child {
            width: 44px !important;
            height: 44px !important;
            min-width: 44px;
          }
          .dp-diet-header > div:first-child svg { width: 22px; height: 22px; }
          .dp-diet-header h3 { font-size: 20px !important; line-height: 1.3; }
          .dp-diet-header p { font-size: 0.8rem !important; line-height: 1.55 !important; }
          .dp-diet-header p.mt-2 { font-size: 0.72rem !important; }

          .dp-food-card { border-radius: 14px !important; }
          .dp-food-card > div:first-child { padding: 12px !important; }
          .dp-food-card > div:first-child span { font-size: 0.9rem !important; }
          .dp-food-card > .p-3 { padding: 13px !important; }

          .dp-food-item {
            gap: 10px !important;
            margin-bottom: 12px !important;
          }
          .dp-food-item img {
            width: 48px !important;
            height: 48px !important;
            border-radius: 10px !important;
          }
          .dp-food-item .fw-semibold { font-size: 0.8rem !important; line-height: 1.35; }
          .dp-food-item .fw-semibold + div {
            font-size: 0.72rem !important;
            line-height: 1.45 !important;
          }

          .dp-note {
            gap: 9px !important;
            margin-top: 16px !important;
            padding: 12px !important;
          }
          .dp-note p { font-size: 0.7rem !important; line-height: 1.5 !important; }

          .dp-features-row {
            --bs-gutter-x: 10px;
            --bs-gutter-y: 16px;
          }
          .dp-feature-item {
            text-align: left !important;
            align-items: flex-start !important;
            flex-direction: row !important;
            gap: 9px !important;
          }
          .dp-feature-item > div:first-child {
            width: 38px !important;
            height: 38px !important;
            min-width: 38px;
          }
          .dp-feature-item .fw-bold { font-size: 0.75rem !important; line-height: 1.35; }
          .dp-feature-item p { font-size: 0.66rem !important; line-height: 1.4 !important; }
        }

        @media (max-width: 389.98px) {
          .dp-page .container { padding-left: 13px; padding-right: 13px; }
          .dp-hero-content { padding: 28px 14px 32px !important; }
          .dp-hero-inner h1 { font-size: 27px !important; }
          .dp-hero-btn { font-size: 0.61rem !important; padding-left: 5px !important; padding-right: 5px !important; }
          .dp-food-item img { width: 44px !important; height: 44px !important; }
          .dp-feature-item { width: 100%; }
        }
      `}</style>
    </div>
  );
}