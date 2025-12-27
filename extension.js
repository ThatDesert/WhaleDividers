const vscode = require("vscode");

//#region Configuration

let spaceComments = vscode.workspace.getConfiguration('whaledividers').get('spaceComments');
let maxWidth = vscode.workspace.getConfiguration('whaledividers.advanced').get('maxWidth'); // Python PEP8
let defaultWidth = vscode.workspace.getConfiguration('whaledividers').get('defaultWidth');
let ctrlCharacter = vscode.workspace.getConfiguration('whaledividers.advanced').get('controlCharacter')[0];
let whaleCharacter = vscode.workspace.getConfiguration('whaledividers').get('whaleCharacter')[0];
let alwaysWhale = vscode.workspace.getConfiguration('whaledividers').get('alwaysWhale'); // Always have at least one whale character on each side.
let addPadding = vscode.workspace.getConfiguration('whaledividers').get('spaceTitle'); // Adds a space on the left and right of every text string (whether or not it already has spaces)
let shorterTail = vscode.workspace.getConfiguration('whaledividers').get('shorterTail'); // When can't make the left and right tail equal, prefer to make the left longer and the right shorter
let parserMode = vscode.workspace.getConfiguration('whaledividers.advanced').get('snippetTextParser');

vscode.workspace.onDidChangeConfiguration(event => {
	if (event.affectsConfiguration('whaledividers.defaultWidth')) {
		defaultWidth = vscode.workspace.getConfiguration('whaledividers').get('defaultWidth');
	}

	if (event.affectsConfiguration('whaledividers.spaceComments')) {
		spaceComments = vscode.workspace.getConfiguration('whaledividers').get('spaceComments');
		s = " ".repeat(Number(spaceComments));
		snippets = {
			p: {
				bat: ({ c }) => `echo ${c}`,
				css: ({ c }) => `${c}`,
				c: ({ c }) => `printf("${c}");`,
				cpp: ({ c }) => `std::cout << "${c}";`,
				csharp: ({ c }) => `Console.WriteLine("${c}");`,
				dockercompose: ({ c }) => `command: "echo ${c}"`,
				dockerfile: ({ c }) => `RUN echo "${c}"`,
				go: ({ c }) => `fmt.Println("${c}")`,
				haskell: ({ c }) => `putStrLn "${c}"`,
				html: ({ c }) => `${c}`,
				java: ({ c }) => `System.out.println("${c}")`,
				javascript: ({ c }) => `console.log("${c}");`,
				javascriptreact: ({ c }) => `console.log("${c}")`,
				json: ({ c }) => `${c}`,
				jsonc: ({ c }) => `${c}`,
				latex: ({ c }) => `${c}`,
				lua: ({ c }) => `print("${c}")`,
				makefile: ({ c }) => `$(info ${c})`,
				markdown: ({ c }) => `${c}`,
				"objective-c": ({ c }) => `NSLog(@"${c}");`,
				pascal: ({ c }) => `WriteLn('${c}');`,
				perl: ({ c }) => `print "${c}";`,
				perl6: ({ c }) => `print "${c}";`,
				php: ({ c }) => `print "${c}";`,
				powershell: ({ c }) => `"${c}"`,
				python: ({ c }) => `print("${c}")`,
				r: ({ c }) => `print("${c}")`,
				ruby: ({ c }) => `puts "${c}"`,
				rust: ({ c }) => `println!("${c}");`,
				sass: ({ c }) => `@debug "${c}";`,
				scss: ({ c }) => `@debug "${c}";`,
				shellscript: ({ c }) => `echo "${c}"`,
				sql: ({ c }) => `PRINT '${c}'`,
				swift: ({ c }) => `print("${c}")`,
				typescript: ({ c }) => `console.log("${c}");`,
				typescriptreact: ({ c }) => `console.log("${c}");`,
				tex: ({ c }) => `${c}`,
				vb: ({ c }) => `Print "${c}"`,
				plaintext: ({ c }) => `${c}`,
			},
			c: {
				bat: ({ c }) => `rem ${s + c}`,
				css: ({ c }) => `/*${s + c + s}*/`,
				c: ({ c }) => `/*${s + c + s}*/`,
				cpp: ({ c }) => `/*${s + c + s}*/`,
				csharp: ({ c }) => `//${s + c}`,
				dockercompose: ({ c }) => `#${s + c}`,
				dockerfile: ({ c }) => `#${s + c}`,
				go: ({ c }) => `//${s + c}`,
				haskell: ({ c }) => `--${s + c}`,
				html: ({ c }) => `<!--${s + c + s}-->`,
				java: ({ c }) => `//${s + c}`,
				javascript: ({ c }) => `//${s + c}`,
				javascriptreact: ({ c }) => `{/*${s + c + s}*/}`,
				json: ({ c }) => `${c}`,
				jsonc: ({ c }) => `//${s + c}`,
				latex: ({ c }) => `%${s + c}`,
				lua: ({ c }) => `--${s + c}`,
				makefile: ({ c }) => `#${s + c}`,
				markdown: ({ c }) => `${c}`,
				"objective-c": ({ c }) => `//${s + c}`,
				pascal: ({ c }) => `//${s + c}`,
				perl: ({ c }) => `#${s + c}`,
				perl6: ({ c }) => `#${s + c}`,
				php: ({ c }) => `//${s + c}`,
				powershell: ({ c }) => `#${s + c}`,
				python: ({ c }) => `#${s + c}`,
				r: ({ c }) => `#${s + c}`,
				ruby: ({ c }) => `#${s + c}`,
				rust: ({ c }) => `//${s + c}`,
				sass: ({ c }) => `/*${s + c + s}*/`,
				scss: ({ c }) => `/*${s + c + s}*/`,
				shellscript: ({ c }) => `#${s + c}`,
				sql: ({ c }) => `--${s + c}`,
				swift: ({ c }) => `//${s + c}`,
				typescript: ({ c }) => `//${s + c}`,
				typescriptreact: ({ c }) => `{/*${s + c + s}*/}`,
				tex: ({ c }) => `%${s + c}`,
				vb: ({ c }) => `'${s + c}`,
				plaintext: ({ c }) => `${c}`,
			},
		};
	}

	if (event.affectsConfiguration('whaledividers.spaceTitle')) {
		addPadding = vscode.workspace.getConfiguration('whaledividers').get('spaceTitle');
	}

	if (event.affectsConfiguration('whaledividers.alwaysWhale')) {
		alwaysWhale = vscode.workspace.getConfiguration('whaledividers').get('alwaysWhale');
	}

	if (event.affectsConfiguration('whaledividers.shorterTail')) {
		shorterTail = vscode.workspace.getConfiguration('whaledividers').get('shorterTail');
	}

	if (event.affectsConfiguration('whaledividers.advanced.controlCharacter')) {
		ctrlCharacter = vscode.workspace.getConfiguration('whaledividers.advanced').get('controlCharacter')[0];
		ctrlCharacterRegex = RegExp.escape(ctrlCharacter);
		regexExpressions = {
			ascii: new RegExp(
				`(?<snippet>[a-zA-Z]?)(?<width>[0-9]*?)${ctrlCharacterRegex}(?<content>[ -~]*?)${ctrlCharacterRegex}`,
				"g"
			),
			unicode: new RegExp(
				`(?<snippet>[a-zA-Z]?)(?<width>[0-9]*?)${ctrlCharacterRegex}(?<content>[\\p{L}\\p{N}\\p{P}\\p{S}\\p{Zs}\\p{M}\\p{Emoji}\\u200d\\uFE0F]*?)${ctrlCharacterRegex}`,
				"ug"
			),
			unicodeFormat: new RegExp(
				`(?<snippet>[a-zA-Z]?)(?<width>[0-9]*?)${ctrlCharacterRegex}(?<content>[\\p{L}\\p{N}\\p{P}\\p{S}\\p{Zs}\\p{M}\\p{Emoji}\\p{Cf}\\uFE0F]*?)${ctrlCharacterRegex}`,
				"ug"
			),
		};
	}

	if (event.affectsConfiguration('whaledividers.whaleCharacter')) {
		whaleCharacter = vscode.workspace.getConfiguration('whaledividers').get('whaleCharacter')[0];
	}

	if (event.affectsConfiguration('whaledividers.advanced.maxWidth')) {
		maxWidth = vscode.workspace.getConfiguration('whaledividers.advanced').get('spaceTitle');
	}

	if (event.affectsConfiguration('whaledividers.advanced.snippetTextParser')) {
		parserMode = vscode.workspace.getConfiguration('whaledividers.advanced').get('snippetTextParser');
	}
});
//#endregion

