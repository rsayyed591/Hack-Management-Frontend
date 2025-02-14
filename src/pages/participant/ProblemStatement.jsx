"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from '../../contexts/AuthContext'
import GoBackButton from '../../components/GoBackButton'

const problemStatements = [
  {
    id: "WD01",
    domain: "Web Development",
    title: "SkillBridge – Freelancer-to-NGO Platform",
    description:
      "Non-Governmental Organizations (NGOs) often struggle to find skilled professionals for short-term or project-based work due to budget constraints and a lack of accessible talent pools. At the same time, freelancers and professionals are looking for meaningful projects that align with their expertise and social impact goals. There is a gap between NGOs needing skilled assistance and freelancers willing to contribute.",
    objective:
      "To develop an online platform that connects freelancers with NGOs, enabling seamless collaboration on social impact projects. The platform will allow NGOs to post skill-based requirements, and freelancers can apply for projects based on their expertise and availability.",
    features: [
      "Project Posting – Create and list project opportunities with specific skill requirements.",
      "Skill-Based Matching – Intelligent recommendations based on freelancer expertise.",
      "Budget & Volunteer Options – Choose between paid work, volunteering, or hybrid compensation.",
      "Collaboration Tools – In-app messaging, document sharing, and task management.",
      "Impact Tracking – Monitor project progress and freelancer contributions.",
      "Personalized Dashboard – View available NGO projects aligned with their skills.",
      "Flexible Work Options – Choose between paid, volunteer, or hybrid roles.",
      "Skill Development Badges – Earn certifications and recognition for contributions.",
      "Portfolio Building – Showcase completed projects to enhance career growth.",
      "Review & Ratings – Trust-building mechanisms for accountability and credibility.",
      "Community Engagement – Networking, mentorship, and knowledge-sharing forums.",
    ],
  },
  {
    id: "WD02",
    domain: "Web Development",
    title: "Transparent Student Housing Finder",
    description:
      "Students often face significant challenges in finding affordable and suitable housing in urban areas. The lack of transparency in rental agreements, hidden charges, and limited trust in landlords or brokers complicate the process. This issue hampers students' ability to focus on their studies and settle comfortably in a new city.",
    objective:
      "Develop a web-based platform which simplifies the housing search for students by offering verified listings, transparent rental agreements, and tools to connect directly with landlords or housing providers. The platform aims to make finding housing hassle-free, cost-effective, and trustworthy.",
    features: [
      "Verified Listings: Landlord Verification, Property Inspections, Ratings and Reviews",
      "Transparent Rental Agreements: Standardized Digital Agreements, Clear Breakdown of Costs, E-Signature Integration",
      "Smart Search and Filtering: Budget-Friendly Options, Filters, Proximity Mapping",
      "Community Housing Options: Roommate Matching, Student Housing Communities",
      "Seamless Communication: Chat with Landlords",
      "Financial Assistance: Rent Payment Plans, Partnerships with Financial Institutions",
    ],
  },
  {
    id: "WD03",
    domain: "Web Development",
    title: "Managing research activities, intellectual property rights (IPR), and entrepreneurial growth (PS by EDC)",
    description:
      "India, a rapidly growing hub for research, innovation, and start-ups, faces challenges in effectively monitoring and managing research activities, intellectual property rights (IPR), and entrepreneurial growth. The current fragmented systems hinder data accessibility, transparency, and efficient resource allocation. A centralized digital platform is essential to streamline these processes, ensuring better collaboration among researchers, entrepreneurs, investors, and policymakers.",
    objective:
      "To develop a web-based application that integrates research tracking, IPR management, and start-up support into a unified platform. The solution will enhance real-time data monitoring, improve transparency, optimize resource allocation, and foster collaboration among stakeholders.",
    features: [
      "Centralized Repository - A unified platform for research projects, patents, and start-up data.",
      "Improved Transparency – Real-time tracking of research progress, IPR status, and start-up growth metrics.",
      "Efficient Resource Allocation – Smarter distribution of funds, mentorship, and infrastructure.",
      "Simplified IPR Management – Easy patent tracking and application submission process.",
      "Start-up Support – Direct access to mentorship, investors, and government schemes.",
      "Data-Driven Insights – Actionable reports and analytics for policymakers and funding agencies.",
    ],
    expectedSolutionFeatures: [
      "Data Centralization – Organizes research, IPR, and start-up data in one place.",
      "Real-Time Tracking – Dashboards and reports for monitoring research and entrepreneurial progress.",
      "Optimized Resource Allocation – AI-driven recommendations for funding and mentorship.",
      "Collaboration Tools – Networking opportunities for researchers, start-ups, and investors.",
      "Mentorship & Funding Access – Connects start-ups with investors and government schemes.",
    ],
  },
  {
    id: "AIML01",
    domain: "AI/ML",
    title: "AI Medical Consultation Assistant (AI-MCA) (PS by AIOLOS)",
    description:
      "Develop an intelligent conversational healthcare system that simulates a medical professional's diagnostic approach. The system should conduct dynamic medical consultations, ask relevant follow-up questions, analyze responses, recommend appropriate tests, and provide diagnosis and treatment plans based on the evolving conversation.",
    background: [
      "Current healthcare chatbots often:",
      "Follow rigid, predefined paths",
      "Lack deep contextual understanding",
      "Cannot adjust questioning based on responses",
      "Miss crucial diagnostic opportunities",
      "Provide generic, non-personalized recommendations",
    ],
    solutionOverview: [
      "Create an AI system that:",
      "Conducts natural medical consultations",
      "Maintains conversation context across iterations",
      "Dynamically adjusts questions based on patient responses",
      "Recommends relevant diagnostic tests",
      "Provides personalized treatment plans",
    ],
  },
  {
    id: "AIML02",
    domain: "AI/ML",
    title: "Building a Custom LLM and Gen AI Chatbot for Intelligent Data Querying (PS by Bitkraft)",
    description:
      "In today's data-driven world, businesses and organizations generate vast amounts of structured (databases, spreadsheets) and unstructured (text documents, emails, reports) data. The challenge is to build an efficient Large Language Model (LLM) that can process, learn from, and generate insights from both types of data.",
    objectives: [
      "Develop a domain-specific LLM that can be trained on structured and unstructured data.",
      "Create a Gen AI-powered chatbot that allows users to query the model in natural language and retrieve meaningful, context-aware responses.",
    ],
    keyConsiderations: [
      "Efficient data preprocessing and transformation methods for structured and unstructured data.",
      "Fine-tuning or training an open-source LLM (e.g., LLaMA, Mistral, Falcon) with relevant datasets.",
      "Building an intuitive chatbot interface for seamless user interaction.",
      "Implementing retrieval-augmented generation (RAG) for accurate information retrieval.",
      "Ensuring scalability and optimizing response time for real-world use cases.",
    ],
  },
  {
    id: "AIML03",
    domain: "AI/ML",
    title: "College Admission Prediction and Resource Planning (PS by MHSSCE)",
    description:
      "Colleges often face challenges in accurately forecasting the number of students who will enroll in the upcoming academic session. This lack of clarity can lead to underutilized resources or insufficient capacity, negatively impacting both the institution and its students.",
    objective:
      "Develop an intelligent, data-driven solution that predicts the number of student admissions for the upcoming academic year. This prediction model will assist college authorities in making informed decisions about resource allocation, such as faculty recruitment, infrastructure planning, and budgeting for facilities and services.",
    features: [
      "Admissions Prediction Model: Forecasting Accuracy, Trend Analysis, Scenario Simulation",
      "Resource Allocation Planning: Faculty Planning, Classroom and Lab Allocation",
      "Tools for Operational Efficiency: Timetable Generation, Budget Planning, Marketing Impact Analysis",
    ],
    sampleDataset: [
      "Historical Admission Data",
      "Demographics",
      "Academic Performance Metrics",
      "Marketing and Outreach Data",
      "Placement Data",
      "External Factors",
      "Program Popularity",
    ],
  },
  {
    id: "AIML04",
    domain: "AI/ML",
    title: "AI Beyond Text: Build an Autonomous Document Intelligence Platform (PS by CNCM)",
    description:
      "Organizations worldwide are overwhelmed by complex, unstructured data locked within PDF documents—legal contracts, financial reports, technical manuals, research papers, etc. The real challenge isn't just reading these documents but understanding them contextually, identifying hidden patterns, and making data-driven decisions autonomously.",
    features: [
      "Autonomously Analyze Multiple PDFs: Detect and process complex document structures, Handle scanned PDFs using OCR with near-human accuracy.",
      "Advanced Cognitive Q&A System: Answer multi-layered, context-dependent questions, Retain context across follow-up queries, adapting responses dynamically.",
      "Dynamic Knowledge Graph Generation: Build real-time knowledge graphs from document data, Enable users to explore connections visually",
      "Predictive Document Insights: Go beyond static analysis—predict trends, flag anomalies, or recommend actions based on extracted data",
      "Cross-Document Correlation Engine: Correlate information across unrelated documents",
    ],
  },
  {
    id: "APP01",
    domain: "App Development",
    title: "ISL Bridge – Audio-to-Sign Language Translator (PS by SIH)",
    description:
      "Indian Sign Language (ISL) is the primary mode of communication for many deaf and hard-of-hearing individuals in India. However, a significant communication barrier exists between them and those who do not understand sign language. This gap limits accessibility in education, healthcare, public services, and daily interactions.",
    objective:
      "Develop a mobile application that converts spoken language (audio) into Indian Sign Language (ISL) in real-time using speech recognition, natural language processing (NLP), and computer vision. The app will also provide text-to-ISL conversion and camera-based ISL recognition, making communication between deaf individuals and non-signers seamless.",
    features: [
      "Audio-to-ISL Conversion: Real-time Speech Recognition, Text-to-Sign Translation, Regional Language Support",
      "Text-to-ISL Translation: Converts typed text into ISL gestures for better accessibility",
      "Camera-Based ISL Recognition: Live Camera Input, AI-Powered Sign Recognition, Facilitates bidirectional communication",
      "Public Announcement Integration: Railway & Metro Station Displays, Airport & Government Services",
      "Offline Support & Accessibility: Works Offline, Adjustable Gesture Speed, Dark Mode & High Contrast",
    ],
  },
  {
    id: "APP02",
    domain: "App Development",
    title: "YogaSense – AI-Powered Yoga Form Analyzer",
    description:
      "Yoga practitioners, especially beginners, often struggle with proper alignment and breathing techniques, which can lead to injuries or ineffective practice. Without a personal instructor, it's hard to know if poses are being performed correctly.",
    objective:
      "Build a mobile app that uses AI-powered pose estimation and AR guidance to analyze yoga poses in real time, provide feedback on alignment, and offer personalized routines for all skill levels.",
    features: [
      "Real-Time Pose Correction",
      "Personalized Yoga Routines",
      "Immersive AR Yoga Studio",
      "Breathing & Meditation Coach",
      "Progress Tracking & Analytics",
      "Community Challenges & Social Features",
    ],
  },
  {
    id: "MISC01",
    domain: "Miscellaneous",
    title: "AI-Powered Web-Based Trading Bot",
    description:
      "With the rise of decentralized finance (DeFi) traders need efficient, high-speed, and user-friendly trading bots to execute swaps, buy, sell, and invest in tokens seamlessly. Many existing trading tools require complex setups, manual transaction signing, and external wallets, creating barriers for both beginners and experienced users.",
    objective:
      "Develop a web-based Solana or Ethereum trading bot with secure private key management on the server, allowing users to swap, invest, buy, and sell tokens efficiently without requiring external wallets or manual signing. The bot will automate trading strategies, portfolio management, and real-time decision-making to maximize user profits while ensuring security and compliance.",
    features: [
      "Secure Private Key Management",
      "One-Click Swaps & Token Trading",
      "Automated Trading Strategies",
      "Copy Trading & Social Investing",
      "Portfolio & Investment Tracking",
      "MEV-Resistant Trading",
      "Multi-Wallet Support & On-Ramp Services",
    ],
  },
  {
    id: "GIS01",
    domain: "Geographic Information System (GIS)",
    title: "Local Kirana Discovery App",
    objective:
      "Develop a mobile application that bridges the gap between local kirana (grocery) stores and customers by integrating GIS (Geographic Information System) tagging for enhanced location-based services. The app empowers small businesses to compete with quick commerce giants while fostering local community engagement and economic growth.",
    features: [
      "Store Location-Based Search (Powered by GIS): Automatically identify and display nearby kirana stores based on the user's current location, Utilize GIS tagging to map store locations accurately on an interactive map, Show real-time distance and estimated delivery times.",
      "Store Profiles: Store Details, Product Listings, Ratings and Reviews",
      "Ordering and Delivery: Order Placement, Order Tracking, Delivery Options",
      "Payment and Rewards: Multiple Payment Methods, Discount Coupons",
      "Business Growth for Kirana Stores: Digital Storefront, Sales Analytics, Marketing Tools",
    ],
  },
  {
    id: "GIS02",
    domain: "Geographic Information System (GIS)",
    title: "Identification of safe navigation routes on the Moon using Chandrayaan Images (PS by ISRO)",
    description:
      "Develop a navigation route on the south pole region of the Moon using the optical and topographic datasets from the Chandrayaan missions. The landing site's tentative coordinates are 85.28° S, 31.20° E. Within the surrounding region of these coordinates, the participants can choose any other nearby region for their analysis. The route should cover a minimum of 100m distance from the landing point. During the 100 m traverse, the path should be free from hindrance (like boulders, craters, steep slope, etc). Also, the predicted path should incorporate stops, which are used for scientific examination by instruments on board the rover. The landing zone should be clearly demarcated in the image and the rover traverse should start from that point. The rover path can be in any direction from the landing zone, but there should be explanation why the desired path is chosen for the rover. Note, the rover path can be fully in sunlit region or the path can be designed to navigated between permanently shadowed region and sunlit region.",
    objectives:
      "Analyse the landing site region in the south polar region of the Moon, from the landing site, generate a minimum 100 m distance traverse path for the safe navigation of rover primarily the Path should include some major scientific stops.",
    expectedOutcomes: [
      "An annotated map/image with clear marks of anticipated rover track. The annotated map should contain the major features along the traverse.",
      "Minimum 100 m is the rover traverse path (but not limited to it), at least 10 stops should be marked in the annotated map.",
      "A detailed explanation for the proposed traverse route, stops and safe navigation should be provided.",
    ],
    datasetRequired: [
      "Chandrayaan-2 – Terrain Mapping Camera (TMC)",
      "Chandrayaan-2 – Terrain Mapping camera derived Digital Terrain Model (DTM)",
      "Chandrayaan-2 – Optical High Resolution Camera (OHRC)",
      "Chandrayaan-2 - Imaging Infra-red Spectrometer (IIRS)",
    ],
    suggestedTools: [
      "Qgis (https://www.qgis.org/en/site/) (open source)",
      "ArcMap",
      "Any other open/licensed softwares",
    ],
    expectedSolution:
      "The landing site selection is first step. The scientifically interest targets surrounding the landing site should be the topmost priority for the rover traverse path mapping. Based on the above criteria, the direction of the rover movement depends on. A minimum of 10 stops within the 100 m rover traverse need to be marked. The 10 stops can be closer to each other or far away from each other (the reason for choosing the 10 stops should be briefed in detail). The traverse map should consider the ground clearance of the rover so that no obstacles will come under the rover. The path should be planned for a Solar powered rover, thereby considering the Sun direction and should eliminate large shadows.",
    evaluationParameters: [
      "Rover path map with clearly marking of minimum 10 stops.",
      "Rover path should be free from any hindrance from the landing region to the final destination (minimum 100 m).",
      "Scientifically interesting sites within the rover path are indeed important.",
    ],
  },
]

