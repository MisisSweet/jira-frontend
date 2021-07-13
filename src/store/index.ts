
type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type ActionsTypes<
T extends {[key: string]:(...args: never[])=>unknown}
>=ReturnType<PropertiesTypes<T>>;
