# Social Media Image Generator

A sophisticated AI-powered social media image generator that creates platform-specific graphics with native preview frames. This tool combines intelligent prompt engineering, dynamic UI components, and canvas-based rendering to deliver professional social media content.

## 📁 Project Structure

```
social-image-generator/
├── SocialImageGeneratorPage.tsx    # Main component & orchestration
├── constants.ts                    # Configuration & data definitions
├── types.ts                       # TypeScript type definitions
├── components/
│   ├── WizardPanel.tsx            # Left panel - configuration wizard
│   ├── PreviewPanel.tsx           # Right panel - image preview
│   └── PlatformFrames.tsx         # Native platform UI frames
└── utils/
    └── canvas.ts                  # Canvas rendering utilities
```

## 🏗️ Architecture Overview

### Main Flow
1. **Configuration** → User configures post via WizardPanel
2. **AI Generation** → Clubbed prompts sent to image generation API
3. **Preview** → Generated images displayed in platform-specific frames
4. **Export** → Download in multiple formats (PNG/JPG/WEBP)

### Data Flow
```
User Input → State Management → AI Prompt Building → API Call → Image Display → Export
```

## 📄 File Breakdown

### 1. `SocialImageGeneratorPage.tsx` - Main Orchestrator
**Purpose**: Central component that manages the entire application state and coordinates between all sub-components.

**Key Responsibilities**:
- **State Management**: Manages all form states, generated images, and UI states
- **AI Prompt Engineering**: Contains the `buildAiPrompt()` function that creates intelligent, context-aware prompts
- **Persistence**: Auto-saves user configuration using localStorage
- **Export Logic**: Handles image downloads in multiple formats
- **API Integration**: Calls the image generation service

**Key Functions**:
- `buildAiPrompt()` - **Clubbed Prompt Management**: Combines platform, post type, brand, theme, content, and variation into comprehensive AI prompts
- `downloadAsFormat()` - Handles cross-origin image downloads with fallback
- `doGenerate()` - Orchestrates the AI image generation process
- `platformAspect()` - Derives aspect ratios from platform specifications

**State Variables**:
```typescript
- platforms: PlatformKey[]           // Selected platforms
- primaryPlatform: PlatformKey       // Main platform for preview
- postType: PostTypeKey              // Type of social post
- brand: BrandKit                    // Brand customization
- theme: ThemeKey                    // Visual theme
- content: ContentModel              // Dynamic content based on post type
- variation: VariationKey            // Layout variation
- images: string[]                   // Generated image URLs
- active: number                     // Currently selected image
- busy: boolean                      // Loading state
```

### 2. `types.ts` - Type System
**Purpose**: Defines the complete type system for the application.

**Key Types**:
- `PlatformKey`: Supported social platforms (Instagram, Facebook, LinkedIn, TikTok, X, YouTube, Pinterest)
- `PostTypeKey`: 14 different post types (promo, quote, tips, testimonial, poll, carousel, etc.)
- `ThemeKey`: Visual themes (brand, minimal, bold, elegant, playful, tech, festive, surprise)
- `BrandKit`: Brand customization (name, font, colors, logo)
- `ContentModel`: Dynamic content structure that adapts to post type
- `CanvasExportType`: Export formats (png, jpg, webp)

### 3. `constants.ts` - Configuration Hub
**Purpose**: Central configuration file containing all static data and specifications.

**Key Constants**:
- `PLATFORM_SPECS`: Platform-specific dimensions and styling
- `POST_TYPES`: Complete post type definitions with descriptions
- `THEMES`: Theme configurations with styling hints
- `FONT_CHOICES`: Available typography options
- `DEFAULT_BRAND`: Default brand configuration

### 4. `WizardPanel.tsx` - Configuration Interface
**Purpose**: Left panel component that provides the configuration wizard interface.

**Key Features**:
- **Dynamic Form Fields**: Content fields change based on selected post type
- **Brand Customization**: Color pickers, font selection, logo upload
- **Conditional Visibility**: Shows/hides fields based on user selections
- **Real-time Validation**: Enables/disables generation based on required fields

### 5. `PreviewPanel.tsx` - Image Display
**Purpose**: Right panel component that displays generated images with platform-specific frames.

**Key Features**:
- **Platform Frames**: Native-looking social media post frames
- **Image Carousel**: Navigate between multiple generated variations
- **Responsive Design**: Adapts to different screen sizes

