# Character Creator

Веб-приложение для пошагового создания фэнтезийного персонажа, его снаряжения и питомца.

## Features

- Выбор класса и генерация характеристик персонажа
- Случайный аватар через DiceBear
- Создание оружия, брони и питомца с характеристиками, редкостью, зачарованиями и баффами
- Валидация каждого шага и просмотр созданного персонажа в модальном окне
- Сохранение списка персонажей в `localStorage`

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
