import type { PortableTextComponents } from '@portabletext/react'

export const careersPtComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-[22px] font-display font-bold text-text mt-10 mb-3 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[17px] font-display font-semibold text-text mt-8 mb-2 tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-[15px] font-semibold text-text mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-[15px] text-text-secondary leading-[1.75] mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l border-border-subtle pl-4 text-text-muted italic my-6 text-[15px] leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="underline underline-offset-2 text-text hover:text-text-secondary transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-5 mb-5 space-y-2 text-text-secondary">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-5 mb-5 space-y-2 text-text-secondary">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-[15px] leading-[1.75] pl-1">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-[15px] leading-[1.75] pl-1">{children}</li>
    ),
  },
}
