# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# Validate database
npx prisma validate
# Regenerate database
npx prisma generate
# Update database
npx prisma migrate dev --name some-name

#View DB
npx prisma studio
```
## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Icons

From https://fonts.google.com/icons

## Swiper

https://swiperjs.com/

## Example
https://github.com/JosinJojy/Netflix-reactjs/blob/main/src/componets/RowPost/RowPost.jsx