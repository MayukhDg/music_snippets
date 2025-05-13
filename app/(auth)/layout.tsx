export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex items-center justify-center flex-1 min-h-screen py-12">
      {children}
    </main>
  )
}