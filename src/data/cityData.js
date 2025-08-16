import { 
  Building, Briefcase, TrendingUp, Globe, Shield, Zap, Award, 
  Users, Database, Cpu, Brain, Sparkles, HeartHandshake, Smile, 
  Presentation, PieChart, Activity, KeyRound, UserPlus, FileSpreadsheet, 
  Lightbulb, Target, Rocket, Star, Clock, MapPin, Phone, Mail, 
  Calendar, Download, MessageCircle, ChevronRight, Check, ArrowUpRight,
  BookOpen
} from 'lucide-react';

// Premium city data for all 14 cities
export const cityData = {
  mumbai: {
    name: "Mumbai",
    description: "Elevate your business with sophisticated HR solutions. From Bandra Kurla Complex to Andheri's tech hub, we deliver premium HR services that align with Mumbai's dynamic business landscape.",
    stats: [
      { number: "250+", label: "Mumbai Companies Served" },
      { number: "80+", label: "Startups & SMEs" },
      { number: "45+", label: "Enterprise Clients" },
      { number: "25,000+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Building, title: "Financial Capital Expertise", description: "Deep understanding of Mumbai's financial services, banking, and fintech ecosystem" },
      { icon: Briefcase, title: "Startup Hub Knowledge", description: "Extensive experience with Mumbai's vibrant startup and SME community" },
      { icon: TrendingUp, title: "Growth Market Focus", description: "Proven expertise in supporting rapidly scaling companies in Mumbai's competitive market" },
      { icon: Globe, title: "Global Business Center", description: "Understanding of international business requirements and global delivery models" },
      { icon: Shield, title: "Compliance Excellence", description: "Comprehensive knowledge of Maharashtra state labor laws and compliance requirements" },
      { icon: Zap, title: "Fast-Paced Environment", description: "Experience with Mumbai's fast-paced business environment and quick turnaround requirements" }
    ],
    services: [
      {
        title: "Financial Services HR",
        description: "Specialized HR solutions for banking, insurance, and financial technology companies",
        icon: Building,
        features: ["Banking professional recruitment", "Fintech talent acquisition", "Compliance and regulatory hiring", "Risk management specialist sourcing", "Investment banking team building", "Financial services training programs"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Startup & SME HR",
        description: "Comprehensive HR support for Mumbai's vibrant startup and SME ecosystem",
        icon: Rocket,
        features: ["Startup HR foundation setup", "SME compliance management", "Talent acquisition strategies", "Employee engagement programs", "Performance management systems", "Scaling HR infrastructure"],
        link: "/services/hr-compliance"
      },
      {
        title: "Media & Entertainment HR",
        description: "Specialized HR services for Mumbai's media, entertainment, and creative industries",
        icon: Smile,
        features: ["Creative talent recruitment", "Media professional hiring", "Entertainment industry compliance", "Production team management", "Digital media specialist sourcing", "Content creation team building"],
        link: "/services/performance-management"
      },
      {
        title: "Real Estate & Construction HR",
        description: "Complete HR solutions for real estate, construction, and infrastructure companies",
        icon: Building,
        features: ["Construction professional hiring", "Real estate specialist recruitment", "Project management team building", "Infrastructure compliance management", "Property development staffing", "Construction safety training"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Financial Services", description: "Banking, insurance, and financial technology", companies: "HDFC Bank, ICICI Bank, SBI, Bajaj Finserv, Paytm, PhonePe" },
      { name: "Media & Entertainment", description: "Film, television, digital media, and advertising", companies: "Bollywood studios, Netflix, Amazon Prime, advertising agencies" },
      { name: "Real Estate & Construction", description: "Property development, construction, and infrastructure", companies: "Lodha Group, Godrej Properties, Oberoi Realty, construction firms" },
      { name: "Information Technology", description: "Software services, product development, and IT consulting", companies: "TCS, Infosys, Wipro, Tech Mahindra, startups in BKC and Andheri" },
      { name: "Healthcare & Pharmaceuticals", description: "Hospitals, pharmaceutical companies, and healthcare services", companies: "Apollo Hospitals, Fortis Healthcare, pharmaceutical companies" },
      { name: "Logistics & Transportation", description: "Shipping, logistics, and transportation services", companies: "Mumbai Port Trust, logistics companies, transportation firms" }
    ],
    testimonials: [
      { name: "Rajesh Kumar", position: "CEO", company: "Fintech Startup, BKC", text: "Their understanding of Mumbai's fintech ecosystem and startup culture is exceptional. Helped us build a world-class team that understands both technology and financial services.", rating: 5 },
      { name: "Priya Sharma", position: "HR Director", company: "Media Company, Andheri", text: "Outstanding expertise in creative industry recruitment. They understand the unique talent requirements of media and entertainment companies in Mumbai.", rating: 5 },
      { name: "Amit Patel", position: "Managing Director", company: "Real Estate Firm, South Mumbai", text: "Perfect partner for our construction and real estate HR needs. Their knowledge of industry-specific compliance and talent requirements is invaluable.", rating: 5 }
    ]
  },

  delhi: {
    name: "Delhi",
    description: "Transform your business with cutting-edge HR solutions. From Connaught Place to Gurgaon's corporate hub, we deliver premium HR services that align with Delhi NCR's dynamic business landscape.",
    stats: [
      { number: "200+", label: "Delhi Companies Served" },
      { number: "70+", label: "Corporate Clients" },
      { number: "40+", label: "Government Sector" },
      { number: "20,000+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Building, title: "Government Hub Expertise", description: "Deep understanding of government sector, PSUs, and regulatory compliance requirements" },
      { icon: Briefcase, title: "Corporate Center Knowledge", description: "Extensive experience with Delhi's corporate headquarters and multinational companies" },
      { icon: TrendingUp, title: "NCR Business Ecosystem", description: "Comprehensive coverage of Delhi NCR including Gurgaon, Noida, and Faridabad" },
      { icon: Globe, title: "International Business", description: "Understanding of international business requirements and diplomatic community needs" },
      { icon: Shield, title: "Regulatory Compliance", description: "Expert knowledge of central government regulations and compliance frameworks" },
      { icon: Zap, title: "Political Capital Advantage", description: "Experience with policy-driven businesses and government relations requirements" }
    ],
    services: [
      {
        title: "Government Sector HR",
        description: "Specialized HR solutions for government departments, PSUs, and policy organizations",
        icon: Building,
        features: ["Government official recruitment", "PSU employee management", "Policy organization staffing", "Regulatory compliance hiring", "Public sector training programs", "Government relations support"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Corporate Headquarters HR",
        description: "Comprehensive HR support for Delhi's corporate headquarters and multinational companies",
        icon: Briefcase,
        features: ["Corporate executive recruitment", "Multinational company support", "Headquarters team building", "International compliance management", "Corporate training programs", "Executive search services"],
        link: "/services/hr-compliance"
      },
      {
        title: "NCR Business HR",
        description: "Complete HR solutions for Delhi NCR including Gurgaon, Noida, and Faridabad",
        icon: MapPin,
        features: ["NCR business expansion support", "Multi-location HR management", "Regional compliance coordination", "Cross-border team building", "NCR talent acquisition", "Regional training programs"],
        link: "/services/performance-management"
      },
      {
        title: "International Business HR",
        description: "Specialized HR services for international companies and diplomatic missions",
        icon: Globe,
        features: ["International company support", "Diplomatic mission staffing", "Cross-cultural team management", "International compliance coordination", "Expatriate support services", "Global business training"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Government & PSUs", description: "Government departments, public sector units, and policy organizations", companies: "Various government departments, PSUs, policy think tanks" },
      { name: "Corporate Headquarters", description: "Corporate headquarters and multinational company offices", companies: "Fortune 500 companies, Indian corporate headquarters" },
      { name: "Information Technology", description: "IT services, software development, and technology companies", companies: "NCR tech companies, Gurgaon IT firms, Noida software companies" },
      { name: "Financial Services", description: "Banking, insurance, and financial services", companies: "RBI, major banks, insurance companies, financial institutions" },
      { name: "Media & Communications", description: "Media houses, publishing, and communications", companies: "Major media houses, publishing companies, PR firms" },
      { name: "Education & Research", description: "Educational institutions, research organizations, and think tanks", companies: "Universities, research institutes, policy organizations" }
    ],
    testimonials: [
      { name: "Dr. Meera Singh", position: "Director", company: "Government Research Institute, Delhi", text: "Their understanding of government sector requirements and compliance is exceptional. Helped us navigate complex regulatory requirements while building a strong research team.", rating: 5 },
      { name: "Vikram Malhotra", position: "VP HR", company: "Multinational Corporation, Gurgaon", text: "Outstanding expertise in corporate HR and international compliance. They understand the unique challenges of managing multinational teams in Delhi NCR.", rating: 5 },
      { name: "Anjali Gupta", position: "CEO", company: "Tech Startup, Noida", text: "Perfect partner for our NCR expansion. Their knowledge of the regional talent market and compliance requirements helped us scale efficiently across multiple locations.", rating: 5 }
    ]
  },

  bangalore: {
    name: "Bangalore",
    description: "Accelerate your business with innovative HR solutions. From Electronic City to Whitefield's tech corridor, we deliver premium HR services that align with Bangalore's dynamic startup and technology landscape.",
    stats: [
      { number: "180+", label: "Bangalore Companies Served" },
      { number: "65+", label: "Tech Startups" },
      { number: "35+", label: "Product Companies" },
      { number: "22,000+", label: "Tech Professionals Hired" }
    ],
    advantages: [
      { icon: Cpu, title: "Tech Hub Expertise", description: "Deep understanding of Bangalore's technology ecosystem and startup culture" },
      { icon: Rocket, title: "Startup Ecosystem Knowledge", description: "Extensive experience with Bangalore's vibrant startup and product company community" },
      { icon: Database, title: "Product Development Focus", description: "Proven expertise in supporting product companies and engineering teams" },
      { icon: Globe, title: "Global Tech Center", description: "Understanding of global technology companies and R&D center requirements" },
      { icon: Shield, title: "Innovation Compliance", description: "Knowledge of IP protection, innovation compliance, and tech industry regulations" },
      { icon: Zap, title: "Agile Environment", description: "Experience with agile methodologies and fast-paced tech development cycles" }
    ],
    services: [
      {
        title: "Tech Startup HR",
        description: "Specialized HR solutions for Bangalore's vibrant startup ecosystem",
        icon: Rocket,
        features: ["Startup HR foundation setup", "Tech talent acquisition", "Equity and ESOP management", "Scaling HR infrastructure", "Startup compliance management", "Investor-ready HR processes"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Product Company HR",
        description: "Comprehensive HR support for product development and engineering companies",
        icon: Cpu,
        features: ["Engineering team recruitment", "Product manager hiring", "Technical leadership development", "Innovation culture building", "IP protection compliance", "Technical training programs"],
        link: "/services/hr-compliance"
      },
      {
        title: "Global Tech Center HR",
        description: "Complete HR solutions for multinational technology companies and R&D centers",
        icon: Globe,
        features: ["Global tech company support", "R&D center management", "International team coordination", "Global compliance management", "Cross-cultural training", "International talent acquisition"],
        link: "/services/performance-management"
      },
      {
        title: "Fintech & E-commerce HR",
        description: "Specialized HR services for fintech, e-commerce, and digital commerce companies",
        icon: Database,
        features: ["Fintech specialist recruitment", "E-commerce team building", "Digital payment expertise hiring", "Customer experience team management", "Data analytics specialist sourcing", "Digital transformation support"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Information Technology", description: "Software development, IT services, and technology consulting", companies: "Infosys, Wipro, TCS, Accenture, Cognizant, tech startups" },
      { name: "Product Companies", description: "Software products, SaaS, and technology products", companies: "Microsoft, Google, Amazon, Oracle, product startups" },
      { name: "Fintech & E-commerce", description: "Financial technology, digital payments, and e-commerce", companies: "Razorpay, PhonePe, Flipkart, Amazon, fintech startups" },
      { name: "Biotechnology & Healthcare", description: "Biotech research, healthcare technology, and life sciences", companies: "Biocon, healthcare startups, research institutes" },
      { name: "Aerospace & Defense", description: "Aerospace engineering, defense technology, and research", companies: "ISRO, HAL, DRDO, aerospace companies" },
      { name: "Education Technology", description: "EdTech platforms, online education, and learning technology", companies: "Byju's, Unacademy, edtech startups" }
    ],
    testimonials: [
      { name: "Arjun Reddy", position: "CTO", company: "Tech Startup, Electronic City", text: "Their understanding of Bangalore's tech ecosystem and startup culture is exceptional. Helped us build a world-class engineering team that drives innovation.", rating: 5 },
      { name: "Priya Iyer", position: "VP Engineering", company: "Product Company, Whitefield", text: "Outstanding expertise in product company recruitment. They understand the unique requirements of building and scaling engineering teams for product development.", rating: 5 },
      { name: "Rahul Sharma", position: "CEO", company: "Fintech Startup, Koramangala", text: "Perfect partner for our fintech HR needs. Their knowledge of the fintech talent market and compliance requirements helped us scale rapidly.", rating: 5 }
    ]
  },

  hyderabad: {
    name: "Hyderabad",
    description: "Elevate your business with sophisticated HR solutions. From HITEC City's tech hub to Banjara Hills' corporate district, we deliver premium HR services that align with Hyderabad's dynamic business landscape.",
    stats: [
      { number: "180+", label: "Hyderabad Companies Served" },
      { number: "60+", label: "IT Services Firms" },
      { number: "35+", label: "Pharma Companies" },
      { number: "18,000+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Cpu, title: "IT Services Capital", description: "Deep expertise in IT services, software development, and tech consulting" },
      { icon: Database, title: "Pharma Valley Expertise", description: "Specialized knowledge of pharmaceutical, biotech, and life sciences sector" },
      { icon: Globe, title: "Global Delivery Centers", description: "Understanding of global delivery models and offshore development centers" },
      { icon: Building, title: "HITEC City Knowledge", description: "Comprehensive understanding of Cyberabad and HITEC City business ecosystem" },
      { icon: TrendingUp, title: "Growth Hub Experience", description: "Proven expertise in supporting rapidly growing companies and expansions" },
      { icon: Shield, title: "Telangana Compliance", description: "Expert knowledge of Telangana state regulations and business requirements" }
    ],
    services: [
      {
        title: "IT Services & Software HR",
        description: "Specialized HR solutions for IT services companies and software development firms",
        icon: Cpu,
        features: ["Software engineer recruitment", "IT delivery team management", "Global client interface training", "Offshore development center setup", "Quality assurance team building", "Technical project management hiring"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Pharmaceutical & Biotech HR",
        description: "Comprehensive HR support for pharma, biotech, and life sciences organizations",
        icon: Database,
        features: ["Pharma scientist recruitment", "Regulatory affairs staffing", "Clinical research team building", "Quality control specialist hiring", "Drug development team management", "Compliance and validation training"],
        link: "/services/hr-compliance"
      },
      {
        title: "Data Analytics & AI HR",
        description: "Advanced HR services for data science, analytics, and AI companies",
        icon: Brain,
        features: ["Data scientist recruitment", "AI/ML engineer hiring", "Business intelligence team building", "Analytics consultant sourcing", "Data engineering specialist recruitment", "Research scientist acquisition"],
        link: "/services/performance-management"
      },
      {
        title: "Global Delivery Center HR",
        description: "Complete HR solutions for multinational delivery centers and captive units",
        icon: Globe,
        features: ["Global delivery model setup", "Cross-cultural team management", "24/7 operations support", "International client communication training", "Time zone management strategies", "Global compliance coordination"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Information Technology", description: "Software services, product development, and IT consulting", companies: "Microsoft, Google, Facebook, Amazon, Infosys, TCS, Wipro, Tech Mahindra, Cognizant" },
      { name: "Pharmaceutical & Biotech", description: "Drug development, research, and pharmaceutical manufacturing", companies: "Dr. Reddy's, Aurobindo Pharma, Biological E, Bharat Biotech, Hetero" },
      { name: "Life Sciences & Research", description: "Biotechnology research and life sciences organizations", companies: "CCMB, CDRI, NIN, various research institutes and biotech startups" },
      { name: "Financial Services & Fintech", description: "Banking, insurance, and financial technology companies", companies: "ICICI Bank, HDFC, various fintech startups and financial services" },
      { name: "Aerospace & Defense", description: "Aerospace engineering, defense technology, and research", companies: "DRDO, HAL, Bharat Dynamics, defense contractors" },
      { name: "Data Analytics & AI", description: "Data science, analytics, and artificial intelligence companies", companies: "Analytics companies, AI startups, data consulting firms" }
    ],
    testimonials: [
      { name: "Venkat Reddy", position: "VP Engineering", company: "IT Services Company, HITEC City", text: "Their understanding of IT services delivery models and global client requirements is exceptional. Helped us scale our engineering teams across multiple time zones effectively.", rating: 5 },
      { name: "Dr. Priya Sharma", position: "Head of HR", company: "Pharmaceutical Company, Genome Valley", text: "Outstanding expertise in pharma industry requirements. Their support in recruiting regulatory affairs specialists and clinical researchers has been invaluable for our drug development programs.", rating: 5 },
      { name: "Rahul Krishna", position: "Chief Data Officer", company: "Analytics Firm, Gachibowli", text: "Perfect partner for building our data science teams. They understand the nuances of hiring data scientists, ML engineers, and analytics consultants in Hyderabad's competitive market.", rating: 5 }
    ]
  },

  chennai: {
    name: "Chennai",
    description: "Transform your business with innovative HR solutions. From Tidel Park to OMR's tech corridor, we deliver premium HR services that align with Chennai's dynamic business landscape.",
    stats: [
      { number: "150+", label: "Chennai Companies Served" },
      { number: "45+", label: "IT Services Firms" },
      { number: "30+", label: "Manufacturing Companies" },
      { number: "15,000+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Cpu, title: "IT Services Hub", description: "Deep expertise in IT services, software development, and tech consulting" },
      { icon: Building, title: "Manufacturing Center", description: "Extensive experience with Chennai's manufacturing and automotive sector" },
      { icon: Globe, title: "Global Delivery", description: "Understanding of global delivery models and offshore development centers" },
      { icon: Shield, title: "Tamil Nadu Compliance", description: "Expert knowledge of Tamil Nadu state regulations and business requirements" },
      { icon: TrendingUp, title: "Growth Market", description: "Proven expertise in supporting rapidly growing companies and expansions" },
      { icon: Zap, title: "Cost-Effective Solutions", description: "Experience with cost-effective business solutions and operational efficiency" }
    ],
    services: [
      {
        title: "IT Services & Software HR",
        description: "Specialized HR solutions for IT services companies and software development firms",
        icon: Cpu,
        features: ["Software engineer recruitment", "IT delivery team management", "Global client interface training", "Offshore development center setup", "Quality assurance team building", "Technical project management hiring"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Manufacturing & Automotive HR",
        description: "Comprehensive HR support for manufacturing and automotive companies",
        icon: Building,
        features: ["Manufacturing specialist recruitment", "Automotive engineer hiring", "Production team management", "Quality control specialist sourcing", "Supply chain professional recruitment", "Industrial safety training"],
        link: "/services/hr-compliance"
      },
      {
        title: "Financial Services HR",
        description: "Complete HR solutions for banking, insurance, and financial services",
        icon: Database,
        features: ["Banking professional recruitment", "Insurance specialist hiring", "Financial analyst sourcing", "Risk management team building", "Compliance specialist recruitment", "Financial services training"],
        link: "/services/performance-management"
      },
      {
        title: "Healthcare & Pharma HR",
        description: "Specialized HR services for healthcare and pharmaceutical companies",
        icon: Shield,
        features: ["Healthcare professional recruitment", "Pharma specialist hiring", "Clinical research team building", "Medical device specialist sourcing", "Healthcare compliance management", "Medical training programs"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Information Technology", description: "Software services, product development, and IT consulting", companies: "TCS, Infosys, Wipro, Cognizant, HCL, tech startups" },
      { name: "Manufacturing & Automotive", description: "Automotive manufacturing, industrial production, and engineering", companies: "Ford, Hyundai, Renault, manufacturing companies" },
      { name: "Financial Services", description: "Banking, insurance, and financial technology", companies: "Major banks, insurance companies, financial institutions" },
      { name: "Healthcare & Pharmaceuticals", description: "Healthcare services, pharmaceutical companies, and medical devices", companies: "Apollo Hospitals, healthcare companies, pharma firms" },
      { name: "Logistics & Transportation", description: "Shipping, logistics, and transportation services", companies: "Chennai Port, logistics companies, transportation firms" },
      { name: "Education & Training", description: "Educational institutions, training centers, and skill development", companies: "Universities, training institutes, skill development centers" }
    ],
    testimonials: [
      { name: "Rajesh Kumar", position: "VP Engineering", company: "IT Services Company, Tidel Park", text: "Their understanding of Chennai's IT ecosystem and global delivery models is exceptional. Helped us build world-class engineering teams.", rating: 5 },
      { name: "Priya Sharma", position: "HR Director", company: "Manufacturing Company, OMR", text: "Outstanding expertise in manufacturing industry recruitment. They understand the unique requirements of automotive and manufacturing companies.", rating: 5 },
      { name: "Amit Patel", position: "CEO", company: "Financial Services Firm, Chennai", text: "Perfect partner for our financial services HR needs. Their knowledge of the industry and compliance requirements helped us scale efficiently.", rating: 5 }
    ]
  },

  pune: {
    name: "Pune",
    description: "Accelerate your business with cutting-edge HR solutions. From Hinjewadi's tech hub to Kharadi's corporate district, we deliver premium HR services that align with Pune's dynamic business landscape.",
    stats: [
      { number: "120+", label: "Pune Companies Served" },
      { number: "40+", label: "IT Services Firms" },
      { number: "25+", label: "Automotive Companies" },
      { number: "12,000+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Cpu, title: "Tech Hub Expertise", description: "Deep understanding of Pune's technology ecosystem and startup culture" },
      { icon: Building, title: "Automotive Center", description: "Extensive experience with Pune's automotive and manufacturing sector" },
      { icon: Rocket, title: "Startup Ecosystem", description: "Proven expertise in supporting startups and emerging companies" },
      { icon: Shield, title: "Maharashtra Compliance", description: "Expert knowledge of Maharashtra state regulations and business requirements" },
      { icon: TrendingUp, title: "Growth Market", description: "Experience with rapidly growing companies and scaling strategies" },
      { icon: Zap, title: "Cost-Effective Solutions", description: "Understanding of cost-effective business solutions and operational efficiency" }
    ],
    services: [
      {
        title: "IT Services & Software HR",
        description: "Specialized HR solutions for IT services companies and software development firms",
        icon: Cpu,
        features: ["Software engineer recruitment", "IT delivery team management", "Global client interface training", "Offshore development center setup", "Quality assurance team building", "Technical project management hiring"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Automotive & Manufacturing HR",
        description: "Comprehensive HR support for automotive and manufacturing companies",
        icon: Building,
        features: ["Automotive engineer recruitment", "Manufacturing specialist hiring", "Production team management", "Quality control specialist sourcing", "Supply chain professional recruitment", "Industrial safety training"],
        link: "/services/hr-compliance"
      },
      {
        title: "Startup & SME HR",
        description: "Complete HR solutions for startups and small to medium enterprises",
        icon: Rocket,
        features: ["Startup HR foundation setup", "SME compliance management", "Talent acquisition strategies", "Employee engagement programs", "Performance management systems", "Scaling HR infrastructure"],
        link: "/services/performance-management"
      },
      {
        title: "Education & Training HR",
        description: "Specialized HR services for educational institutions and training companies",
        icon: BookOpen,
        features: ["Educational professional recruitment", "Training specialist hiring", "Academic team building", "Skill development specialist sourcing", "Educational compliance management", "Training program development"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Information Technology", description: "Software services, product development, and IT consulting", companies: "Infosys, Wipro, TCS, Tech Mahindra, Persistent, tech startups" },
      { name: "Automotive & Manufacturing", description: "Automotive manufacturing, industrial production, and engineering", companies: "Bajaj Auto, Tata Motors, automotive companies" },
      { name: "Startups & SMEs", description: "Technology startups, small businesses, and emerging companies", companies: "Various startups, SMEs, emerging companies" },
      { name: "Education & Training", description: "Educational institutions, training centers, and skill development", companies: "Universities, training institutes, skill development centers" },
      { name: "Financial Services", description: "Banking, insurance, and financial technology", companies: "Banks, insurance companies, financial institutions" },
      { name: "Healthcare & Pharmaceuticals", description: "Healthcare services, pharmaceutical companies, and medical devices", companies: "Healthcare companies, pharma firms, medical device companies" }
    ],
    testimonials: [
      { name: "Arjun Reddy", position: "CTO", company: "Tech Startup, Hinjewadi", text: "Their understanding of Pune's tech ecosystem and startup culture is exceptional. Helped us build a world-class engineering team.", rating: 5 },
      { name: "Priya Iyer", position: "HR Director", company: "Automotive Company, Kharadi", text: "Outstanding expertise in automotive industry recruitment. They understand the unique requirements of manufacturing companies.", rating: 5 },
      { name: "Rahul Sharma", position: "CEO", company: "SME, Pune", text: "Perfect partner for our SME HR needs. Their knowledge of scaling strategies and compliance requirements helped us grow efficiently.", rating: 5 }
    ]
  },

  kolkata: {
    name: "Kolkata",
    description: "Transform your business with innovative HR solutions. From Salt Lake's tech hub to New Town's corporate district, we deliver premium HR services that align with Kolkata's dynamic business landscape.",
    stats: [
      { number: "100+", label: "Kolkata Companies Served" },
      { number: "35+", label: "IT Services Firms" },
      { number: "20+", label: "Financial Companies" },
      { number: "10,000+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Cpu, title: "IT Services Hub", description: "Deep expertise in IT services, software development, and tech consulting" },
      { icon: Database, title: "Financial Center", description: "Extensive experience with Kolkata's financial services and banking sector" },
      { icon: Building, title: "Manufacturing Hub", description: "Understanding of manufacturing and industrial sector requirements" },
      { icon: Shield, title: "West Bengal Compliance", description: "Expert knowledge of West Bengal state regulations and business requirements" },
      { icon: TrendingUp, title: "Growth Market", description: "Proven expertise in supporting rapidly growing companies and expansions" },
      { icon: Zap, title: "Cost-Effective Solutions", description: "Experience with cost-effective business solutions and operational efficiency" }
    ],
    services: [
      {
        title: "IT Services & Software HR",
        description: "Specialized HR solutions for IT services companies and software development firms",
        icon: Cpu,
        features: ["Software engineer recruitment", "IT delivery team management", "Global client interface training", "Offshore development center setup", "Quality assurance team building", "Technical project management hiring"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Financial Services HR",
        description: "Comprehensive HR support for banking, insurance, and financial services",
        icon: Database,
        features: ["Banking professional recruitment", "Insurance specialist hiring", "Financial analyst sourcing", "Risk management team building", "Compliance specialist recruitment", "Financial services training"],
        link: "/services/hr-compliance"
      },
      {
        title: "Manufacturing & Industrial HR",
        description: "Complete HR solutions for manufacturing and industrial companies",
        icon: Building,
        features: ["Manufacturing specialist recruitment", "Industrial engineer hiring", "Production team management", "Quality control specialist sourcing", "Supply chain professional recruitment", "Industrial safety training"],
        link: "/services/performance-management"
      },
      {
        title: "Education & Training HR",
        description: "Specialized HR services for educational institutions and training companies",
        icon: BookOpen,
        features: ["Educational professional recruitment", "Training specialist hiring", "Academic team building", "Skill development specialist sourcing", "Educational compliance management", "Training program development"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Information Technology", description: "Software services, product development, and IT consulting", companies: "TCS, Wipro, Cognizant, tech startups" },
      { name: "Financial Services", description: "Banking, insurance, and financial technology", companies: "SBI, UBI, insurance companies, financial institutions" },
      { name: "Manufacturing & Industrial", description: "Manufacturing, industrial production, and engineering", companies: "Manufacturing companies, industrial firms" },
      { name: "Education & Training", description: "Educational institutions, training centers, and skill development", companies: "Universities, training institutes, skill development centers" },
      { name: "Healthcare & Pharmaceuticals", description: "Healthcare services, pharmaceutical companies, and medical devices", companies: "Healthcare companies, pharma firms, medical device companies" },
      { name: "Logistics & Transportation", description: "Shipping, logistics, and transportation services", companies: "Kolkata Port, logistics companies, transportation firms" }
    ],
    testimonials: [
      { name: "Rajesh Kumar", position: "VP Engineering", company: "IT Services Company, Salt Lake", text: "Their understanding of Kolkata's IT ecosystem and global delivery models is exceptional. Helped us build world-class engineering teams.", rating: 5 },
      { name: "Priya Sharma", position: "HR Director", company: "Financial Services Firm, Kolkata", text: "Outstanding expertise in financial services recruitment. They understand the unique requirements of banking and insurance companies.", rating: 5 },
      { name: "Amit Patel", position: "CEO", company: "Manufacturing Company, New Town", text: "Perfect partner for our manufacturing HR needs. Their knowledge of the industry and compliance requirements helped us scale efficiently.", rating: 5 }
    ]
  },

  ahmedabad: {
    name: "Ahmedabad",
    description: "Accelerate your business with cutting-edge HR solutions. From SG Road's tech hub to Vastrapur's corporate district, we deliver premium HR services that align with Ahmedabad's dynamic business landscape.",
    stats: [
      { number: "80+", label: "Ahmedabad Companies Served" },
      { number: "25+", label: "IT Services Firms" },
      { number: "20+", label: "Manufacturing Companies" },
      { number: "8,000+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Cpu, title: "Tech Hub Expertise", description: "Deep understanding of Ahmedabad's technology ecosystem and startup culture" },
      { icon: Building, title: "Manufacturing Center", description: "Extensive experience with Ahmedabad's manufacturing and industrial sector" },
      { icon: Rocket, title: "Startup Ecosystem", description: "Proven expertise in supporting startups and emerging companies" },
      { icon: Shield, title: "Gujarat Compliance", description: "Expert knowledge of Gujarat state regulations and business requirements" },
      { icon: TrendingUp, title: "Growth Market", description: "Experience with rapidly growing companies and scaling strategies" },
      { icon: Zap, title: "Cost-Effective Solutions", description: "Understanding of cost-effective business solutions and operational efficiency" }
    ],
    services: [
      {
        title: "IT Services & Software HR",
        description: "Specialized HR solutions for IT services companies and software development firms",
        icon: Cpu,
        features: ["Software engineer recruitment", "IT delivery team management", "Global client interface training", "Offshore development center setup", "Quality assurance team building", "Technical project management hiring"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Manufacturing & Industrial HR",
        description: "Comprehensive HR support for manufacturing and industrial companies",
        icon: Building,
        features: ["Manufacturing specialist recruitment", "Industrial engineer hiring", "Production team management", "Quality control specialist sourcing", "Supply chain professional recruitment", "Industrial safety training"],
        link: "/services/hr-compliance"
      },
      {
        title: "Startup & SME HR",
        description: "Complete HR solutions for startups and small to medium enterprises",
        icon: Rocket,
        features: ["Startup HR foundation setup", "SME compliance management", "Talent acquisition strategies", "Employee engagement programs", "Performance management systems", "Scaling HR infrastructure"],
        link: "/services/performance-management"
      },
      {
        title: "Textile & Apparel HR",
        description: "Specialized HR services for textile and apparel companies",
        icon: Shield,
        features: ["Textile specialist recruitment", "Apparel designer hiring", "Production team management", "Quality control specialist sourcing", "Supply chain professional recruitment", "Textile compliance management"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Information Technology", description: "Software services, product development, and IT consulting", companies: "Tech startups, IT services companies" },
      { name: "Manufacturing & Industrial", description: "Manufacturing, industrial production, and engineering", companies: "Manufacturing companies, industrial firms" },
      { name: "Textile & Apparel", description: "Textile manufacturing, apparel design, and fashion", companies: "Textile companies, apparel manufacturers, fashion firms" },
      { name: "Startups & SMEs", description: "Technology startups, small businesses, and emerging companies", companies: "Various startups, SMEs, emerging companies" },
      { name: "Financial Services", description: "Banking, insurance, and financial technology", companies: "Banks, insurance companies, financial institutions" },
      { name: "Healthcare & Pharmaceuticals", description: "Healthcare services, pharmaceutical companies, and medical devices", companies: "Healthcare companies, pharma firms, medical device companies" }
    ],
    testimonials: [
      { name: "Arjun Reddy", position: "CTO", company: "Tech Startup, SG Road", text: "Their understanding of Ahmedabad's tech ecosystem and startup culture is exceptional. Helped us build a world-class engineering team.", rating: 5 },
      { name: "Priya Iyer", position: "HR Director", company: "Manufacturing Company, Vastrapur", text: "Outstanding expertise in manufacturing industry recruitment. They understand the unique requirements of industrial companies.", rating: 5 },
      { name: "Rahul Sharma", position: "CEO", company: "Textile Company, Ahmedabad", text: "Perfect partner for our textile industry HR needs. Their knowledge of the sector and compliance requirements helped us scale efficiently.", rating: 5 }
    ]
  },

  bhubaneswar: {
    name: "Bhubaneswar",
    description: "Transform your business with innovative HR solutions. From Infocity's tech hub to Patia's corporate district, we deliver premium HR services that align with Bhubaneswar's dynamic business landscape.",
    stats: [
      { number: "60+", label: "Bhubaneswar Companies Served" },
      { number: "20+", label: "IT Services Firms" },
      { number: "15+", label: "Government Sector" },
      { number: "5,000+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Cpu, title: "Tech Hub Expertise", description: "Deep understanding of Bhubaneswar's technology ecosystem and startup culture" },
      { icon: Building, title: "Government Center", description: "Extensive experience with government sector and PSU requirements" },
      { icon: Rocket, title: "Startup Ecosystem", description: "Proven expertise in supporting startups and emerging companies" },
      { icon: Shield, title: "Odisha Compliance", description: "Expert knowledge of Odisha state regulations and business requirements" },
      { icon: TrendingUp, title: "Growth Market", description: "Experience with rapidly growing companies and scaling strategies" },
      { icon: Zap, title: "Cost-Effective Solutions", description: "Understanding of cost-effective business solutions and operational efficiency" }
    ],
    services: [
      {
        title: "IT Services & Software HR",
        description: "Specialized HR solutions for IT services companies and software development firms",
        icon: Cpu,
        features: ["Software engineer recruitment", "IT delivery team management", "Global client interface training", "Offshore development center setup", "Quality assurance team building", "Technical project management hiring"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Government Sector HR",
        description: "Comprehensive HR support for government departments and PSUs",
        icon: Building,
        features: ["Government official recruitment", "PSU employee management", "Policy organization staffing", "Regulatory compliance hiring", "Public sector training programs", "Government relations support"],
        link: "/services/hr-compliance"
      },
      {
        title: "Startup & SME HR",
        description: "Complete HR solutions for startups and small to medium enterprises",
        icon: Rocket,
        features: ["Startup HR foundation setup", "SME compliance management", "Talent acquisition strategies", "Employee engagement programs", "Performance management systems", "Scaling HR infrastructure"],
        link: "/services/performance-management"
      },
      {
        title: "Education & Training HR",
        description: "Specialized HR services for educational institutions and training companies",
        icon: BookOpen,
        features: ["Educational professional recruitment", "Training specialist hiring", "Academic team building", "Skill development specialist sourcing", "Educational compliance management", "Training program development"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Information Technology", description: "Software services, product development, and IT consulting", companies: "Tech startups, IT services companies" },
      { name: "Government & PSUs", description: "Government departments, public sector units, and policy organizations", companies: "Various government departments, PSUs, policy organizations" },
      { name: "Startups & SMEs", description: "Technology startups, small businesses, and emerging companies", companies: "Various startups, SMEs, emerging companies" },
      { name: "Education & Training", description: "Educational institutions, training centers, and skill development", companies: "Universities, training institutes, skill development centers" },
      { name: "Financial Services", description: "Banking, insurance, and financial technology", companies: "Banks, insurance companies, financial institutions" },
      { name: "Healthcare & Pharmaceuticals", description: "Healthcare services, pharmaceutical companies, and medical devices", companies: "Healthcare companies, pharma firms, medical device companies" }
    ],
    testimonials: [
      { name: "Arjun Reddy", position: "CTO", company: "Tech Startup, Infocity", text: "Their understanding of Bhubaneswar's tech ecosystem and startup culture is exceptional. Helped us build a world-class engineering team.", rating: 5 },
      { name: "Priya Iyer", position: "HR Director", company: "Government Department, Bhubaneswar", text: "Outstanding expertise in government sector recruitment. They understand the unique requirements of public sector organizations.", rating: 5 },
      { name: "Rahul Sharma", position: "CEO", company: "SME, Patia", text: "Perfect partner for our SME HR needs. Their knowledge of scaling strategies and compliance requirements helped us grow efficiently.", rating: 5 }
    ]
  },

  coimbatore: {
    name: "Coimbatore",
    description: "Accelerate your business with cutting-edge HR solutions. From Peelamedu's tech hub to Race Course's corporate district, we deliver premium HR services that align with Coimbatore's dynamic business landscape.",
    stats: [
      { number: "50+", label: "Coimbatore Companies Served" },
      { number: "15+", label: "IT Services Firms" },
      { number: "20+", label: "Manufacturing Companies" },
      { number: "4,000+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Cpu, title: "Tech Hub Expertise", description: "Deep understanding of Coimbatore's technology ecosystem and startup culture" },
      { icon: Building, title: "Manufacturing Center", description: "Extensive experience with Coimbatore's manufacturing and textile sector" },
      { icon: Rocket, title: "Startup Ecosystem", description: "Proven expertise in supporting startups and emerging companies" },
      { icon: Shield, title: "Tamil Nadu Compliance", description: "Expert knowledge of Tamil Nadu state regulations and business requirements" },
      { icon: TrendingUp, title: "Growth Market", description: "Experience with rapidly growing companies and scaling strategies" },
      { icon: Zap, title: "Cost-Effective Solutions", description: "Understanding of cost-effective business solutions and operational efficiency" }
    ],
    services: [
      {
        title: "IT Services & Software HR",
        description: "Specialized HR solutions for IT services companies and software development firms",
        icon: Cpu,
        features: ["Software engineer recruitment", "IT delivery team management", "Global client interface training", "Offshore development center setup", "Quality assurance team building", "Technical project management hiring"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Manufacturing & Textile HR",
        description: "Comprehensive HR support for manufacturing and textile companies",
        icon: Building,
        features: ["Manufacturing specialist recruitment", "Textile engineer hiring", "Production team management", "Quality control specialist sourcing", "Supply chain professional recruitment", "Industrial safety training"],
        link: "/services/hr-compliance"
      },
      {
        title: "Startup & SME HR",
        description: "Complete HR solutions for startups and small to medium enterprises",
        icon: Rocket,
        features: ["Startup HR foundation setup", "SME compliance management", "Talent acquisition strategies", "Employee engagement programs", "Performance management systems", "Scaling HR infrastructure"],
        link: "/services/performance-management"
      },
      {
        title: "Education & Training HR",
        description: "Specialized HR services for educational institutions and training companies",
        icon: BookOpen,
        features: ["Educational professional recruitment", "Training specialist hiring", "Academic team building", "Skill development specialist sourcing", "Educational compliance management", "Training program development"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Information Technology", description: "Software services, product development, and IT consulting", companies: "Tech startups, IT services companies" },
      { name: "Manufacturing & Textile", description: "Manufacturing, textile production, and industrial engineering", companies: "Manufacturing companies, textile firms, industrial companies" },
      { name: "Startups & SMEs", description: "Technology startups, small businesses, and emerging companies", companies: "Various startups, SMEs, emerging companies" },
      { name: "Education & Training", description: "Educational institutions, training centers, and skill development", companies: "Universities, training institutes, skill development centers" },
      { name: "Financial Services", description: "Banking, insurance, and financial technology", companies: "Banks, insurance companies, financial institutions" },
      { name: "Healthcare & Pharmaceuticals", description: "Healthcare services, pharmaceutical companies, and medical devices", companies: "Healthcare companies, pharma firms, medical device companies" }
    ],
    testimonials: [
      { name: "Arjun Reddy", position: "CTO", company: "Tech Startup, Peelamedu", text: "Their understanding of Coimbatore's tech ecosystem and startup culture is exceptional. Helped us build a world-class engineering team.", rating: 5 },
      { name: "Priya Iyer", position: "HR Director", company: "Manufacturing Company, Race Course", text: "Outstanding expertise in manufacturing industry recruitment. They understand the unique requirements of textile and manufacturing companies.", rating: 5 },
      { name: "Rahul Sharma", position: "CEO", company: "SME, Coimbatore", text: "Perfect partner for our SME HR needs. Their knowledge of scaling strategies and compliance requirements helped us grow efficiently.", rating: 5 }
    ]
  },

  indore: {
    name: "Indore",
    description: "Transform your business with innovative HR solutions. From Vijay Nagar's tech hub to Palasia's corporate district, we deliver premium HR services that align with Indore's dynamic business landscape.",
    stats: [
      { number: "40+", label: "Indore Companies Served" },
      { number: "12+", label: "IT Services Firms" },
      { number: "15+", label: "Manufacturing Companies" },
      { number: "3,000+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Cpu, title: "Tech Hub Expertise", description: "Deep understanding of Indore's technology ecosystem and startup culture" },
      { icon: Building, title: "Manufacturing Center", description: "Extensive experience with Indore's manufacturing and industrial sector" },
      { icon: Rocket, title: "Startup Ecosystem", description: "Proven expertise in supporting startups and emerging companies" },
      { icon: Shield, title: "Madhya Pradesh Compliance", description: "Expert knowledge of Madhya Pradesh state regulations and business requirements" },
      { icon: TrendingUp, title: "Growth Market", description: "Experience with rapidly growing companies and scaling strategies" },
      { icon: Zap, title: "Cost-Effective Solutions", description: "Understanding of cost-effective business solutions and operational efficiency" }
    ],
    services: [
      {
        title: "IT Services & Software HR",
        description: "Specialized HR solutions for IT services companies and software development firms",
        icon: Cpu,
        features: ["Software engineer recruitment", "IT delivery team management", "Global client interface training", "Offshore development center setup", "Quality assurance team building", "Technical project management hiring"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Manufacturing & Industrial HR",
        description: "Comprehensive HR support for manufacturing and industrial companies",
        icon: Building,
        features: ["Manufacturing specialist recruitment", "Industrial engineer hiring", "Production team management", "Quality control specialist sourcing", "Supply chain professional recruitment", "Industrial safety training"],
        link: "/services/hr-compliance"
      },
      {
        title: "Startup & SME HR",
        description: "Complete HR solutions for startups and small to medium enterprises",
        icon: Rocket,
        features: ["Startup HR foundation setup", "SME compliance management", "Talent acquisition strategies", "Employee engagement programs", "Performance management systems", "Scaling HR infrastructure"],
        link: "/services/performance-management"
      },
      {
        title: "Education & Training HR",
        description: "Specialized HR services for educational institutions and training companies",
        icon: BookOpen,
        features: ["Educational professional recruitment", "Training specialist hiring", "Academic team building", "Skill development specialist sourcing", "Educational compliance management", "Training program development"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Information Technology", description: "Software services, product development, and IT consulting", companies: "Tech startups, IT services companies" },
      { name: "Manufacturing & Industrial", description: "Manufacturing, industrial production, and engineering", companies: "Manufacturing companies, industrial firms" },
      { name: "Startups & SMEs", description: "Technology startups, small businesses, and emerging companies", companies: "Various startups, SMEs, emerging companies" },
      { name: "Education & Training", description: "Educational institutions, training centers, and skill development", companies: "Universities, training institutes, skill development centers" },
      { name: "Financial Services", description: "Banking, insurance, and financial technology", companies: "Banks, insurance companies, financial institutions" },
      { name: "Healthcare & Pharmaceuticals", description: "Healthcare services, pharmaceutical companies, and medical devices", companies: "Healthcare companies, pharma firms, medical device companies" }
    ],
    testimonials: [
      { name: "Arjun Reddy", position: "CTO", company: "Tech Startup, Vijay Nagar", text: "Their understanding of Indore's tech ecosystem and startup culture is exceptional. Helped us build a world-class engineering team.", rating: 5 },
      { name: "Priya Iyer", position: "HR Director", company: "Manufacturing Company, Palasia", text: "Outstanding expertise in manufacturing industry recruitment. They understand the unique requirements of industrial companies.", rating: 5 },
      { name: "Rahul Sharma", position: "CEO", company: "SME, Indore", text: "Perfect partner for our SME HR needs. Their knowledge of scaling strategies and compliance requirements helped us grow efficiently.", rating: 5 }
    ]
  },

  jaipur: {
    name: "Jaipur",
    description: "Accelerate your business with cutting-edge HR solutions. From Malviya Nagar's tech hub to C-Scheme's corporate district, we deliver premium HR services that align with Jaipur's dynamic business landscape.",
    stats: [
      { number: "35+", label: "Jaipur Companies Served" },
      { number: "10+", label: "IT Services Firms" },
      { number: "12+", label: "Tourism Companies" },
      { number: "2,500+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Cpu, title: "Tech Hub Expertise", description: "Deep understanding of Jaipur's technology ecosystem and startup culture" },
      { icon: Building, title: "Tourism Center", description: "Extensive experience with Jaipur's tourism and hospitality sector" },
      { icon: Rocket, title: "Startup Ecosystem", description: "Proven expertise in supporting startups and emerging companies" },
      { icon: Shield, title: "Rajasthan Compliance", description: "Expert knowledge of Rajasthan state regulations and business requirements" },
      { icon: TrendingUp, title: "Growth Market", description: "Experience with rapidly growing companies and scaling strategies" },
      { icon: Zap, title: "Cost-Effective Solutions", description: "Understanding of cost-effective business solutions and operational efficiency" }
    ],
    services: [
      {
        title: "IT Services & Software HR",
        description: "Specialized HR solutions for IT services companies and software development firms",
        icon: Cpu,
        features: ["Software engineer recruitment", "IT delivery team management", "Global client interface training", "Offshore development center setup", "Quality assurance team building", "Technical project management hiring"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Tourism & Hospitality HR",
        description: "Comprehensive HR support for tourism and hospitality companies",
        icon: Building,
        features: ["Tourism specialist recruitment", "Hospitality professional hiring", "Customer service team management", "Tour guide specialist sourcing", "Hotel management professional recruitment", "Tourism compliance management"],
        link: "/services/hr-compliance"
      },
      {
        title: "Startup & SME HR",
        description: "Complete HR solutions for startups and small to medium enterprises",
        icon: Rocket,
        features: ["Startup HR foundation setup", "SME compliance management", "Talent acquisition strategies", "Employee engagement programs", "Performance management systems", "Scaling HR infrastructure"],
        link: "/services/performance-management"
      },
      {
        title: "Education & Training HR",
        description: "Specialized HR services for educational institutions and training companies",
        icon: BookOpen,
        features: ["Educational professional recruitment", "Training specialist hiring", "Academic team building", "Skill development specialist sourcing", "Educational compliance management", "Training program development"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Information Technology", description: "Software services, product development, and IT consulting", companies: "Tech startups, IT services companies" },
      { name: "Tourism & Hospitality", description: "Tourism services, hospitality, and travel companies", companies: "Tourism companies, hotels, travel agencies" },
      { name: "Startups & SMEs", description: "Technology startups, small businesses, and emerging companies", companies: "Various startups, SMEs, emerging companies" },
      { name: "Education & Training", description: "Educational institutions, training centers, and skill development", companies: "Universities, training institutes, skill development centers" },
      { name: "Financial Services", description: "Banking, insurance, and financial technology", companies: "Banks, insurance companies, financial institutions" },
      { name: "Healthcare & Pharmaceuticals", description: "Healthcare services, pharmaceutical companies, and medical devices", companies: "Healthcare companies, pharma firms, medical device companies" }
    ],
    testimonials: [
      { name: "Arjun Reddy", position: "CTO", company: "Tech Startup, Malviya Nagar", text: "Their understanding of Jaipur's tech ecosystem and startup culture is exceptional. Helped us build a world-class engineering team.", rating: 5 },
      { name: "Priya Iyer", position: "HR Director", company: "Tourism Company, C-Scheme", text: "Outstanding expertise in tourism industry recruitment. They understand the unique requirements of hospitality and tourism companies.", rating: 5 },
      { name: "Rahul Sharma", position: "CEO", company: "SME, Jaipur", text: "Perfect partner for our SME HR needs. Their knowledge of scaling strategies and compliance requirements helped us grow efficiently.", rating: 5 }
    ]
  },

  lucknow: {
    name: "Lucknow",
    description: "Transform your business with innovative HR solutions. From Gomti Nagar's tech hub to Hazratganj's corporate district, we deliver premium HR services that align with Lucknow's dynamic business landscape.",
    stats: [
      { number: "30+", label: "Lucknow Companies Served" },
      { number: "8+", label: "IT Services Firms" },
      { number: "10+", label: "Government Sector" },
      { number: "2,000+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Cpu, title: "Tech Hub Expertise", description: "Deep understanding of Lucknow's technology ecosystem and startup culture" },
      { icon: Building, title: "Government Center", description: "Extensive experience with government sector and PSU requirements" },
      { icon: Rocket, title: "Startup Ecosystem", description: "Proven expertise in supporting startups and emerging companies" },
      { icon: Shield, title: "Uttar Pradesh Compliance", description: "Expert knowledge of Uttar Pradesh state regulations and business requirements" },
      { icon: TrendingUp, title: "Growth Market", description: "Experience with rapidly growing companies and scaling strategies" },
      { icon: Zap, title: "Cost-Effective Solutions", description: "Understanding of cost-effective business solutions and operational efficiency" }
    ],
    services: [
      {
        title: "IT Services & Software HR",
        description: "Specialized HR solutions for IT services companies and software development firms",
        icon: Cpu,
        features: ["Software engineer recruitment", "IT delivery team management", "Global client interface training", "Offshore development center setup", "Quality assurance team building", "Technical project management hiring"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Government Sector HR",
        description: "Comprehensive HR support for government departments and PSUs",
        icon: Building,
        features: ["Government official recruitment", "PSU employee management", "Policy organization staffing", "Regulatory compliance hiring", "Public sector training programs", "Government relations support"],
        link: "/services/hr-compliance"
      },
      {
        title: "Startup & SME HR",
        description: "Complete HR solutions for startups and small to medium enterprises",
        icon: Rocket,
        features: ["Startup HR foundation setup", "SME compliance management", "Talent acquisition strategies", "Employee engagement programs", "Performance management systems", "Scaling HR infrastructure"],
        link: "/services/performance-management"
      },
      {
        title: "Education & Training HR",
        description: "Specialized HR services for educational institutions and training companies",
        icon: BookOpen,
        features: ["Educational professional recruitment", "Training specialist hiring", "Academic team building", "Skill development specialist sourcing", "Educational compliance management", "Training program development"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Information Technology", description: "Software services, product development, and IT consulting", companies: "Tech startups, IT services companies" },
      { name: "Government & PSUs", description: "Government departments, public sector units, and policy organizations", companies: "Various government departments, PSUs, policy organizations" },
      { name: "Startups & SMEs", description: "Technology startups, small businesses, and emerging companies", companies: "Various startups, SMEs, emerging companies" },
      { name: "Education & Training", description: "Educational institutions, training centers, and skill development", companies: "Universities, training institutes, skill development centers" },
      { name: "Financial Services", description: "Banking, insurance, and financial technology", companies: "Banks, insurance companies, financial institutions" },
      { name: "Healthcare & Pharmaceuticals", description: "Healthcare services, pharmaceutical companies, and medical devices", companies: "Healthcare companies, pharma firms, medical device companies" }
    ],
    testimonials: [
      { name: "Arjun Reddy", position: "CTO", company: "Tech Startup, Gomti Nagar", text: "Their understanding of Lucknow's tech ecosystem and startup culture is exceptional. Helped us build a world-class engineering team.", rating: 5 },
      { name: "Priya Iyer", position: "HR Director", company: "Government Department, Lucknow", text: "Outstanding expertise in government sector recruitment. They understand the unique requirements of public sector organizations.", rating: 5 },
      { name: "Rahul Sharma", position: "CEO", company: "SME, Hazratganj", text: "Perfect partner for our SME HR needs. Their knowledge of scaling strategies and compliance requirements helped us grow efficiently.", rating: 5 }
    ]
  },

  nagpur: {
    name: "Nagpur",
    description: "Accelerate your business with cutting-edge HR solutions. From MIHAN's tech hub to Civil Lines' corporate district, we deliver premium HR services that align with Nagpur's dynamic business landscape.",
    stats: [
      { number: "25+", label: "Nagpur Companies Served" },
      { number: "6+", label: "IT Services Firms" },
      { number: "8+", label: "Manufacturing Companies" },
      { number: "1,500+", label: "Professionals Hired" }
    ],
    advantages: [
      { icon: Cpu, title: "Tech Hub Expertise", description: "Deep understanding of Nagpur's technology ecosystem and startup culture" },
      { icon: Building, title: "Manufacturing Center", description: "Extensive experience with Nagpur's manufacturing and industrial sector" },
      { icon: Rocket, title: "Startup Ecosystem", description: "Proven expertise in supporting startups and emerging companies" },
      { icon: Shield, title: "Maharashtra Compliance", description: "Expert knowledge of Maharashtra state regulations and business requirements" },
      { icon: TrendingUp, title: "Growth Market", description: "Experience with rapidly growing companies and scaling strategies" },
      { icon: Zap, title: "Cost-Effective Solutions", description: "Understanding of cost-effective business solutions and operational efficiency" }
    ],
    services: [
      {
        title: "IT Services & Software HR",
        description: "Specialized HR solutions for IT services companies and software development firms",
        icon: Cpu,
        features: ["Software engineer recruitment", "IT delivery team management", "Global client interface training", "Offshore development center setup", "Quality assurance team building", "Technical project management hiring"],
        link: "/services/recruitment-hiring"
      },
      {
        title: "Manufacturing & Industrial HR",
        description: "Comprehensive HR support for manufacturing and industrial companies",
        icon: Building,
        features: ["Manufacturing specialist recruitment", "Industrial engineer hiring", "Production team management", "Quality control specialist sourcing", "Supply chain professional recruitment", "Industrial safety training"],
        link: "/services/hr-compliance"
      },
      {
        title: "Startup & SME HR",
        description: "Complete HR solutions for startups and small to medium enterprises",
        icon: Rocket,
        features: ["Startup HR foundation setup", "SME compliance management", "Talent acquisition strategies", "Employee engagement programs", "Performance management systems", "Scaling HR infrastructure"],
        link: "/services/performance-management"
      },
      {
        title: "Education & Training HR",
        description: "Specialized HR services for educational institutions and training companies",
        icon: BookOpen,
        features: ["Educational professional recruitment", "Training specialist hiring", "Academic team building", "Skill development specialist sourcing", "Educational compliance management", "Training program development"],
        link: "/services/virtual-hr-services"
      }
    ],
    industries: [
      { name: "Information Technology", description: "Software services, product development, and IT consulting", companies: "Tech startups, IT services companies" },
      { name: "Manufacturing & Industrial", description: "Manufacturing, industrial production, and engineering", companies: "Manufacturing companies, industrial firms" },
      { name: "Startups & SMEs", description: "Technology startups, small businesses, and emerging companies", companies: "Various startups, SMEs, emerging companies" },
      { name: "Education & Training", description: "Educational institutions, training centers, and skill development", companies: "Universities, training institutes, skill development centers" },
      { name: "Financial Services", description: "Banking, insurance, and financial technology", companies: "Banks, insurance companies, financial institutions" },
      { name: "Healthcare & Pharmaceuticals", description: "Healthcare services, pharmaceutical companies, and medical devices", companies: "Healthcare companies, pharma firms, medical device companies" }
    ],
    testimonials: [
      { name: "Arjun Reddy", position: "CTO", company: "Tech Startup, MIHAN", text: "Their understanding of Nagpur's tech ecosystem and startup culture is exceptional. Helped us build a world-class engineering team.", rating: 5 },
      { name: "Priya Iyer", position: "HR Director", company: "Manufacturing Company, Civil Lines", text: "Outstanding expertise in manufacturing industry recruitment. They understand the unique requirements of industrial companies.", rating: 5 },
      { name: "Rahul Sharma", position: "CEO", company: "SME, Nagpur", text: "Perfect partner for our SME HR needs. Their knowledge of scaling strategies and compliance requirements helped us grow efficiently.", rating: 5 }
    ]
  }
};

// Export individual city data for easy access
export const getCityData = (cityKey) => cityData[cityKey] || null;

// Export all city keys
export const cityKeys = Object.keys(cityData);

// Export city names for display
export const cityNames = Object.entries(cityData).map(([key, data]) => ({
  key,
  name: data.name
}));
