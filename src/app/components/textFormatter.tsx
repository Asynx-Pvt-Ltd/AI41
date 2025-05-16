import React from 'react';

const FormatMarkdownText = ({ text }: { text: any }) => {
	if (
		React.isValidElement(text) ||
		(Array.isArray(text) && text.every(React.isValidElement))
	) {
		return <>{text}</>;
	}

	const textString = text?.toString() || '';

	if (!textString.includes('\n')) {
		return (
			<p className="mb-4 text-gray-800 dark:text-gray-200">{textString}</p>
		);
	}

	const paragraphs = textString.split('\n').filter((p: string) => p.trim());

	const processText = (paragraph: string): React.ReactNode => {
		const headerMatch = paragraph.match(/^(#{1,3})\s+(.+)$/);
		if (headerMatch) {
			const level = headerMatch[1].length;
			const content = headerMatch[2];

			return React.createElement(
				`h${level}`,
				{
					className: `text-${4 - level}xl font-bold my-${
						level + 1
					} text-gray-900 dark:text-white`,
				},
				processInlineElements(content),
			);
		}

		return (
			<p className="mb-4 text-gray-800 dark:text-gray-200">
				{processInlineElements(paragraph)}
			</p>
		);
	};

	const processInlineElements = (text: string): React.ReactNode => {
		let parts: React.ReactNode[] = [];
		let lastIndex = 0;

		const boldRegex = /\*\*(.*?)\*\*/g;
		let match;

		while ((match = boldRegex.exec(text)) !== null) {
			if (match.index > lastIndex) {
				parts.push(text.slice(lastIndex, match.index));
			}

			parts.push(
				<strong key={match.index} className="font-bold">
					{match[1]}
				</strong>,
			);

			lastIndex = match.index + match[0].length;
		}

		if (lastIndex < text.length) {
			parts.push(text.slice(lastIndex));
		}

		return parts.length > 0 ? parts : text;
	};

	return paragraphs.map(
		(paragraph: string, index: React.Key | null | undefined) => (
			<React.Fragment key={index}>{processText(paragraph)}</React.Fragment>
		),
	);
};

export default FormatMarkdownText;
