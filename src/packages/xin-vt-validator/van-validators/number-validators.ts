/**
 * 常用类型和基本信息类校验规则
 */

export class NumberValidators {

  /**
   * 验证是否是数字
   * @param value
   */
  public static validateNum(value: any) {
    if (value == "" || value == undefined) {
      return true;
    }
    return !isNaN(value)
  }

  /**
   * 校验整数 包括正整数，负整数，0）
   * @param value
   */
  public static validateInteger(value: any) {
    if (value === "" || value == null) {
      return true
    }
    return /^(0|[0-9][0-9]*|-[0-9][0-9]*)$/.test(value)
  }

  /**
   * 校验正整数
   * @param value
   */
  public static verifyPositiveNumber( value: any, ) {
    if (value === "" || value == null) {
      return true
    }
    return /^[1-9]\d*$/.test(value)
  }

  /**
   * 校验自然数
   * @param rule
   * @param value
   * @param callback
   */
  public static validateNaturalIntegers(rule: any, value: any, callback: (err?: Error) => void) {
    if (value === "" || value == null) {
      return true
    }
    return /^\d*$/.test(value)
  }

  /**
   * 数值范围大小（非必填、包含两边极值:  min <= value <= max）
   * @param value
   * @param condition
   */
  public static validateValueRange(value: any, condition: any) {
    //考虑到非必填的情况
    if (value === "" || value == null) {
      return true;
    }
    const min = condition.min
    const max = condition.max
    return !(value < min || value > max)
  }

  /**
   * 校验数值范围大小（非必填、不包含两边极值: min < value < max）
   * @param value
   * @param condition
   */
  public static validateValueIncludeRange(value: any, condition: any) {
    //考虑到非必填的情况
    if (value === '' || value == null) {
      return true;
    }
    const min = condition.min;
    const max = condition.max;
    return !(value <= min || value >= max)
  }

  /**
   * 自定义小数位数
   * @param value
   * @param bit
   */
  public static validateNumberBits( value: any, bit= 0) {
    //无值的情况
    if (value === "" || value == null) {
      return true
    }
    const re = `^-?[0-9]+(\.?[0-9]{0,${bit}})?$`
    const reg = new RegExp(re)
    return reg.test(value)
  }

}
