# Development Guide

## Related Documentation

- [HubSpot Data Integration Guide](./HUBSPOT_DATA_INTEGRATION.md) - Connect to real CRM data

---

## Quick Start

### 1. Install Dependencies

```bash
# Root level
npm install

# Theme level
cd src/theme/challenge-theme
npm install
cd ../../..
```

### 2. Authenticate with HubSpot

```bash
hs auth
```

Follow the prompts to log in to your HubSpot developer account.

### 3. Start Development Server

```bash
cd src/theme/challenge-theme
npm start -- --storybook --generateFieldTypes
```

This will:
- Start the dev server on `http://localhost:3000`
- Enable Storybook on `http://localhost:6006`
- Auto-generate TypeScript types for fields

### 4. View Your Component

**Offline preview (fastest):**
```
http://localhost:3000/module/ImageGallery
```

**With HubSpot backend:**
```
http://localhost:3000/preview/module/ImageGallery
```

## Testing Features

### Lightbox
1. Click any image in the grid
2. Use arrow keys to navigate
3. Press ESC to close
4. Use +/- keys to zoom
5. On mobile: swipe left/right

### Drag-to-Reorder
1. Click and hold any image
2. Drag to a new position
3. Release to drop
4. Images will reorder

### Category Filtering
1. Click a category button at the top
2. Grid will filter to show only that category
3. Click "All" to show everything

### Infinite Scroll
1. Scroll to the bottom of the page
2. More images will automatically load
3. Watch for the loading indicator
4. Continues until all images are loaded

## Modifying the Component

### Adding New Images

Edit the `fieldValues.images` array in the component or through HubSpot's content editor after deployment.

### Changing Grid Layout

Modify the `gridColumns` field values:
```tsx
gridColumns: {
  mobile: 1,   // 1-3 columns
  tablet: 2,   // 1-4 columns
  desktop: 4   // 1-6 columns
}
```

### Toggling Features

Use the boolean fields in HubSpot or modify field defaults:
- `enableLightbox`
- `enableZoom`
- `enableDragReorder`
- `enableFiltering`
- `enableInfiniteScroll`

### Custom Styling

The components use CSS Modules. To customize:

1. **Shared styles**: Edit `styles/common.module.css` for reusable classes
2. **Component styles**: Edit component-specific CSS files (e.g., `styles/EventsGrid.module.css`)
3. **Import pattern**: Components import styles as `import styles from './ComponentName.module.css'`

## Connecting to HubSpot CRM Data

See [HUBSPOT_DATA_INTEGRATION.md](./HUBSPOT_DATA_INTEGRATION.md) for detailed instructions on:
- Setting up CRM properties
- Creating custom objects
- Removing demo data
- GraphQL query examples

## Deployment

### Deploy to HubSpot

```bash
# From project root
npm run deploy

# Or
hs project upload
```

### Verify Deployment

1. Log into HubSpot account
2. Navigate to Content > Design Manager
3. Find your project in the file tree
4. Create a new page using the template
5. Add the ImageGallery module

## Troubleshooting

### Islands not hydrating

1. Check that imports use `?island` suffix
2. Verify `Island` component is imported from `@hubspot/cms-components`
3. Check browser console for JavaScript errors

### Drag-and-drop not working

1. Ensure `enableDragReorder` is `true`
2. Check that `isHydrated` is true (may take a moment after page load)
3. Try on desktop (drag-and-drop is desktop-only by default)

### Images not loading

1. Check image URLs are valid and accessible
2. Verify CORS headers if using external images
3. Check browser network tab for failed requests

### TypeScript errors

1. Run dev server with `--generateFieldTypes` flag
2. Wait for `fields.types.ts` to be generated
3. Restart TypeScript server in VS Code (Cmd+Shift+P > "Restart TS Server")

## Performance Testing

### Lighthouse Audit

1. Build and deploy the component
2. Open Chrome DevTools
3. Go to Lighthouse tab
4. Run audit in "Navigation" mode
5. Check Performance, Accessibility, Best Practices scores

### Expected Scores
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Storybook Development

### Running Storybook

```bash
cd src/theme/challenge-theme
npm start -- --storybook
```

Access at `http://localhost:6006`

### Available Stories

1. **BasicGallery**: 6 images, all features enabled
2. **LargeGalleryWithInfiniteScroll**: 50 images, tests performance
3. **MobileLayout**: Single column, mobile viewport
4. **DenseGrid**: 6 columns, compact layout
5. **MinimalGallery**: All features disabled
6. **CustomAccentColor**: Green accent color
7. **SingleCategory**: Filtered to one category
8. **EmptyGallery**: No images (edge case)

### Creating New Stories

Edit `ImageGallery.stories.jsx`:

```jsx
export const MyCustomStory = {
  args: {
    fieldValues: {
      images: [...],
      gridColumns: { mobile: 1, tablet: 2, desktop: 3 },
      // ... other fields
    },
  },
};
```

## Code Quality

### Linting

```bash
npm run prettier
```

### TypeScript Check

The dev server automatically type-checks when using `--generateFieldTypes`.

## Best Practices

### Do's ✅
- Use semantic HTML elements
- Add ARIA labels for accessibility
- Optimize images before uploading
- Use lazy loading for images
- Test on multiple devices
- Keep bundle sizes small

### Don'ts ❌

- Don't import heavy libraries in islands
- Avoid inline styles (use CSS Modules)
- Don't use `console.log` in production
- Avoid synchronous expensive operations
- Don't skip accessibility features

## Resources

- [HubSpot CMS React Docs](https://developers.hubspot.com/docs/cms/start-building/introduction/react-plus-hubl/overview)
- [CSS Modules Guide](https://github.com/css-modules/css-modules)
- [React Hooks Reference](https://react.dev/reference/react)
- [MDN Web Docs](https://developer.mozilla.org/)
