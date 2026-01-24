'use client';

import React from 'react';
import { Card, Tag as AntTag, Typography } from 'antd';
import { Recipe } from '../lib/types';

const { Meta } = Card;
const { Text } = Typography;

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column' } }}
      cover={
        recipe.imagePath ? (
          <div style={{ height: 200, overflow: 'hidden' }}>
             <img
                alt={recipe.title}
                src={recipe.imagePath}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
             />
          </div>
        ) : null
      }
    >
      <Meta
        title={recipe.title}
        description={
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div style={{ marginBottom: 8 }}>
              {recipe.tags && recipe.tags.length > 0 ? (
                recipe.tags.map((tag, idx) => (
                  <AntTag key={idx} style={{ marginRight: 4, marginBottom: 4 }}>
                    {tag.name}
                  </AntTag>
                ))
              ) : (
                <Text type="secondary" style={{ fontSize: '12px' }}>No tags</Text>
              )}
            </div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {recipe.prepTime ? `${recipe.prepTime} min` : ''}
              {recipe.prepTime && recipe.servings ? ' • ' : ''}
              {recipe.servings ? `${recipe.servings} servings` : ''}
            </Text>
          </div>
        }
      />
    </Card>
  );
};