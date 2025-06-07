-- 1. tsvector カラム追加
ALTER TABLE post ADD COLUMN document_with_weights tsvector;

-- 2. 値を生成（title は重要度 A、content は B に重み付け）
UPDATE post SET document_with_weights =
  setweight(to_tsvector('japanese', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('japanese', coalesce(content, '')), 'B');

-- 3. トリガーで自動更新（INSERT/UPDATE時に再構築）
CREATE FUNCTION post_tsvector_trigger() RETURNS trigger AS $$
begin
  new.document_with_weights :=
    setweight(to_tsvector('japanese', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('japanese', coalesce(new.content, '')), 'B');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
  ON post FOR EACH ROW EXECUTE FUNCTION post_tsvector_trigger();

-- 4. GIN インデックス作成（高速全文検索）
CREATE INDEX post_fts_idx ON post USING GIN (document_with_weights);
