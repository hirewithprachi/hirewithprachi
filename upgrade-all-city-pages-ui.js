import fs from 'fs';
import path from 'path';

const cityPages = [
  'HRServicesDelhi.jsx',
  'HRServicesBangalore.jsx',
  'HRServicesChennai.jsx',
  'HRServicesHyderabad.jsx',
  'HRServicesPune.jsx',
  'HRServicesKolkata.jsx',
  'HRServicesAhmedabad.jsx',
  'HRServicesJaipur.jsx',
  'HRServicesIndore.jsx',
  'HRServicesBhubaneswar.jsx',
  'HRServicesCoimbatore.jsx',
  'HRServicesLucknow.jsx',
  'HRServicesNagpur.jsx'
];

const pagesDir = './src/pages';

function upgradeCityPageUI() {
  console.log('🎨 Upgrading all city pages to match Mumbai page UI...\n');

  cityPages.forEach(cityPage => {
    const filePath = path.join(pagesDir, cityPage);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${cityPage}`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Get city name from filename
    const cityName = cityPage.replace('HRServices', '').replace('.jsx', '');
    const cityNameLower = cityName.toLowerCase();
    const cityNameCamelCase = cityNameLower.charAt(0).toLowerCase() + cityNameLower.slice(1);

    // 1. Add HeroV2 component import if not present
    if (!content.includes("import HeroV2 from '../components/city-landing/HeroV2';")) {
      const importMatch = content.match(/import SEOOptimizer from '\.\.\/components\/SEOOptimizer';/);
      if (importMatch) {
        content = content.replace(
          "import SEOOptimizer from '../components/SEOOptimizer';",
          "import SEOOptimizer from '../components/SEOOptimizer';\nimport HeroV2 from '../components/city-landing/HeroV2';"
        );
        modified = true;
        console.log(`✅ Added HeroV2 import to ${cityPage}`);
      }
    }

    // 2. Replace the main content section with HeroV2 and CityLandingPremium structure
    const oldContentPattern = /<ScrollProgressBar \/>\s*<HireWithPrachiTopBar \/>\s*<HireWithPrachiHeader \/>\s*<CityLandingPremium/;
    const newContentStructure = `<ScrollProgressBar />
      <HireWithPrachiTopBar />
      <HireWithPrachiHeader />

      {/* Enhanced Hero Section */}
      <HeroV2
        cityName="${cityName}"
        description="${getCityDescription(cityName)}"
        onSchedule={() => setShowCalendly(true)}
        onDownload={handleBrochureDownload}
        stats={[
          { icon: Users, value: '${getCityStats(cityName).companies}', label: '${cityName} Companies Served', color: 'from-blue-500 to-cyan-500' },
          { icon: Award, value: '${getCityStats(cityName).startups}', label: 'Startups & SMEs', color: 'from-purple-500 to-pink-500' },
          { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
          { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
        ]}
        bottomStats={${cityNameCamelCase}Stats}
      />

      {/* Enhanced Premium Content Section */}
      <CityLandingPremium`;

    if (content.match(oldContentPattern)) {
      content = content.replace(oldContentPattern, newContentStructure);
      modified = true;
      console.log(`✅ Updated main content structure for ${cityPage}`);
    }

    // 3. Add enhanced CTA section before footer
    const ctaSection = `
      <CityInternalLinks />

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold text-white mb-6"
            >
              Ready to Elevate HR for Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">${cityName} Business</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Join ${getCityStats(cityName).companies}+ ${cityName} businesses that trust us for their premium HR needs. We've got you covered with sophisticated solutions.
            </motion.p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCalendly(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-500/20 text-lg"
            >
              <Calendar className="w-5 h-5" />
              Book ${cityName} Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBrochureDownload}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
            >
              <Download className="w-5 h-5" />
              ${cityName} HR Guide
            </motion.button>
          </div>
        </div>
      </section>

      <HireWithPrachiFooter />`;

    // Replace the old footer section
    const oldFooterPattern = /<CityInternalLinks \/>\s*<HireWithPrachiFooter \/>/;
    if (content.match(oldFooterPattern)) {
      content = content.replace(oldFooterPattern, ctaSection);
      modified = true;
      console.log(`✅ Added enhanced CTA section for ${cityPage}`);
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${cityPage}`);
    } else {
      console.log(`✅ ${cityPage} - Already has upgraded UI or no changes needed`);
    }
  });

  console.log('\n🎉 All city pages UI upgraded to match Mumbai page!');
}

