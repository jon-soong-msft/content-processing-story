export type CopilotRole = 'user' | 'assistant'

export interface CopilotMessage {
  role: CopilotRole
  text: string
  /** Optional command / snippet rendered as a code block under the message. */
  code?: string
}

/**
 * A mocked GitHub Copilot exchange. This is illustrative storytelling — it is
 * NOT executed and does not call any real service. It mirrors the real
 * deployment flow of the Content Processing Solution Accelerator (an `azd`
 * template) to show how fast a developer can stand it up.
 */
export const copilotScript: CopilotMessage[] = [
  {
    role: 'user',
    text: 'We picked the Microsoft Content Processing Solution Accelerator for our claims backlog. Help me stand it up on Azure.',
  },
  {
    role: 'assistant',
    text: "Great pick — it's an Azure Developer CLI template, so it deploys end-to-end. Let me clone it.",
    code: 'git clone https://github.com/microsoft/\n  content-processing-solution-accelerator',
  },
  {
    role: 'user',
    text: 'Are my prerequisites good to go?',
  },
  {
    role: 'assistant',
    text: "Checking your toolchain… azd, Bicep, and your Azure sign-in all look ready.",
    code: 'azd version       # 1.18.0  ✓\nbicep --version   # 0.33.0  ✓\naz account show   # Contoso-Prod  ✓',
  },
  {
    role: 'user',
    text: 'Perfect. Provision and deploy everything in one shot.',
  },
  {
    role: 'assistant',
    text: 'On it. `azd up` will provision AI Foundry, Azure OpenAI (GPT-5.1 Vision), Content Understanding, Cosmos DB, and Container Apps — then deploy all three services.',
    code: 'azd up',
  },
]
