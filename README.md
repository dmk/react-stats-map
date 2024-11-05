# React Stats Map

A collection of React components for displaying statistical data on interactive maps. This repository includes the base package react-stats-map, as well per-country map components that build on top of the base one.

## Repository Structure

```
.
├── example                 # Example React app (+playground)
└── packages
    ├── react-stats-map     # Main package (base for per-country packages)
    ├── react-md-stats-map  # Moldova map component based on react-stats-map
    ├── react-eu-stats-map  # Europe map component based on react-stats-map
    ├── react-pl-stats-map  # Poland map component based on react-stats-map
    └── react-ua-stats-map  # Ukraine map component based on react-stats-map
```

### `example`

An example React application located in the ./example directory. This serves as a playground to demonstrate and test the map components during development.

### `packages/react-stats-map`

The core package providing foundational components and utilities for creating statistical maps in React. It is designed to be extensible and serves as the base for building country-specific map components.

### `packages/react-XX-stats-map`

A React component for displaying an interactive map of a country (see package name), built upon the react-stats-map package.

Here is the full list of country-specific packages:

* [react-ua-stats-map](./packages/react-ua-stats-map/) - Ukraine
* [react-md-stats-map](./packages/react-md-stats-map/) - Moldova
* [react-pl-stats-map](./packages/react-pl-stats-map/) - Poland
* [react-eu-stats-map](./packages/react-eu-stats-map/) - Europe
