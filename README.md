# PostCSS plugin to scale values

In design it is often useful to relate one set of values to another. For example the viewport width to font size, or container width to line-height. We can do this using the CSS `calc` function, but scaling from one range of values to another is often cumbersome and error-prone to write manually. With a bit of PostCSS magic we can let the computer do this for us.

For example, let's say you want to vary the font size of your header based on the min and max width of the current breakpoint. Your break point is between `20em` and `50em` and you'd like to vary the header size between `2em` end `4em`. The following (Post)CSS will do that for you:

```css
article h1 {
  font-size: 2em;
}

@media (min-width: 20em) {
  article h1 {
    font-size: scale(20em, 50em, 2em, 4em, 100vw);
  }
}

@media (min-width: 50em) {
  article h1 {
    font-size: 4em;    
  }
}
```

The `scale` function takes five values:

  * min base (defines the lower limit of the base range)
  * max base (defines the upper limit of the base range)
  * min target (defines the lower limit of the target range)
  * max target (defines the upper limit of the target range)
  * input (expression)

```css
scale(minBase, maxBase, minTarget, maxTarget, expression)
```

The input value mapped from the base range to the target range can be any expression. Note that the output values are not clamped so they can be outside the target range (this is why we're using media queries to "clamp" the values at the lower and upper limit of the target range).

## Installation

Install through npm:

```bash
npm install postcss-scale
```

Then include `postcss-scale` in your PostCSS plugins list.

## Credits

Thanks to Tim Brown ([@nicewebtype](https://twitter.com/nicewebtype)) for getting the discussion going on scales and [CSS locks](http://blog.typekit.com/2016/08/17/flexible-typography-with-css-locks/) going.