let s = " ".repeat(Number(spaceComments));

let snippets = {
	// https://code.visualstudio.com/docs/languages/identifiers
	p: {
		bat: ({ c }) => `echo ${c}`,
		css: ({ c }) => `${c}`,
		c: ({ c }) => `printf("${c}");`,
		cpp: ({ c }) => `std::cout << "${c}";`,
		csharp: ({ c }) => `Console.WriteLine("${c}");`,
		dockercompose: ({ c }) => `command: "echo ${c}"`,
		dockerfile: ({ c }) => `RUN echo "${c}"`,
		go: ({ c }) => `fmt.Println("${c}")`,
		haskell: ({ c }) => `putStrLn "${c}"`,
		html: ({ c }) => `${c}`,
		java: ({ c }) => `System.out.println("${c}")`,
		javascript: ({ c }) => `console.log("${c}");`,
		javascriptreact: ({ c }) => `console.log("${c}")`,
		json: ({ c }) => `${c}`,
		jsonc: ({ c }) => `${c}`,
		latex: ({ c }) => `${c}`,
		lua: ({ c }) => `print("${c}")`,
		makefile: ({ c }) => `$(info ${c})`,
		markdown: ({ c }) => `${c}`,
		"objective-c": ({ c }) => `NSLog(@"${c}");`,
		pascal: ({ c }) => `WriteLn('${c}');`,
		perl: ({ c }) => `print "${c}";`,
		perl6: ({ c }) => `print "${c}";`,
		php: ({ c }) => `print "${c}";`,
		powershell: ({ c }) => `"${c}"`,
		python: ({ c }) => `print("${c}")`,
		r: ({ c }) => `print("${c}")`,
		ruby: ({ c }) => `puts "${c}"`,
		rust: ({ c }) => `println!("${c}");`,
		sass: ({ c }) => `@debug "${c}";`,
		scss: ({ c }) => `@debug "${c}";`,
		shellscript: ({ c }) => `echo "${c}"`,
		sql: ({ c }) => `PRINT '${c}'`,
		swift: ({ c }) => `print("${c}")`,
		typescript: ({ c }) => `console.log("${c}");`,
		typescriptreact: ({ c }) => `console.log("${c}");`,
		tex: ({ c }) => `${c}`,
		vb: ({ c }) => `Print "${c}"`,
		plaintext: ({ c }) => `${c}`,
	},
	c: {
		bat: ({ c }) => `rem ${s + c}`,
		css: ({ c }) => `/*${s + c + s}*/`,
		c: ({ c }) => `/*${s + c + s}*/`,
		cpp: ({ c }) => `/*${s + c + s}*/`,
		csharp: ({ c }) => `//${s + c}`,
		dockercompose: ({ c }) => `#${s + c}`,
		dockerfile: ({ c }) => `#${s + c}`,
		go: ({ c }) => `//${s + c}`,
		haskell: ({ c }) => `--${s + c}`,
		html: ({ c }) => `<!--${s + c + s}-->`,
		java: ({ c }) => `//${s + c}`,
		javascript: ({ c }) => `//${s + c}`,
		javascriptreact: ({ c }) => `{/*${s + c + s}*/}`,
		json: ({ c }) => `${c}`,
		jsonc: ({ c }) => `//${s + c}`,
		latex: ({ c }) => `%${s + c}`,
		lua: ({ c }) => `--${s + c}`,
		makefile: ({ c }) => `#${s + c}`,
		markdown: ({ c }) => `${c}`,
		"objective-c": ({ c }) => `//${s + c}`,
		pascal: ({ c }) => `//${s + c}`,
		perl: ({ c }) => `#${s + c}`,
		perl6: ({ c }) => `#${s + c}`,
		php: ({ c }) => `//${s + c}`,
		powershell: ({ c }) => `#${s + c}`,
		python: ({ c }) => `#${s + c}`,
		r: ({ c }) => `#${s + c}`,
		ruby: ({ c }) => `#${s + c}`,
		rust: ({ c }) => `//${s + c}`,
		sass: ({ c }) => `/*${s + c + s}*/`,
		scss: ({ c }) => `/*${s + c + s}*/`,
		shellscript: ({ c }) => `#${s + c}`,
		sql: ({ c }) => `--${s + c}`,
		swift: ({ c }) => `//${s + c}`,
		typescript: ({ c }) => `//${s + c}`,
		typescriptreact: ({ c }) => `{/*${s + c + s}*/}`,
		tex: ({ c }) => `%${s + c}`,
		vb: ({ c }) => `'${s + c}`,
		plaintext: ({ c }) => `${c}`,
	},
};
const supportedLangs = [
	"bat",
	"css",
	"c",
	"cpp",
	"csharp",
	"dockercompose",
	"dockerfile",
	"go",
	"haskell",
	"html",
	"java",
	"javascript",
	"javascriptreact",
	"json",
	"jsonc",
	"latex",
	"lua",
	"makefile",
	"markdown",
	"objective-c",
	"pascal",
	"perl",
	"perl6",
	"php",
	"powershell",
	"python",
	"r",
	"ruby",
	"rust",
	"sass",
	"scss",
	"shellscript",
	"sql",
	"swift",
	"typescript",
	"typescriptreact",
	"tex",
	"vb",
	"plaintext",
];

