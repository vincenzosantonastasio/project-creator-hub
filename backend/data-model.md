# Data Model

## Creator

Represents a creator in the platform.

Fields:

- id
- name
- platforms (list of platform profiles)

---

## Content

Represents a piece of content published by a creator.

Fields:

- id
- creator_id
- title
- platform (YouTube, TikTok, etc.)
- url
- published_at

---

## User

Represents a user of the platform.

Fields:

- id
- followed_creators (list)
- last_seen_per_creator

---

## Catch-Up Logic

Each user has a timestamp for each creator.

When accessing a creator page:

- Show content where:
  published_at > last_seen_timestamp

---

## Goal

Create a simple and scalable data structure to support:

- content aggregation
- creator pages
- catch-up feature
