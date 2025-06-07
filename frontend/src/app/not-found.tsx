
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-8">
      <h1 className="text-3xl font-bold mb-4">404 - ページが見つかりません</h1>
      <p className="text-lg mb-6">
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <a href="/" className="text-blue-600 underline">
        ホームに戻る
      </a>
    </div>
  );
}
