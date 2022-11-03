interface RootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayout) {
  return (
    <div>
      <header>header</header>
      <h1>{children}</h1>
    </div>
  )
}