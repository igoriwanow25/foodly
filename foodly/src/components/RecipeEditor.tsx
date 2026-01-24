'use client';

import React, { useState } from 'react';
import { Form, Button, Input, InputNumber, Card, Row, Col, Space, Typography, Image } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Recipe, parseRecipe } from '../lib/types';
import { Tag } from '@prisma/client';

const { TextArea } = Input;
const { Title } = Typography;

interface RecipeEditorProps {
  initialData?: Partial<Recipe & { tags: Tag[] }>;
  onSave: (data: Partial<Recipe>) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export const RecipeEditor: React.FC<RecipeEditorProps> = ({ initialData, onSave, onCancel, isSaving }) => {
  const parsedInitialData = initialData ? parseRecipe(initialData as Recipe) : null;
  
  const getInitialTags = () => {
      if (!parsedInitialData?.tags) return '';
      return parsedInitialData.tags.map(t => t.name).join(', ');
  };

  const [formData, setFormData] = useState({
    title: parsedInitialData?.title || '',
    description: parsedInitialData?.description || '', 
    image: parsedInitialData?.imagePath || '',
    sourceUrl: parsedInitialData?.sourceUrl || '',
    prepTime: parsedInitialData?.prepTime || 0,
    servings: parsedInitialData?.servings || 0,
    tags: getInitialTags(), 
  });

  const [ingredients, setIngredients] = useState<string[]>(parsedInitialData?.ingredients || []);
  const [instructions, setInstructions] = useState<string[]>(parsedInitialData?.instructions || []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name: string, value: number | null) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Ingredient Helpers
  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));

  // Instruction Helpers
  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => setInstructions([...instructions, '']);
  const removeInstruction = (index: number) => setInstructions(instructions.filter((_, i) => i !== index));

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      ingredients: JSON.stringify(ingredients.filter(i => i.trim() !== '')),
      instructions: JSON.stringify(instructions.filter(i => i.trim() !== '')),
      tags: formData.tags.split(',').map(t => ({ name: t.trim(), color: '#e0e0e0', id: '' })).filter(t => t.name !== ''),
    };
    onSave(finalData as Partial<Recipe>);
  };

  return (
    <Card title="Edit Recipe" variant="borderless" className="shadow-sm">
        <Form layout="vertical" onFinish={handleSubmit}>
          <Row gutter={24}>
            <Col md={16} xs={24}>
              <Form.Item label="Title" required>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Form.Item>
              
              <Form.Item label="Description">
                <TextArea
                  rows={2}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
            
            <Col md={8} xs={24}>
               {/* Image Preview */}
               {formData.image && (
                   <div style={{ marginBottom: 16, textAlign: 'center', height: 150, overflow: 'hidden', borderRadius: 4 }}>
                       <Image 
                          src={formData.image} 
                          alt="Preview" 
                          height={150}
                          style={{ objectFit: 'cover', width: '100%' }} 
                       />
                   </div>
               )}
               <Form.Item label="Image URL">
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col md={8} xs={24}>
               <Form.Item label="Prep Time (min)">
                 <InputNumber 
                    style={{ width: '100%' }}
                    value={formData.prepTime} 
                    onChange={(val) => handleNumberChange('prepTime', val)} 
                 />
               </Form.Item>
            </Col>
            <Col md={8} xs={24}>
               <Form.Item label="Servings">
                 <InputNumber 
                    style={{ width: '100%' }}
                    value={formData.servings} 
                    onChange={(val) => handleNumberChange('servings', val)} 
                 />
               </Form.Item>
            </Col>
            <Col md={8} xs={24}>
               <Form.Item label="Source URL">
                 <Input
                    name="sourceUrl" 
                    value={formData.sourceUrl} 
                    onChange={handleInputChange} 
                 />
               </Form.Item>
            </Col>
          </Row>

          <Row>
             <Col span={24}>
                <Form.Item label="Tags (comma separated)">
                  <Input 
                    name="tags" 
                    value={formData.tags} 
                    onChange={handleInputChange} 
                    placeholder="Dinner, Healthy, Italian"
                  />
                </Form.Item>
             </Col>
          </Row>

          <div style={{ borderTop: '1px solid #f0f0f0', margin: '24px 0' }} />

          <Row gutter={24}>
            <Col md={12} xs={24} style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Title level={5}>Ingredients</Title>
                <Button type="dashed" size="small" icon={<PlusOutlined />} onClick={addIngredient}>Add</Button>
              </div>
              <Space direction="vertical" style={{ width: '100%' }}>
                {ingredients.map((ing, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 8 }}>
                    <Input
                      value={ing}
                      onChange={(e) => updateIngredient(idx, e.target.value)}
                    />
                    <Button danger icon={<DeleteOutlined />} onClick={() => removeIngredient(idx)} />
                  </div>
                ))}
              </Space>
            </Col>

            <Col md={12} xs={24}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Title level={5}>Instructions</Title>
                <Button type="dashed" size="small" icon={<PlusOutlined />} onClick={addInstruction}>Add</Button>
              </div>
              <Space direction="vertical" style={{ width: '100%' }}>
               {instructions.map((inst, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'start' }}>
                  <div style={{ paddingTop: 5, minWidth: 20 }}>{idx + 1}.</div>
                  <TextArea
                    autoSize
                    value={inst}
                    onChange={(e) => updateInstruction(idx, e.target.value)}
                  />
                  <Button danger icon={<DeleteOutlined />} onClick={() => removeInstruction(idx)} />
                </div>
              ))}
              </Space>
            </Col>
          </Row>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 24 }}>
            <Button onClick={onCancel} disabled={isSaving}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isSaving}>
                Save Recipe
            </Button>
          </div>

        </Form>
    </Card>
  );
};