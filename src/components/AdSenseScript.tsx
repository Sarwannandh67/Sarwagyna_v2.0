'use client'

import { useEffect } from 'react'

const ADSENSE_SRC =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7266890598523714'

/**
 * Loads AdSense via a plain DOM script tag.
 * next/script adds data-nscript which AdSense rejects with:
 * "AdSense head tag doesn't support data-nscript attribute."
 */
export default function AdSenseScript() {
  useEffect(() => {
    if (document.querySelector(`script[src="${ADSENSE_SRC}"]`)) return

    const script = document.createElement('script')
    script.src = ADSENSE_SRC
    script.async = true
    script.crossOrigin = 'anonymous'
    document.head.appendChild(script)
  }, [])

  return null
}
