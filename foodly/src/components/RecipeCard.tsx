'use client';

import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Recipe } from '../lib/types';
import { Tag } from '@prisma/client';

interface RecipeCardProps {
  recipe: Recipe & { tags: Tag[] };
  onClick: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <Card className="h-100 shadow-sm recipe-card" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onClick={onClick}>
      {recipe.imagePath && (
        <Card.Img 
            variant="top" 
            src={recipe.imagePath} 
            style={{ height: '200px', objectFit: 'cover' }} 
        />
      )}
      <Card.Body>
        <Card.Title className="text-truncate" title={recipe.title}>
            {recipe.title}
        </Card.Title>
        <div className="mb-2">
            {recipe.tags && recipe.tags.length > 0 ? (
                recipe.tags.map((tag, idx: number) => (
                    <Badge 
                        key={idx} 
                        bg="light" 
                        text="dark" 
                        className="me-1 mb-1 border"
                        style={{ fontWeight: 'normal' }}
                    >
                        {tag.name}
                    </Badge>
                ))
            ) : (
                <small className="text-muted">No tags</small>
            )}
        </div>
        <Card.Text className="small text-muted">
            {recipe.prepTime ? `${recipe.prepTime} min` : ''} 
            {recipe.prepTime && recipe.servings ? ' • ' : ''}
            {recipe.servings ? `${recipe.servings} servings` : ''}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
