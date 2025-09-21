// Integrated from hover-comment-tooltip plugin
import { Plugin } from 'obsidian';

/**
 * Integrates hover-comment-tooltip: injects CSS, wires tooltip behavior,
 * and ensures anchors added later (e.g., by the highlight renderer) are bound.
 */
export function registerHoverCommentTooltip(plugin: Plugin) {
  // Inject CSS from upstream plugin
  const css = `/* src/styles.css */
.comment-anchor {
  position: relative;
  display: inline-block;
  margin-right: 0.15em;
}
.comment-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.12em;
  cursor: pointer;
  color: var(--text-faint);
  transition:
    transform .12s,
    color .12s,
    opacity .12s;
  opacity: 0.7;
}
.comment-icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
}
.comment-icon:hover {
  transform: scale(1.35);
  color: var(--text-normal);
  opacity: 1;
}
.comment-anchor > .comment-text {
  opacity: 0;
}
.comment-anchor:hover > .comment-text {
  opacity: 1;
}
.comment-text {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -0.45em);
  width: max-content;
  max-width: min(60ch, 90vw);
  background: var(--background-primary);
  color: var(--text-normal);
  border: 1px solid var(--background-modifier-border);
  border-radius: var(--radius-m);
  padding: 0.6em;
  box-shadow: var(--shadow-s);
  opacity: 0;
  pointer-events: none;
  transition: opacity .12s;
  z-index: 999;
}
.comment-anchor.open-left > .comment-text {
  right: 0;
  left: auto;
  transform: translateY(-0.45em);
}
.comment-anchor.open-right > .comment-text {
  left: 0;
  transform: translateY(-0.45em);
}
.callout,
.callout-content {
  overflow: visible;
}
`;
  const style = document.createElement('style');
  style.setAttribute('data-plugin', 'hover-comment-tooltip-integrated');
  style.textContent = css;
  document.head.appendChild(style);
  plugin.register(() => style.remove());

  // Helper to (idempotently) bind a single anchor
  const bindAnchor = (anchor: HTMLElement) => {
    if ((anchor as any)._hctBound) return;
    (anchor as any)._hctBound = true;

    // Ensure relative positioning so the bubble can absolutely position
    if (!anchor.style.position) anchor.style.position = 'relative';

    // Ensure the required bubble exists
    const bubble = anchor.querySelector<HTMLElement>('.comment-text');
    if (!bubble) return;

    // Insert a visible hover target (💬) if not present
    if (!anchor.querySelector('.comment-icon')) {
      const icon = document.createElement('span');
      icon.className = 'comment-icon';
      icon.textContent = '💬';
      anchor.insertBefore(icon, anchor.firstChild);
    }

    // Base hidden state; CSS handles visibility on :hover
    bubble.style.position = bubble.style.position || 'absolute';
    bubble.style.pointerEvents = 'none';

    // On hover, decide left/right opening to avoid viewport overflow
    const onEnter = () => {
      const temp = bubble.cloneNode(true) as HTMLElement;
      temp.style.visibility = 'hidden';
      document.body.appendChild(temp);
      const bubbleWidth = temp.getBoundingClientRect().width;
      document.body.removeChild(temp);

      const rect = anchor.getBoundingClientRect();
      const vw = window.innerWidth || document.documentElement.clientWidth;

      anchor.classList.remove('open-left','open-right');
      const wouldOverflowRight = rect.left + bubbleWidth + 16 > vw;
      const wouldOverflowLeft  = rect.right - bubbleWidth - 16 < 0;

      if (wouldOverflowRight && !wouldOverflowLeft) {
        anchor.classList.add('open-left');
      } else if (wouldOverflowLeft && !wouldOverflowRight) {
        anchor.classList.add('open-right');
      } else {
        // fallback: open toward screen center
        const iconCenterX = rect.left + rect.width / 2;
        const screenMid = vw / 2;
        anchor.classList.add(iconCenterX < screenMid ? 'open-right' : 'open-left');
      }
    };
    const onLeave = () => { /* nothing; CSS fades via :hover */ };

    // Delegate to the icon (larger target) if present, else the anchor
    const hoverTarget = anchor.querySelector<HTMLElement>('.comment-icon') || anchor;
    hoverTarget.addEventListener('mouseenter', onEnter);
    hoverTarget.addEventListener('mouseleave', onLeave);
    plugin.register(() => {
      hoverTarget.removeEventListener('mouseenter', onEnter);
      hoverTarget.removeEventListener('mouseleave', onLeave);
    });
  };

  // Bind anchors within rendered markdown roots
  plugin.registerMarkdownPostProcessor((root) => {
    root.querySelectorAll<HTMLElement>('.comment-anchor').forEach(bindAnchor);
  });

  // Also observe the document for anchors added later (e.g., from highlight renders)
  const obs = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type !== 'childList') continue;
      m.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches?.('.comment-anchor')) bindAnchor(node);
        node.querySelectorAll?.('.comment-anchor').forEach((el) => bindAnchor(el as HTMLElement));
      });
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });
  plugin.register(() => obs.disconnect());
}
