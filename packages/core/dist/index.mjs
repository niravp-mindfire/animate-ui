var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/components/fade/index.tsx
import { motion, AnimatePresence } from "framer-motion";

// src/components/fade/variants.ts
var fadeVariants = {
  initial: (props) => ({
    opacity: 0
  }),
  animate: (props) => {
    var _a;
    return {
      opacity: (_a = props.opacity) != null ? _a : 1,
      transition: {
        duration: props.duration,
        delay: props.delay,
        ease: props.easing
      }
    };
  },
  exit: (props) => ({
    opacity: 0,
    transition: {
      duration: props.duration,
      ease: props.easing
    }
  })
};

// src/hooks/use-animation.ts
import { useState, useEffect } from "react";

// src/utils/animation.ts
var easings = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  springLight: [0.34, 1.56, 0.64, 1],
  springMedium: [0.28, 2.1, 0.63, 1],
  springHeavy: [0.2, 2.5, 0.6, 1]
};
var durations = {
  fast: 150,
  normal: 300,
  slow: 450
};
var getDuration = (duration) => {
  if (typeof duration === "number")
    return duration;
  return durations[duration];
};
var getEasing = (easing) => {
  return easings[easing];
};

// src/hooks/use-animation.ts
var useAnimation = ({
  duration = "normal",
  delay = 0,
  easing = "easeOut",
  disabled = false,
  onComplete
} = {}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (disabled)
      return;
    const animationDuration = getDuration(duration);
    const timeoutId = setTimeout(() => {
      setIsAnimating(true);
      const completeTimeoutId = setTimeout(() => {
        setHasAnimated(true);
        onComplete == null ? void 0 : onComplete();
      }, animationDuration);
      return () => clearTimeout(completeTimeoutId);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [disabled, delay, duration, onComplete]);
  return {
    isAnimating,
    hasAnimated,
    duration: getDuration(duration),
    easing: getEasing(easing)
  };
};

// src/components/fade/index.tsx
import { jsx } from "react/jsx-runtime";
var Fade = ({
  children,
  duration = "normal",
  delay = 0,
  easing = "easeOut",
  disabled = false,
  onComplete,
  className,
  opacity = 1
}) => {
  const { isAnimating, hasAnimated } = useAnimation({
    duration,
    delay,
    easing,
    disabled,
    onComplete
  });
  return /* @__PURE__ */ jsx(AnimatePresence, { children: !disabled && /* @__PURE__ */ jsx(
    motion.div,
    {
      className,
      initial: "initial",
      animate: isAnimating ? "animate" : "initial",
      exit: "exit",
      variants: fadeVariants,
      custom: { duration, delay, easing, opacity },
      children
    }
  ) });
};

// src/components/slide/index.tsx
import { motion as motion2, AnimatePresence as AnimatePresence2 } from "framer-motion";

// src/components/slide/variants.ts
var getSlideOffset = (direction, distance) => {
  if (typeof distance === "string")
    return distance;
  switch (direction) {
    case "up":
      return `-${distance}px`;
    case "down":
      return `${distance}px`;
    case "left":
      return `-${distance}px`;
    case "right":
      return `${distance}px`;
    default:
      return 0;
  }
};
var slideVariants = {
  initial: ({ direction, distance = 50 }) => ({
    opacity: 0,
    x: direction === "left" || direction === "right" ? getSlideOffset(direction, distance) : 0,
    y: direction === "up" || direction === "down" ? getSlideOffset(direction, distance) : 0
  }),
  animate: ({ duration = 0.5, delay = 0, easing = "easeOut" }) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: easing
    }
  }),
  exit: ({ direction, distance = 50, duration = 0.5, easing = "easeOut" }) => ({
    opacity: 0,
    x: direction === "left" || direction === "right" ? getSlideOffset(direction, distance) : 0,
    y: direction === "up" || direction === "down" ? getSlideOffset(direction, distance) : 0,
    transition: {
      duration,
      ease: easing
    }
  })
};

// src/components/slide/index.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var Slide = ({
  children,
  duration = 0.5,
  delay = 0,
  easing = "easeOut",
  disabled = false,
  onComplete,
  className,
  direction = "up",
  distance = 50
}) => {
  const { isAnimating, hasAnimated } = useAnimation({
    duration,
    delay,
    easing,
    disabled,
    onComplete
  });
  return /* @__PURE__ */ jsx2(AnimatePresence2, { children: !disabled && /* @__PURE__ */ jsx2(
    motion2.div,
    {
      className,
      initial: "initial",
      animate: isAnimating ? "animate" : "initial",
      exit: "exit",
      variants: slideVariants,
      custom: { duration, delay, easing, direction, distance },
      children
    }
  ) });
};

// src/components/Button/index.tsx
import { Slot } from "@radix-ui/react-slot";
import { motion as motion3 } from "framer-motion";
import clsx from "clsx";
import { jsx as jsx3 } from "react/jsx-runtime";
var buttonVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  },
  scale: {
    hidden: { scale: 0.8 },
    visible: { scale: 1, transition: { duration: 0.3, ease: "easeInOut" } }
  },
  bounce: {
    hidden: { y: -5 },
    visible: { y: 0, transition: { type: "spring", stiffness: 100 } }
  }
};
var Button = (_a) => {
  var _b = _a, {
    asChild = false,
    variant = "primary",
    size = "medium",
    isLoading = false,
    animation = "fade",
    className,
    children
  } = _b, props = __objRest(_b, [
    "asChild",
    "variant",
    "size",
    "isLoading",
    "animation",
    "className",
    "children"
  ]);
  const Component = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx3(
    motion3.div,
    {
      initial: "hidden",
      animate: "visible",
      variants: buttonVariants[animation],
      children: /* @__PURE__ */ jsx3(
        Component,
        __spreadProps(__spreadValues({
          className: clsx(
            "rounded-lg font-medium focus:outline-none focus:ring-2",
            variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
            variant === "secondary" && "bg-gray-600 text-white hover:bg-gray-700",
            variant === "outline" && "border border-gray-400 text-gray-800 hover:bg-gray-100",
            size === "small" && "px-2 py-1 text-sm",
            size === "medium" && "px-4 py-2 text-base",
            size === "large" && "px-6 py-3 text-lg",
            className
          )
        }, props), {
          children: isLoading ? "Loading..." : children
        })
      )
    }
  );
};
export {
  Button,
  Fade,
  Slide
};
