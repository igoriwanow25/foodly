'use client';

import React from 'react';
import { Row, Col, Card, Checkbox, Image, Typography, List } from 'antd';
import { Recipe, parseRecipe } from '../lib/types';

const { Title, Link, Text } = Typography;

interface RecipeViewProps {
  recipe: Recipe;
}

export const RecipeView: React.FC<RecipeViewProps> = ({ recipe }) => {
  const parsedRecipe = parseRecipe(recipe);

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
            <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '12px' }}>
                {parsedRecipe.sourceUrl && (
                    <>Source: <Link href={parsedRecipe.sourceUrl} target="_blank" rel="noopener noreferrer">{new URL(parsedRecipe.sourceUrl).hostname}</Link></>
                )}
            </div>
        </div>

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
