import React from 'react'
import Link from 'next/link'
import { ModeToggle } from './ModeToggle'
const navbar = () => {
  return (
    <nav className='w-full relative flex items-center justify-between max-w-2xl mx-auto px-3 py-5'>
        <Link href="/" className='font-bold text-3xl'>
            <span>Bee</span><span className='text-primary'>Log It</span>
        </Link>

        <ModeToggle/>
    </nav>
  )
}

export default navbar

