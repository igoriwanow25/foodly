'use client';

import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

interface RecipeSearchProps {
  onSearch: (url: string) => void;
  isLoading: boolean;
}

export const RecipeSearch: React.FC<RecipeSearchProps> = ({ onSearch, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSearch = (value: string) => {
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
        <Search
            placeholder="Paste recipe URL here..."
            allowClear
            enterButton="Scrape Recipe"
            size="large"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onSearch={handleSearch}
            loading={isLoading}
            disabled={isLoading}
        />
    </div>
  );
};