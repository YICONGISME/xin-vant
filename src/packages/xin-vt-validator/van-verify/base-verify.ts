//常用类型和基本信息类校验方法
import { BaseValidators as Validators} from "../van-validators/base-validators";

export class VanBaseVerify {

  /**
   * 输入框校验必填
   * @param args
   */
  public static vRequired(args?: any) {
    const initOptions = {
      required: true,
      message: '不能为空'
    }
    const options = Object.assign({}, initOptions, args);
    return [{
      ...options,
      validator: Validators.required
    }]
  }

  /**
   * 手机号
   * @param args
   */
  public static vMobile(args?: any) {
    const initOptions = {
      message: "请输入正确手机号",
    }
    const options = Object.assign({}, initOptions, args);
    return [{
      ...options,
      validator: Validators.validateMobile
    }];
  }


  /**
   * 国际手机号
   * @param args
   */
  public static vInterMobile(args?: any) {
    const initOptions = {
      message: "请输入正确手机号",
    }
    const options = Object.assign({}, initOptions, args);
    return [{
      ...options,
      validator: (val: any) => {
        return Validators.validateInternationalMobile(val, {
          mobile: options.mobile,
          mobilePre: options.mobilePre,
        })
      }
    }];
  }

  /**
   * 验证码 6位
   * @param args
   */
  public static vVerifyCode(args?: any) {
    const initOptions = {
      message: "验证码格式有误",
    }
    const options = Object.assign({}, initOptions, args);
    return [{
      ...options,
      validator: Validators.validateVerifyCode
    }];
  }


  /**
   * 邮箱
   */
  public static vEmail(args?: any) {
    const initOptions = {
      message: '请输入正规邮箱格式',
    }
    const options = Object.assign({}, initOptions, args);
    return [{
      ...options,
      validator: Validators.validateEmail
    }];
  }


  /**
   * 身份证号
   * @param args
   */
  public static vIdCard(args?: any) {
    const initOptions = {
      message: "身份证号格式错误",
    }
    const options = Object.assign({}, initOptions, args);
    return [{
      ...options,
      validator: Validators.IdCardVerify
    }];
  }

  /**
   * 生日
   * @param args
   */
  public static vBirthday(args?: any) {
    const initOptions = {
      message: "生日不符合规范",
    }
    const options = Object.assign({}, initOptions, args);
    return [{
      ...options,
      validator: Validators.birthdayVerify
    }];
  }

  /**
   * 银行卡
   * @param args
   */
  public static vBankCard(args?: any) {
    const initOptions = {
      message: "只能输入数字、英文、*和-",
    }
    const options = Object.assign({}, initOptions, args);
    return [{
      ...options,
      validator: Validators.bankCardVerify
    }];
  }


  /**
   * url
   * @param args
   */
  public static vLinkUrl(args?: any) {
    const initOptions = {
      message: "必须符合http格式",
    }
    const options = Object.assign({}, initOptions, args);
    return [{
      ...options,
      validator: Validators.linkUrlValid
    }];
  }


  /**
   * 密码（必填）
   * @param args
   */
  public static vPassword(args?: any) {
    const initOptions = {
      message: "密码应由8-32位的大写字母、小写字母和数字组合",
    }
    const options = Object.assign({}, initOptions, args);
    return [{
      ...options,
      validator: Validators.validatePass
    }];
  }



}
