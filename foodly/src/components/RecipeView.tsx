'use client';

import React from 'react';
import { Row, Col, Card, Form, Image } from 'react-bootstrap';
import { Recipe, parseRecipe } from '../lib/types';

interface RecipeViewProps {
  recipe: Recipe;
}

export const RecipeView: React.FC<RecipeViewProps> = ({ recipe }) => {
  const parsedRecipe = parseRecipe(recipe);

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="text-center mb-4">
            <h2 className="display-5 mb-3">{parsedRecipe.title}</h2>
            {parsedRecipe.imagePath && (
            <div className="mb-3" style={{ maxHeight: '400px', overflow: 'hidden', borderRadius: '8px' }}>
                <Image src={parsedRecipe.imagePath} alt={parsedRecipe.title} fluid style={{ objectFit: 'cover', width: '100%' }} />
            </div>
            )}
            <div className="text-muted small">
                {parsedRecipe.sourceUrl && (
                    <>Source: <a href={parsedRecipe.sourceUrl} target="_blank" rel="noopener noreferrer">{new URL(parsedRecipe.sourceUrl).hostname}</a></>
                )}
            </div>
        </div>

        <Row>
          <Col md={5} className="mb-4">
            <Card className="h-100 border-0 bg-light">
                <Card.Body>
                    <h4 className="mb-3">Ingredients</h4>
                    <Form>
                    {parsedRecipe.ingredients.map((ingredient, index) => (
                        <Form.Check 
                            key={index}
                            type="checkbox"
                            id={`ingredient-${index}`}
                            label={ingredient}
                            className="mb-2"
                        />
                    ))}
                    </Form>
                    {parsedRecipe.ingredients.length === 0 && <p className="text-muted">No ingredients found.</p>}
                </Card.Body>
            </Card>
          </Col>
          
          <Col md={7}>
            <h4 className="mb-3">Instructions</h4>
            {parsedRecipe.instructions.length > 0 ? (
                <ol className="list-group list-group-numbered list-group-flush">
                {parsedRecipe.instructions.map((step, index) => (
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
