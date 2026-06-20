import { steps as defaultSteps, type Step } from '~/data/steps'

/**
 * Walkthrough engine: owns the current step index and exposes navigation.
 * Call once (in the orchestrator) and pass state down to the columns.
 */
export function useSteps(source: Step[] = defaultSteps) {
  const steps = source
  const total = steps.length

  const index = ref(0)
  const current = computed(() => steps[index.value]!)

  const canPrev = computed(() => index.value > 0)
  const canNext = computed(() => index.value < total - 1)

  function next() {
    if (canNext.value) index.value++
  }

  function prev() {
    if (canPrev.value) index.value--
  }

  function goTo(i: number) {
    index.value = Math.min(Math.max(i, 0), total - 1)
  }

  return { steps, total, index, current, canPrev, canNext, next, prev, goTo }
}
