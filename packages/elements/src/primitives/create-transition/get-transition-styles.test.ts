/*!
 * Portions of this file are based on code from mantinedev.
 * MIT Licensed, Copyright (c) 2021 Vitaly Rtishchev.
 *
 * Credits to the Mantinedev team:
 * https://github.com/mantinedev/mantine/blob/e88b62a7c97418d8c65ba6ce505469c8c906698a/src/mantine-core/src/Transition/get-transition-styles/get-transition-styles.test.ts
 */

import { createRoot } from "solid-js";

import { DEFAULT_TRANSITIONS } from "./default-transitions";
import { getTransitionStyles } from "./get-transition-styles";

describe("getTransitionStyles", () => {
  it("should return predefined transition with string value", () =>
    createRoot(dispose => {
      expect(
        getTransitionStyles({
          transition: "slide-up",
          phase: "afterEnter",
          duration: 625,
          easing: "ease",
        })
      ).toStrictEqual({
        ...DEFAULT_TRANSITIONS["slide-up"].in,
        ...DEFAULT_TRANSITIONS["slide-up"].common,
        "transition-property": "opacity, transform",
        "transition-duration": "625ms",
        "transition-timing-function": "ease",
      });

      expect(
        getTransitionStyles({
          transition: "slide-up",
          phase: "afterExit",
          duration: 625,
          easing: "ease",
        })
      ).toStrictEqual({
        ...DEFAULT_TRANSITIONS["slide-up"].out,
        ...DEFAULT_TRANSITIONS["slide-up"].common,
        "transition-property": "opacity, transform",
        "transition-duration": "625ms",
        "transition-timing-function": "ease",
      });

      dispose();
    }));

  it("supports custom transitions", () =>
    createRoot(dispose => {
      const customTransition = {
        in: { opacity: 1, "background-color": "red" },
        out: { opacity: 0, "background-color": "sky" },
        common: { color: "green" },
      };

      expect(
        getTransitionStyles({
          transition: customTransition,
          phase: "afterEnter",
          duration: 625,
          easing: "ease",
        })
      ).toStrictEqual({
        ...customTransition.in,
        ...customTransition.common,
        "transition-property": "opacity, background-color",
        "transition-duration": "625ms",
        "transition-timing-function": "ease",
      });

      expect(
        getTransitionStyles({
          transition: customTransition,
          phase: "afterExit",
          duration: 625,
          easing: "ease",
        })
      ).toStrictEqual({
        ...customTransition.out,
        ...customTransition.common,
        "transition-property": "opacity, background-color",
        "transition-duration": "625ms",
        "transition-timing-function": "ease",
      });

      dispose();
    }));
});