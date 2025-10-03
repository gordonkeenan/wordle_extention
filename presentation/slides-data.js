/**
 * Slides data for the Couch Developer presentation
 * This file provides slide content for both the full and 7-minute versions
 */

function getSlides(version) {
    const slides7min = [
        {
            title: "Welcome to Couch Development",
            tracker: "START",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>Building software from your phone while lounging on the couch</p>
                    <p class="text-xl text-green-400">Press "Next" to begin →</p>
                </div>
            `,
            notes: ["Introduction slide", "Set the tone for the presentation"]
        },
        {
            title: "The Challenge",
            tracker: "ISSUE",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>Traditional development requires:</p>
                    <ul class="list-disc list-inside text-left mx-auto max-w-2xl space-y-3">
                        <li>Desktop or laptop computer</li>
                        <li>Keyboard and mouse</li>
                        <li>Dedicated workspace</li>
                        <li>Extended sitting time</li>
                    </ul>
                </div>
            `,
            notes: ["Describe the traditional development setup"]
        },
        {
            title: "The Modern Reality",
            tracker: "VALID",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>What if you could code from anywhere?</p>
                    <p class="text-xl">📱 Your phone is powerful enough</p>
                    <p class="text-xl">🤖 AI assistants can help</p>
                    <p class="text-xl">☁️ Cloud tools enable remote work</p>
                </div>
            `,
            notes: ["Modern development possibilities"]
        },
        {
            title: "The Tools",
            tracker: "TOOLS",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <ul class="list-disc list-inside text-left mx-auto max-w-2xl space-y-3">
                        <li>ChatGPT for code generation</li>
                        <li>GitHub for version control</li>
                        <li>Cloud IDEs and terminals</li>
                        <li>Mobile-friendly interfaces</li>
                    </ul>
                </div>
            `,
            notes: ["List the tools that enable couch development"]
        },
        {
            title: "The Benefits",
            tracker: "GAINS",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>✅ Work from anywhere</p>
                    <p>✅ More comfortable positions</p>
                    <p>✅ Better work-life balance</p>
                    <p>✅ Accessibility for all</p>
                </div>
            `,
            notes: ["Benefits of couch development"]
        },
        {
            title: "The Challenges",
            tracker: "LIMIT",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>⚠️ Smaller screen size</p>
                    <p>⚠️ Touch keyboard limitations</p>
                    <p>⚠️ Battery life concerns</p>
                    <p>⚠️ Network dependency</p>
                </div>
            `,
            notes: ["Challenges to overcome"]
        },
        {
            title: "The Future",
            tracker: "AHEAD",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p class="text-green-400">The future is flexible</p>
                    <p>Development is becoming more accessible</p>
                    <p>AI is lowering the barrier to entry</p>
                    <p>Your couch is now your office 🛋️</p>
                </div>
            `,
            notes: ["Conclusion and future outlook"]
        },
        {
            title: "Thank You!",
            tracker: "THANK",
            content: `
                <div class="text-3xl text-gray-300 space-y-8">
                    <p class="text-green-400">Questions?</p>
                    <p class="text-xl">Gordon Keenan</p>
                    <p class="text-lg text-gray-500">Couch Developer Extraordinaire</p>
                </div>
            `,
            notes: ["Thank you slide"]
        }
    ];

    const slidesFull = [
        ...slides7min,
        // Additional slides for full presentation can be added here
        {
            title: "Deep Dive: AI-Assisted Development",
            tracker: "CODEX",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>How ChatGPT changed everything:</p>
                    <ul class="list-disc list-inside text-left mx-auto max-w-2xl space-y-3">
                        <li>Natural language to code</li>
                        <li>Instant documentation</li>
                        <li>Bug fixes on demand</li>
                        <li>Learning accelerated</li>
                    </ul>
                </div>
            `,
            notes: ["Deep dive into AI assistance"]
        },
        {
            title: "Mobile Development Workflow",
            tracker: "FLOWS",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>1. 💭 Ideate on your phone</p>
                    <p>2. 🤖 Ask AI to generate code</p>
                    <p>3. 📝 Review and refine</p>
                    <p>4. 🚀 Deploy to GitHub</p>
                </div>
            `,
            notes: ["Typical mobile development workflow"]
        },
        {
            title: "Success Stories",
            tracker: "WINS!",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p class="text-green-400">Real projects built from the couch:</p>
                    <ul class="list-disc list-inside text-left mx-auto max-w-2xl space-y-3">
                        <li>Browser extensions</li>
                        <li>Web applications</li>
                        <li>Open source contributions</li>
                        <li>This very presentation!</li>
                    </ul>
                </div>
            `,
            notes: ["Examples of successful couch-built projects"]
        },
        {
            title: "Best Practices",
            tracker: "GUIDE",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <ul class="list-disc list-inside text-left mx-auto max-w-2xl space-y-3">
                        <li>Break tasks into small chunks</li>
                        <li>Use voice input when possible</li>
                        <li>Take frequent breaks</li>
                        <li>Embrace the iterative process</li>
                    </ul>
                </div>
            `,
            notes: ["Tips for effective couch development"]
        },
        {
            title: "Accessibility Impact",
            tracker: "REACH",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p class="text-green-400">Making development accessible to:</p>
                    <p>♿ People with mobility challenges</p>
                    <p>🌍 Developers in any location</p>
                    <p>👥 Those with limited resources</p>
                    <p>🆕 New programmers learning</p>
                </div>
            `,
            notes: ["How this approach improves accessibility"]
        },
        {
            title: "The Learning Curve",
            tracker: "LEARN",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>It takes time to adapt but:</p>
                    <ul class="list-disc list-inside text-left mx-auto max-w-2xl space-y-3">
                        <li>Start with simple tasks</li>
                        <li>Gradually increase complexity</li>
                        <li>Learn the tools well</li>
                        <li>Be patient with yourself</li>
                    </ul>
                </div>
            `,
            notes: ["Setting expectations for the learning process"]
        },
        {
            title: "Community & Support",
            tracker: "GROUP",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>You're not alone:</p>
                    <p>📱 Mobile dev communities</p>
                    <p>💬 Discord servers</p>
                    <p>📚 Online tutorials</p>
                    <p>🤝 Peer support groups</p>
                </div>
            `,
            notes: ["Available community resources"]
        },
        {
            title: "Environmental Benefits",
            tracker: "GREEN",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p class="text-green-400">Sustainability advantages:</p>
                    <p>⚡ Lower power consumption</p>
                    <p>🌱 Reduced hardware needs</p>
                    <p>🔄 Extended device lifecycles</p>
                    <p>🌍 Smaller carbon footprint</p>
                </div>
            `,
            notes: ["Environmental impact of mobile-first development"]
        },
        {
            title: "Security Considerations",
            tracker: "SAFER",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <ul class="list-disc list-inside text-left mx-auto max-w-2xl space-y-3">
                        <li>Use secure connections (VPN)</li>
                        <li>Enable 2FA everywhere</li>
                        <li>Be careful with sensitive data</li>
                        <li>Keep your device updated</li>
                    </ul>
                </div>
            `,
            notes: ["Important security practices"]
        },
        {
            title: "Performance Tips",
            tracker: "SPEED",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>Optimize your mobile workflow:</p>
                    <ul class="list-disc list-inside text-left mx-auto max-w-2xl space-y-3">
                        <li>Close unnecessary apps</li>
                        <li>Use lightweight editors</li>
                        <li>Cache frequently used data</li>
                        <li>Optimize network usage</li>
                    </ul>
                </div>
            `,
            notes: ["Performance optimization tips"]
        },
        {
            title: "Integration with Traditional Dev",
            tracker: "MERGE",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>Couch dev complements desktop dev:</p>
                    <p>📱 Mobile for ideation and quick edits</p>
                    <p>💻 Desktop for heavy lifting</p>
                    <p>☁️ Cloud keeps everything in sync</p>
                    <p>🔄 Seamless workflow transitions</p>
                </div>
            `,
            notes: ["How mobile and desktop development work together"]
        },
        {
            title: "Real-World Example: This Extension",
            tracker: "PRJCT",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p class="text-green-400">The Wordle Helper Extension</p>
                    <ul class="list-disc list-inside text-left mx-auto max-w-2xl space-y-3">
                        <li>Built entirely from phone</li>
                        <li>Using ChatGPT for code</li>
                        <li>GitHub for version control</li>
                        <li>Published to Chrome Store</li>
                    </ul>
                </div>
            `,
            notes: ["Case study of the Wordle extension project"]
        },
        {
            title: "Measuring Success",
            tracker: "TRACK",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>Success isn't just about code:</p>
                    <p>✓ Can you work comfortably?</p>
                    <p>✓ Are you being productive?</p>
                    <p>✓ Is your health improving?</p>
                    <p>✓ Are you enjoying the process?</p>
                </div>
            `,
            notes: ["How to measure your success with this approach"]
        },
        {
            title: "Next Steps",
            tracker: "STEPS",
            content: `
                <div class="text-2xl text-gray-300 space-y-6">
                    <p>Ready to try couch development?</p>
                    <ol class="list-decimal list-inside text-left mx-auto max-w-2xl space-y-3">
                        <li>Pick a small project</li>
                        <li>Set up your tools</li>
                        <li>Start with simple tasks</li>
                        <li>Iterate and improve</li>
                    </ol>
                </div>
            `,
            notes: ["Action items for getting started"]
        },
        {
            title: "Thank You!",
            tracker: "THANK",
            content: `
                <div class="text-3xl text-gray-300 space-y-8">
                    <p class="text-green-400">Questions?</p>
                    <p class="text-xl">Gordon Keenan</p>
                    <p class="text-lg text-gray-500">Couch Developer Extraordinaire</p>
                    <p class="text-base text-gray-600 mt-8">🛋️ Made with comfort in mind 🛋️</p>
                </div>
            `,
            notes: ["Thank you and final slide"]
        }
    ];

    return version === "7min" ? slides7min : slidesFull;
}
