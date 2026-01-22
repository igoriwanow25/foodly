import { addRecipeReducer, initialState, AddRecipeAction } from '../../src/app/add/state';
import { Recipe } from '../../src/lib/types';

const mockRecipe: Recipe = {
  id: '1',
  title: 'Test Recipe',
  description: null,
  sourceUrl: 'http://example.com',
  imagePath: null,
  ingredients: '["Ingredient 1", "Ingredient 2"]',
  instructions: '["Step 1", "Step 2"]',
  prepTime: null,
  servings: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  tags: [],
};

describe('addRecipeReducer', () => {
  it('should return the initial state', () => {
    expect(addRecipeReducer(initialState, {} as AddRecipeAction)).toEqual(initialState);
  });

  it('should handle SEARCH_START', () => {
    const state = addRecipeReducer(initialState, { type: 'SEARCH_START' });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.successMsg).toBeNull();
  });

  it('should handle SEARCH_SUCCESS', () => {
    const state = addRecipeReducer(
      { ...initialState, isLoading: true },
      { type: 'SEARCH_SUCCESS', payload: mockRecipe }
    );
    expect(state.isLoading).toBe(false);
    expect(state.viewMode).toBe('edit');
    expect(state.currentRecipe).toEqual(mockRecipe);
  });

  it('should handle SEARCH_EXISTING', () => {
    const state = addRecipeReducer(
      { ...initialState, isLoading: true },
      { type: 'SEARCH_EXISTING', payload: mockRecipe }
    );
    expect(state.isLoading).toBe(false);
    expect(state.viewMode).toBe('view');
    expect(state.currentRecipe).toEqual(mockRecipe);
  });

  it('should handle SEARCH_ERROR', () => {
    const state = addRecipeReducer(
      { ...initialState, isLoading: true },
      { type: 'SEARCH_ERROR', payload: 'Test Error' }
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Test Error');
  });

  it('should handle MANUAL_START', () => {
    const state = addRecipeReducer(initialState, { type: 'MANUAL_START' });
    expect(state.viewMode).toBe('edit');
    expect(state.currentRecipe).toEqual({});
  });

  it('should handle SAVE_START', () => {
    const state = addRecipeReducer(initialState, { type: 'SAVE_START' });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.successMsg).toBeNull();
  });

  it('should handle SAVE_SUCCESS', () => {
    const state = addRecipeReducer(
      { ...initialState, isLoading: true },
      { type: 'SAVE_SUCCESS', payload: mockRecipe }
    );
    expect(state.isLoading).toBe(false);
    expect(state.viewMode).toBe('view');
    expect(state.currentRecipe).toEqual(mockRecipe);
    expect(state.successMsg).toBe('Recipe saved successfully!');
  });

  it('should handle SAVE_ERROR', () => {
    const state = addRecipeReducer(
      { ...initialState, isLoading: true },
      { type: 'SAVE_ERROR', payload: 'Test Error' }
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Test Error');
  });

  it('should handle EDIT_RECIPE', () => {
    const state = addRecipeReducer(
      { ...initialState, viewMode: 'view' },
      { type: 'EDIT_RECIPE' }
    );
    expect(state.viewMode).toBe('edit');
  });

  it('should handle RESET', () => {
    const state = addRecipeReducer(
      {
        ...initialState,
        viewMode: 'view',
        currentRecipe: mockRecipe,
        error: 'Test Error',
        successMsg: 'Test Success',
      },
      { type: 'RESET' }
    );
    expect(state).toEqual(initialState);
  });
});
