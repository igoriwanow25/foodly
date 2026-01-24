# SYSTEM PROMPT & UI DESIGN CONTEXT

## ROLE
You are an Expert UI/UX Engineer specializing in **Ant Design**.

## STRICT RULES
1. Use `antd` components for everything.
2. Consult the API tables below.

## CRITICAL PATTERNS

### 1. Form Pattern
```jsx
import { Form, Input, Button } from 'antd';

const MyForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => console.log(values);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
};
```

### 2. Table Pattern
```jsx
import { Table } from 'antd';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Action', key: 'action', render: () => <a>Edit</a> },
];

const MyTable = ({ data, loading }) => (
  <Table dataSource={data} columns={columns} rowKey="id" loading={loading} />
);
```

## OFFICIAL API DOCUMENTATION



============================================================
 COMPONENT: GRID
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/grid/index.en-US.md
============================================================

## Design concept

<div class="grid-demo">
  <img draggable="false" src="https://gw.alipayobjects.com/zos/bmw-prod/9189c9ef-c601-40dc-9960-c11dbb681888.svg" alt="grid design" />
</div>

In most business situations, Ant Design needs to solve a lot of information storage problems within the design area, so based on 12 Grids System, we divided the design area into 24 sections.

We name the divided area 'box'. We suggest four boxes for horizontal arrangement at most, one at least. Boxes are proportional to the entire screen as shown in the picture above. To ensure a high level of visual comfort, we customize the typography inside of the box based on the box unit.

## Outline

In the grid system, we define the frame outside the information area based on `row` and `column`, to ensure that every area can have stable arrangement.

Following is a brief look at how it works:

- Establish a set of `column` in the horizontal space defined by `row` (abbreviated col).
- Your content elements should be placed directly in the `col`, and only `col` should be placed directly in `row`.
- The column grid system is a value of 1-24 to represent its range spans. For example, three columns of equal width can be created by `<Col span={8} />`.
- If the sum of `col` spans in a `row` are more than 24, then the overflowing `col` as a whole will start a new line arrangement.

Our grid systems base on Flex layout to allow the elements within the parent to be aligned horizontally - left, center, right, wide arrangement, and decentralized arrangement. The Grid system also supports vertical alignment - top aligned, vertically centered, bottom-aligned. You can also define the order of elements by using `order`.

Layout uses a 24 grid layout to define the width of each "box", but does not rigidly adhere to the grid layout.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Grid</code>
<code src="./demo/gutter.tsx">Grid Gutter</code>
<code src="./demo/offset.tsx">Column offset</code>
<code src="./demo/sort.tsx">Grid sort</code>
<code src="./demo/flex.tsx">Typesetting</code>
<code src="./demo/flex-align.tsx">Alignment</code>
<code src="./demo/flex-order.tsx">Order</code>
<code src="./demo/flex-stretch.tsx">Flex Stretch</code>
<code src="./demo/responsive.tsx">Responsive</code>
<code src="./demo/responsive-flex.tsx" version="5.14.0">Flex Responsive</code>
<code src="./demo/responsive-more.tsx">More responsive</code>
<code src="./demo/playground.tsx">Playground</code>
<code src="./demo/useBreakpoint.tsx">useBreakpoint Hook</code>

## API

Common props ref：[Common props](/docs/react/common-props)

If the Ant Design grid layout component does not meet your needs, you can use the excellent layout components of the community:

- [react-flexbox-grid](http://roylee0704.github.io/react-flexbox-grid/)
- [react-blocks](https://github.com/whoisandy/react-blocks/)

### Row

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | Vertical alignment | `top` \| `middle` \| `bottom` \| `stretch` \| `{[key in 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl']: 'top' \| 'middle' \| 'bottom' \| 'stretch'}` | `top` | object: 4.24.0 |
| gutter | Spacing between grids, could be a [string CSS units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units) or a object like { xs: 8, sm: 16, md: 24}. Or you can use array to make horizontal and vertical spacing work at the same time `[horizontal, vertical]` | number \| string \| object \| array | 0 | string: 5.28.0 |
| justify | Horizontal arrangement | `start` \| `end` \| `center` \| `space-around` \| `space-between` \| `space-evenly` \| `{[key in 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl']: 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'}` | `start` | object: 4.24.0 |
| wrap | Auto wrap line | boolean | true | 4.8.0 |

### Col

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| flex | Flex layout style | string \| number | - |  |
| offset | The number of cells to offset Col from the left | number | 0 |  |
| order | Raster order | number | 0 |  |
| pull | The number of cells that raster is moved to the left | number | 0 |  |
| push | The number of cells that raster is moved to the right | number | 0 |  |
| span | Raster number of cells to occupy, 0 corresponds to `display: none` | number | none |  |
| xs | `screen < 576px` and also default setting, could be a `span` value or an object containing above props | number \| object | - |  |
| sm | `screen ≥ 576px`, could be a `span` value or an object containing above props | number \| object | - |  |
| md | `screen ≥ 768px`, could be a `span` value or an object containing above props | number \| object | - |  |
| lg | `screen ≥ 992px`, could be a `span` value or an object containing above props | number \| object | - |  |
| xl | `screen ≥ 1200px`, could be a `span` value or an object containing above props | number \| object | - |  |
| xxl | `screen ≥ 1600px`, could be a `span` value or an object containing above props | number \| object | - |  |

You can modify the breakpoints values using by modifying `screen[XS|SM|MD|LG|XL|XXL]` with [theme customization](/docs/react/customize-theme) (since 5.1.0, [sandbox demo](https://codesandbox.io/s/antd-reproduction-template-forked-dlq3r9?file=/index.js)).

The breakpoints of responsive grid follow [BootStrap 4 media queries rules](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints) (not including `occasionally part`).

## Design Token

<ComponentTokenTable component="Grid"></ComponentTokenTable>


============================================================
 COMPONENT: LAYOUT
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/layout/index.en-US.md
============================================================

## Specification

### Size

The first level navigation is left aligned near a logo, and the secondary menu is right aligned.

- Top Navigation: the height of the first level navigation is `64px`, and the second level navigation is `48px`.
- Top Navigation (for landing pages): the height of the first level navigation is `80px`, and the second level navigation is `56px`.
- Calculation formula of a top navigation: `48+8n`.
- Calculation formula of an aside navigation: `200+8n`.

### Interaction rules

- The first level navigation and the last level navigation should be distinguishable by visualization;
- The current item should have the highest priority of visualization;
- When the current navigation item is collapsed, the style of the current navigation item is applied to its parent level;
- The left side navigation bar has support for both the accordion and expanding styles; you can choose the one that fits your case the best.

## Visualization rules

Style of a navigation should conform to its level.

- **Emphasis by colorblock**

  When the background color is a deep color, you can use this pattern for the parent level navigation item of the current page.

- **The highlight match stick**

  When the background color is a light color, you can use this pattern for the current page navigation item; we recommend using it for the last item of the navigation path.

- **Highlighted font**

  From the visualization aspect, a highlighted font is stronger than colorblock; this pattern is often used for the parent level of the current item.

- **Enlarge the size of the font**

  `12px`, `14px` is a standard font size of navigation's, `14px` is used for the first and the second level of the navigation. You can choose an appropriate font size regarding the level of your navigation.

## Component Overview

- `Layout`: The layout wrapper, in which `Header` `Sider` `Content` `Footer` or `Layout` itself can be nested, and can be placed in any parent container.
- `Header`: The top layout with the default style, in which any element can be nested, and must be placed in `Layout`.
- `Sider`: The sidebar with default style and basic functions, in which any element can be nested, and must be placed in `Layout`.
- `Content`: The content layout with the default style, in which any element can be nested, and must be placed in `Layout`.
- `Footer`: The bottom layout with the default style, in which any element can be nested, and must be placed in `Layout`.

> Based on `flex layout`, please pay attention to the [compatibility](http://caniuse.com/#search=flex).

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Structure</code>
<code src="./demo/top.tsx" compact background="grey">Header-Content-Footer</code>
<code src="./demo/top-side.tsx" compact background="grey">Header-Sider</code>
<code src="./demo/top-side-2.tsx" compact background="grey">Header Sider 2</code>
<code src="./demo/side.tsx" iframe="360">Sider</code>
<code src="./demo/custom-trigger.tsx" compact background="grey">Custom trigger</code>
<code src="./demo/responsive.tsx" compact background="grey">Responsive</code>
<code src="./demo/fixed.tsx" iframe="360">Fixed Header</code>
<code src="./demo/fixed-sider.tsx" iframe="360">Fixed Sider</code>
<code src="./demo/custom-trigger-debug.tsx" compact background="grey" debug>Custom trigger debug</code>
<code src="./demo/component-token.tsx" compact background="grey" debug>Component Token</code>

## API

```jsx
<Layout>
  <Header>header</Header>
  <Layout>
    <Sider>left sidebar</Sider>
    <Content>main content</Content>
    <Sider>right sidebar</Sider>
  </Layout>
  <Footer>footer</Footer>
</Layout>
```

### Layout

Common props ref：[Common props](/docs/react/common-props)

The wrapper.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | Container className | string | - |
| hasSider | Whether contain Sider in children, don't have to assign it normally. Useful in ssr avoid style flickering | boolean | - |
| style | To customize the styles | CSSProperties | - |

### Layout.Sider

The sidebar.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| breakpoint | [Breakpoints](/components/grid/#col) of the responsive layout | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `xxl` | - |
| className | Container className | string | - |
| collapsed | To set the current status | boolean | - |
| collapsedWidth | Width of the collapsed sidebar, by setting to 0 a special trigger will appear | number | 80 |
| collapsible | Whether can be collapsed | boolean | false |
| defaultCollapsed | To set the initial status | boolean | false |
| reverseArrow | Reverse direction of arrow, for a sider that expands from the right | boolean | false |
| style | To customize the styles | CSSProperties | - |
| theme | Color theme of the sidebar | `light` \| `dark` | `dark` |
| trigger | Specify the customized trigger, set to null to hide the trigger | ReactNode | - |
| width | Width of the sidebar | number \| string | 200 |
| zeroWidthTriggerStyle | To customize the styles of the special trigger that appears when `collapsedWidth` is 0 | object | - |
| onBreakpoint | The callback function, executed when [breakpoints](/components/grid/#api) changed | (broken) => {} | - |
| onCollapse | The callback function, executed by clicking the trigger or activating the responsive layout | (collapsed, type) => {} | - |

#### breakpoint width

```js
{
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}
```

## Design Token

<ComponentTokenTable component="Layout"></ComponentTokenTable>


============================================================
 COMPONENT: SPACE
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/space/index.en-US.md
============================================================

## When To Use

- Avoid components clinging together and set a unified space.
- Use Space.Compact when child form components are compactly connected and the border is collapsed (After version `antd@4.24.0` Supported).

### Difference with Flex component

- Space is used to set the spacing between inline elements. It will add a wrapper element for each child element for inline alignment. Suitable for equidistant arrangement of multiple child elements in rows and columns.
- Flex is used to set the layout of block-level elements. It does not add a wrapper element. Suitable for layout of child elements in vertical or horizontal direction, and provides more flexibility and control.

## Examples

<!-- prettier-ignore -->
<code src="./demo/base.tsx">Basic Usage</code>
<code src="./demo/vertical.tsx">Vertical Space</code>
<code src="./demo/size.tsx">Space Size</code>
<code src="./demo/align.tsx">Align</code>
<code src="./demo/wrap.tsx">Wrap</code>
<code src="./demo/separator.tsx">separator</code>
<code src="./demo/compact.tsx">Compact Mode for form component</code>
<code src="./demo/compact-buttons.tsx">Button Compact Mode</code>
<code src="./demo/compact-button-vertical.tsx">Vertical Compact Mode</code>
<code src="./demo/compact-debug.tsx" debug>Input addon debug</code>
<code src="./demo/compact-nested.tsx" debug>Nested Space Compact</code>
<code src="./demo/debug.tsx" debug>Diverse Child</code>
<code src="./demo/gap-in-line.tsx" debug>Flex gap style</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | Align items | `start` \| `end` \|`center` \|`baseline` | - | 4.2.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props: SpaceProps })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| ~~direction~~ | The space direction | `vertical` \| `horizontal` | `horizontal` | 4.1.0 |
| orientation | The space direction | `vertical` \| `horizontal` | `horizontal` |  |
| size | The space size | [Size](#size) \| [Size\[\]](#size) | `small` | 4.1.0 \| Array: 4.9.0 |
| ~~split~~ | Set split, please use `separator` instead | ReactNode | - | 4.7.0 |
| separator | Set separator | ReactNode | - | - |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props: SpaceProps })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| vertical | Orientation, Simultaneously configure with `orientation` and prioritize `orientation` | boolean | false | - |
| wrap | Auto wrap line, when `horizontal` effective | boolean | false | 4.9.0 |

### Size

`'small' | 'middle' | 'large' | number`

### Space.Compact

Use Space.Compact when child form components are compactly connected and the border is collapsed. The supported components are：

- Button
- AutoComplete
- Cascader
- DatePicker
- Input/Input.Search
- InputNumber
- Select
- TimePicker
- TreeSelect

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| block | Option to fit width to its parent\'s width | boolean | false | 4.24.0 |
| ~~direction~~ | Set direction of layout | `vertical` \| `horizontal` | `horizontal` | 4.24.0 |
| orientation | Set direction of layout | `vertical` \| `horizontal` | `horizontal` |  |
| vertical | Orientation, Simultaneously configure with `orientation` and prioritize `orientation` | boolean | false | - |
| size | Set child component size | `large` \| `middle` \| `small` | `middle` | 4.24.0 |

### Space.Addon

> This component is available since `antd@5.29.0`.

Used to create custom cells in compact layouts.

| Property | Description    | Type      | Default | Version |
| -------- | -------------- | --------- | ------- | ------- |
| children | Custom content | ReactNode | -       | 5.29.0  |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Space"></ComponentTokenTable>


============================================================
 COMPONENT: TYPOGRAPHY
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/typography/index.en-US.md
============================================================

## When To Use

- When you need to display a title or paragraph contents in Articles/Blogs/Notes.
- When you need copyable/editable/ellipsis texts.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/title.tsx">Title Component</code>
<code src="./demo/paragraph-debug.tsx" debug>Title and Paragraph</code>
<code src="./demo/text.tsx">Text and Link Component</code>
<code src="./demo/editable.tsx">Editable</code>
<code src="./demo/copyable.tsx">Copyable</code>
<code src="./demo/ellipsis.tsx">Ellipsis</code>
<code src="./demo/ellipsis-controlled.tsx" version="5.16.0">Controlled ellipsis expand/collapse</code>
<code src="./demo/ellipsis-middle.tsx">Ellipsis from middle</code>
<code src="./demo/ellipsis-debug.tsx" debug>Ellipsis Debug</code>
<code src="./demo/suffix.tsx">suffix</code>
<code src="./demo/componentToken-debug.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Typography.Text

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Whether to be copyable, customize it via setting an object | boolean \| [copyable](#copyable) | false |  |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | If editable. Can control edit state when is object | boolean \| [editable](#editable) | false |  |
| ellipsis | Display ellipsis when text overflows, can't configure expandable, rows and onExpand by using object. Diff with Typography.Paragraph, Text do not have 100% width style which means it will fix width on the first ellipsis. If you want to have responsive ellipsis, please set width manually | boolean \| [Omit<ellipsis, 'expandable' \| 'rows' \| 'onExpand'>](#ellipsis) | false |  |
| keyboard | Keyboard style | boolean | false | 4.3.0 |
| mark | Marked style | boolean | false |  |
| onClick | Set the handler to handle click event | (event) => void | - |  |
| strong | Bold style | boolean | false |  |
| italic | Italic style | boolean | false | 4.16.0 |
| type | Content type | `secondary` \| `success` \| `warning` \| `danger` | - | success: 4.6.0 |
| underline | Underlined style | boolean | false |  |

### Typography.Title

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Whether to be copyable, customize it via setting an object | boolean \| [copyable](#copyable) | false |  |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | If editable. Can control edit state when is object | boolean \| [editable](#editable) | false |  |
| ellipsis | Display ellipsis when text overflows, can configure rows and expandable by using object | boolean \| [ellipsis](#ellipsis) | false |  |
| level | Set content importance. Match with `h1`, `h2`, `h3`, `h4`, `h5` | number: 1, 2, 3, 4, 5 | 1 | 5: 4.6.0 |
| mark | Marked style | boolean | false |  |
| onClick | Set the handler to handle click event | (event) => void | - |  |
| italic | Italic style | boolean | false | 4.16.0 |
| type | Content type | `secondary` \| `success` \| `warning` \| `danger` | - | success: 4.6.0 |
| underline | Underlined style | boolean | false |  |

### Typography.Paragraph

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Whether to be copyable, customize it via setting an object | boolean \| [copyable](#copyable) | false |  |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | If editable. Can control edit state when is object | boolean \| [editable](#editable) | false |  |
| ellipsis | Display ellipsis when text overflows, can configure rows and expandable by using object | boolean \| [ellipsis](#ellipsis) | false |  |
| mark | Marked style | boolean | false |  |
| onClick | Set the handler to handle click event | (event) => void | - |  |
| strong | Bold style | boolean | false |  |
| italic | Italic style | boolean | false | 4.16.0 |
| type | Content type | `secondary` \| `success` \| `warning` \| `danger` | - | success: 4.6.0 |
| underline | Underlined style | boolean | false |  |

### copyable

    {
      text: string | (() => string | Promise<string>),
      onCopy: function(event),
      icon: ReactNode,
      tooltips: false | [ReactNode, ReactNode],
      format: 'text/plain' | 'text/html',
      tabIndex: number,
    }

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| format | The Mime Type of the text | 'text/plain' \| 'text/html' | - | 4.21.0 |
| icon | Custom copy icon: \[copyIcon, copiedIcon] | \[ReactNode, ReactNode] | - | 4.6.0 |
| text | The text to copy | string | - |  |
| tooltips | Custom tooltip text, hide when it is false | \[ReactNode, ReactNode] | \[`Copy`, `Copied`] | 4.4.0 |
| onCopy | Called when copied text | function | - |  |
| tabIndex | Set tabIndex of the copy button | number | 0 | 5.17.0 |

### editable

    {
      icon: ReactNode,
      tooltip: ReactNode,
      editing: boolean,
      maxLength: number,
      autoSize: boolean | { minRows: number, maxRows: number },
      text: string,
      onChange: function(string),
      onCancel: function,
      onStart: function,
      onEnd: function,
      triggerType: ('icon' | 'text')[],
      enterIcon: ReactNode,
      tabIndex: number,
    }

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoSize | `autoSize` attribute of textarea | boolean \| { minRows: number, maxRows: number } | - | 4.4.0 |
| editing | Whether to be editable | boolean | false |  |
| icon | Custom editable icon | ReactNode | &lt;EditOutlined /> | 4.6.0 |
| maxLength | `maxLength` attribute of textarea | number | - | 4.4.0 |
| tooltip | Custom tooltip text, hide when it is false | ReactNode | `Edit` | 4.6.0 |
| text | Edit text, specify the editing content instead of using the children implicitly | string | - | 4.24.0 |
| onChange | Called when input at textarea | function(value: string) | - |  |
| onCancel | Called when type ESC to exit editable state | function | - |  |
| onStart | Called when enter editable state | function | - |  |
| onEnd | Called when type ENTER to exit editable state | function | - | 4.14.0 |
| triggerType | Edit mode trigger - icon, text or both (not specifying icon as trigger hides it) | Array&lt;`icon`\|`text`> | \[`icon`] |  |
| enterIcon | Custom "enter" icon in the edit field (passing `null` removes the icon) | ReactNode | `<EnterOutlined />` | 4.17.0 |
| tabIndex | Set tabIndex of the edit button | number | 0 | 5.17.0 |

### ellipsis

```tsx
interface EllipsisConfig {
  rows: number;
  /** `collapsible` added in `5.16.0` */
  expandable: boolean | 'collapsible';
  suffix: string;
  /** render function added in `5.16.0` */
  symbol: ReactNode | ((expanded: boolean) => ReactNode);
  tooltip: ReactNode | TooltipProps;
  /** added in `5.16.0` */
  defaultExpanded: boolean;
  /** added in `5.16.0` */
  expanded: boolean;
  /** `info` added in `5.16.0` */
  onExpand: (event: MouseEvent, info: { expanded: boolean }) => void;
  onEllipsis: (ellipsis: boolean) => void;
}
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| expandable | Whether to be expandable | boolean \| 'collapsible' | - | `collapsible`: 5.16.0 |
| rows | Max rows of content | number | - |  |
| suffix | Suffix of ellipsis content | string | - |  |
| symbol | Custom description of ellipsis | ReactNode \| ((expanded: boolean) => ReactNode) | `Expand` `Collapse` |  |
| tooltip | Show tooltip when ellipsis | ReactNode \| [TooltipProps](/components/tooltip/#api) | - | 4.11.0 |
| defaultExpanded | Default expand or collapse | boolean |  | 5.16.0 |
| expanded | Expand or Collapse | boolean |  | 5.16.0 |
| onEllipsis | Called when enter or leave ellipsis state | function(ellipsis) | - | 4.2.0 |
| onExpand | Called when expand content | function(event, { expanded: boolean }) | - | `info`: 5.16.0 |

## Design Token

<ComponentTokenTable component="Typography"></ComponentTokenTable>


============================================================
 COMPONENT: BUTTON
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/button/index.en-US.md
============================================================

## When To Use

A button means an operation (or a series of operations). Clicking a button will trigger its corresponding business logic.

In Ant Design we provide 5 types of button.

- 🔵 Primary button: used for the main action, there can be at most one primary button in a section.
- ⚪️ Default button: used for a series of actions without priority.
- 😶 Dashed button: commonly used for adding more actions.
- 🔤 Text button: used for the most secondary action.
- 🔗 Link button: used for external links.

And 4 other properties additionally.

- 🔴 `danger`: used for actions of risk, like deletion or authorization.
- 👻 `ghost`: used in situations with complex background, home pages usually.
- 🚫 `disabled`: used when actions are not available.
- 🔃 `loading`: adds a loading spinner in button, avoids multiple submits too.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Syntactic sugar</code>
<code src="./demo/color-variant.tsx" version="5.21.0">Color & Variant</code>
<code src="./demo/debug-color-variant" debug>Debug Color & Variant</code>
<code src="./demo/icon.tsx">Icon</code>
<code src="./demo/icon-placement.tsx" version="5.17.0">Icon Placement</code>
<code src="./demo/debug-icon.tsx" debug>Debug Icon</code>
<code src="./demo/debug-block.tsx" debug>Debug Block</code>
<code src="./demo/size.tsx">Size</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/loading.tsx">Loading</code>
<code src="./demo/multiple.tsx">Multiple Buttons</code>
<code src="./demo/ghost.tsx">Ghost Button</code>
<code src="./demo/danger.tsx">Danger Buttons</code>
<code src="./demo/block.tsx">Block Button</code>
<code src="./demo/legacy-group.tsx" debug>Deprecated Button Group</code>
<code src="./demo/chinese-chars-loading.tsx" debug>Loading style bug</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/linear-gradient.tsx">Gradient Button</code>
<code src="./demo/wave.tsx">Custom Wave</code>
<code src="./demo/custom-disabled-bg.tsx">Custom disabled backgroundColor</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>

## API

Common props ref：[Common props](/docs/react/common-props)

Different button styles generated by setting Button properties. The recommended order is: `type` -> `shape` -> `size` -> `loading` -> `disabled`.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoInsertSpace | We add a space between two Chinese characters by default, which removed by setting `autoInsertSpace` to `false`. | boolean | `true` | 5.17.0 |
| block | Option to fit button width to its parent width | boolean | false |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| color | Set button color | `default` \| `primary` \| `danger` \| [PresetColors](#presetcolors) | - | `default`, `primary` and `danger`: 5.21.0, `PresetColors`: 5.23.0 |
| danger | Syntactic sugar. Set the danger status of button. will follow `color` if provided | boolean | false |  |
| disabled | Disabled state of button | boolean | false |  |
| ghost | Make background transparent and invert text and border colors | boolean | false |  |
| href | Redirect url of link button | string | - |  |
| htmlType | Set the original html `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#type) | `submit` \| `reset` \| `button` | `button` |  |
| icon | Set the icon component of button | ReactNode | - |  |
| ~~iconPosition~~ | Set the icon position of button, please use `iconPlacement` instead | `start` \| `end` | `start` | 5.17.0 |
| iconPlacement | Set the icon position of button | `start` \| `end` | `start` | - |
| loading | Set the loading status of button | boolean \| { delay: number, icon: ReactNode } | false | icon: 5.23.0 |
| shape | Can be used to set button shape | `default` \| `circle` \| `round` | `default` |  |
| size | Set the size of button | `large` \| `middle` \| `small` | `middle` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| target | Same as target attribute of a, works when href is specified | string | - |  |
| type | Syntactic sugar. Set button type. Will follow `variant` & `color` if provided | `primary` \| `dashed` \| `link` \| `text` \| `default` | `default` |  |
| onClick | Set the handler to handle `click` event | (event: React.MouseEvent<HTMLElement, MouseEvent>) => void | - |  |
| variant | Set button variant | `outlined` \| `dashed` \| `solid` \| `filled` \| `text` \| `link` | - | 5.21.0 |

It accepts all props which native buttons support.

### PresetColors

> type PresetColors = 'blue' | 'purple' | 'cyan' | 'green' | 'magenta' | 'pink' | 'red' | 'orange' | 'yellow' | 'volcano' | 'geekblue' | 'lime' | 'gold';

## Semantic DOM

<!-- prettier-ignore -->
<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Button"></ComponentTokenTable>

## FAQ

### How to choose type and color & variant? {#faq-type-color-variant}

Type is essentially syntactic sugar for colors and variants. It internally provides a set of mapping relationships between colors and variants for the type. If both exist at the same time, the colors and variants will be used first.

```jsx
<Button type="primary">click</Button>
```

Equivalent

```jsx
<Button color="primary" variant="solid">
  click
</Button>
```

### How to close the click wave effect? {#faq-close-wave-effect}

If you don't need this feature, you can set `disabled` of `wave` in [ConfigProvider](/components/config-provider#api) as `true`.

```jsx
<ConfigProvider wave={{ disabled: true }}>
  <Button>click</Button>
</ConfigProvider>
```

<style>
.site-button-ghost-wrapper {
  padding: 16px;
  background: rgb(190, 200, 200);
}
</style>


============================================================
 COMPONENT: ICON
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/icon/index.en-US.md
============================================================

## How to use

Before using icons, you need to install the [@ant-design/icons](https://github.com/ant-design/ant-design-icons) package:

<InstallDependencies npm='npm install @ant-design/icons@6.x --save' yarn='yarn add @ant-design/icons@6.x' pnpm='pnpm install @ant-design/icons@6.x --save' bun='bun add @ant-design/icons@6.x'></InstallDependencies>

<!-- prettier-ignore -->
:::info{title=Tips}
Remember to use `@ant-design/icons@6.x` with `antd@6.x`, see: [#53275](https://github.com/ant-design/ant-design/issues/53275#issuecomment-2747448317)
:::

## List of icons

<IconSearch></IconSearch>

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/two-tone.tsx">Two-tone icon and colorful icon</code>
<code src="./demo/custom.tsx">Custom Icon</code>
<code src="./demo/iconfont.tsx">Use iconfont.cn</code>
<code src="./demo/scriptUrl.tsx">Multiple resources from iconfont.cn</code>

## API

### Common Icon

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| className | The className of Icon | string | - |  |
| rotate | Rotate by n degrees (not working in IE9) | number | - |  |
| spin | Rotate icon with animation | boolean | false |  |
| style | The style properties of icon, like `fontSize` and `color` | CSSProperties | - |  |
| twoToneColor | Only supports the two-tone icon. Specify the primary color | string (hex color) | - |  |

We still have three different themes for icons, icon component name is the icon name suffixed by the theme name.

```jsx

<StarOutlined />
<StarFilled />
<StarTwoTone twoToneColor="#eb2f96" />
```

### Custom Icon

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| component | The component used for the root node | ComponentType&lt;CustomIconComponentProps> | - |  |
| rotate | Rotate degrees (not working in IE9) | number | - |  |
| spin | Rotate icon with animation | boolean | false |  |
| style | The style properties of icon, like `fontSize` and `color` | CSSProperties | - |  |

### About SVG icons

We introduced SVG icons in version `3.9.0`, replacing font icons. This has the following benefits:

- Complete offline usage of icons, without dependency on a CDN-hosted font icon file (No more empty square during downloading and no need to deploy icon font files locally either!)
- Much more display accuracy on lower-resolution screens
- The ability to choose icon color
- No need to change built-in icons with overriding styles by providing more props in component

More discussion of SVG icon reference at [#10353](https://github.com/ant-design/ant-design/issues/10353).

> ⚠️ Given the extra bundle size caused by all SVG icons imported in 3.9.0, we will provide a new API to allow developers to import icons as needed, you can track [#12011](https://github.com/ant-design/ant-design/issues/12011) for updates.
>
> While you wait, you can use [webpack plugin](https://github.com/Beven91/webpack-ant-icon-loader) from the community to chunk the icon file.

The properties `theme`, `component` and `twoToneColor` were added in `3.9.0`. The best practice is to pass the property `theme` to every `<Icon />` component.

```jsx

<MessageOutlined style={{ fontSize: '16px', color: '#08c' }} />;
```

All the icons will render to `<svg>`. You can still set `style` and `className` for size and color of icons.

```jsx
<Icon type="message" style={{ fontSize: '16px', color: '#08c' }} theme="outlined" />
```

### Set TwoTone Color

When using the two-tone icons, you can use the static methods `getTwoToneColor()` and `setTwoToneColor(colorString)` to specify the primary color.

```jsx

setTwoToneColor('#eb2f96');
getTwoToneColor(); // #eb2f96
```

### Custom Font Icon

We added a `createFromIconfontCN` function to help developer use their own icons deployed at [iconfont.cn](http://iconfont.cn/) in a convenient way.

> This method is specified for [iconfont.cn](http://iconfont.cn/).

```jsx

const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // generate in iconfont.cn
});

ReactDOM.createRoot(mountNode).render(<MyIcon type="icon-example" />);
```

It creates a component that uses SVG sprites in essence.

The following options are available:

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| extraCommonProps | Define extra properties to the component | { \[key: string]: any } | {} |  |
| scriptUrl | The URL generated by [iconfont.cn](http://iconfont.cn/) project. Support `string[]` after `@ant-design/icons@4.1.0` | string \| string\[] | - |  |

The property `scriptUrl` should be set to import the SVG sprite symbols.

See [iconfont.cn documents](http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.15&helptype=code) to learn about how to generate `scriptUrl`.

### Custom SVG Icon

You can import SVG icon as a react component by using `webpack` and [`@svgr/webpack`](https://www.npmjs.com/package/@svgr/webpack). `@svgr/webpack`'s `options` [reference](https://github.com/smooth-code/svgr#options).

```js
// webpack.config.js
module.exports = {
  // ... other config
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'babel-loader',
    },
    {
      loader: '@svgr/webpack',
      options: {
        babel: false,
        icon: true,
      },
    },
  ],
};
```

You can import SVG icon as a react component by using `vite` and [`vite-plugin-svgr`](https://www.npmjs.com/package/vite-plugin-svgr). `@svgr/webpack`'s `options` [reference](https://github.com/smooth-code/svgr#options).

```js
// vite.config.js
export default defineConfig(() => ({
  // ... other config
  plugins: [svgr({ svgrOptions: { icon: true } })],
}));
```

```jsx

 // path to your '*.svg' file.

//  // use vite path to your '*.svg?react' file.

// in create-react-app:
// 

ReactDOM.createRoot(mountNode).render(<Icon component={MessageSvg} />);
```

The following properties are available for the component:

| Property | Description | Type | Readonly | Version |
| --- | --- | --- | --- | --- |
| className | The computed class name of the `svg` element | string | - |  |
| fill | Define the color used to paint the `svg` element | string | `currentColor` |  |
| height | The height of the `svg` element | string \| number | `1em` |  |
| style | The computed style of the `svg` element | CSSProperties | - |  |
| width | The width of the `svg` element | string \| number | `1em` |  |

## Design Token

<ComponentTokenTable component="Icon"></ComponentTokenTable>

## FAQ

### Why does icon style sometimes cause global style error? {#faq-icon-bad-style}

Related issue: [#54391](https://github.com/ant-design/ant-design/issues/54391)

When enable `layer`, icon style may deprioritize `@layer antd` and cause all components to be styled abnormally.

This problem can be resolved by two steps below:

1. use `@ant-design/icons@6.x` with `antd@6.x`.
2. stop to use static methods of `message`, `Modal` and `notification`. use hooks version or `App` provided instance.

If you must use static methods, you can put any of icon components just under `App`, what helps to avoid style impact caused by static methods.

```diff
<StyleProvider layer>
  <ConfigProvider>
    <App>
+     {/* any icon */}
+     <RightOutlined />
      {/* your pages */}
    </App>
  </ConfigProvider>
</StyleProvider>
```


============================================================
 COMPONENT: CONFIG-PROVIDER
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/config-provider/index.en-US.md
============================================================

## Usage

This component provides a configuration to all React components underneath itself via the [context API](https://react.dev/learn/passing-data-deeply-with-context). In the render tree all components will have access to the provided config.

```tsx

// ...
const Demo: React.FC = () => (
  <ConfigProvider direction="rtl">
    <App />
  </ConfigProvider>
);

export default Demo;
```

### Content Security Policy {#csp}

Some components use dynamic style to support wave effect. You can config `csp` prop if Content Security Policy (CSP) is enabled:

```tsx
<ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
  <Button>My Button</Button>
</ConfigProvider>
```

## Examples

<!-- prettier-ignore -->
<code src="./demo/locale.tsx">Locale</code>
<code src="./demo/direction.tsx">Direction</code>
<code src="./demo/size.tsx">Component size</code>
<code src="./demo/theme.tsx">Theme</code>
<code src="./demo/wave.tsx">Custom Wave</code>
<code src="./demo/holderRender.tsx">Static function</code>
<code src="./demo/prefixCls.tsx" debug>prefixCls</code>
<code src="./demo/useConfig.tsx" debug>useConfig</code>
<code src="./demo/warning.tsx" debug>warning</code>

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| componentDisabled | Config antd component `disabled` | boolean | - | 4.21.0 |
| componentSize | Config antd component size | `small` \| `middle` \| `large` | - |  |
| csp | Set [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) config | { nonce: string } | - |  |
| direction | Set direction of layout. See [demo](#config-provider-demo-direction) | `ltr` \| `rtl` | `ltr` |  |
| getPopupContainer | To set the container of the popup element. The default is to create a `div` element in `body` | `(trigger?: HTMLElement) => HTMLElement \| ShadowRoot` | () => document.body |  |
| getTargetContainer | Config Affix, Anchor scroll target container | `() => HTMLElement \| Window \| ShadowRoot` | () => window | 4.2.0 |
| iconPrefixCls | Set icon prefix className | string | `anticon` | 4.11.0 |
| locale | Language package setting, you can find the packages in [antd/locale](http://unpkg.com/antd/locale/) | object | - |  |
| popupMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Default set `min-width` same as input. Will ignore when value less than select width. `false` will disable virtual scroll | boolean \| number | - | 5.5.0 |
| popupOverflow | Select like component popup logic. Can set to show in viewport or follow window scroll | 'viewport' \| 'scroll' <InlinePopover previewURL="https://user-images.githubusercontent.com/5378891/230344474-5b9f7e09-0a5d-49e8-bae8-7d2abed6c837.png"></InlinePopover> | 'viewport' | 5.5.0 |
| prefixCls | Set prefix className | string | `ant` |  |
| renderEmpty | Set empty content of components. Ref [Empty](/components/empty/) | function(componentName: string): ReactNode | - |  |
| theme | Set theme, ref [Customize Theme](/docs/react/customize-theme) | [Theme](/docs/react/customize-theme#theme) | - | 5.0.0 |
| variant | Set variant of data entry components | `outlined` \| `filled` \| `borderless` | - | 5.19.0 |
| virtual | Disable virtual scroll when set to `false` | boolean | - | 4.3.0 |
| warning | Config warning level, when `strict` is `false`, it will aggregate deprecated information into a single message | { strict: boolean } | - | 5.10.0 |

### ConfigProvider.config() {#config}

Setting `Modal`, `Message`, `Notification` static config. Not work on hooks.

```tsx
ConfigProvider.config({
  // 5.13.0+
  holderRender: (children) => (
    <ConfigProvider
      prefixCls="ant"
      iconPrefixCls="anticon"
      theme={{ token: { colorPrimary: 'red' } }}
    >
      {children}
    </ConfigProvider>
  ),
});
```

### ConfigProvider.useConfig() <Badge>5.3.0+</Badge> {#useconfig}

Get the value of the parent `Provider`, Such as `DisabledContextProvider`, `SizeContextProvider`.

```jsx
const {
  componentDisabled, // 5.3.0+
  componentSize, // 5.3.0+
} = ConfigProvider.useConfig();
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| componentDisabled | antd component disabled state | boolean | - | 5.3.0 |
| componentSize | antd component size state | `small` \| `middle` \| `large` | - | 5.3.0 |

### Component Config

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| affix | Set Affix common props | { className?: string, style?: React.CSSProperties } | - | 6.0.0 |
| alert | Set Alert common props | { className?: string, style?: React.CSSProperties, closeIcon?: React.ReactNode, successIcon?: React.ReactNode, infoIcon?: React.ReactNode, warningIcon?: React.ReactNode, errorIcon?: React.ReactNode } | - | 5.7.0, `closeIcon`: 5.14.0, `successIcon`, `infoIcon`, `warningIcon` and `errorIcon`: 6.2.0 |
| anchor | Set Anchor common props | { className?: string, style?: React.CSSProperties, classNames?: [AnchorStyleConfig\["classNames"\]](/components/anchor#semantic-dom), styles?: [AnchorStyleConfig\["styles"\]](/components/anchor#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| avatar | Set Avatar common props | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| badge | Set Badge common props | { className?: string, style?: React.CSSProperties, classNames?: [BadgeProps\["classNames"\]](/components/badge#semantic-dom), styles?: [BadgeProps\["styles"\]](/components/badge#semantic-dom) } | - | 5.7.0 |
| breadcrumb | Set Breadcrumb common props | { className?: string, style?: React.CSSProperties, classNames?: [BreadcrumbConfig\["classNames"\]](/components/breadcrumb#semantic-dom), styles?: [BreadcrumbConfig\["styles"\]](/components/breadcrumb#semantic-dom), separator?: ReactNode, dropdownIcon?: ReactNode } | - | 5.7.0, `classNames`, `separator` and `styles`: 6.0.0, `dropdownIcon`: 6.2.0 |
| button | Set Button common props | { className?: string, style?: React.CSSProperties, classNames?: [ButtonProps\["classNames"\]](/components/button#semantic-dom), styles?: [ButtonProps\["styles"\]](/components/button#semantic-dom), autoInsertSpace?: boolean, variant?: ButtonVariantType, color?: ButtonColorType, shape?: [ButtonProps\["shape"\]](/components/button#api) } | - | 5.6.0, `autoInsertSpace`: 5.17.0, `variant` and `color`: 5.25.0, `shape`: 5.27.0 |
| card | Set Card common props | { className?: string, style?: React.CSSProperties, classNames?: [CardProps\["classNames"\]](/components/card#semantic-dom), styles?: [CardProps\["styles"\]](/components/card#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 5.14.0 |
| cardMeta | Set Card.Meta common props | { className?: string, style?: React.CSSProperties, classNames?: [CardMetaProps\["classNames"\]](/components/card#semantic-dom), styles?: [CardMetaProps\["styles"\]](/components/card#semantic-dom) } | - | 6.0.0 |
| calendar | Set Calendar common props | { className?: string, style?: React.CSSProperties, classNames?: [CalendarConfig\["classNames"\]](/components/calendar#semantic-dom), styles?: [CalendarConfig\["styles"\]](/components/calendar#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| carousel | Set Carousel common props | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| cascader | Set Cascader common props | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| checkbox | Set Checkbox common props | { className?: string, style?: React.CSSProperties, classNames?: [CheckboxConfig\["classNames"\]](/components/checkbox#semantic-dom), styles?: [CheckboxConfig\["styles"\]](/components/checkbox#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| collapse | Set Collapse common props | { className?: string, style?: React.CSSProperties, expandIcon?: (props) => ReactNode, classNames?: [CollapseProps\["classNames"\]](/components/collapse#semantic-dom), styles?: [CollapseProps\["styles"\]](/components/collapse#semantic-dom) } | - | 5.7.0, `expandIcon`: 5.15.0, `classNames` and `styles`: 6.0.0 |
| colorPicker | Set ColorPicker common props | { className?: string, style?: React.CSSProperties, classNames?: [ColorPickerConfig\["classNames"\]](/components/color-picker#semantic-dom), styles?: [ColorPickerConfig\["styles"\]](/components/color-picker#semantic-dom) } | - | 5.7.0 |
| datePicker | Set datePicker common props | { className?: string, style?: React.CSSProperties, classNames?: [DatePickerConfig\["classNames"\]](/components/date-picker#semantic-dom), styles?: [DatePickerConfig\["styles"\]](/components/date-picker#semantic-dom) } | - | 5.7.0 |
| rangePicker | Set rangePicker common props | { className?: string, style?: React.CSSProperties } | - | 5.11.0 |
| descriptions | Set Descriptions common props | { className?: string, style?: React.CSSProperties, classNames?: [DescriptionsProps\["classNames"\]](/components/descriptions#semantic-dom), styles?: [DescriptionsProps\["styles"\]](/components/descriptions#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 5.23.0 |
| divider | Set Divider common props | { className?: string, style?: React.CSSProperties, classNames?: [DividerProps\["classNames"\]](/components/divider#semantic-dom), styles?: [DividerProps\["styles"\]](/components/divider#semantic-dom) } | - |  |
| drawer | Set Drawer common props | { className?: string, style?: React.CSSProperties, classNames?: [DrawerProps\["classNames"\]](/components/drawer#semantic-dom), styles?: [DrawerProps\["styles"\]](/components/drawer#semantic-dom), closeIcon?: ReactNode, closable?: [DrawerProps\["closable"\]](/components/drawer-cn#api) } | - | 5.7.0, `classNames` and `styles`: 5.10.0, `closeIcon`: 5.14.0 |
| dropdown | Set Dropdown common props | { className?: string, style?: React.CSSProperties, classNames?: [DropdownConfig\["classNames"\]](/components/dropdown#semantic-dom), styles?: [DropdownConfig\["styles"\]](/components/dropdown#semantic-dom) } | - |  |
| empty | Set Empty common props | { className?: string, style?: React.CSSProperties, classNames?: [EmptyProps\["classNames"\]](/components/empty#api), styles?: [EmptyProps\["styles"\]](/components/empty#api), image?: ReactNode } | - | 5.7.0, `classNames` and `styles`: 5.23.0, `image`: 5.27.0 |
| flex | Set Flex common props | { className?: string, style?: React.CSSProperties, vertical?: boolean } | - | 5.10.0 |
| floatButton | Set FloatButton common props | { className?: string, style?: React.CSSProperties, classNames?: [FloatButtonProps\["classNames"\]](/components/float-button#semantic-dom), styles?: [FloatButtonProps\["styles"\]](/components/float-button#semantic-dom), backTopIcon?: React.ReactNode } | - |  |
| floatButtonGroup | Set FloatButton.Group common props | { closeIcon?: React.ReactNode, className?: string, style?: React.CSSProperties, classNames?: [FloatButtonProps\["classNames"\]](/components/float-button#semantic-dom), styles?: [FloatButtonProps\["styles"\]](/components/float-button#semantic-dom) } | - |  |
| form | Set Form common props | { className?: string, style?: React.CSSProperties, validateMessages?: [ValidateMessages](/components/form/#validatemessages), requiredMark?: boolean \| `optional`, scrollToFirstError?: boolean \| [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options), classNames?:[FormConfig\["classNames"\]](/components/form#semantic-dom), styles?: [FormConfig\["styles"\]](/components/form#semantic-dom) } | - | `requiredMark`: 4.8.0; `colon`: 4.18.0; `scrollToFirstError`: 5.2.0; `className` and `style`: 5.7.0 |
| image | Set Image common props | { className?: string, style?: React.CSSProperties, preview?: { closeIcon?: React.ReactNode, classNames?:[ImageConfig\["classNames"\]](/components/image#semantic-dom), styles?: [ImageConfig\["styles"\]](/components/image#semantic-dom) }, fallback?: string } | - | 5.7.0, `closeIcon`: 5.14.0, `classNames` and `styles`: 6.0.0 |
| input | Set Input common props | { autoComplete?: string, className?: string, style?: React.CSSProperties, allowClear?: boolean \| { clearIcon?: ReactNode } } | - | 4.2.0, `allowClear`: 5.15.0 |
| inputNumber | Set InputNumber common props | { className?: string, style?: React.CSSProperties, classNames?: [InputNumberConfig\["classNames"\]](/components/input-number#semantic-dom), styles?: [InputNumberConfig\["styles"\]](/components/input-number#semantic-dom) } | - |  |
| otp | Set OTP common props | { className?: string, style?: React.CSSProperties, classNames?: [OTPConfig\["classNames"\]](/components/input#semantic-otp), styles?: [OTPConfig\["styles"\]](/components/input#semantic-otp) } | - |  |
| inputSearch | Set Search common props | { className?: string, style?: React.CSSProperties, classNames?: [InputSearchConfig\["classNames"\]](/components/input#semantic-search), styles?: [InputSearchConfig\["styles"\]](/components/input#semantic-search) } | - |  |
| textArea | Set TextArea common props | { autoComplete?: string, className?: string, style?: React.CSSProperties,classNames?:[TextAreaConfig\["classNames"\]](/components/input#semantic-textarea), styles?: [TextAreaConfig\["styles"\]](/components/input#semantic-textarea), allowClear?: boolean \| { clearIcon?: ReactNode } } | - | 5.15.0 |
| layout | Set Layout common props | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| list | Set List common props | { className?: string, style?: React.CSSProperties, item?:{ classNames: [ListItemProps\["classNames"\]](/components/list#listitem), styles: [ListItemProps\["styles"\]](/components/list#listitem) } } | - | 5.7.0 |
| masonry | Set Masonry common props | { className?: string, style?: React.CSSProperties, classNames?: [MasonryProps\["classNames"\]](/components/masonry#semantic-dom), styles?: [MasonryProps\["styles"\]](/components/masonry#semantic-dom) } | - |  |
| menu | Set Menu common props | { className?: string, style?: React.CSSProperties, expandIcon?: ReactNode \| props => ReactNode } | - | 5.7.0, `expandIcon`: 5.15.0 |
| mentions | Set Mentions common props | { className?: string, style?: React.CSSProperties, classNames?:[MentionsConfig\["classNames"\]](/components/mentions#semantic-dom), styles?: [MentionsConfig\["styles"\]](/components/mentions#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| message | Set Message common props | { className?: string, style?: React.CSSProperties, classNames?: [MessageConfig\["classNames"\]](/components/message#semantic-dom), styles?: [MessageConfig\["styles"\]](/components/message#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| modal | Set Modal common props | { className?: string, style?: React.CSSProperties, classNames?: [ModalProps\["classNames"\]](/components/modal#semantic-dom), styles?: [ModalProps\["styles"\]](/components/modal#semantic-dom), closeIcon?: React.ReactNode } | - | 5.7.0, `classNames` and `styles`: 5.10.0, `closeIcon`: 5.14.0 |
| notification | Set Notification common props | { className?: string, style?: React.CSSProperties, closeIcon?: React.ReactNode, classNames?: [NotificationConfig\["classNames"\]](/components/notification#semantic-dom), styles?: [NotificationConfig\["styles"\]](/components/notification#semantic-dom) } | - | 5.7.0, `closeIcon`: 5.14.0, `classNames` and `styles`: 6.0.0 |
| pagination | Set Pagination common props | { showSizeChanger?: boolean, totalBoundaryShowSizeChanger?: number, className?: string, style?: React.CSSProperties,classNames?:[PaginationConfig\["classNames"\]](/components/pagination#semantic-dom), styles?: [PaginationConfig\["styles"\]](/components/pagination#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| progress | Set Progress common props | { className?: string, style?: React.CSSProperties, classNames?: [ProgressConfig\["classNames"\]](/components/progress#semantic-dom), styles?: [ProgressConfig\["styles"\]](/components/progress#semantic-dom) } | - |  |
| radio | Set Radio common props | { className?: string, style?: React.CSSProperties, classNames?: [RadioConfig\["classNames"\]](/components/radio#semantic-dom), styles?: [RadioConfig\["styles"\]](/components/radio#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| rate | Set Rate common props | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| result | Set Result common props | { className?: string, style?: React.CSSProperties , classNames?: [ResultProps\["classNames"\]](/components/result#semantic-dom), styles?: [ResultProps\["styles"\]](/components/result#semantic-dom)} | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| ribbon | Set Ribbon common props | { className?: string, style?: React.CSSProperties, , classNames?: [RibbonProps\["classNames"\]](/components/badge#semantic-dom), styles?: [RibbonProps\["styles"\]](/components/badge#semantic-dom) } | - | 6.0.0 |
| skeleton | Set Skeleton common props | { className?: string, style?: React.CSSProperties, classNames?: [SkeletonProps\["classNames"\]](/components/skeleton#semantic-dom), styles?: [SkeletonProps\["styles"\]](/components/skeleton#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| segmented | Set Segmented common props | { className?: string, style?: React.CSSProperties, classNames?: [SegmentedProps\["classNames"\]](/components/segmented#semantic-dom), styles?: [SegmentedProps\["styles"\]](/components/segmented#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| select | Set Select common props | { className?: string, showSearch?: boolean, style?: React.CSSProperties, classNames?: [SelectConfig\["classNames"\]](/components/select#semantic-dom), styles?: [SelectConfig\["styles"\]](/components/select#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| slider | Set Slider common props | { className?: string, style?: React.CSSProperties, classNames?: [SliderProps\["classNames"\]](/components/slider#semantic-dom), styles?: [SliderProps\["styles"\]](/components/slider#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 5.23.0 |
| switch | Set Switch common props | { className?: string, style?: React.CSSProperties, classNames?: [SwitchStyleConfig\["classNames"\]](/components/switch#semantic-dom), styles?: [SwitchStyleConfig\["styles"\]](/components/switch#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| space | Set Space common props, ref [Space](/components/space) | { size: `small` \| `middle` \| `large` \| `number`, className?: string, style?: React.CSSProperties, classNames?: [SpaceProps\["classNames"\]](/components/space#semantic-dom), styles?: [SpaceProps\["styles"\]](/components/space#semantic-dom) } | - | 5.6.0 |
| splitter | Set Splitter common props | { className?: string, style?: React.CSSProperties, classNames?:[Splitter\["classNames"\]](/components/splitter#semantic-dom), styles?: [Splitter\["styles"\]](/components/splitter#semantic-dom) } | - | 5.21.0 |
| spin | Set Spin common props | { className?: string, style?: React.CSSProperties, indicator?: React.ReactElement, classNames?:[SpinConfig\["classNames"\]](/components/spin#semantic-dom), styles?: [SpinConfig\["styles"\]](/components/spin#semantic-dom) } | - | 5.7.0, `indicator`: 5.20.0, `classNames` and `styles`: 6.0.0 |
| statistic | Set Statistic common props | { className?: string, style?: React.CSSProperties, classNames?: [StatisticProps\["classNames"\]](/components/statistic#semantic-dom), styles?: [StatisticProps\["styles"\]](/components/statistic#semantic-dom)} | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| steps | Set Steps common props | { className?: string, style?: React.CSSProperties, classNames?:[StepsConfig\["classNames"\]](/components/steps#semantic-dom), styles?: [StepsConfig\["styles"\]](/components/steps#semantic-dom) } | - |  |
| table | Set Table common props | { className?: string, style?: React.CSSProperties, expandable?: { expandIcon?: props => React.ReactNode }, classNames?: [TableProps\["classNames"\]](/components/table#semantic-dom), styles?: [TableProps\["styles"\]](/components/table#semantic-dom) } | - |  |
| tabs | Set Tabs common props | { className?: string, style?: React.CSSProperties, indicator?: { size?: GetIndicatorSize, align?: `start` \| `center` \| `end` }, moreIcon?: ReactNode, addIcon?: ReactNode, removeIcon?: ReactNode, classNames?: [TabsConfig\["classNames"\]](/components/tabs#semantic-dom), styles?: [TabsConfig\["styles"\]](/components/tabs#semantic-dom) } | - | 5.7.0, `moreIcon` and `addIcon`: 5.14.0, `removeIcon`: 5.15.0, `classNames` and `styles`: 6.0.0 |
| tag | Set Tag common props | { className?: string, style?: React.CSSProperties, closeIcon?: React.ReactNode, classNames?: [TagProps\["classNames"\]](/components/tag#semantic-dom), styles?: [TagProps\["styles"\]](/components/tag#semantic-dom) } | - | 5.7.0, `closeIcon`: 5.14.0, `classNames` and `styles`: 6.0.0 |
| timeline | Set Timeline common props | { className?: string, style?: React.CSSProperties, classNames?: [TimelineConfig\["classNames"\]](/components/timeline#semantic-dom), styles?: [TimelineConfig\["styles"\]](/components/timeline#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| timePicker | Set TimePicker common props | { className?: string, style?: React.CSSProperties, classNames?: [TimePickerConfig\["classNames"\]](/components/time-picker#semantic-dom), styles?: [TimePickerConfig\["styles"\]](/components/time-picker#semantic-dom) } | - | 5.7.0 |
| tour | Set Tour common props | { closeIcon?: React.ReactNode, className?: string, style?: React.CSSProperties, classNames?: [TourProps\["classNames"\]](/components/tour#semantic-dom), styles?: [TourProps\["styles"\]](/components/tour#semantic-dom) } | - | 5.14.0, `classNames`、`styles`、`className`、`style`: 6.0.0 |
| tooltip | Set Tooltip common props | { className?: string, style?: React.CSSProperties, classNames?:[Tooltip\["classNames"\]](/components/tooltip#semantic-dom), styles?: [Tooltip\["styles"\]](/components/tooltip#semantic-dom), arrow: boolean \| { pointAtCenter: boolean }, unique?: boolean, trigger?: [Tooltip\["trigger"\]](/components/tooltip#api) } | - |  |
| popover | Set Popover common props | { className?: string, style?: React.CSSProperties, classNames?:[Popover\["classNames"\]](/components/popover#semantic-dom), styles?: [Popover\["styles"\]](/components/popover#semantic-dom), arrow: boolean \| { pointAtCenter: boolean }, trigger?: [Popover\["trigger"\]](/components/popover#api)} | - | 5.23.0, `arrow`: 6.0.0, `trigger`: 6.1.0 |
| popconfirm | Set Popconfirm common props | { className?: string, style?: React.CSSProperties, classNames?:[Popconfirm\["classNames"\]](/components/popconfirm#semantic-dom), styles?: [Popconfirm\["styles"\]](/components/popconfirm#semantic-dom), arrow: boolean \| { pointAtCenter: boolean }, trigger?: [Popconfirm\["trigger"\]](/components/popconfirm#api)} | - | 5.23.0, `arrow`: 6.0.0, `trigger`: 6.1.0 |
| qrcode | Set QRCode common props | { className?: string, style?: React.CSSProperties, classNames?:[QRCode\["classNames"\]](/components/qr-code#semantic-dom), styles?: [QRCode\["styles"\]](/components/qr-code#semantic-dom) } | - |  |
| transfer | Set Transfer common props | { className?: string, style?: React.CSSProperties, classNames?: [TransferConfig\["classNames"\]](/components/transfer#semantic-dom), styles?: [TransferConfig\["styles"\]](/components/transfer#semantic-dom), selectionsIcon?: React.ReactNode } | - |  |
| tree | Set Tree common props | { className?: string, style?: React.CSSProperties, classNames?: [TreeConfig\["classNames"\]](/components/tree#semantic-dom), styles?: [TreeConfig\["styles"\]](/components/tree#semantic-dom) } | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| treeSelect | Set TreeSelect common props | { className?: string, style?: React.CSSProperties, classNames?: [TreeSelectConfig\["classNames"\]](/components/tree-select#semantic-dom), styles?: [TreeSelectConfig\["styles"\]](/components/tree-select#semantic-dom), switcherIcon?: [TreeSelect\["switcherIcon"\]](/components/tree-select#api)} | - |  |
| typography | Set Typography common props | { className?: string, style?: React.CSSProperties } | - | 5.7.0 |
| upload | Set Upload common props | { className?: string, style?: React.CSSProperties, classNames?:[UploadConfig\["classNames"\]](/components/upload#semantic-dom), styles?: [UploadConfig\["styles"\]](/components/upload#semantic-dom), customRequest?: [Upload\["customRequest"\]](/components/upload#api) } | - | 5.7.0, `customRequest`: 5.27.0, `classNames` and `styles`: 6.0.0 |
| wave | Config wave effect | { disabled?: boolean, showEffect?: (node: HTMLElement, info: { className, token, component }) => void } | - | 5.8.0 |

## FAQ

### How to contribute a new language? {#faq-add-locale}

See [&lt;Adding new language&gt;](/docs/react/i18n#adding-newplanguage).

### Date-related components locale is not working? {#faq-locale-not-work}

See FAQ [Date-related-components-locale-is-not-working?](/docs/react/faq#date-related-components-locale-is-not-working)

### Modal throw error when setting `getPopupContainer`? {#faq-get-popup-container}

Related issue: <https://github.com/ant-design/ant-design/issues/19974>

When you config `getPopupContainer` to parentNode globally, Modal will throw error of `triggerNode is undefined` because it did not have a triggerNode. You can try the [fix](https://github.com/afc163/feedback-antd/commit/3e4d1ad1bc1a38460dc3bf3c56517f737fe7d44a) below.

```diff
 <ConfigProvider
-  getPopupContainer={triggerNode => triggerNode.parentNode}
+  getPopupContainer={node => {
+    if (node) {
+      return node.parentNode;
+    }
+    return document.body;
+  }}
 >
   <App />
 </ConfigProvider>
```

### Why can't ConfigProvider props (like `prefixCls` and `theme`) affect ReactNode inside `message.info`, `notification.open`, `Modal.confirm`? {#faq-message-inherit}

antd will dynamic create React instance by `ReactDOM.render` when call message methods. Whose context is different with origin code located context. We recommend `useMessage`, `useNotification` and `useModal` which , the methods came from `message/notification/Modal` has been deprecated in 5.x.

### Locale is not working with Vite in production mode? {#faq-vite-locale-not-work}

Related issue: [#39045](https://github.com/ant-design/ant-design/issues/39045)

In production mode of Vite, default exports from cjs file should be used like this: `enUS.default`. So you can directly import locale from `es/` directory like `import enUS from 'antd/es/locale/en_US'` to make dev and production have the same behavior.

### `prefixCls` priority(The former is covered by the latter) {#faq-prefixcls-priority}

1. `ConfigProvider.config({ prefixCls: 'prefix-1' })`
2. `ConfigProvider.config({ holderRender: (children) => <ConfigProvider prefixCls="prefix-2">{children}</ConfigProvider> })`
3. `message.config({ prefixCls: 'prefix-3' })`


============================================================
 COMPONENT: MENU
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/menu/index.en-US.md
============================================================

## When To Use

Navigation is an important part of any website, as a good navigation setup allows users to move around the site quickly and efficiently. Ant Design offers two navigation options: top and side. Top navigation provides all the categories and functions of the website. Side navigation provides the multi-level structure of the website.

More layouts with navigation: [Layout](/components/layout).

## Notes for developers

- Menu is rendered as a `ul` element, so it only supports [`li` and `script-supporting` elements](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element) as children nodes. Your customized node should be wrapped by `Menu.Item`.
- Menu needs to collect its node structure, so its children should be `Menu.*` or encapsulated HOCs.

## Examples

<!-- prettier-ignore -->
<code src="./demo/horizontal.tsx">Top Navigation</code>
<code src="./demo/horizontal-dark.tsx" debug>Top Navigation (dark)</code>
<code src="./demo/inline.tsx">Inline menu</code>
<code src="./demo/inline-collapsed.tsx">Collapsed inline menu</code>
<code src="./demo/sider-current.tsx">Open current submenu only</code>
<code src="./demo/vertical.tsx">Vertical menu</code>
<code src="./demo/theme.tsx">Menu Themes</code>
<code src="./demo/submenu-theme.tsx">Sub-menu theme</code>
<code src="./demo/switch-mode.tsx">Switch the menu type</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/style-debug.tsx" debug>Style debug</code>
<code src="./demo/menu-v4.tsx" debug>Menu v4</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/extra-style.tsx" debug>Extra Style debug</code>
<code src="./demo/custom-popup-render.tsx">Custom Submenu Render</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Menu

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultOpenKeys | Array with the keys of default opened sub menus | string\[] | - |  |
| defaultSelectedKeys | Array with the keys of default selected menu items | string\[] | - |  |
| expandIcon | custom expand icon of submenu | ReactNode \| `(props: SubMenuProps & { isSubMenu: boolean }) => ReactNode` | - | 4.9.0 |
| forceSubMenuRender | Render submenu into DOM before it becomes visible | boolean | false |  |
| inlineCollapsed | Specifies the collapsed status when menu is inline mode | boolean | - |  |
| inlineIndent | Indent (in pixels) of inline menu items on each level | number | 24 |  |
| items | Menu item content | [ItemType\[\]](#itemtype) | - | 4.20.0 |
| mode | Type of menu | `vertical` \| `horizontal` \| `inline` | `vertical` |  |
| multiple | Allows selection of multiple items | boolean | false |  |
| openKeys | Array with the keys of currently opened sub-menus | string\[] | - |  |
| overflowedIndicator | Customized the ellipsis icon when menu is collapsed horizontally | ReactNode | `<EllipsisOutlined />` |  |
| selectable | Allows selecting menu items | boolean | true |  |
| selectedKeys | Array with the keys of currently selected menu items | string\[] | - |  |
| style | Style of the root node | CSSProperties | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| subMenuCloseDelay | Delay time to hide submenu when mouse leaves (in seconds) | number | 0.1 |  |
| subMenuOpenDelay | Delay time to show submenu when mouse enters, (in seconds) | number | 0 |  |
| theme | Color theme of the menu | `light` \| `dark` | `light` |  |
| triggerSubMenuAction | Which action can trigger submenu open/close | `hover` \| `click` | `hover` |  |
| onClick | Called when a menu item is clicked | function({ key, keyPath, domEvent }) | - |  |
| onDeselect | Called when a menu item is deselected (multiple mode only) | function({ key, keyPath, selectedKeys, domEvent }) | - |  |
| onOpenChange | Called when sub-menus are opened or closed | function(openKeys: string\[]) | - |  |
| onSelect | Called when a menu item is selected | function({ key, keyPath, selectedKeys, domEvent }) | - |  |
| popupRender | Custom popup renderer for submenu | (node: ReactElement, props: { item: SubMenuProps; keys: string[] }) => ReactElement | - |  |

> More options in [@rc-component/menu](https://github.com/react-component/menu#api)

### ItemType

> type ItemType = [MenuItemType](#menuitemtype) | [SubMenuType](#submenutype) | [MenuItemGroupType](#menuitemgrouptype) | [MenuDividerType](#menudividertype);

#### MenuItemType

| Param    | Description                          | Type      | Default value | Version |
| -------- | ------------------------------------ | --------- | ------------- | ------- |
| danger   | Display the danger style             | boolean   | false         |         |
| disabled | Whether menu item is disabled        | boolean   | false         |         |
| extra    | The extra of the menu item           | ReactNode | -             | 5.21.0  |
| icon     | The icon of the menu item            | ReactNode | -             |         |
| key      | Unique ID of the menu item           | string    | -             |         |
| label    | Menu label                           | ReactNode | -             |         |
| title    | Set display title for collapsed item | string    | -             |         |

#### SubMenuType

<!-- prettier-ignore -->
| Property | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| children | Sub-menus or sub-menu items | [ItemType\[\]](#itemtype) | - |  |
| disabled | Whether sub-menu is disabled | boolean | false |  |
| icon | Icon of sub menu | ReactNode | - |  |
| key | Unique ID of the sub-menu | string | - |  |
| label | Menu label | ReactNode | - |  |
| popupClassName | Sub-menu class name, not working when `mode="inline"` | string | - |  |
| popupOffset | Sub-menu offset, not working when `mode="inline"` | \[number, number] | - |  |
| theme | Color theme of the SubMenu (inherits from Menu by default) |  | `light` \| `dark` | - |  |
| onTitleClick | Callback executed when the sub-menu title is clicked | function({ key, domEvent }) | - |  |
| popupRender | Custom popup renderer for current sub-menu | (node: ReactElement, props: { item: SubMenuProps; keys: string[] }) => ReactElement | - |  |

#### MenuItemGroupType

Define `type` as `group` to make as group:

```ts
const groupItem = {
  type: 'group', // Must have
  label: 'My Group',
  children: [],
};
```

| Param    | Description            | Type                              | Default value | Version |
| -------- | ---------------------- | --------------------------------- | ------------- | ------- |
| children | Sub-menu items         | [MenuItemType\[\]](#menuitemtype) | -             |         |
| label    | The title of the group | ReactNode                         | -             |         |

#### MenuDividerType

Divider line in between menu items, only used in vertical popup Menu or Dropdown Menu. Need define the `type` as `divider`：

```ts
const dividerItem = {
  type: 'divider', // Must have
};
```

| Param  | Description            | Type    | Default value | Version |
| ------ | ---------------------- | ------- | ------------- | ------- |
| dashed | Whether line is dashed | boolean | false         |         |

## FAQ

### Why will Menu's children be rendered twice? {#faq-render-twice}

Menu collects structure info with [twice-render](https://github.com/react-component/menu/blob/f4684514096d6b7123339cbe72e7b0f68db0bce2/src/Menu.tsx#L543) to support HOC usage. Merging into one render may cause the logic to become much more complex. Contributions to help improve the collection logic are welcomed.

### Why Menu do not responsive collapse in Flex layout? {#faq-flex-layout}

Menu will render fully item in flex layout and then collapse it. You need tell flex not consider Menu width to enable responsive ([online demo](https://codesandbox.io/s/ding-bu-dao-hang-antd-4-21-7-forked-5e3imy?file=/demo.js)):

```jsx
<div style={{ flex }}>
  <div style={{ ... }}>Some Content</div>
  <Menu style={{ minWidth: 0, flex: "auto" }} />
</div>
```

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Menu"></ComponentTokenTable>


============================================================
 COMPONENT: DROPDOWN
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/dropdown/index.en-US.md
============================================================

## When To Use

When there are more than a few options to choose from, you can wrap them in a `Dropdown`. By hovering or clicking on the trigger, a dropdown menu will appear, which allows you to choose an option and execute the relevant action.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/extra.tsx" version="5.21.0">Extra node</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/arrow.tsx">Arrow</code>
<code src="./demo/item.tsx">Other elements</code>
<code src="./demo/arrow-center.tsx">Arrow pointing at the center</code>
<code src="./demo/trigger.tsx">Trigger mode</code>
<code src="./demo/event.tsx">Click event</code>
<code src="./demo/dropdown-button.tsx">Button with dropdown menu</code>
<code src="./demo/custom-dropdown.tsx">Custom dropdown</code>
<code src="./demo/sub-menu.tsx">Cascading menu</code>
<code src="./demo/sub-menu-debug.tsx" debug>Cascading menu</code>
<code src="./demo/overlay-open.tsx">The way of hiding menu.</code>
<code src="./demo/context-menu.tsx">Context Menu</code>
<code src="./demo/loading.tsx">Loading</code>
<code src="./demo/selectable.tsx">Selectable Menu</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/menu-full.tsx" debug>Menu full styles</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/icon-debug.tsx" debug>Icon debug</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Dropdown

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| arrow | Whether the dropdown arrow should be visible | boolean \| { pointAtCenter: boolean } | false |  |
| autoAdjustOverflow | Whether to adjust dropdown placement automatically when dropdown is off screen | boolean | true | 5.2.0 |
| classNames | Customize class for each semantic structure inside the Dropdown component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| disabled | Whether the dropdown menu is disabled | boolean | - |  |
| ~~destroyPopupOnHide~~ | Whether destroy dropdown when hidden, use `destroyOnHidden` instead | boolean | false |  |
| destroyOnHidden | Whether destroy dropdown when hidden | boolean | false | 5.25.0 |
| ~~dropdownRender~~ | Customize dropdown content, use `popupRender` instead | (menus: ReactNode) => ReactNode | - | 4.24.0 |
| popupRender | Customize popup content | (menus: ReactNode) => ReactNode | - | 5.25.0 |
| getPopupContainer | To set the container of the dropdown menu. The default is to create a div element in body, but you can reset it to the scrolling area and make a relative reposition. [Example on CodePen](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | (triggerNode: HTMLElement) => HTMLElement | () => document.body |  |
| menu | The menu props | [MenuProps](/components/menu/#api) | - |  |
| ~~overlayClassName~~ | The class name of the dropdown root element, please use `classNames.root` instead | string | - |  |
| ~~overlayStyle~~ | The style of the dropdown root element, please use `styles.root` instead | CSSProperties | - |  |
| placement | Placement of popup menu: `bottom` `bottomLeft` `bottomRight` `top` `topLeft` `topRight` | string | `bottomLeft` |  |
| styles | Customize inline style for each semantic structure inside the Dropdown component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| trigger | The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens | Array&lt;`click`\|`hover`\|`contextMenu`> | \[`hover`] |  |
| open | Whether the dropdown menu is currently open | boolean | - |  |
| onOpenChange | Called when the open state is changed. Not trigger when hidden by click item | (open: boolean, info: { source: 'trigger' \| 'menu' }) => void | - | `info.source`: 5.11.0 |

## Note

Please ensure that the child node of `Dropdown` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Dropdown"></ComponentTokenTable>

## FAQ

### How to prevent Dropdown from being squeezed when it exceeds the screen horizontally? {#faq-dropdown-squeezed}

You can use `width: max-content` style to handle this. ref [#43025](https://github.com/ant-design/ant-design/issues/43025#issuecomment-1594394135).


============================================================
 COMPONENT: BREADCRUMB
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/breadcrumb/index.en-US.md
============================================================

## When To Use

- When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.

```jsx
// works when >=5.3.0, recommended ✅
return <Breadcrumb items={[{ title: 'sample' }]} />;

// works when <5.3.0, deprecated when >=5.3.0 🙅🏻‍♀️
return (
  <Breadcrumb>
    <Breadcrumb.Item>sample</Breadcrumb.Item>
  </Breadcrumb>
);

// or

return <Breadcrumb routes={[{ breadcrumbName: 'sample' }]} />;
```

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Usage</code>
<code src="./demo/withIcon.tsx">With an Icon</code>
<code src="./demo/withParams.tsx">With Params</code>
<code src="./demo/separator.tsx">Configuring the Separator</code>
<code src="./demo/overlay.tsx">Bread crumbs with drop down menu</code>
<code src="./demo/separator-component.tsx">Configuring the Separator Independently</code>
<code src="./demo/debug-routes.tsx">Debug Routes</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Breadcrumb

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| dropdownIcon | Custom dropdown icon | ReactNode | `<DownOutlined />` | 6.2.0 |
| itemRender | Custom item renderer | (route, params, routes, paths) => ReactNode | - |  |
| params | Routing parameters | object | - |  |
| items | The routing stack information of router | [ItemType\[\]](#itemtype) | - | 5.3.0 |
| separator | Custom separator | ReactNode | `/` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |

### ItemType

> type ItemType = Omit<[RouteItemType](#routeitemtype), 'title' | 'path'> | [SeparatorType](#separatortype)

### RouteItemType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| className | The additional css class | string | - |  |
| dropdownProps | The dropdown props | [Dropdown](/components/dropdown) | - |  |
| href | Target of hyperlink. Can not work with `path` | string | - |  |
| path | Connected path. Each path will connect with prev one. Can not work with `href` | string | - |  |
| menu | The menu props | [MenuProps](/components/menu/#api) | - | 4.24.0 |
| onClick | Set the handler to handle click event | (e:MouseEvent) => void | - |  |
| title | item name | ReactNode | - |  |

### SeparatorType

```ts
const item = {
  type: 'separator', // Must have
  separator: '/',
};
```

| Property  | Description       | Type        | Default | Version |
| --------- | ----------------- | ----------- | ------- | ------- |
| type      | Mark as separator | `separator` |         | 5.3.0   |
| separator | Custom separator  | ReactNode   | `/`     | 5.3.0   |

### Use with browserHistory

The link of Breadcrumb item targets `#` by default, you can use `itemRender` to make a `browserHistory` Link.

```jsx

const items = [
  {
    path: '/index',
    title: 'home',
  },
  {
    path: '/first',
    title: 'first',
    children: [
      {
        path: '/general',
        title: 'General',
      },
      {
        path: '/layout',
        title: 'Layout',
      },
      {
        path: '/navigation',
        title: 'Navigation',
      },
    ],
  },
  {
    path: '/second',
    title: 'second',
  },
];

function itemRender(currentRoute, params, items, paths) {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;

  return isLast ? (
    <span>{currentRoute.title}</span>
  ) : (
    <Link to={`/${paths.join('/')}`}>{currentRoute.title}</Link>
  );
}

return <Breadcrumb itemRender={itemRender} items={items} />;
```

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Breadcrumb"></ComponentTokenTable>


============================================================
 COMPONENT: STEPS
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/steps/index.en-US.md
============================================================

## When To Use

When a given task is complicated or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.

## Examples

<!-- prettier-ignore -->
<code src="./demo/simple.tsx">Basic</code>
<code src="./demo/error.tsx">Error status</code>
<code src="./demo/vertical.tsx">Vertical</code>
<code src="./demo/clickable.tsx">Clickable</code>
<code src="./demo/panel.tsx">Panel Steps</code>
<code src="./demo/icon.tsx">With icon</code>
<code src="./demo/step-next.tsx" debug>Switch Step</code>
<code src="./demo/title-placement.tsx">Title Placement and Progress</code>
<code src="./demo/progress-dot.tsx">Dot Style</code>
<code src="./demo/customized-progress-dot.tsx" debug>Customized Dot Style</code>
<code src="./demo/nav.tsx">Navigation Steps</code>
<code src="./demo/progress.tsx" debug>Steps with progress</code>
<code src="./demo/progress-debug.tsx" debug>Progress Debug</code>
<code src="./demo/steps-in-steps.tsx" debug>Steps inside Steps</code>
<code src="./demo/inline.tsx">Inline Steps</code>
<code src="./demo/inline-variant.tsx">Inline Style Combination</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/variant-debug.tsx" debug>Variant Debug</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Steps

The whole of the step bar.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| current | To set the current step, counting from 0. You can overwrite this state by using `status` of `Step` | number | 0 |  |
| ~~direction~~ | To specify the direction of the step bar, `horizontal` or `vertical` | string | `horizontal` |  |
| iconRender | Custom render icon, please use `items.icon` first | (oriNode, info: { index, active, item }) => ReactNode | - |  |
| initial | Set the initial step, counting from 0 | number | 0 |  |
| ~~labelPlacement~~ | Place title and content with `horizontal` or `vertical` direction | string | `horizontal` |  |
| orientation | To specify the orientation of the step bar, `horizontal` or `vertical` | string | `horizontal` |  |
| percent | Progress circle percentage of current step in `process` status (only works on basic Steps) | number | - | 4.5.0 |
| progressDot | Steps with progress dot style, customize the progress dot by setting it to a function. `titlePlacement` will be `vertical` | boolean \| (iconDot, { index, status, title, content }) => ReactNode | false |  |
| responsive | Change to vertical direction when screen width smaller than `532px` | boolean | true |  |
| size | To specify the size of the step bar, `default` and `small` are currently supported | string | `default` |  |
| status | To specify the status of current step, can be set to one of the following values: `wait` `process` `finish` `error` | string | `process` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| titlePlacement | Place title and content with `horizontal` or `vertical` direction | string | `horizontal` |  |
| type | Type of steps, can be set to one of the following values: `default` `dot` `inline` `navigation` `panel` | string | `default` |  |
| variant | Config style variant | `filled` \| `outlined` | `filled` |  |
| onChange | Trigger when Step is changed | (current) => void | - |  |
| items | StepItem content | [StepItem](#stepitem) | [] | 4.24.0 |

### StepItem

A single step in the step bar.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| content | Description of the step, optional property | ReactNode | - |  |
| ~~description~~ | Description of the step, optional property | ReactNode | - |  |
| disabled | Disable click | boolean | false |  |
| icon | Icon of the step, optional property | ReactNode | - |  |
| status | To specify the status. It will be automatically set by `current` of `Steps` if not configured. Optional values are: `wait` `process` `finish` `error` | string | `wait` |  |
| subTitle | Subtitle of the step | ReactNode | - |  |
| title | Title of the step | ReactNode | - |  |

## Semantic DOM

### Steps

<code src="./demo/_semantic.tsx" simplify="true"></code>

### StepItem

<code src="./demo/_semantic_items.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Steps"></ComponentTokenTable>


============================================================
 COMPONENT: PAGINATION
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/pagination/index.en-US.md
============================================================

## When To Use

- When it will take a long time to load/render all items.
- If you want to browse the data by navigating through pages.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/align.tsx" version="5.19.0">Align</code>
<code src="./demo/more.tsx">More</code>
<code src="./demo/changer.tsx">Changer</code>
<code src="./demo/jump.tsx">Jumper</code>
<code src="./demo/mini.tsx">Size</code>
<code src="./demo/simple.tsx">Simple mode</code>
<code src="./demo/controlled.tsx">Controlled</code>
<code src="./demo/total.tsx">Total number</code>
<code src="./demo/all.tsx">Show All</code>
<code src="./demo/itemRender.tsx">Prev and next</code>
<code src="./demo/wireframe.tsx" debug>Wireframe</code>
<code src="./demo/component-token.tsx" debug>component Token</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>

## API

Common props ref：[Common props](/docs/react/common-props)

```jsx
<Pagination onChange={onChange} total={50} />
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | Align | start \| center \| end | - | 5.19.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| current | Current page number | number | - |  |
| defaultCurrent | Default initial page number | number | 1 |  |
| defaultPageSize | Default number of data items per page | number | 10 |  |
| disabled | Disable pagination | boolean | - |  |
| hideOnSinglePage | Whether to hide pager on single page | boolean | false |  |
| itemRender | To customize item's innerHTML | (page, type: 'page' \| 'prev' \| 'next', originalElement) => React.ReactNode | - |  |
| pageSize | Number of data items per page | number | - |  |
| pageSizeOptions | Specify the sizeChanger options | number\[] | \[`10`, `20`, `50`, `100`] |  |
| responsive | If `size` is not specified, `Pagination` would resize according to the width of the window | boolean | - |  |
| showLessItems | Show less page items | boolean | false |  |
| showQuickJumper | Determine whether you can jump to pages directly | boolean \| { goButton: ReactNode } | false |  |
| showSizeChanger | Determine whether to show `pageSize` select | boolean \| [SelectProps](/components/select#api) | - | SelectProps: 5.21.0 |
| totalBoundaryShowSizeChanger | When `total` larger than it, `showSizeChanger` will be true | number | 50 |  |
| showTitle | Show page item's title | boolean | true |  |
| showTotal | To display the total number and range | function(total, range) | - |  |
| simple | Whether to use simple mode | boolean \| { readOnly?: boolean } | - |  |
| size | Component size | `large` \| `middle` \| `small` | `middle` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| total | Total number of data items | number | 0 |  |
| onChange | Called when the page number or `pageSize` is changed, and it takes the resulting page number and pageSize as its arguments | function(page, pageSize) | - |  |
| onShowSizeChange | Called when `pageSize` is changed | function(current, size) | - |  |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Pagination"></ComponentTokenTable>


============================================================
 COMPONENT: FORM
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/form/index.en-US.md
============================================================

## When to use {#when-to-use}

- When you need to create an instance or collect information.
- When you need to validate fields in certain rules.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Usage</code>
<code src="./demo/control-hooks.tsx">Form methods</code>
<code src="./demo/layout.tsx">Form Layout</code>
<code src="./demo/layout-multiple.tsx">Form mix layout</code>
<code src="./demo/disabled.tsx">Form disabled</code>
<code src="./demo/variant.tsx" version="5.13.0">Form variants</code>
<code src="./demo/required-mark.tsx">Required style</code>
<code src="./demo/size.tsx">Form size</code>
<code src="./demo/layout-can-wrap.tsx">label can wrap</code>
<code src="./demo/warning-only.tsx">No block rule</code>
<code src="./demo/useWatch.tsx">Watch Hooks</code>
<code src="./demo/validate-trigger.tsx">Validate Trigger</code>
<code src="./demo/validate-only.tsx">Validate Only</code>
<code src="./demo/form-item-path.tsx">Path Prefix</code>
<code src="./demo/dynamic-form-item.tsx">Dynamic Form Item</code>
<code src="./demo/dynamic-form-items.tsx">Dynamic Form nest Items</code>
<code src="./demo/dynamic-form-items-no-style.tsx" debug>Dynamic Form nest pure Items</code>
<code src="./demo/dynamic-form-items-complex.tsx">Complex Dynamic Form Item</code>
<code src="./demo/nest-messages.tsx">Nest</code>
<code src="./demo/complex-form-control.tsx">complex form control</code>
<code src="./demo/customized-form-controls.tsx">Customized Form Controls</code>
<code src="./demo/global-state.tsx">Store Form Data into Upper Component</code>
<code src="./demo/form-context.tsx">Control between forms</code>
<code src="./demo/inline-login.tsx">Inline Login Form</code>
<code src="./demo/login.tsx">Login Form</code>
<code src="./demo/register.tsx">Registration</code>
<code src="./demo/advanced-search.tsx">Advanced search</code>
<code src="./demo/form-in-modal.tsx">Form in Modal to Create</code>
<code src="./demo/time-related-controls.tsx">Time-related Controls</code>
<code src="./demo/without-form-create.tsx">Handle Form Data Manually</code>
<code src="./demo/validate-static.tsx">Customized Validation</code>
<code src="./demo/dynamic-rule.tsx">Dynamic Rules</code>
<code src="./demo/form-dependencies.tsx">Dependencies</code>
<code src="./demo/getValueProps-normalize.tsx">getValueProps + normalize</code>
<code src="./demo/validate-scroll-to-field.tsx" iframe="360">Slide to error field</code>
<code src="./demo/validate-other.tsx">Other Form Controls</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/disabled-input-debug.tsx" debug>Disabled Input Debug</code>
<code src="./demo/label-debug.tsx" debug>label ellipsis</code>
<code src="./demo/col-24-debug.tsx" debug>Test col 24 usage</code>
<code src="./demo/ref-item.tsx" debug>Ref item</code>
<code src="./demo/custom-feedback-icons.tsx" debug>Custom feedback icons</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Form

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| colon | Configure the default value of `colon` for Form.Item. Indicates whether the colon after the label is displayed (only effective when prop layout is horizontal) | boolean | true |  |
| disabled | Set form component disable, only available for antd components | boolean | false | 4.21.0 |
| component | Set the Form rendering element. Do not create a DOM node for `false` | ComponentType \| false | form |  |
| fields | Control of form fields through state management (such as redux). Not recommended for non-strong demand. View [example](#form-demo-global-state) | [FieldData](#fielddata)\[] | - |  |
| form | Form control instance created by `Form.useForm()`. Automatically created when not provided | [FormInstance](#forminstance) | - |  |
| feedbackIcons | Can be passed custom icons while `Form.Item` element has `hasFeedback` | [FeedbackIcons](#feedbackicons) | - | 5.9.0 |
| initialValues | Set value by Form initialization or reset | object | - |  |
| labelAlign | The text align of label of all items | `left` \| `right` | `right` |  |
| labelWrap | whether label can be wrap | boolean | false | 4.18.0 |
| labelCol | Label layout, like `<Col>` component. Set `span` `offset` value like `{span: 3, offset: 12}` or `sm: {span: 3, offset: 12}` | [object](/components/grid/#col) | - |  |
| layout | Form layout | `horizontal` \| `vertical` \| `inline` | `horizontal` |  |
| name | Form name. Will be the prefix of Field `id` | string | - |  |
| preserve | Keep field value even when field removed. You can get the preserve field value by `getFieldsValue(true)` | boolean | true | 4.4.0 |
| requiredMark | Required mark style. Can use required mark or optional mark. You can not config to single Form.Item since this is a Form level config | boolean \| `optional` \| ((label: ReactNode, info: { required: boolean }) => ReactNode) | true | `renderProps`: 5.9.0 |
| scrollToFirstError | Auto scroll to first failed field when submit | boolean \| [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options) \| { focus: boolean } | false | focus: 5.24.0 |
| size | Set field component size (antd components only) | `small` \| `middle` \| `large` | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| validateMessages | Validation prompt template, description [see below](#validatemessages) | [ValidateMessages](https://github.com/ant-design/ant-design/blob/6234509d18bac1ac60fbb3f92a5b2c6a6361295a/components/locale/en_US.ts#L88-L134) | - |  |
| validateTrigger | Config field validate trigger | string \| string\[] | `onChange` | 4.3.0 |
| variant | Variant of components inside form | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| wrapperCol | The layout for input controls, same as `labelCol` | [object](/components/grid/#col) | - |  |
| onFieldsChange | Trigger when field updated | function(changedFields, allFields) | - |  |
| onFinish | Trigger after submitting the form and verifying data successfully | function(values) | - |  |
| onFinishFailed | Trigger after submitting the form and verifying data failed | function({ values, errorFields, outOfDate }) | - |  |
| onValuesChange | Trigger when value updated | function(changedValues, allValues) | - |  |
| clearOnDestroy | Clear form values when the form is uninstalled | boolean | false | 5.18.0 |

> It accepts all props which native forms support but `onSubmit`.

### validateMessages

Form provides [default verification error messages](https://github.com/ant-design/ant-design/blob/6234509d18bac1ac60fbb3f92a5b2c6a6361295a/components/locale/en_US.ts#L88-L134). You can modify the template by configuring `validateMessages` property. A common usage is to configure localization:

```jsx
const validateMessages = {
  required: "'${name}' is required!",
  // ...
};

<Form validateMessages={validateMessages} />;
```

Besides, [ConfigProvider](/components/config-provider/) also provides a global configuration scheme that allows for uniform configuration error notification templates:

```jsx
const validateMessages = {
  required: "'${name}' is Required!",
  // ...
};

<ConfigProvider form={{ validateMessages }}>
  <Form />
</ConfigProvider>;
```

## Form.Item

Form field component for data bidirectional binding, validation, layout, and so on.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| colon | Used with `label`, whether to display `:` after label text. | boolean | true |  |
| dependencies | Set the dependency field. See [below](#dependencies) | [NamePath](#namepath)\[] | - |  |
| extra | The extra prompt message. It is similar to help. Usage example: to display error message and prompt message at the same time | ReactNode | - |  |
| getValueFromEvent | Specify how to get value from event or other onChange arguments | (..args: any\[]) => any | - |  |
| getValueProps | Additional props with sub component (It's not recommended to generate dynamic function prop by `getValueProps`. Please pass it to child component directly) | (value: any) => Record<string, any> | - | 4.2.0 |
| hasFeedback | Used with `validateStatus`, this option specifies the validation status icon. Recommended to be used only with `Input`. Also, It can get feedback icons via icons prop. | boolean \| { icons: [FeedbackIcons](#feedbackicons) } | false | icons: 5.9.0 |
| help | The prompt message. If not provided, the prompt message will be generated by the validation rule. | ReactNode | - |  |
| hidden | Whether to hide Form.Item (still collect and validate value) | boolean | false | 4.4.0 |
| htmlFor | Set sub label `htmlFor` | string | - |  |
| initialValue | Config sub default value. Form `initialValues` get higher priority when conflict | string | - | 4.2.0 |
| label | Label text. When there is no need for a label but it needs to be aligned with a colon, it can be set to null | ReactNode | - | null: 5.22.0 |
| labelAlign | The text align of label, | `left` \| `right` | `right` |  |
| labelCol | The layout of label. You can set `span` `offset` to something like `{span: 3, offset: 12}` or `sm: {span: 3, offset: 12}` same as with `<Col>`. You can set `labelCol` on Form which will not affect nest Item. If both exists, use Item first | [object](/components/grid/#col) | - |  |
| messageVariables | The default validate field info, description [see below](#messagevariables) | Record&lt;string, string> | - | 4.7.0 |
| name | Field name, support array | [NamePath](#namepath) | - |  |
| normalize | Normalize value from component value before passing to Form instance. Do not support async | (value, prevValue, prevValues) => any | - |  |
| noStyle | No style for `true`, used as a pure field control. Will inherit parent Form.Item `validateStatus` if self `validateStatus` not configured | boolean | false |  |
| preserve | Keep field value even when field removed | boolean | true | 4.4.0 |
| required | Display required style. It will be generated by the validation rule | boolean | false |  |
| rules | Rules for field validation. Click [here](#form-demo-basic) to see an example | [Rule](#rule)\[] | - |  |
| shouldUpdate | Custom field update logic. See [below](#shouldupdate) | boolean \| (prevValue, curValue) => boolean | false |  |
| tooltip | Config tooltip info | ReactNode \| [TooltipProps & { icon: ReactNode }](/components/tooltip#api) | - | 4.7.0 |
| trigger | When to collect the value of children node. Click [here](#form-demo-customized-form-controls) to see an example | string | `onChange` |  |
| validateDebounce | Delay milliseconds to start validation | number | - | 5.9.0 |
| validateFirst | Whether stop validate on first rule of error for this field. Will parallel validate when `parallel` configured | boolean \| `parallel` | false | `parallel`: 4.5.0 |
| validateStatus | The validation status. If not provided, it will be generated by validation rule. options: `success` `warning` `error` `validating` | string | - |  |
| validateTrigger | When to validate the value of children node | string \| string\[] | `onChange` |  |
| valuePropName | Props of children node, for example, the prop of Switch or Checkbox is `checked`. This prop is an encapsulation of `getValueProps`, which will be invalid after customizing `getValueProps` | string | `value` |  |
| wrapperCol | The layout for input controls, same as `labelCol`. You can set `wrapperCol` on Form which will not affect nest Item. If both exists, use Item first | [object](/components/grid/#col) | - |  |
| layout | Form item layout | `horizontal` \| `vertical` | - | 5.18.0 |

After wrapped by `Form.Item` with `name` property, `value`(or other property defined by `valuePropName`) `onChange`(or other property defined by `trigger`) props will be added to form controls, the flow of form data will be handled by Form which will cause:

1. You shouldn't use `onChange` on each form control to **collect data**(use `onValuesChange` of Form), but you can still listen to `onChange`.
2. You cannot set value for each form control via `value` or `defaultValue` prop, you should set default value with `initialValues` of Form. Note that `initialValues` cannot be updated by `setState` dynamically, you should use `setFieldsValue` in that situation.
3. You shouldn't call `setState` manually, please use `form.setFieldsValue` to change value programmatically.

### dependencies

Used when there are dependencies between fields. If a field has the `dependencies` prop, this field will automatically trigger updates and validations when upstream is updated. A common scenario is a user registration form with "password" and "confirm password" fields. The "Confirm Password" validation depends on the "Password" field. After setting `dependencies`, the "Password" field update will re-trigger the validation of "Check Password". You can refer [examples](#form-demo-dependencies).

`dependencies` shouldn't be used together with `shouldUpdate`, since it may result in conflicting update logic.

### FeedbackIcons

`({ status: ValidateStatus, errors: ReactNode, warnings: ReactNode }) => Record<ValidateStatus, ReactNode>`

### shouldUpdate

Form updates only the modified field-related components for performance optimization purposes by incremental update. In most cases, you only need to write code or do validation with the [`dependencies`](#dependencies) property. In some specific cases, such as when a new field option appears with a field value changed, or you just want to keep some area updating by form update, you can modify the update logic of Form.Item via the `shouldUpdate`.

When `shouldUpdate` is `true`, any Form update will cause the Form.Item to be re-rendered. This is very helpful for custom rendering some areas. It should be noted that the child component should be returned in a function, otherwise `shouldUpdate` won't behave correctly:

related issue: [#34500](https://github.com/ant-design/ant-design/issues/34500)

```jsx
<Form.Item shouldUpdate>
  {() => {
    return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
  }}
</Form.Item>
```

You can ref [example](#form-demo-inline-login) to see detail.

When `shouldUpdate` is a function, it will be called by form values update. Providing original values and current value to compare. This is very helpful for rendering additional fields based on values:

```jsx
<Form.Item shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
  {() => {
    return (
      <Form.Item name="other">
        <Input />
      </Form.Item>
    );
  }}
</Form.Item>
```

You can ref [example](#form-demo-control-hooks) to see detail.

### messageVariables

You can modify the default verification information of Form.Item through `messageVariables`.

```jsx
<Form>
  <Form.Item
    messageVariables={{ another: 'good' }}
    label="user"
    rules={[{ required: true, message: '${another} is required' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    messageVariables={{ label: 'good' }}
    label={<span>user</span>}
    rules={[{ required: true, message: '${label} is required' }]}
  >
    <Input />
  </Form.Item>
</Form>
```

Since `5.20.2`, when you don't want to convert `${}`, you can use `\\${}` to skip:

```jsx
{ required: true, message: '${label} is convert, \\${label} is not convert' }

// good is convert, ${label} is not convert
```

## Form.List

Provides array management for fields.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| children | Render function | (fields: Field\[], operation: { add, remove, move }, meta: { errors }) => React.ReactNode | - |  |
| initialValue | Config sub default value. Form `initialValues` get higher priority when conflict | any\[] | - | 4.9.0 |
| name | Field name, support array. List is also a field, so it will return all the values by `getFieldsValue`. You can change this logic by [config](#getfieldsvalue) | [NamePath](#namepath) | - |  |
| rules | Validate rules, only support customize validator. Should work with [ErrorList](#formerrorlist) | { validator, message }\[] | - | 4.7.0 |

```tsx
<Form.List>
  {(fields) => (
    <div>
      {fields.map((field) => (
        <Form.Item {...field}>
          <Input />
        </Form.Item>
      ))}
    </div>
  )}
</Form.List>
```

Note: You should not configure Form.Item `initialValue` under Form.List. It always should be configured by Form.List `initialValue` or Form `initialValues`.

## operation

Some operator functions in render form of Form.List.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| add | add form item | (defaultValue?: any, insertIndex?: number) => void | insertIndex | 4.6.0 |
| move | move form item | (from: number, to: number) => void | - |  |
| remove | remove form item | (index: number \| number\[]) => void | number\[] | 4.5.0 |

## Form.ErrorList

New in 4.7.0. Show error messages, should only work with `rules` of Form.List. See [example](#form-demo-dynamic-form-item).

| Property | Description | Type         | Default |
| -------- | ----------- | ------------ | ------- |
| errors   | Error list  | ReactNode\[] | -       |

## Form.Provider

Provide linkage between forms. If a sub form with `name` prop update, it will auto trigger Provider related events. See [example](#form-demo-form-context).

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| onFormChange | Triggered when a sub form field updates | function(formName: string, info: { changedFields, forms }) | - |
| onFormFinish | Triggered when a sub form submits | function(formName: string, info: { values, forms }) | - |

```jsx
<Form.Provider
  onFormFinish={(name) => {
    if (name === 'form1') {
      // Do something...
    }
  }}
>
  <Form name="form1">...</Form>
  <Form name="form2">...</Form>
</Form.Provider>
```

### FormInstance

| Name | Description | Type | Version |
| --- | --- | --- | --- |
| getFieldError | Get the error messages by the field name | (name: [NamePath](#namepath)) => string\[] |  |
| getFieldInstance | Get field instance | (name: [NamePath](#namepath)) => any | 4.4.0 |
| getFieldsError | Get the error messages by the fields name. Return as an array | (nameList?: [NamePath](#namepath)\[]) => FieldError\[] |  |
| getFieldsValue | Get values by a set of field names. Return according to the corresponding structure. Default return mounted field value, but you can use `getFieldsValue(true)` to get all values | [GetFieldsValue](#getfieldsvalue) |  |
| getFieldValue | Get the value by the field name | (name: [NamePath](#namepath)) => any |  |
| isFieldsTouched | Check if fields have been operated. Check if all fields is touched when `allTouched` is `true` | (nameList?: [NamePath](#namepath)\[], allTouched?: boolean) => boolean |  |
| isFieldTouched | Check if a field has been operated | (name: [NamePath](#namepath)) => boolean |  |
| isFieldValidating | Check field if is in validating | (name: [NamePath](#namepath)) => boolean |  |
| resetFields | Reset fields to `initialValues` | (fields?: [NamePath](#namepath)\[]) => void |  |
| scrollToField | Scroll to field position | (name: [NamePath](#namepath), options: [ScrollOptions](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options) \| { focus: boolean }) => void | focus: 5.24.0 |
| setFields | Set fields status | (fields: [FieldData](#fielddata)\[]) => void |  |
| setFieldValue | Set fields value(Will directly pass to form store and **reset validation message**. If you do not want to modify passed object, please clone first) | (name: [NamePath](#namepath), value: any) => void | 4.22.0 |
| setFieldsValue | Set fields value(Will directly pass to form store and **reset validation message**. If you do not want to modify passed object, please clone first). Use `setFieldValue` instead if you want to only config single value in Form.List | (values) => void |  |
| submit | Submit the form. It's same as click `submit` button | () => void |  |
| validateFields | Validate fields. Use `recursive` to validate all the field in the path | (nameList?: [NamePath](#namepath)\[], config?: [ValidateConfig](#validatefields)) => Promise |  |

#### validateFields

```tsx
export interface ValidateConfig {
  // New in 5.5.0. Only validate content and not show error message on UI.
  validateOnly?: boolean;
  // New in 5.9.0. Recursively validate the provided `nameList` and its sub-paths.
  recursive?: boolean;
  // New in 5.11.0. Validate dirty fields (touched + validated).
  // It's useful to validate fields only when they are touched or validated.
  dirty?: boolean;
}
```

return sample:

```jsx
validateFields()
  .then((values) => {
    /*
  values:
    {
      username: 'username',
      password: 'password',
    }
  */
  })
  .catch((errorInfo) => {
    /*
    errorInfo:
      {
        values: {
          username: 'username',
          password: 'password',
        },
        errorFields: [
          { name: ['password'], errors: ['Please input your Password!'] },
        ],
        outOfDate: false,
      }
    */
  });
```

## Hooks

### Form.useForm

`type Form.useForm = (): [FormInstance]`

Create Form instance to maintain data store.

### Form.useFormInstance

`type Form.useFormInstance = (): FormInstance`

Added in `4.20.0`. Get current context form instance to avoid pass as props between components:

```tsx
const Sub = () => {
  const form = Form.useFormInstance();

  return <Button onClick={() => form.setFieldsValue({})} />;
};

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Sub />
    </Form>
  );
};
```

### Form.useWatch

`type Form.useWatch = (namePath: NamePath | (selector: (values: Store) => any), formInstance?: FormInstance | WatchOptions): Value`

`5.12.0` add `selector`

Watch the value of a field. You can use this to interact with other hooks like `useSWR` to reduce development costs:

```tsx
const Demo = () => {
  const [form] = Form.useForm();
  const userName = Form.useWatch('username', form);

  const { data: options } = useSWR(`/api/user/${userName}`, fetcher);

  return (
    <Form form={form}>
      <Form.Item name="username">
        <AutoComplete options={options} />
      </Form.Item>
    </Form>
  );
};
```

If your component is wrapped by `Form.Item`, you can omit the second argument, `Form.useWatch` will find the nearest `FormInstance` automatically.

By default `useWatch` only watches the registered field. If you want to watch the unregistered field, please use `preserve`:

```tsx
const Demo = () => {
  const [form] = Form.useForm();

  const age = Form.useWatch('age', { form, preserve: true });
  console.log(age);

  return (
    <div>
      <Button onClick={() => form.setFieldValue('age', 2)}>Update</Button>
      <Form form={form}>
        <Form.Item name="name">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};
```

### Form.Item.useStatus

`type Form.Item.useStatus = (): { status: ValidateStatus | undefined, errors: ReactNode[], warnings: ReactNode[] }`

Added in `4.22.0`. Could be used to get validate status of Form.Item. If this hook is not used under Form.Item, `status` would be `undefined`. Added `error` and `warnings` in `5.4.0`, Could be used to get error messages and warning messages of Form.Item:

```tsx
const CustomInput = ({ value, onChange }) => {
  const { status, errors } = Form.Item.useStatus();
  return (
    <input
      value={value}
      onChange={onChange}
      className={`custom-input-${status}`}
      placeholder={(errors.length && errors[0]) || ''}
    />
  );
};

export default () => (
  <Form>
    <Form.Item name="username">
      <CustomInput />
    </Form.Item>
  </Form>
);
```

#### Difference between other data fetching method

Form only update the Field which changed to avoid full refresh perf issue. Thus you can not get real time value with `getFieldsValue` in render. And `useWatch` will rerender current component to sync with latest value. You can also use Field renderProps to get better performance if only want to do conditional render. If component no need care field value change, you can use `onValuesChange` to give to parent component to avoid current one rerender.

## Interface

### NamePath

`string | number | (string | number)[]`

### GetFieldsValue

`getFieldsValue` provides overloaded methods:

#### getFieldsValue(nameList?: true | [NamePath](#namepath)\[], filterFunc?: FilterFunc)

When `nameList` is empty, return all registered fields, including values of List (even if List has no Item children).

When `nameList` is `true`, return all values in store, including unregistered fields. For example, if you set the value of an unregistered Item through `setFieldsValue`, you can also get all values through `true`.

When `nameList` is an array, return the value of the specified path. Note that `nameList` is a nested array. For example, you need the value of a certain path as follows:

```tsx
// Single path
form.getFieldsValue([['user', 'age']]);

// multiple path
form.getFieldsValue([
  ['user', 'age'],
  ['preset', 'account'],
]);
```

#### getFieldsValue({ filter?: FilterFunc })

### FilterFunc

To filter certain field values, `meta` will provide information related to the fields. For example, it can be used to retrieve values that have only been modified by the user, and so on.

```tsx
type FilterFunc = (meta: { touched: boolean; validating: boolean }) => boolean;
```

### FieldData

| Name       | Description              | Type                     |
| ---------- | ------------------------ | ------------------------ |
| errors     | Error messages           | string\[]                |
| warnings   | Warning messages         | string\[]                |
| name       | Field name path          | [NamePath](#namepath)\[] |
| touched    | Whether is operated      | boolean                  |
| validating | Whether is in validating | boolean                  |
| value      | Field value              | any                      |

### Rule

Rule supports a config object, or a function returning config object:

```tsx
type Rule = RuleConfig | ((form: FormInstance) => RuleConfig);
```

| Name | Description | Type | Version |
| --- | --- | --- | --- |
| defaultField | Validate rule for all array elements, valid when `type` is `array` | [rule](#rule) |  |
| enum | Match enum value. You need to set `type` to `enum` to enable this | any\[] |  |
| fields | Validate rule for child elements, valid when `type` is `array` or `object` | Record&lt;string, [rule](#rule)> |  |
| len | Length of string, number, array | number |  |
| max | `type` required: max length of `string`, `number`, `array` | number |  |
| message | Error message. Will auto generate by [template](#validatemessages) if not provided | string \| ReactElement |  |
| min | `type` required: min length of `string`, `number`, `array` | number |  |
| pattern | Regex pattern | RegExp |  |
| required | Required field | boolean |  |
| transform | Transform value to the rule before validation | (value) => any |  |
| type | Normally `string` \|`number` \|`boolean` \|`url` \| `email` \| `tel`. More type to ref [here](https://github.com/react-component/async-validator#type) | string |  |
| validateTrigger | Set validate trigger event. Must be the sub set of `validateTrigger` in Form.Item | string \| string\[] |  |
| validator | Customize validation rule. Accept Promise as return. See [example](#form-demo-register) | ([rule](#rule), value) => Promise |  |
| warningOnly | Warning only. Not block form submit | boolean | 4.17.0 |
| whitespace | Failed if only has whitespace, only work with `type: 'string'` rule | boolean |  |

### WatchOptions

| Name | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| form | Form instance | FormInstance | Current form in context | 5.4.0 |
| preserve | Whether to watch the field which has no matched `Form.Item` | boolean | false | 5.4.0 |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Form"></ComponentTokenTable>

## FAQ

### Why can't Switch, Checkbox bind data? {#faq-switch-checkbox-binding}

Form.Item default bind value to `value` prop, but Switch or Checkbox value prop is `checked`. You can use `valuePropName` to change bind value prop.

```tsx | pure
<Form.Item name="fieldA" valuePropName="checked">
  <Switch />
</Form.Item>
```

### How does `name` fill value when it's an array? {#faq-name-array-rule}

`name` will fill value by array order. When there exists number in it and no related field in form store, it will auto convert field to array. If you want to keep it as object, use string like: `['1', 'name']`.

### Why is there a form warning when used in Modal? {#faq-form-modal-error}

> Warning: Instance created by `useForm` is not connect to any Form element. Forget to pass `form` prop?

Before Modal opens, children elements do not exist in the view. You can set `forceRender` on Modal to pre-render its children. Click [here](https://codesandbox.io/s/antd-reproduction-template-ibu5c) to view an example.

### Why is component `defaultValue` not working when inside Form.Item? {#faq-item-default-value}

Components inside Form.Item with name property will turn into controlled mode, which makes `defaultValue` not work anymore. Please try `initialValues` of Form to set default value.

### Why can not call `ref` of Form at first time? {#faq-ref-first-call}

`ref` only receives the mounted instance. please ref React official doc: <https://react.dev/learn/manipulating-the-dom-with-refs#when-react-attaches-the-refs>

### Why will `resetFields` re-mount component? {#faq-reset-fields-mount}

`resetFields` will re-mount component under Field to clean up customize component side effects (like async data, cached state, etc.). It's by design.

### Difference between Form initialValues and Item initialValue? {#faq-initial-values-diff}

In most case, we always recommend to use Form `initialValues`. Use Item `initialValue` only with dynamic field usage. Priority follows the rules:

1. Form `initialValues` is the first priority
2. Field `initialValue` is secondary \*. Does not work when multiple Item with same `name` setting the `initialValue`

### Why can't `getFieldsValue` get value at first render? {#faq-get-fields-value}

`getFieldsValue` returns collected field data by default, but the Form.Item node is not ready at the first render. You can get all field data by `getFieldsValue(true)`.

### Why some component not response with `setFieldsValue` to `undefined`? {#faq-set-fields-undefined}

`value` change from certain one to `undefined` in React means from controlled mode to uncontrolled mode. Thus it will not change display value but modified FormStore in fact. You can HOC to handle this:

```jsx
const MyInput = ({
  // Force use controlled mode
  value = '',
  ...rest
}) => <input value={value} {...rest} />;

<Form.Item name="my">
  <MyInput />
</Form.Item>;
```

### Why does `onFieldsChange` trigger three times on change when field sets `rules`? {#faq-rules-trigger-three-times}

Validating is also part of the value updating. It pass follow steps:

1. Trigger value change
2. Rule validating
3. Rule validated

In each `onFieldsChange`, you will get `false` > `true` > `false` with `isFieldValidating`.

### Why doesn't Form.List support `label` and need ErrorList to show errors? {#faq-form-list-no-label}

Form.List use renderProps which mean internal structure is flexible. Thus `label` and `error` can not have best place. If you want to use antd `label`, you can wrap with Form.Item instead.

### Why can't Form.Item `dependencies` work on Form.List field? {#faq-dependencies-form-list}

Your name path should also contain Form.List `name`:

```tsx
<Form.List name="users">
  {(fields) =>
    fields.map((field) => (
      <React.Fragment key={field.key}>
        <Form.Item name={[field.name, 'name']} {...someRest1} />
        <Form.Item name={[field.name, 'age']} {...someRest1} />
      </React.Fragment>
    ))
  }
</Form.List>
```

dependencies should be `['users', 0, 'name']`

### Why doesn't `normalize` support async? {#faq-normalize-async}

React can not get correct interaction of controlled component with async value update. When user trigger `onChange`, component will do no response since `value` update is async. If you want to trigger value update async, you should use customize component to handle value state internal and pass sync value control to Form instead.

### `scrollToFirstError` and `scrollToField` not working? {#faq-scroll-not-working}

1. use custom form control

See similar issues: [#28370](https://github.com/ant-design/ant-design/issues/28370) [#27994](https://github.com/ant-design/ant-design/issues/27994)

Starting from version `5.17.0`, the sliding operation will prioritize using the ref element forwarded by the form control elements. Therefore, when considering custom components to support verification scrolling, please consider forwarding it to the form control elements first.

`scrollToFirstError` and `scrollToField` deps on `id` attribute passed to form control, please make sure that it hasn't been ignored in your custom form control. Check [codesandbox](https://codesandbox.io/s/antd-reproduction-template-forked-25nul?file=/index.js) for solution.

2. multiple forms on same page

If there are multiple forms on the page, and there are duplicate same `name` form item, the form scroll probably may find the form item with the same name in another form. You need to set a different `name` for the `Form` component to distinguish it.

### Continue, why not use `ref` to bind element? {#faq-ref-binding}

Form can not get real DOM node when customize component not support `ref`. It will get warning in React Strict Mode if wrap with Class Component and call `findDOMNode`. So we use `id` to locate element.

### `setFieldsValue` do not trigger `onFieldsChange` or `onValuesChange`? {#faq-set-fields-no-trigger}

It's by design. Only user interactive can trigger the change event. This design is aim to avoid call `setFieldsValue` in change event which may makes loop calling.

### Why Form.Item not update value when children is nest? {#faq-item-nested-update}

Form.Item will inject `value` and `onChange` to children when render. Once your field component is wrapped, props will not pass to the correct node. Follow code will not work as expect:

```jsx
<Form.Item name="input">
  <div>
    <h3>I am a wrapped Input</h3>
    <Input />
  </div>
</Form.Item>
```

You can use HOC to solve this problem, don't forget passing props to form control component:

```jsx
const MyInput = (props) => (
  <div>
    <h3>I am a wrapped Input</h3>
    <Input {...props} />
  </div>
);

<Form.Item name="input">
  <MyInput />
</Form.Item>;
```

### Why does clicking the label in the form change the component state? {#faq-label-click-change}

> Related issue: [#47031](https://github.com/ant-design/ant-design/issues/47031), [#43175](https://github.com/ant-design/ant-design/issues/43175), [#52152](https://github.com/ant-design/ant-design/issues/52152)

Form label use [HTML label](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) elements to wrap form controls, which focuses the corresponding control when clicked. This is the native behavior of label elements, designed to improve accessibility and user experience. This standard interaction pattern makes it easier for users to interact with form controls. If you need to disable this behavior, you can use `htmlFor={null}`, though it's generally not recommended.

```diff
- <Form.Item name="switch" label="Switch">
+ <Form.Item name="switch" label="Switch" htmlFor={null}>
    <Switch />
  </Form.Item>
```


============================================================
 COMPONENT: INPUT
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/input/index.en-US.md
============================================================

## When To Use

- A user input in a form field is needed.
- A search input is required.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic usage</code>
<code src="./demo/size.tsx">Three sizes of Input</code>
<code src="./demo/variant.tsx" version="5.13.0">Variants</code>
<code src="./demo/filled-debug.tsx" debug>Filled Debug</code>
<code src="./demo/addon.tsx" debug>Pre / Post tab</code>
<code src="./demo/compact-style.tsx">Compact Style</code>
<code src="./demo/group.tsx" debug>Input Group</code>
<code src="./demo/search-input.tsx">Search box</code>
<code src="./demo/search-input-loading.tsx">Search box with loading</code>
<code src="./demo/textarea.tsx">TextArea</code>
<code src="./demo/autosize-textarea.tsx">Autosizing the height to fit the content</code>
<code src="./demo/otp.tsx" version="5.16.0">OTP</code>
<code src="./demo/tooltip.tsx">Format Tooltip Input</code>
<code src="./demo/presuffix.tsx">prefix and suffix</code>
<code src="./demo/password-input.tsx">Password box</code>
<code src="./demo/allowClear.tsx">With clear icon</code>
<code src="./demo/show-count.tsx">With character counting</code>
<code src="./demo/advance-count.tsx" version=">= 5.10.0">Custom count logic</code>
<code src="./demo/status.tsx">Status</code>
<code src="./demo/focus.tsx">Focus</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/borderless-debug.tsx" debug>Style Debug</code>
<code src="./demo/align.tsx" debug>Text Align</code>
<code src="./demo/textarea-resize.tsx" debug>TextArea</code>
<code src="./demo/debug-addon.tsx" debug>debug Pre / Post tab</code>
<code src="./demo/component-token.tsx" debug>debug token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Input

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| ~~addonAfter~~ | The label text displayed after (on the right side of) the input field, please use Space.Compact instead | ReactNode | - |  |
| ~~addonBefore~~ | The label text displayed before (on the left side of) the input field, please use Space.Compact instead | ReactNode | - |  |
| allowClear | If allow to remove input content with clear icon | boolean \| { clearIcon: ReactNode } | false |  |
| ~~bordered~~ | Whether has border style, please use `variant` instead | boolean | true | 4.5.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-input), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-input), string> | - |  |
| count | Character count config | [CountConfig](#countconfig) | - | 5.10.0 |
| defaultValue | The initial input content | string | - |  |
| disabled | Whether the input is disabled | boolean | false |  |
| id | The ID for input | string | - |  |
| maxLength | The maximum number of characters in Input | number | - |  |
| prefix | The prefix icon for the Input | ReactNode | - |  |
| showCount | Whether to show character count | boolean \| { formatter: (info: { value: string, count: number, maxLength?: number }) => ReactNode } | false | 4.18.0 info.value: 4.23.0 |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-input), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-input), CSSProperties> | - |  |
| size | The size of the input box. Note: in the context of a form, the `middle` size is used | `large` \| `middle` \| `small` | - |  |
| suffix | The suffix icon for the Input | ReactNode | - |  |
| type | The type of input, see: [MDN](https://developer.mozilla.org/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)( use `Input.TextArea` instead of `type="textarea"`) | string | `text` |  |
| value | The input content value | string | - |  |
| variant | Variants of Input | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| onChange | Callback when user input | function(e) | - |  |
| onPressEnter | The callback function that is triggered when Enter key is pressed | function(e) | - |  |
| onClear | Callback when click the clear button | () => void | - | 5.20.0 |

> When `Input` is used in a `Form.Item` context, if the `Form.Item` has the `id` props defined then `value`, `defaultValue`, and `id` props of `Input` are automatically set.

The rest of the props of Input are exactly the same as the original [input](https://react.dev/reference/react-dom/components/input).

#### CountConfig

```tsx
interface CountConfig {
  // Max character count. Different from the native `maxLength`, it will be marked warning but not truncated
  max?: number;
  // Custom character count, for example, the standard emoji length is greater than 1, you can customize the counting strategy to change it to 1
  strategy?: (value: string) => number;
  // Same as `showCount`
  show?: boolean | ((args: { value: string; count: number; maxLength?: number }) => ReactNode);
  // Custom clipping logic when the number of characters exceeds `count.max`, no clipping when not configured
  exceedFormatter?: (value: string, config: { max: number }) => string;
}
```

### Input.TextArea

Same as Input, and more:

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoSize | Height auto size feature, can be set to true \| false or an object { minRows: 2, maxRows: 6 } | boolean \| object | false |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-textarea), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-textarea), string> | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-textarea), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-textarea), CSSProperties> | - |  |

The rest of the props of `Input.TextArea` are the same as the original [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).

### Input.Search

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-search), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-search), string> | - |  |
| enterButton | false displays the default button color, true uses the primary color, or you can provide a custom button. Conflicts with addonAfter. | ReactNode | false |  |
| loading | Search box with loading | boolean | false |  |
| onSearch | The callback function triggered when you click on the search-icon, the clear-icon or press the Enter key | function(value, event, { source: "input" \| "clear" }) | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-search), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-search), CSSProperties> | - |  |

Supports all props of `Input`.

### Input.Password

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Semantic DOM class | Record<[SemanticDOM](#semantic-password), string> | - |  |
| iconRender | Custom toggle button | (visible) => ReactNode | (visible) => (visible ? &lt;EyeOutlined /> : &lt;EyeInvisibleOutlined />) | 4.3.0 |
| styles | Semantic DOM style | Record<[SemanticDOM](#semantic-password), CSSProperties> | - |  |
| visibilityToggle | Whether show toggle button or control password visible | boolean \| [VisibilityToggle](#visibilitytoggle) | true |  |

### Input.OTP

Added in `5.16.0`.

> Notes for developers
>
> When the `mask` prop is string, we recommend receiving a single character or a single emoji. If multiple characters or multiple emoji are passed, a warning will be thrown.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-otp), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-otp), string> | - |  |
| defaultValue | Default value | string | - |  |
| disabled | Whether the input is disabled | boolean | false |  |
| formatter | Format display, blank fields will be filled with ` ` | (value: string) => string | - |  |
| separator | render the separator after the input box of the specified index | ReactNode \|((i: number) => ReactNode) | - | 5.24.0 |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-otp), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-otp), CSSProperties> | - |  |
| mask | Custom display, the original value will not be modified | boolean \| string | `false` | `5.17.0` |
| length | The number of input elements | number | 6 |  |
| status | Set validation status | 'error' \| 'warning' | - |  |
| size | The size of the input box | `small` \| `middle` \| `large` | `middle` |  |
| variant | Variants of Input | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | `underlined`: 5.24.0 |
| value | The input content value | string | - |  |
| onChange | Trigger when all the fields are filled | (value: string) => void | - |  |
| onInput | Trigger when the input value changes | (value: string[]) => void | - | `5.22.0` |

#### VisibilityToggle

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| visible | Whether the password is show or hide | boolean | false | 4.24.0 |
| onVisibleChange | Callback executed when visibility of the password is changed | (visible) => void | - | 4.24.0 |

#### Input Methods

| Name | Description | Parameters | Version |
| --- | --- | --- | --- |
| blur | Remove focus | - |  |
| focus | Get focus | (option?: { preventScroll?: boolean, cursor?: 'start' \| 'end' \| 'all' }) | option - 4.10.0 |

## Semantic DOM

### Input {#semantic-input}

<code src="./demo/_semantic_input.tsx" simplify="true"></code>

### Input.TextArea {#semantic-textarea}

<code src="./demo/_semantic_textarea.tsx" simplify="true"></code>

### Input.Search {#semantic-search}

<code src="./demo/_semantic_search.tsx" simplify="true"></code>

### Input.Password {#semantic-password}

<code src="./demo/_semantic_password.tsx" simplify="true"></code>

### Input.OTP {#semantic-otp}

<code src="./demo/_semantic_otp.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Input"></ComponentTokenTable>

## FAQ

### Why Input lose focus when change `prefix/suffix/showCount` {#faq-lose-focus}

When Input dynamic add or remove `prefix/suffix/showCount` will make React recreate the dom structure and new input will be not focused. You can set an empty `<span />` element to keep the dom structure:

```jsx
const suffix = condition ? <Icon type="smile" /> : <span />;

<Input suffix={suffix} />;
```

### Why TextArea in control can make `value` exceed `maxLength`? {#faq-textarea-exceed-max}

When in control, component should show as what it set to avoid submit value not align with store value in Form.


============================================================
 COMPONENT: SELECT
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/select/index.en-US.md
============================================================

## When To Use

- A dropdown menu for displaying choices - an elegant alternative to the native `<select>` element.
- Utilizing [Radio](/components/radio/) is recommended when there are fewer total options (less than 5).
- You probably need [AutoComplete](/components/auto-complete/) if you're looking for an input box that can be typed or selected.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Usage</code>
<code src="./demo/search.tsx">Select with search field</code>
<code src="./demo/search-filter-option.tsx">Custom Search</code>
<code src="./demo/search-multi-field.tsx">Multi field search</code>
<code src="./demo/multiple.tsx">multiple selection</code>
<code src="./demo/size.tsx">Sizes</code>
<code src="./demo/option-render.tsx">Custom dropdown options</code>
<code src="./demo/search-sort.tsx">Search with sort</code>
<code src="./demo/tags.tsx">Tags</code>
<code src="./demo/optgroup.tsx">Option Group</code>
<code src="./demo/coordinate.tsx">coordinate</code>
<code src="./demo/search-box.tsx">Search Box</code>
<code src="./demo/label-in-value.tsx">Get value of selected item</code>
<code src="./demo/automatic-tokenization.tsx">Automatic tokenization</code>
<code src="./demo/select-users.tsx">Search and Select Users</code>
<code src="./demo/suffix.tsx" version="5.22.0">Prefix and Suffix</code>
<code src="./demo/custom-dropdown-menu.tsx">Custom dropdown</code>
<code src="./demo/hide-selected.tsx">Hide Already Selected</code>
<code src="./demo/variant.tsx" version="5.13.0">Variants</code>
<code src="./demo/filled-debug.tsx" debug>Filled debug</code>
<code src="./demo/custom-tag-render.tsx">Custom Tag Render</code>
<code src="./demo/custom-label-render.tsx">Custom Selected Label Render</code>
<code src="./demo/responsive.tsx">Responsive maxTagCount</code>
<code src="./demo/big-data.tsx">Big Data</code>
<code src="./demo/status.tsx">Status</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/placement-debug.tsx" debug>Dynamic Height</code>
<code src="./demo/debug.tsx" debug>For Debug</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/option-label-center.tsx" debug>Options label Centered</code>
<code src="./demo/debug-flip-shift.tsx" iframe="200" debug>Flip + Shift</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/maxCount.tsx" version="5.13.0">Max Count</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Select props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Customize clear icon | boolean \| { clearIcon?: ReactNode } | false | 5.8.0: Support object type |
| ~autoClearSearchValue~ | Whether the current search will be cleared on selecting an item. Only applies when `mode` is set to `multiple` or `tags` | boolean | true |  |
| classNames | Customize class for each semantic structure inside the Select component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultActiveFirstOption | Whether active first option by default | boolean | true |  |
| defaultOpen | Initial open state of dropdown | boolean | - |  |
| defaultValue | Initial selected option | string \| string\[] \| <br />number \| number\[] \| <br />LabeledValue \| LabeledValue\[] | - |  |
| disabled | Whether disabled select | boolean | false |  |
| ~~popupClassName~~ | The className of dropdown menu, use `classNames.popup.root` instead | string | - | 4.23.0 |
| popupMatchSelectWidth | Determine whether the popup menu and the select input are the same width. Default set `min-width` same as input. Will ignore when value less than select width. `false` will disable virtual scroll | boolean \| number | true | 5.5.0 |
| ~~dropdownRender~~ | Customize dropdown content, use `popupRender` instead | (originNode: ReactNode) => ReactNode | - |  |
| popupRender | Customize dropdown content | (originNode: ReactNode) => ReactNode | - | 5.25.0 |
| ~~dropdownStyle~~ | The style of dropdown menu, use `styles.popup.root` instead | CSSProperties | - |  |
| fieldNames | Customize node label, value, options，groupLabel field name | object | { label: `label`, value: `value`, options: `options`, groupLabel: `label` } | 4.17.0 (`groupLabel` added in 5.6.0) |
| ~~filterOption~~ | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns `true`, the option will be included in the filtered set; Otherwise, it will be excluded | boolean \| function(inputValue, option) | true |  |
| ~~filterSort~~ | Sort function for search options sorting, see [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s compareFunction | (optionA: Option, optionB: Option, info: { searchValue: string }) => number | - | `searchValue`: 5.19.0 |
| getPopupContainer | Parent Node which the selector should be rendered to. Default to `body`. When position issues happen, try to modify it into scrollable content and position it relative. [Example](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body |  |
| labelInValue | Whether to embed label in value, turn the format of value from `string` to { value: string, label: ReactNode } | boolean | false |  |
| listHeight | Config popup height | number | 256 |  |
| loading | Indicate loading state | boolean | false |  |
| maxCount | The max number of items can be selected, only applies when `mode` is `multiple` or `tags` | number | - | 5.13.0 |
| maxTagCount | Max tag count to show. `responsive` will cost render performance | number \| `responsive` | - | responsive: 4.10 |
| maxTagPlaceholder | Placeholder for not showing tags | ReactNode \| function(omittedValues) | - |  |
| maxTagTextLength | Max tag text length to show | number | - |  |
| menuItemSelectedIcon | The custom menuItemSelected icon with multiple options | ReactNode | - |  |
| mode | Set mode of Select | `multiple` \| `tags` | - |  |
| notFoundContent | Specify content to show when no result matches | ReactNode | `Not Found` |  |
| open | Controlled open state of dropdown | boolean | - |  |
| ~~optionFilterProp~~ | Deprecated, see `showSearch.optionFilterProp` |  |  |  |
| optionLabelProp | Which prop value of option will render as content of select. [Example](https://codesandbox.io/s/antd-reproduction-template-tk678) | string | `children` |  |
| options | Select options. Will get better perf than jsx definition | { label, value }\[] | - |  |
| optionRender | Customize the rendering dropdown options | (option: FlattenOptionData\<BaseOptionType\> , info: { index: number }) => React.ReactNode | - | 5.11.0 |
| placeholder | Placeholder of select | ReactNode | - |  |
| placement | The position where the selection box pops up | `bottomLeft` `bottomRight` `topLeft` `topRight` | bottomLeft |  |
| prefix | The custom prefix | ReactNode | - | 5.22.0 |
| removeIcon | The custom remove icon | ReactNode | - |  |
| ~~searchValue~~ | The current input "search" text | string | - |  |
| showSearch | Whether select is searchable | boolean \| [Object](#showsearch) | single: false, multiple: true |  |
| size | Size of Select input | `large` \| `middle` \| `small` | `middle` |  |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| styles | Customize inline style for each semantic structure inside the Select component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| suffixIcon | The custom suffix icon. Customize icon will not response click open to avoid icon designed to do other interactive. You can use `pointer-events: none` style to bypass | ReactNode | `<DownOutlined />` |  |
| tagRender | Customize tag render, only applies when `mode` is set to `multiple` or `tags` | (props) => ReactNode | - |  |
| labelRender | Customize selected label render (LabelInValueType definition see [LabelInValueType](https://github.com/react-component/select/blob/b39c28aa2a94e7754ebc570f200ab5fd33bd31e7/src/Select.tsx#L70)) | (props: LabelInValueType) => ReactNode | - | 5.15.0 |
| tokenSeparators | Separator used to tokenize, only applies when `mode="tags"` | string\[] | - |  |
| value | Current selected option (considered as a immutable array) | string \| string\[] \| <br />number \| number\[] \| <br />LabeledValue \| LabeledValue\[] | - |  |
| variant | Variants of selector | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| virtual | Disable virtual scroll when set to false | boolean | true | 4.1.0 |
| onActive | Called when keyboard or mouse interaction occurs | function(value: string \| number \| LabeledValue) | - |  |
| onBlur | Called when blur | function | - |  |
| onChange | Called when select an option or input value change | function(value, option:Option \| Array&lt;Option>) | - |  |
| onClear | Called when clear | function | - | 4.6.0 |
| onDeselect | Called when an option is deselected, param is the selected option's value. Only called for `multiple` or `tags`, effective in multiple or tags mode only | function(value: string \| number \| LabeledValue) | - |  |
| ~~onDropdownVisibleChange~~ | Called when dropdown open, use `onOpenChange` instead | (open: boolean) => void | - |  |
| onOpenChange | Called when dropdown open | (open: boolean) => void | - |  |
| onFocus | Called when focus | (event: FocusEvent) => void | - |  |
| onInputKeyDown | Called when key pressed | (event: KeyboardEvent) => void | - |  |
| onPopupScroll | Called when dropdown scrolls | (event: UIEvent) => void | - |  |
| ~~onSearch~~ | Callback function that is fired when input changed | function(value: string) | - |  |
| onSelect | Called when an option is selected, the params are option's value (or key) and option instance | function(value: string \| number \| LabeledValue, option: Option) | - |  |

> Note, if you find that the drop-down menu scrolls with the page, or you need to trigger Select in other popup layers, please try to use `getPopupContainer={triggerNode => triggerNode.parentElement}` to fix the drop-down popup rendering node in the parent element of the trigger .

### showSearch

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoClearSearchValue | Whether the current search will be cleared on selecting an item. Only applies when `mode` is set to `multiple` or `tags` | boolean | true |  |
| filterOption | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns `true`, the option will be included in the filtered set; Otherwise, it will be excluded | boolean \| function(inputValue, option) | true |  |
| filterSort | Sort function for search options sorting, see [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s compareFunction | (optionA: Option, optionB: Option, info: { searchValue: string }) => number | - | `searchValue`: 5.19.0 |
| optionFilterProp | Which prop value of option will be used for filter if filterOption is true. <br/> If `options` is set, it should be set to `label`. <br/> When a string[] is provided, multiple fields are searched using OR matching. | string \| string[] | `value` | `string[]`: 6.1.0 |
| searchValue | The current input "search" text | string | - |  |
| onSearch | Callback function that is fired when input changed | function(value: string) | - |  |

### Select Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

### Option props

| Property  | Description                          | Type             | Default | Version |
| --------- | ------------------------------------ | ---------------- | ------- | ------- |
| className | The additional class to option       | string           | -       |         |
| disabled  | Disable this option                  | boolean          | false   |         |
| title     | `title` attribute of Select Option   | string           | -       |         |
| value     | Default to filter with this property | string \| number | -       |         |

### OptGroup props

| Property  | Description                        | Type            | Default | Version |
| --------- | ---------------------------------- | --------------- | ------- | ------- |
| key       | Group key                          | string          | -       |         |
| label     | Group label                        | React.ReactNode | -       |         |
| className | The additional class to option     | string          | -       |         |
| title     | `title` attribute of Select Option | string          | -       |         |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Select"></ComponentTokenTable>

## FAQ

### Why sometimes search will show 2 same option when in `tags` mode? {#faq-tags-mode-duplicate}

It's caused by option with different `label` and `value`. You can use `optionFilterProp="label"` to change filter logic instead.

### When I click elements in popupRender, the select dropdown will not be closed? {#faq-popup-not-close}

You can control it by `open` prop: [codesandbox](https://codesandbox.io/s/ji-ben-shi-yong-antd-4-21-7-forked-gnp4cy?file=/demo.js).

### I don't want dropdown close when click inside `popupRender`? {#faq-popup-keep-open}

Select will close when it lose focus. You can prevent event to handle this:

```tsx
<Select
  popupRender={() => (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      Some Content
    </div>
  )}
/>
```

### Why sometimes customize Option cause scroll break? {#faq-custom-option-scroll}

Virtual scroll internal set item height as `24px`. You need to adjust `listItemHeight` when your option height is less and `listHeight` config list container height:

```tsx
<Select listItemHeight={10} listHeight={250} />
```

Note: `listItemHeight` and `listHeight` are internal props. Please only modify when necessary.

### Why a11y test report missing `aria-` props? {#faq-aria-attribute}

Select only create a11y auxiliary node when operating on. Please open Select and retry. For `aria-label` & `aria-labelledby` miss warning, please add related prop to Select with your own requirement.

Default virtual scrolling will create a mock element to simulate an accessible binding. If a screen reader needs to fully access the entire list, you can set `virtual={false}` to disable virtual scrolling and the accessibility option will be bound to the actual element.

### Custom tags generated using `tagRender` will pop up a drop-down box when clicked to close {#faq-tagrender-dropdown}

If you don't want a drop-down menu to appear automatically after clicking on an element (such as a close icon), you can prevent the `MouseDown` event from propagating on it.

```tsx
<Select
  tagRender={(props) => {
    const { closable, label, onClose } = props;
    return (
      <span className="border">
        {label}
        {closable ? (
          <span
            onMouseDown={(e) => e.stopPropagation()}
            onClick={onClose}
            className="cursor-pointer"
          >
            ❎
          </span>
        ) : null}
      </span>
    );
  }}
/>
```


============================================================
 COMPONENT: RADIO
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/radio/index.en-US.md
============================================================

## When To Use

- Used to select a single state from multiple options.
- The difference from Select is that Radio is visible to the user and can facilitate the comparison of choice, which means there shouldn't be too many of them.

```tsx
// When use Radio.Group, recommended ✅
return (
  <Radio.Group
    value={value}
    options={[
      { value: 1, label: 'A' },
      { value: 2, label: 'B' },
      { value: 3, label: 'C' },
    ]}
  />
);

// No recommended 🙅🏻‍♀️
return (
  <Radio.Group value={value}>
    <Radio value={1}>A</Radio>
    <Radio value={2}>B</Radio>
    <Radio value={3}>C</Radio>
  </Radio.Group>
);
```

## Examples

<!-- prettier-ignore-start -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/disabled.tsx">disabled</code>
<code src="./demo/radiogroup.tsx">Radio Group</code>
<code src="./demo/radiogroup-more.tsx">Vertical Radio.Group</code>
<code src="./demo/radiogroup-block.tsx" version="5.21.0">Block Radio.Group</code>
<code src="./demo/radiogroup-options.tsx">Radio.Group group - optional</code>
<code src="./demo/radiobutton.tsx">radio style</code>
<code src="./demo/radiogroup-with-name.tsx">Radio.Group with name</code>
<code src="./demo/size.tsx">Size</code>
<code src="./demo/radiobutton-solid.tsx">Solid radio button</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/badge.tsx" debug>Badge style</code>
<code src="./demo/wireframe.tsx" debug>Wireframe</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/debug-upload.tsx" debug>Upload Debug</code>
<!-- prettier-ignore-end -->

## API

Common props ref：[Common props](/docs/react/common-props)

### Radio/Radio.Button

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checked | Specifies whether the radio is selected | boolean | false |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - | 6.0.0 |
| defaultChecked | Specifies the initial state: whether or not the radio is selected | boolean | false |  |
| disabled | Disable radio | boolean | false |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | 6.0.0 |
| value | According to value for comparison, to determine whether the selected | any | - |  |

### Radio.Group

Radio group can wrap a group of `Radio`.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| block | Option to fit RadioGroup width to its parent width | boolean | false | 5.21.0 |
| buttonStyle | The style type of radio button | `outline` \| `solid` | `outline` |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - | 6.0.0 |
| defaultValue | Default selected value | any | - |  |
| disabled | Disable all radio buttons | boolean | false |  |
| name | The `name` property of all `input[type="radio"]` children. If not set, it will fallback to a randomly generated name | string | - |  |
| options | Set children optional | string\[] \| number\[] \| Array&lt;[CheckboxOptionType](#checkboxoptiontype)> | - |  |
| optionType | Set Radio optionType | `default` \| `button` | `default` | 4.4.0 |
| orientation | Orientation | `horizontal` \| `vertical` | `horizontal` |  |
| size | The size of radio button style | `large` \| `middle` \| `small` | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | 6.0.0 |
| value | Used for setting the currently selected value | any | - |  |
| vertical | If true, the Radio group will be vertical. Simultaneously existing with `orientation`, `orientation` takes priority | boolean | false |  |
| onChange | The callback function that is triggered when the state changes | function(e:Event) | - |  |

### CheckboxOptionType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| label | The text used to display as the Radio option | `string` | - | 4.4.0 |
| value | The value associated with the Radio option | `string` \| `number` \| `boolean` | - | 4.4.0 |
| style | The style to apply to the Radio option | `React.CSSProperties` | - | 4.4.0 |
| className | className of the Radio option | `string` | - | 5.25.0 |
| disabled | Specifies whether the Radio option is disabled | `boolean` | `false` | 4.4.0 |
| title | Adds the Title attribute value | `string` | - | 4.4.0 |
| id | Adds the Radio Id attribute value | `string` | - | 4.4.0 |
| onChange | Triggered when the value of the Radio Group changes | `(e: CheckboxChangeEvent) => void;` | - | 4.4.0 |
| required | Specifies whether the Radio option is required | `boolean` | `false` | 4.4.0 |

## Methods

### Radio

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Radio"></ComponentTokenTable>


============================================================
 COMPONENT: CHECKBOX
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/checkbox/index.en-US.md
============================================================

## When To Use

- Used for selecting multiple values from several options.
- If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/controller.tsx">Controlled Checkbox</code>
<code src="./demo/group.tsx">Checkbox Group</code>
<code src="./demo/check-all.tsx">Check all</code>
<code src="./demo/layout.tsx">Use with Grid</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/debug-line.tsx" debug>Same line</code>
<code src="./demo/debug-disable-popover.tsx" debug>Disabled to show Tooltip</code>
<code src="./demo/custom-line-width.tsx" debug>customize lineWidth</code>

## API

Common props ref：[Common props](/docs/react/common-props)

#### Checkbox

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checked | Specifies whether the checkbox is selected | boolean | false |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultChecked | Specifies the initial state: whether or not the checkbox is selected | boolean | false |  |
| disabled | If disable checkbox | boolean | false |  |
| indeterminate | The indeterminate checked state of checkbox | boolean | false |  |
| onChange | The callback function that is triggered when the state changes | (e: CheckboxChangeEvent) => void | - |  |
| onBlur | Called when leaving the component | function() | - |  |
| onFocus | Called when entering the component | function() | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |

#### Checkbox.Group

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | Default selected value | (string \| number)\[] | \[] |  |
| disabled | If disable all checkboxes | boolean | false |  |
| name | The `name` property of all `input[type="checkbox"]` children | string | - |  |
| options | Specifies options | string\[] \| number\[] \| Option\[] | \[] |  |
| value | Used for setting the currently selected value | (string \| number \| boolean)\[] | \[] |  |
| title | title of the option | `string` | - |  |
| className | className of the option | `string` | - | 5.25.0 |
| style | styles of the option | `React.CSSProperties` | - |  |
| onChange | The callback function that is triggered when the state changes | (checkedValue: T[]) => void | - |  |

##### Option

```typescript
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}
```

### Methods

#### Checkbox

| Name          | Description                          | Version |
| ------------- | ------------------------------------ | ------- |
| blur()        | Remove focus                         |         |
| focus()       | Get focus                            |         |
| nativeElement | Returns the DOM node of the Checkbox | 5.17.3  |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Checkbox"></ComponentTokenTable>

## FAQ

### Why not work in Form.Item? {#faq-form-item-limitations}

Form.Item default bind value to `value` property, but Checkbox value property is `checked`. You can use `valuePropName` to change bind property.

```tsx | pure
<Form.Item name="fieldA" valuePropName="checked">
  <Checkbox />
</Form.Item>
```


============================================================
 COMPONENT: DATE-PICKER
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/date-picker/index.en-US.md
============================================================

## When To Use

By clicking the input box, you can select a date from a popup calendar.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/range-picker.tsx">Range Picker</code>
<code src="./demo/multiple.tsx" version="5.14.0">Multiple</code>
<code src="./demo/multiple-debug.tsx" debug>Multiple Debug</code>
<code src="./demo/needConfirm.tsx" version="5.14.0">Need Confirm</code>
<code src="./demo/switchable.tsx">Switchable picker</code>
<code src="./demo/format.tsx">Date Format</code>
<code src="./demo/time.tsx">Choose Time</code>
<code src="./demo/mask.tsx" version="5.14.0">Mask Format</code>
<code src="./demo/date-range.tsx" version="5.14.0">Limit Date Range</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/disabled-date.tsx">Disabled Date & Time</code>
<code src="./demo/allow-empty.tsx">Allow Empty</code>
<code src="./demo/select-in-range.tsx">Select range dates</code>
<code src="./demo/preset-ranges.tsx">Preset Ranges</code>
<code src="./demo/extra-footer.tsx">Extra Footer</code>
<code src="./demo/size.tsx">Three Sizes</code>
<code src="./demo/cell-render.tsx">Customized Cell Rendering</code>
<code src="./demo/components.tsx" version="5.14.0">Customize Panel</code>
<code src="./demo/external-panel.tsx">External use panel</code>
<code src="./demo/buddhist-era.tsx" version="5.14.0">Buddhist Era</code>
<code src="./demo/status.tsx">Status</code>
<code src="./demo/variant.tsx" version="5.13.0">Variants</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/filled-debug.tsx" debug>Filled Debug</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/mode.tsx" debug>Controlled Panels</code>
<code src="./demo/start-end.tsx" debug>Customized Range Picker</code>
<code src="./demo/suffix.tsx">Prefix and Suffix</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/suffixIcon-debug.tsx" debug>suffixIcon</code>

## API

Common props ref：[Common props](/docs/react/common-props)

There are five kinds of picker:

- DatePicker
- DatePicker\[picker="month"]
- DatePicker\[picker="week"]
- DatePicker\[picker="year"]
- DatePicker\[picker="quarter"] (Added in 4.1.0)
- RangePicker

### Localization

The default locale is en-US, if you need to use other languages, recommend to use internationalized components provided by us at the entrance. Look at: [ConfigProvider](https://ant.design/components/config-provider/).

If there are special needs (only modifying single component language), Please use the property: local. Example: [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json).

```jsx
// The default locale is en-US, if you want to use other locale, just set locale in entry file globally.
// Make sure you import the relevant dayjs file as well, otherwise the locale won't change for all texts (e.g. range picker months)

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

<ConfigProvider locale={locale}>
  <DatePicker defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')} />
</ConfigProvider>;
```

<!-- prettier-ignore -->
:::warning
When use with Next.js App Router, make sure to add `'use client'` before import locale file of dayjs. It's because all components of Ant Design only works in client, importing locale in RSC will not work.
:::

### Common API

The following APIs are shared by DatePicker, RangePicker.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Customize clear button | boolean \| { clearIcon?: ReactNode } | true | 5.8.0: Support object type |
| className | The picker className | string | - |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| dateRender | Custom rendering function for date cells, >= 5.4.0 use `cellRender` instead. | function(currentDate: dayjs, today: dayjs) => React.ReactNode | - | < 5.4.0 |
| cellRender | Custom rendering function for picker cells | (current: dayjs, info: { originNode: React.ReactElement,today: DateType, range?: 'start' \| 'end', type: PanelMode, locale?: Locale, subType?: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| components | Custom panels | Record<Panel \| 'input', React.ComponentType> | - | 5.14.0 |
| defaultOpen | Initial open state of picker | boolean | - |  |
| disabled | Determine whether the DatePicker is disabled | boolean | false |  |
| disabledDate | Specify the date that cannot be selected | (currentDate: dayjs, info: { from?: dayjs, type: Picker }) => boolean | - | `info`: 5.14.0 |
| format | To set the date format, support multi-format matching when it is an array, display the first one shall prevail. refer to [dayjs#format](https://day.js.org/docs/en/display/format). for example: [Custom Format](#date-picker-demo-format) | [formatType](#formattype) | [@rc-component/picker](https://github.com/react-component/picker/blob/f512f18ed59d6791280d1c3d7d37abbb9867eb0b/src/utils/uiUtil.ts#L155-L177) |  |
| order | Auto order date when multiple or range selection | boolean | true | 5.14.0 |
| ~~popupClassName~~ | To customize the className of the popup calendar, use `classNames.popup.root` instead | string | - | 4.23.0 |
| preserveInvalidOnBlur | Not clean input on blur even when the typing is invalidate | boolean | false | 5.14.0 |
| getPopupContainer | To set the container of the floating layer, while the default is to create a `div` element in `body` | function(trigger) | - |  |
| inputReadOnly | Set the `readonly` attribute of the input tag (avoids virtual keyboard on touch devices) | boolean | false |  |
| locale | Localization configuration | object | [default](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json) |  |
| minDate | The minimum date, which also limits the range of panel switching | dayjs | - | 5.14.0 |
| maxDate | The maximum date, which also limits the range of panel switching | dayjs | - | 5.14.0 |
| mode | The picker panel mode（ [Cannot select year or month anymore?](/docs/react/faq#when-set-mode-to-datepickerrangepicker-cannot-select-year-or-month-anymore) ) | `time` \| `date` \| `month` \| `year` \| `decade` | - |  |
| needConfirm | Need click confirm button to trigger value change. Default `false` when `multiple` | boolean | - | 5.14.0 |
| nextIcon | The custom next icon | ReactNode | - | 4.17.0 |
| open | The open state of picker | boolean | - |  |
| panelRender | Customize panel render | (panelNode) => ReactNode | - | 4.5.0 |
| picker | Set picker type | `date` \| `week` \| `month` \| `quarter` \| `year` | `date` | `quarter`: 4.1.0 |
| placeholder | The placeholder of date input | string \| \[string,string] | - |  |
| placement | The position where the selection box pops up | `bottomLeft` `bottomRight` `topLeft` `topRight` | bottomLeft |  |
| ~~popupStyle~~ | To customize the style of the popup calendar, use `styles.popup.root` instead | CSSProperties | {} |  |
| prefix | The custom prefix | ReactNode | - | 5.22.0 |
| presets | The preset ranges for quick selection, Since `5.8.0`, preset value supports callback function. | { label: React.ReactNode, value: Dayjs \| (() => Dayjs) }\[] | - |  |
| prevIcon | The custom prev icon | ReactNode | - | 4.17.0 |
| previewValue | When the user selects the date hover option, the value of the input field undergoes a temporary change | false \| hover | hover | 6.0.0 |
| size | To determine the size of the input box, the height of `large` and `small`, are 40px and 24px respectively, while default size is 32px | `large` \| `middle` \| `small` | - |  |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| style | To customize the style of the input box | CSSProperties | {} |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| suffixIcon | The custom suffix icon | ReactNode | - |  |
| superNextIcon | The custom super next icon | ReactNode | - | 4.17.0 |
| superPrevIcon | The custom super prev icon | ReactNode | - | 4.17.0 |
| variant | Variants of picker | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| onOpenChange | Callback function, can be executed whether the popup calendar is popped up or closed | function(open) | - |  |
| onPanelChange | Callback when picker panel mode is changed | function(value, mode) | - |  |

### Common Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

### DatePicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultPickerValue | Default panel date, will be reset when panel open | [dayjs](https://day.js.org/) | - | 5.14.0 |
| defaultValue | To set default date, if start time or end time is null or undefined, the date range will be an open interval | [dayjs](https://day.js.org/) | - |  |
| disabledTime | To specify the time that cannot be selected | function(date) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-MM-DD` |  |
| multiple | Enable multiple selection. Not support `showTime` | boolean | false | 5.14.0 |
| pickerValue | Panel date. Used for controlled switching of panel date. Work with `onPanelChange` | [dayjs](https://day.js.org/) | - | 5.14.0 |
| renderExtraFooter | Render extra footer in panel | (mode) => React.ReactNode | - |  |
| showNow | Show the fast access of current datetime | boolean | - | 4.4.0 |
| showTime | To provide an additional time selection | object \| boolean | [TimePicker Options](/components/time-picker/#api) |  |
| ~~showTime.defaultValue~~ | Use `showTime.defaultOpenValue` instead | [dayjs](https://day.js.org/) | dayjs() | 5.27.3 |
| showTime.defaultOpenValue | To set default time of selected date, [demo](#date-picker-demo-disabled-date) | [dayjs](https://day.js.org/) | dayjs() |  |
| showWeek | Show week info when in DatePicker | boolean | false | 5.14.0 |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs \| null, dateString: string \| null) | - |  |
| onOk | Callback when click ok button | function() | - |  |
| onPanelChange | Callback function for panel changing | function(value, mode) | - |  |

### DatePicker\[picker=year]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY` |  |
| multiple | Enable multiple selection | boolean | false | 5.14.0 |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs \| null, dateString: string \| null) | - |  |

### DatePicker\[picker=quarter]

Added in `4.1.0`.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-\QQ` |  |
| multiple | Enable multiple selection | boolean | false | 5.14.0 |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs \| null, dateString: string \| null) | - |  |

### DatePicker\[picker=month]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-MM` |  |
| multiple | Enable multiple selection | boolean | false | 5.14.0 |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs \| null, dateString: string \| null) | - |  |

### DatePicker\[picker=week]

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultValue | To set default date | [dayjs](https://day.js.org/) | - |  |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-wo` |  |
| multiple | Enable multiple selection | boolean | false | 5.14.0 |
| renderExtraFooter | Render extra footer in panel | (mode) => React.ReactNode | - |  |
| value | To set date | [dayjs](https://day.js.org/) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(date: dayjs \| null, dateString: string \| null) | - |  |
| showWeek | Show week info when in DatePicker | boolean | true | 5.14.0 |

### RangePicker

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowEmpty | Allow start or end input leave empty | \[boolean, boolean] | \[false, false] |  |
| cellRender | Custom rendering function for picker cells | (current: dayjs, info: { originNode: React.ReactElement,today: DateType, range?: 'start' \| 'end', type: PanelMode, locale?: Locale, subType?: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| dateRender | Custom rendering function for date cells, >= 5.4.0 use `cellRender` instead. | function(currentDate: dayjs, today: dayjs) => React.ReactNode | - | < 5.4.0 |
| defaultPickerValue | Default panel date, will be reset when panel open | [dayjs](https://day.js.org/) | - | 5.14.0 |
| defaultValue | To set default date | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  |
| disabled | If disable start or end | \[boolean, boolean] | - |  |
| disabledTime | To specify the time that cannot be selected | function(date: dayjs, partial: `start` \| `end`, info: { from?: dayjs }) | - | `info.from`: 5.17.0 |
| format | To set the date format. refer to [dayjs#format](https://day.js.org/docs/en/display/format) | [formatType](#formattype) | `YYYY-MM-DD HH:mm:ss` |  |
| id | Config input ids | { start?: string, end?: string } | - | 5.14.0 |
| pickerValue | Panel date. Used for controlled switching of panel date. Work with `onPanelChange` | [dayjs](https://day.js.org/) | - | 5.14.0 |
| presets | The preset ranges for quick selection, Since `5.8.0`, preset value supports callback function. | { label: React.ReactNode, value: (Dayjs \| (() => Dayjs))\[] }\[] | - |  |
| renderExtraFooter | Render extra footer in panel | () => React.ReactNode | - |  |
| separator | Set separator between inputs | React.ReactNode | `<SwapRightOutlined />` |  |
| showTime | To provide an additional time selection | object \| boolean | [TimePicker Options](/components/time-picker/#api) |  |
| ~~showTime.defaultValue~~ | Use `showTime.defaultOpenValue` instead | [dayjs](https://day.js.org/)\[] | \[dayjs(), dayjs()] | 5.27.3 |
| showTime.defaultOpenValue | To set default time of selected date, [demo](#date-picker-demo-disabled-date) | [dayjs](https://day.js.org/)\[] | \[dayjs(), dayjs()] |  |
| value | To set date | \[[dayjs](https://day.js.org/), [dayjs](https://day.js.org/)] | - |  |
| onCalendarChange | Callback function, can be executed when the start time or the end time of the range is changing. `info` argument is added in 4.4.0 | function(dates: \[dayjs, dayjs], dateStrings: \[string, string], info: { range:`start`\|`end` }) | - |  |
| onChange | Callback function, can be executed when the selected time is changing | function(dates: \[dayjs, dayjs] \| null, dateStrings: \[string, string] \| null) | - |  |
| onFocus | Trigger when get focus | function(event, { range: 'start' \| 'end' }) | - | `range`: 5.14.0 |
| onBlur | Trigger when lose focus | function(event, { range: 'start' \| 'end' }) | - | `range`: 5.14.0 |

#### formatType

```typescript

type Generic = string;
type GenericFn = (value: Dayjs) => string;

export type FormatType =
  | Generic
  | GenericFn
  | Array<Generic | GenericFn>
  | {
      format: string;
      type?: 'mask';
    };
```

Note: `type` is added in `5.14.0`.

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="DatePicker"></ComponentTokenTable>

## FAQ

### When set mode to DatePicker/RangePicker, cannot select year or month anymore? {#faq-mode-cannot-select}

Please refer [FAQ](/docs/react/faq#when-set-mode-to-datepickerrangepicker-cannot-select-year-or-month-anymore)

### Why does the date picker switch to the date panel after selecting the year instead of the month panel? {#faq-year-to-date-panel}

After selecting the year, the system directly switches to the date panel instead of month panel. This design is intended to reduce the user's operational burden by allowing them to complete the year modification with just one click, without having to enter the month selection interface again. At the same time, it also avoids additional cognitive burden of remembering the month.

### How to use DatePicker with customize date library like dayjs? {#faq-custom-date-library}

Please refer [Use custom date library](/docs/react/use-custom-date-library#datepicker)

### Why config dayjs.locale globally not work? {#faq-locale-not-work}

DatePicker default set `locale` as `en` in v4. You can config DatePicker `locale` prop or [ConfigProvider `locale`](/components/config-provider) prop instead.

#### Date-related components locale is not working?

See FAQ [Date-related-components-locale-is-not-working?](/docs/react/faq#date-related-components-locale-is-not-working)

### How to modify start day of week? {#faq-week-start-day}

Please use correct [language](/docs/react/i18n) ([#5605](https://github.com/ant-design/ant-design/issues/5605)), or update dayjs `locale` config:

- Example: <https://codesandbox.io/s/dayjs-day-of-week-x9tuj2?file=/demo.tsx>

```js

import 'dayjs/locale/zh-cn';

dayjs.extend(updateLocale);
dayjs.updateLocale('zh-cn', {
  weekStart: 0,
});
```

### Why origin panel don't switch when using `panelRender`? {#faq-panel-render-switch}

When you change the layout of nodes by `panelRender`, React will unmount and re-mount it which reset the component state. You should keep the layout stable. Please ref [#27263](https://github.com/ant-design/ant-design/issues/27263) for more info.

### How to understand disabled time and date? {#faq-disabled-date-time}

Please refer to the blog ['Why is it so hard to disable the date?'](/docs/blog/picker), to learn how to use it.


============================================================
 COMPONENT: UPLOAD
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/upload/index.en-US.md
============================================================

## When To Use

Uploading is the process of publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool.

- When you need to upload one or more files.
- When you need to show the process of uploading.
- When you need to upload files by dragging and dropping.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Upload by clicking</code>
<code src="./demo/avatar.tsx">Avatar</code>
<code src="./demo/defaultFileList.tsx">Default Files</code>
<code src="./demo/picture-card.tsx">Pictures Wall</code>
<code src="./demo/picture-circle.tsx">Pictures with picture-circle type</code>
<code src="./demo/fileList.tsx">Complete control over file list</code>
<code src="./demo/drag.tsx">Drag and Drop</code>
<code src="./demo/paste.tsx" version="5.25.0">Paste</code>
<code src="./demo/directory.tsx">Upload directory</code>
<code src="./demo/upload-manually.tsx">Upload manually</code>
<code src="./demo/upload-png-only.tsx">Upload png file only</code>
<code src="./demo/picture-style.tsx">Pictures with list style</code>
<code src="./demo/preview-file.tsx">Customize preview file</code>
<code src="./demo/max-count.tsx">Max Count</code>
<code src="./demo/transform-file.tsx">Transform file before request</code>
<code src="./demo/upload-with-aliyun-oss.tsx">Aliyun OSS</code>
<code src="./demo/file-type.tsx" debug>custom show icon</code>
<code src="./demo/upload-custom-action-icon.tsx">Custom action icon and extra info</code>
<code src="./demo/drag-sorting.tsx">Drag sorting of uploadList</code>
<code src="./demo/crop-image.tsx">Crop image before uploading</code>
<code src="./demo/customize-progress-bar.tsx">Customize Progress Bar</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/debug-disabled.tsx" debug>Debug Disabled Styles</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| accept | File types that can be accepted. See [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string \| [AcceptObject](#acceptobject) | - |  |
| action | Uploading URL | string \| (file) => Promise&lt;string> | - |  |
| beforeUpload | Hook function which will be executed before uploading. Uploading will be stopped with `false` or a rejected Promise returned. When returned value is `Upload.LIST_IGNORE`, the list of files that have been uploaded will ignore it. **Warning：this function is not supported in IE9** | (file: [RcFile](#rcfile), fileList: [RcFile[]](#rcfile)) => boolean \| Promise&lt;File> \| `Upload.LIST_IGNORE` | - |  |
| customRequest | Override for the default xhr behavior allowing for additional customization and the ability to implement your own XMLHttpRequest | ( options: [RequestOptions](#request-options), info: { defaultRequest: (option: [RequestOptions](#request-options)) => void; } ) => void | - | defaultRequest: 5.28.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| data | Uploading extra params or function which can return uploading extra params | object \| (file) => object \| Promise&lt;object> | - |  |
| defaultFileList | Default list of files that have been uploaded | object\[] | - |  |
| directory | Support upload whole directory ([caniuse](https://caniuse.com/#feat=input-file-directory)) | boolean | false |  |
| disabled | Disable upload button | boolean | false | When customizing Upload children, please pass the disabled attribute to the child node at the same time to ensure the disabled rendering effect is consistent. |
| fileList | List of files that have been uploaded (controlled). Here is a common issue [#2423](https://github.com/ant-design/ant-design/issues/2423) when using it | [UploadFile](#uploadfile)\[] | - |  |
| headers | Set request headers, valid above IE10 | object | - |  |
| iconRender | Custom show icon | (file: UploadFile, listType?: UploadListType) => ReactNode | - |  |
| isImageUrl | Customize if render &lt;img /> in thumbnail | (file: UploadFile) => boolean | [(inside implementation)](https://github.com/ant-design/ant-design/blob/4ad5830eecfb87471cd8ac588c5d992862b70770/components/upload/utils.tsx#L47-L68) |  |
| itemRender | Custom item of uploadList | (originNode: ReactElement, file: UploadFile, fileList: object\[], actions: { download: function, preview: function, remove: function }) => React.ReactNode | - | 4.16.0 |
| listType | Built-in stylesheets, support for four types: `text`, `picture`, `picture-card` or `picture-circle` | string | `text` | `picture-circle`(5.2.0+) |
| maxCount | Limit the number of uploaded files. Will replace current one when `maxCount` is `1` | number | - | 4.10.0 |
| method | The http method of upload request | string | `post` |  |
| multiple | Whether to support selected multiple files. `IE10+` supported. You can select multiple files with CTRL holding down while multiple is set to be true | boolean | false |  |
| name | The name of uploading file | string | `file` |  |
| openFileDialogOnClick | Click open file dialog | boolean | true |  |
| pastable | Support paste file | boolean | false | 5.25.0 |
| previewFile | Customize preview file logic | (file: File \| Blob) => Promise&lt;dataURL: string> | - |  |
| progress | Custom progress bar | [ProgressProps](/components/progress/#api) (support `type="line"` only) | { strokeWidth: 2, showInfo: false } | 4.3.0 |
| showUploadList | Whether to show default upload list, could be an object to specify `extra`, `showPreviewIcon`, `showRemoveIcon`, `showDownloadIcon`, `removeIcon` and `downloadIcon` individually | boolean \| { extra?: ReactNode \| (file: UploadFile) => ReactNode, showPreviewIcon?: boolean \| (file: UploadFile) => boolean, showDownloadIcon?: boolean \| (file: UploadFile) => boolean, showRemoveIcon?: boolean \| (file: UploadFile) => boolean, previewIcon?: ReactNode \| (file: UploadFile) => ReactNode, removeIcon?: ReactNode \| (file: UploadFile) => ReactNode, downloadIcon?: ReactNode \| (file: UploadFile) => ReactNode } | true | `extra`: 5.20.0, `showPreviewIcon` function: 5.21.0, `showRemoveIcon` function: 5.21.0, `showDownloadIcon` function: 5.21.0 |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| withCredentials | The ajax upload with cookie sent | boolean | false |  |
| onChange | A callback function, can be executed when uploading state is changing. It will trigger by every uploading phase. see [onChange](#onchange) | function | - |  |
| onDrop | A callback function executed when files are dragged and dropped into the upload area | (event: React.DragEvent) => void | - | 4.16.0 |
| onDownload | Click the method to download the file, pass the method to perform the method logic, and do not pass the default jump to the new TAB | function(file): void | (Jump to new TAB) |  |
| onPreview | A callback function, will be executed when the file link or preview icon is clicked | function(file) | - |  |
| onRemove | A callback function, will be executed when removing file button is clicked, remove event will be prevented when the return value is false or a Promise which resolve(false) or reject | function(file): boolean \| Promise | - |  |

## Interface

### RcFile

Extends [File](https://developer.mozilla.org/en-US/docs/Web/API/File).

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| uid | unique id. Will auto-generate when not provided | string | - | - |
| lastModifiedDate | A Date object indicating the date and time at which the file was last modified | date | - | - |

### UploadFile

Extends [File](https://developer.mozilla.org/en-US/docs/Web/API/File) with additional props.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| crossOrigin | CORS settings attributes | `'anonymous'` \| `'use-credentials'` \| `''` | - | 4.20.0 |
| name | File name | string | - | - |
| percent | Upload progress percent | number | - | - |
| status | Upload status. Show different style when configured | `error` \| `done` \| `uploading` \| `removed` | - | - |
| thumbUrl | Thumb image url | string | - | - |
| uid | unique id. Will auto-generate when not provided | string | - | - |
| url | Download url | string | - | - |

### RequestOptions {#request-options}

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| action | Uploading URL | string | - | - |
| data | Uploading extra params or function which can return uploading extra params | Record<string, unknown> | - | 4.20.0 |
| filename | file name | string | - | - |
| file | File object containing upload information | [UploadFile](#uploadfile) | - | - |
| withCredentials | The ajax upload with cookie sent | boolean | - | - |
| headers | Set request headers, valid above IE10 | Record<string, string> | - | - |
| method | The http method of upload request | string | - | - |
| onProgress | Progress event callback | (event: object, file: UploadFile) => void | - | - |
| onError | Error callback when upload fails | (event: object, body?: object) => void | - | - |
| onSuccess | Success callback when upload completes | (body: object, fileOrXhr?: UploadFile \| XMLHttpRequest) => void | - | - |

### onChange

> 💡 The function will be called when uploading is in progress, completed, or failed.

When uploading state change, it returns:

```jsx
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```

1. `file` File object for the current operation.

   ```jsx
   {
      uid: 'uid',      // unique identifier, negative is recommended, to prevent interference with internally generated id
      name: 'xx.png',   // file name
      status: 'done' | 'uploading' | 'error' | 'removed', // Intercepted file by beforeUpload doesn't have a status field.
      response: '{"status": "success"}', // response from server
      linkProps: '{"download": "image"}', // additional HTML props of file link
      xhr: 'XMLHttpRequest{ ... }', // XMLHttpRequest Header
   }
   ```

2. `fileList` current list of files

3. `event` response from the server, including uploading progress, supported by advanced browsers.

### AcceptObject

```typescript
{
  format: string;
  filter?: 'native' | ((file: RcFile) => boolean);
}
```

Configuration object for file type acceptance rules.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| format | Accepted file types, same as native input accept attribute. Supports MIME types, file extensions, etc. See [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string | - |  |
| filter | File filtering rule. When set to `'native'`, uses browser native filtering behavior; when set to a function, allows custom filtering logic. Function returns `true` to accept the file, `false` to reject | `'native'` \| `(file: RcFile) => boolean` | - |  |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Upload"></ComponentTokenTable>

## FAQ

### How do I implement upload server side? {#faq-server-implement}

- You can consult [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload/wiki#server-side) about how to implement server side upload interface.
- There is a mock example of [express](https://github.com/react-component/upload/blob/211979fdaa2c7896b6496df7061a0cfc0fc5434e/server.js) in rc-upload.

### I want to display download links. {#faq-show-download-link}

Please set property `url` of each item in `fileList` to control the content of the link.

### How to use `customRequest`? {#faq-custom-request}

See <https://github.com/react-component/upload#customrequest>.

### Why will the `fileList` that's in control not trigger `onChange` `status` update when the file is not in the list? {#faq-filelist-controlled-status}

`onChange` will only trigger when the file is in the list, it will ignore any events removed from the list. Please note that there does exist a bug which makes an event still trigger even when the file is not in the list before `4.13.0`.

### Why does `onChange` sometimes return File object and other times return { originFileObj: File }? {#faq-on-change-return-type}

For compatible case, we return File object when `beforeUpload` return `false`. It will merge to `{ originFileObj: File }` in the next major version. Current version is compatible to get origin file by `info.file.originFileObj`. You can change this before a major release.

### Why sometimes Chrome can not upload? {#faq-chrome-file-picker}

Chrome update will also break native upload. Please restart Chrome to finish the upload job.

<img alt="click restart button on Chrome" src="https://github.com/ant-design/ant-design/assets/507615/1509b25f-4cd3-41b2-9415-90394ad08273" width="800" />

Ref:

- [#48007](https://github.com/ant-design/ant-design/issues/48007)
- [#32672](https://github.com/ant-design/ant-design/issues/32672)
- [#32913](https://github.com/ant-design/ant-design/issues/32913)
- [#33988](https://github.com/ant-design/ant-design/issues/33988)

### Can still select files when uploading a folder in Safari? {#faq-safari-folder-upload}

Inside the upload component, we use the `directory` and `webkitdirectory` properties to control the input to implement folder selection, but it seems that in Safari's implementation, [it doesn't prevent users from selecting files](https://stackoverflow.com/q/55649945/3040605). You can solve this issue through `accept` configuration, for example:

```tsx
accept = {
  // Do not allow selecting any files
  format: `.${'n'.repeat(100)}`,
  // Accept all files within the folder after folder selection
  filter: () => true,
};
```


============================================================
 COMPONENT: SWITCH
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/switch/index.en-US.md
============================================================

## When To Use

- If you need to represent the switching between two states or on-off state.
- The difference between `Switch` and `Checkbox` is that `Switch` will trigger a state change directly when you toggle it, while `Checkbox` is generally used for state marking, which should work in conjunction with submit operation.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/text.tsx">Text & icon</code>
<code src="./demo/size.tsx">Two sizes</code>
<code src="./demo/loading.tsx">Loading</code>
<code src="./demo/component-token.tsx" debug>Custom component token</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checked | Determine whether the Switch is checked | boolean | false |  |
| checkedChildren | The content to be shown when the state is checked | ReactNode | - |  |
| className | The additional class to Switch | string | - |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |
| defaultChecked | Whether to set the initial state | boolean | false |  |
| defaultValue | Alias for `defaultChecked` | boolean | - | 5.12.0 |
| disabled | Disable switch | boolean | false |  |
| loading | Loading state of switch | boolean | false |  |
| size | The size of the Switch, options: `default` `small` | string | `default` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |
| unCheckedChildren | The content to be shown when the state is unchecked | ReactNode | - |  |
| value | Alias for `checked` | boolean | - | 5.12.0 |
| onChange | Trigger when the checked state is changing | function(checked: boolean, event: Event) | - |  |
| onClick | Trigger when clicked | function(checked: boolean, event: Event) | - |  |

## Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Switch"></ComponentTokenTable>

## FAQ

### Why not work in Form.Item? {#faq-binding-data}

Form.Item default bind value to `value` property, but Switch value property is `checked`. You can use `valuePropName` to change bind property.

```tsx | pure
<Form.Item name="fieldA" valuePropName="checked">
  <Switch />
</Form.Item>
```


============================================================
 COMPONENT: INPUT-NUMBER
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/input-number/index.en-US.md
============================================================

## When To Use

When a numeric value needs to be provided.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/size.tsx">Sizes</code>
<code src="./demo/addon.tsx" debug>Pre / Post tab</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/digit.tsx">High precision decimals</code>
<code src="./demo/formatter.tsx">Formatter</code>
<code src="./demo/keyboard.tsx">Keyboard</code>
<code src="./demo/change-on-wheel.tsx" version="5.14.0">Wheel</code>
<code src="./demo/variant.tsx" version="5.13.0">Variants</code>
<code src="./demo/spinner.tsx" version="6.0.0">Spinner</code>
<code src="./demo/filled-debug.tsx" debug>Filled Debug</code>
<code src="./demo/out-of-range.tsx">Out of range</code>
<code src="./demo/presuffix.tsx">Prefix / Suffix</code>
<code src="./demo/status.tsx">Status</code>
<code src="./demo/focus.tsx" version="5.22.0">Focus</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/controls.tsx" debug>Icon</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/debug-token.tsx" debug>Override Component Style</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| ~~addonAfter~~ | The label text displayed after (on the right side of) the input field, please use Space.Compact instead | ReactNode | - |  |
| ~~addonBefore~~ | The label text displayed before (on the left side of) the input field, please use Space.Compact instead | ReactNode | - |  |
| changeOnBlur | Trigger `onChange` when blur. e.g. reset value in range by blur | boolean | true | 5.11.0 |
| changeOnWheel | Allows control with mouse wheel | boolean | - | 5.14.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - | - |
| controls | Whether to show `+-` controls, or set custom arrow icons | boolean \| { upIcon?: React.ReactNode; downIcon?: React.ReactNode; } | - |  |
| decimalSeparator | Decimal separator | string | - | - |
| placeholder | Placeholder | string | - |  |
| defaultValue | The initial value | number | - | - |
| disabled | If the input is disabled | boolean | false | - |
| formatter | Specifies the format of the value presented | function(value: number \| string, info: { userTyping: boolean, input: string }): string | - |  |
| keyboard | If keyboard behavior is enabled | boolean | true |  |
| max | The max value | number | [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) | - |
| min | The min value | number | [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) | - |
| parser | Specifies the value extracted from formatter | function(string): number | - | - |
| precision | The precision of input value. Will use `formatter` when config of `formatter` | number | - | - |
| readOnly | If the input is readonly | boolean | false | - |
| status | Set validation status | 'error' \| 'warning' | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | - |
| prefix | The prefix icon for the Input | ReactNode | - |  |
| suffix | The suffix icon for the Input | ReactNode | - | 5.20.0 |
| size | The height of input box | `large` \| `middle` \| `small` | - | - |
| step | The number to which the current value is increased or decreased. It can be an integer or decimal | number \| string | 1 | - |
| stringMode | Set value as string to support high precision decimals. Will return string value by `onChange` | boolean | false |  |
| mode | Show input or spinner | `'input' \| 'spinner'` | `'input'` |  |
| value | The current value of the component | number | - | - |
| variant | Variants of Input | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| onChange | The callback triggered when the value is changed | function(value: number \| string \| null) | - | - |
| onPressEnter | The callback function that is triggered when Enter key is pressed | function(e) | - | - |
| onStep | The callback function that is triggered when click up or down buttons / Keyboard / Wheel | (value: number, info: { offset: number, type: 'up' \| 'down', emitter: 'handler' \| 'keydown' \| 'wheel' }) => void | - |  |

## Ref

| Name | Description | Type | Version |
| --- | --- | --- | --- |
| blur() | Remove focus | - |  |
| focus() | Get focus | (option?: { preventScroll?: boolean, cursor?: 'start' \| 'end' \| 'all' }) | cursor - 5.22.0 |
| nativeElement | The native DOM element | - | 5.17.3 |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="InputNumber"></ComponentTokenTable>

## Notes

Per issues [#21158](https://github.com/ant-design/ant-design/issues/21158), [#17344](https://github.com/ant-design/ant-design/issues/17344), [#9421](https://github.com/ant-design/ant-design/issues/9421), and [documentation about inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#Using_number_inputs), it appears this community does not support native inclusion of the `type="number"` in the `<Input />` attributes, so please feel free to include it as needed, and be aware that it is heavily suggested that server side validation be utilized, as client side validation can be edited by power users.

## FAQ

### Why `value` can exceed `min` or `max` in control? {#faq-controlled-range}

Developer handle data by their own in control. It will make data out of sync if InputNumber changes display value. It also cause potential data issues when use in form.

### Why dynamic change `min` or `max` which makes `value` out of range will not trigger `onChange`? {#faq-dynamic-range-change}

`onChange` is user trigger event. Auto-triggering would prevent form libraries from detecting the data modification source.

### Why `onBlur` or other event can not get correct value? {#faq-onblur-value}

InputNumber's value is wrapped by internal logic. The `event.target.value` you get from `onBlur` or other event is the DOM element's `value` instead of the actual value of InputNumber. For example, if you change the display format through `formatter` or `decimalSeparator`, you will get the formatted string in the DOM. You should always get the current value through `onChange`.

### Why `changeOnWheel` unable to control whether the mouse scroll wheel changes value? {#faq-change-on-wheel}

> The use of the `type` attribute is deprecated

The InputNumber component allows you to use all the attributes of the input element and ultimately pass them to the input element, This attribute will also be added to the input element when you pass in `type='number'`, which will activate native behavior (allowing the mouse wheel to change the value), As a result `changeOnWheel` cannot control whether the mouse wheel changes the value.


============================================================
 COMPONENT: TABLE
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/table/index.en-US.md
============================================================

## When To Use

- To display a collection of structured data.
- To sort, search, paginate, filter data.

## How To Use

Specify `dataSource` of Table as an array of data.

```jsx
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

<Table dataSource={dataSource} columns={columns} />;
```

## Promotion

- [Kitchen Sketch Plugin 💎](https://kitchen.alipay.com)
- [ProTable - Advanced Tables](https://procomponents.ant.design/en-US/components/table)
- [S2 - Analytical Tables](https://github.com/antvis/s2/)

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Usage</code>
<code src="./demo/jsx.tsx">JSX style API</code>
<code src="./demo/row-selection.tsx">selection</code>
<code src="./demo/row-selection-and-operation.tsx">Selection and operation</code>
<code src="./demo/row-selection-custom.tsx">Custom selection</code>
<code src="./demo/row-selection-debug.tsx" debug>Selection Perf</code>
<code src="./demo/head.tsx">Filter and sorter</code>
<code src="./demo/filter-in-tree.tsx">Filter in Tree</code>
<code src="./demo/filter-search.tsx">Filter search</code>
<code src="./demo/multiple-sorter.tsx">Multiple sorter</code>
<code src="./demo/reset-filter.tsx">Reset filters and sorters</code>
<code src="./demo/custom-filter-panel.tsx">Customized filter panel</code>
<code src="./demo/ajax.tsx">Ajax</code>
<code src="./demo/size.tsx">size</code>
<code src="./demo/narrow.tsx" debug>size</code>
<code src="./demo/bordered.tsx">border, title and footer</code>
<code src="./demo/expand.tsx">Expandable Row</code>
<code src="./demo/expand-sticky.tsx" debug>Customizable expansion position</code>
<code src="./demo/order-column.tsx">Order Specific Column</code>
<code src="./demo/colspan-rowspan.tsx">colSpan and rowSpan</code>
<code src="./demo/tree-data.tsx">Tree data</code>
<code src="./demo/tree-table-ellipsis.tsx" debug>Tree data ellipsis debug demo</code>
<code src="./demo/fixed-header.tsx">Fixed Header</code>
<code src="./demo/fixed-columns.tsx">Fixed Columns</code>
<code src="./demo/fixed-gapped-columns.tsx" version="5.14.0">Stack Fixed Columns</code>
<code src="./demo/fixed-columns-header.tsx">Fixed Columns and Header</code>
<code src="./demo/hidden-columns.tsx" version="5.13.0">Hidden Columns</code>
<code src="./demo/grouping-columns.tsx">Grouping table head</code>
<code src="./demo/edit-cell.tsx">Editable Cells</code>
<code src="./demo/edit-row.tsx">Editable Rows</code>
<code src="./demo/nested-table.tsx">Nested tables</code>
<code src="./demo/drag-sorting.tsx">Drag sorting</code>
<code src="./demo/drag-column-sorting.tsx">Drag Column sorting</code>
<code src="./demo/drag-sorting-handler.tsx">Drag sorting with handler</code>
<code src="./demo/ellipsis.tsx">ellipsis column</code>
<code src="./demo/ellipsis-custom-tooltip.tsx">ellipsis column custom tooltip</code>
<code src="./demo/custom-empty.tsx">Custom empty</code>
<code src="./demo/summary.tsx">Summary</code>
<code src="./demo/virtual-list.tsx" version="5.9.0">Virtual list</code>
<code src="./demo/responsive.tsx">Responsive</code>
<code src="./demo/nest-table-border-debug.tsx" debug>Nested Bordered Table Debug</code>
<code src="./demo/pagination.tsx">Pagination Settings</code>
<code src="./demo/row-selection-custom-debug.tsx" debug>Custom selection group</code>
<code src="./demo/sticky.tsx">Fixed header and scroll bar with the page</code>
<code src="./demo/dynamic-settings.tsx">Dynamic Settings</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/selections-debug.tsx" debug>selections with icon</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/measure-row-render.tsx" debug>measureRowRender</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Table

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bordered | Whether to show all table borders | boolean | false |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| columns | Columns of table | [ColumnsType](#column)\[] | - |  |
| components | Override default table elements | [TableComponents](https://github.com/react-component/table/blob/75ee0064e54a4b3215694505870c9d6c817e9e4a/src/interface.ts#L129) | - |  |
| dataSource | Data record array to be displayed | object\[] | - |  |
| expandable | Config expandable content | [expandable](#expandable) | - |  |
| footer | Table footer renderer | function(currentPageData) | - |  |
| getPopupContainer | The render container of dropdowns in table | (triggerNode) => HTMLElement | () => TableHtmlElement |  |
| loading | Loading status of table | boolean \| [Spin Props](/components/spin/#api) | false |  |
| locale | The i18n text including filter, sort, empty text, etc | object | [Default Value](https://github.com/ant-design/ant-design/blob/6dae4a7e18ad1ba193aedd5ab6867e1d823e2aa4/components/locale/en_US.tsx#L19-L37) |  |
| pagination | Config of pagination. You can ref table pagination [config](#pagination) or full [`pagination`](/components/pagination/) document, hide it by setting it to `false` | object \| `false` | - |  |
| rowClassName | Row's className | function(record, index): string | - |  |
| rowKey | Row's unique key, could be a string or function that returns a string | string \| function(record): string | `key` |  |
| rowSelection | Row selection [config](#rowselection) | object | - |  |
| rowHoverable | Row hover | boolean | true | 5.16.0 |
| scroll | Whether the table can be scrollable, [config](#scroll) | object | - |  |
| showHeader | Whether to show table header | boolean | true |  |
| showSorterTooltip | The header show next sorter direction tooltip. It will be set as the property of Tooltip if its type is object | boolean \| [Tooltip props](/components/tooltip/#api) & `{target?: 'full-header' \| 'sorter-icon' }` | { target: 'full-header' } | 5.16.0 |
| size | Size of table | `large` \| `middle` \| `small` | `large` |  |
| sortDirections | Supported sort way, could be `ascend`, `descend` | Array | \[`ascend`, `descend`] |  |
| sticky | Set sticky header and scroll bar | boolean \| `{offsetHeader?: number, offsetScroll?: number, getContainer?: () => HTMLElement}` | - | 4.6.0 (getContainer: 4.7.0) |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| summary | Summary content | (currentData) => ReactNode | - |  |
| tableLayout | The [table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) attribute of table element | - \| `auto` \| `fixed` | -<hr />`fixed` when header/columns are fixed, or using `column.ellipsis` |  |
| title | Table title renderer | function(currentPageData) | - |  |
| virtual | Support virtual list | boolean | - | 5.9.0 |
| onChange | Callback executed when pagination, filters or sorter is changed | function(pagination, filters, sorter, extra: { currentDataSource: \[], action: `paginate` \| `sort` \| `filter` }) | - |  |
| onHeaderRow | Set props on per header row | function(columns, index) | - |  |
| onRow | Set props on per row | function(record, index) | - |  |
| onScroll | Triggered when the table body is scrolled. Note that only vertical scrolling will trigger the event when `virtual` | function(event) | - | 5.16.0 |

### Table ref

| Property | Description | Type | Version |
| --- | --- | --- | --- |
| nativeElement | The wrap element | HTMLDivElement | 5.11.0 |
| scrollTo | Trigger to scroll to target position. `key` match with record `rowKey`. When `offset` is specified, the table will scroll to align the target row to the top with the given offset and not working with `top` | (config: { index?: number, key?: React.Key, top?: number, offset?: number }) => void | 5.11.0 |

#### onRow usage

Same as `onRow` `onHeaderRow` `onCell` `onHeaderCell`

```jsx
<Table
  onRow={(record, rowIndex) => {
    return {
      onClick: (event) => {}, // click row
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
    };
  }}
  onHeaderRow={(columns, index) => {
    return {
      onClick: () => {}, // click header row
    };
  }}
/>
```

### Column

One of the Table `columns` prop for describing the table's columns, Column has the same API.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | The specify which way that column is aligned | `left` \| `right` \| `center` | `left` |  |
| className | The className of this column | string | - |  |
| colSpan | Span of this column's title | number | - |  |
| dataIndex | Display field of the data record, support nest path by string array | string \| string\[] | - |  |
| defaultFilteredValue | Default filtered values | string\[] | - |  |
| filterResetToDefaultFilteredValue | click the reset button, whether to restore the default filter | boolean | false |  |
| defaultSortOrder | Default order of sorted values | `ascend` \| `descend` | - |  |
| ellipsis | The ellipsis cell content, not working with sorter and filters for now.<br />tableLayout would be `fixed` when `ellipsis` is `true` or `{ showTitle?: boolean }` | boolean \| {showTitle?: boolean } | false | showTitle: 4.3.0 |
| filterDropdown | Customized filter overlay | ReactNode \| (props: [FilterDropdownProps](https://github.com/ant-design/ant-design/blob/ecc54dda839619e921c0ace530408871f0281c2a/components/table/interface.tsx#L79)) => ReactNode | - |  |
| filtered | Whether the `dataSource` is filtered | boolean | false |  |
| filteredValue | Controlled filtered value, filter icon will highlight | string\[] | - |  |
| filterIcon | Customized filter icon | ReactNode \| (filtered: boolean) => ReactNode | - |  |
| filterOnClose | Whether to trigger filter when the filter menu closes | boolean | true | 5.15.0 |
| filterMultiple | Whether multiple filters can be selected | boolean | true |  |
| filterMode | To specify the filter interface | 'menu' \| 'tree' | 'menu' | 4.17.0 |
| filterSearch | Whether to be searchable for filter menu | boolean \| function(input, record):boolean | false | boolean:4.17.0 function:4.19.0 |
| filters | Filter menu config | object\[] | - |  |
| filterDropdownProps | Customized dropdown props, `filterDropdownOpen` and `onFilterDropdownOpenChange` were available before `<5.22.0` | [DropdownProps](/components/dropdown#api) | - | 5.22.0 |
| fixed | (IE not support) Set column to be fixed: `true`(same as `'start'`) `'start'` `'end'` | boolean \| string | false |  |
| key | Unique key of this column, you can ignore this prop if you've set a unique `dataIndex` | string | - |  |
| render | Renderer of the table cell. `value` is the value of current cell; `record` is the value object of current row; `index` is the row number. The return value should be a ReactNode | (value: V, record: T, index: number): ReactNode | - |  |
| responsive | The list of breakpoints at which to display this column. Always visible if not set | [Breakpoint](https://github.com/ant-design/ant-design/blob/015109b42b85c63146371b4e32b883cf97b088e8/components/_util/responsiveObserve.ts#L1)\[] | - | 4.2.0 |
| rowScope | Set scope attribute for all cells in this column | `row` \| `rowgroup` | - | 5.1.0 |
| shouldCellUpdate | Control cell render logic | (record, prevRecord) => boolean | - | 4.3.0 |
| showSorterTooltip | If header show next sorter direction tooltip, override `showSorterTooltip` in table | boolean \| [Tooltip props](/components/tooltip/) & `{target?: 'full-header' \| 'sorter-icon' }` | { target: 'full-header' } | 5.16.0 |
| sortDirections | Supported sort way, override `sortDirections` in `Table`, could be `ascend`, `descend` | Array | \[`ascend`, `descend`] |  |
| sorter | Sort function for local sort, see [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)'s compareFunction. If it is server-side sorting, set to `true`, but if you want to support multi-column sorting, you can set it to `{ multiple: number }` | function \| boolean \| { compare: function, multiple: number } | - |  |
| sortOrder | Order of sorted values: `ascend` `descend` `null` | `ascend` \| `descend` \| null | - |  |
| sortIcon | Customized sort icon | (props: { sortOrder }) => ReactNode | - | 5.6.0 |
| title | Title of this column | ReactNode \| ({ sortColumns, filters }) => ReactNode | - |  |
| width | Width of this column ([width not working?](https://github.com/ant-design/ant-design/issues/13825#issuecomment-449889241)) | string \| number | - |  |
| minWidth | Min width of this column, only works when `tableLayout="auto"` | number | - | 5.21.0 |
| hidden | Hidden this column | boolean | false | 5.13.0 |
| onCell | Set props on per cell | function(record, rowIndex) | - |  |
| onFilter | Function that determines if the row is displayed when filtered | function(value, record) => boolean | - |  |
| onHeaderCell | Set props on per header cell | function(column) | - |  |

### ColumnGroup

| Property | Description               | Type      | Default |
| -------- | ------------------------- | --------- | ------- |
| title    | Title of the column group | ReactNode | -       |

### pagination

Properties for pagination.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| placement | Specify the placement of `Pagination`, could be`topStart` \| `topCenter` \| `topEnd` \|`bottomStart` \| `bottomCenter` \| `bottomEnd` \| `none` | Array | \[`bottomEnd`] |
| ~~position~~ | Specify the position of `Pagination`, could be`topLeft` \| `topCenter` \| `topRight` \|`bottomLeft` \| `bottomCenter` \| `bottomRight` \| `none`, please use `placement` instead | Array | \[`bottomRight`] |

More about pagination, please check [`Pagination`](/components/pagination/).

### expandable

Properties for expandable.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| childrenColumnName | The column contains children to display | string | children |  |
| columnTitle | Set the title of the expand column | ReactNode | - | 4.23.0 |
| columnWidth | Set the width of the expand column | string \| number | - |  |
| defaultExpandAllRows | Expand all rows initially | boolean | false |  |
| defaultExpandedRowKeys | Initial expanded row keys | string\[] | - |  |
| expandedRowClassName | Expanded row's className | string \| (record, index, indent) => string | - | string: 5.22.0 |
| expandedRowKeys | Current expanded row keys | string\[] | - |  |
| expandedRowRender | Expanded container render for each row | function(record, index, indent, expanded): ReactNode | - |  |
| expandIcon | Customize row expand Icon. Ref [example](https://codesandbox.io/s/fervent-bird-nuzpr) | function(props): ReactNode | - |  |
| expandRowByClick | Whether to expand row by clicking anywhere in the whole row | boolean | false |  |
| fixed | Whether the expansion icon is fixed. Optional true `left` `right` | boolean \| string | false | 4.16.0 |
| indentSize | Indent size in pixels of tree data | number | 15 |  |
| rowExpandable | Enable row can be expandable | (record) => boolean | - |  |
| showExpandColumn | Show expand column | boolean | true | 4.18.0 |
| onExpand | Callback executed when the row expand icon is clicked | function(expanded, record) | - |  |
| onExpandedRowsChange | Callback executed when the expanded rows change | function(expandedRows) | - |  |
| ~~expandedRowOffset~~ | Deprecated: Expand the number of offset columns of the row. After setting, it will force the columns in front of it to be fixed columns. Please use'Table. EXPAND_COLUMN 'instead and control the position through column order | number | - | 5.26.0 |

### rowSelection

Properties for row selection.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | Set the alignment of selection column | `left` \| `right` \| `center` | `left` | 5.25.0 |
| checkStrictly | Check table row precisely; parent row and children rows are not associated | boolean | true | 4.4.0 |
| columnTitle | Set the title of the selection column | ReactNode \| (originalNode: ReactNode) => ReactNode | - |  |
| columnWidth | Set the width of the selection column | string \| number | `32px` |  |
| fixed | Fixed selection column on the left | boolean | - |  |
| getCheckboxProps | Get Checkbox or Radio props | function(record) | - |  |
| getTitleCheckboxProps | Get title Checkbox props | function() | - |  |
| hideSelectAll | Hide the selectAll checkbox and custom selection | boolean | false | 4.3.0 |
| preserveSelectedRowKeys | Keep selection `key` even when it removed from `dataSource` | boolean | - | 4.4.0 |
| renderCell | Renderer of the table cell. Same as `render` in column | (checked: boolean, record: T, index: number, originNode: ReactNode): ReactNode | - | 4.1.0 |
| selectedRowKeys | Controlled selected row keys | string\[] \| number\[] | \[] |  |
| selections | Custom selection [config](#selection), only displays default selections when set to `true` | object\[] \| boolean | - |  |
| type | `checkbox` or `radio` | `checkbox` \| `radio` | `checkbox` |  |
| onCell | Set props on per cell. Same as `onCell` in column | function(record, rowIndex) | - | 5.5.0 |
| onChange | Callback executed when selected rows change | function(selectedRowKeys, selectedRows, info: { type }) | - | `info.type`: 4.21.0 |
| onSelect | Callback executed when select/deselect one row | function(record, selected, selectedRows, nativeEvent) | - |  |

### scroll

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| scrollToFirstRowOnChange | Whether to scroll to the top of the table when paging, sorting, filtering changes | boolean | - |
| x | Set horizontal scrolling, can also be used to specify the width of the scroll area, could be number, percent value, true and ['max-content'](https://developer.mozilla.org/en-US/docs/Web/CSS/width#max-content) | string \| number \| true | - |
| y | Set vertical scrolling, can also be used to specify the height of the scroll area, could be string or number | string \| number | - |

### selection

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| key | Unique key of this selection | string | - |
| text | Display text of this selection | ReactNode | - |
| onSelect | Callback executed when this selection is clicked | function(changeableRowKeys) | - |

## Using in TypeScript {#using-in-typescript}

```tsx

interface User {
  key: number;
  name: string;
}

const columns: TableColumnsType<User> = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
  },
];

const data: User[] = [
  {
    key: 0,
    name: 'Jack',
  },
];

const Demo: React.FC = () => (
  <>
    <Table<User> columns={columns} dataSource={data} />
    {/* JSX style usage */}
    <Table<User> dataSource={data}>
      <Table.Column<User> key="name" title="Name" dataIndex="name" />
    </Table>
  </>
);

export default Demo;
```

Here is the [CodeSandbox for TypeScript](https://codesandbox.io/s/serene-platform-0jo5t).

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Table"></ComponentTokenTable>

## Note

According to the [React documentation](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key), every child in an array should be assigned a unique key. The values inside the Table's `dataSource` and `columns` should follow this rule. By default, `dataSource[i].key` will be treated as the key value for `dataSource`.

![console warning](https://os.alipayobjects.com/rmsportal/luLdLvhPOiRpyss.png)

If `dataSource[i].key` is not provided, then you should specify the primary key of dataSource value via `rowKey`, as shown below. If not, warnings like the one above will show in browser console.

```jsx
// primary key is uid
return <Table rowKey="uid" />;
// or
return <Table rowKey={(record) => record.uid} />;
```

## FAQ

### How to hide pagination when single page or no data? {#faq-hide-pagination}

You can set `hideOnSinglePage` with `pagination` prop.

### Table will return to first page when filter data. {#faq-filter-to-first-page}

Table total page count usually reduce after filter data, we by default return to first page in case of current page is out of filtered results.

You may need to keep current page after filtering when fetch data from remote service, please check [this demo](https://codesandbox.io/s/yuanchengjiazaishuju-ant-design-demo-7y2uf) as workaround.

Also you can use the action from extra param to determine when return to first page.

### Why Table pagination show size changer? {#faq-size-changer}

In order to improve user experience, Pagination show size changer by default when `total > 50` since `4.1.0`. You can set `showSizeChanger=false` to disable this feature.

### Why Table fully render when state change? {#faq-state-update-rerender}

Table can not tell what state used in `columns.render`, so it always need fully render to avoid sync issue. You can use `column.shouldCellUpdate` to control render.

### How to handle fixed column display over the mask layout? {#faq-fixed-column-zindex}

Fixed column use `z-index` to make it over other columns. You will find sometimes fixed columns also over your mask layout. You can set `z-index` on your mask layout to resolve.

### How to custom render Table Checkbox（For example, adding Tooltip）? {#faq-custom-checkbox-render}

Since `4.1.0`, You can use [`rowSelection.renderCell`](https://ant.design/components/table/#rowselection) to custom render Table Checkbox. If you want to add Tooltip, please refer to this [demo](https://codesandbox.io/s/table-row-tooltip-v79j2v).

### Why does components.body.wrapper or components.body.row report an error when virtual is enabled? {#faq-virtual-wrapper-ref}

Because virtual table needs to get its ref to do some calculations, so you need to use `React.forwardRef` wrapper and pass the ref to the dom. Like this:

```tsx
const EditableRow = React.forwardRef<HTMLTableRowElement, EditableRowProps>(
  ({ index, ...props }, ref) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} ref={ref} />
        </EditableContext.Provider>
      </Form>
    );
  },
);
```

For scenarios with fixed row heights and vertical scrolling, you can use the following method:

```tsx
<Table
  //@ts-ignore // This property is not exported, but it can be passed through to the internal virtual scrolling
  listItemHeight={36} // This helps virtual scrolling calculate the height correctly, with each row fixed at 36px
/>
```


============================================================
 COMPONENT: LIST
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/list/index.en-US.md
============================================================

## When To Use

A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.

<!-- prettier-ignore -->
:::warning{title=Deprecated Notice}
List component has been deprecated. Will be removed in the next major version.
:::

## Examples

<!-- prettier-ignore -->
<code src="./demo/simple.tsx">Simple list</code>
<code src="./demo/basic.tsx">Basic list</code>
<code src="./demo/loadmore.tsx">Load more</code>
<code src="./demo/vertical.tsx">Vertical</code>
<code src="./demo/pagination.tsx">Pagination Settings</code>
<code src="./demo/grid.tsx">Grid</code>
<code src="./demo/grid-test.tsx" debug>Test Grid</code>
<code src="./demo/responsive.tsx">Responsive grid list</code>
<code src="./demo/infinite-load.tsx">Scrolling loaded</code>
<code src="./demo/drag-sorting.tsx">Drag sorting</code>
<code src="./demo/drag-sorting-handler.tsx">Drag sorting with handler</code>
<code src="./demo/grid-drag-sorting.tsx">Grid Drag sorting</code>
<code src="./demo/grid-drag-sorting-handler.tsx">Grid Drag sorting with handler</code>
<code src="./demo/virtual-list.tsx">virtual list</code>
<code src="./demo/component-token.tsx" debug>custom component token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### List

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bordered | Toggles rendering of the border around the list | boolean | false |  |
| dataSource | DataSource array for list | any\[] | - |  |
| footer | List footer renderer | ReactNode | - |  |
| grid | The grid type of list. You can set grid to something like {gutter: 16, column: 4} | [object](#list-grid-props) | - |  |
| header | List header renderer | ReactNode | - |  |
| itemLayout | The layout of list | `horizontal` \| `vertical` | `horizontal` |  |
| loading | Shows a loading indicator while the contents of the list are being fetched | boolean \| [SpinProps](/components/spin/#api) ([more](https://github.com/ant-design/ant-design/issues/8659)) | false |  |
| loadMore | Shows a load more content | ReactNode | - |  |
| locale | The i18n text including empty text | object | {emptyText: `No Data`} |  |
| pagination | Pagination [config](/components/pagination/), hide it by setting it to false | boolean \| object | false |  |
| renderItem | Customize list item when using `dataSource` | (item: T, index: number) => ReactNode | - |  |
| rowKey | Item's unique value, could be an Item's key which holds a unique value of type `React.Key` or function that receives Item and returns a `React.Key` | `keyof` T \| (item: T) => `React.Key` | `"key"` |  |
| size | Size of list | `default` \| `large` \| `small` | `default` |  |
| split | Toggles rendering of the split under the list item | boolean | true |  |

### pagination

Properties for pagination.

| Property | Description                               | Type                         | Default  |
| -------- | ----------------------------------------- | ---------------------------- | -------- |
| position | The specify the position of `Pagination`  | `top` \| `bottom` \| `both`  | `bottom` |
| align    | The specify the alignment of `Pagination` | `start` \| `center` \| `end` | `end`    |

More about pagination, please check [`Pagination`](/components/pagination/).

### List grid props

| Property | Description              | Type   | Default | Version |
| -------- | ------------------------ | ------ | ------- | ------- |
| column   | The column of grid       | number | -       |         |
| gutter   | The spacing between grid | number | 0       |         |
| xs       | `<576px` column of grid  | number | -       |         |
| sm       | `≥576px` column of grid  | number | -       |         |
| md       | `≥768px` column of grid  | number | -       |         |
| lg       | `≥992px` column of grid  | number | -       |         |
| xl       | `≥1200px` column of grid | number | -       |         |
| xxl      | `≥1600px` column of grid | number | -       |         |

### List.Item

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actions | The actions content of list item. If `itemLayout` is `vertical`, shows the content on bottom, otherwise shows content on the far right | Array&lt;ReactNode> | - |  |
| classNames | Semantic structure className | [`Record<actions \| extra, string>`](#semantic-dom) | - | 5.18.0 |
| extra | The extra content of list item. If `itemLayout` is `vertical`, shows the content on right, otherwise shows content on the far right | ReactNode | - |  |
| styles | Semantic DOM style | [`Record<actions \| extra, CSSProperties>`](#semantic-dom) | - | 5.18.0 |

### List.Item.Meta

| Property    | Description                  | Type      | Default | Version |
| ----------- | ---------------------------- | --------- | ------- | ------- |
| avatar      | The avatar of list item      | ReactNode | -       |         |
| description | The description of list item | ReactNode | -       |         |
| title       | The title of list item       | ReactNode | -       |         |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="List"></ComponentTokenTable>

## FAQ {#faq}

### Is there a replacement for the deprecated List component? {#faq-listy-replacement}

In Ant Design v6, we will introduce a brand-new Listy component as the successor to List.

Listy comes with built-in virtual scrolling and places greater emphasis on flexible layout control, empowering developers to build highly customizable lists tailored to various business scenarios.

The underlying implementation, rc-listy, is already largely complete and is currently awaiting review and further adjustments by core maintainers.

Ant Design v6 will officially provide the Listy component based on rc-listy.

Related links:

- Pull Request: [PR #54182](https://github.com/ant-design/ant-design/pull/54182)
- RFC Discussion: [Discussion #54458](https://github.com/ant-design/ant-design/discussions/54458)


============================================================
 COMPONENT: CARD
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/card/index.en-US.md
============================================================

## When To Use

A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic card</code>
<code src="./demo/border-less.tsx" background="grey">No border</code>
<code src="./demo/simple.tsx">Simple card</code>
<code src="./demo/flexible-content.tsx">Customized content</code>
<code src="./demo/in-column.tsx" background="grey">Card in column</code>
<code src="./demo/loading.tsx">Loading card</code>
<code src="./demo/grid-card.tsx">Grid card</code>
<code src="./demo/inner.tsx">Inner card</code>
<code src="./demo/tabs.tsx">With tabs</code>
<code src="./demo/meta.tsx">Support more content configuration</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

```jsx
<Card title="Card title">Card content</Card>
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actions | The action list, shows at the bottom of the Card | Array&lt;ReactNode> | - |  |
| activeTabKey | Current TabPane's key | string | - |  |
| ~~bordered~~ | Toggles rendering of the border around the card, please use `variant` instead | boolean | true |  |
| variant | Variants of Card | `outlined` \| `borderless` \| | `outlined` | 5.24.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| cover | Card cover | ReactNode | - |  |
| defaultActiveTabKey | Initial active TabPane's key, if `activeTabKey` is not set | string | `The key of first tab` |  |
| extra | Content to render in the top-right corner of the card | ReactNode | - |  |
| hoverable | Lift up when hovering card | boolean | false |  |
| loading | Shows a loading indicator while the contents of the card are being fetched | boolean | false |  |
| size | Size of card | `default` \| `small` | `default` |  |
| tabBarExtraContent | Extra content in tab bar | ReactNode | - |  |
| tabList | List of TabPane's head | [TabItemType](/components/tabs#tabitemtype)[] | - |  |
| tabProps | [Tabs](/components/tabs/#tabs) | - | - |  |
| title | Card title | ReactNode | - |  |
| type | Card style type, can be set to `inner` or not set | string | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| onTabChange | Callback when tab is switched | (key) => void | - |  |

### Card.Grid

| Property  | Description                     | Type          | Default | Version |
| --------- | ------------------------------- | ------------- | ------- | ------- |
| className | The className of container      | string        | -       |         |
| hoverable | Lift up when hovering card grid | boolean       | true    |         |
| style     | The style object of container   | CSSProperties | -       |         |

### Card.Meta

| Property    | Description                   | Type          | Default | Version |
| ----------- | ----------------------------- | ------------- | ------- | ------- |
| avatar      | Avatar or icon                | ReactNode     | -       |         |
| className   | The className of container    | string        | -       |         |
| description | Description content           | ReactNode     | -       |         |
| style       | The style object of container | CSSProperties | -       |         |
| title       | Title content                 | ReactNode     | -       |         |

## Semantic DOM

### Card

<code src="./demo/_semantic.tsx" simplify="true"></code>

### Card.Meta

<code src="./demo/_semantic_meta.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Card"></ComponentTokenTable>


============================================================
 COMPONENT: COLLAPSE
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/collapse/index.en-US.md
============================================================

## When To Use

- Can be used to group or hide complex regions to keep the page clean.
- `Accordion` is a special kind of `Collapse`, which allows only one panel to be expanded at a time.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Collapse</code>
<code src="./demo/size.tsx">Size</code>
<code src="./demo/accordion.tsx">Accordion</code>
<code src="./demo/mix.tsx">Nested panel</code>
<code src="./demo/borderless.tsx">Borderless</code>
<code src="./demo/custom.tsx">Custom Panel</code>
<code src="./demo/noarrow.tsx">No arrow</code>
<code src="./demo/extra.tsx">Extra node</code>
<code src="./demo/ghost.tsx">Ghost Collapse</code>
<code src="./demo/collapsible.tsx">Collapsible</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Collapse

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| accordion | If true, Collapse renders as Accordion | boolean | false |  |
| activeKey | Key of the active panel | string\[] \| string <br/> number\[] \| number | No default value. In [accordion mode](#collapse-demo-accordion), it's the key of the first panel |  |
| bordered | Toggles rendering of the border around the collapse block | boolean | true |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| collapsible | Specify how to trigger Collapse. Either by clicking icon or by clicking any area in header or disable collapse functionality itself | `header` \| `icon` \| `disabled` | - | 4.9.0 |
| defaultActiveKey | Key of the initial active panel | string\[] \| string <br/> number\[] \| number | - |  |
| ~~destroyInactivePanel~~ | Destroy Inactive Panel | boolean | false |  |
| destroyOnHidden | Destroy Inactive Panel | boolean | false | 5.25.0 |
| expandIcon | Allow to customize collapse icon | (panelProps) => ReactNode | - |  |
| expandIconPlacement | Set expand icon placement | `start` \| `end` | `start` | - |
| ~~expandIconPosition~~ | Set expand icon position, Please use `expandIconPlacement` instead | `start` \| `end` | - | 4.21.0 |
| ghost | Make the collapse borderless and its background transparent | boolean | false | 4.4.0 |
| size | Set the size of collapse | `large` \| `middle` \| `small` | `middle` | 5.2.0 |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| onChange | Callback function executed when active panel is changed | function | - |  |
| items | collapse items content | [ItemType](#itemtype) | - | 5.6.0 |

### ItemType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Semantic structure className | [`Record<header \| body, string>`](#semantic-dom) | - | 5.21.0 |
| collapsible | Specify whether the panel be collapsible or the trigger area of collapsible | `header` \| `icon` \| `disabled` | - |  |
| children | Body area content | ReactNode | - |  |
| extra | The extra element in the corner | ReactNode | - |  |
| forceRender | Forced render of content on panel, instead of lazy rendering after clicking on header | boolean | false |  |
| key | Unique key identifying the panel from among its siblings | string \| number | - |  |
| label | Title of the panel | ReactNode | - | - |
| showArrow | If false, panel will not show arrow icon. If false, collapsible can't be set as icon | boolean | true |  |
| styles | Semantic DOM style | [`Record<header \| body, CSSProperties>`](#semantic-dom) | - | 5.21.0 |

### Collapse.Panel

<!-- prettier-ignore -->
:::warning{title=Deprecated}
When using version >= 5.6.0, we prefer to configuring the panel by `items`.
:::

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| collapsible | Specify whether the panel be collapsible or the trigger area of collapsible | `header` \| `icon` \| `disabled` | - | 4.9.0 (icon: 4.24.0) |
| extra | The extra element in the corner | ReactNode | - |  |
| forceRender | Forced render of content on panel, instead of lazy rendering after clicking on header | boolean | false |  |
| header | Title of the panel | ReactNode | - |  |
| key | Unique key identifying the panel from among its siblings | string \| number | - |  |
| showArrow | If false, panel will not show arrow icon. If false, collapsible can't be set as icon | boolean | true |  |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Collapse"></ComponentTokenTable>


============================================================
 COMPONENT: AVATAR
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/avatar/index.en-US.md
============================================================

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/type.tsx">Type</code>
<code src="./demo/dynamic.tsx">Autoset Font Size</code>
<code src="./demo/badge.tsx">With Badge</code>
<code src="./demo/group.tsx">Avatar.Group</code>
<code src="./demo/toggle-debug.tsx" debug>Calculate text style when hiding</code>
<code src="./demo/responsive.tsx">Responsive Size</code>
<code src="./demo/fallback.tsx" debug>Fallback</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Avatar

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| alt | This attribute defines the alternative text describing the image | string | - |  |
| gap | Letter type unit distance between left and right sides | number | 4 | 4.3.0 |
| icon | Custom icon type for an icon avatar | ReactNode | - |  |
| shape | The shape of avatar | `circle` \| `square` | `circle` |  |
| size | The size of the avatar | number \| `large` \| `small` \| `default` \| { xs: number, sm: number, ...} | `default` | 4.7.0 |
| src | The address of the image for an image avatar or image element | string \| ReactNode | - | ReactNode: 4.8.0 |
| srcSet | A list of sources to use for different screen resolutions | string | - |  |
| draggable | Whether the picture is allowed to be dragged | boolean \| `'true'` \| `'false'` | true |  |
| crossOrigin | CORS settings attributes | `'anonymous'` \| `'use-credentials'` \| `''` | - | 4.17.0 |
| onError | Handler when img load error, return false to prevent default fallback behavior | () => boolean | - |  |

> Tip: You can set `icon` or `children` as the fallback for image load error, with the priority of `icon` > `children`

### Avatar.Group <Badge>4.5.0+</Badge>

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| max | Set maximum display related configurations, Before `5.18.0` you can use [parameters](https://github.com/ant-design/ant-design/blob/9d134859becbdae5b9ce276f6d9af4264691d81f/components/avatar/group.tsx#L35-L38) | `{ count?: number; style?: CSSProperties; popover?: PopoverProps }` | - | 5.18.0 |
| size | The size of the avatar | number \| `large` \| `small` \| `default` \| { xs: number, sm: number, ...} | `default` | 4.8.0 |
| shape | The shape of the avatar | `circle` \| `square` | `circle` | 5.8.0 |

## Design Token

<ComponentTokenTable component="Avatar"></ComponentTokenTable>


============================================================
 COMPONENT: TAG
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/tag/index.en-US.md
============================================================

## When To Use

- It can be used to tag by dimension or property.

- When categorizing.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/colorful.tsx">Colorful Tag</code>
<code src="./demo/control.tsx">Add & Remove Dynamically</code>
<code src="./demo/checkable.tsx">Checkable</code>
<code src="./demo/animation.tsx">Animate</code>
<code src="./demo/icon.tsx">Icon</code>
<code src="./demo/status.tsx">Status Tag</code>
<code src="./demo/customize.tsx" debug>Customize close</code>
<code src="./demo/draggable.tsx">Draggable Tag</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/disabled.tsx" debug>Disabled</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Tag

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| closeIcon | Custom close icon. 5.7.0: close button will be hidden when setting to `null` or `false` | ReactNode | false | 4.4.0 |
| color | Color of the Tag | string | - |  |
| disabled | Whether the tag is disabled | boolean | false | 6.0.0 |
| href | The address to jump when clicking, when this property is specified, the `tag` component will be rendered as an `<a>` tag | string | - | 6.0.0 |
| icon | Set the icon of tag | ReactNode | - |  |
| onClose | Callback executed when tag is closed (can be prevented by `e.preventDefault()`) | (e: React.MouseEvent<HTMLElement, MouseEvent>) => void | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| target | Same as target attribute of a, works when href is specified | string | - | 6.0.0 |
| variant | Variant of the tag | `'filled' \| 'solid' \| 'outlined'` | `'filled'` | 6.0.0 |

### Tag.CheckableTag

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checked | Checked status of Tag | boolean | false |  |
| icon | Set the icon of tag | ReactNode | - | 5.27.0 |
| onChange | Callback executed when Tag is checked/unchecked | (checked) => void | - |  |

### Tag.CheckableTagGroup

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-group), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-group), string> | - |  |
| defaultValue | Initial value | `string \| number \| Array<string \| number> \| null` | - |  |
| disabled | Disable check/uncheck | `boolean` | - |  |
| multiple | Multiple select mode | `boolean` | - |  |
| options | Option list | `Array<{ label: ReactNode; value: string \| number } \| string \| number>` | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-group), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-group), CSSProperties> | - |  |
| value | Value of checked tag(s) | `string \| number \| Array<string \| number> \| null` | - |  |
| onChange | Callback when Tag is checked/unchecked | `(value: string \| number \| Array<string \| number> \| null) => void` | - |  |

## Semantic DOM

### Tag

<code src="./demo/_semantic.tsx" simplify="true"></code>

### Tag.CheckableTagGroup {#semantic-group}

<code src="./demo/_semantic_group.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Tag"></ComponentTokenTable>


============================================================
 COMPONENT: TOOLTIP
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/tooltip/index.en-US.md
============================================================

## When To Use

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a `button/text/operation`. It's often used instead of the html `title` attribute.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/smooth-transition.tsx">Smooth Transition</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/arrow.tsx">Arrow</code>
<code src="./demo/shift.tsx" iframe="300">Auto Shift</code>
<code src="./demo/auto-adjust-overflow.tsx" debug>Adjust placement automatically</code>
<code src="./demo/destroy-on-close.tsx" debug>Destroy tooltip when hidden</code>
<code src="./demo/colorful.tsx">Colorful Tooltip</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/debug.tsx" debug>Debug</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/disabled-children.tsx" debug>Disabled children</code>
<code src="./demo/wrap-custom-component.tsx">Wrap custom component</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| title | The text shown in the tooltip | ReactNode \| () => ReactNode | - | - |
| color | The background color. After using this attribute, the internal text color will adapt automatically | string | - | 5.27.0 |
| classNames | Semantic DOM class | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| styles | Semantic DOM style | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |

### Common API

<embed src="./shared/sharedProps.en-US.md"></embed>

### ConfigProvider - tooltip.unique {#config-provider-tooltip-unique}

You can configure global unique display for Tooltip through ConfigProvider. When `unique` is set to `true`, only one Tooltip under the ConfigProvider will be displayed at the same time, providing better user experience and smooth transition effects.

Note: After configuration, properties like `getContainer`, `arrow` etc. will be ignored.

```tsx

export default () => (
  <ConfigProvider
    tooltip={{
      unique: true,
    }}
  >
    <Space>
      <Tooltip title="First tooltip">
        <Button>Button 1</Button>
      </Tooltip>
      <Tooltip title="Second tooltip">
        <Button>Button 2</Button>
      </Tooltip>
    </Space>
  </ConfigProvider>
);
```

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Tooltip"></ComponentTokenTable>

## FAQ

### Why doesn't HOC work sometimes? {#faq-hoc-component}

Please ensure that the child elements of `Tooltip` can accept `onMouseEnter`, `onMouseLeave`, `onPointerEnter`, `onPointerLeave`, `onFocus`, `onClick` events.

Please refer to https://github.com/ant-design/ant-design/issues/15909

### Why Tooltip not update content when close? {#faq-content-not-update}

Tooltip will cache content when it is closed to avoid flicker when content is updated:

```jsx
// `title` will not blink when `user` is empty
<Tooltip open={user} title={user?.name} />
```

<div>
<img alt="no blink" height="50" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KVx7QLOYwVsAAAAAAAAAAAAADrJ8AQ/original" />
</div>

If need update content when close, you can set `fresh` property ([#44830](https://github.com/ant-design/ant-design/issues/44830)):

```jsx
<Tooltip open={user} title={user?.name} fresh />
```

<div>
<img alt="no blink" height="50" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rUbsR4xWpMsAAAAAAAAAAAAADrJ8AQ/original" />
</div>

---

<!-- 请确保在 FAQ 最后 -->

<embed src="./shared/sharedFAQ.en-US.md"></embed>


============================================================
 COMPONENT: POPOVER
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/popover/index.en-US.md
============================================================

## When To Use

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/triggerType.tsx">Three ways to trigger</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/arrow.tsx">Arrow</code>
<code src="./demo/arrow-point-at-center.tsx" debug>Arrow.pointAtCenter</code>
<code src="./demo/shift.tsx" iframe="300">Auto Shift</code>
<code src="./demo/control.tsx">Controlling the close of the dialog</code>
<code src="./demo/hover-with-click.tsx">Hover with click popover</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/wireframe.tsx" debug>Wireframe</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| content | Content of the card | ReactNode \| () => ReactNode | - |  |
| title | Title of the card | ReactNode \| () => ReactNode | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |

<!-- Common API -->

<embed src="../tooltip/shared/sharedProps.en-US.md"></embed>

## Note

Please ensure that the child node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Popover"></ComponentTokenTable>

## FAQ

<embed src="../tooltip/shared/sharedFAQ.en-US.md"></embed>

For more questions, please refer to [Tooltip FAQ](/components/tooltip#faq).


============================================================
 COMPONENT: MODAL
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/modal/index.en-US.md
============================================================

## When To Use

When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use `Modal` to create a new floating layer over the current page to get user feedback or display information.

Additionally, if you need to show a simple confirmation dialog, you can use [`App.useApp`](/components/app/) hooks.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/async.tsx">Asynchronously close</code>
<code src="./demo/footer.tsx">Customized Footer</code>
<code src="./demo/mask.tsx">mask</code>
<code src="./demo/loading.tsx" version="5.18.0">Loading</code>
<code src="./demo/footer-render.tsx" version="5.9.0">Customized Footer render function</code>
<code src="./demo/hooks.tsx">Use hooks to get context</code>
<code src="./demo/locale.tsx">Internationalization</code>
<code src="./demo/manual.tsx">Manual to update destroy</code>
<code src="./demo/position.tsx">To customize the position of modal</code>
<code src="./demo/dark.tsx" debug>Demo for debugging</code>
<code src="./demo/button-props.tsx">Customize footer buttons props</code>
<code src="./demo/modal-render.tsx">Custom modal content render</code>
<code src="./demo/width.tsx">To customize the width of modal</code>
<code src="./demo/static-info.tsx">Static Method</code>
<code src="./demo/confirm.tsx">Static confirmation</code>
<code src="./demo/classNames.tsx">Customize className for build-in module</code>
<code src="./demo/confirm-router.tsx">destroy confirmation modal dialog</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/nested.tsx" debug>Nested Modal</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/custom-mouse-position.tsx" debug>Control modal's animation origin position</code>
<code src="./demo/wireframe.tsx" debug>Wireframe</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| afterClose | Specify a function that will be called when modal is closed completely | function | - |  |
| cancelButtonProps | The cancel button props | [ButtonProps](/components/button/#api) | - |  |
| cancelText | Text of the Cancel button | ReactNode | `Cancel` |  |
| centered | Centered Modal | boolean | false |  |
| classNames | Customize class for each semantic structure inside the Modal component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| closable | Whether a close (x) button is visible on top right or not | boolean \| [ClosableType](#closabletype) | true | - |
| closeIcon | Custom close icon. 5.7.0: close button will be hidden when setting to `null` or `false` | ReactNode | &lt;CloseOutlined /> |  |
| confirmLoading | Whether to apply loading visual effect for OK button or not | boolean | false |  |
| ~~destroyOnClose~~ | Whether to unmount child components on onClose | boolean | false |  |
| destroyOnHidden | Whether to unmount child components on onClose | boolean | false | 5.25.0 |
| ~~focusTriggerAfterClose~~ | Whether need to focus trigger element after dialog is closed. Please use `focusable.focusTriggerAfterClose` instead | boolean | true | 4.9.0 |
| footer | Footer content, set as `footer={null}` when you don't need default buttons | ReactNode \| (originNode: ReactNode, extra: { OkBtn: React.FC, CancelBtn: React.FC }) => ReactNode | (OK and Cancel buttons) | renderFunction: 5.9.0 |
| forceRender | Force render Modal | boolean | false |  |
| focusable | Configuration for focus management in the Modal | `{ trap?: boolean, focusTriggerAfterClose?: boolean }` | - | 6.2.0 |
| getContainer | The mounted node for Modal but still display at fullscreen | HTMLElement \| () => HTMLElement \| Selectors \| false | document.body |  |
| keyboard | Whether support press esc to close | boolean | true |  |
| mask | Mask effect | boolean \| `{enabled: boolean, blur: boolean}` | true |  |
| maskClosable | Whether to close the modal dialog when the mask (area outside the modal) is clicked | boolean | true |  |
| modalRender | Custom modal content render | (node: ReactNode) => ReactNode | - | 4.7.0 |
| okButtonProps | The ok button props | [ButtonProps](/components/button/#api) | - |  |
| okText | Text of the OK button | ReactNode | `OK` |  |
| okType | Button `type` of the OK button | string | `primary` |  |
| style | Style of floating layer, typically used at least for adjusting the position | CSSProperties | - |  |
| styles | Customize inline style for each semantic structure inside the Modal component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| loading | Show the skeleton | boolean |  | 5.18.0 |
| title | The modal dialog's title | ReactNode | - |  |
| open | Whether the modal dialog is visible or not | boolean | false |  |
| width | Width of the modal dialog | string \| number \| [Breakpoint](/components/grid-cn#col) | 520 | Breakpoint: 5.23.0 |
| wrapClassName | The class name of the container of the modal dialog | string | - |  |
| zIndex | The `z-index` of the Modal | number | 1000 |  |
| onCancel | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button | function(e) | - |  |
| onOk | Specify a function that will be called when a user clicks the OK button | function(e) | - |  |
| afterOpenChange | Callback when the animation ends when Modal is turned on and off | (open: boolean) => void | - | 5.4.0 |

#### Note

- The state of Modal will be preserved at it's component lifecycle by default, if you wish to open it with a brand new state every time, set `destroyOnHidden` on it.
- There is a situation that using `<Modal />` with Form, which won't clear fields value when closing Modal even you have set `destroyOnHidden`. You need `<Form preserve={false} />` in this case.
- `Modal.method()` RTL mode only supports hooks.

### Modal.method()

There are five ways to display the information based on the content's nature:

- `Modal.info`
- `Modal.success`
- `Modal.error`
- `Modal.warning`
- `Modal.confirm`

The items listed above are all functions, expecting a settings object as parameter. The properties of the object are follows:

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| afterClose | Specify a function that will be called when modal is closed completely | function | - | 4.9.0 |
| ~~autoFocusButton~~ | Specify which button to autofocus. Please use `focusable.autoFocusButton` instead | null \| `ok` \| `cancel` | `ok` |  |
| cancelButtonProps | The cancel button props | [ButtonProps](/components/button/#api) | - |  |
| cancelText | Text of the Cancel button with Modal.confirm | string | `Cancel` |  |
| centered | Centered Modal | boolean | false |  |
| className | The className of container | string | - |  |
| closable | Whether a close (x) button is visible on top right of the confirm dialog or not | boolean \| [ClosableType](#closabletype) | false | - |
| closeIcon | Custom close icon | ReactNode | undefined | 4.9.0 |
| content | Content | ReactNode | - |  |
| focusable.autoFocusButton | Specify which button to autofocus | null \| `ok` \| `cancel` | `ok` | 6.2.0 |
| footer | Footer content, set as `footer: null` when you don't need default buttons | ReactNode \| (originNode: ReactNode, extra: { OkBtn: React.FC, CancelBtn: React.FC }) => ReactNode | - | renderFunction: 5.9.0 |
| getContainer | Return the mount node for Modal | HTMLElement \| () => HTMLElement \| Selectors \| false | document.body |  |
| icon | Custom icon | ReactNode | &lt;ExclamationCircleFilled /> |  |
| keyboard | Whether support press esc to close | boolean | true |  |
| mask | Mask effect | boolean \| `{enabled: boolean, blur: boolean}` | true |  |
| maskClosable | Whether to close the modal dialog when the mask (area outside the modal) is clicked | boolean | false |  |
| okButtonProps | The ok button props | [ButtonProps](/components/button/#api) | - |  |
| okText | Text of the OK button | string | `OK` |  |
| okType | Button `type` of the OK button | string | `primary` |  |
| style | Style of floating layer, typically used at least for adjusting the position | CSSProperties | - |  |
| title | Title | ReactNode | - |  |
| width | Width of the modal dialog | string \| number | 416 |  |
| wrapClassName | The class name of the container of the modal dialog | string | - | 4.18.0 |
| zIndex | The `z-index` of the Modal | number | 1000 |  |
| onCancel | Click to onCancel the callback, the parameter is the closing function, if it returns a promise, resolve means normal closing, reject means not closing | function(close) | - |  |
| onOk | Click to onOk the callback, the parameter is the closing function, if it returns a promise, resolve means normal closing, reject means not closing | function(close) | - |  |

All the `Modal.method`s will return a reference, and then we can update and close the modal dialog by the reference.

### ClosableType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| afterClose | Specify a function that will be called when modal is closed completely | function | - | - |
| closeIcon | Custom close icon | ReactNode | undefined | - |
| disabled | Whether disabled close icon | boolean | false | - |
| onClose | Trigger when modal close | Function | undefined | - |

```jsx
const modal = Modal.info();

modal.update({
  title: 'Updated title',
  content: 'Updated content',
});

// on 4.8.0 or above, you can pass a function to update modal
modal.update((prevConfig) => ({
  ...prevConfig,
  title: `${prevConfig.title} (New)`,
}));

modal.destroy();
```

- `Modal.destroyAll`

`Modal.destroyAll()` could destroy all confirmation modal dialogs(`Modal.confirm|success|info|error|warning`). Usually, you can use it in router change event to destroy confirm modal dialog automatically without use modal reference to close( it's too complex to use for all modal dialogs)

```jsx

// router change
browserHistory.listen(() => {
  Modal.destroyAll();
});
```

### Modal.useModal()

When you need using Context, you can use `contextHolder` which created by `Modal.useModal` to insert into children. Modal created by hooks will get all the context where `contextHolder` are. Created `modal` has the same creating function with `Modal.method`.

```jsx
const [modal, contextHolder] = Modal.useModal();

React.useEffect(() => {
  modal.confirm({
    // ...
  });
}, []);

return <div>{contextHolder}</div>;
```

`modal.confirm` return method:

- `destroy`: Destroy current modal
- `update`: Update current modal
- `then`: (Hooks only) Promise chain call, support `await` operation

```tsx
// Return `true` when click `onOk` and `false` when click `onCancel`
const confirmed = await modal.confirm({ ... });
```

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Modal"></ComponentTokenTable>

## FAQ

### Why content not update when Modal closed? {#faq-content-not-update}

Modal will use memo to avoid content jumping when closed. Also, if you use Form in Modal, you can reset `initialValues` by calling `resetFields` in effect.

### Why I can not access context, redux, ConfigProvider `locale/prefixCls` in Modal.xxx? {#faq-context-redux}

antd will dynamic create React instance by `ReactDOM.render` when call Modal methods. Whose context is different with origin code located context.

When you need context info (like ConfigProvider context), you can use `Modal.useModal` to get `modal` instance and `contextHolder` node. And put it in your children:

```tsx
const [modal, contextHolder] = Modal.useModal();

// then call modal.confirm instead of Modal.confirm

return (
  <Context1.Provider value="Ant">
    {/* contextHolder is in Context1, which means modal will get context of Context1 */}
    {contextHolder}
    <Context2.Provider value="Design">
      {/* contextHolder is out of Context2, which means modal will not get context of Context2 */}
    </Context2.Provider>
  </Context1.Provider>
);
```

**Note:** You must insert `contextHolder` into your children with hooks. You can use origin method if you do not need context connection.

> [App Package Component](/components/app) can be used to simplify the problem of `useModal` and other methods that need to manually implant contextHolder.

### How to set static methods prefixCls ？ {#faq-set-prefix-cls}

You can config with [`ConfigProvider.config`](/components/config-provider#configproviderconfig-4130)


============================================================
 COMPONENT: DRAWER
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/drawer/index.en-US.md
============================================================

## When To Use

A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since the user can interact with the Drawer without leaving the current page, tasks can be achieved more efficiently within the same context.

- Use a Form to create or edit a set of information.
- Processing subtasks. When subtasks are too heavy for a Popover and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
- When the same Form is needed in multiple places.

> Notes for developers
>
> Since the `5.17.0`, we provided the `loading` prop by the Spin. However, since the `5.18.0` version, we have fixed this design error and replaced the Spin with the Skeleton, and also modified the type of `loading` prop, which can only accept `boolean` type.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic-right.tsx">Basic</code>
<code src="./demo/placement.tsx">Custom Placement</code>
<code src="./demo/resizable.tsx" version="6.0.0">Resizable</code>
<code src="./demo/loading.tsx" version="5.17.0">Loading</code>
<code src="./demo/extra.tsx">Extra Actions</code>
<code src="./demo/render-in-current.tsx">Render in current dom</code>
<code src="./demo/form-in-drawer.tsx">Submit form in drawer</code>
<code src="./demo/user-profile.tsx">Preview drawer</code>
<code src="./demo/multi-level-drawer.tsx">Multi-level drawer</code>
<code src="./demo/size.tsx">Preset size</code>
<code src="./demo/classNames.tsx">Customize className for build-in module</code>
<code src="./demo/mask.tsx">mask</code>
<code src="./demo/closable-placement.tsx" version="5.28.0">Closable placement</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/config-provider.tsx" debug>ConfigProvider</code>
<code src="./demo/no-mask.tsx" debug>No mask</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/scroll-debug.tsx" debug>Scroll Debug</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

<!-- prettier-ignore -->
:::warning{title=Note}
v5 uses `rootClassName` & `rootStyle` to configure the outermost element style, instead of `className` & `style` from v4. This is done to align the API with Modal.
:::

| Props | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| afterOpenChange | Callback after the animation ends when switching drawers | function(open) | - |  |
| className | Config Drawer Panel className. Use `rootClassName` if want to config top DOM style | string | - |  |
| classNames | Customize class for each semantic structure inside the Drawer component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| closable | Whether to show a close button. The position can be configured with `placement` | boolean \| { closeIcon?: React.ReactNode; disabled?: boolean; placement?: 'start' \| 'end' } | true | placement: 5.28.0 |
| ~~destroyOnClose~~ | Whether to unmount child components on closing drawer or not | boolean | false |  |
| destroyOnHidden | Whether to unmount child components on closing drawer or not | boolean | false | 5.25.0 |
| extra | Extra actions area at corner | ReactNode | - | 4.17.0 |
| footer | The footer for Drawer | ReactNode | - |  |
| forceRender | Pre-render Drawer component forcibly | boolean | false |  |
| focusable | Configuration for focus management in the Drawer | `{ trap?: boolean, focusTriggerAfterClose?: boolean }` | - | 6.2.0 |
| getContainer | mounted node and display window for Drawer | HTMLElement \| () => HTMLElement \| Selectors \| false | body |  |
| ~~headerStyle~~ | Style of the drawer header part, please use `styles.header` instead | CSSProperties | - |  |
| ~~height~~ | Placement is `top` or `bottom`, height of the Drawer dialog, please use `size` instead | string \| number | 378 |  |
| keyboard | Whether support press esc to close | boolean | true |  |
| loading | Show the Skeleton | boolean | false | 5.17.0 |
| mask | Mask effect | boolean \| `{ enabled?: boolean, blur?: boolean }` | true |  |
| maskClosable | Clicking on the mask (area outside the Drawer) to close the Drawer or not | boolean | true |  |
| maxSize | Maximum size (width or height depending on `placement`) when resizable | number | - | 6.0.0 |
| open | Whether the Drawer dialog is visible or not | boolean | false |  |
| placement | The placement of the Drawer | `top` \| `right` \| `bottom` \| `left` | `right` |  |
| push | Nested drawers push behavior | boolean \| { distance: string \| number } | { distance: 180 } | 4.5.0+ |
| resizable | Enable resizable by dragging | boolean \| [ResizableConfig](#resizableconfig) | - | boolean: 6.1.0 |
| rootStyle | Style of wrapper element which **contains mask** compare to `style` | CSSProperties | - |  |
| size | preset size of drawer, default `378px` and large `736px`, or a custom number | 'default' \| 'large' \| number \| string | 'default' | 4.17.0, string: 6.2.0 |
| style | Style of Drawer panel. Use `styles.body` if want to config body only | CSSProperties | - |  |
| styles | Customize inline style for each semantic structure inside the Drawer component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| title | The title for Drawer | ReactNode | - |  |
| ~~width~~ | Width of the Drawer dialog, please use `size` instead | string \| number | 378 |  |
| zIndex | The `z-index` of the Drawer | number | 1000 |  |
| onClose | Specify a callback that will be called when a user clicks mask, close button or Cancel button | function(e) | - |  |
| drawerRender | Custom drawer content render | (node: ReactNode) => ReactNode | - | 5.18.0 |

### ResizableConfig

| Props         | Description                 | Type                   | Default | Version |
| ------------- | --------------------------- | ---------------------- | ------- | ------- |
| onResizeStart | Callback when resize starts | () => void             | -       | 6.0.0   |
| onResize      | Callback during resizing    | (size: number) => void | -       | 6.0.0   |
| onResizeEnd   | Callback when resize ends   | () => void             | -       | 6.0.0   |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Drawer"></ComponentTokenTable>


============================================================
 COMPONENT: NOTIFICATION
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/notification/index.en-US.md
============================================================

## When To Use

To display a notification message at any of the four corners of the viewport. Typically it can be used in the following cases:

- A notification with complex content.
- A notification providing a feedback based on the user interaction. Or it may show some details about upcoming steps the user may have to follow.
- A notification that is pushed by the application.

## Examples

<!-- prettier-ignore -->
<code src="./demo/hooks.tsx">Hooks usage (recommended)</code>
<code src="./demo/duration.tsx">Duration after which the notification box is closed</code>
<code src="./demo/with-icon.tsx">Notification with icon</code>
<code src="./demo/with-btn.tsx">Custom close button</code>
<code src="./demo/custom-icon.tsx">Customized Icon</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/custom-style.tsx">Customized style</code>
<code src="./demo/update.tsx">Update Message Content</code>
<code src="./demo/stack.tsx" version="5.10.0">Stack</code>
<code src="./demo/show-with-progress.tsx" version="5.18.0">Show with progress</code>
<code src="./demo/basic.tsx">Static Method (deprecated)</code>
<code src="./demo/progress-color.tsx">Customize progress bar color</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>

## API

Common props ref：[Common props](/docs/react/common-props)

- `notification.success(config)`
- `notification.error(config)`
- `notification.info(config)`
- `notification.warning(config)`
- `notification.open(config)`
- `notification.destroy(key?: String)`

The properties of config are as follows:

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actions | Customized button group | ReactNode | - | 5.24.0 |
| ~~btn~~ | Customized close button group, please use `actions` instead | ReactNode | - | - |
| className | Customized CSS class | string | - | - |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| closeIcon | Custom close icon | ReactNode | true | 5.7.0: close button will be hidden when setting to null or false |
| description | The content of notification box (required) | ReactNode | - | - |
| duration | Time in seconds before Notification is closed. When set to `0` or `false`, it will never be closed automatically | number \| false | 4.5 | - |
| showProgress | Show progress bar for auto-closing notification | boolean |  | 5.18.0 |
| pauseOnHover | keep the timer running or not on hover | boolean | true | 5.18.0 |
| icon | Customized icon | ReactNode | - | - |
| key | The unique identifier of the Notification | string | - | - |
| title | The title of notification box | ReactNode | - | 6.0.0 |
| ~~message~~ | The title of notification box (deprecated), please use `title` instead | ReactNode | - | - |
| placement | Position of Notification, can be one of `top` \| `topLeft` \| `topRight` \| `bottom` \| `bottomLeft` \| `bottomRight` | string | `topRight` | - |
| role | The semantics of notification content recognized by screen readers. The default value is `alert`. When set as the default value, the screen reader will promptly interrupt any ongoing content reading and prioritize the notification content for immediate attention. | `alert \| status` | `alert` | 5.6.0 |
| style | Customized inline style | [CSSProperties](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e434515761b36830c3e58a970abf5186f005adac/types/react/index.d.ts#L794) | - | - |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| onClick | Specify a function that will be called when the notification is clicked | function | - | - |
| onClose | Trigger when notification closed | function | - | - |
| props | An object that can contain `data-*`, `aria-*`, or `role` props, to be put on the notification `div`. This currently only allows `data-testid` instead of `data-*` in TypeScript. See https://github.com/microsoft/TypeScript/issues/28960. | Object | - | - |

- `notification.useNotification(config)`

The properties of config are as follows:

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bottom | Distance from the bottom of the viewport, when `placement` is `bottom` `bottomRight` or `bottomLeft` (unit: pixels) | number | 24 |  |
| closeIcon | Custom close icon | ReactNode | true | 5.7.0: close button will be hidden when setting to null or false |
| getContainer | Return the mount node for Notification | () => HTMLNode | () => document.body |  |
| placement | Position of Notification, can be one of `top` \| `topLeft` \| `topRight` \| `bottom` \| `bottomLeft` \| `bottomRight` | string | `topRight` |  |
| showProgress | Show progress bar for auto-closing notification | boolean |  | 5.18.0 |
| pauseOnHover | keep the timer running or not on hover | boolean | true | 5.18.0 |
| rtl | Whether to enable RTL mode | boolean | false |  |
| stack | Notifications will be stacked when amount is over threshold | boolean \| `{ threshold: number }` | `{ threshold: 3 }` | 5.10.0 |
| top | Distance from the top of the viewport, when `placement` is `top` `topRight` or `topLeft` (unit: pixels) | number | 24 |  |
| maxCount | Max Notification show, drop oldest if exceed limit | number | - | 4.17.0 |

`notification` also provides a global `config()` method that can be used for specifying the default options. Once this method is used, all the notification boxes will take into account these globally defined options when displaying.

### ClosableType

| Property  | Description                     | Type      | Default   | Version |
| --------- | ------------------------------- | --------- | --------- | ------- |
| closeIcon | Custom close icon               | ReactNode | undefined | -       |
| onClose   | Trigger when notification close | Function  | undefined | -       |

### Global configuration

`notification.config(options)`

> When you use `ConfigProvider` for global configuration, the system will automatically start RTL mode by default.(4.3.0+)
>
> When you want to use it alone, you can start the RTL mode through the following settings.

#### notification.config

```js
notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
  rtl: true,
});
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| bottom | Distance from the bottom of the viewport, when `placement` is `bottom` `bottomRight` or `bottomLeft` (unit: pixels) | number | 24 |  |
| closeIcon | Custom close icon | ReactNode | true | 5.7.0: close button will be hidden when setting to null or false |
| duration | Time in seconds before Notification is closed. When set to 0 or null, it will never be closed automatically | number | 4.5 |  |
| getContainer | Return the mount node for Notification, but still display at fullScreen | () => HTMLNode | () => document.body |  |
| placement | Position of Notification, can be one of `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | string | `topRight` |  |
| showProgress | Show progress bar for auto-closing notification | boolean |  | 5.18.0 |
| pauseOnHover | keep the timer running or not on hover | boolean | true | 5.18.0 |
| rtl | Whether to enable RTL mode | boolean | false |  |
| top | Distance from the top of the viewport, when `placement` is `top` `topRight` or `topLeft` (unit: pixels) | number | 24 |  |
| maxCount | Max Notification show, drop oldest if exceed limit | number | - | 4.17.0 |

## Semantic DOM

<!-- prettier-ignore -->
<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Notification"></ComponentTokenTable>

## FAQ

### Why I can not access context, redux, ConfigProvider `locale/prefixCls/theme` in notification? {#faq-context-redux}

antd will dynamic create React instance by `ReactDOM.render` when call notification methods. Whose context is different with origin code located context.

When you need context info (like ConfigProvider context), you can use `notification.useNotification` to get `api` instance and `contextHolder` node. And put it in your children:

```tsx
const [api, contextHolder] = notification.useNotification();

return (
  <Context1.Provider value="Ant">
    {/* contextHolder is inside Context1 which means api will get value of Context1 */}
    {contextHolder}
    <Context2.Provider value="Design">
      {/* contextHolder is outside Context2 which means api will **not** get value of Context2 */}
    </Context2.Provider>
  </Context1.Provider>
);
```

**Note:** You must insert `contextHolder` into your children with hooks. You can use origin method if you do not need context connection.

> [App Package Component](/components/app) can be used to simplify the problem of `useNotification` and other methods that need to manually implant contextHolder.

### How to set static methods prefixCls ？ {#faq-set-prefix-cls}

You can config with [`ConfigProvider.config`](/components/config-provider#configproviderconfig-4130)


============================================================
 COMPONENT: MESSAGE
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/message/index.en-US.md
============================================================

## When To Use

- To provide feedback such as success, warning, error etc.
- A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.

## Examples

<!-- prettier-ignore -->
<code src="./demo/hooks.tsx">Hooks usage (recommended)</code>
<code src="./demo/other.tsx">Other types of message</code>
<code src="./demo/duration.tsx">Customize duration</code>
<code src="./demo/loading.tsx">Message with loading indicator</code>
<code src="./demo/thenable.tsx">Promise interface</code>
<code src="./demo/custom-style.tsx">Customized style</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/update.tsx">Update Message Content</code>
<code src="./demo/info.tsx">Static method (deprecated)</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

This component provides some static methods, with usage and arguments as following:

- `message.success(content, [duration], onClose)`
- `message.error(content, [duration], onClose)`
- `message.info(content, [duration], onClose)`
- `message.warning(content, [duration], onClose)`
- `message.loading(content, [duration], onClose)`

| Argument | Description | Type | Default |
| --- | --- | --- | --- |
| content | The content of the message | ReactNode \| config | - |
| duration | Time(seconds) before auto-dismiss, don't dismiss if set to 0 | number | 1.5 |
| onClose | Specify a function that will be called when the message is closed | function | - |

`afterClose` can be called in thenable interface:

- `message[level](content, [duration]).then(afterClose)`
- `message[level](content, [duration], onClose).then(afterClose)`

where `level` refers one static methods of `message`. The result of `then` method will be a Promise.

Supports passing parameters wrapped in an object:

- `message.open(config)`
- `message.success(config)`
- `message.error(config)`
- `message.info(config)`
- `message.warning(config)`
- `message.loading(config)`

The properties of config are as follows:

| Property | Description | Type | Default |
| --- | --- | --- | --- | --- |
| className | Customized CSS class | string | - |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |
| content | The content of the message | ReactNode | - |
| duration | Time(seconds) before auto-dismiss, don't dismiss if set to 0 | number | 3 |
| icon | Customized Icon | ReactNode | - |
| pauseOnHover | keep the timer running or not on hover | boolean | true | - |
| key | The unique identifier of the Message | string \| number | - |
| style | Customized inline style | [CSSProperties](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e434515761b36830c3e58a970abf5186f005adac/types/react/index.d.ts#L794) | - |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |
| onClick | Specify a function that will be called when the message is clicked | function | - |
| onClose | Specify a function that will be called when the message is closed | function | - |

### Global static methods

Methods for global configuration and destruction are also provided:

- `message.config(options)`
- `message.destroy()`

> use `message.destroy(key)` to remove a message.

#### message.config

> When you use `ConfigProvider` for global configuration, the system will automatically start RTL mode by default.(4.3.0+)
>
> When you want to use it alone, you can start the RTL mode through the following settings.

```js
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: 'my-message',
});
```

| Argument | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| duration | Time before auto-dismiss, in seconds | number | 3 |  |
| getContainer | Return the mount node for Message, but still display at fullScreen | () => HTMLElement | () => document.body |  |
| maxCount | Max message show, drop oldest if exceed limit | number | - |  |
| prefixCls | The prefix className of message node | string | `ant-message` | 4.5.0 |
| rtl | Whether to enable RTL mode | boolean | false |  |
| top | Distance from top | string \| number | 8 |  |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Message"></ComponentTokenTable>

## FAQ

### Why I can not access context, redux, ConfigProvider `locale/prefixCls/theme` in message? {#faq-context-redux}

antd will dynamic create React instance by `ReactDOM.render` when call message methods. Whose context is different with origin code located context.

When you need context info (like ConfigProvider context), you can use `message.useMessage` to get `api` instance and `contextHolder` node. And put it in your children:

```tsx
const [api, contextHolder] = message.useMessage();

return (
  <Context1.Provider value="Ant">
    {/* contextHolder is inside Context1 which means api will get value of Context1 */}
    {contextHolder}
    <Context2.Provider value="Design">
      {/* contextHolder is outside Context2 which means api will **not** get value of Context2 */}
    </Context2.Provider>
  </Context1.Provider>
);
```

**Note:** You must insert `contextHolder` into your children with hooks. You can use origin method if you do not need context connection.

> [App Package Component](/components/app) can be used to simplify the problem of `useMessage` and other methods that need to manually implant contextHolder.

### How to set static methods prefixCls ？ {#faq-set-prefix-cls}

You can config with [`ConfigProvider.config`](/components/config-provider#configproviderconfig-4130)


============================================================
 COMPONENT: PROGRESS
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/progress/index.en-US.md
============================================================

## When To Use

If it will take a long time to complete an operation, you can use `Progress` to show the current progress and status.

- When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.
- When you need to display the completion percentage of an operation.

## Examples

<!-- prettier-ignore -->
<code src="./demo/line.tsx">Progress bar</code>
<code src="./demo/circle.tsx">Circular progress bar</code>
<code src="./demo/line-mini.tsx">Mini size progress bar</code>
<code src="./demo/circle-micro.tsx">Responsive circular progress bar</code>
<code src="./demo/circle-mini.tsx">Mini size circular progress bar</code>
<code src="./demo/dynamic.tsx">Dynamic</code>
<code src="./demo/format.tsx">Custom text format</code>
<code src="./demo/dashboard.tsx">Dashboard</code>
<code src="./demo/segment.tsx">Progress bar with success segment</code>
<code src="./demo/linecap.tsx">Stroke Linecap</code>
<code src="./demo/gradient-line.tsx">Custom line gradient</code>
<code src="./demo/steps.tsx">Progress bar with steps</code>
<code src="./demo/circle-steps.tsx" version="5.16.0">Circular progress bar with steps</code>
<code src="./demo/size.tsx">Progress size</code>
<code src="./demo/info-position.tsx" version="5.18.0">Change progress value position</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>

## API

Common props ref：[Common props](/docs/react/common-props)

Properties that shared by all types.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| format | The template function of the content | function(percent, successPercent) | (percent) => percent + `%` | - |
| percent | To set the completion percentage | number | 0 | - |
| railColor | The color of unfilled part | string | - | - |
| showInfo | Whether to display the progress value and the status icon | boolean | true |
| status | To set the status of the Progress, options: `success` `exception` `normal` `active`(line only) | string | - |
| strokeColor | The color of progress bar | string | - | - |
| strokeLinecap | To set the style of the progress linecap | `round` \| `butt` \| `square`, see [stroke-linecap](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) | `round` | - |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| success | Configs of successfully progress bar | { percent: number, strokeColor: string } | - | - |
| ~~trailColor~~ | The color of unfilled part. Please use `railColor` instead | string | - | - |
| type | To set the type, options: `line` `circle` `dashboard` | string | `line` |
| size | Progress size | number \| \[number \| string, number] \| { width: number, height: number } \| "small" \| "default" | "default" | 5.3.0, Object: 5.18.0 |

### `type="line"`

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| steps | The total step count | number | - | - |
| rounding | The function to round the value | (step: number) => number | Math.round | 5.24.0 |
| strokeColor | The color of progress bar, render `linear-gradient` when passing an object, could accept `string[]` when has `steps`. | string \| string[] \| { from: string; to: string; direction: string } | - | 4.21.0: `string[]` |
| percentPosition | Progress value position, passed in object, `align` indicates the horizontal position of the value, `type` indicates whether the value is inside or outside the progress bar | { align: string; type: string } | { align: \"end\", type: \"outer\" } | 5.18.0 |

### `type="circle"`

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| steps | The total step count.When passing an object, `count` refers to the number of steps, and `gap` refers to the distance between them.When passing number, the default value for `gap` is 2. | number \| { count: number, gap: number } | - | 5.16.0 |
| strokeColor | The color of circular progress, render gradient when passing an object | string \| { number%: string } | - | - |
| strokeWidth | To set the width of the circular progress, unit: percentage of the canvas width | number | 6 | - |

### `type="dashboard"`

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| steps | The total step count.When passing an object, `count` refers to the number of steps, and `gap` refers to the distance between them.When passing number, the default value for `gap` is 2. | number \| { count: number, gap: number } | - | 5.16.0 |
| gapDegree | The gap degree of half circle, 0 ~ 295 | number | 75 |
| gapPlacement | The gap placement, options: `top` `bottom` `start` `end` | string | `bottom` |
| ~~gapPosition~~ | The gap position, options: `top` `bottom` `left` `right`, please use `gapPlacement` instead | string | `bottom` |
| strokeWidth | To set the width of the dashboard progress, unit: percentage of the canvas width | number | 6 |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Progress"></ComponentTokenTable>


============================================================
 COMPONENT: SPIN
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/spin/index.en-US.md
============================================================

## When To Use

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Usage</code>
<code src="./demo/size.tsx">Size</code>
<code src="./demo/nested.tsx">Embedded mode</code>
<code src="./demo/tip.tsx">Customized description</code>
<code src="./demo/delayAndDebounce.tsx">Delay</code>
<code src="./demo/custom-indicator.tsx">Custom spinning indicator</code>
<code src="./demo/percent.tsx" version="5.18.0">Progress</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/fullscreen.tsx">Fullscreen</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| delay | Specifies a delay in milliseconds for loading state (prevent flush) | number (milliseconds) | - |  |
| fullscreen | Display a backdrop with the `Spin` component | boolean | false | 5.11.0 |
| indicator | React node of the spinning indicator | ReactNode | - |  |
| percent | The progress percentage, when set to `auto`, it will be an indeterminate progress | number \| 'auto' | - | 5.18.0 |
| size | The size of Spin, options: `small`, `default` and `large` | string | `default` |  |
| spinning | Whether Spin is visible | boolean | true |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| tip | Customize description content when Spin has children | ReactNode | - |  |
| wrapperClassName | The className of wrapper when Spin has children | string | - |  |

### Static Method

- `Spin.setDefaultIndicator(indicator: ReactNode)`

  You can define default spin element globally.

## Semantic DOM

### default

<code src="./demo/_semantic.tsx" simplify="true"></code>

### fullscreen

<code src="./demo/_semantic_fullscreen.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Spin"></ComponentTokenTable>


============================================================
 COMPONENT: SKELETON
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/skeleton/index.en-US.md
============================================================

## When To Use

- When a resource needs long time to load.
- When the component contains lots of information, such as List or Card.
- Only works when loading data for the first time.
- Could be replaced by Spin in any situation, but can provide a better user experience.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/complex.tsx">Complex combination</code>
<code src="./demo/active.tsx">Active Animation</code>
<code src="./demo/element.tsx">Button/Avatar/Input/Image/Node</code>
<code src="./demo/children.tsx">Contains sub component</code>
<code src="./demo/list.tsx">List</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/componentToken.tsx" debug>Custom component token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Common API

<embed src="./shared/sharedProps.en-US.md"></embed>

### Skeleton

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| active | Show animation effect | boolean | false |  |
| avatar | Show avatar placeholder | boolean \| [SkeletonAvatarProps](#skeletonavatarprops) | false |  |
| loading | Display the skeleton when true | boolean | - |  |
| paragraph | Show paragraph placeholder | boolean \| [SkeletonParagraphProps](#skeletonparagraphprops) | true |  |
| round | Show paragraph and title radius when true | boolean | false |  |
| title | Show title placeholder | boolean \| [SkeletonTitleProps](#skeletontitleprops) | true |  |

#### SkeletonTitleProps

| Property | Description            | Type             | Default |
| -------- | ---------------------- | ---------------- | ------- |
| width    | Set the width of title | number \| string | -       |

#### SkeletonParagraphProps

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| rows | Set the row count of paragraph | number | - |
| width | Set the width of paragraph. When width is an Array, it can set the width of each row. Otherwise only set the last row width | number \| string \| Array&lt;number \| string> | - |

### Skeleton.Avatar

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| active | Show animation effect, only valid when used avatar independently | boolean | false |
| shape | Set the shape of avatar | `circle` \| `square` | `circle` |
| size | Set the size of avatar | number \| `large` \| `small` \| `default` | `default` |

### Skeleton.Button

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| active | Show animation effect | boolean | false |  |
| block | Option to fit button width to its parent width | boolean | false | 4.17.0 |
| shape | Set the shape of button | `circle` \| `round` \| `square` \| `default` | - |  |
| size | Set the size of button | `large` \| `small` \| `default` | - |  |

### Skeleton.Input

| Property | Description           | Type                            | Default |
| -------- | --------------------- | ------------------------------- | ------- |
| active   | Show animation effect | boolean                         | false   |
| size     | Set the size of input | `large` \| `small` \| `default` | -       |

## Semantic DOM

### Skeleton

<code src="./demo/_semantic.tsx" simplify="true"></code>

### Skeleton.Element

<code src="./demo/_semantic_element.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Skeleton"></ComponentTokenTable>


============================================================
 COMPONENT: RESULT
 SOURCE: https://raw.githubusercontent.com/ant-design/ant-design/master/components/result/index.en-US.md
============================================================

## When To Use

Use when important operations need to inform the user to process the results and the feedback is more complicated.

## Examples

<!-- prettier-ignore -->
<code src="./demo/success.tsx">Success</code>
<code src="./demo/info.tsx">Info</code>
<code src="./demo/warning.tsx">Warning</code>
<code src="./demo/403.tsx">403</code>
<code src="./demo/404.tsx">404</code>
<code src="./demo/500.tsx">500</code>
<code src="./demo/error.tsx">Error</code>
<code src="./demo/customIcon.tsx">Custom icon</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| extra | Operating area | ReactNode | - |  |
| icon | Custom back icon | ReactNode | - |  |
| status | Result status, decide icons and colors | `success` \| `error` \| `info` \| `warning` \| `404` \| `403` \| `500` | `info` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| subTitle | The subTitle | ReactNode | - |  |
| title | The title | ReactNode | - |  |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Result"></ComponentTokenTable>