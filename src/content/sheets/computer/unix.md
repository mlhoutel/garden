---
title: 'Unix OS family'
short: 'group of computer operating systems that share a common heritage and many of the same design principles, and are known for their stability, flexibility, and portability'
topic: computer-science unix
---

## Fast Help

<table >
<tr>
<th>Instruction</th>
<th>Command</th>
</tr>
<tr>
<td><b>Move to</b></td>
<td><code>cd directory_name</code></td>
</tr>
<tr>
<td><b>Current folder</b></td>
<td><code>pwd</code></td>
</tr>
<tr>
<td><b>Binary location</b></td>
<td><code>which command_name</code></td>
</tr>
<tr>
<td><b>List folders</b></td>
<td><code>ls [-l (detail)][-a (hidden)][-F (type)][-h (size)][-t (date)][-r (reverse)]</code></td>
</tr>
<tr>
<td><b>Disk usage</b></td>
<td><code>du [-h (size)][-a (all)][-s (sum)]</code></td>
</tr>
<tr>
<td><b>Display all files</b></td>
<td><code>cat file_name [-n (lines)]</code></td>
</tr>
<tr>
<td><b>Display page files</b></td>
<td><code>less file_name [SPACE (scroll)][ENTER (next)][B (back)][Q (quit)][/text_to_find (find) + n(next)/N(back)]</code></td>
</tr>
<tr>
<td><b>Display part file</b></td>
<td><code>head file_name/tail file_name [-n 10 (lines)][-f (follow)]</code></td>
</tr>
<tr>
<td><b>Create file</b></td>
<td><code>touch file_name [second_file_name...]</code></td>
</tr>
<tr>
<td><b>Create directory</b></td>
<td><code>mkdir folder_name [-p (path folders)]</code></td>
</tr>
<tr>
<td><b>Copy file</b></td>
<td><code>cp file_name copy_name [*.jpg (wildcard)][-R (recursive)]</code></td>
</tr>
<tr>
<td><b>Move file</b></td>
<td><code>mv file_name folder_name [*.jpg (wildcard)]</code></td>
</tr>
<tr>
<td><b>Rename file</b></td>
<td><code>mv file_name new_file_name</code></td>
</tr>
<tr>
<td><b>Remove file</b></td>
<td><code>rm file_name [second_file_name...][-i (ask)][-f (force)][-v (verbose)][-r (recursive)]</code></td>
</tr>
<tr>
<td><b>Link file</b></td>
<td><code>ln file_name target_name</code></td>
</tr>
</table>

### Linux directory

```
/                                               *Root directory*
├───bin                                         *Users programs*
├───boot                                        *System booting*
├───dev                                         *Devices (ex:CD)*
├───etc                                         *Config folder*
├───home                                        *Users folders*
│     ├───userA
│     └───userB
├───lib                                         *Shared libraries*
├───media                                       *Medias (ex:USB)*
├───mnt                                         *Temporary medias*
├───opt                                         *Programs add-ons*
├───proc                                        *System infos*
├───root                                        *Root user folder*
├───sbin                                        *System programs*
├───tmp                                         *Temporary folder*
├───usr                                         *Users programs*
└───var                                         *Datas and Logs*
```
