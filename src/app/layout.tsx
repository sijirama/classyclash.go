import '@/styles/globals.css'


export const metadata = {
    title: 'alma',
    description: 'university communities for students'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
    authModal: React.ReactNode
}) {
    return (
        <html>
            <body>
                <div className='container max-w-7xl mx-auto h-full pt-12'>
                    {children}
                </div>
            </body >
        </html >
    )
}
