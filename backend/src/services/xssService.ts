import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';
import { injectable } from 'inversify';
import { Window } from 'happy-dom'; // ※ jsdom の window はこの型と合わない

@injectable()
export class XSSService {
  private window: any;
  private DOMPurify: ReturnType<typeof createDOMPurify>;

  constructor() {
    const { window } = new JSDOM('').window as unknown as Window;
    this.window = window;
    // 型チャックを回避
    this.DOMPurify = (createDOMPurify as any)(window);
  }

  sanitize(input: string): string {
    return this.DOMPurify.sanitize(input, {
      USE_PROFILES: { html: true },
    });
  }

  sanitizeMarkdown(input: string): string {
    // Markdownは HTML タグが混在しやすいため、緩めに除去
    return this.DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'code', 'pre', 'blockquote', 'ul', 'ol', 'li'],
      ALLOWED_ATTR: ['href'],
    });
  }
}