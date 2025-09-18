export class ScrollRestorer {
  private anchorId: string | null = null;
  private anchorLocalOffset = 0;
  private pinnedToBottom = false;

  capture(container: HTMLElement, itemSelector = "[data-highlight-id]") {
    const { scrollTop, clientHeight, scrollHeight } = container;
    this.pinnedToBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if (this.pinnedToBottom) { this.anchorId = null; return; }

    const centerY = scrollTop + clientHeight / 2;
    const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));

    let best: HTMLElement | null = null;
    for (const el of items) {
      const top = el.offsetTop, bottom = top + el.offsetHeight;
      if (top <= centerY && centerY < bottom) { best = el; break; }
    }
    if (!best && items.length) {
      best = items.find(el => el.offsetTop + el.offsetHeight <= centerY) ?? items[0];
    }

    if (best) {
      this.anchorId = best.getAttribute("data-highlight-id");
      this.anchorLocalOffset = centerY - best.offsetTop;
    } else {
      this.anchorId = null;
    }
  }

  restore(container: HTMLElement, itemSelector = "[data-highlight-id]") {
    requestAnimationFrame(() => {
      if (this.pinnedToBottom) {
        container.scrollTop = container.scrollHeight - container.clientHeight;
        return;
      }
      if (!this.anchorId) return;
      const sel = `${itemSelector}[data-highlight-id="${CSS.escape(this.anchorId)}"]`;
      const el = container.querySelector<HTMLElement>(sel);
      if (!el) return;
      const targetCenter = el.offsetTop + this.anchorLocalOffset;
      const desiredScrollTop = Math.max(0, targetCenter - container.clientHeight / 2);
      container.scrollTop = desiredScrollTop;
    });
  }
}
