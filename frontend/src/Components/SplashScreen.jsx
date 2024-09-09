import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Transition to the Login/Sign-Up page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/register'); // Change to your desired path
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  const splashScreenStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-color-light)',
    color: 'var(--text-color-light)',
  };

  const darkThemeStyle = {
    backgroundColor: 'var(--bg-color-dark)',
    color: 'var(--text-color-dark)',
  };

  const imageStyle = {
    maxWidth: '150px',
    marginBottom: '20px',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  };

  const taglineStyle = {
    fontSize: '1.25rem',
  };

  const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';

  return (
    <Container
      fluid
      style={isDarkTheme ? { ...splashScreenStyle, ...darkThemeStyle } : splashScreenStyle}
    >
      <Row className="h-100 align-items-center justify-content-center">
        <Col className="text-center">
          <img src="/logo192.png" alt="App Logo" style={imageStyle} />
          <h1 style={titleStyle}>YourAppName</h1>
          <p style={taglineStyle}>Your brief tagline or description goes here</p>
        </Col>
      </Row>
    </Container>
  );
};

export default SplashScreen;
