# Honeycomb Streaming Recommender Interface

Experimental web application for studying how interface layout influences exploration, positional interaction patterns, and user experience in streaming recommender systems.

**License:** MIT

The application implements three recommendation-interface conditions:

- **Grid** — recommendations are shown in a conventional grid.
- **Carousel** — recommendations are shown in horizontally scrollable rows.
- **Honeycomb** — recommendations are arranged in a radial hexagonal layout that supports multidirectional navigation.

The project was developed for the study:

> **The effects of interface layout on exploration and positional bias in streaming recommender systems**

## Study Overview

Participants first completed a preference-elicitation task by selecting movies they liked from a fixed set of 30 titles.

These selections were used to estimate:

1. a participant-specific ordering of six movie genres; and
2. personalized movie rankings based on latent movie embeddings.

Participants then completed one browsing task with each of the three interface conditions. During each task, they could browse recommendations, hover over movie cards, add movies to a watch list, and select one movie they would hypothetically watch.

After each condition, participants completed the UEQ-S. A final questionnaire collected layout rankings and qualitative feedback.

## Technology

The application is built with:

- SvelteKit
- Prisma
- SQLite
- SwiperJS
- TMDB API
- JavaScript / TypeScript

The honeycomb layout uses a cube-coordinate hexagonal grid and spiral-ring construction.

## Recommendation Pipeline

The experiment uses the MovieLens Small dataset as the basis for recommendation generation.

A Singular Value Decomposition model with 20 latent factors was used to derive movie embeddings.

During preference elicitation, participants selected at least five movies they liked. Selected movies were assigned a fixed preference value of `4.0` and used to estimate a participant-specific latent vector.

Predicted movie scores were calculated from the participant vector and movie embeddings and transformed to the range `0.5–5.0`.

Movies were ranked by predicted score and distributed across the three interface conditions.

## Experimental Conditions

### Grid

The grid condition contains six genre-based recommendation groups. Each group contains 20 movies displayed in a 5 × 4 grid.

### Carousel

The carousel condition contains six horizontally scrollable recommendation rows with 20 movies per group.

### Honeycomb

The honeycomb condition arranges six recommendation groups radially around a central cell. Each group contains 21 movie positions, with more highly ranked recommendations positioned closer to the center.

Participants navigate the interface by dragging the layout in any direction.

## Developing

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Start the server and open the application in a browser:

```bash
npm run dev -- --open
```

## Database

The application uses Prisma with SQLite.

Validate the Prisma schema:

```bash
npx prisma validate
```

Regenerate the Prisma client:

```bash
npx prisma generate
```

Create and apply a database migration:

```bash
npx prisma migrate dev --name some-name
```

Open Prisma Studio:

```bash
npx prisma studio
```

The original participant database used in the study is not included in this repository because it contains research-participant data.

## Building

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Deployment may require an appropriate SvelteKit adapter depending on the target environment.

## Movie Metadata

Movie metadata and image assets are retrieved through The Movie Database (TMDB) API.

A valid TMDB API configuration is required to reproduce the full experimental interface.

TMDB data and image assets are not included in this repository.

## Icons

Interface icons were obtained from Google Material Symbols:

https://fonts.google.com/icons

## Carousel Implementation

The carousel condition uses SwiperJS:

https://swiperjs.com/

## Reproducibility

The repository provides the implementation of the experimental interface used in the study.

Full reproduction additionally requires:

- MovieLens Small data
- movie embeddings generated from the recommendation model
- the curated movie pool used in the experiment
- TMDB API access
- local database configuration

Analysis notebooks and anonymized study data are provided separately from the application repository.

## Privacy

No identifiable participant data should be committed to this repository.

The original experimental database, session identifiers, consent timestamps, and other participant-level internal records are intentionally excluded.

## Citation

If you use this code in academic work, please cite the associated publication:

> Dossi, M., Schut, J., Dimara, E., & Chatzimparmpas, A.  
> *The effects of interface layout on exploration and positional bias in streaming recommender systems.*

Publication details will be added once the article is published.
