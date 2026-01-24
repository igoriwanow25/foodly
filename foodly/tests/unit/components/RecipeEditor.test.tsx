import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { RecipeEditor } from '../../../src/components/RecipeEditor';
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

describe('RecipeEditor', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and fetches tags', async () => {
    await act(async () => {
      render(
        <RecipeEditor 
          onSave={mockOnSave} 
          onCancel={mockOnCancel} 
          isSaving={false} 
        />
      );
    });

    expect(screen.getByText('Edit Recipe')).toBeInTheDocument();
    
    // Check if fetch was called
    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/tags');
    });
  });

  it('submits form with tags', async () => {
    const { container } = render(
        <RecipeEditor 
          onSave={mockOnSave} 
          onCancel={mockOnCancel} 
          isSaving={false} 
        />
    );

    // Wait for initial fetch to settle to avoid act warnings
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // Find input by name attribute since label association is flaky in JSDOM/AntD test
    const titleInput = container.querySelector('input[name="title"]');
    expect(titleInput).toBeInTheDocument();

    await act(async () => {
        fireEvent.change(titleInput!, { target: { value: 'Test Recipe' } });
    });

    // Verify Select is present via placeholder or class
    // Antd Select input is hidden, but the control is there.
    expect(screen.getByText('Select or create tags')).toBeInTheDocument();

    const saveButton = screen.getByText('Save Recipe');
    
    await act(async () => {
        fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalled();
      const calls = mockOnSave.mock.calls[0][0];
      expect(calls.title).toBe('Test Recipe');
      expect(Array.isArray(calls.tags)).toBe(true);
    });
  });
});
