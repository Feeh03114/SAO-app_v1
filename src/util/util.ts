import { Buffer } from "buffer"
export function getUppercaseFirstLetter(texto: string): string {
  return texto && texto?.charAt(0).toUpperCase() + texto?.slice(1)
}

export function EnconderBase64(texto: string): string {
  return Buffer.from(texto).toString('base64')
}

export function DecodificarBase64(texto: string): string {
  return Buffer.from(texto, 'base64').toString('utf-8')
}