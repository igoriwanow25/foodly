'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Container, Navbar, Row, Col, Form, Button, Badge, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe } from '../lib/types';

export default function Dashboard() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await fetch('/api/recipes');
      if (res.ok) {
        const data = await res.json();
        setRecipes(data);
      }
    } catch (error) {
      console.error('Failed to fetch recipes', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Derive unique tags from recipes
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    recipes.forEach(r => {
        if (r.tags) {
            r.tags.forEach(t => tags.add(t.name));
        }
    });
    return Array.from(tags).sort();
  }, [recipes]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
        setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    // Text Search
    if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        result = result.filter(r => 
            r.title.toLowerCase().includes(lowerTerm) || 
            (r.description && r.description.toLowerCase().includes(lowerTerm)) ||
            (Array.isArray(r.ingredients) && r.ingredients.some(i => i.toLowerCase().includes(lowerTerm)))
        );
    }

    // Tag Filter (AND logic)
    if (selectedTags.length > 0) {
        result = result.filter(r => {
            const recipeTags = r.tags ? r.tags.map(t => t.name) : [];
            return selectedTags.every(tag => recipeTags.includes(tag));
        });
    }

    // Sort
    result.sort((a: Recipe, b: Recipe) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [recipes, searchTerm, selectedTags, sortOrder]);

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" className="mb-4">
        <Container>
          <Navbar.Brand href="#">Foodly Cookbook</Navbar.Brand>
          <Button variant="success" onClick={() => router.push('/add')}>+ Add Recipe</Button>
        </Container>
      </Navbar>

      <Container className="pb-5">
        <Row className="mb-4 g-3 align-items-end">
            <Col md={6}>
                <Form.Label>Search</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Search titles, ingredients..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Col>
            <Col md={3}>
                <Form.Label>Sort By</Form.Label>
                <Form.Select 
                    value={sortOrder} 
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                >
                    <option value="newest">Newest Added</option>
                    <option value="oldest">Oldest Added</option>
                </Form.Select>
            </Col>
        </Row>

        {allTags.length > 0 && (
            <div className="mb-4">
                <p className="mb-2 text-muted small uppercase fw-bold">Filter by Tags:</p>
                <div className="d-flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <Badge 
                            key={tag}
                            bg={selectedTags.includes(tag) ? "primary" : "light"}
                            text={selectedTags.includes(tag) ? "white" : "dark"}
                            className="border cursor-pointer user-select-none"
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                    {selectedTags.length > 0 && (
                        <Button variant="link" size="sm" className="text-decoration-none p-0 ms-2" onClick={() => setSelectedTags([])}>
                            Clear
                        </Button>
                    )}
                </div>
            </div>
        )}

        {isLoading ? (
            <div className="text-center py-5">
                <Spinner animation="border" />
            </div>
        ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
                {filteredRecipes.map((recipe: Recipe) => (
                    <Col key={recipe.id || Math.random()}>
                        <RecipeCard 
                            recipe={recipe} 
                            onClick={() => router.push(`/recipes/${recipe.id}`)} 
                        />
                    </Col>
                ))}
                {filteredRecipes.length === 0 && (
                    <Col xs={12} className="text-center py-5 text-muted">
                        <h4>No recipes found</h4>
                        <p>Try adjusting your search or filters.</p>
                    </Col>
                )}
            </Row>
        )}
      </Container>
    </>
  );
}
