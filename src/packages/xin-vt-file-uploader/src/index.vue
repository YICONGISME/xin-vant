<template>
  <div class="van-file-uploader">
    <!-- 仅用来提供功能，不展示样式 -->
    <van-uploader
      ref="vanFileUploaderRef"
      :multiple="multiple"
      accept="*"
      :before-read="beforeRead"
      :after-read="afterRead"
    />

    <!-- 触发上传 -->
    <div class="van-file-uploader__trigger" v-if="!disabled">
      <div class="empty-trigger" v-if="files.length === 0" @click="openUpload">
        <div class="trigger-desc">1. 支持 {{fileTypesText}} 格式文件</div>
        <div class="trigger-desc">2. 最多上传 {{maxNum}} 个，单个文件不得超过 {{maxSize}} MB</div>
      </div>
      <template v-if="files && files.length">
        <div class="title-line f_sbold">
          <div class="file-num">
            <span class="color-label">附件</span>
            <span class="num">
              <span class="m_l20 color-theme">{{files.length}}</span>
              <span class="color-base">/{{maxNum}}</span>
            </span>
          </div>
          <span v-if="files.length <= maxNum" class='color-theme f_s12' @click="openUpload">上传附件</span>
        </div>
      </template>
    </div>

    <!-- 文件列表 -->
    <div class="van-file-uploader__list">
      <div class="file-list-item" v-for="(file,index) in files" :key="file.id">
        <xin-icon class="f_s30" :xin-type=" 'icon_'+file.type.toUpperCase() || 'NO' " />
        <div class="file-info p_l20">

          <!-- 文件名、删除操作 -->
          <div class="flex-between">
            <span class="file-name" @click="handlePreviewFile(file)">{{file.name}}</span>
            <div class="opts" v-if="!disabled">
              <div v-if="errors[file.id]" class="inline-block m_r20" @click="uploadFiles([file])">
                <xin-icon xin-type="icon_shangchuan" />
              </div>
              <div class="inline-block" @click="deleteUploadedFile(file, index)">
                <xin-icon xin-type="icon_delete_standard" />
              </div>
            </div>
          </div>

          <!-- 上传进度、时间、大小信息 -->
          <div v-if="progress[file.id] < 100 && !errors[file.id]" class="file-progress">
            <van-progress pivot-text="" :percentage="progress[file.id]" stroke-width="8" color='#16BF95'/>
            {{progress[file.id]}}%
          </div>
          <div v-else class="f_s12 color-tip" >
            <span v-if="file.size">{{Math.round(file.size / 1024 / 1024 * 100) / 100}}M</span>
            <span v-if="file.uploadTime" class='m_l48'>{{file.uploadTime}}</span>
            <span v-if="errors[file.id]" class='m_l48 color-err'>上传失败</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 文件预览 -->
    <XinVtFilePreview ref="vanFilePreviewRef"/>
  </div>

</template>

<script lang="ts">
import {Component, Vue, Prop, Ref, Mixins, Model, Watch} from "vue-property-decorator";
import XinVtFilePreview from "../../xin-vt-file-preview/index";
import {unixTimeFormat} from "./index.utils";

//@ts-ignore
const vant = window.vant;
@Component({
  name: 'XinVtFileUploader',
  components:{
    XinVtFilePreview
  }
})
export default class XinVtFileUploader extends Vue{
  @Ref('') readonly vanFileUploaderRef!: any
  @Ref('') readonly vanFilePreviewRef!: any

  @Prop({default: ''})
  uploadUrl!: string

  @Prop({default: () => []})
  fileTypes!: any

  @Prop({default: 1})
  maxNum!: any

  @Prop({default: 5})
  maxSize!: any

  @Prop({default: false})
  multiple!: boolean

  @Prop({default: false})
  disabled!: boolean

  @Model("change", {
    default: () => {
      //@ts-ignore
      return this.multiple ? [] : {};
    }
  })
  defaultFiles!: any;

  @Watch('defaultFiles',{deep: true, immediate: true})
  watchDefaultFiles(newVal: any){
    if (Array.isArray(newVal)) {
      this.files = newVal.map((f: any) => {
        const {type} = this.parseTypeName(f.name);
        return {
          ...f,
          type
        }
      })
    } else {
      if(!newVal || !Object.keys(newVal).length){
        this.files = [];
      }else{
        const {type} = this.parseTypeName(newVal.name);
        this.files = [{
          ...newVal,
          type
        }]
      }
    }
  }

  get fileTypesText(){
    return this.fileTypes.join('/')
  }

  files: any = [];
  isUploadFinish = false;
  results: any = [];
  progress: any = {};
  errors: any = {};

  //主动调起上传
  openUpload(){
    if(this.disabled){return}
    this.vanFileUploaderRef.chooseFile();
  }

  //读取前的校验
  beforeRead(files: any){
    const rawFiles = files instanceof Array ? files : [files];
    return this.checkSelectedFiles(rawFiles);
  }

  /**
   * 根据文件名处理出后缀类型和名称
   */
  parseTypeName(commonName: string){
    //可能没有后缀
    const nameSplit = commonName.split('.')
    if(nameSplit.length==1){
      return {
        type:'',
        name:commonName
      }
    }
    const type = nameSplit[nameSplit.length - 1];
    const name = nameSplit.slice(0, nameSplit.length - 1).join('.')
    return {
      type,
      name
    }
  }

