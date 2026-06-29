import type { IconName } from '../components/icons/Icon'

export type AcceleratorCategory =
  | 'Content Processing'
  | 'Agents'
  | 'Data & Analytics'
  | 'Conversation'
  | 'Security'
  | 'Platform'

export interface Accelerator {
  name: string
  blurb: string
  category: AcceleratorCategory
  products: string[]
  url: string
  icon: IconName
  /** The accelerator featured in the story; highlighted in the catalog. */
  featured?: boolean
}

/** All accelerators from https://accelerators.ms (Microsoft Solution Accelerators). */
export const accelerators: Accelerator[] = [
  {
    name: 'Content Processing',
    blurb: 'Extract text, tables, and charts from claims, invoices, and contracts into clean, structured data.',
    category: 'Content Processing',
    products: ['AI Foundry', 'Content Understanding', 'Cosmos DB', 'Container Apps'],
    url: 'https://aka.ms/CSAGoldStandards/ContentProcessing',
    icon: 'content',
    featured: true,
  },
  {
    name: 'Document Knowledge Mining',
    blurb: 'Ingest, extract, and classify high volumes of assets to surface insights and quick-review suggestions.',
    category: 'Content Processing',
    products: ['AI Foundry', 'AI Search', 'Document Intelligence'],
    url: 'https://aka.ms/CSAGoldStandards/DocumentKnowledgeMining',
    icon: 'search',
  },
  {
    name: 'Multi-Agent Custom Automation',
    blurb: 'Orchestrate a team of AI agents for onboarding, RFP review, contract compliance, and more.',
    category: 'Agents',
    products: ['AI Foundry', 'Agent Service', 'Agent Framework', 'Cosmos DB'],
    url: 'https://aka.ms/CSAGoldStandards/MultiAgent',
    icon: 'agents',
  },
  {
    name: 'Multi-Agent Content Generation',
    blurb: 'Turn creative briefs into on-brand marketing copy and visuals with a multi-modal agent crew.',
    category: 'Agents',
    products: ['Foundry IQ', 'Azure OpenAI', 'Agent Framework', 'Cosmos DB'],
    url: 'https://aka.ms/ContentGeneration',
    icon: 'spark',
  },
  {
    name: 'Modernize your Code',
    blurb: 'Migrate legacy code to modern languages with a team of AI agents doing the heavy lifting.',
    category: 'Platform',
    products: ['AI Foundry', 'Agent Service', 'Semantic Kernel', 'Container Apps'],
    url: 'https://aka.ms/CSAGoldStandards/ModernizeCode',
    icon: 'code',
  },
  {
    name: 'Chat with your data',
    blurb: 'Conversational AI that extracts, summarizes, and surfaces insights from your unstructured content.',
    category: 'Conversation',
    products: ['AI Foundry', 'AI Search', 'Cosmos DB', 'PostgreSQL'],
    url: 'https://aka.ms/CSAGoldStandards/ChatWithYourData',
    icon: 'message',
  },
  {
    name: 'Customer Chatbot',
    blurb: 'Real-time, natural customer conversations that lift satisfaction and deflect support load.',
    category: 'Conversation',
    products: ['Microsoft Foundry', 'Azure OpenAI', 'Agent Service', 'App Service'],
    url: 'https://aka.ms/CSAGoldStandards/CustomerChatbot',
    icon: 'message',
  },
  {
    name: 'Conversation Knowledge Mining',
    blurb: 'Mine large audio and text sets to uncover contact-center insights for telco and IT helpdesk.',
    category: 'Conversation',
    products: ['Content Understanding', 'Azure OpenAI', 'AI Search', 'SQL Database'],
    url: 'https://aka.ms/CSAGoldStandards/ConversationKnowledgeMining',
    icon: 'search',
  },
  {
    name: 'Microsoft IQ',
    blurb: 'A shared intelligence layer unifying data, knowledge, and workflows for coordinated AI outcomes.',
    category: 'Data & Analytics',
    products: ['Microsoft Foundry', 'Agent Framework', 'Foundry IQ', 'Fabric IQ'],
    url: 'https://aka.ms/MSIQ',
    icon: 'spark',
  },
  {
    name: 'Unified Data Foundation',
    blurb: 'Stand up a governed, scalable data foundation in Fabric to speed decisions and insights.',
    category: 'Data & Analytics',
    products: ['Microsoft Fabric', 'OneLake', 'Fabric Data Agent', 'Purview'],
    url: 'https://aka.ms/UnifiedData',
    icon: 'chart',
  },
  {
    name: 'Agentic Apps for Unified Data',
    blurb: 'Secure, agentic AI on a unified data foundation for sales performance and customer insights.',
    category: 'Data & Analytics',
    products: ['Microsoft Fabric', 'Foundry', 'Agent Framework', 'App Service'],
    url: 'https://github.com/microsoft/agentic-applications-for-unified-data-foundation-solution-accelerator',
    icon: 'chart',
  },
  {
    name: 'Real-Time Intelligence for Ops',
    blurb: 'Minimize downtime and optimize operations with real-time intelligence on a unified data layer.',
    category: 'Data & Analytics',
    products: ['Microsoft Fabric', 'OneLake', 'Real-Time Intelligence', 'Eventstream'],
    url: 'https://aka.ms/RTIOps',
    icon: 'chart',
  },
  {
    name: 'Data & Agent Governance',
    blurb: 'Automate Purview guardrails — capture prompts, enforce policies, govern Copilot and agents.',
    category: 'Security',
    products: ['Purview', 'OneLake', 'Fabric', 'Defender for AI'],
    url: 'https://aka.ms/DAGSA',
    icon: 'shield',
  },
  {
    name: 'Deploy AI in Production',
    blurb: 'A secure, extensible environment for deploying and running AI Foundry workloads in production.',
    category: 'Platform',
    products: ['AI Foundry', 'AI Search', 'Cosmos DB', 'Container Apps'],
    url: 'https://github.com/microsoft/deploy-your-ai-application-in-production',
    icon: 'rocket',
  },
  {
    name: 'Container Migration',
    blurb: 'Automate container-platform migration with AI so teams focus on the high-value work.',
    category: 'Platform',
    products: ['Azure AI Services', 'Cosmos DB', 'Container Apps'],
    url: 'https://github.com/microsoft/Container-Migration-Solution-Accelerator',
    icon: 'processor',
  },
]

export const catalogCategories: AcceleratorCategory[] = [
  'Content Processing',
  'Agents',
  'Data & Analytics',
  'Conversation',
  'Security',
  'Platform',
]

/** Top use cases mapped to their best-fit accelerator (from accelerators.ms). */
export interface UseCaseFit {
  useCase: string
  fit: string
}

export const topUseCases: UseCaseFit[] = [
  { useCase: 'Data Analytics & Decision Support', fit: 'Unified Data Foundation · Microsoft IQ' },
  { useCase: 'Document Intelligence & GenAI', fit: 'Content Processing · Doc Mining' },
  { useCase: 'Process / Workflow Automation', fit: 'Multi-Agent · Modernize Code' },
  { useCase: 'Conversational AI / Assistants', fit: 'Customer Chatbot · Chat with data' },
  { useCase: 'Classification & Categorization', fit: 'Doc Mining · Content Processing' },
  { useCase: 'Cybersecurity & Threat Detection', fit: 'Data & Agent Governance' },
]
