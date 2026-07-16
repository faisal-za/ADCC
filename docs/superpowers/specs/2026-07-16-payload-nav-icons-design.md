# Payload Navigation Icons Design

**Date:** 2026-07-16  
**Status:** Approved

## Goal

Adapt the copied Payload Admin navigation-icon CSS to this project's nine collections and remove every icon rule inherited from the unrelated source project.

## Scope

Keep the existing custom Admin styling unchanged outside the navigation-icon block. Replace substring selectors with exact collection navigation IDs so icons cannot accidentally apply to unrelated entries.

| Payload collection | Navigation ID | Lucide icon |
|---|---|---|
| Users | `nav-users` | `users.svg` |
| Media | `nav-media` | `image.svg` |
| Services | `nav-services` | `wrench.svg` |
| Categories | `nav-categories` | `tags.svg` |
| Projects | `nav-projects` | `folder-kanban.svg` |
| Posts | `nav-posts` | `newspaper.svg` |
| Testimonials | `nav-testimonials` | `message-square.svg` |
| Clients | `nav-clients` | `handshake.svg` |
| Contact Submissions | `nav-contact-submissions` | `mail.svg` |

Continue using the copied stylesheet's Lucide Static CDN mask technique and version. Remove all other copied navigation icon selectors and mask rules. No Payload collection configuration or application behavior changes.
