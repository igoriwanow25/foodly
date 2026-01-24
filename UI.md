# Foodly - UX/UI Specification & Implementation Guide

## 1. Project Overview
This document defines the User Experience (UX) and User Interface (UI) specifications for **Foodly**, based on **Ant Design 5.0** principles. It serves as the single source of truth for frontend implementation.

**Goal:** Create a clean, modern, and responsive recipe extractor that feels like a professional dashboard.

## 2. Technical Foundation
*   **Framework:** Next.js 14+ (App Router).
*   **UI Library:** Ant Design (`antd`).
*   **Icons:** `@ant-design/icons`.
*   **Styling Strategy:** CSS-in-JS (Ant Design's internal engine).
*   **Theme:** Default "Ant Blue" (`#1677ff`) with Dark Mode support.

## 3. Design System Configuration

### 3.1. Theme Configuration
We will use `ConfigProvider` to manage the global theme and Dark Mode.

*   **Primary Color:** `#1677ff` (Daybreak Blue).
*   **Border Radius:** `8px` (Modern, slightly rounded).
*   **Font Family:** System default (San Francisco, Segoe UI, Roboto).

### 3.2. Responsive Breakpoints
We strictly follow Ant Design's grid system:
*   **xs (<576px):** Mobile (Stacked layout).
*   **md (>=768px):** Tablet (Hybrid).
*   **lg (>=992px):** Desktop (Two-column layout).

## 4. App Shell Architecture (Layout)
**Component:** `Layout` (AntD).

### 4.1. Header (`Layout.Header`)
*   **Style:** Fixed height (`64px`), background color depends on theme (White in Light, Dark Grey in Dark).
*   **Content (Flexbox - Space Between):**
    *   **Left:** Logo/Title (`Typography.Title level={4}` text="Foodly" style={{ margin: 0 }}).
    *   **Right:** Navigation Menu (`Menu` mode="horizontal") containing:
        *   **Dark Mode Switch:** `Switch` component with `checkedChildren="🌙"` and `unCheckedChildren="☀️"`.

### 4.2. Main Content (`Layout.Content`)
*   **Container:** Wrapped in a responsive `div` with `max-width: 1200px` and `margin: 0 auto`.
*   **Padding:** `24px` on desktop, `16px` on mobile.

### 4.3. Footer (`Layout.Footer`)
*   **Content:** Simple copyright text centered.
*   **Style:** `textAlign: 'center'`, `background: transparent`.

## 5. Page: Home & Search
This is the entry point. It handles URL input and displays state (Empty, Loading, Error, Result).

### 5.1. Hero Section
*   **Component:** `Card` (bordered={false} to blend in, or minimal shadow).
*   **Input:** `Input.Search`.
    *   `size`: "large".
    *   `enterButton`: "Scrape Recipe" (Text) or `<SearchOutlined />` (Icon) + Text.
    *   `placeholder`: "Paste recipe URL here (e.g., https://kwestiasmaku.com/...)"
    *   `allowClear`: true.

### 5.2. Feedback States
*   **Loading:**
    *   **Component:** `Skeleton`.
    *   **Configuration:** `active` prop enabled. Render a `Skeleton.Image` followed by `Skeleton.Input` (block) and several `Skeleton.Paragraph` lines to mimic the recipe view appearing.
*   **Error:**
    *   **Component:** `Alert`.
    *   **Props:** `type="error"`, `showIcon`, `closable`.
    *   **Placement:** Directly below the Search Input.
*   **Empty (Initial State):**
    *   **Component:** `Empty`.
    *   **Image:** `Empty.PRESENTED_IMAGE_SIMPLE`.
    *   **Description:** "Paste a URL above to start cooking."
    *   **Quick Actions (New Feature):** A `Space` with "Try these:" label and 3 clickable `Tag` components (e.g., "Kwestia Smaku", "AllRecipes", "BBC Food"). Clicking a tag pre-fills the input.

## 6. Page: Recipe View (The Dashboard)
Displayed when data is successfully extracted.

**Layout Strategy:**
*   **Desktop:** `Row` with `gutter={[16, 16]}`.
    *   Left Col (`span={8}`): Ingredients.
    *   Right Col (`span={16}`): Instructions.
*   **Mobile:** `Row` with stacked cols (`span={24}`).

### 6.1. Header & Meta
*   **Component:** Custom Flex container (simulating `PageHeader`).
*   **Content:**
    *   **Title:** `Typography.Title level={2}`.
    *   **Source:** `Typography.Link` (target="_blank") with `<LinkOutlined />`.

### 6.2. Recipe Image
*   **Implementation:** Used as the `cover` prop of the Ingredients `Card` or a standalone `Image` component at the top of the grid.
*   **Features:** `preview={true}` (Click to zoom).
*   **Style:** `max-height: 400px`, `object-fit: cover`, `width: 100%`, `borderRadius: 8px`.

### 6.3. Ingredients Panel (Left Column)
*   **Container:** `Card` with title="Ingredients".
*   **List:** `List` component.
*   **Items:**
    *   **Interactive:** `Checkbox` for every item.
    *   **UX:** Clicking the text toggles the checkbox.
    *   **Style:** Subtle strikethrough styling when checked (`textDecoration: checked ? 'line-through' : 'none'`).

### 6.4. Instructions Panel (Right Column)
*   **Container:** `Card` with title="Preparation".
*   **Component:** `Steps` (Vertical).
*   **Props:** `direction="vertical"`, `current={-1}` (initially, no step is active).
*   **Behavior:**
    *   We map the instructions array to `Steps.items`.
    *   **Interaction:** Allow user to click a step to mark it as "Current" or "Finished".
    *   **Content:** The instruction text goes into the `description` prop of the Step.

## 7. Technical Implementation Details (Next.js Specifics)

### 7.1. AntdRegistry (Server-Side Rendering)
To prevent FOUC (Flash of Unstyled Content) in Next.js App Router, we must implement the registry.

**File:** `src/lib/AntdRegistry.tsx`
```tsx
'use client';

import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { useServerInsertedHTML } from 'next/navigation';

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ));
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry;
```

### 7.2. Theme Provider Wrapper
**File:** `src/components/ThemeConfigProvider.tsx`
Wraps the app with `ConfigProvider` and manages Dark Mode state.

### 7.3. Directory Structure Update
```
src/
  app/
    layout.tsx      <-- Wraps with AntdRegistry and ThemeConfigProvider
    page.tsx        <-- Main UI (Home + Search + RecipeView conditional render)
  components/
    RecipeCard.tsx  <-- The Dashboard View
    RecipeSearch.tsx
    ThemeConfigProvider.tsx
  lib/
    AntdRegistry.tsx
```

## 8. Summary of Component Mapping
| Logical Element | Ant Design Component |
| :--- | :--- |
| **Layout** | `Layout`, `Row`, `Col` |
| **Typography** | `Typography.Title`, `Typography.Text`, `Typography.Link` |
| **Input** | `Input.Search` |
| **Loading** | `Skeleton` |
| **Error** | `Alert` |
| **Empty State** | `Empty` |
| **Recipe Container** | `Card` |
| **Ingredients** | `List` + `Checkbox` |
| **Instructions** | `Steps` (Vertical) |
| **Icons** | `@ant-design/icons` |
