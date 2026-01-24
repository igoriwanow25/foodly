/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { RecipeView } from '../../../src/components/RecipeView';
import { Tag } from '@prisma/client';
import '@testing-library/jest-dom';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ name: 'Dinner', id: '1' }, { name: 'Lunch', id: '2' }]),
  })
) as jest.Mock;

const mockTag: Tag = { id: '1', name: 'Dinner', color: '#000' } as Tag;

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

describe('RecipeView', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders recipe details and tags', () => {
        render(<RecipeView recipe={mockRecipe} />);
        
        expect(screen.getByText('Test Recipe')).toBeInTheDocument();
        expect(screen.getByText('Dinner')).toBeInTheDocument(); // Tag
        expect(screen.getByText('Add Tag')).toBeInTheDocument();
    });

    it('opens tag modal on Add Tag click', async () => {
        const handleUpdate = jest.fn();
        
        await act(async () => {
            render(<RecipeView recipe={mockRecipe} onUpdate={handleUpdate} />);
        });

        const addTagButton = screen.getByText('Add Tag');
        
        await act(async () => {
             fireEvent.click(addTagButton);
        });
        
        // Check if modal title appears
        await waitFor(() => {
            expect(screen.getByText('Manage Tags')).toBeInTheDocument();
        });
        
        // Check API call
        expect(global.fetch).toHaveBeenCalledWith('/api/tags');
    });
});
