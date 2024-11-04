# React Stats Map

A collection of React components for displaying statistical data on interactive maps. This repository includes the main package react-stats-map, serving as the foundation for per-country map components like react-ua-stats-map.

## Repository Structure

```
.
├── example                 # Example React app (playground)
└── packages
    ├── react-stats-map     # Main package (base for per-country packages)
    └── react-ua-stats-map        # Ukraine map component based on react-stats-map
```

### `example`

An example React application located in the ./example directory. This serves as a playground to demonstrate and test the map components during development.

### `packages/react-stats-map`

The core package providing foundational components and utilities for creating statistical maps in React. It is designed to be extensible and serves as the base for building country-specific map components.

### `packages/react-ua-stats-map`

A React component for displaying an interactive map of Ukraine, built upon the react-stats-map package.