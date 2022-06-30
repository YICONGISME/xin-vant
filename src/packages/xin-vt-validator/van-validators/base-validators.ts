/**
 * 常用类型和基本信息类校验规则
 */

export class BaseValidators {
  /**
   * 必填验证
   * @param value
   * @param msg
   */
  public static required(value: any) {
    const val = ('' + value).trim();
    return !(val === '' || value == null)
  }

  /**
   * 强校验密码规则：8-32位、大写字母、小写字母、数字
   * @param value
   */
  public static validatePass(value: any ) {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    return reg.test(value)
  }

  /**
   * 国际手机号验证规则
   * @param value
   * @param condition
   * @returns
   */
  public static validateMobile(value: any, condition: any) {
    if (value === "") {
      return true;
    }
    if (!/^1[3-9][0-9]\d{8}$/.test(value)) {
      return
    }
    return true;
  }


  /**
   * 国际手机号验证规则
   * @param value
   * @param condition
   * @returns
   */
  public static validateInternationalMobile(value: any, condition: any) {
    const mobilePre = condition.mobilePre
    const mobile = condition.mobile
    if (mobile === "") {
      return true;
    }

    if (mobilePre === "+86") {
      if (!/^1[3-9][0-9]\d{8}$/.test(mobile)) {
        return false;
      }
    } else {
      return /^\d{7,11}$/.test(mobile)
    }
  }


  /**
   * 校验6位验证码
   * @param value
   * @returns
   */
  public static validateVerifyCode(value: any) {
    return /^\d{6}$/.test(value)
  }

  /**
   * 校验邮箱格式
   * @param value
   * @returns
   */
  public static validateEmail(value: any) {
    let val = ("" + value).trim()
    if (val === "") {
      return true
    }
    if (
      val != "" &&
      !/^[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(val)
    ) {
      return false;
    }
    return true;
  }

  /**
   * 校验身份证号
   * @param value
   */
  public static IdCardVerify(value: any) {
    if (value === "") {
      return true;
    }
    //15位或18位身份证号(生日日期校验不做精确校验，只要是01-31即可)
    if (!/^[1-9]\d{7}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}$|^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}([0-9Xx])$/.test(value)) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 校验生日
   * @param value
   */
  public static birthdayVerify(value: any) {
    if (value === "") {
      return true;
    }
    const month = value.substr(0, 2)
    const day = value.substr(2, 2)
    if (!/(^\d{4}$)/.test(value)) {
      return false;
    } else if (month > 12 || month < 1) {
      return false;
    } else if (day < 1) {
      return false;
    } else if (month === "02" && day > 29) {
      return false;
    } else if (["01", "03", "05", "07", "08", "10", "12"].includes(month) && day > 31) {
      return false;
    } else if(["04", "06", "09", "11"].includes(month) && day > 30) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * 校验银行卡
   * @param value
   */
  public static bankCardVerify(value: any) {
    return /^[0-9a-zA-Z\-\*]+$/.test(value) && value
  }

  /**
   * 校验URL
   * @param value
   */
  public static linkUrlValid(value: any) {
    const reg = new RegExp("^(http|https)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]")
    return !(value && !reg.test(value))
  }


}
