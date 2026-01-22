'use client';

import React, { useReducer } from 'react';
import { Container, Navbar, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { RecipeSearch } from '../../components/RecipeSearch';
import { RecipeView } from '../../components/RecipeView';
import { RecipeEditor } from '../../components/RecipeEditor';
import { Recipe } from '../../lib/types';
import { addRecipeReducer, initialState } from './state';

export default function AddRecipePage() {
  const router = useRouter();
  const [state, dispatch] = useReducer(addRecipeReducer, initialState);
  const { viewMode, currentRecipe, isLoading, error, successMsg } = state;

  const handleSearch = async (url: string) => {
    dispatch({ type: 'SEARCH_START' });

    try {
      const checkRes = await fetch(`/api/recipes?url=${encodeURIComponent(url)}`);
      if (checkRes.ok) {
        const existing = await checkRes.json();
        if (existing && existing.length > 0) {
          const confirmView = window.confirm(
            'This URL is already in your cookbook. Click OK to view the existing recipe, or Cancel to create a new copy.'
          );
          if (confirmView) {
            dispatch({ type: 'SEARCH_EXISTING', payload: existing[0] });
            return;
          }
        }
      }

      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch recipe');

      dispatch({ type: 'SEARCH_SUCCESS', payload: data });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      dispatch({ type: 'SEARCH_ERROR', payload: message });
    }
  };

  const handleManualStart = () => {
    dispatch({ type: 'MANUAL_START' });
  };

  const handleSave = async (recipeData: Partial<Recipe>) => {
    dispatch({ type: 'SAVE_START' });
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      });
      const savedRecipe = await response.json();
      if (!response.ok) throw new Error(savedRecipe.error || 'Failed to save');

      dispatch({ type: 'SAVE_SUCCESS', payload: savedRecipe });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save recipe';
      dispatch({ type: 'SAVE_ERROR', payload: message });
    }
  };

  const handleBackToSearch = () => {
    dispatch({ type: 'RESET' });
  };

  const handleEdit = () => {
    dispatch({ type: 'EDIT_RECIPE' });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="/" style={{cursor: 'pointer'}}>Foodly</Navbar.Brand>
          <Navbar.Text className="mx-auto">
              {viewMode === 'search' && "Add New Recipe"}
              {viewMode === 'edit' && "Review & Edit"}
              {viewMode === 'view' && "Recipe Details"}
          </Navbar.Text>
          <Button variant="outline-light" size="sm" onClick={() => router.push('/')}>
             Dashboard
          </Button>
        </Container>
      </Navbar>

      <Container className="pb-5">
        {error && <Alert variant="danger" onClose={() => dispatch({ type: 'RESET' })} dismissible>{error}</Alert>}
        {successMsg && <Alert variant="success" onClose={() => dispatch({ type: 'RESET' })} dismissible>{successMsg}</Alert>}

        {viewMode === 'search' && (
            <>
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold">Add Recipe</h1>
                    <p className="lead text-muted">Import from URL or create manually.</p>
                </div>
                <div className="mx-auto" style={{ maxWidth: '800px' }}>
                    <RecipeSearch onSearch={handleSearch} isLoading={isLoading} />
                    <div className="text-center mt-4">
                        <span className="text-muted">or </span>
                        <Button variant="link" onClick={handleManualStart}>Enter Manually</Button>
                    </div>
                </div>
            </>
        )}

        {viewMode === 'edit' && (
            <div className="mx-auto" style={{ maxWidth: '900px' }}>
                <Button variant="outline-secondary" className="mb-3" onClick={handleBackToSearch}>&larr; Back</Button>
                <RecipeEditor 
                    initialData={currentRecipe || {}} 
                    onSave={handleSave} 
                    onCancel={handleBackToSearch}
                    isSaving={isLoading}
                />
            </div>
        )}

        {viewMode === 'view' && currentRecipe && (
            <div className="mx-auto" style={{ maxWidth: '900px' }}>
                <div className="d-flex justify-content-between mb-3">
                    <Button variant="outline-secondary" onClick={handleBackToSearch}>&larr; Back to Search</Button>
                    <div className="d-flex gap-2">
                        <Button variant="secondary" onClick={() => router.push('/')}>Go to Dashboard</Button>
                        <Button variant="primary" onClick={handleEdit}>Edit</Button>
                    </div>
                </div>
                <RecipeView recipe={currentRecipe as Recipe} />
            </div>
        )}
      </Container>
    </>
  );
}
