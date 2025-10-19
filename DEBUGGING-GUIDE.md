# Debugging Guide - "Maximum Update Depth Exceeded" Error

## ✅ Implemented Fixes

### 1. Enhanced ErrorBoundary with Better Debugging
- **File**: `src/ErrorBoundary.tsx`
- **Changes**: Added section names, detailed error display, component stack traces
- **Benefit**: Now shows exactly which section is crashing

### 2. Section-by-Section Error Boundaries
- **File**: `src/App.tsx`
- **Changes**: Wrapped each major section with named ErrorBoundary
- **Benefit**: Isolates crashes to specific components

### 3. Temporarily Disabled StrictMode
- **File**: `src/main.tsx`
- **Changes**: Commented out React.StrictMode
- **Benefit**: Eliminates double-rendering that can trigger loops

### 4. Fixed Cart Store Function Order
- **File**: `src/lib/cart.store.ts`
- **Changes**: Moved `getCartState` function before `useCart` hook
- **Benefit**: Prevents undefined function reference errors

### 5. Created Safe Mode Components
- **Files**: `src/components/Header.safe.tsx`, `src/App.sanity.tsx`
- **Purpose**: Minimal components for testing without complex state

## 🔍 How to Use This Debugging Setup

### Step 1: Test Current Setup
```bash
npm run dev
```
- Open browser and check console
- If you see `[ErrorBoundary:SectionName] crashed:` - that's your culprit!

### Step 2: If Still Getting "Maximum Update Depth"
Replace `src/App.tsx` with `src/App.sanity.tsx`:
```bash
cp src/App.sanity.tsx src/App.tsx
```
- If this works: the issue is in one of your sections
- If this fails: the issue is in core React setup

### Step 3: Binary Search for Problematic Section
1. Start with just Header:
```tsx
export default function App() {
  return (
    <>
      <ErrorBoundary name="Header">
        <Header language="hr" onLanguageChange={()=>{}} cartItemCount={0} onCartClick={()=>{}} />
      </ErrorBoundary>
      <main className="Section"><h1>Test</h1></main>
    </>
  );
}
```

2. Add sections one by one until error appears
3. The last added section is your problem

### Step 4: Fix Common Loop Patterns

#### ❌ Bad - Causes Infinite Loop:
```tsx
// useEffect without dependencies
useEffect(() => {
  setOpen(true);
});

// Toggle in useEffect
useEffect(() => {
  setDark(!dark);
}, [dark]);

// localStorage init without lazy init
const [lang, setLang] = useState(localStorage.getItem('lang') || 'hr');
useEffect(() => {
  setLang(localStorage.getItem('lang') || 'hr');
}, [lang]);
```

#### ✅ Good - Safe Patterns:
```tsx
// useEffect with dependencies
useEffect(() => {
  setOpen(true);
}, []);

// Lazy localStorage init
const [lang, setLang] = useState(() => 
  (localStorage.getItem('lang') as 'hr'|'en') || 'hr'
);
useEffect(() => {
  localStorage.setItem('lang', lang);
}, [lang]);

// Memoized context value
const value = useMemo(() => ({ items, addItem }), [items, addItem]);
```

## 🚨 Emergency Safe Mode

If nothing works, use the minimal setup:

### 1. Replace main.tsx:
```tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const el = document.getElementById("root");
if (!el) throw new Error("#root not found");
createRoot(el).render(<App />);
```

### 2. Replace App.tsx:
```tsx
export default function App() {
  return (
    <main className="Section">
      <h1 className="text-3xl font-bold">Sanity OK</h1>
      <p className="mt-2">Ako vidiš ovaj tekst, baza je stabilna.</p>
    </main>
  );
}
```

### 3. Test and Gradually Add Back:
1. Add Header (use `Header.safe.tsx` if needed)
2. Add sections one by one
3. Fix each problematic component as you find it

## 🔧 Common Fixes

### Fix 1: Header Issues
If Header crashes, use the safe version:
```bash
cp src/components/Header.safe.tsx src/components/Header.tsx
```

### Fix 2: Context Provider Issues
Ensure context values are memoized:
```tsx
const value = useMemo(() => ({ 
  items, 
  addItem, 
  removeItem 
}), [items, addItem, removeItem]);
```

### Fix 3: Scroll/Animation Issues
Debounce scroll listeners:
```tsx
useEffect(() => {
  const handleScroll = throttle(() => {
    setHeaderVisible(window.scrollY > 100);
  }, 100);
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## 📋 Checklist

- [ ] ErrorBoundary shows specific section name
- [ ] StrictMode is temporarily disabled
- [ ] Only one `@import "tailwindcss"` exists
- [ ] No useEffect without dependencies
- [ ] No toggle patterns in useEffect
- [ ] localStorage init uses lazy initialization
- [ ] Context providers use memoized values
- [ ] Scroll listeners are debounced

## 🎯 Next Steps

1. **Test current setup** - run `npm run dev`
2. **Check console** - look for `[ErrorBoundary:SectionName]` messages
3. **If error persists** - use sanity check App
4. **Binary search** - add sections one by one
5. **Fix found issues** - apply common patterns above
6. **Re-enable StrictMode** - once everything works

## 📞 If Still Stuck

Send me:
1. The exact error message from console
2. Which section name appears in ErrorBoundary
3. The content of that specific component file

I'll provide a targeted fix for that exact component.

