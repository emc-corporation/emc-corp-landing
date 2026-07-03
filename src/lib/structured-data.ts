export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EMC',
    url: 'https://emc-corp.uz',
    logo: 'https://emc-corp.uz/images/emc-logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+998773603300',
      email: 'hello@emc.uz',
      contactType: 'sales',
      availableLanguage: ['Russian', 'Uzbek', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tashkent',
      addressCountry: 'UZ',
    },
  };
}
