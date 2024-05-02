import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden py-20 px-6 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              About
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Blog
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Jobs
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Press
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Terms
            </Link>
          </div>
        </nav>
        <div className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 YC Co-founder Matching. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
