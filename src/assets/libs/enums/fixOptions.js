/**
 * 页面固定枚举值
 */
import { ParamName } from '../service/serviceParam'
import { nationOption, taxNationOption, taxBirthNationality } from '../../../assets/libs/enums/nationality'
import Vue from 'vue'

export function getLabelViaVal(options, val) {
  options = Array.isArray(options) ? options : options.options
  const selectOptions = options.filter(op => {
    if (op.value === val) return op
  })
  return selectOptions[0].label
}
// 用法：遍历后台报文对象，第一个参数为报文key值，第二个参数为报文val，调用
// 该方法后，将返回值赋给报文val
export function searchLabel(key, val) {
  let label = ''
  for (const k in Options) {
    if (k === key) {
      Options[k].options.forEach(ele => {
        if (ele.value === val) {
          label = ele.label
        }
      })
    }
  }
  return label
}

// 根据param名查找对应的Options。第一个匹配的ParamName
export function getOptions(paramName) {
  const rkey = Object.keys(Options).filter((key) => {
    if (Options[key].name === paramName) return key
  })
  if (rkey === null || rkey.length === 0) {
    console.log(`入参名${paramName}`, '查找入参对应的Options失败')
  } else {
    return Options[rkey[0]].options
  }
}

// 查找options的值
export function getAllOptionValues(paramName) {
  return getOptions(paramName).map((item) => { return item.value })
}

// 获取默认值选项
export function getDefaultOption(paramName, param) {
  const ops = getOptions(paramName)
  if (ops && (ops.length !== 0)) {
    const rets = ops.filter((op) => {
      if (param) {
        const { label: labelval, value: val, name: nameVal } = param
        if ((labelval && op.label == labelval) || (val && op.value == val) || (nameVal && op.name == nameVal)) { return op }
      }
      return op[0]
    })
    if (!rets || rets.length === 0) {
      console.log(`获取入参${paramName}`, '没有指定条件，将返回第一项作为默认值')
      return ops[0]
    } else {
      return rets[0]
    }
  } else {
    console.log(`入参名${paramName}`, '查找入参对应的默认值失败')
    return {}
  }
}

// 获取默认值的属性
export function getDefaultOptionAttr(paramName, param, attr) {
  const option = getDefaultOption(paramName, param)
  if (Object.keys(option).length === 0) {
    return ''
  } else {
    return option[attr]
  }
}

// 获取默认值的取值
export function getDefaultOptionValue(paramName, param) {
  return getDefaultOptionAttr(paramName, param, 'value')
}
// 获取默认值的标签
export function getDefaultOptionLabel(paramName, param) {
  return getDefaultOptionAttr(paramName, param, 'label')
}

// 获取默认值的name
export function getDefaultOptionName(paramName, param) {
  return getDefaultOptionAttr(paramName, param, 'name')
}

// 根据name获取label --利益演示 保障/红利类
export function getLabelByName(ParamKey) {
  if (Object.keys(Options).indexOf(ParamKey) > -1) {
    return Options[ParamKey].label
  } else {
    console.log(`入参字段名${ParamKey}`, '查找入参对应的默认值失败')
  }
}

// 抄录时间间隔
export const time = 1500

export const joblistHeight = document.documentElement.clientHeight || document.body.clientHeight

// 是否选项
const YN_Option = [
  { label: '是', value: 'Y' },
  { label: '否', value: 'N' }
]

// 人员关系类型
const Relation_All_Option = [
  { label: '本人', value: '1' },
  { label: '配偶', value: '15' },
  { label: '父母', value: '17' },
  { label: '子女', value: '18' },
  { label: '（养）父母', value: '19' },
  { label: '（养）子女', value: '22' },
  { label: '（外）祖父母', value: '20' },
  { label: '（外）孙子女', value: '21' },
  { label: '同事', value: '23' },
  { label: '朋友', value: '24' },
  { label: '其他', value: '98' }
]

// 人员关系类型（父母）
// { label: '父母', value: '17' },
// { label: '养父母', value: '19' },
// { label: '其他', value: '98' }，
const Relation_Parent_Option = [
  { label: '父亲', value: '1' },
  { label: '母亲', value: '2' }
]
// 人员关系类型
const Relation_Custom_Option = [
  { label: '同事', value: '23' },
  { label: '朋友', value: '24' },
  { label: '配偶', value: '15' },
  { label: '父母', value: '17' },
  { label: '子女', value: '18' },
  { label: '其他亲属', value: '98' }
]
const nationality = { ...nationOption() }
const taxNationality = { ...taxNationOption() }
const taxbirthNationality = { ...taxBirthNationality() }

