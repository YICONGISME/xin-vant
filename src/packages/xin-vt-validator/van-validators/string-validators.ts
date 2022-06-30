
/**
 * 验证器
 * 字符串相关校验规则
 */

export class StringValidators {

  /**
   * 验证文本输入长度
   * @param value
   * @param condition
   */
  public static validateInputLength(value: any, condition: any) {
    //只能包含' + min + "~" + max + '个字符
    if (value === null) {
      return true;
    }
    const val = ('' + value).trim();
    if (val === '') {
      return true
    }
    const min = condition.min;
    const max = condition.max;
    const len = val.replace(/(^\s*)|(\s*$)/g, "").length;
    return !(len < min || len > max)
  }

}
