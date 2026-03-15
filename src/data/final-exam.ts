export interface FinalExamQuestion {
    id: number;
    question: string;
    options: string[];
    correct: number; // 0-indexed index of options
}

export const finalExamQuestions: FinalExamQuestion[] = [
    { id: 1, question: "What is an AI Agent fundamentally?", options: ["A static database.", "A system that uses an LLM to reason, observe, and decide actions autonomously.", "A text formatting tool.", "A hardware component."], correct: 1 },
    { id: 2, question: "The ReAct pattern stands for:", options: ["React JavaScript Library", "Reasoning and Acting", "Rapid Execution and Computational Thinking", "Return and Action"], correct: 1 },
    { id: 3, question: "Which pattern is best suited for agents interacting with external APIs?", options: ["Zero-shot text generation", "Tool Use / Function Calling", "Prompt compression", "Temperature tuning"], correct: 1 },
    { id: 4, question: "What is 'Observation' in the context of an Agentic Loop?", options: ["The agent watching a video.", "The result returned back to the LLM after executing a tool/action.", "A metric of latency.", "The user's initial prompt."], correct: 1 },
    { id: 5, question: "Which best prevents autonomous agents from running forever and consuming budget?", options: ["Lowering temperature.", "Configuring a 'max loops' or 'budget cap' limit.", "Using the newest model.", "Removing all tools."], correct: 1 },
    { id: 6, question: "What does 'State Management' mean in LangGraph or Agent frameworks?", options: ["Managing React states.", "Keeping track of conversational context, thoughts, and data across multiple agent execution steps.", "Managing API keys.", "Deploying to production."], correct: 1 },
    { id: 7, question: "When building Multi-Agent systems, what is the role of a 'Supervisor'?", options: ["To delete bad code.", "To orchestrate the workflow, distribute tasks to worker agents, and review final output.", "To process payments.", "To format the UI."], correct: 1 },
    { id: 8, question: "To ensure an agent doesn't execute destructive commands on a database, you should:", options: ["Tell it in the prompt not to be evil.", "Implement strict allowlists, read-only permissions, or human-in-the-loop approvals.", "Increase token limits.", "Use an older LLM."], correct: 1 },
    { id: 9, question: "A DAG (Directed Acyclic Graph) in workflows represents:", options: ["A loop of infinite actions.", "A clearly defined, predictable multi-step process for LLMs to follow without loops.", "A vector database representation.", "A UI library."], correct: 1 },
    { id: 10, question: "How does an agent know how to call a completely custom tool?", options: ["It guesses the API.", "By reading an injected JSON Schema that describes the tool's name, purpose, and required arguments.", "It searches the web.", "It cannot call custom tools."], correct: 1 },
    { id: 11, question: "What is the primary difference between a 'Chain' and an 'Agent'?", options: ["Chains are hardcoded sequences of LLM calls; Agents allow the LLM to decide the sequence dynamically.", "There is no difference.", "Chains use more tokens.", "Agents are only for Python."], correct: 0 },
    { id: 12, question: "What failure scenario occurs when an agent fails to synthesize observations and keeps trying the same failed tool call?", options: ["Hallucination Hijack", "Infinite ReAct Loop", "Context Collapse", "Token Overflow"], correct: 1 },
    { id: 13, question: "Which helps verify an agent's reasoning process?", options: ["Hiding the logs.", "Logging the intermediate 'Thoughts' and 'Observations'.", "Increasing temperature.", "Removing context."], correct: 1 },
    { id: 14, question: "“Human-in-the-loop” refers to:", options: ["An agent impersonating a human.", "Pausing agent execution to prompt a real human for authorization or input before proceeding.", "A bug in the system.", "A data entry job."], correct: 1 },
    { id: 15, question: "Which framework is primarily designed for orchestrating stateful, multi-actor cyclic applications?", options: ["LangGraph", "React", "Express", "Tailwind"], correct: 0 },
    { id: 16, question: "What is the purpose of 'Vector Retrieval' (RAG) within an agentic toolset?", options: ["To generate images.", "To act as the agent's long-term memory via semantic search of private documents.", "To decrease latency.", "To validate JSON schemas."], correct: 1 },
    { id: 17, question: "“Prompt Injection” in an agent context might result in:", options: ["Faster load times.", "The agent executing malicious commands passed hidden in scraped web text or user input.", "Automatic code syntax fixing.", "Lower API costs."], correct: 1 },
    { id: 18, question: "Which is essential for production deployment of agents?", options: ["Maximum autonomy.", "Robust evaluation, sandbox environments, and monitoring.", "Removing tools.", "Free APIs."], correct: 1 },
    { id: 19, question: "What is the typical output format mechanism used for reliable Agent-Tool interaction?", options: ["Poetry", "Structured JSON corresponding to a Schema", "Plain text", "HTML"], correct: 1 },
    { id: 20, question: "The ultimate goal of Agentic Workflow Design is:", options: ["To make unconstrained chatbots.", "To build reliable, predictable systems that orchestrate LLM reasoning toward a goal.", "To use the highest temperature possible.", "To minimize context usage at all costs."], correct: 1 }
];
