'use client';

import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, InputGroup } from 'react-bootstrap';
import { Recipe } from '../core/types';

interface RecipeEditorProps {
  initialData?: Partial<Recipe>;
  onSave: (data: any) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export const RecipeEditor: React.FC<RecipeEditorProps> = ({ initialData, onSave, onCancel, isSaving }) => {
  // Helper to process initial tags into string
  const getInitialTags = () => {
      if (!initialData?.tags) return '';
      return initialData.tags.map((t: any) => typeof t === 'string' ? t : t.name).join(', ');
  };

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '', 
    image: initialData?.image || '',
    sourceUrl: initialData?.url || '',
    prepTime: initialData?.prepTime || 0,
    servings: initialData?.servings || 0,
    tags: getInitialTags(), 
  });

  const [ingredients, setIngredients] = useState<string[]>(initialData?.ingredients || []);
  const [instructions, setInstructions] = useState<string[]>(initialData?.instructions || []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      ingredients: ingredients.filter(i => i.trim() !== ''),
      instructions: instructions.filter(i => i.trim() !== ''),
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
    };
    onSave(finalData);
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-white">
        <h3 className="mb-0">Edit Recipe</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            
            <Col md={4}>
               {/* Image Preview */}
               {formData.image && (
                   <div className="mb-2 text-center" style={{ maxHeight: '150px', overflow: 'hidden', borderRadius: '4px' }}>
                       <img src={formData.image} alt="Preview" style={{ width: '100%', objectFit: 'cover' }} />
                   </div>
               )}
               <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
               <Form.Group>
                 <Form.Label>Prep Time (min)</Form.Label>
                 <Form.Control type="number" name="prepTime" value={formData.prepTime} onChange={handleInputChange} />
               </Form.Group>
            </Col>
            <Col md={4}>
               <Form.Group>
                 <Form.Label>Servings</Form.Label>
                 <Form.Control type="number" name="servings" value={formData.servings} onChange={handleInputChange} />
               </Form.Group>
            </Col>
            <Col md={4}>
               <Form.Group>
                 <Form.Label>Source URL</Form.Label>
                 <Form.Control type="text" name="sourceUrl" value={formData.sourceUrl} onChange={handleInputChange} />
               </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
             <Col>
                <Form.Group>
                  <Form.Label>Tags (comma separated)</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="tags" 
                    value={formData.tags} 
                    onChange={handleInputChange} 
                    placeholder="Dinner, Healthy, Italian"
                  />
                </Form.Group>
             </Col>
          </Row>

          <hr />

          <Row>
            <Col md={6}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Ingredients</h5>
                <Button variant="outline-primary" size="sm" onClick={addIngredient}>+ Add</Button>
              </div>
              {ingredients.map((ing, idx) => (
                <InputGroup key={idx} className="mb-2">
                  <Form.Control
                    value={ing}
                    onChange={(e) => updateIngredient(idx, e.target.value)}
                  />
                  <Button variant="outline-danger" onClick={() => removeIngredient(idx)}>×</Button>
                </InputGroup>
              ))}
            </Col>

            <Col md={6}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Instructions</h5>
                <Button variant="outline-primary" size="sm" onClick={addInstruction}>+ Add</Button>
              </div>
               {instructions.map((inst, idx) => (
                <InputGroup key={idx} className="mb-2">
                  <InputGroup.Text>{idx + 1}</InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    value={inst}
                    onChange={(e) => updateInstruction(idx, e.target.value)}
                  />
                  <Button variant="outline-danger" onClick={() => removeInstruction(idx)}>×</Button>
                </InputGroup>
              ))}
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={onCancel} disabled={isSaving}>Cancel</Button>
            <Button variant="success" type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Recipe'}
            </Button>
          </div>

        </Form>
      </Card.Body>
    </Card>
  );
};