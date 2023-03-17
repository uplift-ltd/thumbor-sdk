import {
  CropCoordinates,
  Filters,
  NumberCoordinates,
  StringCoordinates,
} from "./types";

export interface BuildUrlOptions {
  metadata?: boolean;
  trim?: boolean;
  crop?:
    | CropCoordinates
    | [StringCoordinates, StringCoordinates]
    | [NumberCoordinates, NumberCoordinates];
  fitIn?: boolean | "adaptive" | "full";
  width?: number;
  height?: number;
  invertDimensions?: boolean;
  horizontalAlign?: "left" | "center" | "right";
  verticalAlign?: "left" | "center" | "right";
  smartCrop?: boolean;
  filters?: Filters;
}

// https://thumbor.readthedocs.io/en/latest/usage.html
// /hmac/trim/AxB:CxD/(adaptive-)(full-)fit-in/-Ex-F/HALIGN/VALIGN/smart/filters:FILTERNAME(ARGUMENT):FILTERNAME(ARGUMENT)/*IMAGE-URI*

export function buildUrl(url: string, options: BuildUrlOptions) {
  let path = "";

  if (options.metadata) {
    path += "/meta";
  }

  if (options.trim) {
    path += "/trim";
  }

  if (options.crop) {
    if (typeof options.crop === "string") {
      path += `/${options.crop}`;
    } else {
      path += `/${options.crop
        .map((crop) => {
          if (typeof crop === "string") {
            return crop;
          }
          return crop.join("x");
        })
        .join(":")}`;
    }
  }

  if (options.fitIn) {
    let prefix = "";
    if (options.fitIn === "adaptive") {
      prefix = "adaptive-";
    } else if (options.fitIn === "full") {
      prefix = "full-";
    }
    path += `/${prefix}fit-in`;
  }

  const width = options.width || 0;
  const height = options.height || 0;

  if (width || height) {
    path += `/${options.invertDimensions ? "-" : ""}${width}x${height}`;
  }

  if (options.horizontalAlign) {
    path += `/${options.horizontalAlign}`;
  }

  if (options.verticalAlign) {
    path += `/${options.verticalAlign}`;
  }

  if (options.smartCrop) {
    path += `/smart`;
  }

  if (options.filters) {
    path += `/filters:${Object.entries(options.filters)
      .map(
        ([filterName, filterArguments]) =>
          `${filterName}(${
            Array.isArray(filterArguments)
              ? filterArguments.join(",")
              : filterArguments
          })`
      )
      .join(":")}`;
  }

  return path + url;
}
