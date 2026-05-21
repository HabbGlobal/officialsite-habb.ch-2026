interface LegalSection {
  title: string
  content: string
}

type Block = { type: 'p'; text: string } | { type: 'ul'; items: string[] }

// Splits a content string into paragraphs and bullet lists.
// Lines starting with "• " are grouped into an unordered list.
function parseBlocks(content: string): Block[] {
  const blocks: Block[] = []
  for (const raw of content.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    if (line.startsWith('• ')) {
      const item = line.slice(2)
      const last = blocks[blocks.length - 1]
      if (last && last.type === 'ul') last.items.push(item)
      else blocks.push({ type: 'ul', items: [item] })
    } else {
      blocks.push({ type: 'p', text: line })
    }
  }
  return blocks
}

export function LegalContent({
  sections,
  numbered = false,
}: {
  sections: LegalSection[]
  numbered?: boolean
}) {
  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <div key={index}>
          <h2 className="text-2xl font-semibold text-habb-gray-900 mb-4">
            {numbered ? `${index + 1}. ` : ''}
            {section.title}
          </h2>
          <div className="space-y-4">
            {parseBlocks(section.content).map((block, i) =>
              block.type === 'ul' ? (
                <ul
                  key={i}
                  className="list-disc pl-6 space-y-2 text-lg text-habb-gray-600 leading-relaxed"
                >
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="text-lg text-habb-gray-600 leading-relaxed">
                  {block.text}
                </p>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