  /**
   * 检查选中文件数量和大小
   */
  checkSelectedFiles(sFiles: any[]){
    console.log('-----------checkSelectedFiles--------------',sFiles)
    // 校验文件数量
    if (sFiles.length + this.files.length > this.maxNum) {
      vant.Toast('文件总数已超过最大限制')
      return false
    }
    // 校验文件大小
    if (sFiles.some(f => f.size > this.maxSize * 1024 * 1024)) {
      vant.Toast(`文件过大，最大允许的单个文件大小为${this.maxSize}M`)
      return false
    }

    // 校验文件类型
    let invalidType = '';
    const hasInvalidType = sFiles.some(f => {
      const { type } = this.parseTypeName(f.name)
      invalidType = type.toUpperCase();
      return f.type && !this.fileTypes.includes(invalidType);
    });

    if (hasInvalidType) {
      vant.Toast(`暂不支持上传 ${invalidType} 格式文件`)
      return false
    }
    // 校验相同文件（跟据文件名和类型）
    if (sFiles.some(f => this.files.map((i: any) => i.name).includes(f.name) && this.files.map((i: any) => i.type).includes(f.type || this.parseTypeName(f.name).type)
      || this.files.some((i: any) => f.name === `${i.name}.${i.type}`))
    ){
      vant.Toast('选择的文件已存在')
      return false
    }
    return true
  }

  //文件读取完成，上传到服务器
  afterRead(data: any){
    const rawData = data instanceof Array ? data : [data];
    const rawFiles = rawData.map((item: any, index: number) => {
      const {file} = item;
      const { type, name } = this.parseTypeName(file.name)
      return {
        id: String(new Date().getTime()) + index,
        type,
        name,
        path: '',
        size: file.size,
        uploadTime: unixTimeFormat('Y.M.D h:m', file.lastModified),
        file
      }
    })
    this.uploadFiles(rawFiles)
  }

  /**
   * 删除文件
   * @param index
   */
  deleteUploadedFile(file: any, index: number){
    vant.Dialog.confirm({
      title: '删除附件',
      message:
        '确认删除该附件？',
    })
      .then(() => {
        this.files.splice(index, 1);
        this.$emit("change", this.formatToPost(this.files));
        this.$emit('onDelete', file);
      })
      .catch(() => {
        // on cancel
      });
  }

  //预览文件
  handlePreviewFile(file: any){
    if (!file.url) {return}
    if (['zip', 'rar'].includes(file.type)) {
      return vant.Toast('暂不支持下载，请前往电脑或app端下载')
    }
    this.vanFilePreviewRef.previewFile(file);
  }

  /**
   * 上传选择的文件列表
   * @param selFiles
   */
  uploadFiles(selFiles: any[]){
    this.isUploadFinish = false;
    this.$emit('onUpload', false);
    this.files = [...this.files, ...selFiles];
    //每个文件创建一个上传进程
    const tasks = selFiles.map(f => this.singleFileUpload(f));
    //处理上传进程回调
    const allPromises = tasks.map((promise) =>
      promise.then((res: any) => {
        //上传好的文件处理后赋值给文件列表
        this.files = this.files.map((f: any) => {
          return res[f.id] ? {...f, ...res[f.id], content: ''} : f;
        })
      }).catch(err => {
        //有文件上传失败，删除此文件
        this.files = this.files.filter((i: any) => !this.errors[i.id])
        vant.Toast(err, 2000)
      })
    )
    //所有的请求完之后
    Promise.all(allPromises).then(() =>{
      //抛出数据和事件
      this.$emit("change", this.formatToPost(this.files));
      this.$emit('onUpload', true);
    }).finally(() => {
      this.isUploadFinish = true;
    })
  }

  /**
   * 单个文件上传逻辑
   * @param uf
   */
  singleFileUpload(uf: any){
    return new Promise((resolve, reject) => {
      const { id, file } = uf
      const formData = new FormData()
      formData.append('file', file as File)
      const xhr = new XMLHttpRequest()
      // 进度监听
      xhr.upload.addEventListener('progress', e => this.handleProgress(id,e), false);
      //进度初始化
      this.progress[id] = 0;

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4 || ![200, 201].includes(xhr.status)) { return }
        const result = JSON.parse(xhr.responseText)
        //接口返回失败
        if (result.hasOwnProperty('status') && !result.status || result.hasOwnProperty('success') && !result.success) {
          this.errors[id] = true;
          return reject(result.message)
        }
        this.errors[id] = false;
        this.progress[id] = 100;
        //返回上传结果
        resolve({
          [id]: Object.assign({}, result.data || result.result)
        })
      }
      xhr.open('POST', this.uploadUrl + '&isPermanent=true', true)
      //接口请求超时
      xhr.ontimeout = (e)=>{
        this.errors[id] = true;
        return reject('timeout 上传失败')
      }
      //接口请求失败
      xhr.onerror = (e)=>{
        this.errors[id] = true;
        return reject('error 上传失败')
      }
      xhr.send(formData)
    })
  }

  // 监听上传进度 显示进度
  handleProgress(id: string, e:any){
    //@ts-ignore
    const number:number = Number.parseInt(e.loaded / e.total * 100);
    if(number >= 100) return
    this.progress[id] = number;
  }

  //格式化为接口保存的格式
  formatToPost(files: any){
    if(this.multiple){
      return files.map((file: any) => {
        const {key, url, name} = file;
        return {
          key,
          url,
          name
        }
      })
    }else{
      if(!files.length){
        return {}
      }else{
        const {key, url, name} = files[0];
        return {
          key,
          url,
          name
        }
      }
    }
  }


}
</script>

<style lang="scss">
@import "./index.scss";
</style>
