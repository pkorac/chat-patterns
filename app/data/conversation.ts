/**
 * The scripted Dogsnug order-tracking conversation.
 *
 * The shapes below deliberately mirror the AI SDK's `UIMessage` model (a message
 * is a role + an ordered list of parts; tool parts carry a `type: 'tool-*'`), so
 * we can swap in a real `Chat` later without reworking the renderer. For now this
 * is a static array we render top-to-bottom and (later) reveal step by step.
 */

export interface TraceStep {
  /** Iconify name shown next to the tool name. */
  icon: string
  /** Tool name, e.g. "OrderDetails". */
  name: string
  /** Result lines printed under the tool name. */
  lines: string[]
}

export interface ReasoningPart {
  type: 'reasoning'
  /** Collapsed label, e.g. "Thought for 3.5s" or "Order found, 2.5s". */
  label: string
  /** Optional leading icon; falls back to the agent dot when omitted. */
  icon?: string
  /** Free-text reasoning shown when expanded. */
  text?: string
  /** Tool-call steps shown when expanded. */
  steps?: TraceStep[]
  /** Start expanded (used to show the trace pattern in the mock). */
  defaultOpen?: boolean
}

export interface TextPart {
  type: 'text'
  /** Supports simple **bold** runs and \n line breaks. */
  text: string
}

/** Copy / thumbs-up / thumbs-down row under an assistant message. */
export interface ActionsPart {
  type: 'actions'
}

/** GenUI form — client-side inputs the agent asks the user to fill. */
export interface OrderFormPart {
  type: 'tool-orderForm'
  state: 'input-available' | 'output-available'
  title: string
  fields: { label: string, value: string, required?: boolean }[]
  submitLabel: string
}

/** GenUI card — order + tracking details rendered visually. */
export interface OrderDetailsPart {
  type: 'tool-orderDetails'
  orderNumber: string
  email: string
  /** Ordered stage labels for the tracking stepper. */
  stages: string[]
  /** Index of the current stage (0-based). */
  currentStage: number
  carrier: string
  trackingId: string
  status: string
  latestUpdate: string
}

/** Human-in-the-loop confirmation for a tool the agent wants to run. */
export interface CalendarConfirmPart {
  type: 'tool-calendarConfirm'
  title: string
  rows: { label: string, value: string }[]
}

/** Result card once the calendar tool has run. */
export interface CalendarAddedPart {
  type: 'tool-calendarAdded'
  title: string
  when: string
}

/** Quick-reply / Q&A tool — pinned to the bottom of the conversation when live. */
export interface QuickReplyPart {
  type: 'tool-quickReply'
  question: string
  options: string[]
}

export type Part
  = | ReasoningPart
    | TextPart
    | ActionsPart
    | OrderFormPart
    | OrderDetailsPart
    | CalendarConfirmPart
    | CalendarAddedPart
    | QuickReplyPart

export interface Message {
  id: string
  role: 'user' | 'assistant'
  parts: Part[]
}

const ORDER_NUMBER = 'DGSNG-333219832'
const EMAIL = 'kai@creativecrow.io'

export const conversation: Message[] = [
  {
    id: 'm1',
    role: 'user',
    parts: [{ type: 'text', text: 'Hi, can you help me with my order?' }]
  },
  {
    id: 'm2',
    role: 'assistant',
    parts: [
      { type: 'reasoning', label: 'Thought for 3.5s' },
      { type: 'text', text: 'Absolutely.\nI can help track your order, update delivery details, or assist with returns.' }
    ]
  },
  {
    id: 'm3',
    role: 'user',
    parts: [{ type: 'text', text: 'Track an order' }]
  },
  {
    id: 'm4',
    role: 'assistant',
    parts: [
      { type: 'reasoning', label: 'Thought for 2.5s' },
      { type: 'text', text: 'To help you we\'ll need to confirm your **order number** and **email.** You can find it in the receipt we\'ve sent you to your email.' },
      {
        type: 'tool-orderForm',
        state: 'input-available',
        title: 'Order number',
        fields: [
          { label: 'Order number', value: ORDER_NUMBER, required: true },
          { label: 'Email', value: EMAIL, required: true }
        ],
        submitLabel: 'Submit'
      }
    ]
  },
  {
    id: 'm5',
    role: 'user',
    parts: [{ type: 'text', text: `**Order number:** ${ORDER_NUMBER}\n**Email:** ${EMAIL}` }]
  },
  {
    id: 'm6',
    role: 'assistant',
    parts: [
      {
        type: 'reasoning',
        label: 'Order found, 2.5s',
        icon: 'i-lucide-package-search',
        defaultOpen: true,
        text: 'To track the order I need to first find order details, then track it using the carrier specified in details.',
        steps: [
          {
            icon: 'i-lucide-file-text',
            name: 'OrderDetails',
            lines: [`Found order details for ${ORDER_NUMBER}`, 'Sent with RoyalMail']
          },
          {
            icon: 'i-lucide-package',
            name: 'TrackRoyalMail',
            lines: ['Got tracking info.', `TrackingID: ${ORDER_NUMBER}`]
          }
        ]
      },
      { type: 'text', text: 'I found your order.\nYour package has already shipped and is expected to arrive tomorrow between 11:00 and 13:00.\nHere\'s the latest tracking information.' },
      {
        type: 'tool-orderDetails',
        orderNumber: ORDER_NUMBER,
        email: EMAIL,
        stages: ['Packed', 'Shipped', 'In transit', 'Arrived'],
        currentStage: 2,
        carrier: 'Royal Mail',
        trackingId: 'RM84729183OGB',
        status: 'In transit',
        latestUpdate: 'Distribution Centre – Warrington, Today 09:42'
      }
    ]
  },
  {
    id: 'm7',
    role: 'user',
    parts: [{ type: 'text', text: 'That\'s great. Thank you' }]
  },
  {
    id: 'm8',
    role: 'assistant',
    parts: [
      { type: 'reasoning', label: 'Thought for 1.2s' },
      { type: 'text', text: 'You\'re welcome!\nLet me know if you\'d like me to add a reminder in your calendar so you don\'t miss it.' },
      { type: 'actions' }
    ]
  },
  {
    id: 'm9',
    role: 'assistant',
    parts: [
      {
        type: 'tool-quickReply',
        question: 'What do you need help with?',
        options: ['Yes please', 'No thank you']
      }
    ]
  },
  {
    id: 'm10',
    role: 'assistant',
    parts: [
      { type: 'reasoning', label: 'Thought for 2.3s', icon: 'i-lucide-calendar-plus' },
      { type: 'text', text: 'OK, I\'ll add it to your calendar' },
      {
        type: 'tool-calendarConfirm',
        title: 'Add calendar event',
        rows: [
          { label: 'Title', value: 'Dogsnug package arriving' },
          { label: 'Date & Time', value: 'Tomorrow, 11am' },
          { label: 'Alert', value: 'Yes, at the time of event' }
        ]
      }
    ]
  },
  {
    id: 'm11',
    role: 'assistant',
    parts: [
      { type: 'reasoning', label: 'Thought for 3.3s', icon: 'i-lucide-calendar-check' },
      { type: 'text', text: 'Calendar event added' },
      { type: 'tool-calendarAdded', title: 'Dogsnug package arriving', when: 'Tomorrow, 11am' },
      { type: 'text', text: 'Let me know if you\'d like me to help you with anything else.\n\nOtherwise, have a great day 🙌' }
    ]
  }
]
