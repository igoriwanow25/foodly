import { Recipe } from '@/lib/types';

export type ViewMode = 'search' | 'edit' | 'view';

export interface AddRecipeState {
  viewMode: ViewMode;
  currentRecipe: Partial<Recipe> | null;
  isLoading: boolean;
  error: string | null;
  successMsg: string | null;
}

export const initialState: AddRecipeState = {
  viewMode: 'search',
  currentRecipe: null,
  isLoading: false,
  error: null,
  successMsg: null,
};

export type AddRecipeAction =
  | { type: 'SEARCH_START' }
  | { type: 'SEARCH_SUCCESS'; payload: Recipe }
  | { type: 'SEARCH_EXISTING'; payload: Recipe }
  | { type: 'SEARCH_ERROR'; payload: string }
  | { type: 'MANUAL_START' }
  | { type: 'SAVE_START' }
  | { type: 'SAVE_SUCCESS'; payload: Recipe }
  | { type: 'SAVE_ERROR'; payload: string }
  | { type: 'EDIT_RECIPE' }
  | { type: 'RESET' };

export function addRecipeReducer(
  state: AddRecipeState,
  action: AddRecipeAction
): AddRecipeState {
  switch (action.type) {
    case 'SEARCH_START':
      return { ...state, isLoading: true, error: null, successMsg: null };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        viewMode: 'edit',
        currentRecipe: action.payload,
      };
    case 'SEARCH_EXISTING':
      return {
        ...state,
        isLoading: false,
        viewMode: 'view',
        currentRecipe: action.payload,
      };
    case 'SEARCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'MANUAL_START':
      return {
        ...initialState,
        viewMode: 'edit',
        currentRecipe: {},
      };
    case 'SAVE_START':
      return { ...state, isLoading: true, error: null, successMsg: null };
    case 'SAVE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        viewMode: 'view',
        currentRecipe: action.payload,
        successMsg: 'Recipe saved successfully!',
      };
    case 'SAVE_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'EDIT_RECIPE':
      return { ...state, viewMode: 'edit' };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
