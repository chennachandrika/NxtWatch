# i18n Integration Guide

## Overview

This application uses **i18next** and **react-i18next** for internationalization (i18n) support. The setup includes:

- **4 Languages**: English (en), Spanish (es), French (fr), Hindi (hi)
- **MobX Integration**: Language state is managed via `LanguageModel` store
- **Persistent Storage**: Selected language is saved in `localStorage`
- **Language Switcher**: Available in the Navbar

## File Structure

```
src/
├── i18n/
│   └── config.ts              # i18n configuration
├── locales/
│   ├── en/
│   │   └── translation.json   # English translations
│   ├── es/
│   │   └── translation.json   # Spanish translations
│   ├── fr/
│   │   └── translation.json   # French translations
│   └── hi/
│       └── translation.json   # Hindi translations
└── stores/
    └── LanguageModel.ts        # MobX store for language management
```

## Usage in Components

### Basic Usage

```tsx
import { useTranslation } from 'react-i18next'

const MyComponent = () => {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button>{t('common.save')}</button>
    </div>
  )
}
```

### With Namespaces

```tsx
const { t } = useTranslation()

// Access nested keys
t('navbar.title')        // "NxtWatch"
t('sidebar.home')       // "Home"
t('common.logout')       // "Logout"
```

### Changing Language Programmatically

```tsx
import languageModel from '../stores/LanguageModel'

// Change language
languageModel.changeLanguage('es')  // Switch to Spanish
languageModel.changeLanguage('fr')  // Switch to French
languageModel.changeLanguage('hi')  // Switch to Hindi
languageModel.changeLanguage('en')  // Switch to English

// Get current language
const currentLang = languageModel.language  // 'en' | 'es' | 'fr' | 'hi'

// Get language name
const langName = languageModel.getLanguageName('es')  // "Español"
```

## Adding New Translations

1. **Add the key to all language files** (`src/locales/*/translation.json`):

```json
// en/translation.json
{
  "mySection": {
    "newKey": "New Text"
  }
}

// es/translation.json
{
  "mySection": {
    "newKey": "Nuevo Texto"
  }
}
```

2. **Use in components**:

```tsx
const { t } = useTranslation()
<p>{t('mySection.newKey')}</p>
```

## Adding a New Language

1. **Create translation file**: `src/locales/[lang]/translation.json`
2. **Update `LanguageModel.ts`**:
   - Add the language code to the `Language` type
   - Add the language name in `getLanguageName()`
   - Add to `getSupportedLanguages()`
3. **Update `i18n/config.ts`**:
   - Import the new translation file
   - Add to the `resources` object

## Translation Keys Structure

```
common.*          - Common UI elements (buttons, labels)
navbar.*          - Navbar specific translations
sidebar.*         - Sidebar menu items
auth.*            - Authentication related
home.*            - Home page
trending.*        - Trending page
gaming.*          - Gaming page
savedVideos.*     - Saved videos page
videoDetails.*    - Video details page
```

## Language Switcher Component

The `LanguageSwitcher` component is already integrated into the Navbar. It provides:
- Dropdown menu with all supported languages
- Current language indicator
- Responsive design (shows icon only on mobile)

## Best Practices

1. **Always use translation keys** instead of hardcoded strings
2. **Keep keys organized** by feature/section
3. **Use descriptive key names** (e.g., `navbar.logout` not `nl`)
4. **Test all languages** when adding new features
5. **Keep translations consistent** across languages

## Example: Updating a Component

**Before:**
```tsx
<button>Logout</button>
```

**After:**
```tsx
import { useTranslation } from 'react-i18next'

const Component = () => {
  const { t } = useTranslation()
  return <button>{t('common.logout')}</button>
}
```

