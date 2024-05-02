---
layout: ../../layouts/ContentLayout.astro
title: The Evolution of Nimiq UI
---

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nimiq-css@latest/dist/css/colors.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nimiq-css@latest/dist/css/utilities.css">

When I started building the [Nimiq Developer Center](https://nimiq.com/developers), I realised that I was building the same components over and over again. I was building the same links as in the [Nimiq Website](https://nimiq.com), using the same colours as in the [Crypto Map](https://map.nimiq.com), and using the same icons as in every other application on Nimiq. I had had enough. I wanted to build a library that would help me build interfaces faster and more consistently.

This was not a new problem, I had tried to solve it in the past. I created the [Nimiq TailwindCSS Theme](https://onmax.github.io/tailwindcss-nimiq/), but it was not enough. I was building the house from the roof up. So I took a step back and started building the foundation.

## The new Nimiq CSS library

At the moment we don't have a design system for Nimiq, but we have a lot of applications and websites that use the same design rules. So I decided that someone had to lay the first brick and started to build the Nimiq UI library. Hopefully this will lay the foundation for a future design system at Nimiq.

However, I didn't want to start from scratch. I wanted to learn from our current [Nimiq CSS Framework](https://nimiq.github.io/nimiq-style/) as a starting point. This library was created at the very beginning of Nimiq, and is mainly focused on the [Nimiq Wallet](https://wallet.nimiq.com) interface. Since then, the [Nimiq Apps](https://nimiq.com/apps) have evolved to create a more versatile and modern interface and it no longer meets the needs of the current Nimiq apps.

<!-- With that in mind, I was thinking about why we don't use this library anymore. I think the main reason is that it was primarily designed for Nimiq Wallet components, and using it in other projects was a bit cumbersome because it lacks of flexibility and it forces to use some components that are not needed in other projects. -->

> The core principles of the library are simplicity and [composability](https://en.wikipedia.org/wiki/Composability).

I wanted to make it stupidly simple. A class should only do one thing. The key here is that you get the power from combining classes.

This is the same philosophy that [Tailwind CSS](https://tailwindcss.com/) and [Vue](https://vuejs.org/) follow, and I love it. It allows developers to build complex interfaces with simple building blocks.

Let's look at an example of what I mean. Let's start with an ordinary pill:

<figure class="flex flex-col gap-2 items-center my-8">
  <button class="pill-tertiary pill-sm opacity-70">Button</button>
  <figcaption>A button with the classes <code>pill-tertiary</code> and <code>pill-sm</code>.</figcaption>
</figure>

As you can see, the `pill-tertiary` class just adds the minimal styles to make it look like a pill. We also added the `pill-sm` class to reduce the `padding` and `font-size`, but you are not limited to the defaults provided by the library. You can override them by adding your own styles.

Now let's have a look at this other component:

<figure class="flex flex-col gap-2 items-center my-8">
  
  <div class="relative">
    <span aria-hidden class="absolute -top-2.5 -left-8 text-gray-800 font-bold whitespace-nowrap text-[10px] tracking-wider uppercase pointer-events-none -rotate-[25deg] skew-y-12">Hover me</span>
    <div class="flex gap-8 opacity-70">
      <a href="#" class="arrow raw">Internal Link</a>
      <a href="https://nimiq.com" class="arrow raw">Visit nimiq.com</a>
    </div>
  </div>

  <figcaption>Two link elements with the class <code>arrow</code>.</figcaption>
</figure>

At this point you might be thinking that this is just a link with an arrow on it. And you would be right. This is the essence of the library: Simplicity.

But under the hood, I use a few little tricks to make this component simple and powerful:

1. I use the `arrow` class for both elements and automatically change the orientation of the arrow depending on the `href` attribute.
2. I use the `::after` pseudo-element to add the arrow icon as a background image with a mask. 
<!-- I will give you more details on this in the [later section](#nimiq-icons-library). -->

As you can see, these components are simple in themselves. They only focus on one thing, but the great thing about composability is that we can combine these little utilities to make something more complex:

<figure class="flex flex-col gap-2 items-center my-8">
  <div class="flex gap-2 opacity-70">
    <a href="https://nimiq.com" class="pill-tertiary pill-sm arrow raw">Visit nimiq.com</a>
  </div>

  <figcaption>A link combining <code>arrow</code> and <code>pill</code> classes.</figcaption>
</figure>

Wait, wait, wait. Did you see that? Let's try something else:

<figure class="flex flex-col gap-2 items-center my-8">
  <div class="flex gap-2">
    <button class="pill-secondary loading raw" disabled>Loading</button>
  </div>

  <figcaption>A button combining <code>loading</code> and <code>pill</code> classes.</figcaption>
</figure>

This is the power of composability.
 
---

**This library is not yet ready for production use**. We don't even have proper documentation for it, although we do have a [demo](https://onmax.github.io/nimiq-ui/) where you can see all the components and utilities that are included in the library. I plan to release it soon, but as the saying goes, _"eat your own dog food"_, and therefore I want to continue testing this library in the [Nimiq Developer Center](https://nimiq.com) and the [Crypto Map](https://map.nimiq.com) to see how it works in a real project. You can track my progress in [this PR](https://github.com/nimiq/crypto-map/pull/8).

Nonetheless, if you are curious you can start using this library in your project by installing it from npm:

```bash
npm install nimiq-css # The library might be renamed in the future
```

And then import it into your CSS file:

```css
@import 'nimiq-css/css/index.css';

/* Same as */
@import url('colors.css') layer(nq-colors);
@import url('preflight.css') layer(nq-preflight);
@import url('typography.css') layer(nq-typography);
@import url('utilities.css') layer(nq-utilities);
```

> I strongly encourage the use of [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to avoid specificity issues and make the library more flexible.

The library is divided into four parts, each with its own [CSS layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to avoid specificity issues.

1. Preflight: Sets a basic Nimiq style. This is not a reset, but a set of basic styles to add the feel of Nimiq. I leave it up to the developer to decide if they want to use a reset library, which I highly recommend anyway.
2. Colours: Provides a vivid Nimiq colour palette, with support for light and dark modes through custom CSS properties and the `dark` class.
3. Utilities: Provides utility classes for creating UI elements such as buttons, input and links, as we saw earlier.
4. Typography: A set of typographic utilities to improve text styling. The CSS structure is heavily inspired by the [Tailwind Typography Plugin](https://github.com/tailwindlabs/tailwindcss-typography). Adding a `prose` class to a container will automatically style the text inside it.

A fun little easter egg is that Chat GPT made me a story with different typography elements to help me build the typography section of the library. You can go to the [demo](https://onmax.github.io/nimiq-ui/), click in "Typography", and read the interesting story.

If you want to know more about the library, you can check the [GitHub repository](https://github.com/onmax/nimiq-ui/tree/main/packages/nimiq-css). Any feedback is welcome.


> I also wrote about my adventure in building the [Nimiq Icons](/onmax/posts/nimiq-icons) library, which is a continuation of this post. I suggest you read it to get the full picture.

Happy coding!
