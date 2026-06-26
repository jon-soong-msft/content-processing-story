export type TerminalLineKind =
  | 'command'
  | 'blank'
  | 'section'
  | 'resource'
  | 'success'
  | 'url'

export interface TerminalLine {
  kind: TerminalLineKind
  /** Used by command / section / success / url lines. */
  text?: string
  /** Used by resource lines (gets a check + spinner treatment). */
  name?: string
  /** Secondary detail column for resource lines. */
  detail?: string
}

/**
 * A simulated `azd up` run. Illustrative only — nothing is executed. Mirrors the
 * resources the accelerator actually provisions so the story stays accurate.
 */
export const terminalScript: TerminalLine[] = [
  { kind: 'command', text: 'azd up' },
  { kind: 'blank' },
  { kind: 'section', text: 'Packaging services (3)' },
  { kind: 'resource', name: 'web', detail: 'bundled' },
  { kind: 'resource', name: 'api', detail: 'bundled' },
  { kind: 'resource', name: 'processor', detail: 'bundled' },
  { kind: 'blank' },
  { kind: 'section', text: 'Provisioning Azure resources' },
  { kind: 'resource', name: 'Resource group', detail: 'rg-contoso-cps' },
  { kind: 'resource', name: 'Azure AI Foundry', detail: 'hub + project' },
  { kind: 'resource', name: 'Azure OpenAI', detail: 'gpt-5.1 (vision)' },
  { kind: 'resource', name: 'Content Understanding', detail: 'analyzer' },
  { kind: 'resource', name: 'Cosmos DB', detail: 'serverless' },
  { kind: 'resource', name: 'Blob Storage', detail: 'claims, results' },
  { kind: 'resource', name: 'Container Apps Env', detail: 'consumption' },
  { kind: 'resource', name: 'Container Registry', detail: 'images' },
  { kind: 'blank' },
  { kind: 'section', text: 'Deploying services' },
  { kind: 'url', text: 'api  →  https://cps-api.azurecontainerapps.io' },
  { kind: 'url', text: 'web  →  https://cps-web.azurecontainerapps.io' },
  { kind: 'blank' },
  { kind: 'success', text: 'SUCCESS: Provisioned and deployed in 11m 42s' },
]
