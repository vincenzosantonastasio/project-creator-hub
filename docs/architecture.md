# Platform Architecture – Project Creator Hub

## Overview

The platform is designed to organize creator content across multiple platforms into a single structured experience.

The system is divided into three main layers:

- Data Layer
- Backend Layer
- Frontend Layer

---

## 1. Data Layer

Responsible for collecting and storing content from external platforms.

Sources:
- YouTube API
- TikTok (API or alternative)
- Instagram
- RSS feeds (blogs, newsletters, podcasts)

Responsibilities:
- Fetch content
- Normalize data
- Store unified content format

---

## 2. Backend Layer

Handles logic, processing and user data.

Responsibilities:
- Content aggregation
- User tracking (last visit per creator)
- Catch-Up feature logic
- API for frontend

---

## 3. Frontend Layer

User interface and experience.

Main components:
- Creator Page
- Content Feed
- Catch-Up UI

Goals:
- Simplicity
- Speed
- Clear content organization

---

## Core Feature

### Creator Page

The central hub where all creator content is displayed.

---

### Catch-Up System

Shows only content published since last visit.

Tracks:
- user_id
- creator_id
- last_seen_timestamp

---

## Scalability Goal

The system must support:

- thousands of creators
- millions of content items
- real-time updates

---

## Philosophy

The platform does not replace content platforms.

It organizes them.

People follow creators, not platforms.
