import { useMemo } from 'react'

interface DeviceInfo {
  isLowEnd: boolean
  isMobile: boolean
  particleCount: number
}

export function useDeviceDetect(): DeviceInfo {
  return useMemo(() => {
    const isMobile = window.innerWidth < 768 || /Android|iPhone/i.test(navigator.userAgent)
    const isLowEnd =
      navigator.hardwareConcurrency <= 4 ||
      isMobile

    return {
      isLowEnd,
      isMobile,
      particleCount: isMobile ? 200 : 500,
    }
  }, [])
}
