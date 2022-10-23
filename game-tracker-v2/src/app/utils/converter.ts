export class Converter {
  static textToNumber(textNumber: string): number {
    return Number.parseFloat(textNumber.replace(',', '.'))
  }
}