const domains = [...new Set(problemStatements.map((ps) => ps.domain))]

export default function ProblemStatements() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDomain, setSelectedDomain] = useState("All")
  const [filteredProblems, setFilteredProblems] = useState(problemStatements)
  const { logout } = useAuth()

  useEffect(() => {
    const filtered = problemStatements.filter(
      (problem) =>
        (selectedDomain === "All" || problem.domain === selectedDomain) &&
        (problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (problem.description && problem.description.toLowerCase().includes(searchTerm.toLowerCase()))),
    )
    setFilteredProblems(filtered)
  }, [searchTerm, selectedDomain])

  return (
    <section className="min-h-screen p-4 md:p-8 bg-[#191E29] relative">
      <div className="flex justify-between items-center mb-8">
        <GoBackButton />
        <button
          onClick={logout}
          className="text-white hover:text-[#01C38D] transition-colors"
        >
          Logout
        </button>
      </div>
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#01C38D]">Problem Statements</h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
              type="text"
              placeholder="Search problem statements..."
              className="p-2 border rounded w-full md:w-64 bg-[#132D46] text-white border-[#01C38D] focus:outline-none focus:ring-2 focus:ring-[#01C38D]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-2 border rounded w-full md:w-48 bg-[#132D46] text-white border-[#01C38D] focus:outline-none focus:ring-2 focus:ring-[#01C38D]"
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <option value="All">All Domains</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <div className="mt-16 space-y-8">
          {filteredProblems.map((problem) => (
            <div key={problem.id} className="bg-[#132D46] rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-2 text-[#01C38D]">{problem.title}</h2>
              <p className="text-sm text-gray-400 mb-4">
                Domain: {problem.domain} | ID: {problem.id}
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-[#01C38D]">Description:</h4>
                  <p className="text-sm text-gray-300">{problem.description}</p>
                </div>

                {problem.objective && (
                  <div>
                    <h4 className="font-semibold mb-2 text-[#01C38D]">Objective:</h4>
                    <p className="text-sm text-gray-300">{problem.objective}</p>
                  </div>
                )}

                {problem.features && problem.features.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-[#01C38D]">Features:</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-300">
                      {problem.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Add other sections (background, solutionOverview, etc.) here following the same pattern */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

