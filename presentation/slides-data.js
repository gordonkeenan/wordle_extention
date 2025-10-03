// Slides data for the presentation
// This file provides a getSlides function that returns slide data for different versions

function getSlides(version = 'full') {
  const fullSlides = [
    {
      title: "Build with ChatGPT on your phone",
      tracker: "COUCH",
      content: `
        <p class="text-2xl md:text-3xl text-gray-300 text-center">
          The trials and tribulations of being a couch developer
        </p>
        <p class="text-xl text-gray-400 text-center mt-4">
          Gordon Keenan — 2025
        </p>
      `,
      notes: ["Introduction slide", "Set the stage for the presentation"]
    },
    {
      title: "The Problem",
      tracker: "START",
      content: `
        <div class="text-xl md:text-2xl text-gray-300 space-y-4">
          <p>💡 Had an idea for a Wordle extension</p>
          <p>📱 Only had my phone available</p>
          <p>🤔 Could I build it entirely from my couch?</p>
        </div>
      `,
      notes: ["Explain the initial challenge", "Limited to mobile device"]
    },
    {
      title: "The Solution",
      tracker: "CHATGPT",
      content: `
        <div class="text-xl md:text-2xl text-gray-300 space-y-4">
          <p>✨ ChatGPT Canvas for coding</p>
          <p>📝 Mobile browser for testing</p>
          <p>🚀 GitHub for deployment</p>
        </div>
      `,
      notes: ["The tools that made it possible", "Entirely mobile workflow"]
    },
    {
      title: "What I Built",
      tracker: "WORDLE",
      content: `
        <div class="text-xl md:text-2xl text-gray-300 space-y-4">
          <p>🎯 Wordle Accessibility Helper</p>
          <p>🌐 Browser extension for Chrome & Firefox</p>
          <p>🔤 Helps identify valid English words</p>
          <p>📚 Educational tool for non-native speakers</p>
        </div>
      `,
      notes: ["Description of the extension", "Accessibility focus"]
    },
    {
      title: "The Development Process",
      tracker: ["VALID", "INVALID"],
      content: `
        <div class="text-xl md:text-2xl text-gray-300 space-y-4">
          <p>💬 Iterative conversations with ChatGPT</p>
          <p>🔄 Test → Debug → Improve</p>
          <p>📱 All from a mobile browser</p>
          <p>⚡ Surprisingly efficient workflow</p>
        </div>
      `,
      notes: ["Iterative development process", "Mobile-first approach"]
    },
    {
      title: "Challenges Faced",
      tracker: "HARDER",
      content: `
        <div class="text-xl md:text-2xl text-gray-300 space-y-4">
          <p>📱 Small screen real estate</p>
          <p>⌨️ Mobile keyboard limitations</p>
          <p>🐛 Debugging without DevTools</p>
          <p>📋 Copy-paste gymnastics</p>
        </div>
      `,
      notes: ["Main challenges of mobile development", "Workarounds needed"]
    },
    {
      title: "Lessons Learned",
      tracker: "WISDOM",
      content: `
        <div class="text-xl md:text-2xl text-gray-300 space-y-4">
          <p>🤖 AI pair programming works on mobile</p>
          <p>🎯 Clear requirements = better results</p>
          <p>🔁 Iteration is key</p>
          <p>💪 Platform constraints breed creativity</p>
        </div>
      `,
      notes: ["Key takeaways", "AI as development partner"]
    },
    {
      title: "The Future",
      tracker: "EVOLVE",
      content: `
        <div class="text-xl md:text-2xl text-gray-300 space-y-4">
          <p>🚀 More features planned</p>
          <p>🌍 Multi-language support</p>
          <p>📊 Usage analytics</p>
          <p>🎨 Better UI/UX</p>
        </div>
      `,
      notes: ["Future plans", "Ongoing development"]
    },
    {
      title: "Thank You!",
      tracker: "THANKS",
      content: `
        <div class="text-2xl md:text-3xl text-gray-300 text-center space-y-6">
          <p>Questions?</p>
          <p class="text-xl text-gray-400">Gordon Keenan</p>
          <p class="text-lg text-green-400">github.com/gordonkeenan/wordle_extention</p>
        </div>
      `,
      notes: ["Q&A time", "Contact information"]
    }
  ];

  const sevenMinSlides = [
    fullSlides[0],
    fullSlides[1],
    fullSlides[2],
    fullSlides[3],
    fullSlides[6],
    fullSlides[7],
    fullSlides[8]
  ];

  return version === '7min' ? sevenMinSlides : fullSlides;
}

// Make it available globally
if (typeof window !== 'undefined') {
  window.getSlides = getSlides;
}

// Also export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getSlides };
}
