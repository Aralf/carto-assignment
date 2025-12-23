This project is publicly deployed [here](https://carto-assignment.vercel.app/)

# Getting Started

In order to run this application locally you will need to install dependencies

```bash
pnpm install
```

Take the `.env.example` file and rename it to `.env.local` or similar and add your own values.

You can find the steps to get your own API key [here](https://docs.carto.com/carto-for-developers/guides/build-a-public-application#creating-an-api-access-token)

This application makes use of the following data sources, so you need to grant access to them:

- `carto-demo-data.demo_tables.retail_stores`
- `carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup`

Once everything it's set, you can run this application locally:

```bash
pnpm dev
```

# Stack

- Tanstack Router (vite)
- Tanstack Query
- MUI v7 + Charts + Carto Meridien DS
- Deck.gl, Maplibre and react-map-gl

# Design considerations

## Tanstack Router

For simplicity, the application is built with [Tanstack Router](https://tanstack.com/router/latest/docs/framework/react/overview), that makes use of [Vite](https://vite.dev/).

## React compiler

This application makes use of the [React Compiler](https://react.dev/learn/react-compiler/introduction) for simplicity, reducing the overhead of having to think to use `useCallback`, `useMemo` and `React.memo` while avoiding known pitfalls like inline functions..

## Data sources

The assignment asks to make use specifically of two data sources

- `carto-demo-data.demo_tables.retail_stores`
- `carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup`

Even though it is only two, and they are fixed, instead of defininingh a two specific states for each or fixed object,
I wanted to make the more realistic case of having an array of data sources / layers.

## Style controllers

I fulfilled the requirements for the style controllers according to the instructions. However, I admit that initially I went a bit overboard
by generalizing components like `color-controller` for both `fill` and `stroke`, allowing to choose between simple color or base on column, the instructions only ask to do it for the fill, so I separate both cases to simplify.

Similarly, for the case of coloring based on a column, initially I was going to allow selecting any column, but for simplicity I decided to only allow the mentioned columns from the instructions.

When making changes to the style properties (radius, fill, stroke) instead of debouncing the changes to optimize rendering I took the approach of makign use of React transitions coupled with `useOptimistic` and `useDeferredValue`:

- useOptimitic allows instant update on the style controller while we defer the re-render of `Map` component and its layers
- Instead of giving a fix delay time for debouncing, the updated is adjusted base on the user's device performance.
- Re-renders with useDeferredValue are interruptible

## Tooltip

To achieve the required tooltip behaviour I could have used the `getTooltip` callback from Deck.gl,
but I wanted the behavior to click on the feature and have a popup stick to the coordinates clicked.

Maplibre Popup allows this and the component from `react-map-gl` makes it simple enough.

The only use is that with the default rendering of Deck.gl as a separate canvas on top of Maplibre, this Popup was always behind the Deck.gl layers.

Therefore, I adjusted the setup to make use of [MapboxOverlay](https://deck.gl/docs/developer-guide/base-maps/using-with-maplibre#overlaid)

## Widgets

I decided to implement the case of a single widget related to store retails, to display the revenue per store type.

Ideally, I would have liked to have the widget support dynamic layers instead of specifically a single layer, but to save time and complexity I decided to go with this approach.

## UI Components

Made use of MUI components as suggested on instructions, I took the liberty to make use of Casto Meridien theme, this is similar to what Carto Builder uses.

## Async + Data Fetching

To get the information of each layer for the sidebar list, I used React's `use` [API](https://react.dev/reference/react/use) to resolve the promise of the source data.
Coupled with ErrorBoundary and Suspense, this ensures that the UI is not blocked while waiting for the data to be fetched, and any errors are handled gracefully.

A similar approach is used for the retail-store widget, in this case using Tanstack Query [useSuspenseQuery](https://tanstack.com/query/v5/docs/framework/react/guides/suspense)

This follows the pattern of `render-as-you-fetch` instead of traditional `fetch-as-you-render`.

# Use of AI Assistant Tools

Only for the functions of `hexToRgb` and `rgbToHex` I used an AI assitant tool

The prompt:

```text
Give me the conversion functions from
1. HEX (shorthand and full) to RGB/RGBA
2. RGB/RGBA to HEX
```