### 6. `PlatformFrames.tsx` - Native UI Simulation
**Purpose**: Creates authentic-looking social media platform frames around generated content.

**Features**:
- **Platform-Specific Styling**: Each platform has unique colors, layouts, and interaction buttons
- **Dark/Light Themes**: Supports platform-specific theming (e.g., TikTok dark mode)
- **Interactive Elements**: Simulated like, comment, share buttons

### 7. `canvas.ts` - Rendering Engine
**Purpose**: Canvas-based rendering utilities for creating composite images (currently unused but available for future canvas-based generation).

**Key Functions**:
- `drawComposite()`: Main rendering function
- `pickThemeColors()`: Theme-based color selection
- `wrapText()`: Text wrapping utilities
- `drawRoundedRect()`: Shape drawing helpers

## 🔄 Conditional Visibility & Dynamic UI

### Post Type-Based Field Visibility

The application dynamically shows different input fields based on the selected post type:

#### 1. **Promo/Sale Posts**
```typescript
Fields Shown:
- Headline (required)
- Subheading/CTA
- Promo Code (optional)

Validation: Requires headline to enable generation
```

#### 2. **Quote Posts**
```typescript
Fields Shown:
- Quote text (required, textarea)
- Author (optional)

Validation: Requires quote text to enable generation
```

#### 3. **Tips/How-To Posts**
```typescript
Fields Shown:
- Dynamic bullet points (add/remove functionality)
- Each tip as separate input field

Validation: Requires at least one non-empty tip
UI: Add/Remove buttons for dynamic list management
```

#### 4. **Testimonial Posts**
```typescript
Fields Shown:
- Testimonial text (required, textarea)
- Customer name
- Role/Company

Layout: Two-column layout for name and role fields
```

#### 5. **Poll Posts**
```typescript
Fields Shown:
- Poll question (required)
- Poll options (minimum 2, dynamic add/remove)

Validation: Requires question to enable generation
UI: Dynamic option management with add/remove buttons
```

#### 6. **Carousel Posts**
```typescript
Fields Shown:
- Carousel title (required)
- Slides (textarea, one per line)

Validation: Requires title to enable generation
```

#### 7. **Default/Other Post Types**
```typescript
Fields Shown:
- Headline (required)
- Subheading/CTA

Fallback: Generic fields for announcement, giveaway, etc.
```

### Theme-Based Styling

The application applies different visual treatments based on selected theme:

```typescript
Theme Effects:
- brand: Uses user's brand colors and fonts
- minimal: Clean, whitespace-heavy design
- bold: High contrast, large typography
- elegant: Serif fonts, soft colors
- playful: Rounded elements, fun colors
- tech: Dark backgrounds, neon accents
- festive: Warm, celebratory colors
- surprise: Randomized color palettes
```

### Platform-Based Adaptations

Different platforms trigger different behaviors:

```typescript
Platform Adaptations:
- Canvas dimensions (Instagram: 1080x1080, TikTok: 1080x1920, etc.)
- Aspect ratio calculations for AI generation
- Platform-specific frame styling
- Color schemes matching platform branding
```

### Validation Logic

Generation is enabled/disabled based on content requirements:

```typescript
const canGenerate = 
  (content.headline?.trim()?.length ?? 0) > 0 ||
  (content.quote?.trim()?.length ?? 0) > 0 ||
  (content.poll?.question?.trim()?.length ?? 0) > 0;
```

## 🤖 AI Prompt Engineering (Clubbed Prompts)

### Prompt Building Strategy

The `buildAiPrompt()` function in `SocialImageGeneratorPage.tsx` creates sophisticated, context-aware prompts by combining multiple parameters:

#### Prompt Structure
```typescript
1. Base Instructions: Platform and style directives
2. Brand Context: Brand name, colors, typography preferences
3. Post Type Guidance: Specific layout and content hints
4. Content Signals: Actual content for context
5. Technical Constraints: Quality and format requirements
```

#### Example Prompt Construction
```typescript
// For a promotional Instagram post with brand theme
"Design a clean, high-quality social post background for instagram. 
Overall style: brand. Layout variation: v1. 
Brand: Connecttly. 
Prefer brand colors: #0A1F3D #0074ED. 
Typography vibe: Inter. 
Promo/announcement backdrop, high contrast center area for headline. 
Avoid dense text baked into the image; use shapes, gradients, abstract product vibes. 
Content cues: headline="Summer Sale — 40% OFF", subhead="Shop now →", code="SAVE40". 
No baked-in text. No watermark. Not photoreal person faces unless implied by theme. 
Crisp, LinkedIn/Instagram-friendly, professional, color-accurate, high detail."
```

