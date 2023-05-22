import React from 'react';
import SeoTags from '../components/reusable/seo-tags/SeoTags';
import ContactUsPage from '../components/route/contact-us-page/ContactUsPage';

const ContactUs = () => {
  return (
    <>
      <SeoTags
        metaTitle="Contact Us | Shake"
        metaDescription="Want to get in touch? We'd love to hear from you."
      />
      <ContactUsPage />
    </>
  );
};

export default ContactUs;
