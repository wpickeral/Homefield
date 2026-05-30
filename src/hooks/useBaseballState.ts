import { useState } from 'react'

export function useBaseballState() {
  const [inning, setInning] = useState(1)
  const [isTop, setIsTop] = useState(true)
  const [outs, setOuts] = useState(0)

  function addOut() {
    if (outs >= 2) {
      nextHalf()
    } else {
      setOuts(o => o + 1)
    }
  }

  function removeOut() {
    setOuts(o => Math.max(0, o - 1))
  }

  function nextHalf() {
    setOuts(0)
    if (isTop) {
      setIsTop(false)
    } else {
      setIsTop(true)
      setInning(i => i + 1)
    }
  }

  function prevHalf() {
    setOuts(0)
    if (!isTop) {
      setIsTop(true)
    } else if (inning > 1) {
      setIsTop(false)
      setInning(i => i - 1)
    }
  }

  return { inning, isTop, outs, addOut, removeOut, nextHalf, prevHalf }
}
