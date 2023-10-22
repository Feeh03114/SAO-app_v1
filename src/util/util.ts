import { Buffer } from "buffer";

export function getUppercaseFirstLetter(texto: string): string {
  return texto && texto?.charAt(0).toUpperCase() + texto?.slice(1)
}

export function EnconderBase64(texto: string): string {
  return Buffer.from(texto).toString('base64')
}

export function DecodificarBase64(texto: string): string {
  return Buffer.from(texto, 'base64').toString('utf-8')
}

export function isEqualObj(objA: any, objB: any): boolean {
  let equal = false;
  Object.keys(objA).forEach((key) => 
    equal = objA[key] === objB[key]
  );
  return equal;
}  

export function isEqualArray(arrayA: any[], arrayB: any[]): boolean {
  const equal = arrayA.map((item, index) => isEqualObj(item, arrayB[index]));
  return equal.filter((item) => !item).length === 0;
}