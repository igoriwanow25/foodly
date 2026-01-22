'use client';

import React, { useState } from 'react';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';

interface RecipeSearchProps {
  onSearch: (url: string) => void;
  isLoading: boolean;
}

export const RecipeSearch: React.FC<RecipeSearchProps> = ({ onSearch, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url.trim());
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup size="lg">
        <Form.Control
          placeholder="Paste recipe URL here..."
          aria-label="Recipe URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
        />
        <Button variant="primary" type="submit" disabled={isLoading || !url.trim()}>
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Scraping...
            </>
          ) : (
            'Scrape Recipe'
          )}
        </Button>
      </InputGroup>
    </Form>
  );
};
