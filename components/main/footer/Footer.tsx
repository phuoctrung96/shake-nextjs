import React, { useRef } from 'react';
import Container from '../../reusable/container/Container';
import styles from './footer.module.css';
import Logo from '../../reusable/logo/Logo';
import SocialMedia from './SocialMedia';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <Container className={styles.container}>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-8 d-flex align-items-center flex-column flex-md-row justify-content-md-center justify-content-lg-start text-md-left">
              <Logo className={styles.logo} version="dark" />
              <p>Made with ❤️ in 15+ countries around the world</p>
            </div>
            <div className="col-md-8 col-lg-4">
              <SocialMedia className={styles.socialMedia} />
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
