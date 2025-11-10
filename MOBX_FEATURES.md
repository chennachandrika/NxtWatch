# MobX Features Exploration Guide

This document showcases the advanced MobX features implemented in NxtWatch.

## 🎯 MobX Features Implemented

### 1. **Computed Values** (`computed`)

Computed values are derived state that automatically updates when dependencies change.

**Example from `VideoModel`:**
```typescript
// Computed: Automatically recalculates when videos or searchQuery changes
get filteredVideos(): Video[] {
  if (!this.searchQuery.trim()) {
    return this.videos
  }
  const query = this.searchQuery.toLowerCase()
  return this.videos.filter(
    (video) =>
      video.title.toLowerCase().includes(query) ||
      video.channel.name.toLowerCase().includes(query)
  )
}

get videoCount(): number {
  return this.videos.length
}
```

**Benefits:**
- Automatic memoization
- Only recalculates when dependencies change
- Clean, declarative code

**Usage:**
```tsx
const { videoModel } = useStores()
// Automatically reactive - updates when videos change
const count = videoModel.videoCount
```

### 2. **Flow** (for Async Operations)

`flow` is better than `runInAction` for async operations - it handles errors automatically and provides better TypeScript support.

**Example from `VideoModel`:**
```typescript
fetchVideos = flow(function* (this: VideoModel, searchQuery: string = '') {
  this.isLoading = true
  this.errorMessage = ''
  
  try {
    const data = yield fetchVideosAPI(searchQuery)
    this.videos = data.videos || []
    this.isLoading = false
  } catch (error) {
    this.errorMessage = error.message
    this.isLoading = false
  }
})
```

**Benefits:**
- No need for `runInAction` - mutations are automatically wrapped
- Better error handling
- Cleaner async code
- Generator function syntax

**Usage:**
```tsx
// Flow returns a Promise
await videoModel.fetchVideos('react')
```

### 3. **Reactions** (`reaction`, `autorun`, `when`)

Reactions automatically run side effects when observables change.

**Example from `SavedVideosModel`:**
```typescript
constructor() {
  makeAutoObservable(this)
  
  // Auto-persist to localStorage when savedVideos changes
  reaction(
    () => this.savedVideos.length,
    () => this.persistSavedVideos()
  )
}
```

**Types of Reactions:**

1. **`reaction`** - Runs when tracked data changes
   ```typescript
   reaction(
     () => this.videos.length,  // What to track
     (count) => console.log(`Video count: ${count}`)  // What to do
   )
   ```

2. **`autorun`** - Runs immediately and whenever dependencies change
   ```typescript
   autorun(() => {
     console.log(`Videos: ${this.videos.length}`)
   })
   ```

3. **`when`** - Runs once when condition becomes true
   ```typescript
   when(
     () => this.isAuthenticated,
     () => this.loadUserData()
   )
   ```

### 4. **Store Composition** (RootStore Pattern)

Centralized store management with a root store.

**Example:**
```typescript
class RootStore {
  auth = authModel
  user = userModel
  video = videoModel
  // ... all stores

  // Computed across multiple stores
  get isAppReady(): boolean {
    return !this.auth.isLoading && this.theme.theme !== null
  }
}
```

**Benefits:**
- Single source of truth
- Easy store access
- Cross-store computed values
- Better organization

### 5. **Observable Maps and Sets**

For complex data structures, MobX provides `observable.map()` and `observable.set()`.

**Example (can be added):**
```typescript
import { observable } from 'mobx'

class VideoCacheModel {
  // Observable Map for key-value pairs
  videoCache = observable.map<string, Video>()
  
  // Observable Set for unique values
  viewedVideoIds = observable.set<string>()
  
  addToCache(id: string, video: Video) {
    this.videoCache.set(id, video)
  }
  
  markAsViewed(id: string) {
    this.viewedVideoIds.add(id)
  }
}
```

### 6. **Store Dependencies** (Stores Observing Other Stores)

Stores can observe and react to changes in other stores.

**Example:**
```typescript
class VideoStatsModel {
  constructor() {
    makeAutoObservable(this)
    
    // React to video changes
    reaction(
      () => videoModel.videos.length,
      (count) => {
        this.totalVideos = count
        this.updateStats()
      }
    )
  }
}
```

## 📊 Feature Comparison

| Feature | Before | After | Benefit |
|---------|--------|-------|---------|
| Async Operations | `runInAction` | `flow` | Cleaner code, better error handling |
| Derived State | Manual calculation | `computed` | Automatic memoization |
| Side Effects | Manual useEffect | `reaction` | Automatic synchronization |
| Store Access | Individual imports | RootStore | Better organization |

## 🎓 Learning Path

1. **Start with `makeAutoObservable`** ✅ (Already using)
2. **Add `computed` for derived state** ✅ (Implemented)
3. **Use `flow` for async operations** ✅ (Implemented)
4. **Add `reaction` for side effects** ✅ (Implemented)
5. **Create RootStore** ✅ (Implemented)
6. **Explore `observable.map/set`** (Can be added)
7. **Store dependencies** (Can be added)

## 💡 Best Practices

1. **Use `computed` for derived state** - Don't manually calculate
2. **Use `flow` for async operations** - Better than `runInAction`
3. **Use `reaction` for side effects** - Automatic synchronization
4. **Keep stores focused** - One responsibility per store
5. **Use RootStore for organization** - Centralized access
6. **Mark computed in `makeAutoObservable`** - Explicit is better

## 🔍 Debugging MobX

Enable MobX DevTools:
```typescript
import { configure } from 'mobx'

configure({
  enforceActions: 'always',  // Require actions for mutations
  computedRequiresReaction: true,  // Warn if computed accessed outside reaction
})
```

## 📚 Resources

- [MobX Documentation](https://mobx.js.org/)
- [MobX Best Practices](https://mobx.js.org/best/pitfalls.html)
- [Flow Documentation](https://mobx.js.org/actions.html#using-flow-instead-of-async--await-)

