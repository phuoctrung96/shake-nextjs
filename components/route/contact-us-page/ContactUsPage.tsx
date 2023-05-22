import React, { BaseSyntheticEvent, useState } from 'react';
import styles from './contactUsPage.module.scss';
import { AxiosResponse } from 'axios';
import BaseButton from '../../reusable/base-button/BaseButton';
import Container from '../../reusable/container/Container';
import Title from '../../reusable/title/Title';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EmailFormType } from '../../../pages/api/email';
import { newFetch } from '../../../utils/fetch';
import { useRouter } from 'next/router';

const messageDefaultState = {
  type: '',
  message: '',
};

const ContactUsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormType>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(messageDefaultState);
  const router = useRouter();

  const onSubmit: SubmitHandler<EmailFormType> = async (
    { userEmail, userName, userMessage, companyName },
    e: BaseSyntheticEvent | undefined
  ) => {
    setIsSubmitting(true);
    setMessage(messageDefaultState);

    const referUrl = Array.isArray(router.query.referUrl)
      ? router.query.referUrl[0]
      : router.query.referUrl || false;
    const reportCompany = Array.isArray(router.query.reportCompany)
      ? router.query.reportCompany[0]
      : router.query.reportCompany || false;

    try {
      const sendEmailResponse: AxiosResponse<EmailFormType> = await newFetch(
        `/email?userEmail=${encodeURIComponent(userEmail)}&userName=${encodeURIComponent(
          userName
        )}&userMessage=${encodeURIComponent(userMessage)}${
          typeof companyName !== 'undefined' && `&companyName=${encodeURIComponent(companyName)}`
        }${reportCompany ? `&reportCompany=${encodeURIComponent(reportCompany)}` : ''}${
          referUrl ? `&referUrl=${encodeURIComponent(referUrl)}` : ''
        }`
      );

      e?.target.reset();
      setIsSubmitting(false);
      setMessage({
        type: 'success',
        message: 'Message submitted. One of our team members will contact you soon.',
      });
    } catch (error: any) {
      console.log(error);
      setIsSubmitting(false);
      setMessage({
        type: 'error',
        message: 'Error sending message. Please try again in some time.',
      });
    }
  };

  return (
    <section>
      <div className={styles.header}>
        <Container>
          <Title as="h1">Contact Us</Title>
          <p>Want to get in touch? We&apos;d love to hear from you.</p>
        </Container>
      </div>
      <Container>
        <div className={`${styles.formWrapper}`}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form} id="contactUsForm">
            <div className="top">
              <Title as="h2" className={`${styles.contactTitle}`}>
                Please fill in the form and we will get back to you as soon as possible.
              </Title>
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Name*"
                className={errors.userName ? styles.errorInput : ''}
                {...register('userName', { required: true })}
              />
              {errors.userName?.type === 'required' && (
                <p className={styles.error}>Name is required</p>
              )}
            </div>

            <div className={styles.inputWrapper}>
              <input type="text" placeholder="Company name" {...register('companyName')} />
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Email*"
                className={errors.userEmail ? styles.errorInput : ''}
                {...register('userEmail', {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
              />
              {errors.userEmail?.type === 'required' && (
                <p className={styles.error}>Email is required</p>
              )}
              {errors.userEmail?.type === 'pattern' && (
                <p className={styles.error}>Invalid email format</p>
              )}
            </div>

            <div className={`${styles.textarea} textarea-body `}>
              <textarea
                placeholder="Message*"
                {...register('userMessage', { required: true })}
                className={errors.userMessage ? styles.errorInput : ''}
              />
              {errors.userMessage?.type === 'required' && (
                <p className={styles.error}>Message is required</p>
              )}
            </div>

            <div className="top">
              {message.type === 'success' && (
                <p className={styles.successMessage}>{message.message}</p>
              )}
              {message.type === 'error' && <p className={styles.errorMessage}>{message.message}</p>}
            </div>

            <BaseButton
              type="submit"
              viewType="primary"
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              Send Message
            </BaseButton>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default ContactUsPage;
