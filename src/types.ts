export type NumberCoordinates = [x: number, y: number];

export type StringCoordinates<
  X extends number = number,
  Y extends number = number
> = `${X}x${Y}`;

export type CropCoordinates<
  TopLeft extends StringCoordinates = StringCoordinates,
  BottomRight extends StringCoordinates = StringCoordinates
> = `${StringCoordinates}:${StringCoordinates}`;

export type FilterArgument = string | number | boolean;
export type FilterArguments = FilterArgument[];
export type Filters = {
  [filterName: string]: FilterArgument | FilterArguments;
};
