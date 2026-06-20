/**
 * The walkthrough is a flat, ordered list of steps. The reader moves through
 * them one at a time with Previous / Next. Each step drives:
 *   - the narration column on the left (this copy), and
 *   - the chat frame on the right (the illustrated state — added later).
 *
 * For now we only carry the narration copy so the frame/engine can be built
 * and proven. Reveal/highlight/playback fields will be layered on per pattern.
 */
export interface Step {
  /** Stable id, also handy for deep-linking later. */
  id: string
  /** Optional grouping label (the "pattern" this step belongs to). */
  pattern?: string
  /** Heading shown in the narration column. */
  title: string
  /** Body copy for the narration column. */
  body?: string
}

export const steps: Step[] = [
  {
    id: 'placeholder-1',
    title: 'Step one',
    body: 'Placeholder narration. This column holds the copy for the current pattern — a short setup and the takeaway. The chat frame on the right will illustrate it.'
  },
  {
    id: 'placeholder-2',
    title: 'Step two',
    body: 'Placeholder narration. Use the Next and Previous buttons (or the left / right arrow keys) to move between steps. The frame animates to match.'
  },
  {
    id: 'placeholder-3',
    title: 'Step three',
    body: 'Placeholder narration. Each pattern gets one or more steps; some patterns will have sub-steps that reveal more of the same conversation.'
  },
  {
    id: 'placeholder-4',
    title: 'Step four',
    body: 'Placeholder narration. This is the last placeholder — Next is disabled at the end, Previous is disabled at the start.'
  }
]
