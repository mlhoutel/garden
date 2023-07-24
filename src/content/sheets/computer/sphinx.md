---
title: 'Sphinx documentation generator'
short: 'Convert source code documentation written in the reStructuredText format into a variety of output formats, such as HTML and PDF'
topic: docs sphinx python
---

## Introduction

## Setup

### Installation with Anaconda

**Install Anaconda:**

<https://docs.anaconda.com/anaconda/install/windows/>

```bash
   $ conda create -n sphinx python=3.7 # Create the env we will use for sphinx
   $ conda activate sphinx 			# Activate the env (reopen a new command if error)
   (sphinx) $ conda install sphinx 	# Install Sphinx from the package repository

   # Extentions (themes, converter, highligting etc)
   (sphinx) $ conda install -c anaconda recommonmark 		# If you want to use the .md language in addition to the .rst base one
   (sphinx) $ conda install -c anaconda sphinx_rtd_theme 	# Read The Doc theme is a cool theme to begin, see example at https://sphinx-rtd-theme.readthedocs.io/en/stable/
   (sphinx) $ conda install -c conda-forge nbsphinx		# If you want to have embedded notebooks into the documentation
   (sphinx) $ conda install -c conda-forge sphinx-copybutton # Add a copy button on the code blocks

   (sphinx) $ mkdir website_folder		# Create the website folder
   (sphinx) $ cd website_folder		# Go into the folder
   (sphinx) $ sphinx-quickstart		# Initialize the website

   (sphinx) $ make html
   (sphinx) $ start chrome _build/html/index.html
```

### Website Setup

#### Source Folder

```
source                                          *Root*
├─── _static                                    *Ressource*
│     ├─── main.js
│     ├─── style.css
│     ├─── image.png
│     ├─── favicon.ico
│     └─── logo.svg
├─── _templates                                 *Templates*
│     └─── layout.html
├─── pages                                      *Pages*
├─── conf.py                                    *Config*
└─── index.rst                                  *Main Page*
```

#### Conf File

```
   # Configuration file for the Sphinx documentation builder.

   /* ... */

   # -- Project information -----------------------------------------------------

   project = 'Project-Name'
   copyright = 'Copyright text'
   author = 'Author Name'
   release = '1.0.0'

   /* ... */

   # -- General configuration ---------------------------------------------------

   extensions = ['recommonmark','sphinx_rtd_theme','nbsphinx','sphinx_copybutton']
   templates_path = ['_templates']
   exclude_patterns = []
   html_theme = 'sphinx_rtd_theme'
   pygments_style = 'monokai'

   html_static_path = ['_static']
   html_css_files = ['style.css']
   html_js_files = ['main.js']

   html_title = "Website Title"
   html_short_title = "Title"
   html_logo = "_static/logo.svg"
   html_favicon = "_static/favicon.ico"

   html_show_sourcelink = False
   html_theme_options = {
       'logo_only': True,
       'prev_next_buttons_location': 'both'
   }
```

## Cheat Sheets

### ReStructuredText (.rst)

```rst
   ============================
   Main Title
   ============================

   Sub Title
   ============================

   Sub Sub Title
   ----------------------------

   Sub Sub Sub Title
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   :Title note:

   .. contents:: Table of Contents
   	:local:

   	.. toctree::
   	:maxdepth: 2
   	:caption: Maths Tree

   ``inline code``

   Code example::

   	if (a == b) { /* code */ }

   .. code-block::

   	if (a == b) { /* code */ }

   .. code-block:: c
   	:linenos:
   	:lines: 1, 3-5
       :start-after: 3
       :end-before: 5

   	if (a == b) { /* code */ }

   .. literalinclude:: file.c
   	:language: c
   	:linenos:

   +---------------------+---------+---+
   | 1                   | 2       | 3 |
   +---------------------+---------+---+

   +---------+---------+-----------+
   | 1       | 2       | 3         |
   +=========+=========+===========+
   | 4                 | 5         |
   +---------+---------+-----------+
   | 6       | 7       | 10        |
   +---------+---------+           |
   | 8       | 9       |           |
   +---------+---------+-----------+

   .. csv-table:: a title
      :header: "1", "2", "3"
      :widths: 20, 20, 20

      "4", "5", "6"
      "7", "8", "9"

   .. image:: image.jpg
       :width: 200px
       :align: center
       :height: 100px
       :alt: alternate text

   .. figure:: image.jpg
       :width: 200px
       :align: center
       :height: 100px
       :alt: alternate text
       :figclass: align-center

       Caption text

   	.. todo::
   .. seealso:: Note
   .. note:: Note
   .. warning:: Note
   .. Attention:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. Caution:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. DANGER:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. WARNING:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. Error:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. Hint:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. Important:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. Note:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   .. Tip:: Lorem ipsum dolor sit amet, consectetur adipiscing elit.

   	.. admonition:: Custom Title

   	    Lorem ipsum dolor sit amet, consectetur adipiscing elit.

   	.. topic:: Title

   		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
   	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
   	uis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
   	Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

   	.. sidebar:: Sidebar Title
   	:short: Sidebar short

   		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
   	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
   	uis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
   	Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

   	:download:`download samplet.py <sample.py>`
   :math:`\alpha > \beta`
   .. math::

   	n_{\mathrm{offset}} = \sum_{k=0}^{N-1} s_k n_k
```

### Markdown

```
sphinx-quickstart

pip install pypandoc

import pypandoc output = pypandoc.convert_file(\'file.md\', \'rst\')

with open(\"file.rst\", \"w\", encoding=\"utf-8\") as f:
   f.write(output)
```
