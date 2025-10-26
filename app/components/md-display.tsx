/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface MDDisplayProps {
	content: string;
}

function MarkdownDisplay({ content }: MDDisplayProps) {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				h1: ({ node, ...props }) => (
					<h1
						style={{
							fontSize: "var(--text-3xl)",
							lineHeight:
								"var(--tw-leading, var(--text-3xl--line-height))",
							fontWeight: "bolder",
						}}
						{...props}
					/>
				),
				h2: ({ node, ...props }) => (
					<h2
						style={{
							fontSize: "var(--text-2xl)",
							lineHeight:
								"var(--tw-leading, var(--text-2xl--line-height))",
							marginTop: "calc(var(--spacing) * 6)",
							fontWeight: "bold",
						}}
						{...props}
					/>
				),
				h3: ({ node, ...props }) => (
					<h3
						style={{
							fontSize: "var(--text-xl)",
							lineHeight:
								"var(--tw-leading, var(--text-xl--line-height))",
							marginTop: "calc(var(--spacing) * 4)",
							fontWeight: "bold",
						}}
						{...props}
					/>
				),
				ul: ({ node, ...props }) => (
					<ul
						style={{
							listStyleType: "disc",
							paddingLeft: "calc(var(--spacing) * 5)",
							marginTop: "calc(var(--spacing) * 2)",
							marginBottom: "calc(var(--spacing) * 4)",
						}}
						{...props}
					/>
				),
				ol: ({ node, ...props }) => (
					<ol
						style={{
							listStyleType: "decimal",
							paddingLeft: "calc(var(--spacing) * 5)",
							marginTop: "calc(var(--spacing) * 2)",
							marginBottom: "calc(var(--spacing) * 4)",
						}}
						{...props}
					/>
				),
				li: ({ node, ...props }) => (
					<li
						style={{
							marginTop: "calc(var(--spacing) * 1)",
							marginBottom: "calc(var(--spacing) * 1)",
						}}
						{...props}
					/>
				),
			}}
		>
			{content}
		</ReactMarkdown>
	);
}

export default MarkdownDisplay;