// Helper functions to get city-specific data
function getCityDescription(cityName) {
  const descriptions = {
    'Delhi': "Transform your business with cutting-edge HR solutions. From Connaught Place to Gurgaon's corporate hub, we deliver premium HR services that align with Delhi NCR's dynamic business landscape.",
    'Bangalore': "Accelerate your business with cutting-edge HR solutions. From Electronic City to Whitefield's tech hub, we deliver premium HR services that align with Bangalore's dynamic business landscape.",
    'Chennai': "Transform your business with cutting-edge HR solutions. From T Nagar to OMR's tech corridor, we deliver premium HR services that align with Chennai's dynamic business landscape.",
    'Hyderabad': "Accelerate your business with cutting-edge HR solutions. From Hitec City to Gachibowli's tech hub, we deliver premium HR services that align with Hyderabad's dynamic business landscape.",
    'Pune': "Transform your business with cutting-edge HR solutions. From Hinjewadi to Kharadi's tech hub, we deliver premium HR services that align with Pune's dynamic business landscape.",
    'Kolkata': "Accelerate your business with cutting-edge HR solutions. From Park Street to Salt Lake's business hub, we deliver premium HR services that align with Kolkata's dynamic business landscape.",
    'Ahmedabad': "Transform your business with cutting-edge HR solutions. From SG Road to GIFT City's financial hub, we deliver premium HR services that align with Ahmedabad's dynamic business landscape.",
    'Jaipur': "Accelerate your business with cutting-edge HR solutions. From Malviya Nagar to Sitapura's industrial hub, we deliver premium HR services that align with Jaipur's dynamic business landscape.",
    'Indore': "Transform your business with cutting-edge HR solutions. From Vijay Nagar to Pithampur's manufacturing hub, we deliver premium HR services that align with Indore's dynamic business landscape.",
    'Bhubaneswar': "Accelerate your business with cutting-edge HR solutions. From KIIT to Infocity's tech hub, we deliver premium HR services that align with Bhubaneswar's dynamic business landscape.",
    'Coimbatore': "Transform your business with cutting-edge HR solutions. From Peelamedu to Tidel Park's tech hub, we deliver premium HR services that align with Coimbatore's dynamic business landscape.",
    'Lucknow': "Accelerate your business with cutting-edge HR solutions. From Gomti Nagar to Hazratganj's business hub, we deliver premium HR services that align with Lucknow's dynamic business landscape.",
    'Nagpur': "Transform your business with cutting-edge HR solutions. From MIHAN to Civil Lines' corporate hub, we deliver premium HR services that align with Nagpur's dynamic business landscape."
  };
  return descriptions[cityName] || "Transform your business with cutting-edge HR solutions. We deliver premium HR services that align with your city's dynamic business landscape.";
}

function getCityStats(cityName) {
  const stats = {
    'Delhi': { companies: '200+', startups: '70+' },
    'Bangalore': { companies: '200+', startups: '50+' },
    'Chennai': { companies: '150+', startups: '40+' },
    'Hyderabad': { companies: '180+', startups: '45+' },
    'Pune': { companies: '120+', startups: '35+' },
    'Kolkata': { companies: '100+', startups: '30+' },
    'Ahmedabad': { companies: '80+', startups: '25+' },
    'Jaipur': { companies: '60+', startups: '20+' },
    'Indore': { companies: '50+', startups: '15+' },
    'Bhubaneswar': { companies: '40+', startups: '12+' },
    'Coimbatore': { companies: '35+', startups: '10+' },
    'Lucknow': { companies: '30+', startups: '8+' },
    'Nagpur': { companies: '25+', startups: '6+' }
  };
  return stats[cityName] || { companies: '100+', startups: '30+' };
}

upgradeCityPageUI();
