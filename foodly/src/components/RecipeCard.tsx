'use client';

import React, { useState } from 'react';
import { Card, Tag as AntTag, Typography, Button, Modal, Select, message } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { Recipe } from '../lib/types';
import { Tag } from '@prisma/client';

const { Meta } = Card;
const { Text } = Typography;

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  onUpdate?: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<{ label: string, value: string }[]>([]);

  const handleOpenModal = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
    // Initialize tags
    setSelectedTags(recipe.tags ? recipe.tags.map(t => t.name) : []);
    
    // Fetch available tags
    try {
      const res = await fetch('/api/tags');
      if (res.ok) {
        const tags: Tag[] = await res.json();
        setAvailableTags(tags.map(t => ({ label: t.name, value: t.name })));
      }
    } catch (error) {
      console.error('Failed to fetch tags', error);
    }
  };

  const handleOk = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmLoading(true);
    try {
      const res = await fetch(`/api/recipes/${recipe.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tags: selectedTags,
        }),
      });

      if (res.ok) {
        message.success('Tags updated');
        setIsModalOpen(false);
        if (onUpdate) {
            onUpdate();
        }
      } else {
        message.error('Failed to update tags');
      }
    } catch (error) {
      console.error('Error updating tags:', error);
      message.error('An error occurred');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
        <Card
        hoverable
        onClick={onClick}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column' } }}
        actions={[
            <TagOutlined key="tag" onClick={handleOpenModal} aria-label="Edit Tags" />
        ]}
        cover={
            recipe.imagePath ? (
            <div style={{ height: 200, overflow: 'hidden' }}>
                <img
                    alt={recipe.title}
                    src={recipe.imagePath}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            ) : null
        }
        >
        <Meta
            title={recipe.title}
            description={
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div style={{ marginBottom: 8 }}>
                {recipe.tags && recipe.tags.length > 0 ? (
                    recipe.tags.map((tag, idx) => (
                    <AntTag key={idx} style={{ marginRight: 4, marginBottom: 4 }}>
                        {tag.name}
                    </AntTag>
                    ))
                ) : (
                    <Text type="secondary" style={{ fontSize: '12px' }}>No tags</Text>
                )}
                </div>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                {recipe.prepTime ? `${recipe.prepTime} min` : ''}
                {recipe.prepTime && recipe.servings ? ' • ' : ''}
                {recipe.servings ? `${recipe.servings} servings` : ''}
                </Text>
            </div>
            }
        />
        </Card>
        
        <div onClick={(e) => e.stopPropagation()}>
            <Modal
                title="Manage Tags"
                open={isModalOpen}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                forceRender
            >
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Select or create tags"
                    onChange={setSelectedTags}
                    value={selectedTags}
                    options={availableTags}
                    tokenSeparators={[',']}
                    onClick={(e) => e.stopPropagation()} 
                />
            </Modal>
        </div>
    </>
  );
};