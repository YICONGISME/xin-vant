import { StringValidators as Validators } from '../van-validators/string-validators';

//字符类型校验方法
export class VanStringVerify {
  /**
   * 自定义字符长度校验
   * @param options {
   *          min: 最小字符长度，
   *          max: 最大字符长度，
   *          message: 提示
   *        }
   */
  public static charNumRangeValidate(options: { min: number; max: number; message?: string }) {
    const minLength = options.min;
    const maxLength = options.max;
    return [
      {
        message: minLength === 0 ? `最多输入${maxLength}个字符` : options.message ? options.message : `请输入${minLength}-${maxLength}个字符`,
        ...options,
        validator: (value: any) =>{
          return Validators.validateInputLength( value, {
            min: minLength,
            max: maxLength,
          })
        }
      }

    ]
  }

  /**
   * 自定义字符长度
   * @param args {
   *          min: 最小字符长度，
   *          max: 最大字符长度，
   *          message?: 校验字符长度的自定义报错文案,
   *        }
   */
  public static vTextNum(args: { min: number; max: number; message?: string }) {
    const options = Object.assign({}, args)
    return this.charNumRangeValidate(options);
  }

  //字符校验配置
  public static textNum(min: number, max: number) {
    return {
      min: min,
      max: max
    }
  }

  /**
   * 最多输入10个字符
   * @param args
   */
  public static vText10(args?: any) {
    const options = Object.assign({}, this.textNum(0, 10), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入15个字符
   * @param args
   */
  public static vText15(args?: any) {
    const options = Object.assign({}, this.textNum(0, 15), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入20个字符 ：必填/非必填(默认必填)
   * @param args
   */
  public static vText20(args?: any) {
    const options = Object.assign({}, this.textNum(0, 20), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入25个字符
   * @param args
   */
  public static vText25(args?: any) {
    const options = Object.assign({}, this.textNum(0, 25), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入30个字符
   * @param args
   */
  public static vText30(args?: any) {
    const options = Object.assign({}, this.textNum(0, 30), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入40个字符
   * @param args
   */
  public static vText40(args?: any) {
    const options = Object.assign({}, this.textNum(0, 40), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入50个字符
   * @param args
   */
  public static vText50(args?: any) {
    const options = Object.assign({}, this.textNum(0, 50), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入100个字符
   * @param args
   */
  public static vTextArea100(args?: any) {
    const options = Object.assign({}, this.textNum(0, 100), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入200个字符
   * @param args
   */
  public static vTextArea200(args?: any) {
    const options = Object.assign({}, this.textNum(0, 200), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入300个字符
   * @param args
   */
  public static vTextArea300(args?: any) {
    const options = Object.assign({}, this.textNum(0, 300), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入500个字符
   * @param args
   */
  public static vTextArea500(args?: any) {
    const options = Object.assign({}, this.textNum(0, 500), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入1000个字符
   * @param args
   */
  public static vTextArea1000(args?: any) {
    const options = Object.assign({}, this.textNum(0, 1000), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入3000个字符
   * @param args
   */
  public static vTextArea3000(args?: any) {
    const options = Object.assign({}, this.textNum(0, 3000), args)
    return this.charNumRangeValidate(options);
  }

  /**
   * 最多输入10000个字符
   * @param args
   */
  public static vTextArea10000(args?: any) {
    const options = Object.assign({}, this.textNum(0, 10000), args)
    return this.charNumRangeValidate(options);
  }

}
