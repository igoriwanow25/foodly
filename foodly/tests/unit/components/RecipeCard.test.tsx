/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecipeCard } from '../../../src/components/RecipeCard';
import { Tag } from '@prisma/client';

const mockTag: Tag = { id: '1', name: 'Dinner', color: '#000', recipes: [] };

const mockRecipe: any = {
    id: '123',
    title: 'Test Recipe',
    imagePath: 'http://example.com/img.jpg',
    sourceUrl: 'http://example.com',
    ingredients: JSON.stringify(['Ing 1']),
    instructions: JSON.stringify(['Step 1']),
    prepTime: 30,
    servings: 4,
    tags: [mockTag],
    createdAt: new Date(),
    updatedAt: new Date()
};

describe('RecipeCard', () => {
    it('renders recipe details', () => {
        const handleClick = jest.fn();
        render(<RecipeCard recipe={mockRecipe} onClick={handleClick} />);
        
        expect(screen.getByText('Test Recipe')).toBeInTheDocument();
        expect(screen.getByText('Dinner')).toBeInTheDocument(); // Tag
        expect(screen.getByText(/30 min/)).toBeInTheDocument();
        
        // Check for image
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'http://example.com/img.jpg');
    });
});