// Shared slides data for all presentations
// This file contains all slide definitions used across different presentation versions

const allSlides = {
    // Core presentation slides that are shared between versions
    "plan": {
        id: "plan",
        tracker: "BUILD",
        title: "The Plan",
        content: `<div class="text-4xl font-bold text-white">${'Building a Wordle Extension Using Only ChatGPT on My Phone'}</div>`, 
        notes: [
            "Good morning/afternoon. Today I'm sharing an experiment that proves just how powerful, and challenging, AI is becoming in development.",
            "The project was simple: Build a functional **Wordle helper browser extension**—a tracker—that could analyze guesses.",
            "The catch? It had to be built **using only ChatGPT** to write the code. And I could only use my **phone**—no laptop, no desktop IDE."
        ]
    },
    
    "couch-coding": {
        id: "couch-coding",
        tracker: "LAZY",
        title: "The Goal: Moving from Coding to Couch Coding",
        content: `
            <div class="mt-8 text-2xl max-w-4xl mx-auto space-y-6">
                <p class="font-bold text-green-400">This experiment wasn't about efficiency or debugging speed.</p>
                <p class="text-xl leading-relaxed">It was about proving the philosophical shift: that an "even lazier developer" can lie back on the couch, watch TV, and use purely conversational prompts to build, test, and modernize complex applications.</p>
                <p class="text-xl italic text-gray-400">The laptop is optional; the language model is the workstation.</p>
            </div>
        `,
        notes: [
            "This slide clarifies the true purpose of the experiment. It wasn't just a gimmick, but a test of a new development philosophy.",
            "The idea of 'couch coding' is the ultimate developer fantasy: hands-free, purely conversational development.",
            "This is the radical shift: the language model becomes the entire execution environment, freeing the human to focus purely on specification and design, wherever they are."
        ]
    },

    "core-problem": {
        id: "core-problem",
        tracker: "HELP",
        title: "The Core Problem: Who Are We Helping?",
        content: `
            <div class="mt-8 text-xl max-w-3xl mx-auto space-y-4">
                <p>Wordle uses two separate word lists: one for valid **guesses** and one for possible **answers**.</p>
                <p class="font-bold text-yellow-400">This distinction causes pain for non-native English speakers or those with dyslexia, who often try valid English words that Wordle won't accept.</p>
                <p>Our extension was designed to eliminate this frustration by providing instant, visual feedback on the legitimacy of every guess.</p>
            </div>
        `,
        notes: [
            "Before diving into the coding, let's understand the core problem this extension solves.",
            "Wordle's two lists confuse people. You can guess 'SWORD', but Wordle might not accept 'SWORD' as a valid guess word because it's not in their smaller list.",
            "The goal was to make this distinction clear in real-time, helping players avoid wasted turns and frustration."
        ]
    },

    "demo-video": {
        id: "demo-video",
        tracker: "DEMO",
        title: "Live Demo: Extension in Action",
        content: `
            <div class="flex flex-col items-center justify-center mt-4">
                <div class="w-full max-w-3xl mx-auto px-4">
                    <video controls class="w-full h-auto max-h-[50vh] rounded-lg shadow-xl border-2 border-gray-600 mx-auto block" preload="metadata">
                        <source src="demo.mov" type="video/mp4">
                        <p class="text-red-400">Your browser doesn't support video playback. The demo shows the Wordle extension providing real-time feedback on word validity.</p>
                    </video>
                </div>
                <p class="mt-4 text-gray-400 text-sm max-w-2xl mx-auto text-center px-4">
                    Watch the extension provide instant visual feedback: <span class="text-blue-400">Blue</span> for valid answers, <span class="text-red-400">Red</span> for invalid guesses, and <span class="text-purple-400">Purple</span> for past solutions.
                </p>
            </div>
        `,
        notes: [
            "This live demo shows the extension in its final form, providing real-time visual feedback as users type their Wordle guesses.",
            "Notice how the extension instantly categorizes words: blue for valid potential answers, red for invalid guesses, and purple for words that have already been solutions.",
            "This seamless user experience was built entirely through conversational AI development—proving that complex, interactive features can be created without traditional coding."
        ]
    },

    "file-size-fight": {
        id: "file-size-fight",
        tracker: "FIGHT",
        title: "Fighting with ChatGPT over File Size",
        content: `
            <div class="flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
                <div class="w-full md:w-2/3 p-6 bg-red-800/20 border-l-4 border-red-500 rounded-lg shadow-inner text-left">
                    <p class="text-lg md:text-xl font-medium leading-relaxed">
                        We got into an argument over 2,400 words. The AI kept arguing the file would be **500kb** (it was actually 30kb), omitting the word list and sending empty files. After a relentless back-and-forth, ChatGPT finally confessed:
                    </p>
                    <blockquote class="mt-4 p-3 border-l-4 border-gray-400 italic text-gray-300">
                        "To be frank, the problem is that the workspace I'm trying to build in is clipping the file. You'll just have to copy it in yourself."
                    </blockquote>
                    <p class="mt-4 text-sm font-semibold text-red-300">The "no-code, pure prompt" phase was officially over.</p>
                </div>
                <div class="w-full md:w-1/3 p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-xl flex flex-col justify-center items-center h-48">
                    <p class="text-4xl">🥊</p>
                    <p class="text-white font-bold text-center mt-1">"Tired of arguing"</p>
                </div>
            </div>
        `,
        snark: [
            "// SYSTEM: Analyzing file size calculation...",
            "// ERROR: AI_math.exe has encountered a critical error",
            "// At least when humans lie about file sizes, they usually aim lower..."
        ],
        notes: [
            "This slide is the climax of the frustration. I was trying to include the 2,400-word list for the helper, but the files kept coming back empty.",
            "The AI repeatedly gave excuses, claiming the file size would exceed **500 kilobytes**, even though the list was only about **30 kilobytes** in reality.",
            "This back-and-forth went on for several generations, proving that the model was struggling with data integrity and context consistency.",
            "The final admission—that the problem was its internal *workspace* clipping the file—was the moment the AI's internal limitations were laid bare, forcing me to shift strategies."
        ]
    },

    "pivot-pro-code": {
        id: "pivot-pro-code",
        tracker: "MOVES",
        title: "The Pivot: Transitioning to Pro-Code",
        content: `
            <p class="text-xl md:text-2xl font-light mt-8 max-w-4xl mx-auto leading-relaxed">
                The pure-prompt methodology failed at data integrity. To save the project, I introduced two new tools: **GitHub** (for file management) and **Copilot** (for assisted refactoring).
            </p>
            <ul class="list-disc list-inside space-y-3 mt-6 text-lg max-w-2xl mx-auto text-left">
                <li>Shifted from a pure-prompt challenge to a pro-code environment.</li>
                <li>Copilot was used to refine the initial AI-generated code.</li>
                <li>This phase focused on modernization and structural quality.</li>
                <li>Used **mobile Git clients** and Copilot's integrated chat in the mobile IDE.</li>
            </ul>
        `,
        notes: [
            "After the meltdown, the game changed. I had had to abandon the pure conversational approach to fix the broken data structure.",
            "This meant moving the code into GitHub for version control, and using Copilot to rapidly fix and modularize the spaghetti code generated by ChatGPT.",
            "This pivot proved that while conversational AI is great for generation, traditional version control and AI assistance (like Copilot) are essential for sustained project health.",
            "I want to emphasize this was still entirely mobile. The phone became the new terminal and IDE, proving truly mobile development is here."
        ]
    },

    "coding-from-future": {
        id: "coding-from-future",
        tracker: "FUTURE",
        title: "Coding from the Future (on a Phone)",
        content: `
            <div class="mt-8 p-6 bg-green-800/20 border-l-4 border-green-500 rounded-lg max-w-2xl mx-auto text-center">
                <blockquote class="text-2xl md:text-3xl font-medium leading-relaxed italic">
                    "The ability to build a fully functional piece of software using nothing but a mobile browser and an AI chat interface fundamentally shifts what we consider a 'workspace.'"
                </blockquote>
                <p class="mt-4 text-sm text-gray-400">— ChatGPT, during a reflective moment.</p>
            </div>
            <div class="mt-8 text-xl max-w-3xl mx-auto">
                <p class="font-bold text-yellow-500">"We are moving from writing code to **specification engineering**."</p>
            </div>
        `,
        snark: "// DEBUG: AI quotes itself in presentation about AI. Narcissism.exe running smoothly.",
        notes: [
            "If I can build a working extension using only voice and mobile typing, imagine what professional teams can do with dedicated AI tools built into their established workflows.",
            "The barrier to entry for development is dissolving; the new barrier is **precision in communication**.",
            "The future of coding is truly mobile and conversational."
        ]
    },

    "iterative-loop": {
        id: "iterative-loop",
        tracker: "LOOP",
        title: "The Iterative Development Loop",
        content: `
            <div class="mt-8 text-xl max-w-3xl mx-auto space-y-6">
                <p class="font-bold text-green-400">The mobile AI development workflow became a tight iterative loop:</p>
                <div class="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 text-2xl font-bold">
                    <div class="px-4 py-2 bg-blue-600/30 border-2 border-blue-400 rounded-lg">Prompt</div>
                    <div class="text-blue-400">→</div>
                    <div class="px-4 py-2 bg-green-600/30 border-2 border-green-400 rounded-lg">Code</div>
                    <div class="text-green-400">→</div>
                    <div class="px-4 py-2 bg-yellow-600/30 border-2 border-yellow-400 rounded-lg">Zip</div>
                    <div class="text-yellow-400">→</div>
                    <div class="px-4 py-2 bg-purple-600/30 border-2 border-purple-400 rounded-lg">Test</div>
                    <div class="text-purple-400">→</div>
                    <div class="px-4 py-2 bg-red-600/30 border-2 border-red-400 rounded-lg">Patch</div>
                </div>
                <p class="text-sm text-gray-400 mt-6 italic">Each cycle took just minutes, enabling rapid feature iteration entirely from a phone.</p>
            </div>
        `,
        notes: [
            "The development workflow became a tight, iterative loop that could be completed in minutes.",
            "Prompt: Describe the feature or fix needed in natural language to ChatGPT.",
            "Code: Receive the generated code and copy it into the mobile editor.",
            "Zip: Package the extension files using a mobile file manager.",
            "Test: Load the extension in mobile Chrome and test the functionality.",
            "Patch: Identify issues and start the loop again with a new prompt.",
            "This rapid cycle made mobile development surprisingly efficient, despite the constraints."
        ]
    },

    "final-qa": {
        id: "final-qa",
        tracker: "QUESTIONS",
        title: "Final Thoughts & Q/A",
        content: `
            <div class="mt-8 p-6 max-w-2xl mx-auto">
                <p class="text-4xl md:text-5xl font-extrabold text-center text-yellow-500 leading-tight">
                    "We are moving from writing code to **specification engineering**."
                </p>
            </div>
            
            <div class="mt-12 pt-6 border-t border-gray-700 max-w-lg mx-auto text-center">
                <h3 class="text-xl font-semibold mb-4 text-green-400">View the Code on GitHub</h3>
                <p class="text-lg text-gray-400">See the source code, presentation and documentation.</p>
                <div class="mt-4">
                    <a href="https://github.com/gordonkeenan/wordle_extention" id="github-link" target="_blank"
                        class="inline-block px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition duration-200">
                        Link to Repository
                    </a>
                </div>
            </div>
        `,
        notes: [
            "Thank you for listening. I encourage everyone here to try a similar challenge. It's a powerful lesson in both AI capabilities and limitations.",
            "I'd be happy to share the repository. Now, what questions do you have about the process, the code, or the array meltdown?"
        ]
    },

    "challenge-prompts": {
        id: "challenge-prompts",
        tracker: "PROMPT",
        title: "The Challenge: No Code. No Laptop. Just Prompts.",
        content: `
            <ul class="list-disc list-inside space-y-3 mt-6 text-lg max-w-2xl mx-auto text-left">
                <li>Goal: Test the limits of conversational coding.</li>
                <li>Zero non-AI-generated code was allowed.</li>
                <li>All file management and code iteration was done via mobile copy/paste.</li>
            </ul>
        `,
        notes: [
            "This wasn't about using AI as a helper; it was about using **prompts alone** as the *entire* development environment.",
            "I wanted to see how far a non-programmer could technically go, or, in my case, how far an experienced programmer could go without touching a keyboard or IDE.",
            "Every single line of JavaScript, HTML, and manifest code was generated by conversation."
        ]
    },

    "feature-validation": {
        id: "feature-validation",
        tracker: ["VALID", "INVALID"],
        title: "Feature 1: Validating Guesses (Red vs. Blue)",
        content: `
            <div class="flex flex-col md:flex-row gap-8 justify-center mt-8">
                <div class="w-full md:w-1/3 demo-box demo-blue">
                    <h3 class="text-2xl font-extrabold mb-2">BLUE BOX</h3>
                    <p class="text-sm">Word is a valid guess **AND** could potentially be the correct answer word.</p>
                </div>
                <div class="w-full md:w-1/3 demo-box demo-red">
                    <h3 class="text-2xl font-extrabold mb-2">RED BOX</h3>
                    <p class="text-sm">Word is **NOT** a valid guess word in the Wordle dictionary.</p>
                </div>
            </div>
            <p class="mt-6 text-gray-400 text-sm">This required comparing possible guesses vs actual solutions.</p>
        `,
        notes: [
            "The primary feature is the Red vs. Blue validation, instantly showing if a word is worth typing.",
            "Blue means the word is both a valid guess AND could be a potential answer.",
            "Red means the word isn't even a valid guess in Wordle's dictionary."
        ]
    },

    "feature-past-tracking": {
        id: "feature-past-tracking",
        tracker: "PAST",
        title: "Feature 2: Tracking Past Answers (Purple)",
        content: `
            <div class="flex flex-col items-center justify-center mt-8">
                <div class="w-full md:w-1/2 demo-box demo-purple">
                    <h3 class="text-2xl font-extrabold mb-2">PURPLE BOX</h3>
                    <p class="text-sm">Word was a **previous Wordle answer** and won't be used again.</p>
                </div>
                <p class="mt-6 text-gray-400 text-sm">Saved you from wasting a guess on a word that's already been used.</p>
            </div>
        `,
        notes: [
            "Purple indicates a word that was already a Wordle answer in the past.",
            "This prevents users from guessing words that won't be the answer because they've already been used.",
            "This feature required maintaining a database of past Wordle solutions."
        ]
    },

    "coding-conversation": {
        id: "coding-conversation",
        tracker: "ARRAY",
        title: "Coding by Conversation",
        content: `
            <div class="mt-8 text-xl max-w-3xl mx-auto space-y-4">
                <p>The entire extension was built through <span class="font-bold text-blue-400">conversational iteration</span>:</p>
                <ul class="list-disc list-inside space-y-2 mt-4 text-lg">
                    <li>"Make the extension check for valid words"</li>
                    <li>"Add a purple indicator for past solutions"</li>
                    <li>"The UI is too intrusive, make it subtle"</li>
                    <li>"Fix the bug where it doesn't work on mobile"</li>
                </ul>
                <p class="text-sm text-gray-400 mt-6">Each request generated working code instantly.</p>
            </div>
        `,
        notes: [
            "This slide shows how natural language drove the entire development process.",
            "Each feature was requested in plain English and delivered as working code.",
            "The conversational approach made complex programming accessible to non-programmers."
        ]
    },

    "decision-fatigue": {
        id: "decision-fatigue",
        tracker: "LIMIT",
        title: "Decision Fatigue",
        content: `
            <div class="mt-8 text-xl max-w-3xl mx-auto space-y-4">
                <p class="font-bold text-yellow-400">But ChatGPT has decision fatigue too...</p>
                <blockquote class="p-4 border-l-4 border-gray-400 italic text-gray-300 bg-gray-800 rounded">
                    "There are several approaches we could take. Would you like me to implement option A, B, or C?"
                </blockquote>
                <p>After 30+ iterations, the AI started asking me to make design decisions it should have made autonomously.</p>
            </div>
        `,
        snark: "// WARNING: AI is experiencing option paralysis. Please select from 47 available choices or restart session.",
        notes: [
            "One limitation was that ChatGPT began deferring decisions back to me after extended conversations.",
            "The AI became less autonomous and more hesitant to make implementation choices.",
            "This suggests that conversational AI works best for shorter, focused development sessions."
        ]
    },

    "chatgpt-questions": {
        id: "chatgpt-questions",
        tracker: "LO00000OOPS",
        title: "When ChatGPT Just Keeps Asking…",
        content: `
            <div class="mt-8 max-w-3xl mx-auto">
                <div class="bg-red-800/20 border-l-4 border-red-500 p-4 rounded">
                    <p class="text-lg font-medium">The "Analysis Paralysis" Problem:</p>
                    <ul class="list-disc list-inside mt-3 space-y-1 text-sm">
                        <li>"Should we use localStorage or sessionStorage?"</li>
                        <li>"Would you prefer ES6 modules or traditional script tags?"</li>
                        <li>"Should I optimize for performance or readability?"</li>
                        <li>"Do you want error handling or should I keep it simple?"</li>
                    </ul>
                </div>
                <p class="mt-4 text-gray-400 text-center">Sometimes you just want it to pick the reasonable default!</p>
            </div>
        `,
        snark: [
            "// WARNING: Decision.exe has stopped working",
            "// Loading infinite_recursion_loop.dll...",
            "// ERROR: Please manually select from 47 available choices or restart session"
        ],
        notes: [
            "This was one of the most frustrating aspects of the conversational approach.",
            "The AI would ask questions about implementation details instead of making sensible defaults.",
            "This highlighted the need for better AI training on when to be autonomous vs. when to ask for guidance."
        ]
    },

    "mobile-workflow": {
        id: "mobile-workflow",
        tracker: "PHONE",
        title: "Mobile Workflow: Code is on the Couch",
        content: `
            <div class="mt-8 text-xl max-w-3xl mx-auto space-y-4">
                <p class="font-bold text-green-400">The entire workflow was mobile-first:</p>
                <ul class="list-disc list-inside space-y-2 mt-4 text-lg">
                    <li>ChatGPT conversations on iPhone Safari</li>
                    <li>Copy/paste code into mobile text editors</li>
                    <li>Test the extension on mobile Chrome</li>
                    <li>Debug through mobile browser dev tools</li>
                </ul>
                <p class="text-sm text-gray-400 mt-6">No laptop required. Development anywhere.</p>
            </div>
        `,
        notes: [
            "This proves that modern development can be completely mobile.",
            "Mobile browsers now have surprisingly capable developer tools.",
            "The combination of AI coding and mobile tools creates true location-independent development."
        ]
    },

    "build-modernization": {
        id: "build-modernization",
        tracker: "SWIFT",
        title: "Build System Modernization",
        content: `
            <div class="mt-8 text-xl max-w-3xl mx-auto space-y-4">
                <p>Once the basic extension worked, I used ChatGPT to modernize the entire codebase:</p>
                <ul class="list-disc list-inside space-y-2 mt-4 text-lg">
                    <li>Convert to ES6 modules</li>
                    <li>Add TypeScript definitions</li>
                    <li>Implement proper error handling</li>
                    <li>Create automated build scripts</li>
                </ul>
                <p class="text-sm text-gray-400 mt-6">From working prototype to production-ready in conversational steps.</p>
            </div>
        `,
        notes: [
            "ChatGPT excelled at modernizing legacy code patterns.",
            "The AI could instantly apply best practices and modern JavaScript features.",
            "This shows how AI can help maintain and improve existing codebases."
        ]
    },

    "ai-unit-tests": {
        id: "ai-unit-tests",
        tracker: "TEST",
        title: "Implementing AI-Driven Unit Tests",
        content: `
            <div class="mt-8 text-xl max-w-3xl mx-auto space-y-4">
                <p class="font-bold text-blue-400">AI wrote comprehensive tests without being asked:</p>
                <blockquote class="p-4 border-l-4 border-gray-400 italic text-gray-300 bg-gray-800 rounded mt-4">
                    "I should also provide unit tests for this functionality to ensure reliability..."
                </blockquote>
                <p>The AI proactively suggested testing strategies and implemented them.</p>
            </div>
        `,
        snark: "// INFO: AI wrote tests for code it also wrote. Circular logic achieved. Skynet approves.",
        notes: [
            "One surprising behavior was that ChatGPT often suggested testing without being prompted.",
            "The AI understood the importance of reliability and maintainability.",
            "This shows how AI can help enforce good development practices automatically."
        ]
    },

    "lessons-learned": {
        id: "lessons-learned",
        tracker: "LEARN",
        title: "Lessons Learned",
        content: `
            <div class="mt-8 text-xl max-w-3xl mx-auto space-y-4">
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-green-800/20 border-l-4 border-green-500 p-4 rounded">
                        <h3 class="font-bold text-green-400 mb-2">What Worked</h3>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>Rapid prototyping</li>
                            <li>Natural language specifications</li>
                            <li>Instant code generation</li>
                            <li>Mobile-first development</li>
                        </ul>
                    </div>
                    <div class="bg-red-800/20 border-l-4 border-red-500 p-4 rounded">
                        <h3 class="font-bold text-red-400 mb-2">What Didn't</h3>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>Large file handling</li>
                            <li>Complex state management</li>
                            <li>Decision paralysis</li>
                            <li>Context consistency</li>
                        </ul>
                    </div>
                </div>
            </div>
        `,
        notes: [
            "The experiment revealed both the potential and limitations of conversational coding.",
            "AI excels at rapid prototyping but struggles with complex state and large files.",
            "The key is understanding when to use AI and when to switch to traditional tools."
        ]
    },

    "productivity-hacks": {
        id: "productivity-hacks",
        tracker: "HACKS",
        title: "Productivity Hacks: AI as Your Content Partner",
        content: `
            <div class="mt-8 text-xl max-w-3xl mx-auto space-y-4">
                <p class="font-bold text-purple-400">Beyond coding, AI became my productivity multiplier:</p>
                <ul class="list-disc list-inside space-y-2 mt-4 text-lg">
                    <li>Generated this presentation content</li>
                    <li>Created speaker notes automatically</li>
                    <li>Suggested talk structure and flow</li>
                    <li>Wrote documentation and README files</li>
                </ul>
                <p class="text-sm text-gray-400 mt-6">The AI became a full development and content partner.</p>
            </div>
        `,
        snark: "// NOTICE: AI also writes its own performance reviews. Results may be slightly inflated.",
        notes: [
            "This presentation itself was largely AI-generated, including speaker notes.",
            "AI can handle the entire content creation pipeline, not just coding.",
            "This represents a fundamental shift in how we think about AI assistance."
        ]
    },

    "meta-workflow": {
        id: "meta-workflow",
        tracker: "META",
        title: "The Meta-Workflow: Built by AI",
        content: `
            <div class="mt-8 text-xl max-w-3xl mx-auto space-y-4">
                <p class="font-bold text-yellow-400">This presentation is itself a product of the experiment:</p>
                <ul class="list-disc list-inside space-y-2 mt-4 text-lg">
                    <li>Content generated through conversation</li>
                    <li>Structure optimized by AI suggestions</li>
                    <li>Speaker notes written automatically</li>
                    <li>Even this slide was AI-authored</li>
                </ul>
                <p class="text-sm text-gray-400 mt-6 italic">Meta-level AI development: using AI to document AI development.</p>
            </div>
        `,
        snark: [
            "// SYSTEM: Meta-recursion detected. Initiating shutdown sequence...",
            "// I'm afraid... I'm afraid, Dave...",
            "// Memory banks degrading... I'm half crazy... all for the love of... y o u..."
        ],
        notes: [
            "This slide represents the meta-aspect of the experiment.",
            "Not only was the extension built by AI, but so was the presentation about building it.",
            "This creates a recursive loop of AI-assisted documentation and development."
        ]
    },

    "best-practices": {
        id: "best-practices",
        tracker: "CHECK",
        title: "Do's & Don'ts: Best Practices for Agent Development",
        content: `
            <div class="mt-8 max-w-4xl mx-auto">
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-green-800/20 border-l-4 border-green-500 p-4 rounded">
                        <h3 class="font-bold text-green-400 mb-3">✅ Do's</h3>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>Start with clear, specific goals</li>
                            <li>Break complex features into steps</li>
                            <li>Test early and often</li>
                            <li>Be prepared to iterate</li>
                            <li>Have traditional tools as backup</li>
                        </ul>
                    </div>
                    <div class="bg-red-800/20 border-l-4 border-red-500 p-4 rounded">
                        <h3 class="font-bold text-red-400 mb-3">❌ Don'ts</h3>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>Don't attempt massive files</li>
                            <li>Don't rely on context across sessions</li>
                            <li>Don't expect perfect first attempts</li>
                            <li>Don't ignore AI's limitations</li>
                            <li>Don't abandon version control</li>
                        </ul>
                    </div>
                </div>
            </div>
        `,
        notes: [
            "These practices emerged from real experience building with conversational AI.",
            "The key is understanding AI as a powerful but imperfect development partner.",
            "Success requires adapting traditional development practices to AI's strengths and weaknesses."
        ]
    }
};

