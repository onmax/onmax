---
layout: ../../layouts/BlogPostLayout.astro
title: Nimiq Icons
---

> This post is a continuation of the [Nimiq UI](./nimiq-ui) post. If you haven't read it yet, I recommend you to do so before continuing.

In Nimiq, we decided to create our own icon set to make the interface more consistent and to have a unique style. That's something great.

But the process of using these icons was not as great as the icons themselves. In order to start using a custom icon into a project, you had to go through a lot of steps: copy the icon as SVG, optimize it using [svgomg online tool](https://jakearchibald.github.io/svgomg/), move it to the right folder with an appropriate name, wrap it in its own Vue component, change the colour to `currentColor` and then finally using it in your components.

This process was time consuming and error prone. I had so many problems. For example, many issues with Safari where you need to explicitely set the height, otherwise it won't be shown. I was tired of this and wanted to make something easy to use.

Creating an icon set that is both easy to maintain and use can be challenging. Initially, I was afraid of the complexity of the problem and also by the fact that I didn't find any similar solution that I could use as a reference.

I wanted a solution that is easy to use, quick to develop, and simple to maintain. As I have often heard, _"just start somewhere"_, and so I did.

<!-- So, now I think every one understands the problem and why creating a solution was important (at least for me). -->

## my first attempt

About one year and a half ago, after working 6 months at Nimiq, I tried to solve this problem. At the time, I thought the final product was close to NASA technology and I felt proud. It was a huge accomplishment. But looking back, I can see that I was trying to solve just part of the problem and **the solution was definitely overengineered**.


The idea was to have each icon as a JSON object in its own [file](https://github.com/onmax/nimiq-icons/tree/main/public/icons). Then the [Icons Explorer](https://onmax.github.io/nimiq-icons/) would crawl the folder and display the icons. Easy peasy _icons_ squeezy.

> And yes, as you can see, the design of the [Icons Explorer](https://onmax.github.io/nimiq-icons/) is a copy of [Heroicons](https://heroicons.com/), but as Picasso said: "Good artists borrow, great artists steal".

This is where it gets interesting. Every time I wanted to add a new icon, I had to fill a form with the name and SVG of the icon. I decided to use [GitHub Issue forms](https://github.com/onmax/nimiq-icons/blob/main/.github/ISSUE_TEMPLATE/new-icon.yaml), which allow maintainers to create a form where users can fill in the information they need. 

After opening the issue, a [GitHub Action](https://github.com/onmax/nimiq-icons/blob/main/.github/workflows/new-icon.yaml) would be triggered to optimise the SVG and create a JSON file with the icon. Finally, it will automatically update the [Icons Explorer](https://onmax.github.io/nimiq-icons/) to include the new icon. Throughout the process, the user would be notified of the progress via comments.

To convert the issue form into a structured data format, I created a GitHub Action called [Issue Form parser](https://github.com/onmax/issue-form-parser). This action allows you to convert the issue form into a JSON object that can be used in your workflows.

On top of that, I thought it would be cool to create a search system that allows users to search by different keyword. For example, the [`bed` icon](https://github.com/onmax/nimiq-icons/blob/main/public/icons/icon_bed.ts) has the following keywords: "bed", "sleep", "rest", "bed icon", "sleep icon" and "rest icon". Then, if the user search for "sleep", "rest" or "bed" the icon will appear.

To create a list of keywords automatically, I created yet another GitHub Action: the [Create Completion Action](https://github.com/onmax/oai-createcompletion-githubaction). This Action enables interaction with the Open AI API within your workflow. I integrated in a way, that every time a new icon was submitted, a list of keywords was generated and added to the icon file.

Ironically, this complex search system does not include [fuzzy search](https://en.wikipedia.org/wiki/Approximate_string_matching).

As you might be thinking now, this solution was not very scalable or easy to use. Too many steps where things could go wrong. 


## the new solution

I realised that I was trying to solve the wrong problem. I was only addressing discoverability, but still was hard to use and a pain to develop with. It required many manual steps and was not easy to maintain.

I had to think outside the box. And one day I had an epiphany.

> Designers want to craft new icons. <br />
> Developers want to use them easily.

I just needed to create a workflow that automatically exports the icons from Figma and publish them to `npm`. Easier said than done.

Then, I started to browse in search for answers. I didn't want to reinvent the wheel, I wanted to use something already proven to work. And I am glad I did.

First, I found [_Journey with Icons Continues_](https://antfu.me/posts/journey-with-icons-continues) by [@antfu](https://github.com/antfu). In that blog, it explores how was the process of creating [`unplugin-icons`](https://github.com/unplugin/unplugin-icons). This blog post opened my eyes and it has been a great inspiration for me.

Investigating further, I found that @antfu himself relies on the `@iconify` library. This library was the perfect fit for what I wanted to do. They basically have already created a [specification for icons set](https://iconify.design/docs/types/iconify-json.html#structure).

---

`Iconify` is just a json file with all the icons and their metadata. But, this doesn't mean that the whole JSON file will be part of your final bundle. The library is smart enough to only include the icons on demand. This is great for performance. Apart from that, `Iconify` has a lot of [integrations](https://iconify.design/docs/icon-components) with different libraries like React, Vue, Svelte, Astro, etc. This means that you can use the icons in your project without any extra configuration. Just install the library and you are good to go.

---

I didn't want to reinvent the wheel.

Luckily for me, I found that `Iconify` already had a function for importing from Figma called [`importFromFigma()`](https://iconify.design/docs/libraries/tools/import/figma/). Apparently, someone smart thought about my situation in advance. Thank you!

This function is very easy to use and it does all the heavy lifting for you. You just need to provide the Figma URL and your Figma API key and it will fetch the `Frame` objects you decide and convert them into `Iconify` format.

In my case, I decided that the [Figma file with the icons](https://www.figma.com/file/iyfVJafk18HfrYLXukpf0n/Nimiq-Icons) woudl contain 4 top level `Frames`. One `Frame` for each variant: Normal Icons, Large Icons, Logos and Flags. This way, we can organise a bit better the icons. The top level `Frames` that start with underscore are ignored by the [script](https://github.com/onmax/nimiq-ui/blob/main/packages/nimiq-icons/src/client.ts#L18).


After importing all the variants, I run [THE script](https://github.com/onmax/nimiq-ui/blob/main/packages/nimiq-icons/src/icon.ts). The script goes through all the icons and applies transformations, including cleaning up the icon, optimizing the SVG using `svgo`, and changing the colour to `currentColor` for some of the icons.

Then, custom functions can be executed. In my case, the `spinner` icon is processed by injecting the `animateTransform` attribute to automatically animate it. Similarly, when processing the `logo` variant, a copy of each logo is created to generate the sub-variant `logo-monochrome`, which replaces the logo's colour with 'currentColor' so we can add another colour to it if the design requires it.

Once the script has finished processing the icons, it generates the `Iconify` JSON file and publishes it to `npm` using [`exportJSONPackage`](https://iconify.design/docs/libraries/tools/export/json-package.html).

This whole process has been automated using [GitHub Action](https://github.com/onmax/nimiq-ui/blob/main/.github/workflows/icons.yml). But differently to my first attempt, the Action just run a TypeScript script where all the magic happens. Much easier to maintain, understand and can be easily moved to another CI provider if needed.
 


<!-- TODO Add diagram of the whole process -->
<!-- TODO Add screenshot of the Heroicons -->
