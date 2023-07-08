interface Choice {
  index: number
  delta: {
    content: string
  }
  finish_reason: string | null
}
