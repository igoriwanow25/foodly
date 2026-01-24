'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Button, Spin, Alert, Modal, Typography } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, HomeOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation'; 
import { RecipeView } from '../../../components/RecipeView';
import { RecipeEditor } from '../../../components/RecipeEditor';
import { Recipe } from '../../../lib/types';

const { Header, Content } = Layout;
const { confirm } = Modal;

export default function RecipeDetailPage() {
  const router = useRouter();
  const params = useParams(); 
  const id = params?.id as string;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
      setIsSaving(true);
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
          Modal.error({ title: 'Failed to update', content: message });
      } finally {
          setIsSaving(false);
      }
  };

  const handleDelete = () => {
      confirm({
        title: 'Are you sure delete this recipe?',
        icon: <ExclamationCircleFilled />,
        content: 'This action cannot be undone.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
            try {
                const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Failed to delete');
                router.push('/');
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'An unexpected error occurred';
                Modal.error({ title: 'Error deleting', content: message });
            }
        },
      });
  };

  if (isLoading) return (
      <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
      </Layout>
  );

  if (error || !recipe) return (
       <Layout style={{ minHeight: '100vh', padding: 50 }}>
           <Alert message="Error" description={error || 'Recipe not found'} type="error" showIcon />
       </Layout>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div 
          style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer' }} 
          onClick={() => router.push('/')}
        >
          Foodly
        </div>
        <Button ghost icon={<HomeOutlined />} size="small" onClick={() => router.push('/')}>
           Dashboard
        </Button>
      </Header>

      <Content style={{ padding: '24px 48px' }}>
        {isEditing ? (
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <RecipeEditor 
                    initialData={recipe} 
                    onSave={handleUpdate} 
                    onCancel={() => setIsEditing(false)}
                    isSaving={isSaving} 
                />
            </div>
        ) : (
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/')}>Back</Button>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>Delete</Button>
                        <Button type="primary" icon={<EditOutlined />} onClick={() => setIsEditing(true)}>Edit Recipe</Button>
                    </div>
                </div>
                <RecipeView recipe={recipe} />
            </div>
        )}
      </Content>
    </Layout>
  );
}