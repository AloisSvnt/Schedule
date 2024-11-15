/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

import { DefaultLayout } from '../layouts/DefaultLayout/DefaultLayout';

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.tsx', { eager: true });
    const page = pages[`../pages/${name}.tsx`] as { default: { layout?: React.ComponentType } };
    page.default.layout = page.default.layout || DefaultLayout;
    return page;
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});