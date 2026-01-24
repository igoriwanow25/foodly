'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Input, Select, Button, Spin, Row, Col, Typography, Empty, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe } from '../lib/types';

const { Header, Content } = Layout;
const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;

export default function Dashboard() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
    return Array.from(tags).sort().map(t => ({ label: t, value: t }));
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    // Text Search
    if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        result = result.filter(r => 
            r.title.toLowerCase().includes(lowerTerm) || 
            (r.description && r.description.toLowerCase().includes(lowerTerm)) ||
            (Array.isArray(r.ingredients) && r.ingredients.some((i: any) => typeof i === 'string' && i.toLowerCase().includes(lowerTerm)))
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
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Foodly Cookbook</div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => router.push('/add')}>
          Add Recipe
        </Button>
      </Header>
      <Content style={{ padding: '24px 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }} align="bottom">
            <Col xs={24} md={10}>
                <div style={{ marginBottom: 8 }}><Text strong>Search</Text></div>
                <Search
                    placeholder="Search titles, ingredients..."
                    allowClear
                    size="large"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Col>
            <Col xs={24} md={8}>
                <div style={{ marginBottom: 8 }}><Text strong>Filter by Tags</Text></div>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Select tags..."
                    size="large"
                    options={allTags}
                    value={selectedTags}
                    onChange={setSelectedTags}
                    maxTagCount="responsive"
                />
            </Col>
            <Col xs={24} md={6}>
                <div style={{ marginBottom: 8 }}><Text strong>Sort By</Text></div>
                <Select
                    defaultValue="newest"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(value) => setSortOrder(value as 'newest' | 'oldest')}
                >
                    <Option value="newest">Newest Added</Option>
                    <Option value="oldest">Oldest Added</Option>
                </Select>
            </Col>
          </Row>

          {isLoading ? (
             <div style={{ textAlign: 'center', padding: '50px 0' }}>
                 <Spin size="large" />
             </div>
          ) : (
             <>
                 <Row gutter={[24, 24]}>
                    {filteredRecipes.map((recipe) => (
                        <Col xs={24} sm={12} lg={8} key={recipe.id || Math.random()}>
                            <RecipeCard 
                                recipe={recipe} 
                                onClick={() => router.push(`/recipes/${recipe.id}`)} 
                                onUpdate={fetchRecipes}
                            />
                        </Col>
                    ))}
                 </Row>
                 {filteredRecipes.length === 0 && (
                    <Empty description="No recipes found. Try adjusting your search or filters." />
                 )}
             </>
          )}
        </div>
      </Content>
    </Layout>
  );
}