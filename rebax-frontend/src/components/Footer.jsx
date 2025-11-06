import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 bg-white dark:bg-neutral-900 border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold">RebaX</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Modern real estate platform for brokers & buyers.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li><Link to="/">Home</Link></li>
            <li><a href="#featured">Featured</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li><a>Terms</a></li>
            <li><a>Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RebaX. All rights reserved.
      </div>
    </footer>
  );
}
