interface RootLayout {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: RootLayout) {
  return (
    <div>
      <header>Login header</header>
      <h1>{children}</h1>
    </div>
  )
}