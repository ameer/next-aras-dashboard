export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fa-IR').format(num).replaceAll('٫', '.');

}
export function convertBigNumber (number: number, noFraction: boolean | unknown = false, parts: boolean | unknown = false, bigNumbers = [
  { threshold: 1e10, value: 1e9, suffix: 'B', emphasis: '700' },
  { threshold: 1e7, value: 1e6, suffix: 'M', emphasis: '500' },
  { threshold: 1e4, value: 1e3, suffix: 'K', emphasis: '300' }
]): number | string | string[] {
  const absNumber = Math.abs(number)
  let output : number | string | string[] = number
  for (const { value, threshold, suffix, emphasis } of bigNumbers) {
    if (absNumber < 1e6) {
      output = formatNumber(number)
      break
    } else if (absNumber >= threshold) {
      number = number / value
      if (absNumber > 1e15 || noFraction) {
        // Remove fractional part for very big numbers
        number = parseFloat(number.toFixed(0))
      }
      if(parts){
        output = ['\u200E' + formatNumber(number), suffix, emphasis]
      } else {
        output = ('\u200E' + formatNumber(number) + ' ' + suffix).toString()
      }
      break
    } else {
      continue
    }
  }
  return output
}
export function positiveMinusClass (number: number, positiveClass = 'positive', negativeClass = 'negative'): string {
  return number > 0 ? positiveClass : number < 0 ? negativeClass : ''
}