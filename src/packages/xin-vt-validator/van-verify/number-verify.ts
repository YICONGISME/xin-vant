//数值类校验方法
import { NumberValidators as Validators} from "../van-validators/number-validators";

export class VanNumberVerify {

  /**
   * 自定义数值范围、小数位数校验(包含两边极值)
   * @param args
   */
  public static vCustomFloatNumRange(args: any) {
    const options = Object.assign({}, args)
    return this.numRangeValidate(options);
  }

  /**
   * 数值范围：0~100，2位小数
   * @param args
   */
  public static vNumRange3TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(0, 100), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：0~1000，2位小数
   * @param args
   */
  public static vNumRange4TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(0, 1000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：0~10000，2位小数
   * @param args
   */
  public static vNumRange5TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(0, 10000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：0~100000，2位小数
   * @param args
   */
  public static vNumRange6TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(0, 100000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：0~1000000，2位小数
   * @param args
   */
  public static vNumRange7TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(0, 1000000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：0~10000000，2位小数
   * @param args
   */
  public static vNumRange8TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(0, 10000000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：0~100000000，2位小数
   * @param args
   */
  public static vNumRange9TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(0, 100000000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：0~1000000000，2位小数
   * @param args
   */
  public static vNumRange10TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(0, 1000000000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：-10000~10000，2位小数
   * @param args
   */
  public static vPositiveNegative5TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(-10000, 10000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：-100000~100000，2位小数
   * @param args
   */
  public static vPositiveNegative6TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(-100000, 100000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：：-1000000~1000000，2位小数
   * @param args
   */
  public static vPositiveNegative7TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(-1000000, 1000000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：-10000000~10000000，2位小数
   * @param args
   */
  public static vPositiveNegative8TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(-10000000, 10000000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：-100000000~100000000，2位小数
   * @param args
   */
  public static vPositiveNegative9TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(-100000000, 100000000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 数值范围：-1000000000~1000000000，2位小数
   * @param args
   */
  public static vPositiveNegative10TwoFloat(args?: any) {
    const options = Object.assign({}, this.numberConfig(1000000000, 1000000000), { bit: 2 }, args)
    return this.numRangeValidate(options)
  }

  /**
   * 自定义数值范围  自定义小数位数
   * @param args {
   *             minVal: 最小值，
   *             maxVal: 最大值，
   *             bit?: 小数位数(如果不传，不校验小数位数)，
   *         }
   */
  public static numRangeValidate(args: { minVal: number; maxVal: number; bit?: number; message?: string;}) {
    const options = Object.assign({}, args);
    const minVal = options.minVal;
    const maxVal = options.maxVal;

    let validates = [
      {
        message: '请输入数字',
        validator: Validators.validateNum
      },
      {
        ...options,
        message: options.message || "范围在" + minVal + "~" + maxVal + "之间",
        validator: (value: any) =>{
          return Validators.validateValueRange( value, {
            min: minVal,
            max: maxVal,
          })
        }
      }
    ]
    if(options.bit){
      validates.push({
        message: `最多输入${options.bit}位小数`,
        validator: (val: any) =>{
          return Validators.validateNumberBits(val, options.bit)
        }
      })
    }
    return validates;
  }

  //数值校验配置
  public static numberConfig(minVal: number, maxVal: number) {
    return {
      minVal: minVal,
      maxVal: maxVal,
    }
  }

  /**
   * 自定义数值范围、小数位数校验(不包含两边极值)
   * @param args {
   *             minVal: 最小值，
   *             maxVal: 最大值，
   *             bit?: 小数位数(如果不传，不校验小数位数)，
   *         }
   */
  public static vCustomFloatValueBetween(args: { minVal: number; maxVal: number; bit?: number; message?: string;}) {
    const options = Object.assign({}, args);
    const minVal = options.minVal;
    const maxVal = options.maxVal;

    let validates = [
      {
        message: '请输入数字',
        validator: Validators.validateNum
      },
      {
        ...options,
        message: options.message || "范围在" + minVal + "~" + maxVal + "之间",
        validator: (value: any) =>{
          return Validators.validateValueIncludeRange( value, {
            min: minVal,
            max: maxVal,
          })
        }
      }
    ]
    if(options.bit){
      validates.push({
        message: `最多输入${options.bit}位小数`,
        validator: (val: any) =>{
          return Validators.validateNumberBits(val, options.bit)
        }
      })
    }
    return validates;
  }

  /**
   * 自定义整数数值范围校验（包含两边极值）
   * @param args
   * minVal: 最小值，
   * maxVal: 最大值，
   */
  public static vNumIntRangeCustom(args: { minVal: number; maxVal: number; message?: string}) {
    const options = Object.assign({}, args);
    const minVal = options.minVal;
    const maxVal = options.maxVal;
    return [
      {
        message: '请输入数字',
        validator: Validators.validateNum
      },
      {
        message: '只能输入整数',
        validator: Validators.validateInteger
      },
      {
        ...options,
        message: options.message || "范围在" + minVal + "~" + maxVal + "之间",
        validator: (value: any) =>{
          return Validators.validateValueRange( value, {
            min: minVal,
            max: maxVal,
          })
        }
      },
    ]
  }


  /**
   * 自定义整数数值范围校验（不包含两边极值）
   * @param args
   * minVal: 最小值，
   * maxVal: 最大值，
   */
  public static vNumIntRangeBetweenCustom(args: { minVal: number; maxVal: number; message?: string}) {
    const options = Object.assign({}, args);
    const minVal = options.minVal;
    const maxVal = options.maxVal;
    return [
      {
        message: '请输入数字',
        validator: Validators.validateNum
      },
      {
        message: '只能输入整数',
        validator: Validators.validateInteger
      },
      {
        ...options,
        message: options.message || "范围在" + minVal + "~" + maxVal + "之间",
        validator: (value: any) =>{
          return Validators.validateValueIncludeRange( value, {
            min: minVal,
            max: maxVal,
          })
        }
      },
    ]
  }

  /**
   * 自定义小数位数校验
   * @param args
   */
  public static vCustomFloat(args: { bit: number; message?: string}) {
    const options = Object.assign({}, args);
    return [
      {
        message: '请输入数字',
        validator: Validators.validateNum
      },
      {
      ...options,
      message: options.message || `最多输入${options.bit}位小数`,
      validator: (val: any) =>{
        return Validators.validateNumberBits(val, options.bit)
      }
    }]
  }

  /**
   * 校验整数（包括正整数、负整数、0）
   * @param args
   */
  public static vInteger(args: { bit: number; message?: string}) {
    const options = Object.assign({}, args);
    return [
      {
        message: '请输入数字',
        validator: Validators.validateNum
      },
      {
        ...options,
        message: options.message || '只能输入整数',
        validator: Validators.validateInteger
      },
    ]
  }


  /**
   * 校验正整数
   * @param args
   */
  public static vPositiveNumber(args?: any) {
    const options = Object.assign({}, args);
    return [
      {
        ...options,
        message: options.message || '请输入正整数',
        validator: Validators.verifyPositiveNumber
      },
    ]
  }

  /**
   * 校验自然数
   * @param args
   */
  public static vNaturalIntegers(args?: any) {
    const options = Object.assign({}, args);
    return [
      {
        ...options,
        message: options.message || '请输入自然数',
        validator: Validators.verifyPositiveNumber
      },
    ]
  }

}
