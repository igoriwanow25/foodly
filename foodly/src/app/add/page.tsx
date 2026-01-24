'use client';

import React, { useReducer } from 'react';
import { Layout, Button, Alert, Typography } from 'antd';
import { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { RecipeSearch } from '../../components/RecipeSearch';
import { RecipeView } from '../../components/RecipeView';
import { RecipeEditor } from '../../components/RecipeEditor';
import { Recipe } from '../../lib/types';
import { addRecipeReducer, initialState } from './state';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

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

      // Map ScrapedRecipe to Recipe (Prisma) structure
      const mappedData = {
          ...data,
          sourceUrl: data.url,
          imagePath: data.image
      };

      dispatch({ type: 'SEARCH_SUCCESS', payload: mappedData });
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
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div 
          style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer' }} 
          onClick={() => router.push('/')}
        >
          Foodly
        </div>
        <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
             {viewMode === 'search' && "Add New Recipe"}
             {viewMode === 'edit' && "Review & Edit"}
             {viewMode === 'view' && "Recipe Details"}
        </div>
        <Button ghost icon={<HomeOutlined />} size="small" onClick={() => router.push('/')}>
           Dashboard
        </Button>
      </Header>

      <Content style={{ padding: '24px 48px' }}>
         <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {error && <Alert message={error} type="error" closable onClose={() => dispatch({ type: 'RESET' })} style={{ marginBottom: 24 }} />}
            {successMsg && <Alert message={successMsg} type="success" closable onClose={() => dispatch({ type: 'RESET' })} style={{ marginBottom: 24 }} />}

            {viewMode === 'search' && (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                    <Title level={1} style={{ marginBottom: 8 }}>Add Recipe</Title>
                    <Text type="secondary" style={{ fontSize: 18, display: 'block', marginBottom: 48 }}>Import from URL or create manually.</Text>
                    
                    <div style={{ maxWidth: 600, margin: '0 auto' }}>
                        <RecipeSearch onSearch={handleSearch} isLoading={isLoading} />
                        <div style={{ marginTop: 24 }}>
                            <Text type="secondary">or </Text>
                            <Button type="link" onClick={handleManualStart}>Enter Manually</Button>
                        </div>
                    </div>
                </div>
            )}

            {viewMode === 'edit' && (
                <div>
                    <Button icon={<ArrowLeftOutlined />} style={{ marginBottom: 16 }} onClick={handleBackToSearch}>Back</Button>
                    <RecipeEditor 
                        initialData={currentRecipe || {}} 
                        onSave={handleSave} 
                        onCancel={handleBackToSearch}
                        isSaving={isLoading}
                    />
                </div>
            )}

            {viewMode === 'view' && currentRecipe && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <Button icon={<ArrowLeftOutlined />} onClick={handleBackToSearch}>Back to Search</Button>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <Button onClick={() => router.push('/')}>Go to Dashboard</Button>
                            <Button type="primary" onClick={handleEdit}>Edit</Button>
                        </div>
                    </div>
                    <RecipeView recipe={currentRecipe as Recipe} />
                </div>
            )}
         </div>
      </Content>
    </Layout>
  );
}