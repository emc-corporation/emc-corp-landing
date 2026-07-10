'use client';

import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Phone, Mail, MapPin } from '@/components/icons';
import { CONTACT } from '@/lib/constants';
import { submitApplication } from '@/api';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  phone: string;
  company: string;
  interestIdx: number;
  comment: string;
}

export function ContactForm() {
  const t = useTranslations();
  const formRef = useScrollReveal<HTMLDivElement>();
  const contactsRef = useScrollReveal<HTMLDivElement>(120);

  const interestOptions = [0, 1, 2, 3, 4].map((i) =>
    t(`form.interestOptions.${i}`),
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      company: '',
      interestIdx: 0,
      comment: '',
    },
  });

  async function onSubmit(data: FormData) {
    try {
      await submitApplication({
        name: data.name,
        phone: data.phone,
        company: data.company,
        interest: interestOptions[data.interestIdx],
        comment: data.comment,
      });
      reset();
      toast.success(t('form.successTitle'));
    } catch {
      toast.error(t('form.errorText'));
    }
  }

  return (
    <footer id="contact" className="bg-[#2b2f35] text-[#e9ebee]">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(40px,6vw,72px)] py-[clamp(56px,8vw,100px)] pb-[clamp(30px,4vw,44px)]">
        <div ref={formRef} className="reveal-target">
          <SectionEyebrow label={t('form.eyebrow')} />
          <SectionHeading title={t('form.h2')} subtitle={t('form.sub')} light />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4"
          >
            <label className="flex flex-col gap-1.75">
              <span className="text-[12.5px] font-semibold tracking-[.02em] text-[#aeb4bb]">
                {t('form.name')}
              </span>
              <input
                {...register('name', { required: true })}
                placeholder={t('form.namePh')}
                className="focus:border-accent rounded-lg border border-white/16 bg-white/6 px-3.75 py-3.25 text-[15px] text-white transition-colors duration-200 outline-none placeholder:text-white/40"
              />
            </label>

            <div className="flex flex-col gap-1.75">
              <span className="text-[12.5px] font-semibold tracking-[.02em] text-[#aeb4bb]">
                {t('form.phone')}
              </span>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PhoneInput
                    value={field.value}
                    onChange={(v) => field.onChange(v ?? '')}
                    placeholder={t('form.phonePh')}
                  />
                )}
              />
            </div>

            <label className="flex flex-col gap-1.75">
              <span className="text-[12.5px] font-semibold tracking-[.02em] text-[#aeb4bb]">
                {t('form.company')}
              </span>
              <input
                {...register('company')}
                placeholder={t('form.companyPh')}
                className="focus:border-accent rounded-lg border border-white/16 bg-white/6 px-3.75 py-3.25 text-[15px] text-white transition-colors duration-200 outline-none placeholder:text-white/40"
              />
            </label>

            <Controller
              name="interestIdx"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label={t('form.interest')}
                  options={interestOptions}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <label className="col-span-full flex flex-col gap-1.75">
              <span className="text-[12.5px] font-semibold tracking-[.02em] text-[#aeb4bb]">
                {t('form.comment')}
              </span>
              <textarea
                rows={3}
                {...register('comment')}
                placeholder={t('form.commentPh')}
                className="resize-vertical focus:border-accent rounded-lg border border-white/16 bg-white/6 px-3.75 py-3.25 text-[15px] text-white transition-colors duration-200 outline-none placeholder:text-white/40"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent hover:bg-accent-d col-span-full cursor-pointer justify-self-start rounded-lg border-none px-8 py-3.75 text-base font-bold text-white shadow-[0_8px_24px_rgba(226,118,28,.3)] transition-all duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
            >
              {isSubmitting ? '...' : t('form.submit')}
            </button>
          </form>
        </div>

        {/* Contacts column */}
        <div ref={contactsRef} className="reveal-target flex flex-col">
          <Image
            src="/images/emc-logo-light.png"
            alt="EMC"
            width={120}
            height={34}
            className="mb-2 h-8.5 w-auto self-start"
          />
          <p className="mt-0 mb-6.5 max-w-[320px] text-[14.5px] leading-relaxed text-[#a9afb6]">
            {t('contacts.tagline')}
          </p>

          <div className="flex flex-col gap-4.5">
            <a
              href={CONTACT.phoneHref}
              className="hover:text-accent flex items-center gap-3.5 no-underline transition-colors"
            >
              <span className="text-accent flex h-10.5 w-10.5 flex-none items-center justify-center rounded-[10px] bg-white/6">
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
              className="hover:text-accent flex items-center gap-3.5 no-underline transition-colors"
            >
              <span className="text-accent flex h-10.5 w-10.5 flex-none items-center justify-center rounded-[10px] bg-white/6">
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
              <span className="text-accent flex h-10.5 w-10.5 flex-none items-center justify-center rounded-[10px] bg-white/6">
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
      <div className="border-t border-white/8">
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
