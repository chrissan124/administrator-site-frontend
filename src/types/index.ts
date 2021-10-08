export type GenericObject = {
  [x:string]:any
}

type NonObjectKeysOf<T> = {
  [K in keyof T]: T[K] extends Array<any> ? 
    K : 
    T[K] extends object ? never : K
}[keyof T];

type ValuesOf<T> = T[keyof T];

type ObjectValuesOf<T> = Exclude<
  Extract<ValuesOf<T>, object>, 
  Array<any>
>;

type UnionToIntersection<U> = (U extends any
  ? (k: U) => void
  : never) extends ((k: infer I) => void)
  ? I
  : never;

export type Flatten<T> = Pick<T, NonObjectKeysOf<T>> &
  UnionToIntersection<ObjectValuesOf<T>>;