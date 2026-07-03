'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Phone, Mail, MapPin, Check } from '@/components/icons';
import { CONTACT } from '@/lib/constants';

export function ContactForm() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);
  const [interestIdx, setInterestIdx] = useState(0);
  const formRef = useScrollReveal<HTMLDivElement>();
  const contactsRef = useScrollReveal<HTMLDivElement>(120);

  const interestOptions = [0, 1, 2, 3, 4].map((i) =>
    t(`form.interestOptions.${i}`),
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <footer id="contact" className="bg-[#2b2f35] text-[#e9ebee]">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(40px,6vw,72px)] py-[clamp(56px,8vw,100px)] pb-[clamp(30px,4vw,44px)]">
        {/* Form column */}
        <div ref={formRef} className="reveal-target">
          <SectionEyebrow label={t('form.eyebrow')} />
          <SectionHeading
            title={t('form.h2')}
            subtitle={t('form.sub')}
            light
          />

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4"
            >
              <label className="flex flex-col gap-[7px]">
                <span className="text-[12.5px] font-semibold tracking-[.02em] text-[#aeb4bb]">
                  {t('form.name')}
                </span>
                <input
                  required
                  placeholder={t('form.namePh')}
                  className="rounded-lg border border-white/[.16] bg-white/[.06] px-[15px] py-[13px] text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-white/40 focus:border-accent"
                />
              </label>

              <label className="flex flex-col gap-[7px]">
                <span className="text-[12.5px] font-semibold tracking-[.02em] text-[#aeb4bb]">
                  {t('form.phone')}
                </span>
                <input
                  required
                  placeholder={t('form.phonePh')}
                  className="rounded-lg border border-white/[.16] bg-white/[.06] px-[15px] py-[13px] text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-white/40 focus:border-accent"
                />
              </label>

              <label className="flex flex-col gap-[7px]">
                <span className="text-[12.5px] font-semibold tracking-[.02em] text-[#aeb4bb]">
                  {t('form.company')}
                </span>
                <input
                  placeholder={t('form.companyPh')}
                  className="rounded-lg border border-white/[.16] bg-white/[.06] px-[15px] py-[13px] text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-white/40 focus:border-accent"
                />
              </label>

              <CustomSelect
                label={t('form.interest')}
                options={interestOptions}
                value={interestIdx}
                onChange={setInterestIdx}
              />

              <label className="col-span-full flex flex-col gap-[7px]">
                <span className="text-[12.5px] font-semibold tracking-[.02em] text-[#aeb4bb]">
                  {t('form.comment')}
                </span>
                <textarea
                  rows={3}
                  placeholder={t('form.commentPh')}
                  className="resize-vertical rounded-lg border border-white/[.16] bg-white/[.06] px-[15px] py-[13px] text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-white/40 focus:border-accent"
                />
              </label>

              <button
                type="submit"
                className="col-span-full cursor-pointer justify-self-start rounded-lg border-none bg-accent px-8 py-[15px] text-base font-bold text-white shadow-[0_8px_24px_rgba(226,118,28,.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-d"
              >
                {t('form.submit')}
              </button>
            </form>
          ) : (
            <div className="mt-7 flex items-start gap-4 rounded-xl border border-accent/[.35] bg-accent/10 px-[26px] py-7">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-accent text-white">
                <Check size={22} />
              </span>
              <div>
                <h3 className="m-0 font-archivo text-[20px] font-bold text-white">
                  {t('form.successTitle')}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-[#c4c9cf]">
                  {t('form.successText')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Contacts column */}
        <div ref={contactsRef} className="reveal-target flex flex-col">
          <Image
            src="/images/emc-logo-light.png"
            alt="EMC"
            width={120}
            height={34}
            className="mb-2 h-[34px] w-auto self-start"
          />
          <p className="mt-0 mb-[26px] max-w-[320px] text-[14.5px] leading-relaxed text-[#a9afb6]">
            {t('contacts.tagline')}
          </p>

          <div className="flex flex-col gap-[18px]">
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-3.5 no-underline transition-colors hover:text-accent"
            >
              <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[10px] bg-white/[.06] text-accent">
                <Phone size={20} />
              </span>
              <span>
                <span className="block text-xs text-[#8b9198]">
                  {t('contacts.phoneLabel')}
                </span>
                <span className="text-base font-bold text-white">
                  {CONTACT.phone}
                </span>
              </span>
            </a>

            <a
              href={CONTACT.emailHref}
              className="flex items-center gap-3.5 no-underline transition-colors hover:text-accent"
            >
              <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[10px] bg-white/[.06] text-accent">
                <Mail size={20} />
              </span>
              <span>
                <span className="block text-xs text-[#8b9198]">
                  {t('contacts.mailLabel')}
                </span>
                <span className="text-base font-bold text-white">
                  {CONTACT.email}
                </span>
              </span>
            </a>

            <div className="flex items-center gap-3.5">
              <span className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[10px] bg-white/[.06] text-accent">
                <MapPin size={20} />
              </span>
              <span>
                <span className="block text-xs text-[#8b9198]">
                  {t('contacts.addrLabel')}
                </span>
                <span className="text-base font-bold text-white">
                  {t('contacts.addrValue')}
                </span>
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Footer bar */}
      <div className="border-t border-white/[.08]">
        <Container className="flex flex-wrap items-center justify-between gap-2.5 py-5">
          <span className="text-[13px] text-[#868c93]">
            {t('footer.copyright')}
          </span>
          <span className="text-[13px] text-[#868c93]">
            {t('footer.chain')}
          </span>
        </Container>
      </div>
    </footer>
  );
}
