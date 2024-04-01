import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div>
          <div className='flex justify-between container mx-auto p-5'>
            <Link href="/" >Home</Link>
          </div>
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
