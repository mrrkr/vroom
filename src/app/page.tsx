import Image from "next/image";
import Link from "next/link";

// Intro screen, same shape as the reference site's gate: dark ground, vertical logo, one pink button.
export default function Intro() {
  return (
    <div className="fixed inset-0 z-[1002] bg-[#232323] flex items-center justify-center text-center px-6">
      <div className="max-w-[420px]">
        <Image src="/images.png" alt="vroom" width={120} height={120} priority className="mx-auto mb-6 rounded" />
        <h1 className="text-[28px] font-bold tracking-wide uppercase mb-3">vro<span className="text-pink">om</span></h1>
        <p className="text-muted text-[13px] leading-relaxed mb-8">
          Track yourself. All your personal stuff here — notes, lists, reminders, answers.
          Everything you save lives in the cloud and is waiting for you on every device.
        </p>
        <Link href="/explore"
          className="inline-block w-[240px] leading-[38px] text-[12px] font-bold uppercase tracking-[0.5px] bg-pink hover:bg-pink-dark text-black hover:text-white rounded-[2px]">
          Explore
        </Link>
      </div>
    </div>
  );
}
