export interface Question {
    id: number;
    text: string;
    options: string[];
    correct: number;
}

export interface Module {
    id: string;
    title: string;
    type: 'video' | 'text' | 'quiz';
    duration: string;
    videoUrl?: string; // YouTube Embed URL
    description?: string;
    useCases?: string[];
    quiz?: Question[];
}

export interface Week {
    id: number;
    title: string;
    modules: Module[];
}

export interface CourseData {
    title: string;
    level: string;
    weeks: Week[];
}

export const level1Curriculum: CourseData = {
    title: "Introduction to Agentic AI",
    level: "Beginner",
    weeks: [
        {
            id: 1,
            title: "Week 1: Agent Concepts",
            modules: [
                {
                    id: "1.1",
                    title: "1.1 What is an AI Agent?",
                    type: "video",
                    duration: "45m",
                    videoUrl: "https://www.youtube.com/embed/5sLYAQS9sWQ", 
                    description: "Understanding the shift from static LLMs to autonomous capable AI. We cover the foundational transition from answering questions to executing multi-step intelligent behaviors.",
                    useCases: [
                        "Explaining agentic systems to stakeholders",
                        "Distinguishing between chatbots and agents",
                        "Designing use cases for autonomous task execution"
                    ],
                    quiz: [
                        { id: 1, text: "What defines an AI Agent?", options: ["A static database", "An LLM that can reason, observe, and take actions", "A text generator", "An image creator"], correct: 1 },
                        { id: 2, text: "Which component gives an agent ability to interact with the world?", options: ["Weights", "Tools/Functions", "Cost", "CSS"], correct: 1 },
                        { id: 3, text: "Do agents require a human to trigger every step?", options: ["Yes, always", "No, they operate autonomously through loops", "Yes, for safety", "Only via API"], correct: 1 },
                        { id: 4, text: "What is autonomy in the context of Agents?", options: ["Deciding the next action based on previous results without human intervention", "Running forever", "Hacking", "Generating long text"], correct: 0 },
                        { id: 5, text: "Can agents fail?", options: ["No, never", "Yes, they can fall into infinite loops or hallucinate actions", "Only on outdated hardware", "Only without tools"], correct: 1 }
                    ]
                },
                {
                    id: "1.2",
                    title: "1.2 The ReAct Pattern",
                    type: "video",
                    duration: "25m",
                    videoUrl: "https://www.youtube.com/embed/yFMVT3bcrJo",
                    description: "Learn the core ReAct (Reasoning and Acting) pattern. Discover how agents maintain an internal monologue to decide which tools to use and how to evaluate their observations.",
                    useCases: [
                        "Building a multi-step research agent",
                        "Debugging logic loops in LLMs",
                        "Implementing basic autonomy in code"
                    ],
                    quiz: [
                        { id: 1, text: "What is the ReAct pattern?", options: ["A UI library", "Reasoning + Acting over observations", "Reaction time testing", "A database system"], correct: 1 },
                        { id: 2, text: "In ReAct, what is an 'Observation'?", options: ["Looking at the screen", "The result returned from executing a specific tool/action", "A random thought", "User input"], correct: 1 },
                        { id: 3, text: "What comes before 'Action' in the ReAct loop?", options: ["Observation", "Thought (Reasoning)", "Error", "Completion"], correct: 1 },
                        { id: 4, text: "Why is the ReAct loop powerful?", options: ["It saves tokens", "It grounds the LLM in reality by allowing it to use external tools to verify information before answering", "It makes text shorter", "It is old"], correct: 1 },
                        { id: 5, text: "When does the ReAct loop stop?", options: ["Never", "When the agent decides it has reached the final answer", "After 1 step", "When the user clicks stop"], correct: 1 }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "Week 2: Memory & Tools",
            modules: [
                {
                    id: "2.1",
                    title: "2.1 Agent State Management",
                    type: "video",
                    duration: "30m",
                    videoUrl: "https://www.youtube.com/embed/Dep2-Rtl4Ow", 
                    description: "Agents need memory to keep track of their progress across multiple reasoning steps. We explore short-term context windows versus long-term vector database storage.",
                    useCases: [
                        "Creating agents that remember past conversations",
                        "Implementing state machines for complex workflows",
                        "Managing context window limits"
                    ],
                    quiz: [
                        { id: 1, text: "How do you manage agent memory?", options: ["By rebooting", "By providing conversational history and external database references (RAG) in the state", "By saving a file", "By deleting old messages"], correct: 1 },
                        { id: 2, text: "What is Short-Term Memory for an agent?", options: ["A hard drive", "The current context window history of thoughts and actions", "A flash drive", "Cache"], correct: 1 },
                        { id: 3, text: "What is Long-Term Memory for an agent?", options: ["The database", "External storage like Vector DBs accessed via tools", "The RAM", "The CPU"], correct: 1 },
                        { id: 4, text: "Why does state management matter?", options: ["It doesn't", "It prevents the agent from repeating actions or losing track of its goal", "It looks cool", "It saves electricity"], correct: 1 },
                        { id: 5, text: "Can agents summarize their own memory to save tokens?", options: ["No", "Yes, memory consolidation is a common pattern", "Only for images", "Only using Python"], correct: 1 }
                    ]
                },
                {
                    id: "2.2",
                    title: "2.2 Tool Use & Function Calling",
                    type: "video",
                    duration: "40m",
                    videoUrl: "https://www.youtube.com/embed/Fp-ue4UCE3s", 
                    description: "Learn how to endow an LLM with 'hands'. We will cover defining JSON schemas for function calling, letting your agent fetch live weather, stock prices, or query a database.",
                    useCases: [
                        "Building agents that interact with APIs",
                        "Executing code autonomously",
                        "Writing dynamic dashboards"
                    ],
                    quiz: [
                        { id: 1, text: "What is tool use in agents?", options: ["Using a hammer", "Allowing the LLM to output structured JSON to trigger external code execution", "Typing fast", "Using keyboard shortcuts"], correct: 1 },
                        { id: 2, text: "Who executes the tool?", options: ["The LLM weights", "The surrounding application runtime (e.g., Python/Node server) based on the LLM's structured output", "The user", "The cloud provider"], correct: 1 },
                        { id: 3, text: "Why are Tool Schemas important?", options: ["For aesthetics", "They define exactly what arguments the function expects so the LLM can format its request correctly", "For pricing", "For speed"], correct: 1 },
                        { id: 4, text: "Can an agent call multiple tools in parallel?", options: ["No, never", "Yes, modern models support parallel function calling", "Only on Sundays", "Only in Java"], correct: 1 },
                        { id: 5, text: "What happens if a tool returns an error?", options: ["The agent crashes instantly", "The error is returned to the agent as an observation so it can correct its mistake", "The user is banned", "The database drops"], correct: 1 }
                    ]
                }
            ]
        }
    ]
};

export const level2Curriculum: CourseData = {
    title: "Production Multi-Agent Systems",
    level: "Intermediate",
    weeks: [
        {
            id: 1,
            title: "Phase 1: Agentic Orchestration",
            modules: [
                {
                    id: "2.1.1",
                    title: "Multi-Agent Orchestration",
                    type: "video",
                    duration: "40m",
                    videoUrl: "https://www.youtube.com/embed/KoJAC3hVr5g",
                    description: "Moving from Single Agents to Multi-Agent systems. We explore frameworks like LangGraph and CrewAI to let different agents talk to each other to solve complex workflows.",
                    useCases: [
                        "Designing a research agent that briefs a writer agent",
                        "Building a coding agent supervised by a QA agent",
                        "Creating a manager agent that delegates to workers"
                    ],
                    quiz: [
                        { id: 1, text: "What is an advantage of Multi-Agent Systems?", options: ["Lower latency", "Separation of concerns and specialized personas solving sub-tasks", "Less code", "No LLM required"], correct: 1 },
                        { id: 2, text: "What is LangGraph used for?", options: ["Drawing charts", "Building stateful, multi-actor applications with LLMs modeling cyclical graphs", "Writing CSS", "Database management"], correct: 1 },
                        { id: 3, text: "Why define a 'Supervisor' agent?", options: ["To yell at other agents", "To route tasks to specialized worker agents and determine when the overall goal is met", "To increase costs", "To look corporate"], correct: 1 },
                        { id: 4, text: "How do agents communicate in these frameworks?", options: ["By modifying shared state or sending messages to each other", "By emailing each other", "By sending SMS", "They don't communicate"], correct: 0 },
                        { id: 5, text: "What happens if two agents disagree?", options: ["Infinite loop unless a coordination or consensus mechanism is built", "System crash", "The user decides", "The more expensive model wins"], correct: 0 }
                    ]
                },
                {
                    id: "2.1.2",
                    title: "Autonomous Workflow Design",
                    type: "video",
                    duration: "45m",
                    videoUrl: "https://www.youtube.com/embed/T-D1OfcDW1M",
                    description: "Learn how to design robust autonomous workflows. Transitioning from simple chains to complex directed acyclic graphs (DAGs) of LLM calls.",
                    useCases: [
                        "Building autonomous code review pipelines",
                        "Creating an enterprise knowledge compilation system",
                        "Improving reliability with conditional routing"
                    ],
                    quiz: [
                        { id: 1, text: "What is conditional routing in workflows?", options: ["A highway system", "Using an LLM decision to choose between different execution branches based on input data", "A router setting", "A CSS trick"], correct: 1 },
                        { id: 2, text: "What is a DAG?", options: ["A dog breed", "Directed Acyclic Graph, representing a workflow without loops", "Data Analysis Generator", "Digital Art Gallery"], correct: 1 },
                        { id: 3, text: "Why prefer workflows over pure autonomous agents for production?", options: ["Because they are slower", "Workflows offer predictability, reliability, and guaranteed paths compared to unconstrained agents", "Because they are autonomous", "There is no reason"], correct: 1 },
                        { id: 4, text: "What is 'human-in-the-loop'?", options: ["A UI element", "A pause in the workflow requiring human approval before the agent takes a critical action", "A coding pattern", "A test"], correct: 1 },
                        { id: 5, text: "How do you handle agent failure in workflows?", options: ["Give up", "Implement retry logic, fallbacks, and human escalation paths", "Delete the code", "Change the model"], correct: 1 }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "Phase 2: Tooling & Safety",
            modules: [
                {
                    id: "2.2.1",
                    title: "Agent Safety & Alignment",
                    type: "video",
                    duration: "35m",
                    videoUrl: "https://www.youtube.com/embed/7E-qdsVEoB8",
                    description: "As agents take actions, safety becomes critical. How do you prevent an agent from dropping your database or spending your API budget?",
                    useCases: [
                        "Implementing read-only modes",
                        "Using sandboxed execution environments",
                        "Designing fail-safes and budget caps"
                    ],
                    quiz: [
                        { id: 1, text: "What is the biggest risk of autonomous agents?", options: ["Boredom", "Unintended actions affecting production systems (e.g. deleting data)", "High electricity bill", "None"], correct: 1 },
                        { id: 2, text: "How do you sandbox an agent's code execution?", options: ["Run it in a Docker container or restricted VM rather than your main server", "Ask the LLM to be safe", "Run it locally", "You can't"], correct: 0 },
                        { id: 3, text: "What is an 'Allowlist' for agent tools?", options: ["A list of users", "Strictly defining and limiting which endpoints/APIs the agent is permitted to call", "A pricing tier", "A UI feature"], correct: 1 },
                        { id: 4, text: "Can LLMs suffer from Prompt Injection?", options: ["No", "Yes, malicious user input can trick the agent into misusing its tools", "Only open-source models", "Only if not paid for"], correct: 1 },
                        { id: 5, text: "What is Budget limit in Agentic systems?", options: ["A salary", "Setting max tokens or max loops to prevent runaway execution costs", "A tax", "A variable"], correct: 1 }
                    ]
                }
            ]
        }
    ]
};
