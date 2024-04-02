
<!-- ## how does it work

I recommend you to read the article [The Gooey Effect](https://css-tricks.com/gooey-effect/) by Lucas Bebber to understand how the effect works. I will skip most of the details and focus on the implementation for the carousel.

First we need to create the indicators for the carousel. We will use the following html template: `ul>li*4>button`. We can add some CSS spices to make it look better and voila!

<ul class="h-3 flex gap-0.5 justify-center mt-4">
  <li class="inline-block aspect-square h-full rounded-full bg-gray-600 mx-1" />
  <li class="inline-block aspect-square h-full rounded-full bg-gray-600 mx-1" />
  <li class="inline-block aspect-square h-full rounded-full bg-gray-600 mx-1" />
  <li class="inline-block aspect-square h-full rounded-full bg-gray-600 mx-1" />
</ul>

<style>
@keyframes rect-anim-right{
  0%{
    transform:translateX(0px);
  }
  100%{
    transform:translateX(40px);
  }
}
.rect:last-child{
  animation:rect-anim-right ease-out 1s infinite alternate;
}
  </style> -->

<!-- <div class="relative h-6">
<div class="group group-new absolute inset-0 flex items-center" style="filter: url('#fancy-goo')">
  <div class="h-[21px] aspect-square bg-gray-600 rounded-full"></div>
  <div class="h-full aspect-square rect absolute top-0 rounded-full bg-gray-600"></div>
</div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="absolute inset-0 w-full h-full">
  <defs>
    <filter id="fancy-goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -8" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
    </filter>
  </defs>
</svg>
</div> -->

A carousel with a gooey effect on the indicators. 

## Carousel

The carousel is built using CSS snap points. I had to write some JavaScript to handle the interactions.

## Indicators

The indicators use scrolling animations to create a parallax effect. The indicators start on the right and move to the left as you move around the carousel.

## Gooey effect

On top of the indicators I place a fixed div with the same background. The div is always on top of the active indicator.

Another SVG is placed on top of the indicators. The SVG contains the blur and colour matrix filters that will be applied to the elements below.

When the indicator moves, the fixed div stays in the same place. The SVG filters are applied to the fixed div to create the gooey effect.

## References

You can learn more about this effect by reading the articles I used as reference:

- [The Gooey Effect](https://css-tricks.com/gooey-effect/) by Lucas Bebber
- [Scroll Progress Animations in CSS](https://developer.mozilla.org/en-US/blog/scroll-progress-animations-in-css/) by Michelle Barker
