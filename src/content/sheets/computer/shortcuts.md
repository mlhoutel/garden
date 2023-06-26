---
title: 'Vim & VS Code shortcuts'
short: 'Set of keyboard shortcuts to help users efficiently navigate and edit text'
topic: shortcuts vs-code vim cmder
---

## VS Code

[Cheat Sheet](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
[Config](https://gist.github.com/mlhoutel/70fb9e45bd030e11ae8cb048841b9078)

### Navigation

<table>
<tr>
<td>Switch Tab</td>
<td>
	<b>
	<code>Ctrl</code>
	+
	<code>[n]</code>
	</b>
</td>
</tr>
<tr>
<td>Quit Tab</td>
<td>
	<b>
	<code>Ctrl</code>
	+
	<code>F4</code>
	</b>
</td>
</tr>
<tr>
<td>Commands</td>
<td>
	<b>
	<code>Ctrl</code>
	+
	<code>Shift</code>
	+
	<code>P</code>
	</b>
</td>
</tr>
<tr>
<td>Navigate in open files</td>
<td>
	<b>
	<code>Ctrl</code>
	+
	<code>Tab</code>
	</b>
</td>
</tr>
<tr>
<td>New Terminal</td>	
<td>
	<b>
	<code>Ctrl</code>
	+
	<code>Shift</code>
	+
	<code>ù</code>
	</b>
</td>
</tr>
</table>

### File Utils

[VSCode Extension](https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils)

## Vim

[VSCode Extension](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)

[Cheat Sheet](https://vim.rtorr.com/)

`:set encoding=utf-8`

### Modes

```
┌──────────────┐     [Ctrl+C] >     ┌──────────────┐        [:] >       ┌───────────────┐
│  --Insert--  │   <════════════>   │  --Normal--  │   <════════════>   │  --Command--  │
└──────────────┘      < [i]         └──────────────┘     < [Ctrl+C]     └───────────────┘
                                            ∧
                                            ║    ∧
                                      [v]   ║ [Ctrl+C]
                                       ∨    ║
					    ∨
                                    ┌──────────────┐
                                    │  --Visual--  │
                                    └──────────────┘
```

### --Normal--

**Navigation**

<table>
<tr>
<td>Navigation [n] lines</td>
<td>
	<b>
	<code>[n]</code>
	+
	<code>i j k l</code>
	</b>
</td>
</tr>
<tr>
<td>Navigation [n] words</td>
<td>
	<b>
	<code>[n]</code>
	+
	<code>w b / W B</code>
	</b>
</td>
</tr>
<tr>
<td>Move start/end of line</td>
<td>
	<b>
	<code>0 / $</code>
	</b>
</td>
</tr>
<tr>
<td>Goto line [n]</td>
<td>
	<b>
	<code>[n]</code>
	+
	<code>gg</code>
	</b>
</td>
</tr>
<tr>
<td>Search char in line</td>
<td>
	<b>
	<code>f[char] / F[char]</code>
	</b>
</td>
</tr>
<tr>
<td>Navigate in search</td>
<td>
	<b>
	<code>Enter</code>
	then
	<code>; / ,</code>
	</b>
</td>
</tr>
<tr>
<td>Search text in file</td>
<td>
	<b>
	<code>/[text] / ?[text]</code>
	</b>
</td>
</tr>
<tr>
<td>Navigate in search</td>
<td>
	<b>
	<code>Enter</code>
	then
	<code>n / N</code>
	</b>
</td>
</tr>
<tr>
<td>Find and replace</td>
<td>
	<b>
	<code>:%s/find/replace/g</code>
	</b>
</td>
</tr>
<tr>
<td>Move half page up/down</td>
<td>
	<b>
	<code>Ctrl</code>
	+
	<code>D / U</code>
	</b>
</td>
</tr>
<tr>
<td>Center screen on cursor</td>
<td>
	<b>
	<code>zz</code>
	</b>
</td>
</tr>
</table>

V (visual)
at (go closing bracket)
o / O (go back and forth)

**Selection**

<table>
<tr>
<td>Selection</td>
<td>
	<b>
	<code>v</code>
	</b>
</td>
</tr>
<tr>
<td>Copy/Cut selection</td>
<td>
	<b>
	<code>y / d</code>
	</b>
</td>
</tr>
<tr>
<td>Paste before/after cursor</td>
<td>
	<b>
	<code>P / p</code>
	</b>
</td>
</tr>
</table>

**Macros**

<table>
<tr>
<td>Record macro [name]</td>
<td>
	<b>
	<code>q[name]</code>
	</b>
</td>
</tr>
<tr>
<td>Stop recording</td>
<td>
	<b>
	<code>q</code>
	</b>
</td>
</tr>
<tr>
<td>Play macro [name]</td>
<td>
	<b>
	<code>@[name]</code>
	</b>
</td>
</tr>
</table>

## Chrome

[Cheat Sheet](https://support.google.com/chrome/answer/157179)

<table>
<tr>
<td>Search</td>
<td>
	<b>
	<code>Ctrl</code>
		+
	<code>F</code>
	</b>
</td>
</tr>
<tr>
<td>Open selected link</td>
<td>
	<b>
	<code>Ctrl</code>
		+
	<code>Enter</code>
	</b>
</td>
</tr>
<tr>
<td>New tab</td>
<td>
	<b>
	<code>Ctrl</code>
		+
	<code>t</code>
	</b>
</td>
</tr>
<tr>
<td>Navigate to tab</td>
<td>
	<b>
	<code>Ctrl</code>
		+
	<code>[n]</code>
	</b>
</td>
</tr>
<tr>
<td>Close tab</td>
<td>
	<b>
	<code>Ctrl</code>
		+
	<code>F4</code>
	</b>
</td>
</tr>
<tr>
<td>Reopen closed tab</td>
<td>
	<b>
	<code>Ctrl</code>
		+
	<code>Shift</code>
		+
	<code>t</code>
	</b>
</td>
</tr>
<tr>
<td>Precedent / Next</td>
<td>
	<b>
	<code>Alt</code>
		+
	<code>[arrows]</code>
	</b>
</td>
</tr>
<tr>
<td>Search bar</td>
<td>
	<b>
	<code>Ctrl</code>
		+
	<code>l</code>
	</b>
</td>
</tr>
</table>

## Cmder

[Config](https://gist.github.com/mlhoutel/81cdbe218ed62569ac3d183621cb9763)
[Cheat Sheet](https://cmder.net/)

<table>
<tr>
<td>New tab</td>
<td>
	<b>
	<code>Ctrl</code>
		+
	<code>t</code>
	</b>
</td>
</tr>
<tr>
<td>Close tab</td>
<td>
	<b>
	<code>Ctrl</code>
		+
	<code>w</code>
	</b>
</td>
</tr>
<tr>
<td>Swap to tab [n]</td>
<td>
	<b>
	<code>Ctrl</code>
		+
	<code>[n]</code>
	</b>
</td>
</tr>
<tr>
<td>New Powershell tab</td>
<td>
	<b>
	<code>Shift</code>
		+
	<code>Alt</code>
		+
	<code>2</code>
	</b>
</td>
</tr>
<tr>
<td>Copy current tab right/bottom</td>
<td>
	<b>
	<code>Ctrl</code>
		+
	<code>Shift</code>
		+
	<code>R/B</code>
	</b>
</td>
</tr>
<tr>
<td>Move to tab</td>
<td>
<b>
<code>Ctrl</code>
	+
<code>Shift</code>
	+
<code>[arrows]</code>
</b>
</td>
</tr>
</table>