// Predefined presentation configurations
const presentationConfigs = {
    // 7-minute version uses a subset of slides
    "7min": [
        "plan",
        "couch-coding", 
        "core-problem",
        "demo-video",
        "file-size-fight",
        "pivot-pro-code",
        "coding-from-future",
        "iterative-loop",
        "final-qa"
    ],
    
    // Full presentation with all slides
    "full": [
        "plan",
        "challenge-prompts",
        "couch-coding",
        "core-problem",
        "feature-validation",
        "feature-past-tracking",
        "coding-conversation",
        "decision-fatigue",
        "chatgpt-questions",
        "file-size-fight",
        "demo-video",
        "pivot-pro-code",
        "mobile-workflow",
        "build-modernization",
        "ai-unit-tests",
        "lessons-learned",
        "productivity-hacks",
        "coding-from-future",
        "iterative-loop",
        "meta-workflow",
        "best-practices",
        "final-qa"
    ]
};

// Function to get slides array based on configuration or return default slide list
function getSlides(configName, fallbackSlides = null) {
    if (configName && presentationConfigs[configName]) {
        return presentationConfigs[configName].map(slideId => allSlides[slideId]);
    }
    // If no config name provided, return all slides as default list
    if (!configName && !fallbackSlides) {
        return Object.values(allSlides);
    }
    return fallbackSlides || [];
}

// Function to find slide index that should trigger propaganda overlay (accepts either slides array or config name)
function getPropagandaSlideIndex(param) {
    let slidesToCheck = [];
    if (Array.isArray(param)) slidesToCheck = param;
    else if (typeof param === 'string') slidesToCheck = getSlides(param);
    else slidesToCheck = [];

    return slidesToCheck.findIndex(slide => slide && slide.id === 'coding-from-future');
}

// Export for CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allSlides, presentationConfigs, getSlides, getPropagandaSlideIndex };
}

// Also attach to window for browser usage
if (typeof window !== 'undefined') {
    window.getSlides = getSlides;
    window.getPropagandaSlideIndex = getPropagandaSlideIndex;
}