const docstring = {
	empty: {
		print: new vscode.MarkdownString(
			`**Whale Divider**  
			$(console) Within a print function`,
			true
		),
		comment: new vscode.MarkdownString(
			`**Whale Divider**  
			$(comment) Within a comment`,
			true
		),
		plaintext: new vscode.MarkdownString(
			`**Whale Divider**  
			$(note) In plaintext`,
			true
		),
	},
	filled: {
		print: new vscode.MarkdownString(
			`**Whale Divider**  
			$(symbol-string) With title  
			$(console) Within a print function`,
			true
		),
		comment: new vscode.MarkdownString(
			`**Whale Divider**  
			$(symbol-string) With title  
			$(comment) Within a comment`,
			true
		),
		plaintext: new vscode.MarkdownString(
			`**Whale Divider**  
			$(symbol-string) With title  
			$(note) In plaintext`,
			true
		),
	},
};

const snippetTypes = ["", "p", "c"]; // p: Print, c: Comment, empty: Plain
let ctrlCharacterRegex = RegExp.escape(ctrlCharacter);
let regexExpressions = {
	// Yes, I know this means Regular Expressions Expressions. Sue me.
	ascii: new RegExp(
		`(?<snippet>[a-zA-Z]?)(?<width>[0-9]*?)${ctrlCharacterRegex}(?<content>[ -~]*?)${ctrlCharacterRegex}`,
		"g"
	),
	unicode: new RegExp(
		`(?<snippet>[a-zA-Z]?)(?<width>[0-9]*?)${ctrlCharacterRegex}(?<content>[\\p{L}\\p{N}\\p{P}\\p{S}\\p{Zs}\\p{M}\\p{Emoji}\\u200d\\uFE0F]*?)${ctrlCharacterRegex}`,
		"ug"
	),
	unicodeFormat: new RegExp(
		`(?<snippet>[a-zA-Z]?)(?<width>[0-9]*?)${ctrlCharacterRegex}(?<content>[\\p{L}\\p{N}\\p{P}\\p{S}\\p{Zs}\\p{M}\\p{Emoji}\\p{Cf}\\uFE0F]*?)${ctrlCharacterRegex}`,
		"ug"
	),
};

