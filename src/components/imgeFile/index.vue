<template>
  <el-upload :class="allclass" :accept="accept" :action="fileUrl" :show-file-list="false"
    :on-success="handlePassportSuccess" :before-upload="beforePassportUpload">
    <!---上传图片后的展示效果  imge是进行封装过的 imageUrl是Guid 统一处理--->
    <imge v-if="imageUrl"   :src="imageUrl" :class="onclass"/>
   <!---上传图片前的展示效果--->
    <i v-else :class="inclass"></i>
      <!---提示--->
     <slot name="tip" slot="tip"></slot>
  </el-upload>
</template>

<script>

//   import {  Url,  CCONFIG} from "@/api/apiconfig";//上传图片地址
//   import {getFileUrl} from "@/api/upload"; //获取图片方法
  export default {
      model:{
      prop:"value",
  },
    props: {
     //配合v-model 加载初始值
       value: {
        type: String,
        default: ""
       },
       //大于多少兆开始压缩
       sizeKB:{
        type:Number,
        default: 100
       },
       //最大多少兆
       maxSizeM:{
        type:Number,
        default: 5
       },
       //图片同比压缩比列
       scale:{
        type:Number,
        default: 0.3
       },
      //上传文件类型
      accept:{
        type: String,
        default: "image/jpeg,image/png"
      },

      //整体样式
      allclass: {
        type: String,
        default: "passport-uploader-logo"
      },
      //点击前样式
      inclass: {
        type: String,
        default: "el-icon-plus avatar-uploader-icon"
      },
      //点击后样式
      onclass: {
        type: String,
        default: "passport-logo"
      },

    },
    data() {
      return {
        fileUrl: Url.imge_Upload,//上传服务器地址
        imageUrl: "",
        filelist:[],
      };
    },

   //监听父组件值是否在变化
      watch: {
        //有些页面初始初始src没有赋值
        value(newValue, oldValue){
              this.imageUrl= newValue;
           },
      },


    computed: {},
    created: function () {
         this.imageUrl=this.value
    },
     mounted() {
     },
    methods: {
      //上传成功返回值
      handlePassportSuccess(res, file) {
        if (res.code == "0000") {
            this.imageUrl=res.data.id;
          //返回 v-model的参数（关键）
          this.$emit('input', res.data.id) 
        } else
          this.imageUrl = "";
      },

    //压缩图片 下面的代码都是压缩文件大小 
   beforePassportUpload(file) {
      var that = this;
      return new Promise((resolve, reject) => {
        const isJPG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";
        const  kb= file.size/ 1024;
        const sizeM= file.size/ 1024/1024;
        const isLtKB = kb  < this.sizeKB;
        let bool = false;
        let msg = "";
        if ((isJPG || isPNG)&&sizeM<=this.maxSizeM) {//判断是否符合格式要求
          bool = true;
        } 
        else 
        if(sizeM>this.maxSizeM){
           var mag="上传文件必须是小于"+this.maxSizeM+"M";
            this.$message({message:mag,type:'error',offset:10 });
            reject(file);
        } else 
        {
          this.$message({message:"上传文件必须是jpg、png格式!",type:'error',offset:10 });
           reject(file);
        }
        if (bool && !isLtKB) {//如果格式符合要求，但是size过大，对图片进行处理
          let image = new Image(),
          resultBlob = "";
          image.src = URL.createObjectURL(file);
          image.onload = () => {
            resultBlob = that.compressUpload(image);//Blob
            resolve(resultBlob);
          };
        } else if (bool && isLtKB) {
          resolve(file);//file
        }
      });
    },
    compressUpload(image) {
      let canvas = document.createElement("canvas");//创建画布元素
      let ctx = canvas.getContext("2d");
      let initSize = image.src.length;
      let { width } = image,
          { height } = image;
      canvas.width = width;
      canvas.height = height;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, width, height);
      let compressData = canvas.toDataURL("image/jpeg", this.scale); //等比压缩
      let blobImg = this.dataURItoBlob(compressData);//base64转Blob
      return blobImg;
    },
    dataURItoBlob(data) {
      let byteString;
      if (data.split(",")[0].indexOf("base64") >= 0) {
        byteString = atob(data.split(",")[1]);//转二进制
      } else {
        byteString = unescape(data.split(",")[1]);
      }
      let mimeString = data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      let ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
   
   
   },
  
  };
</script>