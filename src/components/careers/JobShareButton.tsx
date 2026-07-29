'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'

export default function JobShareButton({
  title,
  summary,
}: {
  title: string
  summary?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    const text = summary || title

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} — Sarwagyna`,
          text,
          url,
        })
        return
      } catch {
        // user cancelled or share failed — fall through to copy
      }
    }

    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 h-11 w-11 sm:w-auto sm:px-4 shrink-0 border border-border-subtle text-[13px] font-medium text-text hover:border-text/40 transition-colors"
      title="Share this role"
      aria-label="Share this role"
    >
      {copied ? <Check size={15} /> : <Share2 size={15} />}
      <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
    </button>
  )
}