function extractWhaleContent(lineText) {
	const ctrlCount = lineText.split(ctrlCharacter).length - 1;
	
	if (ctrlCount <= 1) {
		return null;
	} else if (ctrlCount % 2 == 0) {
		const extracted = [...lineText.matchAll(regexExpressions[parserMode])];

		console.log(extracted)
		return [extracted[extracted.length - 1], 0];
	} else {

		const firstCtrlIndex = lineText.indexOf(ctrlCharacter);

		if (firstCtrlIndex !== -1) {
			const reduced = lineText.slice(firstCtrlIndex + 1);

			const extracted = [...reduced.matchAll(regexExpressions[parserMode])];

			return [extracted[extracted.length - 1], firstCtrlIndex + 1];
		}
	}
}

function checkWhaleValidity(snippet, width) {
	if (!snippetTypes.includes(snippet)) {
		console.log(`Snippet type ${snippet} not in ${snippetTypes}.`);
		return false;
	} else if (0 > width || width > maxWidth) {
		console.log(`Width ${width} not between 0 and ${maxWidth}.`);
		return false;
	} else {
		return true;
	}
}

const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });

function getGraphemeLength(text) {
	return [...segmenter.segment(text)].length;
}

function generateWhaleText(width = 0, content = "") {
	let text = "";

	width = width || defaultWidth;

	if (content === "") {
		text = whaleCharacter.repeat(width);
		return text;
	}

	if (addPadding) {
		content = " " + content + " ";
	}

	const contentLength = getGraphemeLength(content);

	if (contentLength >= width - 1 && alwaysWhale) {
		return whaleCharacter + content + whaleCharacter;
	}

	width -= contentLength;

	let leftTail = 0;
	let rightTail = 0;

	if (width % 2 == 0) {
		leftTail = width / 2;
		rightTail = width / 2;
	} else {
		const half = Math.floor(width / 2);
		leftTail = half + Number(shorterTail);
		rightTail = half + Number(!shorterTail);
	}

	text =
		whaleCharacter.repeat(leftTail) +
		content +
		whaleCharacter.repeat(rightTail);

	console.log(text);
	return text;
}

