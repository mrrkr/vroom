import Link from "next/link";
import Image from "next/image";
import { Icon } from "./Icons";
import SearchModal from "./SearchModal";

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-line">
      <div className="max-w-[1200px] mx-auto px-3 h-[50px] flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-wide text-[15px] uppercase">
          <Image src="/images.png" alt="vroom" width={28} height={28} className="rounded-sm" />
          <span>vro<span className="text-pink">om</span></span>
        </Link>
        <div className="hidden sm:flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-pink">Explore</Link>
          <Link href="/dates" className="hover:text-pink">Dates</Link>
          <Link href="/search?q=" className="hover:text-pink">Tags</Link>
        </div>
        <div className="ml-auto flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider">
          <SearchModal />
          <Link href="/new" className="bg-pink hover:bg-pink-dark text-black px-3 py-1.5 rounded-sm flex items-center gap-1">
            <Icon name="i-plus" /> <span className="hidden sm:inline">New</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
