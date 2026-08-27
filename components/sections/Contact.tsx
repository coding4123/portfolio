import Image from 'next/image';
import { Manrope } from 'next/font/google';
import Footer from '@/components/layout/SiteFooter';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdeonaya';

const socialLinks = [
  {
    label: 'Behance',
    href: 'https://www.behance.net/asmaxx',
    icon: '/images/apps%20icons/behnace.png',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/asmaa-mobarek-240839314/',
    icon: '/images/apps%20icons/linked.png',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/asmaambr',
    icon: '/images/apps%20icons/github.png',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:asmaamobarekk@gmail.com',
    icon: '/images/apps%20icons/email.png',
    external: false,
  },
];

export default function Contact() {
  return (
    <main
      id="contact"
      className={`${manrope.variable} min-h-screen scroll-mt-24 bg-[#E9DFFF] text-[#140A28]`}
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      <div className="reveal mx-auto flex min-h-screen max-w-[1280px] flex-col px-6 py-8 sm:px-10 lg:px-14">
        <div className="flex flex-1 items-center justify-center">
          <div className="grid w-full max-w-[1120px] items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
            <section className="flex flex-col items-start justify-center">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[4px] w-[24px] bg-[#8863D5]" />
                <span className="text-[16px] font-medium italic text-[#1A0C2C] sm:text-[18px]">
                  Let&apos;s Get In Touch
                </span>
              </div>

              <h1 className="max-w-[520px] text-[52px] font-bold leading-[0.95] tracking-[-0.05em] text-[#140A28] sm:text-[48px] lg:text-[56px]">
                I&apos;d love
                <br />
                to <span className="text-[#8863D5]">hear from</span> <span className="italic text-[#8863D5]">you</span>
              </h1>

              <p className="mt-7 max-w-[500px] text-[17px] leading-[1.55] text-[#1D102F] sm:text-[20px]">
                Whether you have a project in mind, or you&apos;re looking for a designer,
                developer, or creative collaborator. Feel free to reach out. I usually
                reply within 24 hours.
              </p>

              <div className="mt-9 flex items-center gap-4 text-[#140A28]">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    aria-label={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={
                      link.external
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="inline-flex p-1 transition-transform duration-200 hover:scale-110"
                  >
                    <Image
                      src={link.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  </a>
                ))}
              </div>
            </section>

            <form
              action={FORMSPREE_ENDPOINT}
              method="POST"
              className="rounded-[28px] bg-gradient-to-br from-[#10082B] via-[#311f48] to-[#C3A2F1] p-7 shadow-[0_18px_44px_rgba(41,22,61,0.2)] sm:p-9"
            >
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-[16px] font-medium text-[#E7D9F9] sm:text-[18px]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name..."
                    className="w-full rounded-[16px] border border-white/10 bg-[#E9DFFF]/95 px-5 py-4 text-[16px] text-[#2b1c3d] placeholder:text-[#5b4a6e] outline-none focus:border-[#d4c3fd] focus:ring-2 focus:ring-[#d4c3fd]/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[16px] font-medium text-[#E7D9F9] sm:text-[18px]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email..."
                    className="w-full rounded-[16px] border border-white/10 bg-[#E9DFFF]/95 px-5 py-4 text-[16px] text-[#2b1c3d] placeholder:text-[#5b4a6e] outline-none focus:border-[#d4c3fd] focus:ring-2 focus:ring-[#d4c3fd]/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[16px] font-medium text-[#E7D9F9] sm:text-[18px]">
                    How can I help you ?
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Enter your message..."
                    className="w-full resize-none rounded-[16px] border border-white/10 bg-[#E9DFFF]/95 px-5 py-4 text-[16px] text-[#2b1c3d] placeholder:text-[#5b4a6e] outline-none focus:border-[#d4c3fd] focus:ring-2 focus:ring-[#d4c3fd]/60"
                  />
                </div>
              </div>

              <div className="mt-7 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-4 rounded-full border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))] px-6 py-3 text-[16px] font-semibold text-[#1b102c] shadow-[0_8px_20px_rgba(62,38,89,0.2),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition hover:brightness-105"
                >
                  <span>Send message</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1ECFF] text-[20px] text-[#1a0d29] shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                    →
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
