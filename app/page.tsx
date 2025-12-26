import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";

function extractMarkdown(content: string): string {
  const markdownStart = content.indexOf("```markdown\n");
  const markdownEnd = content.lastIndexOf("```");

  if (
    markdownStart !== -1 &&
    markdownEnd !== -1 &&
    markdownEnd > markdownStart
  ) {
    return content.substring(markdownStart + 12, markdownEnd).trim();
  }

  return content;
}

export default function Home() {
  const mdxPath = join(process.cwd(), "app", "whiz.mdx");
  const mdxContent = readFileSync(mdxPath, "utf-8");
  const markdownContent = extractMarkdown(mdxContent);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col gap-12 py-16 px-8 bg-white dark:bg-black sm:px-16">
        <div className="markdown-content text-zinc-700 dark:text-zinc-300">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mb-6 mt-8 text-black dark:text-zinc-50">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-semibold mb-4 mt-6 text-black dark:text-zinc-50">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-medium mb-3 mt-4 text-black dark:text-zinc-50">
                  {children}
                </h3>
              ),
              p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 ml-4 space-y-2">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 ml-4 space-y-2">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="block bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg mb-4 overflow-x-auto text-sm font-mono whitespace-pre">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => <pre className="mb-4">{children}</pre>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 my-4 italic">
                  {children}
                </blockquote>
              ),
              hr: () => (
                <hr className="my-8 border-zinc-300 dark:border-zinc-700" />
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {children}
                </a>
              ),
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
}
