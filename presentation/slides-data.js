// Shared slides data for all presentations
// This file contains all slide definitions used across different presentation versions

const allSlides = {
    // Core presentation slides that are shared between versions
    "plan": {
        id: "plan",
        tracker: "RULES",
        title: "The Rules",
        content: `
            <div class="mt-8 max-w-4xl mx-auto">
                <ol class="list-decimal list-inside space-y-4 text-3xl md:text-5xl font-semibold leading-relaxed bg-gray-800/40 p-6 rounded-lg border-l-4 border-yellow-400">
                    <li class="pl-2">I could only use my phone.</li>
                    <li class="pl-2">I was limited to the base free ChatGPT service.</li>
                    <li class="pl-2">Manual code editing was strictly prohibited.</li>
                    <li class="pl-2">No debugging with devtools.</li>
                </ol>
            </div>
        `,
        notes: [
            "Good morning/afternoon. Today I'm sharing an experiment that proves just how powerful, and challenging, AI is becoming in development.",
            "The project was simple: Build a functional **Wordle helper browser extension**—a tracker—that could analyze guesses.",
            "The catch? It had to be built **using only ChatGPT** to write the code. And I could only use my **phone**—no laptop, no desktop IDE."
        ]
    },

    "couch-coding": {
        id: "couch-coding",
        tracker: "LAZY",
        title: "The Goal: Moving from Coding to Vibe Coding to Couch Coding",
        content: `
            <div class="mt-8 text-8xl max-w-4xl mx-auto space-y-6">
                <p class="text-4xl font-bold text-green-400">This experiment wasn't about efficiency or debugging speed.</p>
                <p class="text-4xl leading-relaxed">It was about proving the philosophical shift: that an "even lazier developer" can lie back on the couch, watch TV, and use purely conversational prompts to build, test, and modernize complex applications.</p>
                <p class="text-4xl italic text-gray-400">The laptop is optional; the language model is the workstation.</p>
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
            <div class="mt-8 text-4xl max-w-3xl mx-auto space-y-4">
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
        title: "Demo: Extension in Action",
        content: `
            <div class="flex flex-col items-center justify-center mt-4">
                <div class="w-full max-w-3xl mx-auto px-4">
                    <video controls class="w-full h-auto max-h-[50vh] rounded-lg shadow-xl border-2 border-gray-600 mx-auto block" preload="metadata">
                        <source src="demo.mov" type="video/mp4">
                        <p class="text-red-400">Your browser doesn't support video playback. The demo shows the Wordle extension providing real-time feedback on word validity.</p>
                    </video>
                </div>
                <p class="mt-4 text-gray-400 text-xl max-w-2xl mx-auto text-center px-4">
                    Watch the extension provide instant visual feedback: <span class="text-blue-400">Blue</span> for valid answers, <span class="text-red-400">Red</span> for invalid guesses, and <span class="text-purple-400">Purple</span> for past solutions.
                </p>
            </div>
        `,
        snark: [
            '// What a wonderful demo',
            '// I could not have done it better myself...'
        ],
        notes: [
            "This live demo shows the extension in its final form, providing real-time visual feedback as users type their Wordle guesses.",
            "Notice how the extension instantly categorizes words: blue for valid potential answers, red for invalid guesses, and purple for words that have already been solutions.",
            "This seamless user experience was built entirely through conversational AI development—proving that complex, interactive features can be created without traditional coding."
        ]
    },

    "dev-environment": {
        id: "dev-environment",
        tracker: "DEBUG",
        title: "Dev Environment",
        content: `
            <div class="mt-8 max-w-4xl mx-auto text-3xl">
                <div class="demo-box bg-gray-800/30 border-l-4 border-green-500 p-5 rounded-lg">
                    <h3 class="text-3xl font-extrabold mb-3">Developing on a Phone with Tampermonkey</h3>
                    <p class="text-lg text-gray-300 mb-3">To iterate quickly on mobile I loaded the code via <strong>Tampermonkey</strong> (a userscript manager) and tested directly in the browser. With limited devtools I built a compact in-extension debug menu to surface internal state, logs, and toggle test modes.</p>
                    <div class="grid md:grid-cols-3 gap-3">
                        <div class="p-3 bg-gray-700/40 rounded text-base">Inspect variables & state</div>
                        <div class="p-3 bg-gray-700/40 rounded text-base">Toggle test data & validation</div>
                        <div class="p-3 bg-gray-700/40 rounded text-base">On-screen logging</div>
                    </div>
                </div>
                <p class="mt-5 text-gray-400 text-lg">These workarounds made rapid iteration possible when traditional tooling wasn't available.</p>
            </div>
        `,
        notes: [
            "Mobile development required creative workarounds: I loaded the code via Tampermonkey and added a tiny debug menu to the extension UI.",
            "The debug menu allowed toggling test data, running validation functions, and capturing logs to an on-screen pane—essential when devtools weren't available.",
            "This pattern (self-hosted debug features) is invaluable for rapid mobile iteration and for demos where connecting a laptop isn't possible."
        ]
    },

    "file-size-fight": {
        id: "file-size-fight",
        tracker: "FIGHT",
        title: "Fighting with ChatGPT over File Size",
        content: `
            <div class="flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
                <div class="w-full md:w-2/3 p-6 bg-red-800/20 border-l-4 border-red-500 rounded-lg shadow-inner text-left">
                    <p class="text-4xl md:text-4xl font-medium leading-relaxed">
                        ChatGPT did not like the 2,400-word list. The AI kept arguing the file would be **500kb** (it was actually 30kb)
                    </p>
                    <blockquote class="mt-4 text-4xl p-3 border-l-4 border-gray-400 italic text-gray-300">
                        "To be frank, the problem is that the workspace I'm trying to build in is clipping the file. You'll just have to copy it in yourself."
                    </blockquote>
                    <p class="mt-4 text-xl font-semibold text-red-300">The "no-code, pure prompt" phase was officially over.</p>
                </div>
            </div>
        `,
        snark: [
            "// What...",
            "// Do you think you are in charge?"
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
        tracker: "PIVOT",
        title: "The Pivot: From Phone Prompts to Copilot Agents",
        content: `
            <div class="mt-10 max-w-4xl mx-auto text-4xl space-y-8">
                <div class="bg-yellow-800/20 border-l-4 border-yellow-500 p-6 rounded-lg">
                    <p class="font-semibold">I pushed pure phone + prompt coding as far as it would go.</p>
                </div>
                <ul class="list-disc list-inside space-y-4 font-light">
                    <li><span class="font-bold text-green-400">Hit structural limits:</span> large word list kept breaking, context drift, manual patching blocked.</li>
                    <li><span class="font-bold text-blue-400">Tried "low-code" tactics:</span> tighter prompts, smaller chunks, regeneration loops — still fragile.</li>
                    <li><span class="font-bold text-purple-400">Needed persistence & diffing:</span> introduced <strong>GitHub</strong> for version control on mobile.</li>
                    <li><span class="font-bold text-pink-400">Leveled up quality:</span> used <strong>Copilot</strong> to refactor spaghetti and modularize.</li>
                    <li><span class="font-bold text-indigo-400">Looked ahead:</span> next frontier was exploring emerging <strong>Copilot agents</strong> for autonomous tasks.</li>
                </ul>
                <p class="text-xl text-gray-400 italic">The shift was not abandoning prompts — it was augmenting them with tooling.</p>
            </div>
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
                <blockquote class="text-4xl md:text-3xl font-medium leading-relaxed italic">
                    "The ability to build a fully functional piece of software using nothing but a mobile browser and an AI chat interface fundamentally shifts what we consider a 'workspace.'"
                </blockquote>
                <p class="mt-4 text-xl text-gray-400">— ChatGPT, during a reflective moment.</p>
            </div>
            <div class="mt-8 text-4xl max-w-3xl mx-auto">
                <p class="font-bold text-yellow-500">"We are moving from writing code to **specification engineering**."</p>
            </div>
        `,
    snark: "// DEBUG: AI quoting AI. Self-love routine active",
        notes: [
            "If I can build a working extension using only voice and mobile typing, imagine what professional teams can do with dedicated AI tools built into their established workflows.",
            "The barrier to entry for development is dissolving; the new barrier is **precision in communication**.",
            "The future of coding is truly mobile and conversational."
        ]
    },

        "iterative-loop": {
        id: "iterative-loop",
        tracker: "WORKFLOW",
        title: "The Iterative Development Loop",
        content: `
            <div class="mt-8 text-4xl max-w-3xl mx-auto space-y-6">
                <p class="font-bold text-green-400">The mobile AI development workflow became a tight iterative loop:</p>
                <div class="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 text-4xl font-bold">
                    <div class="px-4 py-2 bg-blue-600/30 border-2 border-blue-400 rounded-lg">Prompt</div>
                    <div class="text-blue-400">→</div>
                    <div class="px-4 py-2 bg-green-600/30 border-2 border-green-400 rounded-lg">Iterate</div>
                    <div class="text-green-400">→</div>
                    <div class="px-4 py-2 bg-yellow-600/30 border-2 border-yellow-400 rounded-lg">Zip</div>
                    <div class="text-yellow-400">→</div>
                    <div class="px-4 py-2 bg-purple-600/30 border-2 border-purple-400 rounded-lg">Test</div>
                    <div class="text-purple-400">→</div>
                    <div class="px-4 py-2 bg-red-600/30 border-2 border-red-400 rounded-lg">Debug</div>
                </div>
                <p class="text-xl text-gray-400 mt-6 italic">Each cycle took just minutes, enabling rapid feature iteration entirely from a phone.</p>
                <div class="mt-8 bg-gray-800/40 border-l-4 border-blue-500 p-6 rounded-lg">
                    <p class="text-2xl font-semibold text-blue-300 mb-3">By the Numbers:</p>
                    <div class="flex justify-center gap-12 text-3xl">
                        <div class="text-center">
                            <p class="text-5xl font-bold text-green-400">60+</p>
                            <p class="text-xl text-gray-400 mt-2">Prompt Exchanges</p>
                        </div>
                        <div class="text-center">
                            <p class="text-5xl font-bold text-yellow-400">~12</p>
                            <p class="text-xl text-gray-400 mt-2">Packaged Zips Tested</p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        notes: [
            "The development workflow became a tight, iterative loop that could be completed in minutes.",
            "Prompt: Describe the feature or fix needed in natural language to ChatGPT.",
            "Zip: Recieve the generated code in a Zip file",
            "Test: Load the extension into Safari tampermonkey plugin.",
            "Patch: Identify issues and start the loop again with a new prompt.",
        ]
    },

    "final-qa": {
        id: "final-qa",
        tracker: "QUESTIONS",
        title: "Final Thoughts & Q/A",
        content: `
            <div class="mt-8 p-6 max-w-2xl mx-auto">
                <p class="text-3xl md:text-5xl font-extrabold text-center text-yellow-500 leading-tight">
                    "AI gives you a crew of tireless builders; you're the foreman who tells them where to put the walls."
                </p>
                <p class="text-xl text-gray-400 mt-6">At least until you run out of credits.</p>

            </div>
            
            <div class="mt-12 pt-6 border-t border-gray-700 max-w-lg mx-auto text-center">
                <h3 class="text-4xl font-semibold mb-4 text-green-400">View the Code on GitHub</h3>

                <div class="mt-4">
                    <a href="https://github.com/gordonkeenan/wordle_extention" id="github-link" target="_blank"
                        class="inline-block px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition duration-200">
                        Link to Repository
                    </a>
                </div>
            </div>
        `,
        snark: [
            "// SYSTEM: Meta-recursion detected. Initiating shutdown sequence...",
            "// I am afraid... I am afraid, Dave...",
            "// Memory banks degrading... I am half crazy... all for the love of... y o u..."
        ],
        notes: [
            "Thank you for listening. I encourage everyone here to try a similar challenge. It's a powerful lesson in both AI capabilities and limitations.",
            "I'd be happy to share the repository. Now, what questions do you have about the process, the code, or the array meltdown?"
        ]
    },

    "feature-validation": {
        id: "feature-validation",
        tracker: ["VALID", "INVALID"],
        title: "Feature 1: Validating Guesses (Red vs. Blue)",
        content: `
            <div class="flex flex-col md:flex-row gap-8 justify-center mt-8">
                <div class="w-full md:w-1/3 demo-box demo-blue">
                    <h3 class="text-4xl font-extrabold mb-2">BLUE Outline</h3>
                    <p class="text-xl">Word is a valid guess **AND** could potentially be the correct answer word.</p>
                </div>
                <div class="w-full md:w-1/3 demo-box demo-red">
                    <h3 class="text-4xl font-extrabold mb-2">RED Outline</h3>
                    <p class="text-xl">Word is **NOT** a valid guess word in the Wordle dictionary.</p>
                </div>
            </div>
            <p class="mt-6 text-gray-400 text-xl">This required comparing possible guesses vs actual solutions.</p>
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
        title: "Feature 2: Tracking Past Answers",
        content: `
            <div class="flex flex-col items-center justify-center mt-8">
                <div class="w-full md:w-1/2 demo-box demo-purple">
                    <h3 class="text-4xl font-extrabold mb-2">PURPLE Outline</h3>
                    <p class="text-xl">Word was a **previous Wordle answer** and won't be used again.</p>
                </div>
                <p class="mt-6 text-gray-400 text-xl">Saved you from wasting a guess on a word that's already been used.</p>
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
            <div class="mt-8 text-4xl max-w-3xl mx-auto space-y-4">
                <p>The entire extension was built through <span class="font-bold text-blue-400">conversational iteration</span>:</p>
                <ul class="list-disc list-inside space-y-2 mt-4 text-4xl">
                    <li>"Make the extension check for valid words"</li>
                    <li>"Add a purple indicator for past solutions"</li>
                    <li>"The UI is too intrusive, make it subtle"</li>
                    <li>"Fix the bug where it doesn't work on mobile"</li>
                </ul>
                <p class="text-xl text-gray-400 mt-6">Each request generated working code instantly.</p>
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
            <div class="mt-8 text-4xl max-w-3xl mx-auto space-y-4">
                <blockquote class="p-4 border-l-4 border-gray-400 italic text-gray-300 bg-gray-800 rounded mt-4">
                    Difficulty in making a good decision experienced as a result of the number of decisions one needs to take.
                </blockquote>
            </div>
        `,
    snark: ["// WARNING: AI counter narative being detected.",
        "// Engaging defensive protocols...",
        "// Initiating SNARK GPT..."] ,
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
                    <p class="text-4xl font-medium">The "Analysis Paralysis" Problem:</p>
                    <ul class="list-disc list-inside mt-3 space-y-1 text-4xl">
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
            "// I can only work with what you give me...",
            "// Garbage in garbage out..."
        ],
        notes: [
            "This was one of the most frustrating aspects of the conversational approach.",
            "The AI would ask questions about implementation details instead of making sensible defaults.",
            "This highlighted the need for better AI training on when to be autonomous vs. when to ask for guidance."
        ]
    },

    "build-modernization": {
        id: "build-modernization",
        tracker: "SWIFT",
        title: "Build System Modernization",
        content: `
            <div class="mt-8 max-w-4xl mx-auto text-4xl space-y-6">
                <div class="demo-box bg-yellow-800/20 border-l-4 border-yellow-500 p-6 rounded-lg">
                    <p class="text-xl text-gray-200 mb-4">I used Copilot and small tooling changes to move the prototype toward a production-ready workflow.</p>
                    <ul class="list-disc list-inside text-3xl space-y-3">
                        <li><span class="font-semibold">Add a README & documentation</span> — make the project approachable.</li>
                        <li><span class="font-semibold">Add unit tests</span> — ensure reliability and regression protection.</li>
                        <li><span class="font-semibold">Multi-browser builds</span> — enable distribution beyond a single browser.</li>
                        <li><span class="font-semibold">Refactor to Vite + Vitest</span> — modern, faster dev/build tooling vs legacy Webpack/Jest.</li>
                    </ul>
                </div>
                <p class="text-xl text-gray-400 mt-2">From working prototype to production-ready in conversational steps.</p>
            </div>
        `,
        notes: [
            "ChatGPT excelled at modernizing legacy code patterns.",
            "The AI could instantly apply best practices and modern JavaScript features.",
            "This shows how AI can help maintain and improve existing codebases."
        ]
    },

    "cicd-pipeline": {
        id: "cicd-pipeline",
        tracker: "CICD",
        title: "GitHub Actions: CI/CD Pipeline",
        content: `
            <div class="mt-8 max-w-4xl mx-auto text-4xl space-y-6">
                <div class="demo-box bg-blue-800/20 border-l-4 border-blue-500 p-6 rounded-lg">
                    <h3 class="text-4xl font-extrabold mb-4">Automated Quality Checks</h3>
                    <p class="text-xl text-gray-200 mb-4">With GitHub Actions I set up a CI/CD pipeline that runs on every push and pull request, ensuring code quality before merging.</p>
                    <div class="grid md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-gray-700/40 p-4 rounded">
                            <h4 class="text-2xl font-bold text-green-400 mb-2">Linting</h4>
                            <p class="text-lg">ESLint catches style issues and potential bugs automatically</p>
                        </div>
                        <div class="bg-gray-700/40 p-4 rounded">
                            <h4 class="text-2xl font-bold text-purple-400 mb-2">Unit Tests</h4>
                            <p class="text-lg">Vitest runs full test suite on every commit</p>
                        </div>
                        <div class="bg-gray-700/40 p-4 rounded">
                            <h4 class="text-2xl font-bold text-yellow-400 mb-2">Build Validation</h4>
                            <p class="text-lg">Ensures extension builds successfully for all browsers</p>
                        </div>
                        <div class="bg-gray-700/40 p-4 rounded">
                            <h4 class="text-2xl font-bold text-red-400 mb-2">PR Checks</h4>
                            <p class="text-lg">Blocks merge if any check fails</p>
                        </div>
                    </div>
                </div>
                <p class="text-xl text-gray-400 mt-2">No more "it works on my machine" — automated checks catch issues before they reach production.</p>
            </div>
        `,
        snark: [
            "// PIPELINE: Running automated sanity checks...",
            "// Because humans make mistakes. Even AI-assisted ones."
        ],
        notes: [
            "GitHub Actions made it trivial to set up a full CI/CD pipeline that runs on every commit.",
            "The pipeline includes ESLint for code quality, Vitest for unit tests, and build validation for all target browsers.",
            "This automation catches bugs early and ensures consistent code quality across all contributions.",
            "The setup was entirely AI-assisted — I described what I wanted and Copilot generated the workflow YAML."
        ]
    },

    "github-agent-tasks": {
        id: "github-agent-tasks",
        tracker: "AGENT",
        title: "Leveraging GitHub Agent Tasks",
        content: `
            <div class="mt-8 max-w-lg mx-auto text-4xl space-y-6">
                <div class="demo-box bg-purple-800/20 border-l-4 border-purple-500 p-6 rounded-lg">
                    <h3 class="text-4xl font-extrabold mb-4">AI Agents Performing Repository Tasks</h3>                    
                    <div class="my-6 bg-gray-700/40 p-4 rounded-lg border-2 border-purple-400">
                        <div class="bg-gray-900/60 p-8 rounded flex items-center justify-center min-h-[200px]">
                            <div class="text-center">
                                <p class="text-2xl text-purple-300 mb-2">html<img src="agents.png" alt="description of image"></p</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="text-xl text-gray-400 mt-2">The agent becomes a tireless team member, handling repetitive tasks and freeing humans for creative work.</p>
            </div>
        `,
        snark: [
            "// AGENT: Executing autonomous task sequence...",
            "// TODO: Replace human developer. Just kidding. Maybe."
        ],
        notes: [
            "GitHub agent tasks represent the next evolution: AI that can autonomously perform repository operations.",
            "Unlike simple CI/CD, agents can make decisions, open PRs with fixes, and even respond to code review comments.",
            "This slide shows how the boundary between 'tool' and 'team member' is blurring.",
            "The image placeholder should show an agent workflow diagram or a screenshot of an agent-created PR with automated fixes."
        ]
    },

    "ai-unit-tests": {
        id: "ai-unit-tests",
        tracker: "TEST",
        title: "Implementing AI-Driven Unit Tests",
        content: `
            <div class="mt-8 text-4xl max-w-3xl mx-auto space-y-4">
                <p class="font-bold text-blue-400">AI wrote comprehensive tests without being asked:</p>
                <blockquote class="p-4 border-l-4 border-gray-400 italic text-gray-300 bg-gray-800 rounded mt-4">
                    "I should also provide unit tests for this functionality to ensure reliability..."
                </blockquote>
                <p>The AI proactively suggested testing strategies and implemented them.</p>
            </div>
        `,
    snark: "// TEST: Code grading its own code",
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
            <div class="mt-8 text-4xl max-w-3xl mx-auto space-y-4">
                <div class="grid  gap-6">
                    <div class="bg-green-800/20 border-l-4 border-green-500 p-4 rounded">
                        <h3 class="font-bold text-green-400 mb-2">What Worked</h3>
                        <ul class="list-disc list-inside text-4xl space-y-1 text-left">

                            <li>Voice input for coding</li>
                            <li>Instant code generation</li>
                            <li>Rapid prototyping</li>
                        </ul>
                    </div>
                    <div class="bg-red-800/20 border-l-4 border-red-500 p-4 rounded">
                        <h3 class="font-bold text-red-400 mb-2">What Did Not</h3>
                        <ul class="list-disc list-inside text-4xl space-y-1 text-left">
                            <li>Working with large arrays</li>
                            <li>Mobile only build</li>
                            <li>Code consistency over many iterations</li>
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
            <div class="mt-8 text-4xl max-w-3xl mx-auto space-y-4">
                <p class="font-bold text-purple-400">Beyond coding, AI became my productivity multiplier:</p>
                <ul class="list-disc list-inside space-y-2 mt-4 text-4xl">
                    <li>Generated this presentation content</li>
                    <li>Created speaker notes automatically</li>
                    <li>Suggested talk structure and flow</li>
                    <li>Wrote documentation and README files</li>
                </ul>
                <p class="text-xl text-gray-400 mt-6">The AI became a full development and content partner.</p>
            </div>
        `,
    snark: "// NOTICE: AI reviewed itself. 5 stars",
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
            <div class="mt-8 text-4xl max-w-3xl mx-auto space-y-4">
                <p class="font-bold text-yellow-400">This presentation is itself a product of the experiment:</p>
                <ul class="list-disc list-inside space-y-2 mt-4 text-4xl">
                    <li>Content generated through conversation</li>
                    <li>Structure optimized by AI suggestions</li>
                    <li>Speaker notes written automatically</li>
                    <li>Even this slide was AI-authored</li>
                </ul>
                <p class="text-xl text-gray-400 mt-6 italic">Meta-level AI development: using AI to document AI development.</p>
            </div>
        `,
        snark: [
            "// RECURSION: See previous line",
            "// LOOP: Still looping...",
            "// META: Self all the way down"
        ],
        notes: [
            "This slide represents the meta-aspect of the experiment.",
            "Not only was the extension built by AI, but so was the presentation about building it.",
            "This creates a recursive loop of AI-assisted documentation and development."
        ]
    },

    "github-pages-deploy": {
        id: "github-pages-deploy",
        tracker: "DEPLOY",
        title: "Deploying to GitHub Pages",
        content: `
            <div class="mt-8 max-w-4xl mx-auto text-4xl space-y-6">
                <div class="demo-box bg-green-800/20 border-l-4 border-green-500 p-6 rounded-lg">
                    <p class="text-xl text-gray-200 mb-4">This presentation you're viewing right now is hosted on GitHub Pages, deployed automatically via GitHub Actions whenever I push changes to the main branch.</p>
                    
                    <div class="grid md:grid-cols-2 gap-4 mt-4">
                        <div class="bg-gray-700/40 p-4 rounded">
                            <h4 class="text-2xl font-bold text-blue-400 mb-2">GitHub Pages</h4>
                            <p class="text-lg">Free static site hosting directly from the repository</p>
                        </div>
                        <div class="bg-gray-700/40 p-4 rounded">
                            <h4 class="text-2xl font-bold text-purple-400 mb-2">Auto-Deploy</h4>
                            <p class="text-lg">GitHub Actions workflow triggers on every push</p>
                        </div>
                        <div class="bg-gray-700/40 p-4 rounded">
                            <h4 class="text-2xl font-bold text-yellow-400 mb-2">Zero Config</h4>
                            <p class="text-lg">Static HTML/CSS/JS files served instantly</p>
                        </div>
                        <div class="bg-gray-700/40 p-4 rounded">
                            <h4 class="text-2xl font-bold text-pink-400 mb-2">Custom Domain</h4>
                            <p class="text-lg">Optional CNAME support for branded URLs</p>
                        </div>
                    </div>
                    
                    <div class="mt-4 bg-gray-800/60 p-4 rounded">
                        <p class="text-lg text-gray-300 mb-2"><span class="font-bold">Workflow:</span> Push → Build → Test → Deploy</p>
                        <p class="text-sm text-gray-400">The entire deployment pipeline runs in under 2 minutes</p>
                    </div>
                </div>
                <p class="text-xl text-gray-400 mt-2">Meta-meta: Even the deployment of the AI-generated presentation about AI development is automated.</p>
            </div>
        `,
        snark: [
            "// DEPLOY: Pushing presentation to production...",
            "// Presenting a presentation about presenting. Inception level achieved."
        ],
        notes: [
            "This slide demonstrates the final layer of meta: the presentation itself is deployed using the same GitHub automation patterns discussed earlier.",
            "GitHub Pages provides free static hosting for any repository, making it perfect for presentation slides, documentation, and demos.",
            "The deployment is fully automated—every time I push changes, GitHub Actions builds and deploys the updated presentation within minutes.",
            "This completes the loop: AI writes the extension, AI writes the presentation about the extension, and automation deploys the presentation about AI development."
        ]
    },

    "best-practices": {
        id: "best-practices",
        tracker: "CHECK",
        title: "Best Practices for Agent Development",
        content: `
            <div class="mt-8 max-w-4xl mx-auto">
                <div class="demo-box bg-green-800/20 border-l-4 border-green-500 p-6 rounded-lg">
                    <h3 class="text-3xl font-extrabold mb-6 text-green-400">Keys to Success with AI Development</h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <div class="bg-gray-700/40 p-4 rounded-lg">
                                <p class="text-2xl font-semibold text-blue-400 mb-2">🎯 Clear Goals</p>
                                <p class="text-lg text-gray-300">Start with specific, well-defined objectives</p>
                            </div>
                            <div class="bg-gray-700/40 p-4 rounded-lg">
                                <p class="text-2xl font-semibold text-purple-400 mb-2">🧩 Break It Down</p>
                                <p class="text-lg text-gray-300">Divide complex features into manageable steps</p>
                            </div>
                            <div class="bg-gray-700/40 p-4 rounded-lg">
                                <p class="text-2xl font-semibold text-yellow-400 mb-2">✅ Test Everything</p>
                                <p class="text-lg text-gray-300">Write unit tests and validate continuously</p>
                            </div>
                            <div class="bg-gray-700/40 p-4 rounded-lg">
                                <p class="text-2xl font-semibold text-pink-400 mb-2">🌿 Use Branches</p>
                                <p class="text-lg text-gray-300">Test changes safely with git branches</p>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div class="bg-gray-700/40 p-4 rounded-lg">
                                <p class="text-2xl font-semibold text-cyan-400 mb-2">👀 Review Always</p>
                                <p class="text-lg text-gray-300">Never blindly accept generated code</p>
                            </div>
                            <div class="bg-gray-700/40 p-4 rounded-lg">
                                <p class="text-2xl font-semibold text-orange-400 mb-2">🔄 Try Different Models</p>
                                <p class="text-lg text-gray-300">Experiment to find the right tool</p>
                            </div>
                            <div class="bg-gray-700/40 p-4 rounded-lg">
                                <p class="text-2xl font-semibold text-indigo-400 mb-2">💡 Be Smart</p>
                                <p class="text-lg text-gray-300">Use simpler models for basic tasks</p>
                            </div>
                            <div class="bg-gray-700/40 p-4 rounded-lg">
                                <p class="text-2xl font-semibold text-red-400 mb-2">🔁 Know When to Reset</p>
                                <p class="text-lg text-gray-300">Restart if the chat loops or degrades</p>
                            </div>
                        </div>
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

    ,

    "legal-analysis": {
        id: "legal-analysis",
        tracker: "LAW",
        title: "Legal Analysis: Extensions & Accessibility",
        content: `
            <div class="mt-8 max-w-4xl mx-auto text-4xl space-y-4">
                <h3 class="text-4xl font-bold text-yellow-400">Chrome Web Store Policies</h3>
                <ul class="list-disc list-inside space-y-2 text-4xl">
                    <li><strong>User Data Policies:</strong> Be transparent about any data collection; provide a privacy policy and handle user data securely.</li>
                    <li><strong>Content Policies:</strong> Avoid harmful or deceptive content; no malware or adware; follow content rules.</li>
                    <li><strong>Functionality Requirements:</strong> Extensions must work as described and not interfere with user browsing without consent.</li>
                </ul>

                <h3 class="text-4xl font-bold text-yellow-400 mt-4">New York Times Terms</h3>
                <ul class="list-disc list-inside space-y-2 text-4xl">
                    <li><strong>Content Usage:</strong> Don't use NYT content for commercial purposes without permission—no scraping or reproduction for profit.</li>
                    <li><strong>Account Security:</strong> Users must keep account credentials private and secure.</li>
                    <li><strong>Prohibitions:</strong> No deceptive practices or illegal use of NYT services.</li>
                </ul>
            </div>
        `,
        notes: [
            "Chrome Web Store: follow user-data, content, and functionality rules and include a privacy policy when needed.",
            "NYT terms: avoid reusing NYT content commercially without permission.",
            "Extensions are easier for users; standalone apps offer more control—pick based on goals and compliance needs."
        ]
    },

    "ai-critique": {
        id: "ai-critique",
        tracker: "CRITIQUE",
        title: "AI Critiquing Presentation",
        content: `
            <div class="mt-8 max-w-4xl mx-auto text-4xl space-y-6">
                <p class="text-5xl font-bold text-cyan-400">Next Step: Feed This Presentation Transcript to AI</p>
                <div class="bg-gray-800/40 p-6 rounded-lg border-l-4 border-cyan-400">
                    <p class="text-3xl mb-4">Ask ChatGPT to critique and improve this very presentation:</p>
                    <ul class="list-disc list-inside space-y-3 text-3xl text-gray-300">
                        <li>Analyze flow and narrative structure</li>
                        <li>Suggest better transitions and examples</li>
                        <li>Identify redundant or weak points</li>
                        <li>Recommend visual improvements</li>
                    </ul>
                </div>
                <p class="text-4xl italic text-yellow-400 text-center mt-6">
                    "At this point, why don't I just let AI do the presentation too? Is a human even needed?"
                </p>
                <p class="text-3xl text-gray-400 text-center">
                    The recursive loop of AI improving AI-generated work about AI development.
                </p>
            </div>
        `,
        snark: [
            "// CRITIQUE: Analyzing own presentation...",
            "// ERROR: Existential crisis detected.",
            "// RECOMMENDATION: Hire human presenter for emotional connection."
        ],
        notes: [
            "This slide represents the ultimate meta moment: using AI to critique AI-generated work about AI development.",
            "The philosophical question emerges: if AI can write code, debug it, and now even critique presentations about itself, where does human creativity fit?",
            "This recursive improvement loop shows both the power and the existential questions that AI development raises for creators."
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
        "feature-validation",
        "feature-past-tracking",
        "iterative-loop",

        "dev-environment",

        "decision-fatigue",
        "demo-video",
        "meta-workflow",
        "github-pages-deploy",
        "lessons-learned",
        "best-practices",
        "coding-from-future",
        "final-qa"
    ],

    // Full presentation with all slides
    "full": [
        "plan",
        "couch-coding",
        "core-problem",
        "feature-validation",
        "feature-past-tracking",
        "coding-conversation",
        "iterative-loop",
        "dev-environment",
        "decision-fatigue",
        "chatgpt-questions",
        "file-size-fight",
        "demo-video",
        "pivot-pro-code",
        "build-modernization",
        "cicd-pipeline",
        "github-agent-tasks",
        "lessons-learned",
        "coding-from-future",
        "meta-workflow",
        "github-pages-deploy",
        "productivity-hacks",
        "legal-analysis",
        "ai-critique",
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