export const Options = {

  // ===============================  通用信息 ===============================

  // 渠道。产品与营销员都是这个
  channel: {
    name: ParamName.Common.ChannelType,
    label: '销售渠道',
    options: [
      { label: '个险', value: 'FC' },
      { label: '多元', value: 'AD' },
      { label: '续期', value: 'RP' },
      { label: '银保', value: 'BK' },
      { label: '团险', value: 'GP' },
      { label: '通用', value: 'CU' }
    ]
  },
  // 区域选择
  district_type: {
    name: ParamName.Common.District_Type,
    label: '区域选择',
    options: [
      { label: '超A类地区', value: 'SA' },
      { label: 'A类地区', value: 'A' },
      { label: 'B类地区', value: 'B' },
      { label: 'C类地区', value: 'C' }
    ]
  },
  // 所属地区。产品工厂的Rule使用。
  district: {
    name: ParamName.Common.District,
    label: '所属地区',
    options: [
      { label: '通用', value: 'CO' }
    ]
  },
  // 机构ID
  organ_Id: {
    name: ParamName.Common.OrganId,
    label: '机构ID',
    options: [
      { label: 'XX机构', value: '1120000' }
    ]
  },
  // Job 类型
  job: {
    name: ParamName.Common.JobType,
    options: [
      { label: '个险', value: '01', name: 'normal' },
      { label: '团险', value: '02', name: 'group' }
    ]
  },

  // ===============================  人员信息 ===============================

  // 证件类型
  id_type: {
    name: ParamName.Person.IdType,
    label: '证件类型',
    options: [
      { label: '身份证', value: '0' },
      { label: '护照', value: '2' },
      { label: '军官证', value: '3' },
      // { label: '出生证', value: '4' },
      // { label: '户口本', value: '5' },
      { label: '士兵证', value: '4' },
      { label: '港澳居民往来内地通行证', value: '5' },
      { label: '台湾居民来往大陆通行证', value: '6' }
    ]
  },

  // 性别
  sex: {
    name: ParamName.Person.Sex,
    label: '性别',
    options: [
      { label: '男', value: 'M' },
      { label: '女', value: 'F' }
    ]
  },

  // 纳税地
  taxarea_source: {
    name: ParamName.Person.Tax.TaxArea,
    label: '纳税地',
    options: [
      { label: '江苏工业园区', value: '320500' }
    ]
  },

  /* gender: {
    name: ParamName.Person.Gender,
    label: '性别',
    options: [
      { label: '男', value: '0' },
      { label: '女', value: '1' }
    ]
  },*/
  // 收入 来源
  income_source: {
    name: ParamName.Eleinsure.IncomeSource,
    label: '收入来源',
    options: [
      { label: '工薪', value: '1' },
      { label: '个体', value: '2' },
      { label: '私营', value: '3' },
      { label: '房屋出租', value: '4' },
      { label: '证券投资', value: '5' },
      { label: '银行利息', value: '6' },
      { label: '其他', value: '7' }
    ]
  },
  // 通讯地址
  address_type: {
    name: ParamName.Common.AddressType,
    label: '通讯地址',
    options: [
      { label: '单位/学校地址', value: '01' },
      { label: '家庭地址', value: '02' },
      { label: '通讯地址', value: '03' },
      { label: '税收居民现居地址', value: '04' },
      { label: '税收居民出生地址', value: '05' }
    ]
  },
  // 婚姻状态
  marital_state: {
    name: ParamName.Person.MaritalState,
    label: '婚姻状况',
    options: [
      { label: '未婚', value: '1' },
      { label: '已婚', value: '2' },
      { label: '离异', value: '3' },
      { label: '丧偶', value: '4' }
    ]
  },
  // 学历
  education: {
    name: ParamName.Person.Education,
    label: '学历',
    options: [
      { label: '本科', value: '7' },
      { label: '大专', value: '6' },
      { label: '高中', value: '4' },
      { label: '初中', value: '3' },
      { label: '中专', value: '5' },
      { label: '小学', value: '2' },
      { label: '小学以下（含学龄前儿童）', value: '1' },
      { label: '博士及以上', value: '9' },
      { label: '硕士', value: '8' }
    ]
  },
  // 个人 税收居民身份声明
  is_china_tax: {
    name: ParamName.Eleinsure.IsChinaTax,
    label: '个人税收居民身份声明',
    options: [
      { label: '仅为中国税收居民', value: '1' },
      { label: '仅为非居民', value: '2' },
      { label: '既是中国税收居民又是其他国家（地区）税收居民', value: '3' }
    ]
  },
  // 无纳税识别号原因
  no_tax_mode: {
    name: ParamName.Person.Tax.NoRegisterReason,
    label: '若无法提供纳税人识别号，请选择原因：',
    options: [
      { label: '原因A：居民国不发纳税人识别信息', value: 'A' },
      { label: '原因B：账户持有人未取得纳税人识别号（若选择此原因，请解释未能取得纳税人识别号的具体原因）', value: 'B' }
    ]
  },
  contract_type: {
    name: ParamName.Person.Contract.Type,
    label: '联系方式',
    options: [
      { label: '手机', value: 'MB' },
      { label: '固定电话', value: 'TE' },
      { label: 'QQ', value: 'QQ' },
      { label: '邮件', value: 'Mail' },
      { label: '微信', value: 'WeChat' }
    ]
  },
  // 寄送方式
  delivery_mode: {
    name: ParamName.Person.Contract.DeliveryMode,
    label: '寄送方式',
    options: [
      { label: '电子信函', value: 'EM' },
      { label: '纸质信函', value: 'PL' }
    ]
  },
  // 监护人与被保险人关系
  guardianship_type: {
    name: ParamName.Insured.GuardianshipType,
    label: '监护人与被保险人关系',
    options: Relation_Parent_Option
  },
  // 人员关系类型
  affiliated_type: {
    name: ParamName.Person.RelationType,
    label: '人员关系类型',
    options: Relation_All_Option
  },
  // 客户管理的人员关系类型
  famliy_type: {
    name: ParamName.Person.FamilyType,
    label: '关系',
    options: Relation_Custom_Option
  },
  // 影像信息相关（附件管理）
  // 影像类型
  image_type: {
    name: ParamName.Eleinsure.ImageList.ImageType,
    label: '影像类型',
    options: [
      { label: '身份证', value: '01' },
      { label: '银行卡', value: '02' },
      { label: '非身份证件', value: '03' },
      { label: '生存金银行卡', value: 'S_02' },
      { label: '工作证明', value: 'job_prove' },
      { label: '风险评估报告', value: 'exposure_rating' },
      { label: '儿保手册', value: 'CHILDREN' },
      { label: '投保人人脸影像', value: '14' },
      { label: '被保人人脸影像', value: '100BR' },
      { label: '投保申请书投保人签字图片', value: 'ES_01' },
      { label: '投保申请书被保人签字图片', value: 'ES_02' },
      { label: '投保申请书监护人签字图片', value: 'ES_03' },
      { label: '投保申请书销售人员签字图片', value: 'ES_04' },
      { label: '销售人员确认书投保人签字图片', value: 'ES_11' },
      { label: '销售人员确认书销售人员签字图片', value: 'ES_12' },
      { label: '免责条款投保人签字图片', value: 'ES_21' },
      { label: '免责条款销售人员签字图片', value: 'ES_22' },
      { label: '投保人抄录图片', value: 'COPY' },
      { label: '原始投保申请书PDF', value: 'src_pdf' },
      { label: '加签投保申请书PDF', value: 'ca_pdf' },
      { label: '原始销售人员确认书PDF', value: 'confirmation_src_pdf' },
      { label: '加签销售人员确认书PDF', value: 'confirmation_ca_pdf' },
      { label: '原始免责条款PDF', value: 'disclaimer_src_pdf' },
      { label: '加签免责条款PDF', value: 'disclaimer_ca_pdf' },
      { label: '建议书PDF', value: 'propose_pdf' },
      { label: '健康资料', value: 'HEALTH' },
      { label: '其他辅助资料', value: 'OTHER' },
      // 税优专有项目
      { label: '6个月内体检报告', value: 'physical_exam' },
      { label: '基本医疗保险参保证明', value: 'basic_insured' },
      { label: '近一年个人所得税完税证明', value: 'recent_tax' },
      { label: '团体补充医疗保险参保证明', value: 'group_insured' }
    ]
  },
  party_type: {
    name: ParamName.Eleinsure.ImageList.PartyType,
    label: '人员类型',
    options: [
      { label: '投保人', value: 'TBR' },
      { label: '被保人', value: 'BBR' },
      { label: '受益人', value: 'SYR' },
      { label: '监护人', value: 'JHR' }
    ]
  },
  apply_mode: {
    name: ParamName.Applicant.ApplyMode,
    label: '投保方式',
    options: [
      { label: '个人', value: '02' },
      { label: '家庭单', value: '03' },
      { label: '团体', value: '04' }
    ]
  },
  // 用户类型
  team: {
    name: ParamName.Agent.Team,
    label: '用户类型',
    options: [
      { label: '总部', value: 'HO' }
    ]
  },
  // 内外勤类型
  acctype: {
    name: ParamName.Agent.Acctype,
    label: '内外勤类型',
    options: [
      { label: '个险外勤', value: 'AGENT' },
      { label: '个险入司外勤', value: 'PRAGT' },
      { label: 'hasl内勤', value: 'ADS' },
      { label: 'BK外勤', value: 'BK' },
      { label: 'RP外勤', value: 'RP' },
      { label: 'AD经代内勤', value: 'ADEP' },
      { label: 'AD经代外勤', value: 'ADAGT' },
      { label: 'GP外勤', value: 'GPAGENT' }
    ]
  },
  // ===============================  产品/险种/保费计算相关 ===============================

  // ========== 产品 ==========

  // 产品分类
  product_classify: {
    name: ParamName.Product.Classify,
    options: [
      { label: '税延', value: 'tax_ext', name: 'tax_ext' },
      { label: '税优', value: 'tax_exc', name: 'tax_exc' },
      { label: '普通', value: 'lib_pro', name: 'lib_pro' }
    ]
  },

  // 产品对应核心类型
  insured_core_type: {
    name: ParamName.Product.InsuredCoreType,
    options: [
      { label: '个险', value: 'single', name: 'single' },
      { label: '团险', value: 'group', name: 'group' }
    ]
  },

  // ========== 险种 ==========

  /* 是否可选，0不可选；1可选*/
  is_chooseable: {
    name: ParamName.Risk.Base.Enable,
    label: '是否可选',
    options: [
      { label: '不可选', value: '0' },
      { label: '可选', value: '1' }
    ]
  },

  risk_relation_recommend: {
    name: ParamName.Risk.Relation.Recommend,
    label: '是否推荐',
    options: YN_Option
  },

  risk_relation_reqired: {
    name: ParamName.Risk.Relation.Required,
    label: '是否必选',
    options: YN_Option
  },

  risk_relation_typ: {
    name: ParamName.Risk.Relation.Required,
    label: '是否必选',
    options: [
      { label: '附加险关系类型', value: 'ADDED' },
      { label: '豁免险关系类型', value: 'EXEMPT' }
    ]
  },

  risk_type: {
    name: ParamName.Risk.Base.Type,
    label: '险种类型',
    options: [
      { label: '分红', value: 'FH' },
      { label: '万能', value: 'WN' },
      { label: '投连', value: 'TL' }
    ]
  },

  // 查询可搭副险必搭副险
  risk_flag: {
    name: ParamName.Risk.Base.Flag,
    label: '查询险种是否必搭',
    options: [
      { label: '必搭', value: '1' },
      { label: '非必搭', value: '2' }
    ]
  },

  // 是否是主险（险种类型） // TODO 字体图标地址（陈陪陪）
  is_main_risk: {
    name: ParamName.Risk.Props.IsMainRisk,
    label: '险种类型',
    options: [
      { label: '主', value: 'M', icon: '' },
      { label: '附', value: 'A', icon: '' },
      { label: '豁', value: 'W', icon: '' }
    ]
  },

  calc_mode: {
    name: ParamName.Premium.CalcMode,
    label: '保费计算方式',
    options: [
      { label: '保额算保费', value: '1' },
      { label: '保费算保额', value: '2' },
      { label: '其他', value: '3' }
    ]
  },

  /* single_product_slip: {
    name: ParamName.Product.IsSingleApplicate,
    label: '只能单个投保的产品编码',
    options: [
      { label: '长期重疾', value: '1ejPPj2u' },
      { label: '税延C', value: 'SYC' }
    ]
  },*/

  risk_core_type: {
    name: ParamName.Risk.Props.CoreType,
    label: '险种的核心类型',
    options: [
      { label: '团险', value: 'group' },
      { label: '个险', value: 'single' }
    ]
  },
  // 产品保障类信息（利益演示用）
  ensured_ill: {
    name: ParamName.Product.Ensured.Ill,
    label: '重大疾病',
    option: []
  },
  ensured_hospital: {
    name: ParamName.Product.Ensured.Hospital,
    label: '医疗',
    option: []
  },
  ensured_accident: {
    name: ParamName.Product.Ensured.Accident,
    label: '意外',
    option: []
  },
  ensured_education: {
    name: ParamName.Product.Ensured.Education,
    label: '教育金',
    option: []
  },
  ensured_life: {
    name: ParamName.Product.Ensured.Life,
    label: '寿险',
    option: []
  },
  ensured_retire: {
    name: ParamName.Product.Ensured.Retire,
    label: '养老金',
    option: []
  },
  ensured_survive: {
    name: ParamName.Product.Ensured.Survive,
    label: '生存金',
    option: []
  },
  ensured_expire: {
    name: ParamName.Product.Ensured.Expire,
    label: '满期金',
    option: []
  },
  ensured_mildCase: {
    name: ParamName.Product.Ensured.MildCase,
    label: '轻症疾病',
    option: []
  },
  'ensured_cancer specific drugs': {
    name: ParamName.Product.Ensured.cancerSpecificDrugs,
    label: '恶性肿瘤特定药品医疗',
    option: []
  },
  ensured_specificill: {
    name: ParamName.Product.Ensured.Specificill,
    label: '特定重大疾病',
    option: []
  },
  ensured_target: {
    name: ParamName.Product.Ensured.Target,
    label: '靶向药物医疗',
    option: []
  },
  ensured_child: {
    name: ParamName.Product.Ensured.Child,
    label: '少儿特定疾病',
    option: []
  },
  ensured_Seeingtooth: {
    name: ParamName.Product.Ensured.Seeing_tooth,
    label: '视力/牙齿',
    option: []
  },
  ensured_situ: {
    name: ParamName.Product.Ensured.Situ,
    label: '原位癌疾病',
    option: []
  },
  ensured_consultation: {
    name: ParamName.Product.Ensured.Consultation,
    label: '会诊医疗',
    option: []
  },
  ensured_exempte: {
    name: ParamName.Product.Ensured.Exempte,
    label: '豁免',
    option: []
  },
  ensured_woman: {
    name: ParamName.Product.Ensured.Woman,
    label: '女性特定疾病',
    option: []
  },
  ensured_breath: {
    name: ParamName.Product.Ensured.Breath,
    label: '呼吸系统疾病',
    option: []
  },
  ensured_Therioma: {
    name: ParamName.Product.Ensured.Therioma,
    label: '恶性肿瘤',
    option: []
  },
  ensured_man: {
    name: ParamName.Product.Ensured.Man,
    label: '男/女性特定疾病',
    option: []
  },
  ensured_ptdi: {
    name: ParamName.Product.Ensured.ptdi,
    label: '全残保险金',
    option: []
  },
  bonus_life: {
    name: ParamName.Product.Bonus.Life,
    label: '寿险保障（含终了红利）',
    option: []
  },
  bonus_education: {
    name: ParamName.Product.Bonus.Education,
    label: '教育金保障（含终了红利）',
    option: []
  },
  bonus_retire: {
    name: ParamName.Product.Bonus.Retire,
    label: '养老金保障（含终了红利）',
    option: []
  },
  bonus_accident: {
    name: ParamName.Product.Bonus.Accident,
    label: '意外保障（含终了红利）',
    option: []
  },
  bonus_survive: {
    name: ParamName.Product.Bonus.Survive,
    label: '生存金保障（含终了红利）',
    option: []
  },
  bonus_ill: {
    name: ParamName.Product.Bonus.Ill,
    label: '重大疾病',
    option: []
  },
  bonus_expire: {
    name: ParamName.Product.Bonus.Expire,
    label: '满期金保障（含终了红利）',
    option: []
  },
  bonus_mildCase: {
    name: ParamName.Product.Bonus.MildCase,
    label: '轻症疾病',
    option: []
  },
  bonus_paccount: {
    name: ParamName.Product.Bonus.Paccount,
    label: '保险单账户价值保障（含终了红利）',
    option: []
  },
  bonus_account: {
    name: ParamName.Product.Bonus.Account,
    label: '实时账户价值保障（含终了红利）',
    option: []
  },

  is_hot: {
    name: ParamName.Risk.Props.Hot,
    label: '是否热卖',
    options: YN_Option
  },

  is_auto_pay: {
    name: ParamName.Risk.Props.AutoPay,
    label: '是否自动垫交',
    options: YN_Option
  },

  auto_renewal: {
    name: ParamName.Risk.Props.AutoRenew,
    label: '是否自动续保',
    options: YN_Option
  },

  is_accumulated: {
    name: ParamName.Risk.Props.Accumulated,
    label: '是否累计生息',
    options: YN_Option
  },

  is_can_get_cvr_amount: {
    name: ParamName.Risk.Props.CuvAmount,
    label: '是否可领取生存满期养老保险金',
    options: YN_Option
  },

  is_must_renew: {
    name: ParamName.Risk.Props.MustRenew,
    label: '是否必须续保',
    options: YN_Option
  },

  is_free_underwrite: {
    name: ParamName.Risk.Props.FreeUnderwrite,
    label: '是否免核保产品',
    options: YN_Option
  },

  is_invest_continue: {
    name: ParamName.Risk.Props.InvestmentLinked,
    label: '是否投资连接',
    options: YN_Option
  },

  is_tpolicy_waiver: {
    name: ParamName.Risk.Props.Waiver,
    label: '是否投保人豁免',
    options: YN_Option
  },

  is_include_pension: {
    name: ParamName.Risk.Props.Pension,
    label: '是否含养育金',
    options: YN_Option
  },

  is_judge_birthday_policy: {
    name: ParamName.Risk.Props.BirthdayPolicy,
    label: '是否判断生日单',
    options: YN_Option
  },

  is_life_cash_account: {
    name: ParamName.Risk.Props.SurvivalAccount,
    label: '是否有生存金账户',
    options: YN_Option
  },

  date_check_type: {
    name: ParamName.Premium.DateCheckType,
    label: '时间校验方式',
    options: [
      { label: '建议书时间', value: '1' },
      { label: '出单时间', value: '2' },
      { label: '通用', value: 'v' }
    ]
  },

  risk_classify: {
    name: ParamName.Risk.Base.Classify,
    label: '险种',
    options: [
      { label: '寿险', value: 'L' },
      { label: '重疾', value: 'C' },
      { label: '住院医疗', value: 'MR' },
      { label: '津贴', value: 'HI' },
      { label: '住院津贴', value: 'HIR' },
      { label: '意外险', value: 'PA' },
      { label: '意外医疗', value: 'A_MR' },
      { label: '意外津贴', value: 'AHI' },
      { label: '防癌', value: 'CD' }
    ]
  },
  product_document_classify: {
    name: ParamName.Product.ProductDocumentClassify,
    label: '产品大文本接口的类型',
    options: [
      { label: '产品代码', value: '1' },
      { label: '险种代码', value: '0' }
    ]
  },

  // ========== 保费计算 ==========

  premium_sex: {
    name: ParamName.Premium.Sex,
    label: '被保人性别',
    options: [
      { label: '男', value: 'M' },
      { label: '女', value: 'F' },
      { label: '不确定', value: 'N' }
    ]
  },

  annuity_mode: {
    name: ParamName.Annuity.Mode,
    label: '年金给付方式',
    options: [
      { label: '无关或不确定', value: '0' },
      { label: '年领', value: '1' },
      { label: '半年领', value: '2' },
      { label: '季领', value: '3' },
      { label: '月领', value: '4' },
      { label: '趸领', value: '5' },
      { label: '转年金', value: '6' }
    ]
  },

  annuity_duration_mode: {
    name: ParamName.Annuity.DurationMode,
    label: '年金给付方式',
    options: [
      /* 0-无关；1-固定领取；2-领至某年龄；3-普通终身领取；4-定期领取；5-保本终身领取；6-增额终身领取；7-一次性领取；8-分次领取*/
      { label: '无关', value: '0' },
      { label: '固定领取', value: '1' },
      { label: '领至某年龄', value: '2' },
      { label: '普通终身领取', value: '3' },
      { label: '定期领取', value: '4' },
      { label: '保本终身领取', value: '5' },
      { label: '增额终身领取', value: '6' },
      { label: '一次性领取', value: '7' },
      { label: '分次领取', value: '8' }
    ]
  },

  pay_period: {
    name: ParamName.Premium.Payment.Period,
    label: '给付开始类型',
    options: [
      /* 0-无关；1-即领；2-生效日年龄；3-从几年后开始领；4-生日年龄；5-约定日期*/
      { label: '无关', value: '0' },
      { label: '即领', value: '1' },
      { label: '生效日年龄', value: '2' },
      { label: '从几年后开始领', value: '3' },
      { label: '生日年龄', value: '4' },
      { label: '约定日期', value: '5' }
    ]
  },

  // 扣款类型
  deduction_type: {
    name: ParamName.Eleinsure.DeductionType,
    label: '扣款类型',
    options: [
      { label: '批量扣款', value: '0' },
      { label: '单笔扣款', value: '1' }
    ]
  },
  // 团险扣款类型
  group_deduction_type: {
    name: ParamName.Eleinsure.DeductionType,
    label: '扣款类型',
    options: [
      { label: '批量扣款', value: '0' }
    ]
  },
  // 开户银行
  deposit_bank: {
    name: ParamName.Eleinsure.deposit_bank,
    label: '开户银行',
    options: [
      { label: '中国工商银行', value: '102' },
      { label: '中国农业银行', value: '103' },
      { label: '中国银行', value: '104' },
      // { label: '中国建设银行', value: '105' },
      { label: '交通银行', value: '301' },
      // { label: '光大银行', value: '303' },
      // { label: '华夏银行', value: '304' },
      // { label: '民生银行', value: '305' },
      // { label: '广发银行', value: '306' },
      // { label: '招商银行', value: '308' },
      // { label: '兴业银行', value: '309' },
      // { label: '浦发银行', value: '310' },
      { label: '中国邮政储蓄银行', value: '403' },
      // { label: '平安银行', value: '783' }
    ]
  },
  // 税延缴费方式
  tax_extension_type: {
    name: ParamName.Eleinsure.TaxExtensionType,
    label: '缴费方式',
    options: [
      { label: '年缴', value: '12' },
      { label: '月缴', value: '1' }
    ]
  },
  // 税优缴费方式
  tax_superiority_type: {
    name: ParamName.Eleinsure.TaxSuperiorityType,
    label: '缴费方式',
    options: [
      { label: '一次交清', value: '12' },
      { label: '月交', value: '1' }
    ]
  },

  // 产品工厂动态规则
  ui_type: {
    name: ParamName.Risk.Attr.Type,
    label: '产品工厂页面元素类型',
    options: [
      { label: '选择', value: 'radio' },
      { label: '文本', value: 'text' },
      { label: '下拉文本', value: 'select' },
      { label: '隐藏文本', value: 'hidden' },
      { label: '只读文本', value: 'readonly' }

    ]
  },

  risk_text_type: {
    name: ParamName.Risk.Base.TextType,
    label: '大文本类型',
    options: [
      { label: '利益描述', value: 'benefit_direction', type: 'markdown' },
      { label: '保险条款', value: 'insurance_clause', type: 'pdf' },
      { label: '投保规则', value: 'insurance_rule', type: 'html' },
      { label: '产品说明书', value: 'product_direction', type: 'pdf' },
      { label: '产品特色', value: 'product_features', type: 'markdown' },
      { label: '免责条款', value: 'exceptions', type: 'html' },
      { label: '人身投保提示书', value: 'personal_insurance_tip', type: 'pdf' }
    ]
  },

  // ===============================  查询列表（建议书、电子投保） ===============================

  // 建议书列表类型
  // ZZZ WTJ YTJ 这三个值将作为接口入参state值,实际后端拿这三个查数据库电投表的状态相对应的数据，建议书表的状态已废弃 2020.04.16 wrj
  proposal_list: {
    name: ParamName.Proposal.ListType,
    options: [
      { label: '制作中', value: 'ZZZ', name: 'doing' },
      { label: '未提交', value: 'WTJ', name: 'toEleDoing' },
      { label: '已提交', value: 'YTJ', name: 'toEleDone' }
      // { label: '已制作', value: 'YZZ', name: 'done' },
      // { label: '转投保', value: 'ZTB', name: 'toEle' }
    ]
  },

  // 建议书提交类型
  proposal_list_commit_type: {
    name: ParamName.Proposal.ListCommitType,
    options: [
      { label: '未提交', value: '0', name: 'toEleDoing' },
      { label: '已提交', value: '1', name: 'toEleDone' }
    ]
  },

  // 投保单状态
  policy_status: {
    name: ParamName.Eleinsure.PolicyStatus,
    label: '保单状态',
    options: [
      { label: '全部', value: '' },
      { label: '未提交', value: '1' },
      { label: '提交中', value: '2' },
      { label: '已提交', value: '3' }
    ]
  },

  // ===============================  告知项 ===============================

  // 投保目的
  insurance_goal: {
    name: ParamName.Eleinsure.InsuranceGoal,
    label: '投保目的',
    options: [
      { label: '保证未来收入', value: '保证未来收入' },
      { label: '贷款偿还', value: '贷款偿还' },
      { label: '家庭经济保证', value: '家庭经济保证' },
      { label: '其他', value: '其他' }
    ]
  },
  // 你是被保险人的亲属吗
  is_insure_relative: {
    name: ParamName.Eleinsure.IsInsureRelative,
    label: '你是被保险人的亲属吗',
    options: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
  },
  // 吸烟类型
  smoke_class: {
    name: ParamName.Eleinsure.smokeClass,
    label: '1.烟的类型',
    options: [
      { label: '香烟', value: '1' },
      { label: '雪茄', value: '2' },
      { label: '烟草', value: '3' }
    ]
  },
  // 酒的类型
  drink_class: {
    name: ParamName.Eleinsure.drinkClass,
    label: '1.酒的类型',
    options: [
      { label: '啤酒', value: '1' },
      { label: '白酒/黄酒', value: '2' },
      { label: '葡萄酒', value: '3' },
      { label: '混合', value: '4' }
    ]
  },
  // 曾经居住的国家
  borad_country: {
    name: ParamName.Eleinsure.OnceLivedCountry,
    label: '曾居住的国家：',
    options: [
      { label: '美国', value: '1' },
      { label: '日本', value: '2' },
      { label: '韩国', value: '3' },
      { label: '新加坡', value: '4' },
      { label: '加拿大', value: '5' },
      { label: '澳大利亚', value: '6' },
      { label: '英国', value: '7' },
      { label: '菲律宾', value: '8' }
    ]
  },
  // 计划出行的国家
  borad_will_country: {
    name: ParamName.Eleinsure.PlanTravelCountry,
    label: '计划出行的国家：',
    options: [
      { label: '美国', value: '1' },
      { label: '日本', value: '2' },
      { label: '韩国', value: '3' },
      { label: '新加坡', value: '4' },
      { label: '加拿大', value: '5' },
      { label: '澳大利亚', value: '6' },
      { label: '英国', value: '7' },
      { label: '菲律宾', value: '8' }
    ]
  },
  // 保险公司类型
  apply_company: {
    name: ParamName.Eleinsure.applyCompany,
    label: '保险公司',
    options: [
      { label: '中国人寿', value: '1' },
      { label: '平安人寿', value: '2' },
      { label: '太平洋保险', value: '3' },
      { label: '华夏人寿', value: '4' },
      { label: '太平人寿', value: '5' },
      { label: '泰康人寿', value: '6' },
      { label: '新华保险', value: '7' },
      { label: '人保寿险', value: '8' },
      { label: '前海人寿', value: '9' },
      { label: '天安人寿', value: '10' },
      { label: '工银安盛', value: '11' },
      { label: '中邮人寿', value: '12' },
      { label: '富德生命', value: '13' },
      { label: '百年人寿', value: '14' },
      { label: '阳光人寿', value: '15' },
      { label: '国华人寿', value: '16' },
      { label: '君康人寿', value: '17' },
      { label: '农银人寿', value: '18' },
      { label: '恒大人寿', value: '19' },
      { label: '友邦人寿', value: '20' }
    ]
  },
  // 是否有效
  apply_valid: {
    name: ParamName.Eleinsure.isValid,
    label: '是否有效',
    options: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
  },
  // 正在申请
  is_applying: {
    name: ParamName.Eleinsure.isApplying,
    label: '正在申请',
    options: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
  },
  // 税优告知项 医疗费用支付方式
  tax_medical_pay: {
    name: ParamName.Eleinsure.taxMedicalPay,
    label: '医疗费用支付方式',
    options: [
      { label: '公费医疗', value: 'ETI' },
      { label: '基本医疗保险', value: 'BIT' },
      { label: '企业补充医疗保险', value: 'CTI' },
      { label: '其他商业医疗保险', value: 'OTI' }
    ]
  },
  // pc扣款类型
  pc_deduction_type: {
    name: '',
    'whole': '',
    'batch_withdrawing': '0',
    'single_deductions': '1'
  },
  // 投保经历
  insurance_experience: {
    'salesperson_promotion': '0',
    'insured_proposes': '1',
    'friends_recommend ': '2',
    'other': '3'
  },
  // 表面看来被保险人是否呈病态或有生理缺陷
  is_morbidity: {
    'yes': '1',
    'no': '0'
  },
  // 你是否曾听闻被保险人有疾病或接受医生治疗
  is_illness: {
    'yes': '1',
    'no': '0'
  },
  // 测试问卷
  questionnaire: {
    'yes': '1',
    'no': '0'
  },

  illness_relation: {
    name: ParamName.Eleinsure.Illness_relation,
    label: '家族病史关系类型',
    options: [
      { label: '父亲', value: '父亲' },
      { label: '母亲', value: '母亲' },
      { label: '儿子', value: '儿子' },
      { label: '女儿', value: '女儿' },
      { label: '兄弟', value: '兄弟' },
      { label: '姐妹', value: '姐妹' }
    ]
  },

  order_state: {
    name: ParamName.Eleinsure.OrderState,
    label: '订单提交状态',
    options: [
      { label: '未提交', value: '0' },
      { label: '签字中', value: '1' },
      { label: '已提交', value: '2' }
    ]
  },

  // ===============================  账户信息 ===============================
  pay_type: {
    name: ParamName.Eleinsure.Account.PayType,
    label: '账户类型',
    options: [
      { label: '投保人账户', value: '1' },
      { label: '生存金账户', value: '2' }
    ]
  },

  // ===============================  确认签名 ===============================

  // 阅读文件类型
  readFile_type: {
    name: ParamName.Eleinsure.readFileType,
    label: '阅读类型',
    options: [
      { label: 'PDF', value: '1' },
      { label: 'HTML', value: '2' },
      { label: 'MD', value: '3' }
    ]
  },
  // 是否阅读
  readFile_status: {
    name: ParamName.Eleinsure.readFileStatus,
    label: '是否阅读',
    options: [
      { label: '已阅读', value: 'Y' },
      { label: '未阅读', value: 'N' }
    ]
  },

  // ===============================  客户管理 ===============================

  // 客户类型
  customer_type: {
    name: ParamName.Custom.Type,
    label: '客户类型',
    options: [
      { label: '潜在客户', value: '1' },
      { label: '准客户', value: '2' },
      { label: '老客户', value: '3' }
    ]
  },

  // 客户来源
  customer_source: {
    name: ParamName.Custom.Source,
    label: '客户来源',
    options: [
      { label: '转介绍', value: '1' },
      { label: '缘故', value: '2' },
      { label: '陌生', value: '3' }
    ]
  },
  // 增员类型
  increase_type: {
    name: ParamName.Custom.IncreaseType,
    label: '增员类型',
    options: [
      { label: '增员', value: '1' },
      { label: '准增员', value: '2' },
      { label: '客户', value: '3' }
    ]
  },
  // 国籍
  nationality: nationality,
  taxNationality: taxNationality,
  taxBirthNationality: taxbirthNationality,
  // todo 是否是中国税收居民 税优
  china_tax: {
    name: ParamName.Eleinsure.ChinaTax,
    label: '',
    options: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
  },
  // 是否是外国地址
  isForeignAddress: {
    name: ParamName.Person.Contract.isForeignAddress,
    label: '是否是外国地址',
    options: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
  },
  // 照会列表类型
  enote_list: {
    name: ParamName.enote.ListType,
    options: [
      { label: '未回复', value: 'WHF', name: 'doing' },
      { label: '已回复', value: 'YHF', name: 'done' }
    ]
  },
  // 照会提交类型
  enote_list_commit_type: {
    name: ParamName.enote.ListCommitType,
    options: [
      { label: '未提交', value: '0', name: 'toEleDoing' },
      { label: '已提交', value: '1', name: 'toEleDone' }
    ]
  },
  new_custody_result: {
    name: ParamName.Eleinsure.NewCustodyResult,
    options: [
      { label: '等待校验', value: '0' },
      { label: '校验通过', value: '1' },
      { label: '校验未通过', value: '2' },
      { label: '已提交申诉', value: '3' },
      { label: '正在审批', value: '4' },
      { label: '未通过审批', value: '5' },
      { label: '通过审批', value: '6' }
    ]
  },
  // 后台区分人员来源信息区分字段
  source_type: {
    name: ParamName.Person.SourceType,
    options: [
      { label: '建议书', value: '1' },
      { label: '电子投保', value: '2' },
      { label: '客户管理', value: '3' }
    ]
  },
  // 销售人员报告书
  insured_long_know: {
    name: ParamName.Eleinsure.report.insuredLongKnow,
    label: '你认识被保险人多久',
    options: [
      { label: '小于1年', value: '1' },
      { label: '1年', value: '2' },
      { label: '2年', value: '3' },
      { label: '3年-5年', value: '4' },
      { label: '5年-10年', value: '5' },
      { label: '10年-20年', value: '6' },
      { label: '20年以上', value: '7' }
    ]
  },
  insured_apply: {
    name: ParamName.Eleinsure.report.insured_apply,
    label: '投保经过',
    defaultIndex: '0',
    options: [
      { label: '业务员推销', value: '0' },
      { label: '被保险人自己提出', value: '1' },
      { label: '同事朋友推荐', value: '2' },
      { label: '其他', value: '3' }
    ]
  },
  insured_apply_aim: {
    name: ParamName.Eleinsure.report.insured_apply_aim,
    label: '投保目的',
    defaultIndex: '0',
    options: [
      { label: '保证未来收入', value: '0' },
      { label: '贷款偿还', value: '1' },
      { label: '家庭经济保证', value: '2' },
      { label: '其他', value: '3' }
    ]
  }
}
