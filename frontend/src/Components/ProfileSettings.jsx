import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';

const ProfileSettings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [notifications, setNotifications] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');

  const handleSaveChanges = () => {
    // Implement save changes logic
    console.log('Changes saved:', { name, email, password, currency, notifications, photo });
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('User logged out');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={12}>
          <h2>Profile Settings</h2>
          <Form>
            <Form.Group controlId="formPhoto">
              <Form.Label>Profile Photo</Form.Label>
              <div className="mb-3">
                {preview ? (
                  <Image src={preview} roundedCircle height={100} width={100} />
                ) : (
                  <Image src="default-avatar.png" roundedCircle height={100} width={100} />
                )}
              </div>
              <Form.Control 
                type="file" 
                onChange={handlePhotoChange}
              />
            </Form.Group>
            <Form.Group controlId="formName" className="mt-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCurrency" className="mt-3">
              <Form.Label>Currency</Form.Label>
              <Form.Control 
                as="select" 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                {/* Add more currencies as needed */}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNotifications" className="mt-3">
              <Form.Check 
                type="switch" 
                label="Enable Notifications" 
                checked={notifications} 
                onChange={(e) => setNotifications(e.target.checked)}
              />
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button variant="danger" className="mt-3 ml-3" onClick={handleLogout}>
              Logout
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileSettings;
