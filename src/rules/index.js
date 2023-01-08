//Правила
import { checkTitleSize } from "./title/checkTitleSize";
import { checkTitleWeight } from "./title/checkTitleWeight";
import { checkTitleMultiplicity } from "./title/checkTitleMultiplicity";
import { checkTitleCount } from "./title/checkTitleCount";
import { checkTitleWidth } from "./title/checkTitleWidth";

import { checkTextSize } from "./text/checkTextSize";
import { checkTextFonts } from "./text/checkTextFonts";
import { checkTextTransform } from "./text/checkTextTransform";
import { checkTextHeight } from "./text/checkTextHeight";
import { checkTextSpacing } from "./text/checkTextSpacing";
import { checkTextWeight } from "./text/checkTextWeight";

export const title = {
  checkTitleSize,
  checkTitleWeight,
  checkTitleMultiplicity,
  checkTitleCount,
  checkTitleWidth,
};

export const text = {
  checkTextTransform,
  checkTextFonts,
  checkTextHeight,
  checkTextSpacing,
  checkTextWeight,
  checkTextSize,
};
