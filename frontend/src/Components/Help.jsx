import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import './Help.css';

const Help = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you with your expenses today?' }
  ]);

  const handleSendMessage = () => {
    if (chatInput.trim() !== '') {
      setChatMessages([...chatMessages, { sender: 'user', text: chatInput }]);
      const botResponse = getBotResponse(chatInput); // Placeholder function
      setChatMessages([...chatMessages, { sender: 'user', text: chatInput }, { sender: 'bot', text: botResponse }]);
      setChatInput('');
    }
  };

  const getBotResponse = (input) => {
    // Placeholder function to simulate bot response
    return "I'm sorry, I can't process your request right now.";
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={12}>
          <h2>Chat with Bot</h2>
          <div className="chat-box">
            <div className="chat-messages">
              {chatMessages.map((message, index) => (
                <div key={index} className={`chat-message ${message.sender}`}>
                  <span>{message.text}</span>
                </div>
              ))}
            </div>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Type a message"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <InputGroup.Append>
                <Button variant="primary" onClick={handleSendMessage}>Send</Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Help;
