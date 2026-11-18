import type { NewsArticle, NewsResponse, Trend } from "@/lib/news/types";

export const articles: NewsArticle[] = [
  // --- INDIA & INFRA ---
  {
    id: "vande-bharat-sleeper-trial-180kmh",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "India & Infra",
    isBreaking: true,
    trendQuery: "Vande Bharat Sleeper Route & Ticket Price",
    trendSpike: "+840%",
    publishedAt: "14 min ago",
    readTime: "4 min read",
    title: "Vande Bharat Sleeper Hits 180 km/h in Final CRS Trial: First Routes and Expected Fares",
    subtitle: "Indian Railways completes high-speed trials as overnight service prepares to challenge domestic flights on major corridors.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Siddharth Verma",
      role: "Senior Infrastructure Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "180 km/h", label: "peak test speed" },
    aiSummary: [
      "The 16-coach sleeper set completed its high-speed stability run under railway safety supervision.",
      "Delhi–Srinagar and Delhi–Mumbai are among the first corridors being prepared for service.",
      "Commercial speeds are expected to remain below the test maximum as routes are certified.",
    ],
    sixtyWordSummary: "Indian Railways has completed a 180 km/h trial of its new 16-coach Vande Bharat Sleeper train. Designed for overnight journeys, the set adds modern berths and upgraded onboard systems to the existing semi-high-speed fleet. Delhi–Srinagar and Delhi–Mumbai are among the corridors being considered for early service, with final launch dates and fare bands still subject to official confirmation.",
    bodyParagraphs: [
      "The prototype sleeper formation has completed a high-speed instrumentation run, marking a major step toward overnight services on India's busiest long-distance corridors. The trial assessed ride comfort, braking response and stability at speed.",
      "Railway officials are expected to finalize routes and operational details after the remaining safety checks. The trial speed is not the same as the eventual commercial speed, which will depend on track readiness and certification.",
      "For passengers, the promise is a more comfortable overnight alternative on routes where air travel often means an airport transfer and an extra hotel night. Fare details have not yet been formally announced.",
    ],
    sections: [
      {
        paragraphs: [
          "The prototype sleeper formation has completed a high-speed instrumentation run, marking a major step toward overnight services on India's busiest long-distance corridors. The trial assessed ride comfort, braking response and stability at speed.",
          "Railway officials are expected to finalize routes and operational details after the remaining safety checks. The trial speed is not the same as the eventual commercial speed, which will depend on track readiness and certification.",
          "For passengers, the promise is a more comfortable overnight alternative on routes where air travel often means an airport transfer and an extra hotel night. Fare details have not yet been formally announced.",
        ],
        quiz: {
          question: "What did the Vande Bharat Sleeper trial assess?",
          options: [
            "Ticket sales and catering",
            "Airport check-in times",
            "Ride comfort, braking response, and stability",
            "Passenger luggage limits",
          ],
        },
      },
    ],
  },
  {
    id: "mumbai-trans-harbour-link-atal-setu-traffic-data",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "India & Infra",
    isBreaking: false,
    trendQuery: "Atal Setu Traffic and Navi Mumbai Airport Road",
    trendSpike: "+510%",
    publishedAt: "3 hours ago",
    readTime: "4 min read",
    title: "Atal Setu Crosses 5 Million Vehicles as Key Connector Links Mumbai to Navi Mumbai Airport",
    subtitle: "India's longest sea bridge reaches a landmark milestone while reducing travel times between south Mumbai and the mainland.",
    image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Siddharth Verma",
      role: "Senior Infrastructure Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "21.8 km", label: "total sea bridge length" },
    aiSummary: [
      "The Mumbai Trans Harbour Link has served over five million commuters since commissioning.",
      "Travel times between Sewri and Chirle have dropped from two hours to under twenty minutes.",
      "Feeder arterial links connecting directly to the upcoming Navi Mumbai airport are nearing completion.",
    ],
    sixtyWordSummary: "The Mumbai Trans Harbour Link (Atal Setu) has reached a traffic volume of five million vehicles. Spanning 21.8 kilometres across Thane Creek, the engineering landmark has dramatically streamlined cross-harbour connectivity, cutting journey durations down to twenty minutes. Ongoing expansion of surrounding access roads will further integrate the bridge with the Navi Mumbai International Airport corridor.",
    bodyParagraphs: [
      "Traffic monitoring data reveals that commercial and private vehicular traffic on the Atal Setu has exceeded five million crossings. The 21.8-kilometre bridge, which is the longest sea crossing in the country, has alleviated longstanding bottlenecks across Mumbai's eastern periphery.",
      "Engineers utilized orthotropic steel decks and advanced noise barriers to protect migratory flamingo habitats in Sewri mudflats while maximizing structural endurance against maritime salinity.",
      "The state development authority is now prioritizing cloverleaf connectors and expressway ramps that will directly funnel traffic toward the forthcoming Navi Mumbai International Airport and the Pune Expressway.",
    ],
    sections: [
      {
        paragraphs: [
          "Traffic monitoring data reveals that commercial and private vehicular traffic on the Atal Setu has exceeded five million crossings. The 21.8-kilometre bridge, which is the longest sea crossing in the country, has alleviated longstanding bottlenecks across Mumbai's eastern periphery.",
          "Engineers utilized orthotropic steel decks and advanced noise barriers to protect migratory flamingo habitats in Sewri mudflats while maximizing structural endurance against maritime salinity.",
          "The state development authority is now prioritizing cloverleaf connectors and expressway ramps that will directly funnel traffic toward the forthcoming Navi Mumbai International Airport and the Pune Expressway.",
        ],
        quiz: {
          question: "What is the total length of the Atal Setu sea bridge?",
          options: ["10.5 km", "21.8 km", "35.2 km", "42.0 km"],
        },
      },
    ],
  },
  {
    id: "dedicated-freight-corridor-western-railway-industrial-logistics",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "India & Infra",
    isBreaking: false,
    trendQuery: "Dedicated Freight Corridor Freight Speeds",
    trendSpike: "+380%",
    publishedAt: "5 hours ago",
    readTime: "3 min read",
    title: "Dedicated Freight Corridors Cut Transit Times for Container Logistics Between Ports and Hinterland",
    subtitle: "Heavy-haul electric freight trains achieve average speeds above 60 km/h, shifting cargo from roadways to high-capacity rail lines.",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Siddharth Verma",
      role: "Senior Infrastructure Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "65 km/h", label: "average freight operating speed" },
    aiSummary: [
      "Long-haul freight trains are moving double-stack container rakes across dedicated corridors.",
      "Ports in Gujarat and Maharashtra are seeing port turnaround delays reduced by over 30%.",
      "Decarbonization efforts benefit from 100% electrified heavy-duty rail haulage.",
    ],
    sixtyWordSummary: "Dedicated Freight Corridors (DFCs) are fundamentally restructuring India's supply chains. Moving heavy-haul double-stack container rakes at average speeds exceeding 60 km/h, the specialized rail networks have sharply reduced cargo transit times between industrial inland container depots and major western ports, saving operational costs for domestic exporters.",
    bodyParagraphs: [
      "Operating speeds on conventional Indian railway tracks typically averaged 25 km/h due to mixed traffic with passenger express trains. The commissioning of dedicated freight tracks has tripled operational velocities for industrial freight.",
      "Automated signaling and specialized overhead electrification allow long-distance container rakes to transport double the cargo volume per trip, significantly lowering carbon emissions per ton-kilometre.",
      "Industrial manufacturing hubs in Haryana, Rajasthan, and Gujarat report predictable delivery windows to Mundra and Pipavav ports, fostering export competitiveness.",
    ],
    sections: [
      {
        paragraphs: [
          "Operating speeds on conventional Indian railway tracks typically averaged 25 km/h due to mixed traffic with passenger express trains. The commissioning of dedicated freight tracks has tripled operational velocities for industrial freight.",
          "Automated signaling and specialized overhead electrification allow long-distance container rakes to transport double the cargo volume per trip, significantly lowering carbon emissions per ton-kilometre.",
          "Industrial manufacturing hubs in Haryana, Rajasthan, and Gujarat report predictable delivery windows to Mundra and Pipavav ports, fostering export competitiveness.",
        ],
        quiz: {
          question: "How have dedicated freight corridors improved container cargo transit?",
          options: [
            "By shutting down maritime ports",
            "By tripling freight speeds on segregated tracks",
            "By mandating air transport",
            "By decreasing train lengths",
          ],
        },
      },
    ],
  },

  // --- TECH & AI ---
  {
    id: "india-ai-compute-subsidy-startups",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "Tech & AI",
    isBreaking: false,
    trendQuery: "IndiaAI GPU Compute Portal Apply",
    trendSpike: "+620%",
    publishedAt: "42 min ago",
    readTime: "4 min read",
    title: "IndiaAI Compute Portal Opens Subsidized GPU Access for Startups and Researchers",
    subtitle: "The national compute initiative aims to lower infrastructure costs for domestic AI development and research.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Ananya Krishnan",
      role: "AI & DeepTech Correspondent",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "18,000+", label: "GPUs in the shared pool" },
    aiSummary: [
      "The portal brings compute capacity from multiple providers into a single booking workflow.",
      "Eligible startups and researchers can apply for support based on project requirements.",
      "Availability, approval timelines and final hourly pricing vary by provider and allocation.",
    ],
    sixtyWordSummary: "India's national AI compute initiative is opening subsidized access to high-performance GPUs for startups, researchers and institutions. A unified portal is intended to make available capacity easier to discover and book, while targeted support can reduce costs for selected projects. Applicants should check current eligibility, provider rates and allocation terms directly on the official portal before planning a training run.",
    bodyParagraphs: [
      "A new booking workflow is bringing participating compute providers into a unified discovery and application process. The program is intended to help teams that need specialized hardware but cannot justify large cloud commitments.",
      "Eligibility and subsidy levels depend on the applicant and project. Teams should compare provider availability, storage and data-transfer terms alongside headline GPU rates.",
      "The initiative also creates a path for academic labs and early-stage companies to test workloads before scaling them into production infrastructure.",
    ],
    sections: [
      {
        paragraphs: [
          "A new booking workflow is bringing participating compute providers into a unified discovery and application process. The program is intended to help teams that need specialized hardware but cannot justify large cloud commitments.",
          "Eligibility and subsidy levels depend on the applicant and project. Teams should compare provider availability, storage and data-transfer terms alongside headline GPU rates.",
          "The initiative also creates a path for academic labs and early-stage companies to test workloads before scaling them into production infrastructure.",
        ],
        quiz: {
          question: "What is the IndiaAI Compute Portal intended to help users do?",
          options: [
            "Buy consumer laptops",
            "Find and apply for shared GPU compute",
            "Register new mobile networks",
            "Publish research journals",
          ],
        },
      },
    ],
  },
  {
    id: "india-semiconductor-mission-dholera-fab-breakthrough",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "Tech & AI",
    isBreaking: false,
    trendQuery: "Dholera Semiconductor Plant Construction",
    trendSpike: "+740%",
    publishedAt: "2 hours ago",
    readTime: "4 min read",
    title: "India Semiconductor Mission Accelerates Dholera Commercial Fab Construction",
    subtitle: "Cleanroom development and clean water infrastructure milestones achieved as commercial chip fabrication approaches test runs.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Ananya Krishnan",
      role: "AI & DeepTech Correspondent",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "50,000", label: "wafer starts per month planned" },
    aiSummary: [
      "The commercial wafer fabrication unit in Gujarat marks critical milestone in indigenous chipmaking.",
      "Foundry partners are focusing on 28nm, 40nm, and 90nm nodes for automotive, power, and telecom sectors.",
      "Specialized utility corridors provide ultrapure water and redundant electrical substations.",
    ],
    sixtyWordSummary: "Construction on India's first commercial semiconductor wafer fabrication plant in Dholera is advancing rapidly. Spearheaded under the India Semiconductor Mission, the project has completed key structural milestones for high-grade cleanrooms. The facility aims to produce 50,000 wafers monthly, catering to rising demand for automotive, telecom, and industrial microcontrollers.",
    bodyParagraphs: [
      "Civil construction and structural engineering works for the mega-scale fabrication facility have entered the precision tooling stage. Specialized seismic isolation foundations and multi-tier HVAC cleanroom filtration systems are being installed under international foundry supervision.",
      "The plant targets legacy and mature process nodes between 28 nanometers and 90 nanometers. These nodes represent the bulk of global microchip demand for automotive electronics, EV powertrains, and 5G base station power management modules.",
      "State and central authorities have dedicated dedicated water treatment plants providing millions of liters of ultrapure deionized water daily, backed by twin dedicated 220kV transmission lines to eliminate power fluctuations.",
    ],
    sections: [
      {
        paragraphs: [
          "Civil construction and structural engineering works for the mega-scale fabrication facility have entered the precision tooling stage. Specialized seismic isolation foundations and multi-tier HVAC cleanroom filtration systems are being installed under international foundry supervision.",
          "The plant targets legacy and mature process nodes between 28 nanometers and 90 nanometers. These nodes represent the bulk of global microchip demand for automotive electronics, EV powertrains, and 5G base station power management modules.",
          "State and central authorities have dedicated dedicated water treatment plants providing millions of liters of ultrapure deionized water daily, backed by twin dedicated 220kV transmission lines to eliminate power fluctuations.",
        ],
        quiz: {
          question: "Which process nodes will the Dholera semiconductor fab primarily target?",
          options: [
            "2nm and 3nm quantum nodes",
            "28nm, 40nm, and 90nm mature nodes",
            "Vacuum tube technologies",
            "Optical analog circuits only",
          ],
        },
      },
    ],
  },
  {
    id: "open-source-indic-llm-breakthrough-bhashini",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "Tech & AI",
    isBreaking: false,
    trendQuery: "Open Source Indian Language LLM Bhashini",
    trendSpike: "+460%",
    publishedAt: "4 hours ago",
    readTime: "3 min read",
    title: "Indian AI Researchers Release Open Multilingual Foundation Models for 22 Languages",
    subtitle: "New lightweight models deliver native tokenization and high benchmark scores across regional Indian languages.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Ananya Krishnan",
      role: "AI & DeepTech Correspondent",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "22", label: "official scheduled languages supported" },
    aiSummary: [
      "Open-source weights released under permissive research and commercial licenses.",
      "Custom tokenizers prevent language bloat and reduce generation latency by 45%.",
      "Public datasets spanning agriculture, healthcare, and civic governance power fine-tuning.",
    ],
    sixtyWordSummary: "A collaborative consortium of Indian research institutes and open-source AI labs has unveiled a suite of bilingual and multilingual language models trained natively on 22 Indian languages. Featuring optimized tokenizers tailored to Devanagari, Dravidian, and other indigenous scripts, the models offer superior vernacular fluency while minimizing computational inference costs.",
    bodyParagraphs: [
      "Conventional global large language models often suffer from poor tokenization efficiency when processing non-Latin scripts, resulting in inflated inference latencies and higher costs for Indian developers. The newly released foundation model addresses this with custom vocabulary allocations.",
      "Trained on high-quality curated corpora covering legal codes, educational texts, and vernacular literature, the weights demonstrate exceptional comprehension in Hindi, Tamil, Telugu, Bengali, and Marathi.",
      "Developers can run quantized versions on local edge devices, opening opportunities for voice-enabled citizen service bots, rural tele-medicine interfaces, and contextual agricultural advisory tools.",
    ],
    sections: [
      {
        paragraphs: [
          "Conventional global large language models often suffer from poor tokenization efficiency when processing non-Latin scripts, resulting in inflated inference latencies and higher costs for Indian developers. The newly released foundation model addresses this with custom vocabulary allocations.",
          "Trained on high-quality curated corpora covering legal codes, educational texts, and vernacular literature, the weights demonstrate exceptional comprehension in Hindi, Tamil, Telugu, Bengali, and Marathi.",
          "Developers can run quantized versions on local edge devices, opening opportunities for voice-enabled citizen service bots, rural tele-medicine interfaces, and contextual agricultural advisory tools.",
        ],
        quiz: {
          question: "How do custom tokenizers benefit vernacular Indian language AI models?",
          options: [
            "They increase latency and cost",
            "They eliminate all internet requirements",
            "They reduce token bloat and generation latency",
            "They translate all texts into Latin only",
          ],
        },
      },
    ],
  },

  // --- MARKETS & POLICY ---
  {
    id: "rbi-upi-offline-tap-lite-x-limit",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "Markets & Policy",
    isBreaking: false,
    trendQuery: "UPI Lite New Limit and Auto Replenish",
    trendSpike: "+490%",
    publishedAt: "1 hour ago",
    readTime: "3 min read",
    title: "UPI Lite Adds Offline Tap Payments and a Higher Wallet Limit",
    subtitle: "The updated framework is designed to make small-value payments work more reliably in low-connectivity settings.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Vikram Sengupta",
      role: "Financial Markets & Banking Analyst",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "₹5,000", label: "wallet balance limit" },
    aiSummary: [
      "The updated limits are aimed at frequent, small-value payments.",
      "Offline-capable UPI Lite X uses nearby device communication for supported transactions.",
      "Availability depends on participating banks, apps and merchant terminals.",
    ],
    sixtyWordSummary: "The UPI Lite framework is expanding support for small-value payments, including offline-capable tap transactions on supported devices. The changes are intended to reduce friction at transit gates and busy retail counters where connectivity can be unreliable. Users should confirm the updated limits and availability in their payment app, since rollout depends on participating banks, providers and compatible merchant terminals.",
    bodyParagraphs: [
      "The updated framework focuses on everyday payments that are frequent, low value and sensitive to network interruptions. Device-based processing can help some transactions complete without relying on a live data connection at the point of sale.",
      "Not every combination of bank, payment app and terminal will support the feature on day one. Users should check their app settings and the terms published by their provider.",
      "The change follows a broader effort to make digital payments more resilient while preserving the safeguards attached to linked bank accounts.",
    ],
    sections: [
      {
        paragraphs: [
          "The updated framework focuses on everyday payments that are frequent, low value and sensitive to network interruptions. Device-based processing can help some transactions complete without relying on a live data connection at the point of sale.",
          "Not every combination of bank, payment app and terminal will support the feature on day one. Users should check their app settings and the terms published by their provider.",
          "The change follows a broader effort to make digital payments more resilient while preserving the safeguards attached to linked bank accounts.",
        ],
        quiz: {
          question: "What problem is offline-capable UPI Lite X designed to address?",
          options: [
            "Slow parcel deliveries",
            "High-resolution video buffering",
            "Train ticket availability",
            "Payment interruptions in low-connectivity settings",
          ],
        },
      },
    ],
  },
  {
    id: "rbi-monetary-policy-repo-rate-inflation-outlook",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "Markets & Policy",
    isBreaking: false,
    trendQuery: "RBI Monetary Policy Repo Rate Decision",
    trendSpike: "+680%",
    publishedAt: "3 hours ago",
    readTime: "4 min read",
    title: "RBI Monetary Policy Committee Maintains Stance Amid Sustained Macroeconomic Resilience",
    subtitle: "Central bank monitors food inflation risks while projecting solid 7% GDP expansion for the fiscal year.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Vikram Sengupta",
      role: "Financial Markets & Banking Analyst",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "6.50%", label: "benchmark repo rate" },
    aiSummary: [
      "The Monetary Policy Committee voted by majority to keep the benchmark repo rate unchanged.",
      "Inflation targets remain anchored around the 4% target band despite volatile food indices.",
      "Corporate balance sheets and banking sector capital adequacy remain robust.",
    ],
    sixtyWordSummary: "The Reserve Bank of India Monetary Policy Committee has retained the benchmark policy repo rate at 6.50%, reiterating its commitment to aligning inflation with the 4% target. Citing robust domestic consumption and private capital expenditure trends, the central bank projected economic growth at 7.0%, while advising vigilance over global commodity volatility.",
    bodyParagraphs: [
      "In its latest monetary policy resolution, the central bank underscored that domestic economic activity remains exceptionally buoyant, supported by rising fixed investment, strong services exports, and healthy credit expansion.",
      "Headline retail inflation has shown signs of easing, but the committee reiterated that monetary policy must remain actively disinflationary to prevent transient weather-induced food price spikes from generalizing into broader core components.",
      "Banking system liquidity remains closely monitored, with liquidity management operations being deployed flexibly through variable rate reverse repo auctions to balance financial stability and credit availability.",
    ],
    sections: [
      {
        paragraphs: [
          "In its latest monetary policy resolution, the central bank underscored that domestic economic activity remains exceptionally buoyant, supported by rising fixed investment, strong services exports, and healthy credit expansion.",
          "Headline retail inflation has shown signs of easing, but the committee reiterated that monetary policy must remain actively disinflationary to prevent transient weather-induced food price spikes from generalizing into broader core components.",
          "Banking system liquidity remains closely monitored, with liquidity management operations being deployed flexibly through variable rate reverse repo auctions to balance financial stability and credit availability.",
        ],
        quiz: {
          question: "What is the primary target headline inflation rate monitored by the RBI MPC?",
          options: ["8.0%", "4.0%", "1.5%", "10.0%"],
        },
      },
    ],
  },
  {
    id: "sebi-algorithmic-trading-investor-protection-guidelines",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "Markets & Policy",
    isBreaking: false,
    trendQuery: "SEBI New Rules for Algo Trading Retail",
    trendSpike: "+420%",
    publishedAt: "6 hours ago",
    readTime: "3 min read",
    title: "SEBI Formulates Guardrails for Retail Algorithmic Trading and Strategy Disclosures",
    subtitle: "Capital markets regulator mandates API certifications and clear risk warnings to curb misleading automated return claims.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Vikram Sengupta",
      role: "Financial Markets & Banking Analyst",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "100%", label: "audit requirement on broker APIs" },
    aiSummary: [
      "Brokers must certify all third-party algorithmic trading software connected to exchange gateways.",
      "Unregulated promises of guaranteed returns by social media strategy vendors face strict enforcement.",
      "Exchanges will deploy real-time circuit checks to prevent cascading erroneous order execution.",
    ],
    sixtyWordSummary: "The Securities and Exchange Board of India (SEBI) has released comprehensive regulatory standards governing algorithmic and API-based retail trading. The framework places direct responsibility on stockbrokers to audit automated software, mandates transparent historical drawdown metrics, and prohibits misleading promotional claims promising guaranteed returns from automated strategies.",
    bodyParagraphs: [
      "As retail participation in quantitative and derivative trading has expanded rapidly via open brokerage APIs, the market regulator observed growing instances of unauthorized vendors marketing untested algorithms under exaggerated profit claims.",
      "Under the new framework, stockbrokers must implement standardized pre-trade risk controls, including cumulative order value caps and price-band validation checks, before routing programmatic orders to exchange matching engines.",
      "Retail investors must also be provided with standardized risk warning sheets outlining systemic slippage, market volatility risk, and connectivity failure contingencies before enabling programmatic API permissions.",
    ],
    sections: [
      {
        paragraphs: [
          "As retail participation in quantitative and derivative trading has expanded rapidly via open brokerage APIs, the market regulator observed growing instances of unauthorized vendors marketing untested algorithms under exaggerated profit claims.",
          "Under the new framework, stockbrokers must implement standardized pre-trade risk controls, including cumulative order value caps and price-band validation checks, before routing programmatic orders to exchange matching engines.",
          "Retail investors must also be provided with standardized risk warning sheets outlining systemic slippage, market volatility risk, and connectivity failure contingencies before enabling programmatic API permissions.",
        ],
        quiz: {
          question: "What is the key purpose of SEBI's updated algorithmic trading guidelines?",
          options: [
            "To ban all retail participation in stock markets",
            "To curb misleading return claims and enforce pre-trade risk checks",
            "To close down national stock exchanges",
            "To eliminate all trading APIs permanently",
          ],
        },
      },
    ],
  },

  // --- CRICKET & SPORTS ---
  {
    id: "ind-vs-aus-squad-announcement-breakout",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "Cricket & Sports",
    isBreaking: true,
    trendQuery: "India Test Squad Selection Press Conference",
    trendSpike: "+950%",
    publishedAt: "28 min ago",
    readTime: "3 min read",
    title: "India Names Test Squad with Two New Pace Call-Ups Ahead of the Series",
    subtitle: "Selectors have balanced experience with domestic form as the touring group begins its final preparation window.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Rohan Kulkarni",
      role: "Sports Desk Lead",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "18 players", label: "named in the squad" },
    aiSummary: [
      "Two uncapped fast bowlers have earned places after strong domestic seasons.",
      "The selection panel says workload and fitness reports informed the final balance.",
      "A preparation camp is scheduled ahead of the opening Test.",
    ],
    sixtyWordSummary: "India's selectors have named an 18-player Test squad with two uncapped fast bowlers rewarded for strong domestic performances. Fitness reports and workload planning informed the balance of the group, which will attend a preparation camp before the opening match. The final playing XI will depend on conditions, player availability and how the team management assesses the surface during the series.",
    bodyParagraphs: [
      "The squad combines established players with two new fast-bowling options selected after a strong domestic campaign. The additions give the team more flexibility across different pitch conditions.",
      "The selection panel also weighed fitness and workload information as it built a group for a multi-match series. Team management will have a short preparation window before the first Test.",
      "Final combinations will depend on conditions and player readiness, with the travelling group expected to take part in a dedicated red-ball camp.",
    ],
    sections: [
      {
        paragraphs: [
          "The squad combines established players with two new fast-bowling options selected after a strong domestic campaign. The additions give the team more flexibility across different pitch conditions.",
          "The selection panel also weighed fitness and workload information as it built a group for a multi-match series. Team management will have a short preparation window before the first Test.",
          "Final combinations will depend on conditions and player readiness, with the travelling group expected to take part in a dedicated red-ball camp.",
        ],
        quiz: {
          question: "What contributed to the selection of two new fast bowlers?",
          options: [
            "A television audience vote",
            "A change to the ball color",
            "Strong domestic performances",
            "A retired player's recommendation",
          ],
        },
      },
    ],
  },
  {
    id: "ipl-auction-retention-rules-ruling-strategy",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "Cricket & Sports",
    isBreaking: false,
    trendQuery: "IPL Mega Auction Retention Rules & Purse",
    trendSpike: "+810%",
    publishedAt: "2 hours ago",
    readTime: "4 min read",
    title: "IPL Auction Strategy: Right-to-Match Cards and Purse Dynamics Reshape Team Building",
    subtitle: "Franchises balance core squad stability against purse deductions as new uncapped player criteria open tactical avenues.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Rohan Kulkarni",
      role: "Sports Desk Lead",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "₹120 Cr", label: "total franchise auction purse" },
    aiSummary: [
      "Franchises can retain up to six players through retention and Right-to-Match combinations.",
      "Salary purse caps have been elevated to reflect growing global league revenues.",
      "Strategic valuation of death-bowling and power-hitting all-rounders dominates planning.",
    ],
    sixtyWordSummary: "The Indian Premier League player auction framework has created fascinating tactical challenges for team managements. With an increased purse of ₹120 crore and flexible Right-to-Match (RTM) options, teams are evaluating whether to retain established stars at fixed premium tiers or enter the open auction with maximum capital flexibility.",
    bodyParagraphs: [
      "The revised retention regulations allow each of the ten franchises to retain up to six players via direct pre-auction signings and RTM cards during the bidding floor proceedings. However, top-tier retentions come with significant mandatory purse deductions.",
      "Franchise analysts are intensely modelling player replacement values. Data shows that specialized middle-overs spin anchors and fast bowlers capable of exceeding 145 km/h command unprecedented bidding premiums.",
      "The revival of the uncapped player clause for veterans who have stepped away from international cricket for over five years has also provided teams with creative roster construction possibilities.",
    ],
    sections: [
      {
        paragraphs: [
          "The revised retention regulations allow each of the ten franchises to retain up to six players via direct pre-auction signings and RTM cards during the bidding floor proceedings. However, top-tier retentions come with significant mandatory purse deductions.",
          "Franchise analysts are intensely modelling player replacement values. Data shows that specialized middle-overs spin anchors and fast bowlers capable of exceeding 145 km/h command unprecedented bidding premiums.",
          "The revival of the uncapped player clause for veterans who have stepped away from international cricket for over five years has also provided teams with creative roster construction possibilities.",
        ],
        quiz: {
          question: "What is the total auction purse available to each IPL franchise under the updated framework?",
          options: ["₹50 Crore", "₹80 Crore", "₹120 Crore", "₹200 Crore"],
        },
      },
    ],
  },
  {
    id: "indian-chess-grandmasters-olympiad-championship-circuit",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "Cricket & Sports",
    isBreaking: false,
    trendQuery: "FIDE Candidates Tournament Chess Indian Grandmasters",
    trendSpike: "+530%",
    publishedAt: "5 hours ago",
    readTime: "3 min read",
    title: "Indian Chess Golden Generation Dominates Global Elite Circuit and FIDE Standings",
    subtitle: "Young grandmasters combine deep engine preparation with psychological resilience to establish unprecedented dominance.",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Rohan Kulkarni",
      role: "Sports Desk Lead",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "5 in Top 15", label: "Indian players in global FIDE rankings" },
    aiSummary: [
      "Historic double gold medals at the Chess Olympiad cemented India's global leadership.",
      "Rigorous neural engine training and domestic competitive leagues accelerate youth development.",
      "Indian grandmasters qualify across world championship candidates cycles.",
    ],
    sixtyWordSummary: "India's chess revolution has reached historic heights as multiple young grandmasters surge into the world top-15 rankings. Following sensational performances at the FIDE Chess Olympiad and Candidates tournaments, the generational wave combines cutting-edge computational opening analysis with fearless classical middlegame execution.",
    bodyParagraphs: [
      "The ascent of Indian chess represents decades of grassroots academy coaching and competitive infrastructure, initiated by Viswanathan Anand's legendary world championship reign. Today, India boasts the youngest contingent of elite 2750+ super-grandmasters in chess history.",
      "Top Indian players have demonstrated mastery over cutting-edge neural-network chess engines, developing deep novelties and razor-sharp positional clarity that consistently challenges traditional European hegemony.",
      "With international tournaments regularly featuring all-Indian podium finishes, corporate sponsorships and scholastic chess federations are investing heavily in the next wave of prodigies across secondary and tier-2 cities.",
    ],
    sections: [
      {
        paragraphs: [
          "The ascent of Indian chess represents decades of grassroots academy coaching and competitive infrastructure, initiated by Viswanathan Anand's legendary world championship reign. Today, India boasts the youngest contingent of elite 2750+ super-grandmasters in chess history.",
          "Top Indian players have demonstrated mastery over cutting-edge neural-network chess engines, developing deep novelties and razor-sharp positional clarity that consistently challenges traditional European hegemony.",
          "With international tournaments regularly featuring all-Indian podium finishes, corporate sponsorships and scholastic chess federations are investing heavily in the next wave of prodigies across secondary and tier-2 cities.",
        ],
        quiz: {
          question: "What historic achievement highlighted India's ascent to global chess supremacy?",
          options: [
            "Winning double gold at the FIDE Chess Olympiad",
            "Banning the use of computer clocks",
            "Playing chess without pawns",
            "Switching all games to 1-minute blitz",
          ],
        },
      },
    ],
  },

  // --- CINEMA & OTT ---
  {
    id: "ott-weekend-releases-box-office-tracker",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "Cinema & OTT",
    isBreaking: false,
    trendQuery: "Friday OTT Releases and Streaming Times",
    trendSpike: "+540%",
    publishedAt: "2 hours ago",
    readTime: "3 min read",
    title: "The New Films and Series Arriving on Streaming Platforms This Weekend",
    subtitle: "A comprehensive guide to the week's notable releases across major streaming platforms, featuring top regional titles.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Mira Joseph",
      role: "Film & Streaming Editor",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "8 picks", label: "notable streaming arrivals" },
    aiSummary: [
      "This week's slate mixes high-octane thrillers, crime procedurals, and acclaimed Malayalam cinema.",
      "Subscribers across platforms can access 4K Dolby Vision remasters of classic library titles.",
      "Release schedules vary by territory; official app dashboards confirm local premiere hours.",
    ],
    sixtyWordSummary: "This weekend's streaming slate brings together new films, returning series and regional releases across several major platforms. Release calendars can shift by territory, so check the title page in your app for the confirmed local time. Our shortlist groups the most talked-about arrivals by genre, giving viewers a quick way to pick a film night or catch up on a new episode.",
    bodyParagraphs: [
      "The latest streaming window has a broad mix of genres, from returning crime dramas to new regional films. Platform release schedules can differ across markets.",
      "For the most accurate availability, check each title's page in the streaming app you use. Some releases arrive at midnight while others follow a regional schedule.",
      "We'll update this guide as platforms confirm additional titles and local release times.",
    ],
    sections: [
      {
        paragraphs: [
          "The latest streaming window has a broad mix of genres, from returning crime dramas to new regional films. Platform release schedules can differ across markets.",
          "For the most accurate availability, check each title's page in the streaming app you use. Some releases arrive at midnight while others follow a regional schedule.",
          "We'll update this guide as platforms confirm additional titles and local release times.",
        ],
        quiz: {
          question: "Where should viewers check for the most accurate local streaming availability?",
          options: [
            "A cinema ticket booth",
            "The title page in their streaming app",
            "A train station noticeboard",
            "A weather forecast",
          ],
        },
      },
    ],
  },
  {
    id: "pan-india-cinema-box-office-regional-storytelling",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "Cinema & OTT",
    isBreaking: false,
    trendQuery: "Pan India Box Office Revenue Records",
    trendSpike: "+610%",
    publishedAt: "4 hours ago",
    readTime: "4 min read",
    title: "Pan-India Spectacles and Grounded Regional Storytelling Reshape Box Office Economics",
    subtitle: "High-concept Telugu, Tamil, and Malayalam cinema captures nationwide multiplex audiences as theatrical windows stabilize.",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Mira Joseph",
      role: "Film & Streaming Editor",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "₹1,200 Cr+", label: "annual cross-regional theatrical collections" },
    aiSummary: [
      "Linguistic barriers have dissolved as multi-lingual dubbing quality and marketing synchronize nationwide.",
      "Malayalam cinema delivers unprecedented profitability through compact budgets and exceptional writing.",
      "Theatrical exclusivity windows of eight weeks preserve multiplex revenue ecosystems.",
    ],
    sixtyWordSummary: "The Indian film industry has entered an era of boundary-less national cinema. Audiences in northern multiplexes are embracing dubbed southern epics in record numbers, while tightly scripted, realistic regional dramas demonstrate that compelling storytelling commands universal appeal and formidable box office longevity.",
    bodyParagraphs: [
      "The traditional demarcations separating Bollywood, Tollywood, Kollywood, and Mollywood have permanently shifted. Contemporary filmgoers evaluate productions on visual craftsmanship, authentic cultural roots, and immersive soundscapes rather than linguistic origin.",
      "Particularly striking has been the financial success of character-driven Malayalam films, which have achieved staggering returns on investment through disciplined production budgets, high-concept narratives, and word-of-mouth momentum across urban multiplex circuits.",
      "Simultaneously, theatrical exhibitors and streaming platforms have consolidated an eight-week theatrical window agreement, ensuring that cinema halls retain exclusivity for tentpole titles while preserving downstream streaming monetization.",
    ],
    sections: [
      {
        paragraphs: [
          "The traditional demarcations separating Bollywood, Tollywood, Kollywood, and Mollywood have permanently shifted. Contemporary filmgoers evaluate productions on visual craftsmanship, authentic cultural roots, and immersive soundscapes rather than linguistic origin.",
          "Particularly striking has been the financial success of character-driven Malayalam films, which have achieved staggering returns on investment through disciplined production budgets, high-concept narratives, and word-of-mouth momentum across urban multiplex circuits.",
          "Simultaneously, theatrical exhibitors and streaming platforms have consolidated an eight-week theatrical window agreement, ensuring that cinema halls retain exclusivity for tentpole titles while preserving downstream streaming monetization.",
        ],
        quiz: {
          question: "What consensus window has been established between theatrical exhibitors and OTT platforms?",
          options: [
            "24 hours",
            "An eight-week theatrical exclusivity window",
            "One full calendar year",
            "No theatrical release ever",
          ],
        },
      },
    ],
  },
  {
    id: "indian-indie-cinema-cannes-film-festival-acclaim",
    viewCount: 0,
    deviceViews: { mobile: 0, tablet: 0, desktop: 0 },
    category: "Cinema & OTT",
    isBreaking: false,
    trendQuery: "Indian Indie Films International Festival Awards",
    trendSpike: "+390%",
    publishedAt: "7 hours ago",
    readTime: "3 min read",
    title: "Indian Independent Cinema Wins Historic Accolades at Cannes and Global Festivals",
    subtitle: "A new generation of fearless filmmakers gains international prestige through nuanced portraits of contemporary society.",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1400&auto=format&fit=crop&q=85",
    author: {
      name: "Mira Joseph",
      role: "Film & Streaming Editor",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&auto=format&fit=crop&q=80",
    },
    keyStat: { value: "Grand Prix", label: "landmark international festival award" },
    aiSummary: [
      "Historic awards at Cannes, Venice, and Sundance signal a golden era for independent Indian directors.",
      "Co-production treaties with European cultural funds provide vital finishing financing.",
      "Specialty theatrical releases and curation platforms bring festival gems to domestic audiences.",
    ],
    sixtyWordSummary: "Indian independent cinema is celebrating unprecedented international acclaim. Major awards at prestigious global festivals like Cannes and Sundance highlight the compelling storytelling, raw emotional honesty, and cinematic artistry of independent Indian directors, proving that authentic local experiences resonate deeply with worldwide audiences.",
    bodyParagraphs: [
      "Recent landmark wins on the French Riviera and across international festival circuits have spotlighted a renaissance in Indian auteur cinema. Emerging directors are tackling nuanced themes of gender, urban migration, and human dignity with lyrical visual restraint.",
      "International co-production funds from France, Germany, and the UK have facilitated access to world-class sound design, color grading, and global festival distribution pipelines, ensuring that independent visions reach their intended aesthetic potential.",
      "At home, dedicated indie distribution collectives and boutique cinema chains are organizing limited nationwide festival showcases, providing domestic cinephiles with direct access to these celebrated works.",
    ],
    sections: [
      {
        paragraphs: [
          "Recent landmark wins on the French Riviera and across international festival circuits have spotlighted a renaissance in Indian auteur cinema. Emerging directors are tackling nuanced themes of gender, urban migration, and human dignity with lyrical visual restraint.",
          "International co-production funds from France, Germany, and the UK have facilitated access to world-class sound design, color grading, and global festival distribution pipelines, ensuring that independent visions reach their intended aesthetic potential.",
          "At home, dedicated indie distribution collectives and boutique cinema chains are organizing limited nationwide festival showcases, providing domestic cinephiles with direct access to these celebrated works.",
        ],
        quiz: {
          question: "What has facilitated international post-production quality for Indian independent films?",
          options: [
            "Co-production treaties and European cultural fund partnerships",
            "Eliminating all musical scores",
            "Filming entirely on smartphone webcams",
            "Avoiding all film festivals",
          ],
        },
      },
    ],
  },
];

export const trends: Trend[] = articles.map((article, index) => ({
  rank: String(index + 1).padStart(2, "0"),
  views: article.viewCount,
  query: article.trendQuery,
  category: article.category,
  articleId: article.id,
  whyTrending: article.subtitle,
}));

export const newsResponse: NewsResponse = { articles, trends };
