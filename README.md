# Jake S. Fletcher: Development Portfolio Website

## Description

The purpose of this website is to provide information on my background and status as a developer. This is provided across four web pages:
* A home page containing a brief personal bio and stylised links to the other pages
* A page detailing my skills; which languages and systems I can use
* A page displaying and describing some recent projects
* A contact page

All pages share:
* Header containing a banner title and a drop-down navigation menu to all other pages
* Footer simply bearing the message 'thank you for visiting'. This is purely aesthetic.

Each page is associated with a color theme as described in style-guide.md also found in the root directory of this project.

## Technical description

The four .html files are intuitively named and share names with their corresponding .css and .js files. index.html contains the website's home page. HTML is found in the root directory, while CSS and scripts have dedicated folders in the 'resources' folder, along with all images used.

There are also 'reset' and 'common' CSS documents linked by all pages in this order and before each page's dedicated CSS.
* reset.css contains fairly standard CSS rules resetting default values
* common.css contains styles for the header and footer and background colors for page-themed elements

The website is made to be responsive to screen-size and all pages are tested for desktop and mobile dimensions.

HTML uses semantic notation and other accessibility features, and color schemes also follow guidelines for accessibility. All pages are tested against Chrome devtools' Lighthouse.

## Running and using the project

As this website is intended for public eyes, it should remain hosted for remote access on github pages.

If working on this project, it can, as a website, be run in-browser via any .html file, provided all files are present and relative filepaths preserved.

## Further work

The intention for this project is that it is updated to reflect skills gained in the future; both in the Skills section of the website itself and through changes in the site itself that demonstrate these skills directly. Future, hopefully increasingly impressive, projects will be added to the Projects page.

Ideas include clipart background images appearing on the hope page linkplates on hover and use of projects embedded within the projects page.

## Credits and licensing

All work is by me, Jake S. Fletcher, and is available under MIT license also found in the root directory of the project.