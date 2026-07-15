# Research: Directus on Vercel container images

> **Superseded:** The application now uses embedded Payload CMS; this Directus research is retained only as historical context.

**Date:** 2026-07-14  
**Status:** Superseded by the approved deployment design in `docs/plans/2026-07-14-directus-vercel-sdk-design.md` after the deployment requirements were clarified.  
**Original research decision:** **Do not add `Dockerfile.vercel` to this frontend repository now.** Directus appears technically deployable as a Vercel container for its HTTP API/admin workload, but production suitability is not established for Directus Realtime/WebSockets, and a safe deployment also requires external PostgreSQL, object storage, and (for multi-instance/realtime use) Redis. If migration is explicitly approved, deploy Directus as a separate Vercel project/service and validate the blocking unknowns first.

## Summary

Vercel's current container-image feature and `Dockerfile.vercel` syntax are real, documented features. Directus can listen on Vercel's assigned HTTP port and its official container can use external state services, but Vercel containers scale horizontally and to zero while Directus defaults include local SQLite/filesystem state that are unsuitable for that model. The existing repository is only a Next.js consumer of an already-hosted Directus instance at `https://admin.adcc.sa`; adding a Directus server here would widen scope and couple unrelated deployments.

## Findings

1. **The feature and root-file syntax exist (high confidence).** Vercel auto-detects `Dockerfile.vercel` or `Containerfile.vercel` at the project root, builds it, and pushes the resulting image to Vercel Container Registry. Local `vercel dev` requires Docker. This confirms the June 30, 2026 feature claim against current official documentation. [Vercel: Container images](https://vercel.com/docs/functions/container-images.md)

2. **The image must run an HTTP server on `PORT` (high confidence).** Vercel sets `PORT=80` by default, with an override supported; the process must listen on that port rather than assuming Directus's normal `8055`. Vercel sends `SIGTERM` and allows 30 seconds for shutdown. An implementation would need to pass Vercel's `PORT` through to Directus and avoid hard-coding `8055`. [Vercel: Container images](https://vercel.com/docs/functions/container-images.md) [Directus configuration options](https://directus.io/docs/configuration/general)

3. **Containers inherit Function limits (high confidence).** Production containers scale down after five idle minutes; preview containers after 30 seconds. Function duration limits remain 300 seconds on Hobby and default to 300 seconds on Pro/Enterprise (up to 800 seconds, or 1,800 seconds with extended duration); request and response payloads are limited to 4.5 MB, and a process has 1,024 file descriptors. Secure Compute/static IP is not currently supported for container images. These constraints matter for large Directus uploads/downloads, long-running flows, database allow-listing, and persistent connections. [Vercel: Container images](https://vercel.com/docs/functions/container-images.md) [Vercel: Function limitations](https://vercel.com/docs/functions/limitations.md)

4. **Local container state is not a safe production datastore (high confidence).** Directus's official Dockerfile exposes `8055`, defaults to local SQLite paths, and starts with `node cli.js bootstrap` followed by `pm2-runtime`. Vercel's autoscaling/scale-to-zero lifecycle means instance-local SQLite and uploaded files cannot be treated as durable shared state. Production must use external PostgreSQL and object storage. [Directus official Dockerfile](https://raw.githubusercontent.com/directus/directus/main/Dockerfile) [Directus: Database configuration](https://directus.io/docs/configuration/database) [Directus: File storage configuration](https://directus.io/docs/configuration/files)

5. **Minimum Directus state configuration (high confidence).** Use `DB_CLIENT=pg` plus the documented external database connection variables; configure `STORAGE_LOCATIONS` and an S3-compatible driver/location for assets. Also set a stable `SECRET`, `PUBLIC_URL`, and initial-admin credentials only for first bootstrap, using Vercel secrets rather than image layers. Directus's documented `/server/health` endpoint checks database, Redis, storage, and email; `HEALTHCHECK_ENABLED` defaults to `true`. [Database](https://directus.io/docs/configuration/database) [Files](https://directus.io/docs/configuration/files) [General configuration](https://directus.io/docs/configuration/general) [Health check](https://directus.io/docs/configuration/healthcheck)

6. **Realtime is a blocking unknown on Vercel containers (high confidence in the gap).** Directus Realtime uses WebSockets/GraphQL subscriptions and requires `WEBSOCKETS_ENABLED=true` (default is `false`). Directus also requires shared Redis for collaboration/realtime across multiple instances. The reviewed current Vercel primary sources do not make a positive WebSocket-support guarantee for container images. Therefore ordinary HTTP API/admin compatibility must not be interpreted as Realtime compatibility. Test WebSocket upgrade, idle connection lifetime, scale-to-zero behavior, and reconnect behavior before selecting this platform for Realtime. [Directus: Realtime](https://directus.io/docs/configuration/realtime) [Directus: Synchronization](https://directus.io/docs/configuration/synchronization) [Vercel: Container images](https://vercel.com/docs/functions/container-images.md)

7. **Redis becomes important under horizontal scaling (high confidence).** Directus documents its default memory synchronization as suitable only for a single container and recommends/shared-requires Redis for multi-container caching, rate limiting, WebSockets, and collaboration. Vercel can create multiple instances, so a production design should use managed Redis whenever concurrency, cache coherence, rate limiting, or Realtime matters. [Directus: Synchronization](https://directus.io/docs/configuration/synchronization)

8. **Startup migrations need a controlled validation (medium confidence).** The official Directus image runs `bootstrap` every container start. That is convenient for a single instance, but Vercel autoscaling can start several instances concurrently. The reviewed official material does not establish that concurrent schema bootstrap/migration is race-free on Vercel. A migration should first be tested against a clone of production data; preferably run one controlled bootstrap/release task before allowing application replicas to scale. This is an operational recommendation, not a claim that Directus bootstrap is unsafe. [Directus official Dockerfile](https://raw.githubusercontent.com/directus/directus/main/Dockerfile) [Directus CLI](https://directus.io/docs/self-hosting/cli)

9. **A health endpoint exists, but Vercel health-routing behavior remains unclear (medium confidence).** `/server/health` is the correct Directus probe and can verify dependencies. The reviewed Vercel container documentation does not clearly establish configurable orchestration health probes, startup thresholds, or whether `/server/health` controls routing. Treat the endpoint as an external monitoring/readiness check until Vercel documents otherwise. [Directus: Health check](https://directus.io/docs/configuration/healthcheck) [Vercel: Container images](https://vercel.com/docs/functions/container-images.md)

10. **Vercel supports a same-project Services topology, but it is not the best default here (high confidence).** Vercel Services can build independent frontend/backend containers in one deployment; services are internal by default, can be exposed by a top-level rewrite, use bindings for private URLs, and specify `runtime: "container"`. That option is technically available. However, services share a deployment, so routine frontend deploys would unnecessarily redeploy/couple the CMS. A separate Vercel project/service gives Directus an independent release cadence, secrets, rollback, scaling, monitoring, and domain. [Vercel: Services](https://vercel.com/docs/services.md)

11. **The local repository already points to an external Directus (high confidence).** `package.json` contains `@directus/sdk` and a schema-generation command targeting `https://admin.adcc.sa/graphql`, but no Directus server dependency. `lib/directus.ts` hard-codes `https://admin.adcc.sa`. `next.config.js` permits Directus assets from `admin.adcc.sa` and also permits an R2 public asset host, consistent with a frontend consuming external CMS/storage. No `Dockerfile.vercel`, ordinary `Dockerfile`, `vercel.json`, `.vercel/project.json`, or Compose file was found at the checked paths. `.replit` deploys the Next app with Node 20 and ports 3000/5000; current Directus 12 requires Node 22, another reason not to embed it in the frontend runtime.

## Minimal recommended architecture

- **Keep this repository/project as the Next.js frontend.** Replace the hard-coded CMS origin with an environment variable only as part of a separately approved migration; no change is needed to answer this research task.
- **Deploy Directus separately** (a separate Vercel project/service if Vercel is chosen), based on the official `directus/directus` image or an equivalent minimal `Dockerfile.vercel` that obeys Vercel `PORT` and preserves Directus's startup command.
- **External managed PostgreSQL** for all Directus metadata/content.
- **S3-compatible object storage** (the existing R2 host suggests Cloudflare R2 may already be relevant) for all uploaded assets; never depend on container-local uploads.
- **Managed Redis** when more than one instance may run or when enabling Realtime, shared cache, distributed rate limiting, or collaboration.
- **Expose HTTPS** at a stable Directus domain and monitor `/server/health`; keep `SECRET` and database/storage/Redis credentials in Vercel environment secrets.
- **Before cutover:** clone/test the database, verify one-at-a-time bootstrap/migration, HTTP API/admin/assets/uploads, payload-size behavior, scale-from-zero latency, shutdown, and—if required—WebSocket connections/reconnects under scale-out.

## Decision: add `Dockerfile.vercel` now?

**No.** The repo has no Directus server to containerize and already consumes a live external Directus. Adding the file now would either replace the frontend deployment or introduce an unrequested multi-service architecture, while leaving material runtime questions unresolved. Add it only in a dedicated Directus project (preferred), or a deliberately designed Vercel Services migration, after the owner accepts the limits and WebSocket/migration validation passes.

## Confidence and unknowns

| Topic | Confidence | Remaining unknown |
|---|---:|---|
| Feature/file detection, `PORT`, idle shutdown, `SIGTERM` | High | Exact cold-start behavior for this image and dataset needs measurement. |
| External PostgreSQL/object storage requirement | High | Provider/network latency, connection limits, and egress were not benchmarked. |
| HTTP Directus API/admin viability | Medium-high | Full deployment was not executed; upload size and cold start need testing. |
| WebSockets/Realtime | Low for compatibility | No current primary-source Vercel guarantee was found; this is blocking if Realtime is required. |
| Concurrent bootstrap/migrations | Medium | No official guarantee for concurrent Vercel instance startup was found. |
| Health-based routing | Low-medium | Vercel's documented container health-probe semantics were not found. |
| Static outbound IP/database allow-listing | High | Container images currently lack Secure Compute/static IP support; confirm database network policy. |

## Sources

### Kept (primary sources only)

- [Vercel — Container images](https://vercel.com/docs/functions/container-images.md) — current feature syntax, lifecycle, port, shutdown, limits inheritance, Services example.
- [Vercel — Services](https://vercel.com/docs/services.md) — independent builds, private bindings, public rewrites, container runtime.
- [Vercel — Function limitations](https://vercel.com/docs/functions/limitations.md) — duration, payload, and file-descriptor limits.
- [Directus — Official Dockerfile](https://raw.githubusercontent.com/directus/directus/main/Dockerfile) — authoritative base runtime, exposed port, local defaults, bootstrap/start command.
- [Directus — Database configuration](https://directus.io/docs/configuration/database) — external database variables.
- [Directus — File storage configuration](https://directus.io/docs/configuration/files) — storage locations and S3 driver.
- [Directus — Health check](https://directus.io/docs/configuration/healthcheck) — `/server/health` and dependency checks.
- [Directus — Realtime](https://directus.io/docs/configuration/realtime) — WebSockets and configuration.
- [Directus — Synchronization](https://directus.io/docs/configuration/synchronization) — single-memory-instance limitation and Redis guidance.
- [Directus — CLI](https://directus.io/docs/self-hosting/cli) — bootstrap/migration context.

### Dropped

- Third-party tutorials, SEO hosting guides, forum answers, and unofficial compatibility claims — excluded by the primary-source-only requirement.
- Docker Hub metadata and npm metadata — useful for freshness (current Directus image/package), but unnecessary to the decision and weaker than Directus source/docs for behavior.

## Validation and residual risks

This was a documentation and repository inspection, not a deployment test. The report was checked against the requested local files; absent deployment-file paths were recorded rather than inferred. The largest residual risks are unverified Vercel WebSocket support, concurrent Directus bootstrap behavior, Vercel routing health semantics, cold-start performance, database connection pressure during autoscaling, and the 4.5 MB payload limit.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Created only the requested research artifact; project/source files were not modified and the recommendation explicitly avoids adding Dockerfile.vercel now."
    },
    {
      "id": "criterion-2",
      "status": "satisfied",
      "evidence": "Report links current official Vercel and Directus sources, separates confidence from unknowns, records local-file evidence, and gives a reviewable architecture and decision."
    }
  ],
  "changedFiles": [
    "docs/research/2026-07-14-vercel-directus-containers.md"
  ],
  "testsAddedOrUpdated": [],
  "commandsRun": [
    {
      "command": "Read package.json, lib/directus.ts, next.config.js, .replit and candidate deployment files",
      "result": "passed",
      "summary": "Confirmed this is a Next.js Directus client, found the external admin.adcc.sa origin and Node 20 Replit deployment, and found no checked Vercel/Docker deployment files."
    },
    {
      "command": "Cross-check claims against supplied current official Vercel and Directus source extracts",
      "result": "passed",
      "summary": "Confirmed container syntax/lifecycle/limits and Directus database, storage, health, realtime, synchronization, and startup behavior."
    }
  ],
  "validationOutput": [
    "Decision is explicit: do not add Dockerfile.vercel now; use a separate Directus project/service only after validation.",
    "Primary-source links are provided for every platform/runtime finding.",
    "WebSocket compatibility, health routing, and concurrent migration behavior are explicitly marked unverified rather than assumed."
  ],
  "residualRisks": [
    "No live Vercel container deployment or benchmark was run.",
    "WebSocket/Realtime compatibility lacks a current positive Vercel primary-source statement.",
    "Concurrent bootstrap safety and Vercel health-routing semantics remain unverified.",
    "Repository staging state could not be queried with the available read/write-only toolset; no staging operation was performed."
  ],
  "noStagedFiles": true,
  "diffSummary": "Added one research report artifact; no application or deployment files changed.",
  "reviewFindings": [
    "no blockers in the report; deployment remains blocked on WebSocket support if Realtime is required"
  ],
  "manualNotes": "The artifact path is the runtime-authoritative subagent output path. The noStagedFiles value means this run staged nothing; git status was unavailable."
}
```
