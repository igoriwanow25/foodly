'use client';

import React from 'react';
import { Row, Col, Card, Form, Image, ListGroup } from 'react-bootstrap';
import { Recipe } from '../core/types';

interface RecipeViewProps {
  recipe: Recipe;
}

export const RecipeView: React.FC<RecipeViewProps> = ({ recipe }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="text-center mb-4">
            <h2 className="display-5 mb-3">{recipe.title}</h2>
            {recipe.image && (
            <div className="mb-3" style={{ maxHeight: '400px', overflow: 'hidden', borderRadius: '8px' }}>
                <Image src={recipe.image} alt={recipe.title} fluid style={{ objectFit: 'cover', width: '100%' }} />
            </div>
            )}
            <div className="text-muted small">
                {recipe.url && (
                    <>Source: <a href={recipe.url} target="_blank" rel="noopener noreferrer">{new URL(recipe.url).hostname}</a></>
                )}
            </div>
        </div>

        <Row>
          <Col md={5} className="mb-4">
            <Card className="h-100 border-0 bg-light">
                <Card.Body>
                    <h4 className="mb-3">Ingredients</h4>
                    <Form>
                    {recipe.ingredients.map((ingredient, index) => (
                        <Form.Check 
                            key={index}
                            type="checkbox"
                            id={`ingredient-${index}`}
                            label={ingredient}
                            className="mb-2"
                        />
                    ))}
                    </Form>
                    {recipe.ingredients.length === 0 && <p className="text-muted">No ingredients found.</p>}
                </Card.Body>
            </Card>
          </Col>
          
          <Col md={7}>
            <h4 className="mb-3">Instructions</h4>
            {recipe.instructions.length > 0 ? (
                <ol className="list-group list-group-numbered list-group-flush">
                {recipe.instructions.map((step, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                    <div className="ms-2 me-auto">
                        {step}
                    </div>
                    </li>
                ))}
                </ol>
            ) : (
                <p className="text-muted">No instructions found.</p>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
