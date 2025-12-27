<img src="images/icon-transparent.png" width="20%" align="center" style="display: block; margin-left: auto; margin-right: auto;">
<h1 align="center">=== Whale Dividers ===</h1>

<div align="center">

[🐋 Usage](#usage) · [⌨️ Examples](#examples) · [🔧 Config](#configuration) · [🐳 Why 'Whale'?](#why-whale)

</div>

Create in-code dividers from shortcuts; helpful for sectioning code, making debug outputs more readable, or making your documentation look ✨pretty✨.
<br>
<br>
<img src="images/showcase.png" width="70%" align="center" style="display: block; margin-left: auto; margin-right: auto;">
<br>
<br>
Whale Dividers turns quick shortcuts into full code snippets, with dynamic syntax adjustment based on the active programming language.

<p align="center">
<b>Dynamic snippet support for</b><br>
<em style="font-size: 12px;">C · C++ · C# · Go<br>Java · JavaScript · JSX<br>LaTeX · Lua · Perl · PHP · PowerShell · Python<br>R · Ruby · Rust · Swift · TypeScript</em><br><em style="font-size: 11px;">Many more...</em>
</p>

## Usage

To create a whale divider, type a shortcut — for instance, `##` — and press enter to expand.

<img src="images/examples.png" width="75%" align="center" style="display: block; margin-left: auto; margin-right: auto;">

<br>

To force expansion of a shortcut, press `Ctrl/Cmd` + `Space` at the end of the shortcut.

By specifying a type flag, you can have the whale divider autofill into a print statement (or other stdout) or a single-line comment; the extension detects the current programming language and selects the correct syntax automatically.

<div align="center">

### Shortcut Format

`[type][width]#[content]#`

||`[type]`|`[width]`|`#`|`[content]`|`#`|
|---|---|---|---|---|---|
| **Format** |`p`rint<br>`c`omment | Any integer between 1 and 72 ||Any text to use as divider title||
| **Default**<br><em style="font-size: 10px;">(if left blank)</em>| Plaintext divider | Default width (20) || Unbroken divider with no title ||
|||

</div>

## Examples

Below are some examples of shortcuts, and what snippets they would expand to (note, format for `p`- and `c`-type snippets is language-dependent):

<div align="center">

| Shortcut | Expanded Snippet |
|---	  |---     |
| `##`  	| → `====================` |
| `p##`  	| → `console.log("====================")` <span style="font-size: 8px;">JS Files</span> |
| `4##`  	| → `====` |
| `#Hello#` | → `=== Hello, World ===` |
| `c9#Hey#` | → `/*== Hey ==*/` <span style="font-size: 8px;">C Files</span> |
| `p7#🙋‍♂️#` | → `print("== 🙋‍♂️ ==")` <span style="font-size: 8px;">Python Files</span> |
|||

</div>

## Configuration

Whale dividers is highly customisable, with the following configuration options:

- **Default Width** <span style="font-size: 10px;">[Default: 20]</span>
  - Divider width when not specified in shortcut
- **Space Comments** <span style="font-size: 10px;">[Default: true]</span>
  - Whether to add space between divider and comment tags for `c`omment-type whale dividers
  - **On:** `\* ==== *\` **Off:** `\*====*\`
- **Space Title** <span style="font-size: 10px;">[Default: true]</span>
  - Whether to add space between text and divider characters for whale dividers with titles
  - **On:** `== Lorem Ipsum ==` **Off:** `==Lorem Ipsum==`
- **Always Whale** <span style="font-size: 10px;">[Default: true]</span>
  - If the text for a divider is longer than the divider length, whether to add divider characters on the sides anyway
  - **On:** `3#abc# → =abc=` **Off:** `3#abc# → abc`
- **Shorter Tail** <span style="font-size: 10px;">[Default: true]</span>
  - If there would be an uneven number of divider characters on each side of a title, whether to make the right-hand side (the tail) the shorter side
  - **On:** `==abc=` **Off:** `=abc==`
- **Shorter Tail** <span style="font-size: 10px;">[Default: true]</span>
  - If there would be an uneven number of divider characters on each side of a title, whether to make the right-hand side (the tail) the shorter side
  - **On:** `==abc=` **Off:** `=abc==`
- **Whale Character** <span style="font-size: 10px;">[Default: '=']</span>
  - The symbol used to construct whale dividers

> ### Advanced Configuration <span style="font-size: 10px;">(altering not recommended)</span> :<br>
> - **Control Character** <span style="font-size: 10px;">[Default: '#']</span>
>   - The symbol used to delimit whale divider shortcuts
> - **Max Width** <span style="font-size: 10px;">[Default: 72]</span>
>   - The maximum width of a whale divider
> - **Snippet Text Parser** <span style="font-size: 10px;">[Default: 'unicode']</span>
>   - The parser used for reading the text that forms divider titles
> <br>
> <br>

## Why 'Whale'?

I use these dividers a lot in my code to mark out sections or make output easier to read. My partner once saw one of these dividers on my screen and remarked how it looked like a little whale; hence, whale dividers.

> <br>
> 
> `print('====')` ← The Original Whale <br>
> <br>

## Release Notes

See [CHANGELOG.md](CHANGELOG.md)

---

