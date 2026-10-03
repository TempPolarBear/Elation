# Character Creator

A web application for step-by-step creation of a fantasy character, equipment, and pet.

## Features

- Character-class selection and stat generation
- Random avatar generation through DiceBear
- Weapon, armor, and pet creation with stats, rarity, enchantments, and buffs
- Validation at every step and a modal view of each created character
- Character-list persistence in `localStorage`

## Technologies

- JavaScript (ES modules)
- Vite
- HTML
- CSS
- Bootstrap 5 and Bootstrap Icons

## Project Structure

```text
src/
├── js/
│   ├── classes/   # Character, Weapon, Armor and Pet
│   ├── data/      # rarities, enchantments and buffs
│   └── utils/     # generators, helpers and rendering
├── main.js
└── style.css
```

## Getting Started

```bash
npm install
npm run dev
```
