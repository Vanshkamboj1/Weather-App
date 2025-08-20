import type { PropsWithChildren } from "react"
import { Header } from "./Header"


export const Layout = ({children}:PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
        <Header />
        <main className="min-h-screen container mx-auto px-8 py-8">
            {children}
        </main>
        <footer className="border-t backdrop-blur py-12 supports-[backdrip-filter]:bg-background/60">
            <div className="container mx-auto px-4 text-center text-gray-400">
                <p>Made with ❤️ by Satya</p>
            </div>
        </footer> 
    </div>
  )
}
