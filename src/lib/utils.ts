import type { RegisterOptions } from 'react-hook-form'

export function sanitizeRulesForNumberInput(rules: RegisterOptions = {}): RegisterOptions {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pattern, valueAsDate, ...rest } = rules

  return {
    ...rest,
    valueAsNumber: true as const,
  }
}
