<template>
  <div class="upload-box">
      <el-upload
            class="upload-demo"
            :limit='limit'
            :on-exceed="handleExceed"
            :action="action"
            :on-success="successChange"
            :file-list="fileList"
            :data="qiniudata"
            :accept="accept"
          >
            <el-button size="small" icon="el-icon-upload">选择附件</el-button>
            <div slot="tip" class="el-upload__tip">
               {{tips}}
            </div>
          </el-upload>
  </div>
</template>

<script>
import {
  getImgToken,
} from "@/api/userCenter";
export default {
  name: "upload",
  props: {
      //接收文件限制个数
    limit: {
      type: Number,
    },
    // 接受限制文件类型
    accept: {
      type: String,
    },
    //提示语
    tips:{
        type:String,
    }
  },
  data() {
    return {
      domain: "", //七牛云区域路径
      action: "https://up-z0.qiniup.com", //七牛云上传空间
      qiniudata: {
        token: "",
      },
      fileList: [],
      form: {
      },
    };
  },
  async created() {
    this.getToken()
  },
  mounted() {},
  methods: {
    concel(){
    },
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择` + this.limit + `个文件`);
      },
    getToken() {
      getImgToken() //获取7牛token
        .then((res) => {
          this.qiniudata.token = res.data.uptoken;
          this.domain = res.data.domain;
        });
    },
    successChange(response, file, fileList) {
      this.fileList = fileList;
      var fileList = [];
          for (var i = 0; i < this.fileList.length; i++) {
            if (this.fileList[i].response) {
              fileList.push( "https://" +
                  this.domain +
                  "/" +
                  this.fileList[i].response.hash +
                  "!wmk" +  "?attname=" + encodeURI(this.fileList[i].name) )
            } else {
              fileList.push(this.fileList[i].url)
            }
          }
      this.$emit("fileSuccess",fileList);
    },
  },
};
</script>
<style  lang="scss">
.upload{

}
</style>