function generateWhaleSnippet(type, text, lang) {
	if (type === "") {
		return text;
	}

	lang = lang.toLowerCase();

	if (!supportedLangs.includes(lang)) {
		return text;
	}

	return snippets[type][lang]({ c: text });
}

function truncate(text, n) {
	return text.length > n ? text.slice(0, n) + "…" : text;
}

function activate(context) {
	console.log("========================")
	console.log(
		`
  __                 __   __ __
 / /                 \\ \\  \\ v /
| |    _____ _____    | |_/  /
| |_  |_____|_____|  _| |___/
| (_) |_____|_____| (_) |
 \\_\\                 /_/ 
`
	);
	console.log("Whale Dividers by Desert");
	console.log("========================")
	const provider = vscode.languages.registerCompletionItemProvider(
		supportedLangs,
		{
			provideCompletionItems(document, position) {
				const line = document.lineAt(position.line);
				const lineUntilCursor = line.text.slice(0, position.character);

				const extracted = extractWhaleContent(
					lineUntilCursor
				);

				if (extracted == null) {
					return [];
				}

				const input = extracted[0].input;
				const index = Number(extracted[0].index) + extracted[1];
				const snippet = extracted[0].groups.snippet.toLowerCase();
				const width = Number(extracted[0].groups.width);
				const content = extracted[0].groups.content;

				const valid = checkWhaleValidity(snippet, width);

				if (!valid) {
					return [];
				}

				const range = new vscode.Range(
					position.line,
					index,
					position.line,
					position.character
				);

				const item = new vscode.CompletionItem(
					document.getText(range),
					snippet == "p"
						? vscode.CompletionItemKind.Snippet
						: snippet == "c"
							? vscode.CompletionItemKind.Issue
							: vscode.CompletionItemKind.Text
				);

				const text = generateWhaleText(width, content);
				const snippetText = generateWhaleSnippet(
					snippet,
					text,
					document.languageId
				);

				item.range = { replacing: range, inserting: range };
				item.insertText = snippetText;
				item.filterText = input;
				item.preselect = true;

				if (content === "") {
					if (snippet === "p") {
						item.documentation = docstring.empty.print;
					} else if (snippet === "c") {
						item.documentation = docstring.empty.comment;
					} else {
						item.documentation = docstring.empty.plaintext;
					}
				} else {
					if (snippet === "p") {
						item.documentation = docstring.filled.print;
					} else if (snippet === "c") {
						item.documentation = docstring.filled.comment;
					} else {
						item.documentation = docstring.filled.plaintext;
					}
				}

				item.detail = truncate(snippetText, 42);

				return [item];
			},
		},
		ctrlCharacter
	);

	context.subscriptions.push(provider);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate,
};