#### Post Type-Specific Prompt Modifications

Each post type adds specific guidance to the AI prompt:

- **Promo**: "high contrast center area for headline", "avoid dense text"
- **Quote**: "soft gradients or subtle texture, ample negative space"
- **Tips**: "modern geometric accents, room for bullets, avoid busy patterns"
- **Testimonial**: "soft, trustworthy tone, slight vignette for focus"
- **Poll**: "high-contrast background suitable for a poll"
- **Carousel**: "single frame that can work across multiple slides"

## 🔧 State Management

### Local Storage Persistence
The application automatically saves and restores user configuration:

```typescript
Key: "sm_img_gen_v2_ai"
Saved Data: {
  platforms, primaryPlatform, postType, brand, 
  theme, content, variation, images
}
```

### State Synchronization
- Configuration changes trigger immediate persistence
- Images are cached in localStorage for convenience
- State restoration happens on component mount

## 🎨 Export System

### Multi-Format Support
- **PNG**: Default, best quality, transparency support
- **JPG**: Smaller file size, good for web
- **WEBP**: Modern format, excellent compression

### Export Options
- **Single Image**: Download currently selected image
- **Batch Export**: Download all generated variations
- **Cross-Origin Handling**: Automatic fallback for CORS issues

## 🔌 API Integration

### Image Generation Service
```typescript
Endpoint: /api/ai/image/generate
Method: POST
Payload: {
  prompt: string,
  aspect: "1:1" | "4:5" | "9:16" | "16:9",
  size: "1K" | "2K",
  count: 1-4
}
```

### Error Handling
- Timeout management (60s default)
- Graceful error display
- Retry functionality

## 🎯 User Experience Features

### Progressive Enhancement
1. **Basic Configuration**: Platform and post type selection
2. **Brand Customization**: Colors, fonts, logo upload
3. **Content Input**: Dynamic fields based on post type
4. **Theme Selection**: Visual style preferences
5. **Generation**: AI-powered image creation
6. **Preview**: Platform-specific frames
7. **Export**: Multiple format options

### Responsive Design
- Mobile-friendly wizard interface
- Adaptive preview sizing
- Touch-friendly controls

### Performance Optimizations
- Image caching for logos
- Debounced state updates
- Lazy loading of heavy components

## 🚀 Usage Examples

### Creating a Promotional Post
1. Select "Instagram" as platform
2. Choose "Promo/Sale" post type
3. Enter headline: "Summer Sale — 40% OFF"
4. Add subheading: "Shop now →"
5. Set promo code: "SAVE40"
6. Customize brand colors
7. Select "Bold" theme
8. Generate images
9. Preview in Instagram frame
10. Export as PNG

### Creating a Quote Post
1. Select "LinkedIn" as platform
2. Choose "Quote/Motive" post type
3. Enter inspirational quote
4. Add author name
5. Select "Elegant" theme
6. Generate and export

## 🔍 Technical Considerations

### Performance
- Canvas operations are optimized for smooth rendering
- Image generation requests are debounced
- Local storage prevents data loss

### Accessibility
- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly

### Browser Compatibility
- Modern browsers with Canvas API support
- Cross-origin image handling
- Progressive enhancement for older browsers

## 🐛 Common Issues & Solutions

### Image Generation Fails
- Check network connectivity
- Verify API endpoint availability
- Ensure prompt length is reasonable

### Export Issues
- CORS problems: Automatic fallback to direct download
- Large file sizes: Consider JPG format
- Mobile downloads: Use appropriate file naming

### Performance Issues
- Clear localStorage if data becomes corrupted
- Refresh page to reset state
- Check browser console for errors

## 🔮 Future Enhancements

### Planned Features
- Canvas-based local rendering (utils/canvas.ts is prepared)
- More platform integrations
- Advanced typography controls
- Template library
- Batch processing
- Social media scheduling integration

### Technical Improvements
- WebGL acceleration for canvas operations
- Service worker for offline functionality
- Advanced caching strategies
- Real-time collaboration features
