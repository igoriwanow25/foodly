'use client';

import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button, Spinner, Alert } from 'react-bootstrap';
import { useRouter, useParams } from 'next/navigation'; // useParams for client component
import { RecipeView } from '../../../components/RecipeView';
import { RecipeEditor } from '../../../components/RecipeEditor';
import { Recipe } from '../../../lib/types';

export default function RecipeDetailPage() {
  const router = useRouter();
  const params = useParams(); // { id: string }
  const id = params?.id as string;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchRecipe(id);
  }, [id]);

  const fetchRecipe = async (recipeId: string) => {
    try {
      const res = await fetch(`/api/recipes/${recipeId}`);
      if (!res.ok) throw new Error('Failed to fetch recipe');
      const data = await res.json();
      setRecipe(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (updatedData: Partial<Recipe>) => {
      // Optimistic update or wait for server? Wait for server.
      try {
          const res = await fetch(`/api/recipes/${id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedData)
          });
          
          if (!res.ok) throw new Error('Failed to update');
          const newData = await res.json();
          setRecipe(newData);
          setIsEditing(false);
      } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'An unexpected error occurred';
          alert('Failed to update: ' + message);
      }
  };

  const handleDelete = async () => {
      if (!window.confirm('Are you sure you want to delete this recipe?')) return;
      
      try {
          const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
          if (!res.ok) throw new Error('Failed to delete');
          router.push('/');
      } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'An unexpected error occurred';
          alert('Error deleting: ' + message);
      }
  };

  if (isLoading) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;
  if (error || !recipe) return <Container className="py-5"><Alert variant="danger">{error || 'Recipe not found'}</Alert></Container>;

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="/" style={{cursor: 'pointer'}}>Foodly</Navbar.Brand>
          <Button variant="outline-light" size="sm" onClick={() => router.push('/')}>Dashboard</Button>
        </Container>
      </Navbar>

      <Container className="pb-5">
        {isEditing ? (
            <div className="mx-auto" style={{ maxWidth: '900px' }}>
                <RecipeEditor 
                    initialData={recipe} 
                    onSave={handleUpdate} 
                    onCancel={() => setIsEditing(false)}
                    isSaving={false} // Todo: Add saving state
                />
            </div>
        ) : (
            <div className="mx-auto" style={{ maxWidth: '900px' }}>
                <div className="d-flex justify-content-between mb-3">
                    <Button variant="outline-secondary" onClick={() => router.push('/')}>&larr; Back</Button>
                    <div className="d-flex gap-2">
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        <Button variant="primary" onClick={() => setIsEditing(true)}>Edit Recipe</Button>
                    </div>
                </div>
                <RecipeView recipe={recipe} />
            </div>
        )}
      </Container>
    </>
  );
}
