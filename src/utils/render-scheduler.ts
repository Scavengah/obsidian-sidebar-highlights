export type RenderKind = "none" | "content" | "full";
const RANK: Record<RenderKind, number> = { none: 0, content: 1, full: 2 };

export class RenderScheduler {
  private pending: RenderKind = "none";
  private scheduled = false;
  private isRendering = false;

  request(kind: RenderKind, cb: (kind: Exclude<RenderKind, "none">) => void) {
    if (RANK[kind] > RANK[this.pending]) this.pending = kind;
    if (this.scheduled) return;
    this.scheduled = true;
    queueMicrotask(() => {
      if (this.isRendering) return;
      this.isRendering = true;
      const k = this.pending === "none" ? "content" : this.pending;
      this.pending = "none";
      this.scheduled = false;
      try { cb(k as Exclude<RenderKind, "none">); }
      finally { this.isRendering = false; }
    });
  }

  get busy() { return this.isRendering; }
}
