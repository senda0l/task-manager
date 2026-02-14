# Shared UI Components

A comprehensive library of reusable, shadcn-styled Vue 3 components built on top of [Radix Vue](https://www.radix-vue.com/) primitives. Accessible, composable, and fully customizable via Tailwind CSS.

## Quick Start

All components live in `src/shared/ui/` and can be imported directly or via the barrel export:

```vue
<script setup>
import { Button, Input, Card } from '~/shared/ui'
// or import individually:
import Button from '~/shared/ui/Button.vue'
</script>
```

Every component accepts a `class` prop for Tailwind overrides via `cn()` (a `clsx` + `tailwind-merge` utility).

---

## Form Components

### Button

A versatile button with multiple variants and sizes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Visual style |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | Button size |
| `as` | `string` | `'button'` | Render as a different element |
| `disabled` | `boolean` | `false` | Disabled state |

```vue
<Button variant="outline" size="sm">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost" size="icon"><TrashIcon class="h-4 w-4" /></Button>
```

---

### Input

A styled text input with consistent focus ring behavior.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Two-way bound value |
| `placeholder` | `string` | — | Placeholder text |
| `type` | `string` | `'text'` | HTML input type |
| `disabled` | `boolean` | `false` | Disabled state |

```vue
<Input v-model="email" placeholder="you@example.com" type="email" />
```

---

### Textarea

A multi-line text input.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Two-way bound value |
| `placeholder` | `string` | — | Placeholder |
| `rows` | `number` | `3` | Number of visible rows |
| `disabled` | `boolean` | `false` | Disabled state |

```vue
<Textarea v-model="bio" placeholder="Tell us about yourself..." :rows="5" />
```

---

### Label

An accessible form label (uses Radix `Label`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `for` | `string` | — | Associated input ID |

```vue
<Label for="name">Full Name</Label>
<Input id="name" v-model="name" />
```

---

### Checkbox

An accessible checkbox with check indicator (uses Radix `CheckboxRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether checked |
| `disabled` | `boolean` | `false` | Disabled state |
| `name` | `string` | — | Form field name |

**Events:** `update:checked`

```vue
<Checkbox :checked="agreed" @update:checked="agreed = $event" />
```

---

### Switch

A toggle switch (uses Radix `SwitchRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Current state |
| `disabled` | `boolean` | `false` | Disabled state |
| `name` | `string` | — | Form field name |

**Events:** `update:checked`

```vue
<div class="flex items-center gap-2">
  <Switch :checked="enabled" @update:checked="enabled = $event" />
  <Label>Enable notifications</Label>
</div>
```

---

### Select

A dropdown select with search-free item selection (uses Radix `SelectRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Selected value |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `options` | `Array<{ label, value, disabled? }>` | **required** | Items list |

**Events:** `update:modelValue`

```vue
<Select
  v-model="priority"
  placeholder="Select priority"
  :options="[
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ]"
/>
```

---

### RadioGroup

A radio button group (uses Radix `RadioGroupRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Selected value |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction |
| `options` | `Array<{ label, value, description?, disabled? }>` | **required** | Options |

**Events:** `update:modelValue`

```vue
<RadioGroup
  v-model="plan"
  :options="[
    { label: 'Free', value: 'free', description: '0$/mo' },
    { label: 'Pro', value: 'pro', description: '9$/mo' },
  ]"
/>
```

---

### Slider

A range slider with one or more thumbs (uses Radix `SliderRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number[]` | `[0]` | Current value(s) |
| `min` | `number` | `0` | Minimum |
| `max` | `number` | `100` | Maximum |
| `step` | `number` | `1` | Step increment |
| `disabled` | `boolean` | `false` | Disabled state |

**Events:** `update:modelValue`

```vue
<Slider :model-value="[50]" @update:model-value="volume = $event" />
```

---

### Toggle

A two-state toggle button (uses Radix `Toggle`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pressed` | `boolean` | — | Toggle state |
| `variant` | `'default' \| 'outline'` | `'default'` | Style variant |
| `size` | `'default' \| 'sm' \| 'lg'` | `'default'` | Size |
| `disabled` | `boolean` | `false` | Disabled state |

**Events:** `update:pressed`

```vue
<Toggle :pressed="bold" @update:pressed="bold = $event">
  <Bold class="h-4 w-4" />
</Toggle>
```

---

## Card Components

### Card, CardHeader, CardTitle, CardDescription, CardContent

A structured card container with semantic sections.

```vue
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card body goes here.</p>
  </CardContent>
</Card>
```

---

## Feedback Components

### Alert / AlertTitle / AlertDescription

A callout for important messages.

| Prop (Alert) | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive'` | `'default'` | Style variant |

```vue
<Alert variant="destructive">
  <AlertCircle class="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

---

### Badge

A small label for status or count.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` | Style variant |

```vue
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Urgent</Badge>
```

---

### Progress

A progress bar (uses Radix `ProgressRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number` | `0` | Current progress value |
| `max` | `number` | `100` | Maximum value |

```vue
<Progress :model-value="66" />
```

---

### Skeleton

A loading placeholder with pulse animation.

```vue
<div class="flex items-center gap-4">
  <Skeleton class="h-12 w-12 rounded-full" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-[250px]" />
    <Skeleton class="h-4 w-[200px]" />
  </div>
</div>
```

---

## Layout Components

### Separator

A visual divider (uses Radix `Separator`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| `decorative` | `boolean` | `true` | If true, hidden from screen readers |

```vue
<Separator />
<Separator orientation="vertical" class="h-6" />
```

---

### ScrollArea

A scrollable container with consistent styling.

```vue
<ScrollArea class="h-72">
  <!-- scrollable content -->
</ScrollArea>
```

---

### Accordion

An expandable/collapsible list of sections (uses Radix `AccordionRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'single'` | Open one or many |
| `collapsible` | `boolean` | `true` | Allow collapsing all items |
| `items` | `Array<{ value, title, content }>` | **required** | Panel definitions |

```vue
<Accordion
  :items="[
    { value: 'a', title: 'Is it accessible?', content: 'Yes. Adheres to WAI-ARIA.' },
    { value: 'b', title: 'Is it styled?', content: 'Yes. Uses shadcn design tokens.' },
  ]"
/>
```

---

### Tabs / TabsContent

A tabbed interface (uses Radix `TabsRoot`).

| Prop (Tabs) | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Active tab value |
| `defaultValue` | `string` | — | Initial active tab |
| `tabs` | `Array<{ value, label, disabled? }>` | **required** | Tab definitions |

```vue
<Tabs :tabs="[{ value: 'a', label: 'Account' }, { value: 'b', label: 'Settings' }]" default-value="a">
  <TabsContent value="a">Account settings here.</TabsContent>
  <TabsContent value="b">Other settings here.</TabsContent>
</Tabs>
```

---

### Collapsible

A toggleable section (uses Radix `CollapsibleRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial state |
| `disabled` | `boolean` | `false` | Disabled |

**Events:** `update:open`

```vue
<Collapsible v-model:open="isOpen">
  <template #trigger-content>
    <Button variant="ghost">Toggle</Button>
  </template>
  <p>Collapsible content here.</p>
</Collapsible>
```

---

### AspectRatio

Maintains a consistent width-to-height ratio (uses Radix `AspectRatio`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `number` | `16/9` | Width/height ratio |

```vue
<AspectRatio :ratio="16 / 9">
  <img src="/photo.jpg" class="rounded-md object-cover w-full h-full" />
</AspectRatio>
```

---

## Overlay Components

### Dialog

A modal dialog window (uses Radix `DialogRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled state |
| `showClose` (DialogContent) | `boolean` | `true` | Show X close button |

**Sub-components:** `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`

```vue
<Dialog v-model:open="open">
  <DialogTrigger as-child>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile.</DialogDescription>
    </DialogHeader>
    <!-- form content -->
    <DialogFooter>
      <Button @click="open = false">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### AlertDialog

A confirmation dialog that requires user action (uses Radix `AlertDialogRoot`).

**Sub-components:** `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`

```vue
<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

### Tooltip

A small popup showing extra information on hover (uses Radix `TooltipRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | **required** | Tooltip text |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Placement |
| `sideOffset` | `number` | `4` | Gap from trigger |
| `delayDuration` | `number` | `200` | Show delay (ms) |

```vue
<Tooltip content="Add to library">
  <Button variant="outline" size="icon"><Plus class="h-4 w-4" /></Button>
</Tooltip>
```

---

### Popover

A floating panel with rich content (uses Radix `PopoverRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled state |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Placement |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment |
| `showClose` | `boolean` | `false` | Show close button |

**Events:** `update:open`

```vue
<Popover>
  <template #trigger>
    <Button variant="outline">Open Popover</Button>
  </template>
  <div class="grid gap-4">
    <h4 class="font-medium leading-none">Settings</h4>
    <Input placeholder="Width" />
  </div>
</Popover>
```

---

### HoverCard

Content shown on hover (uses Radix `HoverCardRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Placement |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment |
| `openDelay` | `number` | `200` | Show delay (ms) |
| `closeDelay` | `number` | `100` | Hide delay (ms) |

```vue
<HoverCard>
  <template #trigger>
    <a href="#">@user</a>
  </template>
  <div class="flex gap-4">
    <Avatar src="/avatar.jpg" alt="User" />
    <div>
      <h4 class="text-sm font-semibold">John Doe</h4>
      <p class="text-sm text-muted-foreground">Developer</p>
    </div>
  </div>
</HoverCard>
```

---

### Sheet

A slide-out panel from any edge (uses Radix `DialogRoot` with slide animation).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled state |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Slide direction |
| `showClose` | `boolean` | `true` | Show close button |

**Events:** `update:open`

```vue
<Sheet v-model:open="sheetOpen" side="right">
  <template #trigger>
    <Button variant="outline">Open Sheet</Button>
  </template>
  <h2 class="text-lg font-semibold">Sheet Content</h2>
  <p>Side panel content goes here.</p>
</Sheet>
```

---

### DropdownMenu

A menu of actions triggered by a button (uses Radix `DropdownMenuRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `DropdownMenuItemDef[]` | **required** | Menu items (see below) |
| `align` | `'start' \| 'center' \| 'end'` | `'end'` | Alignment |
| `sideOffset` | `number` | `4` | Gap from trigger |

**Item definition:**
```ts
interface DropdownMenuItemDef {
  label: string
  icon?: Component        // Lucide icon component
  shortcut?: string       // e.g. '⌘K'
  disabled?: boolean
  destructive?: boolean
  onClick?: () => void
  type?: 'item' | 'label' | 'separator' | 'checkbox'
  checked?: boolean
  onCheckedChange?: (val: boolean) => void
  children?: DropdownMenuItemDef[]   // submenu
}
```

```vue
<DropdownMenu :items="[
  { type: 'label', label: 'My Account' },
  { type: 'separator', label: '' },
  { label: 'Profile', icon: User, shortcut: '⌘P' },
  { label: 'Settings', icon: Settings },
  { type: 'separator', label: '' },
  { label: 'Log out', destructive: true, onClick: logout },
]">
  <template #trigger>
    <Button variant="outline">Menu</Button>
  </template>
</DropdownMenu>
```

---

## Data Display Components

### Avatar

A user avatar with image and fallback initials (uses Radix `AvatarRoot`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Alt text (used for initials if no fallback) |
| `fallback` | `string` | — | Explicit fallback text |
| `size` | `'default' \| 'sm' \| 'lg' \| 'xl'` | `'default'` | Avatar size |

```vue
<Avatar src="/avatar.jpg" alt="John Doe" />
<Avatar alt="Jane Smith" size="lg" />  <!-- Shows "JS" -->
```

---

### Table

A styled data table with semantic sub-components.

**Sub-components:** `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableFooter`, `TableCaption`

```vue
<Table>
  <TableCaption>A list of recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead class="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow v-for="invoice in invoices" :key="invoice.id">
      <TableCell class="font-medium">{{ invoice.id }}</TableCell>
      <TableCell>{{ invoice.status }}</TableCell>
      <TableCell class="text-right">{{ invoice.amount }}</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

### Breadcrumb

Navigation breadcrumbs with auto-generated separators.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<{ label, href?, icon?, current? }>` | **required** | Breadcrumb items |

```vue
<Breadcrumb :items="[
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Task Manager', current: true },
]" />
```

---

### Pagination

Page navigation with ellipsis support.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | **required** | Active page |
| `totalPages` | `number` | **required** | Total pages |
| `siblingCount` | `number` | `1` | Pages shown around current |

**Events:** `update:currentPage`

```vue
<Pagination :current-page="page" :total-pages="20" @update:current-page="page = $event" />
```

---

## Utility

### `cn(...inputs)`

Merges Tailwind classes with conflict resolution. Located at `~/shared/lib/utils.ts`.

```ts
import { cn } from '~/shared/lib/utils'

cn('px-4 py-2', 'px-6') // → 'py-2 px-6'
cn('text-red-500', condition && 'text-blue-500')
```

---

## Theming

CSS variables are defined in `src/assets/css/main.css`. Toggle dark mode by adding/removing the `dark` class on `<html>`.

**Key variables:** `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`.

All semantic color tokens (e.g. `bg-primary`, `text-muted-foreground`, `border-input`) are mapped from these variables in `tailwind.config.js`.

---

## File Structure

```
src/shared/ui/
├── index.ts              # Barrel export
├── Button.vue            # Form
├── Input.vue
├── Textarea.vue
├── Label.vue
├── Checkbox.vue
├── Switch.vue
├── Select.vue
├── RadioGroup.vue
├── Slider.vue
├── Toggle.vue
├── Card.vue              # Card
├── CardHeader.vue
├── CardTitle.vue
├── CardDescription.vue
├── CardContent.vue
├── Alert.vue             # Feedback
├── AlertTitle.vue
├── AlertDescription.vue
├── Badge.vue
├── Progress.vue
├── Skeleton.vue
├── Separator.vue         # Layout
├── ScrollArea.vue
├── Accordion.vue
├── Tabs.vue
├── TabsContent.vue
├── Collapsible.vue
├── AspectRatio.vue
├── Tooltip.vue           # Overlay
├── Popover.vue
├── HoverCard.vue
├── Sheet.vue
├── DropdownMenu.vue
├── Avatar.vue            # Data Display
├── Breadcrumb.vue
├── Pagination.vue
├── dialog/               # Dialog (compound)
│   ├── index.ts
│   ├── Dialog.vue
│   ├── DialogTrigger.vue
│   ├── DialogContent.vue
│   ├── DialogHeader.vue
│   ├── DialogFooter.vue
│   ├── DialogTitle.vue
│   ├── DialogDescription.vue
│   └── DialogClose.vue
├── alert-dialog/         # Alert Dialog (compound)
│   ├── index.ts
│   ├── AlertDialog.vue
│   ├── AlertDialogTrigger.vue
│   ├── AlertDialogContent.vue
│   ├── AlertDialogHeader.vue
│   ├── AlertDialogFooter.vue
│   ├── AlertDialogTitle.vue
│   ├── AlertDialogDescription.vue
│   ├── AlertDialogAction.vue
│   └── AlertDialogCancel.vue
└── table/                # Table (compound)
    ├── index.ts
    ├── Table.vue
    ├── TableHeader.vue
    ├── TableBody.vue
    ├── TableRow.vue
    ├── TableHead.vue
    ├── TableCell.vue
    ├── TableFooter.vue
    └── TableCaption.vue
```
