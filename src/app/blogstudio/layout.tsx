/**
 * Studio-only layout — keeps marketing chrome out of the Studio document
 * without remounting NextStudio when the root shell updates.
 */
export default function BlogStudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
