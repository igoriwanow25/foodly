'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Checkbox, Image, Typography, Tag as AntTag, Button, Modal, Select, message } from 'antd';
import { PlusOutlined, TagOutlined } from '@ant-design/icons';
import { Recipe, parseRecipe } from '../lib/types';
import { Tag } from '@prisma/client';

const { Title, Link, Text } = Typography;

interface RecipeViewProps {
  recipe: Recipe;
  onUpdate?: () => void;
}

export const RecipeView: React.FC<RecipeViewProps> = ({ recipe, onUpdate }) => {
  const parsedRecipe = parseRecipe(recipe);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<{ label: string, value: string }[]>([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOpenTagModal = async () => {
    setIsTagModalOpen(true);
    setSelectedTags(parsedRecipe.tags ? parsedRecipe.tags.map(t => t.name) : []);
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

  const handleTagSave = async () => {
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
        setIsTagModalOpen(false);
        if (onUpdate) onUpdate();
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

  return (
    <Card variant="borderless" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={2}>{parsedRecipe.title}</Title>
            {parsedRecipe.imagePath && (
            <div style={{ marginBottom: 16, borderRadius: '8px', overflow: 'hidden' }}>
                <Image 
                    src={parsedRecipe.imagePath} 
                    alt={parsedRecipe.title} 
                    style={{ objectFit: 'cover', width: '100%', maxWidth: '800px' }}
                />
            </div>
            )}
            <div style={{ marginBottom: 16 }}>
                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    {parsedRecipe.tags && parsedRecipe.tags.map((tag, idx) => (
                        <AntTag key={idx} color="blue">{tag.name}</AntTag>
                    ))}
                    <AntTag 
                        style={{ borderStyle: 'dashed', cursor: 'pointer', background: 'transparent' }} 
                        onClick={handleOpenTagModal}
                    >
                        <PlusOutlined /> Add Tag
                    </AntTag>
                 </div>
            </div>
            <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '12px' }}>
                {parsedRecipe.sourceUrl && (
                    <>Source: <Link href={parsedRecipe.sourceUrl} target="_blank" rel="noopener noreferrer">{new URL(parsedRecipe.sourceUrl).hostname}</Link></>
                )}
            </div>
        </div>

        <Modal
            title="Manage Tags"
            open={isTagModalOpen}
            onOk={handleTagSave}
            confirmLoading={confirmLoading}
            onCancel={() => setIsTagModalOpen(false)}
        >
            <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Select or create tags"
                onChange={setSelectedTags}
                value={selectedTags}
                options={availableTags}
                tokenSeparators={[',']}
            />
        </Modal>

        <Row gutter={[24, 24]}>
          <Col md={10} xs={24}>
            <Card style={{ height: '100%', background: '#fafafa' }} variant="borderless">
                <Title level={4}>Ingredients</Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {parsedRecipe.ingredients.map((ingredient, index) => (
                        <Checkbox key={index}>{ingredient}</Checkbox>
                    ))}
                    {parsedRecipe.ingredients.length === 0 && <Text type="secondary">No ingredients found.</Text>}
                </div>
            </Card>
          </Col>
          
          <Col md={14} xs={24}>
            <Title level={4}>Instructions</Title>
            {parsedRecipe.instructions.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {parsedRecipe.instructions.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ flexShrink: 0, width: 24, height: 24, background: '#1677ff', color: '#fff', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: '12px' }}>{index + 1}</div>
                        <Text style={{ color: 'rgba(0, 0, 0, 0.88)' }}>{item}</Text>
                    </div>
                  ))}
                </div>
            ) : (
                <Text type="secondary">No instructions found.</Text>
            )}
          </Col>
        </Row>
    </Card>
  );
};
