# Payload Navigation Icons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep navigation icons only for the nine Payload collections in this project.

**Architecture:** Replace the copied icon selector and mask section in `app/(payload)/custom.scss` with exact `nav-<collection-slug>` selectors. Reuse the existing Lucide Static mask styling and approved icon mapping without changing the rest of the copied custom CSS.

**Tech Stack:** SCSS, Payload CMS 3.86.0, Lucide Static 0.508.0.

## Global Constraints

- Preserve all custom CSS outside the icon block exactly.
- Use the nine exact navigation IDs and icons approved in `docs/superpowers/specs/2026-07-16-payload-nav-icons-design.md`.
- Remove all unrelated copied icon selectors and mask rules.
- Add no dependencies or Payload configuration changes.

---

### Task 1: Replace copied navigation icons

**Files:**
- Modify: `app/(payload)/custom.scss`

- [x] Replace the shared selector list with exact selectors for `nav-users`, `nav-media`, `nav-services`, `nav-categories`, `nav-projects`, `nav-posts`, `nav-testimonials`, `nav-clients`, and `nav-contact-submissions`.
- [x] Add one mask rule per collection using `users.svg`, `image.svg`, `wrench.svg`, `tags.svg`, `folder-kanban.svg`, `newspaper.svg`, `message-square.svg`, `handshake.svg`, and `mail.svg` respectively.
- [x] Confirm obsolete selectors such as `nav-rfqs`, `nav-invoices`, `nav-payments`, and `nav-tickets` no longer occur.
- [x] Run `git diff --check` and inspect the targeted diff.
- [x] Commit only the user's custom stylesheet update and this plan.
